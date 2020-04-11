import { Component } from '@angular/core';
import { BackDisplayService } from './back-display.service';

import { BackDisplayTbl } from './back-display';

@Component({
  selector: 'app-back-display',
  templateUrl: './back-display.component.html',
  styleUrls: ['./back-display.component.css']
})

export class BackDisplayComponent {

  constructor(private _BackDisplayService: BackDisplayService) { }

  displayedColumns: string[] = ['Last, First', 'Pet ID', 'Arrived', 'Inspected', 'Release'];

  data: BackDisplayTbl[];
  BackDisplayID: number[] = [];
  UserDisplayName: string[] = [];
  PetName: string[] = [];
  MicroChipID: string[] = [];
  Is_Arrived: boolean[] = [];
  Is_Inspected: boolean[] = [];
  Is_Released: boolean[] = [];
  Colour: string[] = [];
  HowManyLoops: any;

  ngOnInit() {
    this.getBackDisplayItems();
    this.HowManyLoops = setInterval(() => {
      this.getBackDisplayItems();
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
    this.BackDisplayID = records.BackDisplayID;
    this.UserDisplayName = records.UserDisplayName;
    this.PetName = records.PetName;
    this.MicroChipID = records.MicroChipID;
    this.Is_Arrived = records.Is_Arrived;
    this.Is_Inspected = records.Is_Inspected;
    this.Is_Released = records.Is_Released;
    this.Colour = records.Colour;
  }

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  UpdateIs_Arrived(event, i) {
    this.UpdateStatus(this.BackDisplayID[i], event.checked, 'NULL', 'NULL')
  }

  UpdateIs_Inspected(event, i) {
    this.UpdateStatus(this.BackDisplayID[i], 'NULL', event.checked, 'NULL')
  }

  UpdateIs_Released(event, i) {
    this.UpdateStatus(this.BackDisplayID[i], 'NULL', 'NULL', event.checked)
  }

  async UpdateStatus(BackDisplayID: number, Is_Arrived: any, Is_Inspected: any, Is_Released: any) {
    console.log(BackDisplayID)
    console.log(Is_Arrived)
    console.log(Is_Inspected)
    console.log(Is_Released)
    await this._BackDisplayService.UpdateBackDisplay(BackDisplayID, Is_Arrived, Is_Inspected, Is_Released).toPromise();
    this.getBackDisplayItems();
  }

}
