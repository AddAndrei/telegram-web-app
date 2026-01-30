import {Component, OnDestroy, OnInit} from '@angular/core';
import {FooterComponent} from "../../components/footer/footer.component";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {ProfileService} from "../../services/profile/profile.service";
import {HttpClientModule} from "@angular/common/http";
import {Subscription} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {ReviewService} from "../../services/reviews/review.service";
import {RatingModule, StarRatingComponent} from "@khajegan/ng-starrating";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FooterComponent,
    NgOptimizedImage,
    HttpClientModule,
    NgIf,
    NgForOf,
    RatingModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, OnDestroy {

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
  aSub: Subscription | undefined;
  reviewsSub: Subscription | undefined;
  protected profileData: any;
  protected onLoaded: boolean = false;
  protected reviews: any;

  constructor(
    private profile: ProfileService,
    private reviewsService: ReviewService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.aSub = this.profile.getProfile().subscribe({
      next: (data: any) => {
        this.onLoaded = true;
        this.profileData = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
    this.reviewsSub = this.reviewsService.getReviews().subscribe({
      next: (data: any) => {
        this.reviews = data;
        console.log(this.reviews);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
    if (this.reviewsSub) {
      this.reviewsSub.unsubscribe();
    }
  }

  getDate(publicDate: string): string {
    let date = new Date(publicDate);
    return `${date.getDate()} ${this.monthes[date.getMonth()]}`;
  }

  goToProfile(id: any) {
    this.router.navigate(['/profile', id]);
  }

  onRate($event: { oldValue: number; newValue: number; starRating: StarRatingComponent }) {

  }

  logout() {
    this.profile.logout().subscribe({
      next: (data: any) => {
        this.router.navigate(["/login"]);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
