import { Injectable } from '@angular/core';
import Web3 from 'web3';

// @ts-ignore
import contractABI from '../../assets/abi/NFCool.json';
import {environment} from '../../environments/environment';

import * as keccak256 from 'keccak256';
import {TokenModel} from '../models/token.model';
import {AuthStore} from './auth.store';
import {infuraKovanProvider} from '../../../keys.env';

@Injectable({
  providedIn: 'root'
})
export class SmartContractService {
  private contract = new this.web3.eth.Contract(contractABI.abi, environment.contractAddress);

  constructor(private web3: Web3,
              private authStore: AuthStore) {
    this.web3.setProvider(infuraKovanProvider);
  }

  public async isMinter(account: string) {
    return await this.contract.methods.hasRole(keccak256('MINTER_ROLE'), account).call();
  }

  public async getToken(id: number): Promise<TokenModel> {
    return await this.contract.methods.tokenData(id).call();
  }

  public async getAllTokens(): Promise<TokenModel[]> {
    const tokensCount: number = await this.contract.methods.getTokensCount().call();
    const tokens: TokenModel[] = [];

    for (let i = 0 ; i < tokensCount ; i++) {
      const token: TokenModel = await this.getToken(i);
      tokens.push(token);
    }

    return tokens;
  }

  public async createTokenUnit(tokenId: number, nfcId: string): Promise<number> {
    // eslint-disable-next-line max-len
    const res = await this.contract.methods.mintTokenUnit(tokenId, nfcId, this.web3.utils.fromAscii('')).send({ from: this.authStore.account.address, gasLimit: 300000, gas: 300000 });
    console.log(res);
    return parseInt(res.events.TokenUnitMinted.returnValues.unitId, 10);
  }

  public async sellUnit(tokenId: number, unitId: number): Promise<void> {
    return this.contract.methods.unitSold(tokenId, unitId).send({ from: this.authStore.account.address, gasLimit: 300000, gas: 300000 });
  }
}
