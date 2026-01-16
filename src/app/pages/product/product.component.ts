import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AddGetService} from "../../services/adds/add.get.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, OnDestroy {

  aSub: Subscription | undefined;

  protected product: any;
  protected id: any | null;

  constructor(private service: AddGetService, private route: ActivatedRoute) {
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.aSub = this.service.getAdd(this.id).subscribe({
        next: (data: any) => {
          this.product = data;
          console.log(this.product);
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    });
  }
}
