import { Routes, RouterModule } from '@angular/router';
import { ClassIndexComponent } from './class-index/class-index.component';

export const classRoutes: Routes = [
  { path:'',
children:[
  {path:'',redirectTo:"index"},
  {path:'index',component:ClassIndexComponent}
]
},
];

//export const BusRoutes = RouterModule.forChild(routes);
