import { Component } from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {NgOptimizedImage} from "@angular/common";
import {FooterComponent} from "../../components/footer/footer.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [LucideAngularModule, NgOptimizedImage, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  testServ(){
    console.log('ok');
  }
}
