import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Subscription} from "rxjs";
import {ReviewService} from "../../services/reviews/review.service";
import {RatingModule, StarRatingComponent} from "@khajegan/ng-starrating";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Location, NgIf} from "@angular/common";
import {PopupComponent} from "../../components/popup/popup.component";

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    RouterLink,
    RatingModule,
    ReactiveFormsModule,
    NgIf,
    PopupComponent
  ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({
    review: new FormControl(null, [
      Validators.required
    ]),
  });
  protected profile_id: any;
  aSub: Subscription | undefined;
  protected descriptionLength: number = 0;
  protected rate: number = 1;

  isPopupVisible: boolean = false;
  protected favoriteMessage: string | null = '';
  protected isAnswered: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private service: ReviewService,
    private location: Location,
  ) {
  }

  reviewInput($event: any) {
    this.descriptionLength = $event.target.value.length;
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.profile_id = params.get('id');
    });
  }

  popupClose(data: boolean): void {
    this.isPopupVisible = data;
    this.isAnswered = false;
    this.form.enable();
  }

  showPopup() {
    this.isPopupVisible = true;
  }

  onRate($event: { oldValue: number; newValue: number; starRating: StarRatingComponent }) {
    this.rate = $event.newValue;
  }

  sendData() {
    this.form.disable();
    const data = {
      review: this.form.get('review')?.value,
      rate: this.rate,
      profile_id: this.profile_id,
    };
    this.service.createReview(data).subscribe({
      next: (data: any) => {
        this.isAnswered = true;
        this.favoriteMessage = 'Отзыв успешно оставлен';
        this.showPopup();
      },
      error: (error: any) => {
        this.isAnswered = true;
        this.favoriteMessage = error.error.data.errors.message;
        this.showPopup();

      }

    });
  }

  goBack() {
    this.location.back();
  }
}
