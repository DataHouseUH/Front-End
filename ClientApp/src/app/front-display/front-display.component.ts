import {HttpClient} from '@angular/common/http';
import {Component, AfterViewInit} from '@angular/core';
import { FrontDisplayService } from './front-display.service';
import {newArray} from "@angular/compiler/src/util";

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
  DisplayID: number[] = [];
  UserDisplayName: string[] = [];
  StatusName: string[] = [];
  HowManyLoops: any;
  empty: number[] = [];

  constructor(private _FrontDisplayService: FrontDisplayService) {
    for ( let i = 0; i < 10; i++) {
          this.empty.push(i);
  }
  }




  ngOnInit() {
    this.getAlertItems();
    this.HowManyLoops = setInterval(() => {
      this.getAlertItems();
    }, 5000);
  }

  ngOnDestroy() {
    if (this.HowManyLoops) {
      clearInterval(this.HowManyLoops);
    }
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
    this.DisplayID = records.DisplayID;
    this.UserDisplayName = records.UserDisplayName;
    this.StatusName = records.StatusName;
  }

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  ngAfterViewInit() {

  }
}

export interface KioskInfo {
  DisplayID: number;
  UserDisplayName: string;
  StatusName: string;
}

/* Database from kiosk to use for the front display queue */
// export class HttpDatabase {
    // Wei
  // }

