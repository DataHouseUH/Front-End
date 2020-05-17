import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';

@Injectable()

export class LoginAuthService {

  readonly ROOT_URL = 'http://localhost/aqsownercheckin/auth/v1/'

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public login(_username, _password) {
     return this.http.post<any>(`/users/authenticate`, { _username, _password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.status === 'success') {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user.data));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }
  public logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  UserID: number = 5;
  Is_Auth: boolean = false;


  Username: string;
  Password: string;


  //public DeleteAlerts(AlertCustomMessageID) {
  //  return this.http.post(this.ROOT_URL + '/Delete', { AlertCustomMessageID: AlertCustomMessageID })
  //}
}


