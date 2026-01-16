import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: WebSocket;
  private messagesSubject = new Subject();

  public connect(url: string): Observable<any> {
    this.socket = new WebSocket(url);

    this.socket.onmessage = (event) => {
      this.messagesSubject.next(JSON.parse(event.data));
    };

    this.socket.onerror = (event) => {
      this.messagesSubject.error(event);
    };

    this.socket.onclose = () => {
      this.messagesSubject.complete();
    };

    return this.messagesSubject.asObservable();
  }

  public sendMessage(msg: any) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(msg));
    }
  }

  public close() {
    this.socket.close();
  }
}
