import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Character } from './character';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  constructor(private http: HttpClient) { }

  getCharacters$(): Observable<Character[]> {
    return this.http.get<any>('https://swapi.dev/api/people/').pipe(
      map(swapiResult => swapiResult.results)
    );
  }
}