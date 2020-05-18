import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginAuthService } from '../login-auth/login-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _LoginAuthService: LoginAuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this._LoginAuthService.Is_Auth !== true) {
      this.router.navigate(['/']);
    }
  }


}
