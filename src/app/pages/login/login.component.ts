import {Component, Injectable, input, OnDestroy, OnInit} from '@angular/core';

import {LoginService} from "../../services/login/login.service";

import {HttpClientModule} from "@angular/common/http";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
@Injectable({
  providedIn: 'root'
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup = new FormGroup({
    phone: new FormControl("", [
      Validators.required,
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  private aSub: Subscription | undefined;

  protected error: string | null = null;

  constructor(
    private login: LoginService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        // вы зарегистрированы
      } else if (params['accessDenied']) {
        //авторизуйтесь в системе
      }
    });
  }

  get phone() {
    return this.form.get('phone');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    if (this.form.valid) {
      this.form.disable();
      this.aSub = this.login.send(this.form.value).subscribe({
        next: (data: any) => {
          this.error = null;
          void this.router.navigate([''])
        },
        error: (error) => {
          this.form.enable();
          this.error = error?.error?.data?.errors?.message;
        }
      })
    }
  }
}
