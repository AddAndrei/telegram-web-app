import {Component, EventEmitter, Inject, OnDestroy, OnInit, Output} from '@angular/core';
import {MatBadgeModule} from '@angular/material/badge';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MainComponent} from "../../pages/main/main.component";
import {RouterLink} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {GetSystem} from "../../services/system/get.system";
import {Subscription} from "rxjs";

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
    NgForOf,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnInit, OnDestroy {
  @Inject(MAT_DIALOG_DATA) public data: any;

  form: FormGroup = new FormGroup({
    category: new FormControl("1"),
    city: new FormControl(''),
    from: new FormControl(''),
    to: new FormControl(''),
    mark: new FormControl(''),
    model: new FormControl(''),
    color: new FormControl(''),
    memory: new FormControl(''),
  });
  is_not_telephones = true;
  protected selectedValue: string = "1";
  protected systems: any = [];
  private aSub: Subscription | undefined;
  protected models: any = [];
  protected findedMark: any = [];
  protected currenMark: string | null = null;

  constructor(public dialogRef: MatDialogRef<MainComponent>, private system: GetSystem) {

  }

  ngOnInit(): void {
    this.selectedValue = "1";
    this.aSub = this.system.get().subscribe({
      next: (data: any) => {
        this.systems = data;
        this.models = this.systems.marks[0].models;
        this.form.setValue({
          category: "1",
          city: '',
          from: '',
          to: '',
          mark: this.systems.marks[0].id,
          model: this.systems.marks[0].models[0].model.id,
          color: this.systems.colors[0].id,
          memory: this.systems.memories[0].id,
        });

      },
      error: (data: any) => {
        console.log(data)
      }
    });
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  changeMark($event: any) {
    this.findedMark = this.systems.marks.find((mark: { id: any; }) => mark.id == $event.target.value);
    this.currenMark = $event.target.value;
    this.models = this.findedMark.models;
    this.form.get('model')?.setValue(`${this.models[0].model_id}`);
  }

  onSelectChange($event: any) {
    if ($event === '1') {
      this.is_not_telephones = true;
      this.form.patchValue({
        mark: (this.currenMark === null) ? this.systems.marks[0].id : this.currenMark,
        model: this.models[0].model_id,
        color: this.systems.colors[0].id,
        memory: this.systems.memories[0].id,
      });
    } else {
      this.is_not_telephones = false;
      this.form.patchValue({
        mark: '',
        model: '',
        color: '',
        memory: '',

      });
    }

  }

  closeDialog() {
    this.dialogRef.close({success: true, message: 'closed'});
  }

  send() {
    this.dialogRef.close({success: true, message: this.form.value});
  }


}
