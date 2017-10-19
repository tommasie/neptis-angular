import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AdminComponent}         from './admin.component';
import {HomeComponent}          from './home/home.component';

import {attractionRoutes}       from './attractions/attraction-routes';
import {museumRoutes}           from './museums/museum-routes';

const routes: Routes = [
  {path: 'home', component: AdminComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'attractions', children: [...attractionRoutes]},
      {path: 'museums', children: [...museumRoutes]},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AdminRoutingModule { }
