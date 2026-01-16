import {Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {FavoritesComponent} from "./pages/favorites/favorites.component";
import {AddComponent} from "./pages/add/add.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {MessageComponent} from "./pages/message/message.component";
import {AuthGuard} from "./shared/classes/AuthGuard";
import {LoginComponent} from "./pages/login/login.component";
import {DialogComponent} from "./components/dialog/dialog.component";
import {ProductComponent} from "./pages/product/product.component";

export const routes: Routes = [
  {path: '', component: MainComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard]},
  {path: 'add', component: AddComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'messages', component: MessageComponent, canActivate: [AuthGuard]},
  {path: 'dialog/:id', component: DialogComponent, canActivate: [AuthGuard]},
  {path: 'product/:id', component: ProductComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent}
];
