import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";


@Injectable()
export class HttpService {

  private is_dev: boolean = false;

  protected url: string = "http://boyword:81/api/";
  protected browserUrl: string = "http://194.87.104.120:7777/phone.back.ru/api/"

  constructor(protected http: HttpClient, private router: Router) {
    this.url = (this.is_dev) ? this.url : this.browserUrl;
  }

  errorHandle(error: any) {
    if (error.status === 401 || error.error.message === 'Unauthenticated.') {
      this.router.navigate(['/login']);
    }
  }
}
