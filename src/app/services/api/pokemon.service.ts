import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { PokemonDetails, PokemonListResponse } from '@poke/models/pokemon.model';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = `${environment.apiUrl}/pokemon`;

  constructor(private http: HttpClient) {}

  getPokemonList(url: string): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(url);
  }

  getPokemonDetails(name: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(`${this.baseUrl}/${name}`);
  }
}
