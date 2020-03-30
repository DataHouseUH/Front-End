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
  presets:any = [];
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
    if(this.presets.length === 8){
      this.error = 'Alerts are full.'
    } else if(value !== '') {
      this.error = null;
      this.presets.push(value);
      this.input = null;
    }
  setVariables(records) {
    this.Message = records.Message;
    this.ID = records.AlertCustomMessageID;
  }

  deleteAlert(x) {
    console.log(this.presets);
    this.error = null;
    if (x > -1) {
      this.presets.splice(x, 1);
    }
  }
}

//// To receibe data, you need to subscribe.
//this._AlertListService.getAlerts().subscribe((data: any[]) => {
//  console.log(data);
//  this.records = data;
