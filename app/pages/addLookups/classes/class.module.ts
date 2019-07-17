import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClassIndexComponent } from './class-index/class-index.component';
import { classRoutes } from './class.routing';
import { ClassService } from './class.service';

@NgModule({
  declarations: [
    ClassIndexComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(classRoutes)
  ],
  providers:[ClassService]
})
export class ClassModule { }
