import { Component } from '@angular/core';
import {FooterComponent} from "../../components/footer/footer.component";

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    FooterComponent
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {

}
