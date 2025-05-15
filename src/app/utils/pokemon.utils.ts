import { PokemonListItem } from '@poke/models/pokemon.model';

export const filterAndSortPokemons = (query: string, pokemons: PokemonListItem[]): PokemonListItem[] => {
  if (!query) return pokemons;

  const queryLower = query.toLowerCase();

  return pokemons
    .filter(({ name }) => name.includes(queryLower))
    .sort((nextPokemon, currentPokemon) => {
      const nextPokemonStarts = nextPokemon.name.startsWith(queryLower);
      const currentPokemonStarts = currentPokemon.name.startsWith(queryLower);

      if (nextPokemonStarts === currentPokemonStarts) return nextPokemon.name.localeCompare(currentPokemon.name);
      if (nextPokemonStarts) return -1;

      return 1;
    });
};
