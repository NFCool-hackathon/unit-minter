import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MintTokenPage } from './mint-token.page';

const routes: Routes = [
  {
    path: '',
    component: MintTokenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MintTokenPageRoutingModule {}
