import {Component, OnDestroy} from '@angular/core';
import {NgIf} from "@angular/common";
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {InputMaskDirective} from "../../directs/input.mask.directive";
import {Router, RouterLink} from "@angular/router";
import {LoginService} from "../../services/login/login.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    InputMaskDirective,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy {

  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    last_name: new FormControl(null, [Validators.required]),
    phone: new FormControl("+7", [
      Validators.required,
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6)
    ]),
    confirm_password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ])
  });

  private aSub: Subscription | undefined;

  protected error: string | null = null;
  protected passwordsError: boolean = true;

  constructor(private service: LoginService, private router: Router) {
  }

  get name() {
    return this.form.get('name');
  }

  get last_name() {
    return this.form.get('last_name');
  }

  get phone() {
    return this.form.get('phone');
  }

  get confirm_password() {
    return this.form.get('confirm_password');
  }

  get password() {
    return this.form.get('password');
  }

  matchPasswords() {
    this.passwordsError = this.password?.value === this.confirm_password?.value;
  }

  onSubmit() {
    if (this.form.valid) {
      this.form.disable();
      this.aSub = this.service.register(this.form.value).subscribe({
        next: (data: any) => {
          this.router.navigate(["/"]);
        },
        error: (error: any) => {
          this.error = error.error.data.errors.message;
          this.form.enable();
        }
      })
    }

  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}
