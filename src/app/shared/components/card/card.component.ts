import { Component, Input, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/core/services/favorites.service';
import { Character } from 'src/app/core/interfaces/character.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() character!: Character;

  constructor(
    private favoriteSrv: FavoritesService
  ) { }

  ngOnInit(): void {
  }

  toggleFavorite(character: Character) {
    return (!this.isFavorite(character)) ? this.favoriteSrv.addFavorite(character) : this.favoriteSrv.removeFavorite(character);
  }

  isFavorite(character: Character): boolean {
    return this.favoriteSrv.containsFavorite(character);
  }
}
