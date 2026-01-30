import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {Subscription} from "rxjs";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {GetDialogService} from "../../services/chats/get.dialog.service";
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {WebSocketService} from "../../services/socket/web.socket.service";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    FooterComponent,
    RouterLink,
    NgOptimizedImage,
    NgIf,
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren('itemsRef') itemsElements!: QueryList<ElementRef>;
  @ViewChild('chat') chat!: ElementRef;
  @ViewChild('message') message!: ElementRef;
  private aSub: Subscription | undefined;
  private wsSub: Subscription | undefined;
  private id: string | null = '';
  protected data: any | undefined;
  protected myId: string | null = '';
  protected onloadData = false;
  protected scroll = 150;
  filters: any = {
    sorting: [{
      field: 'id',
      value: 'DESC'
    }],
    page: 1,
  }

  constructor(
    private route: ActivatedRoute,
    private service: GetDialogService,
    private ws: WebSocketService,
  ) {
    this.myId = localStorage.getItem('id')
  }

  ngAfterViewInit(): void {
    this.itemsElements.changes.subscribe(() => {
      this.calculateHeights();
    });
    this.calculateHeights();
  }

  calculateHeights() {
    this.itemsElements.forEach(el => {
      this.scroll += el.nativeElement.offsetHeight + 14;
      this.chat.nativeElement.scrollIntoView({behavior: 'instant', block: 'end'});
    });
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
    if (this.wsSub) {
      this.wsSub.unsubscribe();
      this.ws.close();
    }
  }

  getTime(dateMessage: any): string {
    let date: Date = new Date(dateMessage);
    let hours = (date.getHours() < 10) ? `0${date.getHours()}` : date.getHours();
    let minutes = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes();
    return `${hours}:${minutes}`;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.aSub = this.service.getDialog(this.id, this.filters).subscribe({
        next: (data: any) => {
          this.data = data.data;
          this.onloadData = true;
        },
        error: (error: any) => {
          console.log(error);
        }
      });
      this.wsSub = this.ws.connect(`ws://194.87.104.120:8080/?token=${this.myId}`).subscribe(
        msg => console.log(msg),
        err => console.error(err),
        () => console.log('Connection closed')
      );
    });
  }

  sendMessage(): void {
    if (this.message.nativeElement.value !== '') {
      const message = {
        date: new Date(),
        message: this.message.nativeElement.value,
        sender: {
          id: this.myId,
        }
      }
      this.data.unshift(message);
      this.ws.sendMessage({
        id: 1,
        message: this.message.nativeElement.value,
        from_user_id: this.myId,
        to_user_id: 8,
        request_chat_id: 1,
        type: 'request_send_message'
      });
    }
  }
}
