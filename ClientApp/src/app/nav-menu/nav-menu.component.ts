import { Component } from '@angular/core';
import { LoginAuthService } from '../login-auth/login-auth.service';
import { User } from '../login-auth/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
  providers: [LoginAuthService]
})
export class NavMenuComponent {
  isLogined = false;
  currentUser: User;
  homepage = false;
  constructor(
    private router: Router,
    private authenticationService: LoginAuthService,
  ) { }

  ngOnInit() {
    if ( this.authenticationService.Is_Auth != null) {
      this.isLogined = true;
    }

    if (this.authenticationService.Is_Auth === true) {
      this.homepage = true;
    }
    else {
      this.homepage = false;
    }

  }

  logout() {
    this.authenticationService.logout();
    this.isLogined = false;
    this.router.navigate(['/']);
  }


}
