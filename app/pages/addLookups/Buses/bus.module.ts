
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BusIndexComponent } from './bus-index/bus-index.component';
import { busRoutes } from './bus.routing';


@NgModule({
  declarations: [
    BusIndexComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(busRoutes)
  ]
})
export class BusModule { }
