import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaMainGridComponent } from './media-main-grid/media-main-grid.component';
import { MediaItemComponent } from './media-item/media-item.component';

const routes: Routes = [
  {
    path: '',
    component: MediaMainGridComponent,
  },
  { path: ':id', component: MediaItemComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediaRoutingModule {}
