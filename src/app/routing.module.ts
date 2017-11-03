import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import {AdminComponent}           from './admin/admin.component';

import {HomeComponent}            from './admin/home/home.component';
import {AttractionsComponent}     from './admin/attractions/attractions.component';
import {AddAttractionComponent}   from './admin/attractions/addAttraction.component';
import {EditAttractionComponent}  from './admin/attractions/editAttraction.component';
import {MuseumsComponent}         from './admin/museums/museums.component';
import {AddMuseumComponent}       from './admin/museums/addMuseum.component';
import {EditMuseumComponent}      from './admin/museums/editMuseum.component';

import {AuthGuard}                from './guards/auth.guard';

const appRoutes: Routes = [
  { path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes//,
      //{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})

export class RoutingModule {}
