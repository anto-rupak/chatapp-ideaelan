import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ToastController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { MessageProvider } from '../../providers/message/message';
import * as moment from 'moment';
import { ActionSheetController } from 'ionic-angular';
import { MessagePage } from '../message/message';
/**
 * Generated class for the AllsuppliesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-allsupplies',
  templateUrl: 'allsupplies.html',
})
export class AllsuppliesPage {
  roleType: any;
  public startDate;
  public endDate;
  title: any;
  orderByUserId: any;
  appUrl: any;
  userJson: any;
  userSuppliesJson: any;
  SupStatus: boolean;
  constructor( public actionctrl: ActionSheetController,public message: MessageProvider, public navCtrl: NavController, public storage: Storage, public navParams: NavParams, public loading: LoadingController, public http: HttpClient, public alertCtrl: AlertController) {
    this.startDate = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString();
    this.startDate = moment(this.startDate).format('YYYY-MM-DD');
    //new Date(new Date().setDate(new Date().getDate() + 7)).toISOString();
    this.endDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();
    this.endDate = moment(this.endDate).format('YYYY-MM-DD');
    this.SupStatus = false;
  }


  ionViewDidLoad() {

    this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.orderByUserId = this.appUrl + '/WS/IdeaElanService.svc/GetOrdersByUserId';


    });
    this.storage.get('userDetails').then((val1) => {
      this.userJson = val1;
    });
    this.storage.get('roleType').then((role) => {
      this.roleType = role;
      if (this.roleType === "user" || this.roleType === "labAdmin") {
        this.title = "My Supplies";
      } else {
        this.title = "All Supplies";
      }

    });
  }

  ionViewDidEnter() {


    this.storage.get('userDetails').then((val1) => {
      this.userJson = val1;
      if (this.userJson.UserId == "" || this.userJson.UserId == null) {
      } else {

        this.sendSuppliesRequest();

      }
    });

  }
  startdatetime(event) {
    if (this.startDate > this.endDate) {
      this.startDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();
      this.startDate = moment(this.startDate).format('YYYY-MM-DD');
      this.message.showMessage('Alert', "Start date cannot be after End Date.")
      return false
    }
  }
  enddatetime(event) {
    this.startDate = moment(this.startDate).format('YYYY-MM-DD');

    this.endDate = moment(this.endDate).format('YYYY-MM-DD');
    if (!moment(this.endDate).isAfter(this.startDate)) {
      this.endDate = new Date(new Date().setDate(new Date().getDate() + 30)).toISOString();
      this.endDate = moment(this.endDate).format('YYYY-MM-DD');
      this.message.showMessage('Alert', "Selected date cannot be before to start date.")
    }

    //this.endDate = moment(this.navParams.get("endDate")).toISOString(true);
  }
  detailpage(data) {

 
    if(this.roleType=="user")
    { 
 if(this.roleType=="user")
 {
   if(this.userJson.UserId!=data.UserId)
   {
     this.showdetail(data);
     return;
   }
   if( data.Status=="Cancelled"|| data.Status=="Completed"){
    this.showdetail(data);
    return;
   }
 }
    
     let actionSheet = this.actionctrl.create({
       title: 'Select Options',
       cssClass: 'myPage',
       buttons: [
         {
           //updated by Abey Abraham
           text: 'Chat',
           role: 'destructive',
           cssClass: 'myActionSheetBtnStyle',
           handler: () => {
           //  this.logs.insertlog("View Issues ", "Facility Dashboard Page", "click event of card content", "User clicked the issues displayed in cards for viewing details  ", this.userJson.UserId);
     //this.navCtrl.push('DashboarddetailPage', { "dashboardTicketDetail": instrument ,"userId":this.userJson.UserId});
     if(this.roleType=="user"){
       this.navCtrl.push(MessagePage, {"OrderId":`${data.OrderId}`,"id":"user","ProviderId":`${data.ProviderId}`,"source":`Order Number : ${data.OrderNumber}`,"chatType":`SuppliesOrder`});
     }
   // else if(this.roleType=="providerAdmin"){
       //this.navCtrl.push(MessagePage, {"OrderId":`${data.OrderId}`,"id":"providerAdmin","ProviderId":`${data.ProviderId}`,"source":`Order Number : ${data.OrderNumber}`,"chatType":`SuppliesOrder`});
     //}
           }
         },
         {
           text: 'Details',
           role: 'destructive',
           cssClass: 'myActionSheetBtnStyle',
           handler: () => {
            this.navCtrl.push("SuppliesDetailPage", {
              "orderid": data.OrderId,
            })
           }
         },
       ]
     })
     actionSheet.present();
   }else{
     
    this.showdetail(data);
   }
  
  
  
  }
  showdetail(data)
  { let actionSheet = this.actionctrl.create({
    title: 'Select Options',
    cssClass: 'myPage',
    buttons: [
      {
       
        text: 'Details',
        role: 'destructive',
        cssClass: 'myActionSheetBtnStyle',
        handler: () => {
          this.navCtrl.push("SuppliesDetailPage", {
            "orderid": data.OrderId,
          })
        }
      },
    ]
  })
  actionSheet.present();
return;
}

  sendSuppliesRequest() {

    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    loader.present();
    /*
    userid:this.userJson.UserId,
      orderstatusid:0,
      fromdate:this.startDate,
      enddate:this.endDate
    */

    this.http.get(this.orderByUserId + "/" + this.userJson.UserId + ",0," + this.startDate + "," + this.endDate
    )
      .subscribe(
        (data: any) => {
          //RESPONSE
          this.SupStatus = true;
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.userSuppliesJson = resJSON;
          console.log("response",resJSON)
          //this.userReservtionJson=resJSON;
          //this.appid=resJSON[0].AppointmentId;
          //this.sdate=resJSON[0].strStartTime;
          // this.edate=resJSON[0].strEndTime;
          //this.resourscename=resJSON[0].ResourceName;
          // this.resid=resJSON[0].ResourceId;
          loader.dismiss();

          /*
                   if(status.match("cancel")){
                    let alert = this.alertCtrl.create({
                      title: 'Message',
                      subTitle: 'Appointment cancelled Successfully',
                      buttons: ['Dismiss']
                    });
                    alert.present();
                   }
                  // loader.dismiss();
                   */
        },//ERROR HANDLING
        error => {

          loader.dismiss();

          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);
          this.SupStatus = true;
          if (resErrJSON.status == 400) {

          }

        }
      );
  }
}