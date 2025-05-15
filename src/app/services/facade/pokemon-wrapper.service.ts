import { Injectable, computed, signal } from '@angular/core';

import { finalize, take, tap } from 'rxjs';

import { PokemonDetails, PokemonListItem } from '@poke/models/pokemon.model';
import { PokemonService } from '@poke/services/api/pokemon.service';

import { environment } from 'environments/environment';

const POKEMON_LIST_API_URL = `${environment.apiUrl}/pokemon?limit=${environment.limit}`;

@Injectable({
  providedIn: 'root',
})
export class PokemonWrapperService {
  private pokemonList = signal<PokemonListItem[]>([]);
  private selectedPokemon = signal<PokemonDetails | undefined>(undefined);
  private nextUrl = signal<string | null>(POKEMON_LIST_API_URL);
  private loading = signal<boolean>(false);

  readonly pokemons = computed(() => this.pokemonList());
  readonly isLoading = computed(() => this.loading());
  readonly selected = computed(() => this.selectedPokemon());

  constructor(private api: PokemonService) {}

  loadInitialPokemons() {
    this.reset();
    this.loadMore();
  }

  loadMore() {
    const url = this.nextUrl();

    if (!url || this.loading()) return;

    this.api
      .getPokemonList(url)
      .pipe(
        tap(() => this.loading.set(true)),
        take(1),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (res) => {
          this.pokemonList.update((prev) => [...prev, ...res.results]);
          this.nextUrl.set(res.next);
        },
      });
  }

  selectPokemon(name: string) {
    this.api
      .getPokemonDetails(name)
      .pipe(
        tap(() => this.loading.set(true)),
        take(1),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (pokemon) => this.selectedPokemon.set(pokemon),
      });
  }

  reset() {
    this.pokemonList.set([]);
    this.selectedPokemon.set(undefined);
    this.nextUrl.set(POKEMON_LIST_API_URL);
    this.loading.set(false);
  }
}
