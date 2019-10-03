
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import {App} from "ionic-angular";
@Injectable()
export class MessageProvider {

  constructor(public alertCtrl: AlertController,public app: App) {

  }
  showMessage(title:string,message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      enableBackdropDismiss: false,
      buttons: ['Ok']
    });
    alert.present();
  }
  showMessageButton(title:string,message: string, object:any) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      enableBackdropDismiss: false,
      buttons: object
    });
    alert.present();
  }
  showMessagePop(title:string,message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      enableBackdropDismiss: false,
      buttons: [
      {
          text: 'Ok',
          handler: () => {
            let nav = this.app.getActiveNav();
            nav.pop();
          }
        }
      ]
    });
    
    alert.present();
  }
}
