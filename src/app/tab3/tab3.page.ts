import { Component } from '@angular/core';
import {Web3Service} from '../core/web3.service';
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  privateKey = '';

  constructor(private web3Service: Web3Service,
              private toastCtrl: ToastController) {}

  change(e: CustomEvent) {
    this.privateKey = e.detail.value;
  }

  setPrivateKey() {
    this.web3Service.setPrivateKey(this.privateKey).then(() => {
      this.toastCtrl.create({message: 'The private key has been set'});
    }).catch(e => {
      this.toastCtrl.create({message: 'An error has occur, please try again later.'});
    });
  }

}
