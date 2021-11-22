import {Component, OnInit} from '@angular/core';
import {Web3Service} from './core/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private web3Service: Web3Service) {}

  ngOnInit() {
    this.web3Service.init();
  }
}
