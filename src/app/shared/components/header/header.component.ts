import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FavoritesService } from 'src/app/core/services/favorites.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  favoriteCount$: Observable<number>;

  constructor(
    public router: Router,
    private favoritesSrv: FavoritesService
  ) {
    this.favoriteCount$ = this.favoritesSrv.getFavoriteCount();
  }

  ngOnInit(): void {

  }

}
