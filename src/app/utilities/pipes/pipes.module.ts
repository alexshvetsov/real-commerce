import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayMediaTypePipe } from './display-media-type.pipe';
import { DateToStringPipe } from './date-to-string.pipe';



@NgModule({
  declarations: [
    DisplayMediaTypePipe,
    DateToStringPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DisplayMediaTypePipe,
    DateToStringPipe

  ]
})
export class PipesModule { }
