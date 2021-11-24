import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import {IonicModule, IonicRouteStrategy, LoadingController, ToastController} from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import Web3 from 'web3';
import {Ndef, NFC} from '@ionic-native/nfc/ngx';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireFunctionsModule} from '@angular/fire/compat/functions';
import {firebaseConfig} from '../environments/firebase.config';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireFunctionsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Web3, ToastController, NFC, Ndef, LoadingController],
  bootstrap: [AppComponent],
})
export class AppModule {}
