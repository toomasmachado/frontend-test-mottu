import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '../interfaces/character.interface';

@Injectable({ providedIn: 'root' })
export class FavoritesStateService {

  private favoritesObj = new BehaviorSubject<Character[]>([]);

  favorites = this.favoritesObj.asObservable();

  addFavorite(character: Character): void {
    this.favoritesObj.next([...this.favoritesObj.getValue(), character]);
  }

  removeFavorite(character: Character): void {
    this.favoritesObj.next(this.favoritesObj.getValue().filter(currCharacter => currCharacter.id !== character.id));
  }

  containFavorite(character: Character): boolean {
    return this.favoritesObj.getValue().some(currCharacter => currCharacter.id === character.id);
  }
}
