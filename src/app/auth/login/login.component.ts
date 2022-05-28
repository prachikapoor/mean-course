import{Component, OnDestroy, OnInit} from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import {  Subscription } from 'rxjs';

@Component({
templateUrl:'./login.component.html',
styleUrls:['./login.component.css']
})

export class LoginComponent implements OnDestroy,OnInit{
isLoading =false;
private authStatusSub:Subscription;
constructor (public authService:AuthService){}

ngOnInit(){
  this.authStatusSub=this.authService.getAuthStatusListener().subscribe(
      authStatus=>{
        this.isLoading=false;
      }

  );
    }
onLogin(form: NgForm){
  //console.log(form.value);
  if(form.invalid){
    return;
  }
  this.isLoading=true;
  this.authService.login(form.value.email,form.value.password);
  }
  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }
}

