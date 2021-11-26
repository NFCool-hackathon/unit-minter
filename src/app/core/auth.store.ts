import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  public accountSubject = new Subject<string>();
  public account;

  public isSeller = false;
  public isSupplier = false;

  public isSellerSubject = new Subject<boolean>();
  public isSupplierSubject = new Subject<boolean>();

  constructor() {
  }
}
