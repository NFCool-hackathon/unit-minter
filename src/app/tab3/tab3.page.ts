import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  privateKey = '';

  constructor() {}

  change(e: CustomEvent) {
    this.privateKey = e.detail.value;
  }

}
