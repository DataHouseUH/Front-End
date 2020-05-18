import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LinkService } from '../link.service';

@Injectable()

export class BackDisplayService {

  constructor(
    private http: HttpClient,
    public LinkService: LinkService
  ) { }

  readonly ROOT_URL = this.LinkService.ROOT_URL + 'BackDisplay'

  public getBackDisplay() {
    console.log(this.ROOT_URL);
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
