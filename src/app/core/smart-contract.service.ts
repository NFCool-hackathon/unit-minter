import { Injectable } from '@angular/core';
import Web3 from 'web3';

// @ts-ignore
import contractABI from '../../assets/abi/NFCool.json';
import {environment} from '../../environments/environment';

import * as keccak256 from 'keccak256';
import {Web3Service} from './web3.service';

@Injectable({
  providedIn: 'root'
})
export class SmartContractService {
  private contract = new this.web3.eth.Contract(contractABI.abi, environment.contractAddress);

  constructor(private web3: Web3,
              private web3Service: Web3Service) {
  }

  public async isMinter(account: string) {
    return await this.contract.methods.hasRole(keccak256('MINTER_ROLE'), account).call();
  }

  public async createTokenUnit(tokenId: number, nfcId: string) {
    // eslint-disable-next-line max-len
    await this.contract.methods.mintTokenUnit(tokenId, nfcId, this.web3.utils.fromAscii('')).send({ from: this.web3Service.getAccountAddress(), gasLimit: 300000, gas: 300000 });
  }
}
