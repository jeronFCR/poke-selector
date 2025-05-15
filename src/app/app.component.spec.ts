import { Signal, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetails, PokemonListItem } from '@poke/models/pokemon.model';
import { PokemonWrapperService } from '@poke/services/facade/pokemon-wrapper.service';

import { PokeCardComponent } from '@poke/components/poke-card/poke-card.component';
import { PokeSearchBarComponent } from '@poke/components/poke-search-bar/poke-search-bar.component';

import { AppComponent } from './app.component';

interface PokemonWrapperServiceMock {
  pokemons: Signal<PokemonListItem[]>;
  selected: Signal<PokemonDetails | undefined>;
  isLoading: Signal<boolean>;
  loadInitialPokemons: jasmine.Spy;
  selectPokemon: jasmine.Spy;
  loadMore: jasmine.Spy;
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let pokemonServiceMock: PokemonWrapperServiceMock;

  const mockPokemons = [{ name: 'tyranitar' }, { name: 'nidoking' }];

  beforeEach(async () => {
    pokemonServiceMock = {
      pokemons: signal(mockPokemons),
      selected: signal(undefined),
      isLoading: signal(false),
      loadInitialPokemons: jasmine.createSpy('loadInitialPokemons'),
      selectPokemon: jasmine.createSpy('selectPokemon'),
      loadMore: jasmine.createSpy('loadMore'),
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent, PokeSearchBarComponent, PokeCardComponent],
      providers: [{ provide: PokemonWrapperService, useValue: pokemonServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadInitialPokemons on init', () => {
    expect(pokemonServiceMock.loadInitialPokemons).toHaveBeenCalled();
  });

  it('should update query when onSearch', () => {
    component.onSearch('char');

    expect(component.query()).toBe('char');
  });

  it('should clear query and reload pokemons when onClear', () => {
    component.query.set('charizard');
    component.onClear();

    expect(component.query()).toBe('');
    expect(pokemonServiceMock.loadInitialPokemons).toHaveBeenCalled();
  });

  it('should update query and select pokemon when onSelect', () => {
    component.onSelect('tyranitar');

    expect(component.query()).toBe('tyranitar');
    expect(pokemonServiceMock.selectPokemon).toHaveBeenCalledWith('tyranitar');
  });

  it('should load more pokemons when onScrollToEnd', () => {
    component.onScrollToEnd();

    expect(pokemonServiceMock.loadMore).toHaveBeenCalled();
  });

  it('should select first filtered pokemon when onTab and list not empty', () => {
    component.query.set('tyr');
    component.onTab();

    expect(component.query()).toBe('tyranitar');
    expect(pokemonServiceMock.selectPokemon).toHaveBeenCalledWith('tyranitar');
  });

  it('should not select pokemon when onTab and filtered list is empty', () => {
    component.query.set('test');
    component.onTab();

    expect(pokemonServiceMock.selectPokemon).not.toHaveBeenCalledWith(jasmine.any(String));
  });
});
