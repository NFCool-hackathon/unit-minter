import { Component } from '@angular/core';
import {Web3Service} from '../core/web3.service';
import {ToastService} from '../core/toast.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  privateKey = '';

  constructor(private web3Service: Web3Service,
              private toastService: ToastService) {}

  change(e: CustomEvent) {
    this.privateKey = e.detail.value;
  }

  setPrivateKey() {
    this.web3Service.setPrivateKey(this.privateKey).then(() => {
      this.toastService.open('The private key has been set');
    }).catch(e => {
      console.error(e);
      this.toastService.open('An error has occur, please try again later.');
    });
  }

}
