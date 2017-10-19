import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {MuseumsComponent}       from './museums.component';
import {AddMuseumComponent}     from './addMuseum.component';
import {EditMuseumComponent}    from './editMuseum.component';

export const museumRoutes: Routes = [
  {path: '', component: MuseumsComponent},
  {path: 'new', component: AddMuseumComponent},
  {path: ':id', component: EditMuseumComponent}
];
