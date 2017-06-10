import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

import { AppComponent }  from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home/home.component';

import { HomeService } from './home/home.service';
import { AboutService } from './about/about.service';
import { MinistriesService } from './ministries/ministries.service';

import { AboutComponent } from './about/about/about.component';
import { ImnewComponent } from './about/imnew/imnew.component';
import { BeliefsComponent } from './about/beliefs/beliefs.component';
import { StaffComponent } from './about/staff/staff.component';
import { AmiComponent } from './about/ami/ami.component';
import { FamilygroupComponent } from './familygroup/familygroup/familygroup.component';
import { MinistriesComponent } from './ministries/ministries/ministries.component';
import { TileComponent } from './ministries/ministries/tile/tile.component';
import { InfoComponent } from './ministries/ministries/info/info.component';
import { GivingComponent } from './giving/giving/giving.component';
import { MultimediaComponent } from './multimedia/multimedia/multimedia.component';
import { CalendarComponent } from './calendar/calendar/calendar.component';
import { SingaporeComponent } from './giving/singapore/singapore.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { EmptyComponent } from './empty/empty.component';
import { AdminFormDirective } from './admin/admin-form.directive';
import { MaComponent } from './admin/ma/ma.component';
import { ImagePreviewInputComponent } from './admin/image-preview-input/image-preview-input.component';

const appRoutes: Routes = [
  {path: '', children: [
    {path: '', component : HomeComponent},
    {path: '', component: NavbarComponent, outlet: "nav"},
    {path: '', component: FooterComponent, outlet: "footer"},
    {path: 'about', component : AboutComponent},
    {path: 'beliefs', component: BeliefsComponent},
    {path: 'imnew', component: ImnewComponent},
    {path: 'gccstaff', component: StaffComponent},
    {path: 'ami', component: AmiComponent},
    {path: 'familygroup', component : FamilygroupComponent},
    {path: 'ministries', component: MinistriesComponent},
    {path: 'giving', component: GivingComponent},
    {path: 'multimedia', component: MultimediaComponent},
    {path: 'calendar', component: CalendarComponent},
    {path: 'singapore', component: SingaporeComponent}
  ]},
  {path: 'admin', children: [
    {path: '', component: AdminComponent},
    {path: '', outlet: "nav", component: AdminNavComponent},
    {path: '', outlet: "footer", component: EmptyComponent},
    {path: 'mainAnnouncements', component: AdminComponent},
    {path: 'smallAnnouncements', component: AdminComponent},
    {path: 'memoryVerses', component: AdminComponent}
  ]}
];

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, JsonpModule, RouterModule.forRoot(appRoutes), Ng2PageScrollModule.forRoot() ],
  declarations: [ AppComponent, NavbarComponent, FooterComponent, HomeComponent, AboutComponent, ImnewComponent,
                  BeliefsComponent, StaffComponent, AmiComponent, FamilygroupComponent, MinistriesComponent, TileComponent,
                  InfoComponent, GivingComponent, MultimediaComponent, CalendarComponent, SingaporeComponent, AdminComponent, AdminNavComponent, EmptyComponent, AdminFormDirective, MaComponent, ImagePreviewInputComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ HomeService, AboutService, MinistriesService ],
  entryComponents: [MaComponent]
})
export class AppModule { }
