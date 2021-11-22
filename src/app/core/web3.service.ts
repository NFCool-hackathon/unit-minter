import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import Web3 from 'web3';
import {Subject} from 'rxjs';
import {infuraKovanProvider} from '../../../keys.env';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  public accountSubject = new Subject<string>();

  public account;

  constructor(private web3: Web3) {
    this.init();
  }

  public isAccountSet(): boolean {
    return this.account;
  }

  public getAccountAddress(): string {
    if (this.account){
      return this.account.address;
    } else {
      return '';
    }
  }

  public async setPrivateKey(key: string): Promise<void> {
    await Storage.set({
      key: 'private-key',
      value: key,
    });
    this.account = this.web3.eth.accounts.privateKeyToAccount(key);
    this.accountSubject.next(this.account);

    this.web3.eth.accounts.wallet.add(key);
    return;
  }

  private async init(): Promise<void> {
    this.web3.setProvider(infuraKovanProvider);

    const {value} = await Storage.get({ key: 'private-key' });
    this.account = this.web3.eth.accounts.privateKeyToAccount(value);
    this.accountSubject.next(this.account);

    this.web3.eth.accounts.wallet.add(value);

    return;
  }
}
