import {Component, HostListener, inject, OnDestroy, OnInit} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {FilterComponent} from "../../components/filter/filter.component";
import {MatDialog} from '@angular/material/dialog';
import {FooterComponent} from "../../components/footer/footer.component";
import {ProductsComponent} from "../../components/products/products.component";
import {AddGetService} from "../../services/adds/add.get.service";
import {debounceTime, Subject, Subscription} from "rxjs";


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [LucideAngularModule, NgOptimizedImage, FilterComponent, FooterComponent, ProductsComponent, NgForOf],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit, OnDestroy {
  inputSubject: Subject<any> = new Subject<any>();

  readonly dialog = inject(MatDialog);
  aSub: Subscription | undefined;


  filters: any = {
    filters: [{
      field: 'category',
      value: 1
    }],
    page: 1,
  }

  public products: any = [];

  pageHeight: number = 0;
  halfPage: number = 0;

  //pagination
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= this.pageHeight - this.halfPage) {
      this.pageHeight = (this.pageHeight * 2);
      this.filters.page++;
      this.getAddsByCategory(true);
    }
  }

  constructor(private add: AddGetService) {

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
    this.inputSubject.pipe(debounceTime(1000)).subscribe(value => {
      this.handleInput(value)
    });
  }

  handleInput($event: any) {
    this.filters = {
      filters: [{
        field: 'category',
        value: 1
      }, {
        field: 'search',
        value: $event.target.value
      }],
      page: 1,
    }
    this.getAddsByCategory();
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  getAddsByCategory(add: boolean = false) {
    this.aSub = this.add.getAdds(this.filters).subscribe({
      next: (data: any) => {
        this.setProducts(data.data, add);
      },
      error: (error) => {
        this.add.errorHandle(error);
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

  changeCategory(categoryId: number) {
    this.filters = {
      filters: [{
        field: 'category',
        value: 1
      }],
      page: 1,
    }
    this.filters.page = 1;
    this.filters.filters[0].value = categoryId;
    this.pageHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    );
    this.getAddsByCategory(false);
  }

  openModal() {
    const dialogRef = this.dialog.open(FilterComponent, {
      width: '100%',
      height: '100%',
      maxWidth: '100%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.filters.filters[0].value = result.message.category;
      if (!this.empty(result.message.city)) {
        this.filters.filters.push({field: "city", value: result.message.city});
      }
      if (!this.empty(result.message.color)) {
        this.filters.filters.push({field: "color", value: result.message.color});
      }
      if (!this.empty(result.message.from)) {
        this.filters.filters.push({field: "from", value: result.message.from});
      }
      if (!this.empty(result.message.to)) {
        this.filters.filters.push({field: "to", value: result.message.to});
      }
      if (!this.empty(result.message.mark)) {
        this.filters.filters.push({field: "mark", value: result.message.mark});
      }
      if (!this.empty(result.message.memory)) {
        this.filters.filters.push({field: "memory", value: result.message.memory});
      }
      if (!this.empty(result.message.model)) {
        this.filters.filters.push({field: "model", value: result.message.model});
      }
      this.getAddsByCategory();
    });
  }

  empty(str: string): boolean {
    return str.length === 0;
  }
}
