import { AdmFormComponent } from './adm-form/adm-form.component';
import { Routes, RouterModule } from '@angular/router';
import { AdmIndexComponent } from './adm-index/adm-index.component';

export const admRoutes: Routes = [
  { path:'',
  children:[
    {path:'', redirectTo:'index'},
    {path:'index', component:AdmIndexComponent},
    { path: 'add', component: AdmFormComponent },
    {path:'edit/:id', component: AdmFormComponent}
    
  ]
 },
];

//export const TourRoutes = RouterModule.forChild(routes);
