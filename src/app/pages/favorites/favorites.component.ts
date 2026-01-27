import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {FooterComponent} from "../../components/footer/footer.component";
import {ProductsComponent} from "../../components/products/products.component";
import {NgIf} from "@angular/common";
import {debounceTime, Subject, Subscription} from "rxjs";
import {FavoriteService} from "../../services/favorite/favorite.service";

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
export class FavoritesComponent implements OnInit, OnDestroy {
  inputSubject: Subject<any> = new Subject<any>();
  public products: any = [];
  aSub: Subscription | undefined;

  pageHeight: number = 0;
  halfPage: number = 0;
  filters: any = {
    page: 1,
  }

  constructor(private service: FavoriteService) {
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= this.pageHeight - this.halfPage) {
      this.pageHeight = (this.pageHeight * 2);
      this.filters.page++;
      this.getAddsByCategory(true);
    }
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }

  }

  ngOnInit(): void {
    this.getAddsByCategory();
    this.pageHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    );
    this.halfPage = (this.pageHeight / 2);
  }


  getAddsByCategory(add: boolean = false) {
    this.aSub = this.service.getFavoriteAdds(this.filters).subscribe({
      next: (data: any) => {
        console.log(data);
        console.log(this.filters);
        this.setProducts(data.data, add);
      },
      error: (error: any) => {

      }
    });
  }

  setProducts(data: any, add: boolean = false) {
    if (add) {
      this.products.push(...data);
    } else {
      this.products = data;
    }
  }
}
