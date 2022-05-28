import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  templateUrl: './error.component.html'
})
export class ErrorComponent {//@Inject allows specify a special token,imprtn for dependncy to identfy data passing
  constructor(@Inject(MAT_DIALOG_DATA)
  public data:
   {message: string}) {}
}
