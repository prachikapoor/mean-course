import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Post } from "./post.model";
import{environment} from "../../environments/environment";
const Backend_Url=environment.apiUrl+"/posts/";

@Injectable({ providedIn: "root" })
export class PostsService {
   //orignal array will not affect due to copy of array
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();
//injecting http client
  constructor(private http: HttpClient, private router: Router) {}


  //...using spread operator next gen js or ts to copy the elements
  //creating new array witjh old objects therefore this array copied not objects
  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;//back ticks allows dynamically add values into string and ?-seperate url from ur query param to  the backend
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        Backend_Url + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts.map(post => {//returing array of posts
              return {
                title: post.title,
                content: post.content,//returning objects
                id: post._id,
                imagePath: post.imagePath,
                creator:post.creator
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        console.log(transformedPostData);

        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts//returning js object
        });
      });
  }

  getPostUpdateListener() {
     //return{...this.posts.find(p=> p.id===id)};//looking for the id which we are parsing
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      creator:string;
    }>(Backend_Url + id);
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    this.http
      .post<{ message: string; post: Post }>(
        Backend_Url,
        postData
      )
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof image === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        creator:null//handle on server psts .js
      };
    }
    this.http
      .put(Backend_Url + id, postData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }

  deletePost(postId: string) {
    return this.http
      .delete(Backend_Url + postId);
  }
}
