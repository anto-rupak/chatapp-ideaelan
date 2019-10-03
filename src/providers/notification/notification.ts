import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {

  userJson: any;
  appUrl: string;
  getUserDeviceDetailsUrl: string;
  sendPushNotificationUrl: string;

  constructor(public http: HttpClient, public storage: Storage,public loading: LoadingController,public toastCtrl: ToastController, ) {
   
    this.storage.get('appLink').then((val) => {
    this.appUrl = val;
    this.getUserDeviceDetailsUrl = this.appUrl + '/WS/IdeaElanService.svc/GetUserDeviceDetails';
    this.sendPushNotificationUrl = this.appUrl + '/WS/IdeaElanService.svc/SendPushMessageToTokens';
  });
  this.storage.get('userDetails').then((val1) => {
    this.userJson = val1;
  });
  this.storage.get('userType').then((val) => {
 
   });
  }



  getUserDeviceDetails(name, value, type, msg, title) {
  
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . ."
    });
   // loader.present();

    //SEDNING REQUEST
    this.http.post(this.getUserDeviceDetailsUrl, {
      paramname: name,
      paramvalue: value,
      notificationtype: type,
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
       
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.sendPushNotification(resJSON, msg, title)

          
        //  loader.dismiss();


        },//ERROR HANDLING
        error => {

          loader.dismiss();
   
          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);
     
        }
      );
  }

  sendPushNotification(details, msg, title) {
   
    //SEDNING REQUEST
    // console.log("user details",this.f)
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . ."
    });
  //  loader.present();

    //SEDNING REQUEST
    this.http.post(this.sendPushNotificationUrl, {
      msg: msg,
      title: title,
      token: details,
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
      
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          //   this.notificationJson=resJSON;

          
         // loader.dismiss();


        },//ERROR HANDLING
        error => {

         // loader.dismiss();
     
          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);
          
        }
      );
  }


}
