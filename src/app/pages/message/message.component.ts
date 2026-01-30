import {Component, OnDestroy, OnInit} from '@angular/core';
import {FooterComponent} from "../../components/footer/footer.component";
import {Subscription} from "rxjs";
import {GetMessagesService} from "../../services/chats/get.messages.service";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [
    FooterComponent,
    NgOptimizedImage,
    NgIf,
    NgForOf
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit, OnDestroy {
  private monthes: any = {
    '0': 'января',
    '1': 'февраля',
    '2': 'марта',
    '3': 'апреля',
    '4': 'мая',
    '5': 'июня',
    '6': 'июля',
    '7': 'августа',
    '8': 'сентября',
    '9': 'октября',
    '10': 'ноября',
    '11': 'декабря'
  }
  aSub: Subscription | undefined;
  protected messages: any = [];
  protected onLoaded: boolean = false;

  constructor(private service: GetMessagesService, private router: Router) {
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  setDate(dateMessage: any): string {
    let date: Date = new Date(dateMessage);
    let currentDate = new Date();
    let timeString: string = "";
    if (date.getMonth() === currentDate.getMonth() && date.getDay() === currentDate.getDay()) {
      timeString = "Сегодня";
    } else if (date.getMonth() === currentDate.getMonth() && (currentDate.getDay() - date.getDay() == 1)) {
      timeString = "Вчера";
    } else {
      let index = date.getMonth().toString();
      timeString = `${date.getDate()} ${this.monthes[index]}`;
    }
    return timeString;
  }

  navigate(id: number) {
    this.router.navigate(['/dialog', id]);
  }


  truncateText(text: string, maxLength: number): string {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

  ngOnInit(): void {
    this.aSub = this.service.getMessages().subscribe({
      next: (data: any) => {
        this.messages = data.data;
        this.onLoaded = true;
        console.log(this.messages);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
}
