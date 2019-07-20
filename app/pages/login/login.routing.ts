import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

export const loginRoutes: Routes = [
  { path:'',
  children:[
    {path:'', redirectTo:'index'},
    {path:'index', component:LoginComponent},
   /* { path: 'add', component: AdmFormComponent },
    {path:'edit/:id', component: AdmFormComponent}
    */
  ]
 },
];

//export const TourRoutes = RouterModule.forChild(routes);
