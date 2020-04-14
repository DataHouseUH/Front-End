import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerFormService } from '../owner-form/owner-form.service';
import { FrontDisplayService } from '../front-display/front-display.service';

@Component({
  selector: 'app-if-prequal',
  templateUrl: './if-prequal.component.html',
  styleUrls: ['./if-prequal.component.css']
})
export class IfPrequalComponent implements OnInit {

  constructor(
    private router: Router,
    public _OwnerFormService: OwnerFormService,
    public _FrontDisplayService: FrontDisplayService
  ) { }

  timer: number = 0;

  ngOnInit(): void {
    this.timer = 20;
    this.getConfirmationItems();
    this.startCountdown(this.timer);
  }

  ngOnDestroy() {
    this.timer = 9999999;
  }

  startCountdown(seconds: number) {

    var interval = setInterval(() => {
      this.timer--;

      if (this.timer < 0) {

        // The code here will run when
        // the timer has reached zero.

        clearInterval(interval);
        this.router.navigate(['welcome']);
      };
    }, 1000);
  }

  addMoretime() {
    this.timer = this.timer + 5;
  }

  // FOr Confirmation
  data: Confirmation[] = [];   /* Data to use */
  DisplayID: number[] = [];
  UserDisplayName: string[] = [];

  getConfirmationItems(): void {
    this._FrontDisplayService.getConfirmation(this._OwnerFormService.UserID, this._OwnerFormService.Is_Qualified).subscribe(
      data => {
        this.data = data
        console.log(this.data)
        this.setVariables(this.data)
      },
      err => console.error(err)
    );
  }

  setVariables(records) {
    this.DisplayID = records.DisplayID;
    this.UserDisplayName = records.UserDisplayName;
  }

}

export interface Confirmation {
  DisplayID: number;
  UserDisplayName: string;
}
