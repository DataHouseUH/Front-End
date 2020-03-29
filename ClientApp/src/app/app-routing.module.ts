import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';


import { Routes, RouterModule } from '@angular/router';
import { AlertListComponent } from './alert-list/alert-list.component';

const routes: Routes = [
  { path: 'alert', component: AlertListComponent }
];

@NgModule({
    imports: [AppModule, ServerModule, ModuleMapLoaderModule],
    bootstrap: [AppComponent]
})
export class AppServerModule { }

export class AppRoutingModule { }
export const routingComponents = [AlertListComponent]
