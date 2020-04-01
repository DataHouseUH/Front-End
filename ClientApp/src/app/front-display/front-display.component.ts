import {HttpClient} from '@angular/common/http';
import {Component, AfterViewInit} from '@angular/core';
import { FrontDisplayService } from './front-display.service';

/* Table that retreives data via HTTP */
@Component({
  selector: 'app-front-display',
  styleUrls: ['front-display.component.css'],
  templateUrl: 'front-display.component.html',
})
export class FrontDisplayComponent implements AfterViewInit {


  displayedColumns: string[] = ['phone4', 'firstname', 'status'];
  // database: HttpDatabase | null;   /* Database from kiosk */
  data: KioskInfo[] = [];   /* Data to use */
  data2: KioskInfo[] = []; 
  phone4: number[] = [];
  lastInitial: CharacterData[] = [];
  firstname: string[] = [];
  status: string[] = [];
  constructor(private _FrontDisplayService: FrontDisplayService) { }




  ngOnInit() {
    this.getAlertItems()
  }

  getAlertItems(): void {
    this._FrontDisplayService.getAlerts().subscribe(
      data => {
        this.data = data
        console.log(this.data)
        this.setVariables(this.data)
      },
      err => console.error(err)
    );
  }

  setVariables(records) {
    this.phone4 = records.PhoneNumber;
    this.lastInitial = records.LastName;
    this.firstname = records.FirstName;
    this.status = records.Status;
  }

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  ngAfterViewInit() {

  }
}

export interface KioskInfo {
  phone4: number;
  lastInitial: CharacterData;
  firstname: string;
  status: string;
}

/* Database from kiosk to use for the front display queue */
// export class HttpDatabase {
    // Wei
  // }

