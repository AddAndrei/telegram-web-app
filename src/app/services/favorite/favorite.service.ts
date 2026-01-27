import {HttpService} from "../http.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService extends HttpService {
  getFavoriteAdds(filters: any): Observable<any> {
    return this.http.get(this.url + "favorite", {
      params: {
        page: filters.page,
      }
    }).pipe(tap((data: any) => {
      return data;
    }));
  }
}
