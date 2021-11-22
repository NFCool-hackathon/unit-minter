import {Component, OnDestroy, OnInit} from '@angular/core';
import {TokenModel} from '../models/token.model';
import {Subscription} from 'rxjs';
import {AuthStore} from '../core/auth.store';
import {SmartContractService} from '../core/smart-contract.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy{

  account = '';

  tokenId = null;
  tokens: TokenModel[] = [];

  accountSub: Subscription;

  constructor(private authStore: AuthStore,
              private smartContract: SmartContractService) {}

  ngOnInit() {
    this.accountSub = this.authStore.accountSubject.subscribe(account => {
      this.account = account;
    });
    this.getTokens();
  }

  ngOnDestroy() {
    this.accountSub.unsubscribe();
  }

  async getTokens() {
    this.tokens = await this.smartContract.getAllTokens();
  }

  change(e: CustomEvent) {
    this.tokenId = e.detail.value;
  }

}
