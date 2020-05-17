import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LinkService } from '../link.service';

@Injectable()

export class FrontDisplayService {

  constructor(
    private http: HttpClient,
    public LinkService: LinkService,
  ) { }

  readonly ROOT_URL = this.LinkService.ROOT_URL + 'FrontDisplay'

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
