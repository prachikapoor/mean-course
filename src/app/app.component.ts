import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'mean-course';

  //typescript syntax to get array of posts
// storedPosts:Post[]=[];

//   onPostAdded(post){
//     this.storedPosts.push(post);
//   }
constructor (private authService:AuthService){}
ngOnInit(){
this.authService.autoAuthUser();
}
 }
