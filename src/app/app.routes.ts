import {Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {FavoritesComponent} from "./pages/favorites/favorites.component";
import {AddComponent} from "./pages/add/add.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {MessageComponent} from "./pages/message/message.component";
import {AuthGuard} from "./shared/classes/AuthGuard";
import {LoginComponent} from "./pages/login/login.component";

export const routes: Routes = [
  {path: '', component: MainComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'favorites', component: FavoritesComponent},
  {path: 'add', component: AddComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'messages', component: MessageComponent},
  {path: 'login', component: LoginComponent}
];
