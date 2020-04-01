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

  public isAuthorized(_message, _firstname, _microchipID, _email, _phonenumber) {
    return this.http.post(this.ROOT_URL + '/View', {
      LastName: _message,
      FirstName: _firstname,
      MicrochipID: _microchipID,
      Email: _email,
      PhoneNumber: _phonenumber
    }).pipe(map((data: any) => data.data),
      catchError(error => { return throwError('Its a Trap!') })
    );
  }

  //public DeleteAlerts(AlertCustomMessageID) {
  //  return this.http.post(this.ROOT_URL + '/Delete', { AlertCustomMessageID: AlertCustomMessageID })
  //}
}
