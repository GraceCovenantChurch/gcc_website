import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }  from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home/home.component';

import { HomeService } from './home/home.service';
import { AboutService } from './about/about.service';

import { AboutComponent } from './about/about/about.component';
import { ImnewComponent } from './about/imnew/imnew.component';
import { BeliefsComponent } from './about/beliefs/beliefs.component';
import { StaffComponent } from './about/staff/staff.component';
import { AmiComponent } from './about/ami/ami.component';

const appRoutes: Routes = [
  {path: '', component : HomeComponent},
  {path: 'about', component : AboutComponent},
  {path: 'beliefs', component: BeliefsComponent},
  {path: 'imnew', component: ImnewComponent},
  {path: 'staff', component: StaffComponent},
  {path: 'ami', component: AmiComponent}
]

@NgModule({
  imports:      [ BrowserModule, HttpModule, JsonpModule, RouterModule.forRoot(appRoutes) ],
  declarations: [ AppComponent, NavbarComponent, FooterComponent, HomeComponent, AboutComponent, ImnewComponent, BeliefsComponent, StaffComponent, AmiComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ HomeService, AboutService ]
})
export class AppModule { }
