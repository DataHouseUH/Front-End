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

  setVariables(records) {
    this.Message = records.Message;
    this.ID = records.AlertCustomMessageID;
  }
}

//// To receibe data, you need to subscribe.
//this._AlertListService.getAlerts().subscribe((data: any[]) => {
//  console.log(data);
//  this.records = data;
