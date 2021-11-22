import { Component } from '@angular/core';
import {SmartContractService} from '../core/smart-contract.service';
import {LoadingService} from '../core/loading.service';
import {NfcService} from '../core/nfc.service';
import {NFC} from "@ionic-native/nfc/ngx";
import {ToastService} from "../core/toast.service";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  modal: 'none' | 'read' = 'none';

  constructor(private smartContract: SmartContractService,
              private loading: LoadingService,
              private nfcService: NfcService,
              private toast: ToastService,
              private nfc: NFC) {}

  async sell() {
    this.modal = 'read';
    const tag: any = await this.nfcService.readTagAndroid();

    this.modal = 'none';
    const message = this.nfc.bytesToString(tag.ndefMessage[0].payload);
    const tokenId = parseInt(message.split(/&|=/)[1], 10);
    const unitId = parseInt(message.split(/&|=/)[3], 10);

    this.loading.startLoading();
    await this.smartContract.sellUnit(tokenId, unitId);
    this.loading.stopLoading();
    this.toast.open('The item has been updated');
  }

  closeNfcModal() {
    this.modal = 'none';
  }

}
