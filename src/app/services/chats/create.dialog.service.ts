import {Injectable} from "@angular/core";
import {HttpService} from "../http.service";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class CreateDialogService extends HttpService {
  createDialog(id: any): Observable<any> {
    return this.http.post(this.url + `messages/chat/create/${id}`, {}).pipe(tap((data: any) => {
      return data;
    }));
  }
}
