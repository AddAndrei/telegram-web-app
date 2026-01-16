import {Injectable} from "@angular/core";
import {HttpService} from "../http.service";
import {tap} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class GetMessagesService extends HttpService {
  getMessages(): Observable<any> {
    return this.http.get(this.url + "messages").pipe(tap((data: any) => {
      return data;
    }));
  }
}
