import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

import { AppComponent }  from './app.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [

]

@NgModule({
  imports:      [ BrowserModule, HttpModule, JsonpModule, RouterModule.forRoot(appRoutes), Ng2PageScrollModule.forRoot() ],
  declarations: [ AppComponent, HomeComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
