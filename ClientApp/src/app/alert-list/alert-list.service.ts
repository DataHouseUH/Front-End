import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LinkService } from '../link.service';

@Injectable()

export class AlertListService {

  constructor(
    private http: HttpClient,
    public LinkService: LinkService,
  ) { }

  readonly ROOT_URL = this.LinkService.ROOT_URL + 'MasterAlertCustomMessageTbl'


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
