import { Component } from '@angular/core';
import { BackDisplayService } from './back-display.service';

import { BackDisplayTbl } from './back-display';

@Component({
  selector: 'app-back-display',
  templateUrl: './back-display.component.html',
  styleUrls: ['./back-display.component.css']
})

export class BackDisplayComponent {

  items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);

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

  dataSource = ELEMENT_DATA;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
