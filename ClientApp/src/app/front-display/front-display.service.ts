import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()

export class FrontDisplayService {

  readonly ROOT_URL = 'http://127.0.0.1/api/v1/FrontDisplay'

  constructor(private http: HttpClient) { }

  public getAlerts() {
    return this.http.post(this.ROOT_URL + '/View', '')
      .pipe(map((data: any) => data.data),
        catchError(error => { return throwError('Its a Trap!') })
      );
  }

  public getConfirmation(UserID, Is_Qualified) {
    return this.http.post(this.ROOT_URL + '/Confirmation', { UserID: UserID, Is_Qualified: Is_Qualified })
      .pipe(map((data: any) => data.data),
        catchError(error => { return throwError('Its a Trap!') })
      );
  }

}
