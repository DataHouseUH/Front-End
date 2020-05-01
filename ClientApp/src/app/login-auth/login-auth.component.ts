import { FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-auth',
  templateUrl: 'login-auth.component.html',
  styleUrls: ['./login-auth.component.css']
})

export class LoginAuthComponent {
  loginForm: FormGroup;

  username: string[] = [];
  password: string[] = [];

  onSubmit() {
    event.preventDefault();
    console.log(this.username);
    console.log(this.password);
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
