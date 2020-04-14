import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-welcome', 
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
  }

  Start() {
    this.router.navigate(['/owner']);
  }

}
