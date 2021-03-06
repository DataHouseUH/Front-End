import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LinkService } from '../link.service';

@Injectable()

export class OwnerFormService {

  constructor(
    private http: HttpClient,
    public LinkService: LinkService,
  ) { }

  readonly ROOT_URL = this.LinkService.ROOT_URL + 'KioskCheckIn'

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

  LastName: string;
  FirstName: string;
  PetName: string;
  MicroChipID: string;
  Email: string;
  PhoneNumber: string;

  //public DeleteAlerts(AlertCustomMessageID) {
  //  return this.http.post(this.ROOT_URL + '/Delete', { AlertCustomMessageID: AlertCustomMessageID })
  //}
}


