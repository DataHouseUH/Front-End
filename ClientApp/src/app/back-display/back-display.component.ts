import { Component } from '@angular/core';
import { BackDisplayService } from './back-display.service';
import { CommonModule } from '@angular/common';
import { BackDisplayTbl, AlertTbl } from './back-display';
import { Time } from '@angular/common';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-back-display',
  templateUrl: './back-display.component.html',
  styleUrls: ['./back-display.component.css']
})

export class BackDisplayComponent {

  items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);

  constructor(private _BackDisplayService: BackDisplayService) { for ( let i = 0; i < 10; i++) {this.table.push(i); } }

  displayedColumns: string[] = ['Last, First', 'Pet ID', 'Arrived', 'Inspected', 'Release'];

  data: BackDisplayTbl[];
  BackDisplayID: number[] = [];
  UserDisplayName: string[] = [];
  PetName: string[] = [];
  MicroChipID: string[] = [];
  Is_Arrived: boolean[] = [];
  Is_Inspected: boolean[] = [];
  Is_Released: boolean[] = [];
  Is_Completed: boolean[] = [];
  Colour: string[] = [];
  ApplicationNumber: string[] = [];
  HowManyLoops: any;
  table: number[] = [];
  outoftable: boolean;
  outtablelist: number[] = [];

  ngOnInit() {
    this.getBackDisplayItems();
    this.getAlertItems();
    this.HowManyLoops = setInterval(() => {
      this.getBackDisplayItems();
      this.getAlertItems();
    }, 5000);
  }

  ngOnDestroy() {
    if (this.HowManyLoops) {
      clearInterval(this.HowManyLoops);
    }
  }

  getBackDisplayItems(): void {
    this._BackDisplayService.getBackDisplay().subscribe(
      data => {
        this.data = data
        console.log(this.data)
        this.setVariables(this.data)
      },
      err => console.error(err)
    );
  }

  setVariables(records) {

    this.outoftable = (this.UserDisplayName.length > 10);
    this.BackDisplayID = records.BackDisplayID;
    this.UserDisplayName = records.UserDisplayName;
    this.PetName = records.PetName;
    this.MicroChipID = records.MicroChipID;
    this.Is_Arrived = records.Is_Arrived;
    this.Is_Inspected = records.Is_Inspected;
    this.Is_Released = records.Is_Released;
    this.Colour = records.Colour;
    this.Is_Completed = records.Is_Completed;
    this.ApplicationNumber = records.ApplicationNumber;
  }

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  UpdateIs_Arrived(event, i) {
    this.UpdateStatus(this.BackDisplayID[i], event.checked, 'NULL', 'NULL', 'NULL')
  }

  UpdateIs_Inspected(event, i) {
    this.UpdateStatus(this.BackDisplayID[i], 'NULL', event.checked, 'NULL', 'NULL')
  }

  UpdateIs_Released(event, i) {
    this.UpdateStatus(this.BackDisplayID[i], 'NULL', 'NULL', event.checked, 'NULL')
  }

  UpdateIs_Completed(event, i) {
    console.log("Ï am here")
    this.UpdateStatus(this.BackDisplayID[i], 'NULL', 'NULL', 'NULL', event.checked)
  }

  async UpdateStatus(BackDisplayID: number, Is_Arrived: any, Is_Inspected: any, Is_Released: any, Is_Completed: any) {
    console.log(BackDisplayID)
    console.log(Is_Arrived)
    console.log(Is_Inspected)
    console.log(Is_Released)
    await this._BackDisplayService.UpdateBackDisplay(BackDisplayID, Is_Arrived, Is_Inspected, Is_Released, Is_Completed).toPromise();
    this.getBackDisplayItems();
  }

//For alerts
  AlertData: AlertTbl[];
  AlertID: number[] = [];
  BackDisplayAlertID: number[] = [];
  Message: string[] = [];
  TimeCreated: Time[] = [];

  getAlertItems(): void {
    this._BackDisplayService.geAlertDisplay().subscribe(
      data => {
        this.AlertData = data
        console.log(this.AlertData)
        this.setAlertVariables(this.AlertData)
      },
      err => console.error(err)
    );
  }

  setAlertVariables(records) {
    this.AlertID = records.AlertID;
    this.BackDisplayAlertID = records.BackDisplayAlertID;
    this.Message = records.Message;
    this.TimeCreated = records.TimeCreated;
  }

  async onClick(value: number) {
      console.log(value);
    await this._BackDisplayService.DeleteAlerts(value).toPromise();
    this.getAlertItems();
  }

}
