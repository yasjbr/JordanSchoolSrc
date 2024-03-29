import { AdmIndexComponent } from './adm-index/adm-index.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdmService } from './adm.service';
import { admRoutes } from './adm.routing';
import { AdmFormComponent } from './adm-form/adm-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdmDialogComponent } from './adm-dialog/adm-dialog.component';

@NgModule({
  declarations: [
   AdmIndexComponent,
   AdmFormComponent,
   AdmDialogComponent
  ],
  entryComponents:[
    AdmDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(admRoutes),
    FormsModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule

  ],
  providers:[AdmService]
})
export class AdmModule { }
