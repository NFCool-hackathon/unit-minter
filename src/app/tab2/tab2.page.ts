import {Component, OnDestroy, OnInit} from '@angular/core';
import {SmartContractService} from '../core/smart-contract.service';
import {LoadingService} from '../core/loading.service';
import {NfcService} from '../core/nfc.service';
import {NFC} from '@ionic-native/nfc/ngx';
import {ToastService} from '../core/toast.service';
import {Subscription} from 'rxjs';
import {AuthStore} from '../core/auth.store';
import {FunctionsService} from '../core/functions.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {

  modal: 'none' | 'read' = 'none';

  accountSub: Subscription;
  account = this.authStore.account;

  phoneNumber = '';

  constructor(private smartContract: SmartContractService,
              private authStore: AuthStore,
              private loading: LoadingService,
              private nfcService: NfcService,
              private toast: ToastService,
              private nfc: NFC,
              private cloudFunctions: FunctionsService) {}

  ngOnInit() {
    this.accountSub = this.authStore.accountSubject.subscribe(account => {
      this.account = account;
    });
  }

  ngOnDestroy() {
    this.accountSub.unsubscribe();
  }

  async sell() {
    this.modal = 'read';
    const tag: any = await this.nfcService.readTagAndroid();

    this.modal = 'none';
    const message = this.nfc.bytesToString(tag.ndefMessage[0].payload);
    const tokenId = parseInt(message.split(/&|=/)[1], 10);
    const unitId = parseInt(message.split(/&|=/)[3], 10);

    this.loading.startLoading();
    await this.smartContract.sellUnit(tokenId, unitId);
    await this.cloudFunctions.setPhoneNumber(tokenId, unitId, this.phoneNumber);
    this.loading.stopLoading();
    this.toast.open('The item has been updated');
  }

  closeNfcModal() {
    this.modal = 'none';
  }

  change(e: CustomEvent) {
    this.phoneNumber = e.detail.value;
  }
}
