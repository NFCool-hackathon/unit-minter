import { Injectable } from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading;

  constructor(private loadingCtrl: LoadingController) { }

  public async startLoading() {
    this.loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Processing...',
    });
    await this.loading.present();
  }

  public stopLoading() {
    this.loading.dismiss();
  }
}
