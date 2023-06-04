import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'media', loadChildren: () => import('./modules/media/media.module').then(m => m.MediaModule) },
  { path:'**', redirectTo: 'media' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
