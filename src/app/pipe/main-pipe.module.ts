import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyFilterPipe } from './filter.pipe';

@NgModule({
  declarations: [MyFilterPipe],
  imports: [CommonModule],
  exports: [MyFilterPipe]
})

export class MainPipe { }
