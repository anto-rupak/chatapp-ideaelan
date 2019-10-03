import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';
import { ActivitylogsProvider } from '../../providers/activitylogs/activitylogs';
//Created by Anto Rupak

@IonicPage()
@Component({
  selector: 'page-facilities',
  templateUrl: 'facilities.html',
})
export class FacilitiesPage {
  userFacilitiesJson: any;
  appUrl: string;
  facilitylist: string;
  getFacilitiesAccessUrl: string;
  getFacilitiesUrl: string;
  userJson: any;
  FacilityUpdateJson: string;
  facilityname: string;
  getUserDeviceDetailsUrl: string;
  sendPushNotificationUrl: string;
  groupid: string;
  facilityJson: any
  searchText: any;
  constructor(public logs: ActivitylogsProvider, public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, public storage: Storage,
    public loading: LoadingController, public http: HttpClient, private alertCtrl: AlertController, public notification: NotificationProvider) {
   
  }

  ionViewDidLoad() {
    this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.getFacilitiesUrl = this.appUrl + '/WS/IdeaElanService.svc/GetAllFacilities';
      this.getFacilitiesAccessUrl = this.appUrl + '/WS/IdeaElanService.svc/InsertFacilityAccessRequest';
      this.getUserDeviceDetailsUrl = this.appUrl + '/WS/IdeaElanService.svc/GetUserDeviceDetails';
      this.sendPushNotificationUrl = this.appUrl + '/WS/IdeaElanService.svc/SendPushMessageToTokens'

    });
    this.storage.get('userDetails').then((val1) => {
      this.userJson = val1;

    });


  }
  ionViewDidEnter() {

    this.storage.get('userDetails').then((val1) => {
      this.userJson = val1;


      if (this.userJson.UserId == "" || this.userJson.UserId == null) {

      } else {
        this.sendFacilitiesRequest();
        this.logs.insertlog("Facilities", "Menu Page", "Facilities Menu ", "User clicked Facilities part in the menu page", this.userJson.UserId);
      }
    });
  }

  sendFacilitiesRequest() {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    loader.present();

    this.http.post(this.getFacilitiesUrl, {
      userid: this.userJson.UserId,
      usertoken: this.userJson.UserToken,
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.userFacilitiesJson = resJSON;
          this.facilityJson = resJSON;
          loader.dismiss();
        },//ERROR HANDLING
        error => {

          loader.dismiss();
     


        }
      );
  }
  actionSheetMethod(actionJson: any) {
    let alert = this.alertCtrl.create({
      title: 'Request Access',
      message: 'Are you sure you want to request access to &nbsp' + actionJson.GroupName + " " + 'facility',
      buttons: [
        {//updated by abey abraham
          text:'OK',
          role:'destructive',
          handler:() =>{
           this.updateFacilityRequest(actionJson.GroupId);
           this.facilityname= actionJson.GroupName
           this.groupid=actionJson.GroupId
           this.notification.getUserDeviceDetails("facilityadmin",actionJson.GroupId,"FAR",`${this.userJson.LastName} ${this.userJson.FirstName} requested access for  ${this.facilityname}`,"Facility Access Request");
           this.logs.insertlog("Facilities","Facilities Page","Facilities Page ",`User clicked Request Access for ${actionJson.GroupId}in the Facilities Page`,this.userJson.UserId);
   
          }
        },
        {
          text: 'Cancel',
          role: 'destructive',
          handler: () => {

          }
        },
      ]
    })
    alert.present();
  }

  //TOAST METHOD
  toast(toastStr: string) {
    let toast = this.toastCtrl.create({
      message: toastStr,
      duration: 2000
    });
    toast.present();
  }

  updateFacilityRequest(labId: string) {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    loader.present();

    this.http.post(this.getFacilitiesAccessUrl, {
      userid: this.userJson.UserId,
      facilityid: labId,
      user: this.userJson.LastName,
      isactive: "-1"
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
          
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.FacilityUpdateJson = resJSON;
          //this.getUserDeviceDetails(labId);

          if (resJSON == "Success") {
         
          }
          loader.dismiss();
          this.sendFacilitiesRequest();

        },//ERROR HANDLING
        error => {

          loader.dismiss();

          let resErr = JSON.stringify(error);
        

        }
      );
  }
  doRefresh(refresher) {
    this.searchText = ""
    this.sendFacilitiesRequest();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }



  getItems(searchbar) {
    let val = searchbar.target.value;
    var q = this.searchText
   
    if (!q) {
      this.sendFacilitiesRequest()
      return true;
    }

    this.userFacilitiesJson = this.facilityJson.filter((v) => {
      if (v.GroupName && q) {
        if (v.GroupName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

}






