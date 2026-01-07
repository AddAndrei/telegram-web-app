import {Component} from '@angular/core';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialogRef} from "@angular/material/dialog";
import {MainComponent} from "../../pages/main/main.component";
import {RouterLink} from "@angular/router";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    MatBadgeModule,
    RouterLink,
    MatCheckbox,
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    NgIf,
    FormsModule,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  disabledSelect = new FormControl(false);
  is_not_telephones = true;
  protected selectedValue: string = "telephones";

  constructor(public dialogRef: MatDialogRef<MainComponent>) {
  }

  onSelectChange($event: any) {
    this.is_not_telephones = ($event === 'telephones');
  }

  closeDialog() {
    this.dialogRef.close();
  }

  send() {
    console.log("ok");
  }
}
