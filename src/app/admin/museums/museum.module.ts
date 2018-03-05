import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { FormsModule }            from '@angular/forms';
import { ReactiveFormsModule }      from '@angular/forms';  // <-- #1 import module
import {HttpClientModule}         from '@angular/common/http';
import { RouterModule }           from '@angular/router';
import { AgmCoreModule }          from '@agm/core';
import { ImageUploadModule }      from "angular2-image-upload";
import {SelectModule}             from 'ng2-select';
import {MainPipe}                 from '../../pipe/main-pipe.module';

import {MuseumsComponent}         from './museums.component';
import {AddMuseumComponent}       from './addMuseum.component';
import {EditMuseumComponent}      from './editMuseum.component';
import {MuseumAttractionComponent}         from './attraction/museumAttraction.component';

@NgModule({
  declarations:[
    MuseumsComponent,
    AddMuseumComponent,
    EditMuseumComponent,
    MuseumAttractionComponent
  ],
  imports: [
    CommonModule,
    SelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyAqY3G_iymwda5bn9g87a4YwDPWu13gnw0'}),
    ImageUploadModule.forRoot(),
    MainPipe
    ],
  exports: [
    MuseumsComponent,
    AddMuseumComponent,
    EditMuseumComponent,
    MuseumAttractionComponent
  ],
  providers: []
})

export class MuseumModule {}
