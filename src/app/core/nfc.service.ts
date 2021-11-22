import { Injectable } from '@angular/core';
import {Ndef, NFC} from '@ionic-native/nfc/ngx';

@Injectable({
  providedIn: 'root'
})
export class NfcService {

  constructor(private nfc: NFC, private ndef: Ndef) { }

  public async readTagAndroid(): Promise<any> {
    return new Promise((resolve) => {
      const flags = this.nfc.FLAG_READER_NFC_A || this.nfc.FLAG_READER_NFC_V;
      const readerMode$ = this.nfc.readerMode(flags).subscribe(
        tag => {
          console.log(JSON.stringify(tag));
          setTimeout(() => {
            readerMode$.unsubscribe();
          },1000);
          resolve(tag);
        },
        err => console.error('Error reading tag', err)
      );
    });
  }

  public async writeAndLockTagAndroid(uri: string): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log('DEBUG LISTENING TO TAG EVENTS');
      const writerMode$ = this.nfc.addNdefListener().subscribe(nfcEvent => {
        console.log(JSON.stringify(nfcEvent));
        const message = [
          this.ndef.uriRecord(uri)
        ];
        this.nfc.write(message)
          .then(() => {
            this.nfc.makeReadOnly()
              .then(() => {
                writerMode$.unsubscribe();
                resolve();
              }).catch(err => {
              console.error('Error locking tag', err);
              writerMode$.unsubscribe();
              reject(err);
            });
            resolve();
          }).catch(err => {
          console.error('Error writing tag', err);
          writerMode$.unsubscribe();
          reject(err);
        });
      });
    });
  }


  public async lockNFC(): Promise<void> {
    return new Promise((resolve, reject) => {
      const lockMode$ = this.nfc.addNdefListener().subscribe(() => {
        this.nfc.makeReadOnly()
          .then(() => {
            lockMode$.unsubscribe();
            resolve();
          }).catch(err => {
          console.error('Error locking tag', err);
          lockMode$.unsubscribe();
          reject(err);
        });
      });
    });
  }

}
