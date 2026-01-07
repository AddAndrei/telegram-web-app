import { Component } from '@angular/core';
import {FooterComponent} from "../../components/footer/footer.component";
import {ProductsComponent} from "../../components/products/products.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    FooterComponent,
    ProductsComponent,
    NgIf
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  public test = null;
  public products = [{
    model:"iPhone 8",
    memory:"8 Gb",
    price:"18000",
    city:"Юхнов"
  },{
    model:"iPhone 8",
    memory:"16 Gb",
    price:"25000",
    city:"Москва"
  },{
    model:"iPhone 12",
    memory:"256 Gb",
    price:"250000",
    city:"Калуга"
  }];
}
