import {LoginService} from "../../services/login/login.service";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private login: LoginService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.login.isAuth()) {
      req = req.clone({
        setHeaders: {
          "Authorization": "" + this.login.getToken()?.toString()
        }
      });
    }
    return next.handle(req);
  }

}
