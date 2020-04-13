import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()

export class BackDisplayService {

  readonly ROOT_URL = 'http://127.0.0.1/api/v1/BackDisplay'

  constructor(private http: HttpClient) { }

  public getBackDisplay() {
    return this.http.post(this.ROOT_URL + '/View', '')
      .pipe(map((data: any) => data.data),
        catchError(error => { return throwError('Its a Trap!') })
      );
  }

  public UpdateBackDisplay(BackDisplayID, Is_Arrived, Is_Inspected, Is_Released) {
    return this.http.post(this.ROOT_URL + '/Update', {
      BackDisplayID: BackDisplayID,
      Is_Arrived: Is_Arrived,
      Is_Inspected: Is_Inspected,
      Is_Released: Is_Released
    })
  }

  public geAlertDisplay() {
    return this.http.post(this.ROOT_URL + '/Alert', '')
      .pipe(map((data: any) => data.data),
        catchError(error => { return throwError('Its a Trap!') })
      );
  }

  public DeleteAlerts(AlertID) {
    return this.http.post(this.ROOT_URL + '/UpdateAlert', { AlertID: AlertID })
  }
}
