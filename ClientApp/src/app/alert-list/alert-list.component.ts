import { Component, OnInit } from '@angular/core';

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

  constructor() {
    this.presets = ['Front Door Dog'];
  }

  ngOnInit(): void {
  }


  addAlert(value: string) {
    if(this.presets.length === 8){
      this.error = 'Alerts are full.'
    } else if(value !== '') {
      this.error = null;
      this.presets.push(value);
      this.input = null;
    }
  }

  deleteAlert(x) {
    console.log(this.presets);
    this.error = null;
    if (x > -1) {
      this.presets.splice(x, 1);
    }
  }
}
