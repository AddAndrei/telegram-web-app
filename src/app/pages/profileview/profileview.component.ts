import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ProfileService} from "../../services/profile/profile.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {FooterComponent} from "../../components/footer/footer.component";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {RatingModule, StarRatingComponent} from "@khajegan/ng-starrating";

@Component({
  selector: 'app-profileview',
  standalone: true,
  imports: [
    FooterComponent,
    NgForOf,
    NgIf,
    NgOptimizedImage,
    RatingModule
  ],
  templateUrl: './profileview.component.html',
  styleUrl: './profileview.component.css'
})
export class ProfileviewComponent implements OnInit, OnDestroy {

  aSub: Subscription | undefined;
  protected profileData: any;
  protected onLoaded: boolean = false;
  protected id: any;

  constructor(private route: ActivatedRoute, private service: ProfileService, private router: Router) {
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.aSub = this.service.getProfileById(this.id).subscribe({
        next: (data: any) => {
          this.profileData = data;
          this.onLoaded = true;
          console.log(this.profileData);
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    });
  }

  toReview() {
    this.router.navigate(['/review', this.profileData.profile.id]);
  }
}
