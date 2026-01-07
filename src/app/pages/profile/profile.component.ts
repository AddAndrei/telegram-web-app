import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../../components/footer/footer.component";
import {NgOptimizedImage} from "@angular/common";
import {ProfileService} from "../../services/profile/profile.service";
import {HttpClientModule} from "@angular/common/http";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FooterComponent,
    NgOptimizedImage,
    HttpClientModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  aSub: Subscription | undefined;
  constructor(private profile: ProfileService) {

  }

  ngOnInit(): void {
    this.aSub = this.profile.getProfile().subscribe({
      next: (data:any) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
