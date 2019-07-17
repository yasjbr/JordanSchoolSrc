import { TourIndexComponent } from './tour-index/tour-index.component';
import { Routes, RouterModule } from '@angular/router';

export const tourRoutes: Routes = [
  { path:'',
  children:[
    {path:'', redirectTo:'index'},
    {path:'index', component:TourIndexComponent}
  ]
 },
];

//export const TourRoutes = RouterModule.forChild(routes);
