import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()

export class OwnerFormService {

  readonly ROOT_URL = 'http://127.0.0.1/api/v1/KioskCheckIn'

  constructor(private http: HttpClient) { }

  //public getAlerts() {
  //  return this.http.post(this.ROOT_URL + '/View', '')
  //    .pipe(map((data: any) => data.data),
  //      catchError(error => { return throwError('Its a Trap!') })
  //    );
  //}

  public isAuthorized(_lastname, _firstname, _petname, _microchipID, _email, _phonenumber) {
    return this.http.post(this.ROOT_URL + '/View', {
      LastName: _lastname,
      FirstName: _firstname,
      PetName: _petname,
      MicrochipID: _microchipID,
      Email: _email,
      PhoneNumber: _phonenumber
    }).pipe(map((data: any) => data.data),
      catchError(error => { return throwError('Its a Trap!') })
    );
  }

  UserID: number = 5;
  Is_Qualified: boolean = false;
  //public DeleteAlerts(AlertCustomMessageID) {
  //  return this.http.post(this.ROOT_URL + '/Delete', { AlertCustomMessageID: AlertCustomMessageID })
  //}
}


