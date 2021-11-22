import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import Web3 from 'web3';
import {Subject} from 'rxjs';
import {infuraKovanProvider} from '../../../keys.env';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  public accountAddressSubject = new Subject<string>();

  private account;

  constructor(private web3: Web3) {
    this.init();
  }

  public isAccountSet(): boolean {
    return this.account;
  }

  public async setPrivateKey(key: string): Promise<void> {
    await Storage.set({
      key: 'private-key',
      value: key,
    });
    this.account = this.web3.eth.accounts.privateKeyToAccount(key);
    this.accountAddressSubject.next(this.account.address);
    return ;
  }

  private async init(): Promise<void> {
    const {value} = await Storage.get({ key: 'private-key' });
    this.account = this.web3.eth.accounts.privateKeyToAccount(value);
    this.accountAddressSubject.next(this.account.address);

    this.web3.setProvider(infuraKovanProvider);
    return;
  }
}
