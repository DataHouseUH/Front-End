import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()

export class LoginAuthService {

  readonly ROOT_URL = 'http://localhost/aqsownercheckin/auth/v1/'

  constructor(private http: HttpClient) { }

  public isAuthorized(_username, _password) {
    return this.http.post(this.ROOT_URL + '/login', {
     Username: _username,
      Password: _password,
    }).pipe(map((data: any) => data.data),
      catchError(error => { return throwError('Its a Trap!'); })
    );
  }

  UserID: number = 5;
  Is_Qualified: boolean = false;


  Username: string;
  Password: string;


  //public DeleteAlerts(AlertCustomMessageID) {
  //  return this.http.post(this.ROOT_URL + '/Delete', { AlertCustomMessageID: AlertCustomMessageID })
  //}
}


