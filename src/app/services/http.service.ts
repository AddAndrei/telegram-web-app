import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class HttpService {

  private is_dev: boolean = true;

  protected url: string = "http://127.0.0.1:8000/api/";

  constructor(protected http: HttpClient) {
    this.url = (this.is_dev) ? "http://127.0.0.1:8000/api/" : "";
  }
}
