//Core modules
import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { FormsModule }            from '@angular/forms';
import { RouterModule }           from '@angular/router';
import {HttpClientModule}         from '@angular/common/http';
import { AgmCoreModule }          from '@agm/core';
import { ImageUploadModule }      from "angular2-image-upload";
import {MainPipe}                 from '../../pipe/main-pipe.module';
//Components
import {AttractionsComponent}     from './attractions.component';
import {AddAttractionComponent}      from './addAttraction.component';
import {EditAttractionComponent}  from './editAttraction.component';

import {AttractionService}        from '../../services/attraction.service';
@NgModule({
  declarations: [
    AttractionsComponent,
    AddAttractionComponent,
    EditAttractionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyAqY3G_iymwda5bn9g87a4YwDPWu13gnw0'}),
    ImageUploadModule.forRoot(),
    MainPipe
    ],
    exports: [
      AttractionsComponent,
      AddAttractionComponent,
      EditAttractionComponent
    ],
  providers: [AttractionService]
})

export class AttractionModule {}
