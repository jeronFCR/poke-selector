import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { PokemonDetails, PokemonListResponse } from '@poke/models/pokemon.model';
import { PokemonService } from '@poke/services/api/pokemon.service';

import { environment } from 'environments/environment';

import { PokemonWrapperService } from './pokemon-wrapper.service';

describe('PokemonWrapperService', () => {
  let service: PokemonWrapperService;
  let apiServiceSpy: jasmine.SpyObj<PokemonService>;

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj('PokemonService', ['getPokemonList', 'getPokemonDetails']);

    TestBed.configureTestingModule({
      providers: [PokemonWrapperService, { provide: PokemonService, useValue: apiServiceSpy }],
    });

    service = TestBed.inject(PokemonWrapperService);
  });

  it('should load initial pokemons and update isLoading', () => {
    const mockList: PokemonListResponse = {
      results: [{ name: 'jigglypuff' }],
      next: 'url',
    };

    apiServiceSpy.getPokemonList.and.returnValue(of(mockList));

    service.loadInitialPokemons();

    expect(service.pokemons()).toEqual([{ name: 'jigglypuff' }]);
    expect(service.isLoading()).toBe(false);
  });

  it('should load more pokemons', () => {
    service['pokemonList'].set([{ name: 'jigglypuff' }]);

    const mockList: PokemonListResponse = {
      results: [{ name: 'bulbasaur' }],
      next: null,
    };

    apiServiceSpy.getPokemonList.and.returnValue(of(mockList));

    service.loadMore();

    expect(service.pokemons()).toEqual([{ name: 'jigglypuff' }, { name: 'bulbasaur' }]);
    expect(service.isLoading()).toBe(false);
  });

  it('should select a pokemon and update selected', () => {
    const mockDetails: PokemonDetails = {
      name: 'jigglypuff',
      sprites: { front_default: 'jigglypuff.png' },
      weight: 55,
    };

    apiServiceSpy.getPokemonDetails.and.returnValue(of(mockDetails));

    service.selectPokemon('jigglypuff');

    expect(service.selected()).toEqual(mockDetails);
    expect(service.isLoading()).toBe(false);
  });

  it('should reset to default', () => {
    const mockDetails: PokemonDetails = {
      name: 'jigglypuff',
      sprites: { front_default: 'jigglypuff.png' },
      weight: 55,
    };

    service['pokemonList'].set([{ name: mockDetails.name }]);
    service['selectedPokemon'].set(mockDetails);
    service['loading'].set(true);
    service['nextUrl'].set('url');

    service.reset();

    expect(service.pokemons()).toEqual([]);
    expect(service.selected()).toBeUndefined();
    expect(service.isLoading()).toBe(false);
    expect(service['nextUrl']()).toBe(`${environment.apiUrl}/pokemon?limit=${environment.limit}`);
  });
});
