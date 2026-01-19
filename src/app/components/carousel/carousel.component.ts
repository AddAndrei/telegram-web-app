import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements AfterViewInit{
  @Input() images: any;
  @Input() controls: boolean = false;
  @Input() touch: boolean = false;
  @ViewChild('slide') slide!: ElementRef;


  ngAfterViewInit(): void {
    console.log(this.slide.nativeElement);
  }
}
