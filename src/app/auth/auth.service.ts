import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { AuthData } from "./auth-data.model";
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import{environment} from "../../environments/environment";
const Backend_Url=environment.apiUrl+"/user/";

@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated=false;
  private token: string;//boolean type to check user authntcted or not
  private tokenTimer: number;
  private userId:string;
  private authStatusListener=new Subject<boolean>();//new subject use that to push authentictn infrmtn to components which intersted
  constructor(private http: HttpClient,private router:Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  getUserId(){
    return this.userId;
  }
  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }
  createUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post(Backend_Url+"/signup", authData)
      .subscribe(() => {
        //console.log(response);
        this.router.navigate(["/"]);
      }, error=>{
        this.authStatusListener.next(false);//infroming not authntivated
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post<{token: string,expiresIn:number,userId:string}>(Backend_Url+"/login", authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if(token){
          const expiresInDuration=response.expiresIn;
         // console.log(expiresInDuration);
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated=true;
          this.userId=response.userId;
          this.authStatusListener.next(true);//infrming who is intersted abut user being authntited
const now=new Date();
const expirationDate=new Date(now.getTime()+expiresInDuration*1000);
         console.log(expirationDate);
          this.saveAuthData(token,expirationDate,this.userId);
          this.router.navigate(['/']);
        }

      },error=>{
        this.authStatusListener.next(false);
      });
  }//logic for not getting logout during refersh
autoAuthUser(){
  const authInformation=this.getAuthData();
  if(!authInformation){
    return;
  }
  const now= new Date();
  const expiresIn=authInformation.expirationDate.getTime()-now.getTime();
  console.log(authInformation,expiresIn)
  if(expiresIn>0){
    this.token=authInformation.token;
    this.isAuthenticated=true;
    this.userId=authInformation.userId;
    this.setAuthTimer(expiresIn / 1000);
    this.authStatusListener.next(true);
  }
}

logout(){
  this.token=null;
  this.isAuthenticated=false;
  this.authStatusListener.next(false);
  this.userId=null;
  clearTimeout(this.tokenTimer);
  this.clearAuthData();
  this.router.navigate(['/']);//redirecting to main page

}
private setAuthTimer(duration){
  console.log("setting timer"+duration);
  this.tokenTimer= window.setTimeout(()=>{
    this.logout();//clear the token
  }, duration *1000);
}
private saveAuthData(token: string,expirationDate:Date,userId:string){
  localStorage.setItem("token",token);
  localStorage.setItem("expiration",expirationDate.toISOString());//well serialized ,standrd style vrsion of data
  localStorage.setItem("userId",userId);
}
private clearAuthData(){
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  localStorage.removeItem("userId");
}
private getAuthData(){
  const token=localStorage.getItem("token");
  const expirationDate=localStorage.getItem("expiration");
  const userId=localStorage.getItem("userId");
  if(!token || !expirationDate){
        return;
    }
    return{
      token:token,
      expirationDate: new Date(expirationDate),
      userId:userId
    }
}

}
