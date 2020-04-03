import { Component, OnInit } from '@angular/core';
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
        this.setVariables(this.records)
      },
      err => console.error(err)
    );
  }


  async addAlert(value: string) {
    if (this.ID.length >= 8) {
      this.error = 'Alerts are full.'
    } else if (value.trim() !== '') {
      this.error = null;

      console.log(this.input + 'here');
      await this._AlertListService.CreateAlerts(value).toPromise();
      this.getAlertItems();

      //await this._AlertListService.CreateAlerts(value).subscribe(
      //    data => {
      //      console.log("Post Request is Sucessful", data);
      //    },
      //    error => {
      //      console.log("Error", error);
      //    }
      //  )
      //}
    }
  }

  setVariables(records) {
    this.Message = records.Message;
    this.ID = records.AlertCustomMessageID;
  }

  async deleteAlert(value: number) {
    await this._AlertListService.DeleteAlerts(value).toPromise();
    this.getAlertItems();
    //this._AlertListService.DeleteAlerts(value).subscribe(
    //  data => {
    //    console.log("Delete Request is Sucessful", data);
    //  },
    //  error => {
    //    console.log("Error", error);
    //  }
    //)

    // Get Alerts again
   

  }
  }


//// To receibe data, you need to subscribe.
//this._AlertListService.getAlerts().subscribe((data: any[]) => {
//  console.log(data);
//  this.records = data;
