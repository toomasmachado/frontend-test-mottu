import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, of, switchMap } from 'rxjs';
import { Character } from '../interfaces/character.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CharacterService {
  _query = new Subject<string>();

  readonly API = `https://rickandmortyapi.com/api/character`;

  private query: string = '';
  private url?: string;

  constructor(private http: HttpClient) { }

  reset() {
    this.query = '';
    this.url = undefined;
  }

  searchCharacters(search: string, url: string = this.API): Observable<any> {
    return this.http.get<any>(url, { params: { name: search } });
  }

  searchCharacter(characterName: string): Observable<Character[]> {
    this._query.next(characterName);

    return this._query.pipe(
      switchMap(characterName => {
        this.query = characterName;
        return this.searchCharacters(this.query).pipe(
          catchError(this.notFound()),
          map(response => this.resultsAndUrl(response)));
      }),
    );
  }

  loadCharacters(): Observable<Character[]> {
    return this.searchCharacters(this.query, this.url).pipe(
      catchError(this.notFound()),
      map(response => this.resultsAndUrl(response))
    );
  }

  private resultsAndUrl(response: any): Character[] {
    this.url = response.info.next;
    return response.results;
  }

  private notFound(): (error: HttpErrorResponse) => Observable<any> {
    return (error: HttpErrorResponse) => {
      if (error.status === 404) {
        return of({ results: [], info: {} });
      }
      throw error;
    }
  }

  getById(index: number, item: any) {
    return item ? item.id : null;
  }

  get nextUrl(): string | undefined {
    return this.url;
  }
}
