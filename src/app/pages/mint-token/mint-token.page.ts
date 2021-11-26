import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NfcService} from '../../core/nfc.service';
import {LoadingService} from '../../core/loading.service';
import {SmartContractService} from '../../core/smart-contract.service';
import {TokenModel} from "../../models/token.model";
import {ToastService} from "../../core/toast.service";

@Component({
  selector: 'app-mint-token',
  templateUrl: './mint-token.page.html',
  styleUrls: ['./mint-token.page.scss'],
})
export class MintTokenPage implements OnInit {

  modal: 'none' | 'read' | 'write' = 'none';

  tokenId: number;

  token: TokenModel;

  constructor(private route: ActivatedRoute,
              private nfcService: NfcService,
              private loading: LoadingService,
              private toast: ToastService,
              private smartContract: SmartContractService) { }

  ngOnInit() {
    const tmpTokenId: string | null = this.route.snapshot.paramMap.get('tokenId');
    if (tmpTokenId) {
      this.tokenId = parseInt(tmpTokenId, 10);
    }

    this.smartContract.getToken(this.tokenId).then(token => {
      console.log(token);
      this.token = token;
    });
  }

  async mintUnit() {
    this.modal = 'read';
    const tag: any = await this.nfcService.readTagAndroid();

    this.modal = 'none';
    this.loading.startLoading();
    const tagId: string = tag.id.join('');

    const unitId = await this.smartContract.createTokenUnit(this.tokenId, tagId);
    this.loading.stopLoading();

    this.modal = 'write';
    await this.nfcService.writeAndLockTagAndroid('nfcool://website/token?tokenId=' + this.tokenId + '&unitId=' + unitId);
    this.modal = 'none';
    this.toast.open('Unit ready !');
  }

  closeNfcModal() {
    this.modal = 'none';
  }
}
