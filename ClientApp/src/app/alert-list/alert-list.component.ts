import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AlertListService } from './alert-list.service';
import { data } from './alert-list';

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.css']
})

export class AlertListComponent implements OnInit {

  presets: any = [];
  input: string = '';
  error: string;
  changeButton0: boolean;
  changeButton1: boolean;
  changeButton2: boolean;
  changeButton3: boolean;
  changeButton4: boolean;
  changeButton5: boolean;
  changeButton6: boolean;
  changeButton7: boolean;

  records: data[] = []
  Message: string[] = []
  ID: number[] = []

 


  constructor(private _AlertListService: AlertListService) { }

  ngOnInit() {
    this.getAlertItems()
  }

  getAlertItems(): void {
    this._AlertListService.getAlerts().subscribe(
      data => {
        this.records = data
        console.log(this.records)
        this.setVariables(this.records)
        console.log(this.Message)
        console.log(this.ID)
      },
      err => console.error(err)
    );
  }


  addAlert(value: string) {
    if (this.ID.length >= 8) {
      this.error = 'Alerts are full.'
    } else if (value !== '') {
      this.error = null;

      this._AlertListService.CreateAlerts(value).subscribe(
        data => {
          console.log("Post Request is Sucessful", data);
        },
        error => {
          console.log("Error", error);
        }
      )

<<<<<<< Updated upstream
      this.input = null;
    }
=======
    if (this.Message[this.Message.length - 1] != "+") {
      // this.Message.push("+");
      this.ID.push(-1);
    }
  }

  // Prepopulate Message
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
    await this._AlertListService.SubmitAlerts(value).toPromise();
    console.log(value);
  }
}

//// PopUp Stuff
@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list-pop-up.component.html',
  styleUrls: ['./alert-list.component.css']
})
export class AlertListPopUpComponent {
>>>>>>> Stashed changes

  }
    setVariables(records) {
      this.Message = records.Message;
      this.ID = records.AlertCustomMessageID;
    }

    deleteAlert(value: number) {
      this._AlertListService.DeleteAlerts(value).subscribe(
        data => {
          console.log("Delete Request is Sucessful", data);
        },
        error => {
          console.log("Error", error);
        }
      )
    }
  }


//// To receibe data, you need to subscribe.
//this._AlertListService.getAlerts().subscribe((data: any[]) => {
//  console.log(data);
//  this.records = data;
