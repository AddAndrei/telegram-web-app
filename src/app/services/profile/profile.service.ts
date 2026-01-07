import {HttpService} from "../http.service";
import {Injectable} from "@angular/core";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends HttpService {

  getProfile() {
    return this.http.get(this.url + "profile");
  }
}
