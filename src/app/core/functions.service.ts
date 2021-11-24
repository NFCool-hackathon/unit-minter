import { Injectable } from '@angular/core';
import {AngularFireFunctions} from '@angular/fire/compat/functions';
import {serverKey} from '../../../keys.env';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(private cloudFunctions: AngularFireFunctions) { }

  public async setPhoneNumber(tokenId: number, unitId: number, phoneNumber: string) {
    return new Promise<void>((resolve, reject) => {
      const callable = this.cloudFunctions.httpsCallable('setPhoneNumber');
      const obs = callable({tokenId, unitId, phoneNumber, key: serverKey});

      obs.subscribe(() => {
        resolve();
      }, error => {
        console.error(error);
        reject(error);
      });
    });
  }
}
