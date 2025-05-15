import { Component, input, output, signal } from '@angular/core';

import { PokemonListItem } from '@poke/models/pokemon.model';

import { HighlightTextDirective } from '@poke/directives/highlight-text.directive';

@Component({
  selector: 'poke-search-bar',
  imports: [HighlightTextDirective],
  templateUrl: './poke-search-bar.component.html',
  styleUrl: './poke-search-bar.component.less',
})
export class PokeSearchBarComponent {
  readonly query = input<string>('');
  readonly filteredPokemons = input<PokemonListItem[]>([]);

  readonly update = output<string>();
  readonly clear = output<void>();
  readonly selected = output<string>();
  readonly scrollEnd = output<void>();
  readonly tab = output<void>();

  readonly showList = signal(false);

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;

    this.update.emit(target.value);
  }

  onFocus() {
    this.showList.set(true);
  }

  onBlur() {
    this.showList.set(false);
  }

  onClear() {
    this.clear.emit();
  }

  onSelect(pokemon: PokemonListItem) {
    this.showList.set(false);
    this.selected.emit(pokemon.name);
  }

  onTabPress(event: KeyboardEvent): void {
    if (event.key === 'Tab' || event.key === 'Enter') {
      this.tab.emit();
      this.showList.set(false);
    }
  }

  onScroll(event: Event) {
    const target = event.target as HTMLElement;

    if (target.scrollHeight - target.scrollTop - target.clientHeight <= 10) this.scrollEnd.emit();
  }
}
