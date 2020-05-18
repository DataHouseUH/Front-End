import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LinkService } from '../link.service';



@Injectable()

export class LoginAuthService {

  constructor(
    private http: HttpClient,
    public LinkService: LinkService
  ) {}

  readonly ROOT_URL = this.LinkService.AUTH_URL + 'login'

  public login(_username, _password) {
    return this.http.post(this.ROOT_URL, {
      username: _username,
      password: _password
    }).pipe(map((data: any) => data.data),
      catchError(error => { return throwError('Its a Trap!') })
    );
  }
  public logout() {
    // remove user from local storage to log user out
    this.Is_Auth = null;
  }

  UserID: number;
  Is_Auth: boolean;


  Username: string;
  Password: string;


  //public DeleteAlerts(AlertCustomMessageID) {
  //  return this.http.post(this.ROOT_URL + '/Delete', { AlertCustomMessageID: AlertCustomMessageID })
  //}
}


