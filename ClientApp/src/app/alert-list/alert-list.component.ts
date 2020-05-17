import { Component, OnInit, Inject } from '@angular/core';
import { AlertListService } from './alert-list.service';
import { data } from './alert-list';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.css']
})

export class AlertListComponent implements OnInit {


  constructor(
    private _AlertListService: AlertListService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
  private router: Router,
  ) { }

  error: string;
  AlertMessage: string;
  records: data[];
  Message: string[] = [];
  ID: number[] = [];

  ngOnInit() {
    const User = localStorage.getItem('currentUser');
    if ( User === null) {
      this.router.navigate(['/login']);
    }
    this.getAlertItems();
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



  setVariables(records) {
    this.Message = records.Message;
    this.ID = records.AlertCustomMessageID;
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
