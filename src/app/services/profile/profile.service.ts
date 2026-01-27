import {HttpService} from "../http.service";
import {Injectable} from "@angular/core";
import {HttpHeaders} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends HttpService {

  getProfile(): Observable<any> {
    return this.http.get(this.url + "profile").pipe(tap((data: any) => {
      return data;
    }));
  }

  getProfileById(id: any): Observable<any> {
    return this.http.get(this.url + `profile/${id}`).pipe(tap((data: any) => {
      return data;
    }));
  }
}
