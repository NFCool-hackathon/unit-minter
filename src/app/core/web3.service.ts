import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import Web3 from 'web3';
import {AuthStore} from './auth.store';
import {SmartContractService} from './smart-contract.service';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  constructor(private web3: Web3,
              private authStore: AuthStore,
              private smartContract: SmartContractService) {
    this.init();
  }

  public isAuth(): boolean {
    return this.authStore.account;
  }

  public getAccountAddress(): string {
    if (this.authStore.account){
      return this.authStore.account.address;
    } else {
      return '';
    }
  }

  public async setPrivateKey(key: string): Promise<void> {
    await Storage.set({
      key: 'private-key',
      value: key,
    });
    await this.setAccount(key);

    return;
  }

  private async init(): Promise<void> {
    const {value} = await Storage.get({ key: 'private-key' });

    await this.setAccount(value);

    return;
  }

  private async setAccount(privateKey: string): Promise<void> {
    const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
    const isMinter = await this.smartContract.isMinter(account.address);
    if (isMinter) {
      this.authStore.account = account;
      this.authStore.accountSubject.next(this.authStore.account);
      this.web3.eth.accounts.wallet.add(privateKey);

      return ;
    } else {
      throw Error('Account is not minter');
    }
  }
}
