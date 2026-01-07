import {Component, Input} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatCard, MatCardImage} from "@angular/material/card";
import {NgForOf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    MatCard,
    MatCardImage,
    NgOptimizedImage,
    NgForOf
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  @Input() products: any;
}
