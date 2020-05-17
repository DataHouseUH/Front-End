import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { OwnerFormService } from './owner-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {AbstractControl} from "@angular/forms";
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
  isSubmitted  =  false;
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
      firstName: [this._OwnerFormService.FirstName],
      lastName: this._OwnerFormService.LastName,
      phoneNum: [this._OwnerFormService.PhoneNumber, [Validators.minLength(11), Validators.maxLength(11)]],
      MicoID: [this._OwnerFormService.MicroChipID],
      petname: this._OwnerFormService.PetName,
      email: [this._OwnerFormService.Email, [
        Validators.maxLength(250),
          Validators.pattern(/.+@.+\..+/)
        ]],
      newMicrochip: this._OwnerFormService.MicroChipID,
      MorePets: this.formBuilder.array([])
    });
  }

  ngOnInit() {
    this.createContactForm();
  }

  get newPet() {
      return this.checkinForm.get('MorePets') as FormArray;
  }
  get f() {
    return this.checkinForm.controls;
  }

  addPet() {
    //this.newPet.push(this.formBuilder.control(''));
   //this.changesDetector.detectChanges();
    const newpets = this.checkinForm.controls.MorePets as FormArray;
    newpets.push(this.formBuilder.group({MicoID: [''], PetName: ['']}));
    //this.pets.push('newpet');
  }
  close(){
    const newpets = this.checkinForm.controls.MorePets as FormArray;
    newpets.removeAt(newpets.length - 1);
  }
  onSubmit() {
    this.isSubmitted  = true ;
    // TODO: Implement function to process new pet microchip IDs
    event.preventDefault();
    const multipet = [];
    // Get Values from form
    const firstname = this.CheckUndefined(this.checkinForm.value.firstName);
    const lastname = this.CheckUndefined(this.checkinForm.value.lastName);
    const petname = this.CheckUndefined(this.checkinForm.value.petname);
    const phone = this.CheckUndefined(this.checkinForm.value.phoneNum);
    for (let i = 0; i < this.checkinForm.value.MorePets.length; i++) {
      console.log(this.checkinForm.value.MorePets[i]);
      multipet[i] = this.CheckUndefined(this.checkinForm.value.MorePets[i]);
    }
    for (let i = 0; i < multipet.length; i++) {
      console.log('test' + multipet[i].PetName);
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
    if (this.checkinForm.invalid === true) {
      console.log('error');
      return;
    } else {
      this._OwnerFormService.isAuthorized(lastname, firstname, petname, MicroID, email, phone).subscribe(
        data => {
          this.records = data;
          console.log(data);
          this.setVariables(this.records);
          console.log(data);

          this._OwnerFormService.UserID = this.UserID[0];

          this._OwnerFormService.LastName = lastname;
          this._OwnerFormService.FirstName = firstname;
          this._OwnerFormService.PetName = petname;
          this._OwnerFormService.MicroChipID = MicroID;
          this._OwnerFormService.Email = email;
          this._OwnerFormService.PhoneNumber = phone;

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
      if (multipet.length > 0) {
        for (let i = 0; i < multipet.length; i++) {
          this._OwnerFormService.isAuthorized(lastname, firstname, multipet[i].PetName, multipet[i].MicoID, email, phone).subscribe(
            data => {
              this.records = data;
              console.log(data);
              this.setVariables(this.records);
              console.log(data);

              this._OwnerFormService.UserID = this.UserID[0];

              this._OwnerFormService.LastName = lastname;
              this._OwnerFormService.FirstName = firstname;
              this._OwnerFormService.PetName = multipet[i].PetName;
              this._OwnerFormService.MicroChipID = multipet[i].MicoID;
              this._OwnerFormService.Email = email;
              this._OwnerFormService.PhoneNumber = phone;

              if (this.Status[0] === 1) {
                this._OwnerFormService.Is_Qualified = true;
                // this.router.navigate(['/qualify']);
              } else if (this.Status[0] === 0) {
                this._OwnerFormService.Is_Qualified = false;
                // this.router.navigate(['/noqualify']);
              } else {
                this._snackBar.open(this.Error[0], 'Close', {
                  duration: 2000,
                });
              }

            },
            err => console.error(err)
          );
        }
      }
      // if(firstname!=="" && lastname!=="" && phone!=="")
      // {
      // this.router.navigate(['/search']);
      // }
    }
  }
  setVariables(records) {
    this.Status = records.Status;
    this.Error = records.Error;
    this.UserID = records.UserID;
  }

  // To check for undefined
  // If undefined make it null
  CheckUndefined(value) {
    if (value == null) {
      return null;
    }

    return value; 
  }
}

