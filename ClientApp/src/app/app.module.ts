import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule   } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { TestComponent } from './test/home.component';


import { AlertListComponent } from './alert-list/alert-list.component';
import { OwnerFormComponent } from './owner-form/owner-form.component';
import { IfPrequalComponent } from './if-prequal/if-prequal.component';
import { NotPrequalComponent } from './not-prequal/not-prequal.component';
import { FrontDisplayComponent } from './front-display/front-display.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AlertListService } from './alert-list/alert-list.service';
import { OwnerFormService } from './owner-form/owner-form.service';
import { FrontDisplayService } from './front-display/front-display.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    TestComponent,
    AlertListComponent,
    OwnerFormComponent,
    IfPrequalComponent,
    NotPrequalComponent,
    FrontDisplayComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    MatGridListModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'alert', component: AlertListComponent },
      { path: 'owner', component: OwnerFormComponent },
      { path: 'qualify', component: IfPrequalComponent },
      { path: 'noqualify', component: NotPrequalComponent },
      { path: 'front', component: FrontDisplayComponent }
    ]),
    BrowserAnimationsModule
  ],
  providers: [
    AlertListService,
    OwnerFormService,
    FrontDisplayService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
