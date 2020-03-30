import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

}
