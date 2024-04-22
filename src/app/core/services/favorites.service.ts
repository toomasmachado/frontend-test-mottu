import { Injectable } from '@angular/core';
import { FavoritesStateService } from '../state/favorites-state.service';
import { Observable, map } from 'rxjs';
import { Character } from '../interfaces/character.interface';

@Injectable({ providedIn: 'root' })
export class FavoritesService {

  constructor(private state: FavoritesStateService) { }

  favorites$ = this.state.favorites;

  addFavorite(character: Character): void {
    this.state.addFavorite(character);
  }

  removeFavorite(character: Character): void {
    this.state.removeFavorite(character);
  }

  getFavoriteCount(): Observable<number> {
    return this.state.favorites.pipe(
      map((favorites: Character[]) => favorites.length)
    );
  }

  containsFavorite(character: Character): boolean {
    return this.state.containFavorite(character);
  }

  getById(index: number, item: any) {
    return item ? item.id : null;
  }
}
