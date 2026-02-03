import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild, GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import {LoginService} from "../../services/login/login.service";
import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {StorageService} from "../../services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private storage: StorageService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.storage.isAuth()) {
      return of(true);
    } else {
      void this.router.navigate(['login']);
      return of(false);
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.canActivate(childRoute, state);
  }
}
