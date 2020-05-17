import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChangeDetectorRef, Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {LoginAuthService} from '../login-auth/login-auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-auth',
  templateUrl: 'login-auth.component.html',
  styleUrls: ['./login-auth.component.css'],
  providers: [LoginAuthService]
})

export class LoginAuthComponent {
  loginForm: FormGroup;
  isSubmitted  =  false;
  constructor(
    private formBuilder: FormBuilder,
    private _LoginFormService: LoginAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private changesDetector: ChangeDetectorRef,
    private _snackBar: MatSnackBar
  ) {
    this.createloginForm();

  }
  username: string[] = [];
  password: string[] = [];
  createloginForm() {
    this.loginForm = this.formBuilder.group({
      username: [this._LoginFormService.Username],
      password: [this._LoginFormService.Password],
    });
  }
  onSubmit() {
    event.preventDefault();
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    console.log(username);
    console.log(password);
  }
  //  currentUser: User;

  //  constructor(
  //      private router: Router,
  //      private authenticationService: AuthenticationService
  //  ) {
  //      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  //  }

  // logout() {
  //      this.authenticationService.logout();
  //      this.router.navigate(['/login']);
  //  }
}
