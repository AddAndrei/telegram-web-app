import {Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {FavoritesComponent} from "./pages/favorites/favorites.component";
import {AddComponent} from "./pages/add/add.component";

export const routes: Routes = [
  {path: '', component: MainComponent, pathMatch: 'full'},
  {path: 'favorites', component: FavoritesComponent},
  {path: 'add', component: AddComponent}
];
