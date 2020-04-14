import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from  '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import { OwnerFormService } from './owner-form.service';
import { ActivatedRoute, Router } from '@angular/router';

import { UserTbl } from './owner-form';

const material = [
  MatInputModule
];
@Component({
  selector: 'app-owner-form',
  templateUrl: './owner-form.component.html',
  styleUrls: ['./owner-form.component.css']
})

export class OwnerFormComponent {
  checkinForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private _OwnerFormService: OwnerFormService, private route: ActivatedRoute,
    private router: Router ) {
    this.createContactForm();

  }

  records: UserTbl[] = []
  Status: number[] = []
  Error: string[] = []
  UserID: number[] = []

  // When load, default values...
  createContactForm() {
    this.checkinForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      areaCode1: [''],
      areaCode2: [''],
      phone3: [''],
      phone4: [''],
      MicoID: [''],
      email: ['']
    });
  }

  ngOnInit() {
    this.createContactForm()
  }

  onSubmit() {
    event.preventDefault();

    // Get Values from form
    const firstname = this.checkinForm.value.firstName;
    const lastname = this.checkinForm.value.lastName;
    const phone = this.checkinForm.value.areaCode1 + this.checkinForm.value.areaCode2 + this.checkinForm.value.phone3 + this.checkinForm.value.phone4;
    const email = this.checkinForm.value.email;
    const MicroID = this.checkinForm.value.MicoID;

    // Hit Database
    this._OwnerFormService.isAuthorized(lastname, firstname, MicroID, email, phone).subscribe(
      data => {
        this.records = data
        console.log(data)
        this.setVariables(this.records)
        console.log(data)

        this._OwnerFormService.UserID = this.UserID[0];
        if (this.Status[0] == 1) {
          this._OwnerFormService.Is_Qualified = true;
          this.router.navigate(['/qualify']);
        } else {
          this._OwnerFormService.Is_Qualified = false;
          this.router.navigate(['/noqualify']);
        }
      },
      err => console.error(err)
    );
    //if(firstname!=="" && lastname!=="" && phone!=="")
    //{
    //  this.router.navigate(['/search']);
    //}
  }

  setVariables(records) {
    this.Status = records.Status;
    this.Error = records.Error;
    this.UserID = records.UserID;
  }

}
