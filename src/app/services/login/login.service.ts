import {HttpService} from "../http.service";
import {tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends HttpService {
  private token: string | null = null;

  send(data: any): Observable<any> {
    data.phone = data.phone.replace(/[()\-\s]/g, "");
    return this.http.get(this.url + "login", {
      params: data,
      headers: {
        'Content-Type': 'application/json',
      }
    }).pipe(tap((data: any) => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.profile.id);
      }

    }));
  }

  register(data: any): Observable<any> {
    return this.http.post(this.url + "register", data).pipe(tap((data: any) => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.profile.id);
      }
      return data;
    }));
  }

  setToken(token: string | null) {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  isAuth(): boolean {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token') != null;
    }
    return false;
  }

  logout(): void {
    this.setToken(null);
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  }
}
