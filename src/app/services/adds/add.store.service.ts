import {HttpService} from "../http.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {HttpHeaders} from "@angular/common/http";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AddStoreService extends HttpService {
  store(data: FormGroup): Observable<any> {
    const formData = new FormData();

    formData.append('title', data.get('title')?.value);
    formData.append('category_id', data.get('category_id')?.value);
    formData.append('description', data.get('description')?.value);
    formData.append('price', data.get('price')?.value);
    formData.append('city', data.get('city')?.value);
    formData.append('mark_id', data.get('mark_id')?.value);
    formData.append('model_id', data.get('model_id')?.value);
    formData.append('color_id', data.get('color_id')?.value);
    formData.append('memory_id', data.get('memory_id')?.value);
    const files: FileList = data.get('images')?.value;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('images[]', files[i], files[i].name);
      }
    }

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post(this.url + "adds", formData, {
      headers:headers
    }).pipe(
      tap((data: any) => {
        return data;
      })
    )
  }
}
