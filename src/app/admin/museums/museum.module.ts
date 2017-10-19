import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { FormsModule }            from '@angular/forms';
import {HttpClientModule}         from '@angular/common/http';
import { RouterModule }           from '@angular/router';
import { AgmCoreModule }          from '@agm/core';
import { ImageUploadModule }      from "angular2-image-upload";
import {SelectModule}             from 'ng2-select';
import {MainPipe}                 from '../../pipe/main-pipe.module';

import {MuseumsComponent}         from './museums.component';
import {AddMuseumComponent}       from './addMuseum.component';
import {EditMuseumComponent}      from './editMuseum.component';

@NgModule({
  declarations:[
    MuseumsComponent,
    AddMuseumComponent,
    EditMuseumComponent
  ],
  imports: [
    CommonModule,
    SelectModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyAqY3G_iymwda5bn9g87a4YwDPWu13gnw0'}),
    ImageUploadModule.forRoot(),
    MainPipe
    ],
  exports: [
    MuseumsComponent,
    AddMuseumComponent,
    EditMuseumComponent
  ],
  providers: []
})

export class MuseumModule {}
