import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ProfileService} from "../../services/profile/profile.service";
import {FooterComponent} from "../../components/footer/footer.component";
import {Location, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {RatingModule, StarRatingComponent} from "@khajegan/ng-starrating";
import {CreateDialogService} from "../../services/chats/create.dialog.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

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

  constructor(
    private route: ActivatedRoute,
    private service: ProfileService,
    private router: Router,
    private location: Location,
    private dialog: CreateDialogService) {
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
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    });
  }

  goBack() {
    this.location.back();
  }

  toReview() {
    this.router.navigate(['/review', this.profileData.profile.id]);
  }

  createOrGoToDialog(id: any) {
    this.dialog.createDialog(id).subscribe({
      next: (data: any) => {
        this.router.navigate(['/dialog', data.id]);
      },
      error: (error: any) => {
        console.log(error);
      }
    });

  }
}
