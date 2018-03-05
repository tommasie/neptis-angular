//Core modules
import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { FormsModule }            from '@angular/forms';
import {HttpClientModule}         from '@angular/common/http';
import { AlertModule }            from 'ngx-bootstrap/alert';
import {AdminRoutingModule}       from './admin-routing.module';
import { AgmCoreModule }          from '@agm/core';

//Components
import {AdminComponent}           from './admin.component';
import {HomeComponent}            from './home/home.component'

import {AttractionService}        from '../services/attraction.service';
import {MuseumService}            from '../services/museum.service';
@NgModule({
  declarations:[
    AdminComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    AdminRoutingModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyAqY3G_iymwda5bn9g87a4YwDPWu13gnw0'}),
  ],
  providers: [AttractionService, MuseumService]
})

export class AdminModule {}
