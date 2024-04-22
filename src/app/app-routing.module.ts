import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/pages/characters/characters.module').then(m => m.CharactersModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./components/pages/favorites/favorites.module').then(m => m.FavoritesModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
