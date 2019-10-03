/* Modified by Abey Abraham */
import { Component } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams } from 'ionic-angular';
import { FcmProvider } from '../../providers/fcm/fcm';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import {  ActivitylogsProvider} from '../../providers/activitylogs/activitylogs';

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  tok: string;

  appUrl: string;
  getNotificationUrl: string;
  insertUpdateNotificationAppUrl: string;
  userJson: any;
  userType:boolean;
  UpdateNotificationJson: any;
  notificationJson: any;
  notifytog: boolean = true;
  tokenuser:string;
  idUser:string;
  getUserDeviceDetailsUrl: string;

  constructor(public logs : ActivitylogsProvider,public navCtrl: NavController, public loading: LoadingController, public navParams: NavParams, public storage: Storage,
    fcm: FcmProvider, public http: HttpClient) {
       
  }

  async ionViewDidLoad() {
    this.storage.get('appLink').then((val) => {
      this.appUrl = val;

      this.insertUpdateNotificationAppUrl = this.appUrl + '/WS/IdeaElanService.svc/InsertUpdateNotificationsMobileApp';
      this.getUserDeviceDetailsUrl = this.appUrl + '/WS/IdeaElanService.svc/GetUserDeviceDetails';
      this.getNotificationUrl = this.appUrl + '/WS/IdeaElanService.svc/GetMobielAppNotifications/All,';

      
    });
     this.storage.get('userDetails').then((val1) => {
      this.userJson = val1;
      
    });
    
     this.storage.get('roleType').then((val) => {
      
      if(val=="user" || val=="labAdmin"){
       this.userType=true;
       
      }else if(val=="super" || val=="admin" || val=="providerAdmin" ){
       this.userType=false;
       
      }
      else{
        
      }});
 
  }
  ionViewDidEnter(){
    this.storage.get('userDetails').then((val1) => {
      this.getMobileAppNotification();
      
    });
   
  }
  getMobileAppNotification() {
    var notification = this.getNotificationUrl+this.userJson.UserToken+","+this.userJson.UserId;
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . ."
    
    });
    loader.present();

    //SEDNING REQUEST
    this.http.get(notification)
      .subscribe(
        (data: any) => {
          //RESPONSE
      
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.notificationJson = resJSON;

       
          loader.dismiss();


        },//ERROR HANDLING
        error => {

          loader.dismiss();

          let resErr = JSON.stringify(error);
         

        }
      );
  }

  updateNotificationApp(usernotificationid, notificationid, notificationvalue, isactive) {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading. . . "
    });
    loader.present();
   
   
    this.http.post(this.insertUpdateNotificationAppUrl, {
      usernotificationid: usernotificationid,
      notificationid: notificationid,
      notificationvalue: notificationvalue,
      isactive: isactive,
      usertoken: this.userJson.UserToken,
      userid: this.userJson.UserId
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
        
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.UpdateNotificationJson = resJSON;
          
          this.logs.insertlog("Notification Dashboard ","Notifications","changed status of notification  ","User changed status of notification through toggle button  ",this.userJson.UserId);
          loader.dismiss();

        },//ERROR HANDLING
        error => {

          loader.dismiss();
        
        }
      );
  }

 



}
