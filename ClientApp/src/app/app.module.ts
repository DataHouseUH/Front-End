import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule   } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AlertListComponent, AlertListPopUpComponent } from './alert-list/alert-list.component';
import { OwnerFormComponent } from './owner-form/owner-form.component';
import { IfPrequalComponent } from './if-prequal/if-prequal.component';
import { NotPrequalComponent } from './not-prequal/not-prequal.component';
import { FrontDisplayComponent } from './front-display/front-display.component';
import { BackDisplayComponent } from './back-display/back-display.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { AlertListService } from './alert-list/alert-list.service';
import { OwnerFormService } from './owner-form/owner-form.service';
import { FrontDisplayService } from './front-display/front-display.service';
import { BackDisplayService } from './back-display/back-display.service';
import { LinkService } from './link.service';

import { LoginAuthComponent } from './login-auth/login-auth.component';
import {LoginAuthService} from "./login-auth/login-auth.service";


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AlertListComponent,
    AlertListPopUpComponent,
    OwnerFormComponent,
    IfPrequalComponent,
    NotPrequalComponent,
    FrontDisplayComponent,
    BackDisplayComponent,
    WelcomeComponent,
    LoginAuthComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'alert', component: AlertListComponent },
      { path: 'owner', component: OwnerFormComponent },
      { path: 'qualify', component: IfPrequalComponent },
      { path: 'noqualify', component: NotPrequalComponent },
      { path: 'front', component: FrontDisplayComponent },
      { path: 'back', component: BackDisplayComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'login', component: LoginAuthComponent },
    ]),
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    AlertListService,
    OwnerFormService,
    FrontDisplayService,
    LoginAuthService,
    LinkService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
