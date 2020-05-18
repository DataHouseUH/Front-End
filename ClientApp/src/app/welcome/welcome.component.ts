import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerFormService } from '../owner-form/owner-form.service';
import { LoginAuthService } from '../login-auth/login-auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _OwnerFormService: OwnerFormService,
    public _LoginAuthService: LoginAuthService
  ) { }

  ngOnInit(): void {
    console.log(this._LoginAuthService.Is_Auth);
    if (this._LoginAuthService.Is_Auth == null) {
      this.router.navigate(['/']);
    }
  }

  Start() {

    this._OwnerFormService.LastName = '';
    this._OwnerFormService.FirstName = '';
    this._OwnerFormService.PetName = '';
    this._OwnerFormService.MicroChipID = '';
    this._OwnerFormService.Email = '';
    this._OwnerFormService.PhoneNumber = '';


    this.router.navigate(['/owner']);
  }

}
