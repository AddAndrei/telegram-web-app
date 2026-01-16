import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatCard, MatCardImage} from "@angular/material/card";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Subscription} from "rxjs";
import {AddFavoriteService} from "../../services/adds/add.favorite.service";
import {PopupComponent} from "../popup/popup.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    MatCard,
    MatCardImage,
    NgOptimizedImage,
    NgForOf,
    NgIf,
    PopupComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy {
  @Input() products: any;
  aSub: Subscription | undefined;
  isPopupVisible: boolean = false;
  protected favoriteMessage: string | null = '';
  protected isAnswered: boolean = false;

  constructor(private service: AddFavoriteService, private router: Router) {
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  popupClose(data: boolean): void {
    this.isPopupVisible = data;
    this.isAnswered = false;
  }

  showPopup() {
    this.isPopupVisible = true;
  }

  ngOnInit(): void {

  }

  favorite(id: any) {
    this.aSub = this.service.add(id).subscribe({
      next: (data: any) => {
        this.isAnswered = true;
        this.favoriteMessage = data.message;
        this.showPopup();
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  goToProduct(id: any) {
    this.router.navigate(['/product', id]);
  }
}
