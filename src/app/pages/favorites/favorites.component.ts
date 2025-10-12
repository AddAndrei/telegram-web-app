import { Component } from '@angular/core';
import {FooterComponent} from "../../components/footer/footer.component";

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    FooterComponent
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {

}
