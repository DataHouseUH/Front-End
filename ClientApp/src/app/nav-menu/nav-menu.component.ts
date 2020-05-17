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
  constructor(
    private router: Router,
    private authenticationService: LoginAuthService,
  ) {}
  ngOnInit() {const currentuser = localStorage.getItem('currentUser');
    if ( currentuser !== null) {
      this.isLogined = true;
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    } }

  logout() {
    this.authenticationService.logout();
    this.isLogined = false;
    this.router.navigate(['/login']);
  }


}
