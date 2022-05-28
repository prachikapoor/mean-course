import {Component ,EventEmitter,Output, OnInit, OnDestroy} from '@angular/core';


import{ FormGroup, FormControl, Validators, FormControlName} from "@angular/forms";
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import{mimeType} from "./myme-type.validator";
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
selector:'app-post-create',
templateUrl:'./post-create.component.html',
styleUrls:['./post-create.component.css']

})
export class PostCreateComponent implements OnInit,OnDestroy{
enteredContent="";
enteredTitle="";
private mode="create";
private postId:string;
post:Post;
isLoading=false;
form:FormGroup;
imagePreview:string;
private authStatusSub:Subscription;
//postcreate is an event which u can listen  from the outside (in the parent component )
//by using decoratoer any generic type data
//emiting new post here nd passing to parent componet nd then passing to down post list
//@Output() postCreated = new EventEmitter<Post>();


constructor(public postsService:PostsService, public route: ActivatedRoute,private authService:AuthService){}//hold infrmtion abouth the route we currently on

ngOnInit(){
   this.authStatusSub=this.authService.getAuthStatusListener().subscribe(
    authStatus=>{
      this.isLoading=false;
    });

   this.form=new FormGroup({
        title:new FormControl(null,{
          validators: [Validators.required, Validators.minLength(3)]
        }),
        content:new FormControl(null,{
          validators: [Validators.required]
        }),
        image:new FormControl(null,{
          validators: [Validators.required],
        asyncValidators:[mimeType]})
    });
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
        if(paramMap.has('postId')){
            this.mode='edit';
            this.postId=paramMap.get('postId');
            this.isLoading=true;
            this.postsService.getPost(this.postId).subscribe(postData=>{
              this.isLoading=false;
              this.post={
                id:postData._id,title:postData.title,
                content:postData.content,
                imagePath:postData.imagePath,
                creator:postData.creator
              };
              //setvalues allwoes u to overwrite the values for ur form controls u registers
              this.form.setValue({
                title:this.post.title,
                content:this.post.content,
                image:this.post.imagePath
              });
            });
        }else{
          this.mode='create';
          this.postId=null;
        }
    });
}

onImagePicked(event:Event){
  const file=(event.target as HTMLInputElement).files[0];
  //this allows u to target a single control instead of set the all values
  this.form.patchValue({image:file});
  this.form.get('image').updateValueAndValidity();
  console.log(file);
  console.log(this.form);
  const reader=new FileReader();
  reader.onload=()=>{
    this.imagePreview=<string>reader.result;
  };
  reader.readAsDataURL(file);

}

onSavePost(){
  //this.newPost=this.enteredValue;
  if(this.form.invalid){
    return;
  }
  // const post: Post={

  //   title:form.value.title,
  //   content:form.value.content

  //   //title:this.enteredTitle,content:this.enteredContent
  //           };
           // this.postCreated.emit(post);

           this.isLoading=true;
           if(this.mode==='create'){
            this.postsService.addPost(this.form.value.title,this.form.value.content,this.form.value.image);
           }else{
             this.postsService.updatePost(this.postId,this.form.value.title,this.form.value.content,this.form.value.image);
           }

       this.form.reset();
      }
      ngOnDestroy(){
        this.authStatusSub.unsubscribe();
      }

}
