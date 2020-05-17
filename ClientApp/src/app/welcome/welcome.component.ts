import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerFormService } from '../owner-form/owner-form.service';

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
  ) { }

  ngOnInit(): void {
    const User = localStorage.getItem('currentUser');
    if ( User === null) {
      this.router.navigate(['/login']);
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
