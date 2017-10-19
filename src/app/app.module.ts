import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { FormsModule }          from '@angular/forms';
import {HttpClientModule}       from '@angular/common/http';
import { RoutingModule }        from './routing.module';

import { AgmCoreModule }        from '@agm/core';

import { AppComponent }         from './app.component';
import {AuthenticationService}  from './services/authentication.service';
import {AuthGuard}              from './guards/auth.guard';

import {LoginModule}            from './login/login.module';
import {AdminModule}            from './admin/admin.module';
import {AttractionModule}       from './admin/attractions/attraction.module';
import {MuseumModule}           from './admin/museums/museum.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyAqY3G_iymwda5bn9g87a4YwDPWu13gnw0'}),
    LoginModule,
    AdminModule,
    AttractionModule,
    MuseumModule,
    RoutingModule,
  ],
  providers: [AuthenticationService,
                AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
