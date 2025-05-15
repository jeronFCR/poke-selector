import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

import { PokemonDetails } from '@poke/models/pokemon.model';

@Component({
  selector: 'poke-card',
  imports: [CommonModule],
  templateUrl: './poke-card.component.html',
  styleUrl: './poke-card.component.less',
})
export class PokeCardComponent {
  pokemon = input<PokemonDetails>();
  isLoading = input<boolean>();
}
