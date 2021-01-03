import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotadetalladaPage } from './notadetallada.page';

const routes: Routes = [
  {
    path: '',
    component: NotadetalladaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotadetalladaPageRoutingModule {}
