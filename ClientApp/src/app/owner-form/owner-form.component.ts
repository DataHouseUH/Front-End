import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { OwnerFormService } from './owner-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  constructor(
    private formBuilder: FormBuilder,
    private _OwnerFormService: OwnerFormService,
    private route: ActivatedRoute,
    private router: Router,
    private changesDetector: ChangeDetectorRef,
    private _snackBar: MatSnackBar
  ) {
    this.createContactForm();

  }

  records: UserTbl[] = [];
  Status: number[] = [];
  Error: string[] = [];
  UserID: number[] = [];
  pets: string[] = [];

  // When load, default values...
  createContactForm() {
    this.checkinForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      phoneNum: [''],
      MicoID: [''],
      petname: [''],
      email: [''],
      newMicrochip: [''],
      MorePets: this.formBuilder.array([])
    });
  }

  ngOnInit() {
    this.createContactForm();
  }

  get newPet() {
      return this.checkinForm.get('MorePets') as FormArray;
  }

  addPet() {
    //this.newPet.push(this.formBuilder.control(''));
   //this.changesDetector.detectChanges();
    const newpets = this.checkinForm.controls.MorePets as FormArray;
    newpets.push(this.formBuilder.group({MicoID: [''], PetName: ['']}));
    //this.pets.push('newpet');
  }

  onSubmit() {
    // TODO: Implement function to process new pet microchip IDs
    event.preventDefault();
    const MicroIDS = [];
    // Get Values from form
    const firstname = this.checkinForm.value.firstName;
    const lastname = this.checkinForm.value.lastName;
    const petname = this.checkinForm.value.petname;
    const phone = this.checkinForm.value.phoneNum;
    for ( let i = 0; i < this.checkinForm.value.MorePets.length; i++) {
      console.log(this.checkinForm.value.MorePets[i]);
      MicroIDS[i] = this.checkinForm.value.MorePets[i].MicoID;
    }
    for ( let i = 0; i < MicroIDS.length; i++) {
      console.log('test' + MicroIDS[i]);
    }
    const email = this.checkinForm.value.email;
    const MicroID = this.checkinForm.value.MicoID;

    console.log(firstname);
    console.log(lastname);
    console.log(phone);
    console.log(email);
    console.log(MicroID);
    console.log(petname);
    // Hit Database
    this._OwnerFormService.isAuthorized(lastname, firstname, petname, MicroID, email, phone).subscribe(
      data => {
        this.records = data;
        console.log(data);
        this.setVariables(this.records);
        console.log(data);

        this._OwnerFormService.UserID = this.UserID[0];
        if (this.Status[0] === 1) {
          this._OwnerFormService.Is_Qualified = true;
          this.router.navigate(['/qualify']);
        } else if (this.Status[0] === 0) {
          this._OwnerFormService.Is_Qualified = false;
          this.router.navigate(['/noqualify']);
        } else {
          this._snackBar.open(this.Error[0], 'Close', {
            duration: 2000,
          });
        }

      },
      err => console.error(err)
    );
    // if(firstname!=="" && lastname!=="" && phone!=="")
    // {
    // this.router.navigate(['/search']);
    // }
  }

  setVariables(records) {
    this.Status = records.Status;
    this.Error = records.Error;
    this.UserID = records.UserID;
  }

}

