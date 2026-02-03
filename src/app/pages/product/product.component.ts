import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage, Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {AddGetService} from "../../services/adds/add.get.service";
import {Subscription} from "rxjs";
import {CarouselComponent} from "../../components/carousel/carousel.component";
import {RatingModule} from "@khajegan/ng-starrating";
import {AddFavoriteService} from "../../services/favorite/add.favorite.service";
import {PopupComponent} from "../../components/popup/popup.component";
import {BroswerService} from "../../services/broswer.service";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CarouselComponent,
    NgIf,
    RatingModule,
    PopupComponent,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, OnDestroy {

  aSub: Subscription | undefined;

  protected product: any;
  protected id: any | null;
  protected date: any;
  protected monthes: any = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  protected onLoaded: boolean = false;
  isPopupVisible: boolean = false;
  protected favoriteMessage: string | null = '';
  protected isAnswered: boolean = false;

  constructor(
    private service: AddGetService,
    private favoriteService: AddFavoriteService,
    private route: ActivatedRoute,
    private device: BroswerService,
    private router: Router,
    private location: Location,
    private storage:StorageService
  ) {
  }

  popupClose(data: boolean): void {
    this.isPopupVisible = data;
    this.isAnswered = false;
  }

  goBack() {
    this.location.back();
  }

  showPopup() {
    this.isPopupVisible = true;
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.aSub = this.service.getAdd(this.id, this.device.getBrowserId()).subscribe({
        next: (data: any) => {
          this.product = data;
          this.date = new Date(data.updated);
          this.onLoaded = true;
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    });
  }

  favorite(id: any) {
    this.aSub = this.favoriteService.add(id).subscribe({
      next: (data: any) => {
        this.isAnswered = true;
        this.favoriteMessage = data.message;
        this.showPopup();
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onRate(event: any) {

  }

  goToProfile(id: any) {
    const myId = this.storage.getItem('id');
    if (id != myId) {
      this.router.navigate(["/profile", id]);
    }
  }
}
