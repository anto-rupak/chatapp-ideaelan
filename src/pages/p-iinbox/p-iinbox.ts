/*
Done by Abey Abraham
*/
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime ,Slides} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { InboxviewPage } from '../inboxview/inboxview';
import * as moment from 'moment';
import { NotificationProvider } from '../../providers/notification/notification';
import {  ActivitylogsProvider} from '../../providers/activitylogs/activitylogs';

/**
 * Generated class for the PIinboxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-p-iinbox',
  templateUrl: 'p-iinbox.html',
})
export class PIinboxPage {
  @ViewChild('slider') slider: Slides;
  public dateTime: Date;
  data: Observable<any>;

  event = { startDate: "", endDate: "" };
  page = "0";
  appUrl: string;
  getLabUrl: string;
  getLabAccessUrl: string;
  updateLabUrl: string;
  userJson: any;
  userLabJson: any;
  labid: string;
  labname: string;
  providerid: string;
  loggedinuser: string;
  userLabAccessJson: any;
  labStatus: boolean;
  emptyString: boolean;
  emptyDropdown: boolean;
  checkStatus: string;
  labUpdateJson: any;
  getInvoiceUrl: string;
  getInvoiceDetailsUrl: string;
  updateInvoiceUrl: string;
  userInvoiceJson: any;
  invoiceStatus: boolean;
  InvoiceUpdateJson: any;
  getUserDeviceDetailsUrl: string;
  sendPushNotificationUrl: string;
  invoiceno: string;
  spinnerPiIndex:number;
  startDate:any;
  endDate:any;
  userSuppliesJson:any;
  SupStatus:boolean;
  GetOrderByLabAndDates:any;
  pageSelected: number;
  constructor(public logs : ActivitylogsProvider,public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public storage: Storage,
    public loading: LoadingController, public http: HttpClient, public platform: Platform, private alertCtrl: AlertController,
    public actionctrl: ActionSheetController, public notification: NotificationProvider) {
    this.event.startDate = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString();
    this.event.endDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();
    //this.startDate=new Date(new Date().setDate(new Date().getDate())).toISOString();
    //this.startDate= moment(this.startDate).format('YYYY-MM-DD');
      //new Date(new Date().setDate(new Date().getDate() + 7)).toISOString();
   //   this.endDate = new Date(new Date().setDate(new Date().getDate() + 30)).toISOString();
     // this.endDate= moment(this.endDate).format('YYYY-MM-DD');
  
  }

  ionViewDidLoad() {
    this.pageSelected = 0;
    this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.getLabUrl = this.appUrl + '/WS/IdeaElanService.svc/GetLabsUserIsAdmin';
      this.getLabAccessUrl = this.appUrl + '/WS/IdeaElanService.svc/GetLabAccessRequest';
      this.updateLabUrl = this.appUrl + '/WS/IdeaElanService.svc/UpdateLabRequestStatus';
      this.getInvoiceUrl = this.appUrl + '/WS/IdeaElanService.svc/GetAllInvoices';
      this.getInvoiceDetailsUrl = this.appUrl + '/WS/IdeaElanService.svc/GetInvoiceDetailsByInvoiceId';
      this.updateInvoiceUrl = this.appUrl + '/WS/IdeaElanService.svc/UpdateInvoicePaymentStatus';
      this.getUserDeviceDetailsUrl = this.appUrl + '/WS/IdeaElanService.svc/GetUserDeviceDetails';
      this.sendPushNotificationUrl = this.appUrl + '/WS/IdeaElanService.svc/SendPushMessageToTokens';
      this.GetOrderByLabAndDates=this.appUrl + '/WS/IdeaElanService.svc/GetOrderByLabAndDates';

    });
    this.storage.get('userDetails').then((val1) => {
      this.userJson = val1;
      
    });
   
  }

  ionViewDidEnter() {
    this.storage.get('spinnerPiInbox').then((val) =>{
      this.spinnerPiIndex=Number(val);
   });
    this.storage.get('userDetails').then((val1) => {
      this.userJson = val1;


      if (this.userJson.UserId == "" || this.userJson.UserId == null) {

      } else {
        this.sendLabRequest();
        
       
      }
    });


  }
  labRequestButton(){
    this.logs.insertlog("Invoice Module  ","PI Inbox page","clicked go button ","User clicked go button after selecting the startdate and end date  ",this.userJson.UserId);
      this.sendLabRequest();
   
  }
  
  sendLabRequest() {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    loader.present();

    this.http.post(this.getLabUrl, {
      userid: this.userJson.UserId,
      usertoken: this.userJson.UserToken,
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.userLabJson = resJSON;
          this.labid = resJSON[this.spinnerPiIndex].GroupId;
          this.labname = resJSON[this.spinnerPiIndex].GroupName;

          this.emptyDropdown = false;
          loader.present().then(() => {
            return this.sendLabAccessRequest(this.labid);
          }).then(() => {
            return this.sendInvoiceRequest(this.labid);
          }).then(() => { loader.dismiss() })


        },//ERROR HANDLING
        error => {

          loader.dismiss();
          this.emptyDropdown = true;

        }
      );
  }


  sendLabAccessRequest(groupId: string) {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    //  loader.present();

    this.http.post(this.getLabAccessUrl, {
      userid: this.userJson.UserId,
      labid: groupId,
      usertoken: this.userJson.UserToken
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
          this.labStatus = true;
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.emptyString = false;
          this.userLabAccessJson = resJSON;

         
        },//ERROR HANDLING
        error => {

          loader.dismiss();
          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);
          this.emptyString = true;
          if (resErrJSON.status == 400) {

            this.checkStatus = "400";
            this.labStatus = false;
            // this.toast(resErrJSON.statusText);
          }

        }
      );
  }


  actionSheetMethod(actionJson: any) {
    let actionSheet = this.actionctrl.create({
      title: 'Select Options',
      cssClass: 'myPage',
      buttons: [
        {
          //updated by Abey Abraham
          text: 'Approve',
          role: 'destructive',
          cssClass: 'myActionSheetBtnStyle',
          handler: () => {
            this.updateLabRequest(this.labid, "-1", actionJson.UserId);

            this.notification.getUserDeviceDetails("user", actionJson.UserId, "LARS", `Request to access ${this.labname} has been approved`, "Lab Access Request");
          }
        },
        {
          text: 'Reject',
          role: 'destructive',
          cssClass: 'myActionSheetBtnStyle',
          handler: () => {
            this.updateLabRequest(this.labid, "-2", actionJson.UserId);
            this.notification.getUserDeviceDetails("user", actionJson.UserId, "LARS", `Request to access ${this.labname} has been rejected`, "Lab Access Request");
          }
        },
      ]
    })
    actionSheet.present();
  }

  updateLabRequest(groupID: string, status: string, userid: string) {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    // loader.present();

    this.http.post(this.updateLabUrl, {
      labid: groupID,
      userid: userid,
      status: status,
      user: this.userJson.EmailAddress
    })
      .subscribe(
        (data: any) => {
          //RESPONSE

          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.labUpdateJson = resJSON;


          // loader.dismiss();

          this.sendLabAccessRequest(this.labid);

          let alert = this.alertCtrl.create({
            title: 'Message',
            subTitle: 'Status Updated Successfully!',
            buttons: ['OK']
          });
          alert.present();
         
        },//ERROR HANDLING
        error => {

          loader.dismiss();

        }
      );
  }

  sendInvoiceRequest(groupId: string) {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
 
    this.http.post(this.getInvoiceUrl, {
      providerid: "0",
      labid: groupId,
      start: this.event.startDate,
      end: this.event.endDate,
      loggedinuser: this.userJson.UserId,
      usertoken: this.userJson.UserToken,
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
          this.invoiceStatus = true;
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.emptyString = false;
          this.userInvoiceJson = resJSON;
          
          if(this.userInvoiceJson.TotalAmount==null){
            this.userInvoiceJson.TotalAmount=0.00;
          }
          this.invoiceno = resJSON[0].InvoiceNumber;
          // this.updateFacilityRequest(this.facilityid);
        },//ERROR HANDLING
        error => {
          loader.dismiss();
          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);

          if (resErrJSON.status == 400) {
            this.emptyString = true;
            this.checkStatus = "400";
            this.invoiceStatus = false;
            // this.toast(resErrJSON.statusText);
          }

        }
      );
  }

  invoiceRequest(actionJson: any) {
    let resErr = JSON.stringify(actionJson);
    let resErrJSON = JSON.parse(resErr);
    if (resErrJSON.Status === "Dispatched" || resErrJSON.Status === "Reviewed" || resErrJSON.Status === "In Review") {

      let actionSheet = this.actionctrl.create({
        title: 'Select Option',
        buttons: [
          {
            text: 'View',
            role: 'destructive',
            handler: () => {
              this.logs.insertlog("Invoice Module ","PI Inbox page","clicked on view option of Actionsheet after clicking on invoice list","User selected view option of actionsheet after clicking on the invoice list cards ",this.userJson.UserId);
              this.navCtrl.push(InboxviewPage, { "invoicUserJson": actionJson, "labId": this.labid });
            }
          },
          {
            //updated by abey abraham
            text: 'Approve',
            role: 'destructive',
            handler: () => {
              this.logs.insertlog("Invoice Module ","PI Inbox page","clicked on view option of Actionsheet after clicking on invoice list","User selected view option of actionsheet after clicking on the invoice list cards ",this.userJson.UserId);
              this.notification.getUserDeviceDetails("facilityadmin", actionJson.ProviderId, "INV", ` invoice number : ${this.invoiceno} has been approved `, "Invoice approved");
              this.updateInvoiceRequest(actionJson.InvoiceId, "Approved", this.labid);

            }
          },
        ]
      })
      actionSheet.present();
    }
    else if (resErrJSON.Status === "Approved" || resErrJSON.Status === "Payment Received (Partially)" ) {


      let actionSheet = this.actionctrl.create({
        title: 'Select Option',
        buttons: [
          {
            text: 'View',
            role: 'destructive',
            handler: () => {
              this.navCtrl.push(InboxviewPage, {
                "invoicUserJson": actionJson, "labId": this.labid
              });
            }
          },
        ]
      })
      actionSheet.present();
    }
  }

  updateInvoiceRequest(invoiceid: string, status: string, groupId: string) {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    // loader.present();

    this.http.post(this.updateInvoiceUrl, {
      invoiceid: invoiceid,
      status: status,
      paiddate: moment().format("MM/DD/YYYY"),
      labid: groupId,
      user: this.userJson.EmailAddress,
      note: ""
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.InvoiceUpdateJson = resJSON;
          this.notification.getUserDeviceDetails("facilityadmin", "0", "INV", `Invoice Number : ${this.invoiceno} has been approved`, "Invoice Approved");
          // loader.dismiss();

          let alert = this.alertCtrl.create({
            title: 'Message',
            subTitle: 'Status Updated Successfully!',
            buttons: ['OK']
          });
          alert.present();
          this.sendInvoiceRequest(this.labid);

        },//ERROR HANDLING
        error => {

          loader.dismiss();
         
 
        }
      );
  }
  toast(toastStr: string) {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      message: toastStr,
      buttons: ['Ok']
    });
    alert.present();
  }


  updateChange() {
    this.labid;
    this.sendLabAccessRequest(this.labid);
    this.sendInvoiceRequest(this.labid);
    this.sendSuppliesRequest(this.labid)
    this.spinnerPiIndex=0;
    for(var i=0;i<this.userLabJson.length;i++){
      this.storage.set('spinnerPiInbox', this.spinnerPiIndex);
      
     if(this.labid==this.userLabJson[i].GroupId){
       break;
     }
     this.spinnerPiIndex++;
  }
    //this. sendFacilitiesRequest();
  }



   startdatetime(event) {
  
    if (this.event.startDate > this.event.endDate) {
  
      this.event.startDate = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString();

      this.showAlert("Start date cannot be after End Date.")
       return false
    }
  }
  showAlert(eventdata) {
    const alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: eventdata,
      buttons: ['Ok']
    });
    alert.present();
  }
  enddatetime(event) {
    this.event.startDate = moment(this.event.startDate).toISOString(true)
    this.event.endDate = moment(this.event.endDate).toISOString(true);
    if (!moment( this.event.endDate).isAfter(this.event.startDate) ) {
      this.event.endDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();
      this.showAlert("Selected date cannot be before to start date.")
    }
    
  }
  
  sendSuppliesRequest(groupId: string){
    this.startDate= moment(this.event.startDate).format('YYYY-MM-DD');
    this.endDate= moment(this.event.endDate).format('YYYY-MM-DD');
    
    
    this.http.get(this.GetOrderByLabAndDates+"/"+groupId+",0,"+this.startDate+","+this.endDate
     )
    .subscribe(
      (data:any) => {
        //RESPONSE
        this.SupStatus=true;
         let resSTR = JSON.stringify(data);
         let resJSON = JSON.parse(resSTR);
         this.userSuppliesJson=resJSON;
         //this.userReservtionJson=resJSON;
         //this.appid=resJSON[0].AppointmentId;
         //this.sdate=resJSON[0].strStartTime;
        // this.edate=resJSON[0].strEndTime;
         //this.resourscename=resJSON[0].ResourceName;
        // this.resid=resJSON[0].ResourceId;
       //  loader.dismiss();


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
  
         //loader.dismiss();
     
         let resErr = JSON.stringify(error);
         let resErrJSON = JSON.parse(resErr);
         this.SupStatus=true;
         if(resErrJSON.status == 400){
         
         }
       
      }
    );
  }
  detailpage(data)
  {
    
    this.navCtrl.push("SuppliesDetailPage",{
      "orderid": data,
      "piinbox":true
    })
  }
  selectedTab(ind) {
    this.slider.slideTo(ind);
  }
  moveButton($event) {
    this.page = $event._snapIndex.toString();
    switch (this.page) {
      case '0':
        this.pageSelected = 0;
        break;
      case '1':
        this.pageSelected = 1;
        break;
      case '2':
        this.pageSelected = 2;

        break;
      default:

    }
  }
}
