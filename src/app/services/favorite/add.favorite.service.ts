import {HttpService} from "../http.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AddFavoriteService extends HttpService {
  add(id: any): Observable<any> {
    return this.http.get(this.url + `favorite/add/${id}`).pipe(tap((data: any) => {
      return data;
    }));
  }

  remove(id: any): Observable<any> {
    return this.http.get(this.url + `favorite/remove/${id}`).pipe(tap((data:any)=>{
      return data;
    }))
  }
}
