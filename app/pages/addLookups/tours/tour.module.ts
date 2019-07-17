import { RouterModule } from '@angular/router';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourIndexComponent } from './tour-index/tour-index.component';
import { tourRoutes } from './tour.routing';
import { TourService } from './tour.service';

@NgModule({
  declarations: [
    TourIndexComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(tourRoutes)

  ],
  providers:[TourService]
})
export class TourModule { }
