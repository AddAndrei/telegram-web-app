import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {StorageService} from "../../services/storage.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private storage: StorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.storage.isAuth()) {
      req = req.clone({
        setHeaders: {
          'Accept': 'application/json',
          Authorization: "Bearer " + this.storage.getItem('token')
        }
      });
    }
    return next.handle(req);
  }

}
