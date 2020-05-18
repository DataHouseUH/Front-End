import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChangeDetectorRef, Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {LoginAuthService} from '../login-auth/login-auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserTbl} from "../owner-form/owner-form";

@Component({
  selector: 'app-login-auth',
  templateUrl: 'login-auth.component.html',
  styleUrls: ['./login-auth.component.css']
})

export class LoginAuthComponent {
  loginForm: FormGroup;
  loginfail  =  false;
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
  records: UserTbl[] = [];
  Status: number[] = [];
  Error: string[] = [];
  createloginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    event.preventDefault();
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this._LoginFormService.login(username, password).subscribe(data => {
      console.log(data);
      if (data != null) {
        this._LoginFormService.Is_Auth = data.isAdmin
        // Regular user, goes to the Ipad Kiosk section
        if (this._LoginFormService.Is_Auth === false) {
          this.router.navigate(['/welcome']);
          console.log(this._LoginFormService.Is_Auth)
        }
        else if (this._LoginFormService.Is_Auth === true) {
          this.router.navigate(['/welcomeadmin'])
          console.log(this._LoginFormService.Is_Auth)
        }
      }
      else {
        this.loginfail = true;
        console.log("username or password not correct");
      }
       // }

      },
      err => console.error(err)
    );


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
