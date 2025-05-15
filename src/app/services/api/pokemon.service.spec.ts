import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PokemonDetails, PokemonListResponse } from '@poke/models/pokemon.model';

import { environment } from 'environments/environment';

import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokemonService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch pokemon list', () => {
    const mockResponse: PokemonListResponse = {
      results: [{ name: 'nidoking' }],
      next: null,
    };

    const url = `${environment.apiUrl}/pokemon?limit=${environment.limit}`;

    service.getPokemonList(url).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(url);

    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should fetch pokemon details', () => {
    const mockDetails: PokemonDetails = {
      name: 'nidoking',
      sprites: { front_default: 'nidoking.png' },
      weight: 620,
    };

    const url = `${environment.apiUrl}/pokemon/${mockDetails.name}`;

    service.getPokemonDetails(mockDetails.name).subscribe((details) => {
      expect(details).toEqual(mockDetails);
    });

    const req = httpMock.expectOne(url);

    expect(req.request.method).toBe('GET');

    req.flush(mockDetails);
  });
});
