import { Routes, RouterModule } from '@angular/router';
import { BusIndexComponent } from './bus-index/bus-index.component';


export const busRoutes: Routes = [
  { path:'',
children:[
  {path:'',redirectTo:"index"},
  {path:'index',component:BusIndexComponent}
]
},
];

//export const BusRoutes = RouterModule.forChild(routes);
