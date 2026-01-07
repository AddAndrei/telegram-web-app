import { Component } from '@angular/core';
import {FooterComponent} from "../../components/footer/footer.component";

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [
    FooterComponent
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {

}
