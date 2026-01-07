import {HttpService} from "../http.service";
import {Injectable} from "@angular/core";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends HttpService {

  getProfile() {
    let tok: string | null = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', '' + tok)
    console.log(localStorage.getItem('token'));
    return this.http.get(this.url + "profile", {
      headers
    });
  }
}
