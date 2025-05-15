import { PokemonListItem } from '@poke/models/pokemon.model';

import { filterAndSortPokemons } from './pokemon.utils';

describe('filterAndSortPokemons', () => {
  const pokemons: PokemonListItem[] = [
    { name: 'beedrill' },
    { name: 'bellsprout' },
    { name: 'victreebel' },
    { name: 'weepinbell' },
    { name: 'nidoking' },
  ];

  it('should return all pokemons if query empty', () => {
    const result = filterAndSortPokemons('', pokemons);

    expect(result).toEqual(pokemons);
  });

  it('should filter pokemons by query', () => {
    const result = filterAndSortPokemons('be', pokemons);

    expect(result.map((p) => p.name)).toEqual(['beedrill', 'bellsprout', 'victreebel', 'weepinbell']);
  });

  it('should sort pokemons so starting with query first, following by alphabetical', () => {
    const result = filterAndSortPokemons('bel', pokemons);

    expect(result.map((p) => p.name)).toEqual(['bellsprout', 'victreebel', 'weepinbell']);
  });

  it('should be case-insensitive', () => {
    const result = filterAndSortPokemons('BE', pokemons);

    expect(result.map((p) => p.name)).toEqual(['beedrill', 'bellsprout', 'victreebel', 'weepinbell']);
  });

  it('should return empty array if no pokemon matches', () => {
    const result = filterAndSortPokemons('test', pokemons);

    expect(result).toEqual([]);
  });
});
