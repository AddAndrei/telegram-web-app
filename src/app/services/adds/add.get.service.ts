import {HttpService} from "../http.service";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AddGetService extends HttpService {

  getAdds(filters: any): Observable<any> {
    return this.http.get(this.url + "adds", {
        params: {
          filters: JSON.stringify(filters.filters),
          page: filters.page,
        }
      }
    ).pipe(tap((data: any) => {
      return data;
    }));
  }

  getAdd(id: any): Observable<any> {
    return this.http.get(this.url + `adds/${id}`).pipe(tap((data: any) => {
      return data;
    }));
  }
}
