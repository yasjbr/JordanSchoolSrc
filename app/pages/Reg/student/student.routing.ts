import { StudentFormComponent } from './student-form/student-form.component';

import { Routes } from '@angular/router';
import { StudentIndexComponent } from './student-index/student-index.component';



export const studentRoute:Routes=[
{

    path:'',
    children:[
        {path:'',redirectTo:'index'},
        {path:'index',component:StudentIndexComponent},
        {path:'add', component:StudentFormComponent},
        {path:'edit/:id', component:StudentFormComponent},
       // {path:'view/:id',component:ParentViewComponent}
    ]
}


]