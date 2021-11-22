import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MintTokenPageRoutingModule } from './mint-token-routing.module';

import { MintTokenPage } from './mint-token.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MintTokenPageRoutingModule
  ],
  declarations: [MintTokenPage]
})
export class MintTokenPageModule {}
