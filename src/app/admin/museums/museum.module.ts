import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { SelectModule } from 'ng2-select';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { MainPipe } from '../../pipe/main-pipe.module';

import { MuseumsComponent } from './museums.component';
import { AddMuseumComponent } from './addMuseum.component';
import { EditMuseumComponent } from './editMuseum.component';
import { MuseumAttractionComponent } from './attraction/museumAttraction.component';

@NgModule({
  declarations: [
    MuseumsComponent,
    AddMuseumComponent,
    EditMuseumComponent,
    MuseumAttractionComponent
  ],
  imports: [
    CommonModule,
    SelectModule,
    Ng2TableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyAqY3G_iymwda5bn9g87a4YwDPWu13gnw0' }),
    MainPipe
  ],
  exports: [
    MuseumsComponent,
    AddMuseumComponent,
    EditMuseumComponent,
    MuseumAttractionComponent
  ],
  providers: [],
  entryComponents: [MuseumAttractionComponent]
})

export class MuseumModule { }
