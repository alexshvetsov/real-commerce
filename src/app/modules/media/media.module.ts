import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaRoutingModule } from './media-routing.module';
import { MediaMainGridComponent } from './media-main-grid/media-main-grid.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { MediaCardComponent } from './components/media-card/media-card.component';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from 'src/app/utilities/pipes/pipes.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MediaItemComponent } from './media-item/media-item.component';

@NgModule({
  declarations: [
    MediaMainGridComponent,
    SideBarComponent,
    MediaCardComponent,
    SearchBarComponent,
    MediaItemComponent,
  ],
  imports: [
    CommonModule,
    MediaRoutingModule,
    MaterialModule,
    PipesModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  exports: [  
    MediaMainGridComponent,
    MediaItemComponent,

  ]
})
export class MediaModule { }
