import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import{PostListComponent} from "./posts/post-list/post-list.component"
import{PostCreateComponent} from "./posts/post-create/post-create.component"

import{AuthGuard} from "./auth/auth.guard";
 const routes:Routes=[
  {path:'',component:PostListComponent},
  {path:'create',component:PostCreateComponent,canActivate:[AuthGuard]},
  {path:"edit/:postId",component:PostCreateComponent,canActivate:[AuthGuard]},
  //{path:"auth",loadChildren:"./auth/auth.module#AuthModule"}//allows u to add string which decrbe to path u want to load lazily and class work as module towards pointing it
   {path:"auth",loadChildren:()=>import("./auth/auth.module").then(m=> m.AuthModule)},
  // {path:'signup',component:SignupComponent}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule],
  providers:[AuthGuard]//to protect routes
})


export class AppRoutingModule{}
