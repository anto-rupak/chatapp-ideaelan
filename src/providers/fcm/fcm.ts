//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';
//import { AngularFirestore } from 'angularfire2/firestore';
import { AlertController } from 'ionic-angular';
/*
  Generated class for the FcmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class FcmProvider {

  constructor(public firebaseNative: Firebase,
    //public afs: AngularFirestore,
    private platform: Platform,private alertCtrl:AlertController) {
 
  }
  
  async getToken() {

    let token;
  
   if (this.platform.is('android')) {
      token = await this.firebaseNative.getToken();
      
    } 
  
    if (this.platform.is('ios')) {
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    } 
    
    return token;
  }
 onTokenRefresh() {

    let token;
  
   if (this.platform.is('android')) {
      token = this.firebaseNative.onTokenRefresh();
     
    } 
  
    if (this.platform.is('ios')) {
      token =  this.firebaseNative.onTokenRefresh();
      this.firebaseNative.grantPermission();
    } 
    
    return token;
  }
  

  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen()
  }
  alert(toastStr: string) {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      message: toastStr,
      buttons: ['OK']
    });
    alert.present();
  }
}
