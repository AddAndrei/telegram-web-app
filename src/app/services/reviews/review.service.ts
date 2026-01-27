import {Injectable} from "@angular/core";
import {HttpService} from "../http.service";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class ReviewService extends HttpService {
  getReviews():Observable<any>{
    return this.http.get(this.url + "reviews");
  }

  createReview(data:any):Observable<any> {
    return this.http.post(this.url + 'reviews', data).pipe(tap((data:any)=>{
      return data;
    }));
  }
}
