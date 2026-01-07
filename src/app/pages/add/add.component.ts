import { Component } from '@angular/core';
import {FooterComponent} from "../../components/footer/footer.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-add',
  standalone: true,
    imports: [
        FooterComponent,
        FormsModule,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {


  is_not_telephones = true;
  protected selectedValue: string = "telephones";

  onSelectChange($event: any) {
    this.is_not_telephones = ($event === 'telephones');
  }

}
