import { Component, OnInit, Inject } from '@angular/core';
import { AlertListService } from './alert-list.service';
import { data } from './alert-list';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackDisplayService } from "../back-display/back-display.service";
import { BackDisplayTbl } from "../back-display/back-display";

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.css']
})

export class AlertListComponent implements OnInit {

  items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);

  constructor(
    private _AlertListService: AlertListService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _BackDisplayService: BackDisplayService
  ) { for ( let i = 0; i < 10; i++) {this.table.push(i); } }

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
  error: string;
  AlertMessage: string;
  records: data[];
  Message: string[] = [];
  ID: number[] = [];

  ngOnInit() {
    this.getAlertItems();
    this.getBackDisplayItems();
    this.getAlertItems();
    this.HowManyLoops = setInterval(() => {
      this.getBackDisplayItems();
      this.getAlertItems();
  }, 5000);
  }

  getAlertItems(): void {
    this._AlertListService.getAlerts().subscribe(
      data => {
        this.records = data
        console.log(this.records)
        this.setVariables(this.records)
      },
      err => console.error(err)
    );
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
    this.Message = records.Message;
    this.ID = records.AlertCustomMessageID;
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

  //Prepopulate Message
  PopulateMessageAlert(Message: string) {
    this.AlertMessage = Message;
  }

  // OpenDialog()
  openDialog(Message: string, ID: number): void {
    const dialogRef = this.dialog.open(AlertListPopUpComponent, {
      width: '50%',
      data: { Message: Message, ID: ID },
      panelClass: 'myapp-no-padding-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAlertItems();
    });
  }

  async submitAlert(value: string) {
    if (value !== '') {
      await this._AlertListService.SubmitAlerts(value).toPromise();
      console.log(value);

      if (value !== undefined) {
        this._snackBar.open('Submited', 'Close', {
          duration: 3000,
        });
      }

      else {
        this._snackBar.open('Please type an alert to send.', 'Close', {
          duration: 3000,
        });
      }
    }
    else {
      this._snackBar.open('Please type an alert to send.', 'Close', {
        duration: 3000,
      });
    }
  }

}

//// PopUp Stuff
@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list-pop-up.component.html',
  styleUrls: ['./alert-list.component.css']
})
export class AlertListPopUpComponent {

  constructor(
    public dialogRef: MatDialogRef<AlertListPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _AlertListService: AlertListService,
    private _snackBar: MatSnackBar
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async deleteAlert(value: number) {
    console.log(value);
    await this._AlertListService.DeleteAlerts(value).toPromise();
    this.data.Message = "";
    this.onNoClick();
  }

  async addAlert(value: string) {
  if (value.trim() !== '') {
    await this._AlertListService.CreateAlerts(value).toPromise();
    this.data.Message = value;
    }
  }

  async updateAlert(Message: string, ID: number) {
    console.log(Message, ID);
    if (Message.trim() !== '') {
      await this._AlertListService.UpdateAlerts(ID, Message).toPromise();
      this.data.Message = Message;
    }
    this.onNoClick();
  }
}


export interface DialogData {
  Message: string;
  ID: number;
}
