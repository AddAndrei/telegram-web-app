import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild, GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot, UrlTree
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

  canActivate():Observable<boolean> | boolean | UrlTree {
    if (this.storage.isAuth()) {
      return true;
    } else {
      return this.router.createUrlTree(['login']);
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.canActivate();
  }
}
