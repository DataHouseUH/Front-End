import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()

export class AlertListService {

  readonly ROOT_URL = 'http://127.0.0.1/api/v1/MasterAlertCustomMessageTbl'

  constructor(private http: HttpClient) { }

  public getAlerts() {
    return this.http.post(this.ROOT_URL + '/View', '')
      .pipe(map((data: any) => data.data),
        catchError(error => { return throwError('Its a Trap!') })
      );
  }

  public CreateAlerts(message) {
    return this.http.post(this.ROOT_URL + '/Insert', { Message: message } )
  }

  public DeleteAlerts(AlertCustomMessageID) {
    return this.http.post(this.ROOT_URL + '/Delete', { AlertCustomMessageID: AlertCustomMessageID })
  }

  public UpdateAlerts(AlertCustomMessageID, message) {
    return this.http.post(this.ROOT_URL + '/Update', { AlertCustomMessageID: AlertCustomMessageID, Message: message })
  }

  public SubmitAlerts(message) {
    return this.http.post(this.ROOT_URL + '/Submit', { Message: message })
  }
}

/* Back Display */
export class BackDisplayService {

  readonly ROOT_URL = 'http://127.0.0.1/api/v1/BackDisplay'

  constructor(private http: HttpClient) { }

  public getBackDisplay() {
    return this.http.post(this.ROOT_URL + '/View', '')
      .pipe(map((data: any) => data.data),
        catchError(error => { return throwError('Its a Trap!') })
      );
  }

  public UpdateBackDisplay(BackDisplayID, Is_Arrived, Is_Inspected, Is_Released, Is_Completed) {
    return this.http.post(this.ROOT_URL + '/Update', {
      BackDisplayID: BackDisplayID,
      Is_Arrived: Is_Arrived,
      Is_Inspected: Is_Inspected,
      Is_Released: Is_Released,
      Is_Completed: Is_Completed
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
