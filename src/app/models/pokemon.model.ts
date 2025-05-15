export interface PokemonListItem {
  name: string;
}

export interface PokemonListResponse {
  next: string | null;
  results: PokemonListItem[];
}

export interface PokemonDetails {
  name: string;
  weight: number;
  sprites: {
    front_default: string;
  };
}
