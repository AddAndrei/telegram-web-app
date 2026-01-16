import {HttpService} from "../http.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class GetDialogService extends HttpService {
  getDialog(id: string | null, filters: any): Observable<any> {
    return this.http.get(this.url + `messages/${id}`).pipe(tap((data: any) => {
      return data;
    }));
  }
}
