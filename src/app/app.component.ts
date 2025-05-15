import { Component, computed, inject, signal } from '@angular/core';

import { PokemonListItem } from '@poke/models/pokemon.model';
import { PokemonWrapperService } from '@poke/services/facade/pokemon-wrapper.service';

import { PokeCardComponent } from '@poke/components/poke-card/poke-card.component';
import { PokeSearchBarComponent } from '@poke/components/poke-search-bar/poke-search-bar.component';

import { filterAndSortPokemons } from '@poke/utils/pokemon.utils';

@Component({
  selector: 'app-root',
  imports: [PokeSearchBarComponent, PokeCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  pokemonService = inject(PokemonWrapperService);

  query = signal('');

  readonly filteredPokemons = computed<PokemonListItem[]>(() => filterAndSortPokemons(this.query(), this.pokemonService.pokemons()));
  readonly selectedPokemon = this.pokemonService.selected;
  readonly isLoading = this.pokemonService.isLoading;

  constructor() {
    this.pokemonService.loadInitialPokemons();
  }

  onSearch(query: string) {
    this.query.set(query);
  }

  onClear() {
    this.query.set('');
    this.pokemonService.loadInitialPokemons();
  }

  onSelect(name: string) {
    this.query.set(name);
    this.pokemonService.selectPokemon(name);
  }

  onScrollToEnd() {
    this.pokemonService.loadMore();
  }

  onTab() {
    const pokemonList = this.filteredPokemons();

    if (pokemonList && pokemonList.length) {
      const firstPokemonName = pokemonList[0].name;

      this.query.set(firstPokemonName);
      this.pokemonService.selectPokemon(firstPokemonName);
    }
  }
}
