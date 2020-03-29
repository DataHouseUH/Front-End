import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.css']
})
export class AlertListComponent implements OnInit {

  presets:any = [];

  constructor() {
    this.presets = ['Front Door Dog'];
  }

  ngOnInit(): void {
  }

  value ='';

  onEnter(value: string) {
    this.presets.push(value);
  }

}
