import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
//import{PostListComponent}from './posts/post-list/post-list.component';
import{HttpClientModule,HTTP_INTERCEPTORS} from "@angular/common/http";
import{AppRoutingModule} from './app-routing.module';
import { AuthInterceptor } from "./auth/auth-interceptor";
import{ErrorInterceptor} from "./error-interceptor";
import{AngularMaterialModule} from "./angular-material.module";
import{ErrorComponent} from "./error/error.component";
import{PostsModule} from "./posts/posts.model";

@NgModule({
  declarations: [
    AppComponent,
   HeaderComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    PostsModule
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents:[ErrorComponent]//use it even angular cant see it
})
export class AppModule { }
