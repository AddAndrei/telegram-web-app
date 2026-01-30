import {Component, OnDestroy, OnInit} from '@angular/core';
import {FooterComponent} from "../../components/footer/footer.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Subscription} from "rxjs";
import {GetSystem} from "../../services/system/get.system";
import {AddStoreService} from "../../services/adds/add.store.service";


@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    FooterComponent,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit, OnDestroy {

  form: FormGroup = new FormGroup({
    category_id: new FormControl("1"),
    city: new FormControl('', [
      Validators.required,
    ]),
    title: new FormControl('', [
      Validators.required,
    ]),
    description: new FormControl('', [
      Validators.required,
    ]),
    price: new FormControl('', [
      Validators.required,
    ]),
    images: new FormControl('', [Validators.required]),
    mark_id: new FormControl(''),
    model_id: new FormControl(''),
    color_id: new FormControl(''),
    memory_id: new FormControl(''),
    city_id: new FormControl(''),
  });

  sendData(): void {
    this.form.disable();
    this.form.patchValue({
      price: String(this.form.get('price')?.value)
    });

    this.addAsub = this.addService.store(this.form).subscribe({
      next: (data: any) => {
        this.form.enable();
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  is_not_telephones = true;
  protected selectedValue: string = "1";
  aSub: Subscription | undefined;
  addAsub: Subscription | undefined;
  protected systems: any = [];
  protected models: any = [];
  protected findedMark: any = [];
  protected currenMark: string | null = null;
  protected titleLength: number = 0;
  protected descriptionLength: number = 0;
  protected price: number = 0;
  protected images: string[] = [];
  private defaultCategory = '1';
  protected loadImages: string[] = [];

  constructor(private system: GetSystem, private addService: AddStoreService) {
  }

  onSelectChange($event: any) {
    this.is_not_telephones = ($event === this.defaultCategory);
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
    if (this.addAsub) {
      this.addAsub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.aSub = this.system.get().subscribe({
      next: (data: any) => {
        this.systems = data;
        this.models = this.systems.marks[0].models;
        this.form.patchValue({
          mark_id: this.systems.marks[0].id,
          model_id: this.systems.marks[0].models[0].model.id,
          color_id: this.systems.colors[0].id,
          memory_id: this.systems.memories[0].id,
        });
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onFileSelected($event: any): void {
    const files = $event.target.files;
    if (files.length > 0) {

      this.form.patchValue({
        images: files,
      });
      for (let file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.images.push(e.target.result);
          this.loadImages.push(String(e.target.result));
        };
        reader.readAsDataURL(file);
      }
    }
  }

  changeMark($event: any): void {
    this.findedMark = this.systems.marks.find((mark: { id: any; }) => mark.id == $event.target.value);
    this.currenMark = $event.target.value;
    this.models = this.findedMark.models;
    this.form.get('model_id')?.setValue(`${this.models[0].model_id}`);
  }

  titleInput($event: any) {
    this.titleLength = $event.target.value.length;
  }

  descriptionInput($event: any) {
    this.descriptionLength = $event.target.value.length;
  }

  priceInput($event: any) {
    this.price = $event.target.value;
  }

  searchCity($event: any) {

  }
}
