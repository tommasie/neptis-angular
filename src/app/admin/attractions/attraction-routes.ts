import { RouterModule, Routes } from '@angular/router';

import { AttractionsComponent } from './attractions.component';
import { AddAttractionComponent } from './addAttraction.component';
import { EditAttractionComponent } from './editAttraction.component';

export const attractionRoutes: Routes = [
  { path: '', component: AttractionsComponent },
  { path: 'new', component: AddAttractionComponent },
  { path: ':id', component: EditAttractionComponent }
];
