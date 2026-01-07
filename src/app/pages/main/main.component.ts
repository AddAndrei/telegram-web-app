import {Component, inject} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {NgOptimizedImage} from "@angular/common";
import {FilterComponent} from "../../components/filter/filter.component";
import {MatDialog} from '@angular/material/dialog';
import {FooterComponent} from "../../components/footer/footer.component";
import {ProductsComponent} from "../../components/products/products.component";


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [LucideAngularModule, NgOptimizedImage, FilterComponent, FooterComponent, ProductsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  readonly dialog = inject(MatDialog);

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


  testServ(){
    console.log('ok');
  }

  openModal(){
    this.dialog.open(FilterComponent, {
      width:'100%',
      height:'100%',
      maxWidth:'100%',
    });
  }
}
