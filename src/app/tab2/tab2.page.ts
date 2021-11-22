import { Component } from '@angular/core';
import {SmartContractService} from '../core/smart-contract.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private smartContract: SmartContractService) {}

  async mintUnit() {
    await this.smartContract.createTokenUnit(1, '0x00');
  }

}
