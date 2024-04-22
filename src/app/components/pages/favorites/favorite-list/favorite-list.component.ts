import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/core/services/favorites.service';
import { Character } from 'src/app/core/interfaces/character.interface';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent implements OnInit {
  
  favorites: Character[] = [];
  getById = this.favoriteSrv.getById;

  constructor(
    private favoriteSrv: FavoritesService,
  ) { }

  ngOnInit(): void {
    this.favoriteSrv.favorites$.subscribe(favorites => this.favorites = favorites);
  }

  noFavorites(): boolean {
    return this.favorites.length === 0;
  }
}
