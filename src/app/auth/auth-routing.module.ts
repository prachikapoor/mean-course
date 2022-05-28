//want to manage root for this module seperately dont want to load the all code if not required
import{NgModule} from "@angular/core";
import{RouterModule, Routes} from "@angular/router";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
const routes:Routes=[
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent}
]

@NgModule({
  imports:[
    RouterModule.forChild(routes)//we registered some child droughts which will merged with root rotes eventually
  ],
  exports:[
    RouterModule
  ]
})
export class AuthRoutingModule{

}
