
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,HttpErrorResponse
} from "@angular/common/http";



import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { ErrorComponent } from "./error/error.component";

@Injectable()//injecting service using constructor
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    //handle gives the response observable stream
    return next.handle(req).pipe(//to add special operator
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "unknown error occurred!.....";
        if (error.error.message) {//error object resp body
          errorMessage = error.error.message;
        }
       this.dialog.open(ErrorComponent, {data: {message: errorMessage}});
        return throwError(error);
      })
    );
  }
}



//run for outgoing req--interceptor works lot like middleware and to add headers
