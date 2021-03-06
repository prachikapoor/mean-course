import { NgModule } from '@angular/core';
import{PostCreateComponent}from './post-create/post-create.component';
import{PostListComponent}from './post-list/post-list.component';
import{ReactiveFormsModule} from "@angular/forms";
import{AngularMaterialModule} from "../angular-material.module";
import { CommonModule } from '@angular/common';//use for ngif
import { RouterModule } from '@angular/router';
@NgModule({
declarations:[
  PostCreateComponent,
  PostListComponent
],
imports:[
ReactiveFormsModule,
AngularMaterialModule,
CommonModule,
RouterModule
]
})

export class PostsModule{

}
