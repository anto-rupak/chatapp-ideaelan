import { InboxsuppliesdetailsPage } from './../inboxsuppliesdetails/inboxsuppliesdetails';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, DateTime } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { AlertController,ActionSheetController } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { NotificationProvider } from '../../providers/notification/notification';
import { SampledetailPage } from '../sampledetail/sampledetail';
import {  ActivitylogsProvider} from '../../providers/activitylogs/activitylogs';
import { MessagePage } from '../message/message';
import * as moment from 'moment';
@IonicPage()
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {
  @ViewChild('slider') slider: Slides;
  page = "0";
  public dateTime: Date;
  data: Observable<any>;

  event = { startDate: "", endDate: "" };
  sample_event = { startDate: "", endDate: "" };
  supplies_event = { startDate: "", endDate: "" };
  isEnter:boolean;
  permissionid: string;
  resourceid: string;
  user: string;
  isapproved: string;
  InstrumentUpdateJson: any;
  appUrl: string;
  facilityid: string;
  getFacilitiesUrl: string;
  updateFacilitiesUrl: string;
  userJson: any;
  getInstrumentAccessUrl: string;
  insertInstrumentUrl: string;
  getFacilitiesAccessUrl: string;
  userFacilitiesAccessJson: any;
  suppliesJson:any;
  userDetailsJson: any;
  userType: boolean;
  favoriteItem: string;
  result: any = [];
  spinnerIndex: number;
  checkStatus: string;
  userInstrumentJson: any;
  getInstrumentUrl: string;
  FacilityUpdateJson: string;
  getReservationRequestUrl: string;
  ReservationRequestJson: any;
  updateAppointmentStatusUrl: string;
  AppointmentStatusUpdateJson: any;
  starttime: DateTime;
  endtime: DateTime;
  EmailAddress: string;
  updateAppointment: string;
  usermail: string;
  reservStatus: boolean;
  instStatus: boolean;
  facStatus: boolean;
  suppliesValue:boolean;
  getUserDeviceDetailsUrl: string;
  sendPushNotificationUrl: string;
  suppliedRequestUrl:string;
  notify: any;
  facility: any;
  userFacilitiesJson: any;
  GroupName: string;
  resourceName: string;
  apptid: string;
  adate: string;
  bdate: string;
  sampleRequestUrl: string
  sampleRequestJson: any;
  sampleStatus: boolean;
  sampleJson: any;
  statusJson: string;
  emptyDropdown: boolean;
  suppliesDetailJson:any;
  pageSelected: number;
  roleType:any;
  pin:any;
  
  constructor(public logs : ActivitylogsProvider,public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, public storage: Storage,
    public loading: LoadingController, public http: HttpClient, public platform: Platform, private alertCtrl: AlertController, public actionctrl: ActionSheetController,
    public notification: NotificationProvider,public datePipe:DatePipe) {

    //this.event.startDate = new Date().toISOString();
    this.event.startDate = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString();
    this.event.endDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();
    this.sample_event.startDate = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString();
    this.sample_event.endDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();
        
    this.supplies_event.startDate =  moment(new Date(new Date().setDate(new Date().getDate() - 30)).toISOString()).format('YYYY-MM-DD');
    this.supplies_event.endDate = moment(new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()).format('YYYY-MM-DD');
    console.log(this.supplies_event.endDate);
  }

  ionViewDidLoad() {
    this.pageSelected = 0;
    this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.getFacilitiesUrl = this.appUrl + '/WS/IdeaElanService.svc/GetFacilitiesUserIsAdmin';
      this.getFacilitiesAccessUrl = this.appUrl + '/WS/IdeaElanService.svc/GetFacilityAccessRequest';
      this.updateFacilitiesUrl = this.appUrl + '/WS/IdeaElanService.svc/UpdateProviderRequestStatus';
      this.getInstrumentAccessUrl = this.appUrl + '/WS/IdeaElanService.svc/GetInstrumentAccessRequest';
      this.insertInstrumentUrl = this.appUrl + '/WS/IdeaElanService.svc/InsertResourcePermission';
      this.getReservationRequestUrl = this.appUrl + '/WS/IdeaElanService.svc/GetReservationRequest';
      this.updateAppointmentStatusUrl = this.appUrl + '/WS/IdeaElanService.svc/UpdateAppointmentStatusByApptId';
      this.getUserDeviceDetailsUrl = this.appUrl + '/WS/IdeaElanService.svc/GetUserDeviceDetails';
      this.sendPushNotificationUrl = this.appUrl + '/WS/IdeaElanService.svc/SendPushMessageToTokens'
      this.sampleRequestUrl = this.appUrl + '/WS/IdeaElanService.svc/GetWorkOrdersByProviderIdByDateRange';
      this.suppliedRequestUrl = this.appUrl + '/WS/IdeaElanService.svc/GetOrderByProviderIdAndDates';

    });
    this.storage.get('userDetails').then((val1) => {
      this.userJson = val1;

    });
    this.storage.get('userDetails').then((val1) => {
      this.userJson = val1;

    });
    this.storage.get('roleType').then((role) => {
      this.roleType = role;
      

    });
    this.storage.get('pin').then((val) => {
      this.pin=val;
             
            });
  }


  ionViewDidEnter() {
   
    this.storage.get('spinnerInbox').then((val) => {
      this.spinnerIndex = Number(val);
    });
    this.storage.get('userDetails').then((val1) => {
      this.userJson = val1;
      if (this.userJson.UserId == "" || this.userJson.UserId == null) {
      } else {

        this.sendFacilitiesRequest();
      
      }
    });
   
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

  sendSampleRequestsButton() {
  


    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . ",
      duration: 3000
    });
    loader.present();
    this.sendSampleRequest();
    loader.dismiss();




  }

  sendFacilityRequestsButton() {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . ",
      duration: 3000
    });
    loader.present();
    this.sendFacilitiesRequest();
    loader.dismiss();
  }

  sendFacilitiesRequest() {
   
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . ",
      duration:3000
    });
    loader.present();
    this.http.post(this.getFacilitiesUrl, {
      userid: this.userJson.UserId,
      usertoken: this.userJson.UserToken,
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
          this.emptyDropdown = false;
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.userFacilitiesJson = resJSON;
          this.facilityid = resJSON[this.spinnerIndex].GroupId;
          this.GroupName = resJSON[this.spinnerIndex].GroupName;
          this.sendFacilityAccessRequest(this.facilityid);
          this.sendInstrumentRequest(this.facilityid);
          this.sendSampleRequest();
          this.sendReservationRequest(this.facilityid);
          this.suppliesRequest();
        
        },//ERROR HANDLING
        error => {

          loader.dismiss();
          this.emptyDropdown = true;
          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);
          if (resErrJSON.status == 400) {


          }

        }
      );
  }


  sendFacilityAccessRequest(groupId: string) {

    this.http.post(this.getFacilitiesAccessUrl, {
      userid: this.userJson.UserId,
      facilityid: groupId,
      usertoken: this.userJson.UserToken,
      isactive: "1"

    })
      .subscribe(
        (data: any) => {
          //RESPONSE
        
          this.facStatus = true;
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);

          this.userFacilitiesAccessJson = resJSON;

         


        },//ERROR HANDLING
        error => {

         

          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);

          if (resErrJSON.status == 400) {

            this.checkStatus = "400";
            this.facStatus = false;
            // this.toast(resErrJSON.statusText);
          }

        }
      );
  }


  actionSheetMethod(actionJson: any) {
  
    let actionSheet = this.actionctrl.create({
      title: 'Select Option',
      cssClass: 'myPage',
      buttons: [
        {
          text: 'Approve',
          role: 'destructive',
          cssClass: 'myActionSheetBtnStyle',
          handler: () => {
           
            this.updateFacilityRequest(actionJson.UserId, this.facilityid, "1");
            this.notification.getUserDeviceDetails("user", actionJson.UserId, "FARS", `Request to access ${this.GroupName} has been approved`, "Facility Access Request");
          }
        },
        {
          text: 'Reject',
          role: 'destructive',
          cssClass: 'myActionSheetBtnStyle',
          handler: () => {
            this.updateFacilityRequest(actionJson.UserId, this.facilityid, "0");
            this.notification.getUserDeviceDetails("user", actionJson.UserId, "FARS", `Request to access ${this.GroupName} has been rejected`, "Facility Access Request");
          }
        },
      ]
    })
    actionSheet.present();
  }

  updateFacilityRequest(userid: string, groupId: string, isactive: string) {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    //  loader.present();

    this.http.post(this.updateFacilitiesUrl, {
      userid: userid,
      facilityid: groupId,
      user: this.userJson.EmailAddress,
      status: isactive
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
         
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.FacilityUpdateJson = resJSON;
         
          // this.notification.getUserDeviceDetails("user",this.userJson.UserId,"FARS","Facility Access has been requested","Facility Access Request");
          // loader.dismiss();

          this.sendFacilityAccessRequest(this.facilityid);
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

  sendInstrumentRequest(groupId: string) {
  

    this.http.post(this.getInstrumentAccessUrl, {
      userid: this.userJson.UserId,
      facilityid: groupId,
      usertoken: this.userJson.UserToken,
      resourceid: "0"

    })
      .subscribe(
        (data: any) => {
          //RESPONSE
        
          this.instStatus = true;
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.userInstrumentJson = resJSON;



        },//ERROR HANDLING
        error => {
     

          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);

          if (resErrJSON.status == 400) {

            this.checkStatus = "400";
            this.instStatus = false;
            //this.toast(resErrJSON.statusText);
          }

        }
      );
  }


  alertRequest(actionJson: any) {
    let actionSheet = this.actionctrl.create({
      title: 'Select Option',
      cssClass: 'myPage',
      buttons: [
        {
          text: 'Approve',
          role: 'destructive',
          cssClass: 'myActionSheetBtnStyle',
          handler: () => {
         
            this.updateInstrumentRequest(actionJson.PermissionId, actionJson.GroupId, "1", actionJson.ResourceId);
            this.notification.getUserDeviceDetails("user", actionJson.UserId, "IARS", `Access for ${actionJson.ResourceName} has been approved`, "Instrument Access Request");
          }
        },
        {
          text: 'Reject',
          role: 'destructive',
          cssClass: 'myActionSheetBtnStyle',
          handler: () => {
            this.updateInstrumentRequest(actionJson.PermissionId, actionJson.GroupId, "3", actionJson.ResourceId);
            this.notification.getUserDeviceDetails("user", actionJson.UserId, "IARS", `Access for ${actionJson.ResourceName} has been rejected`, "Instrument Access Request");
          }
        },
      ]
    })
    actionSheet.present();
  }

  updateInstrumentRequest(permissionid: string, groupId: string, isapproved: string, resourceid: string) {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    // loader.present();

    this.http.post(this.insertInstrumentUrl, {
      permissionid: permissionid,
      userid: this.userJson.UserId,
      facilityid: groupId,
      user: this.userJson.LastName,
      isapproved: isapproved,
      resourceid: resourceid
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
         
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.InstrumentUpdateJson = resJSON;
      

          this.sendInstrumentRequest(this.facilityid);
        
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


  toast(toastStr: string) {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      message: toastStr,
      buttons: ['Ok']
    });
    alert.present();
  }

  updateChange() {
    this.facilityid;
    this.suppliesRequest();
    this.sendFacilityAccessRequest(this.facilityid);
    this.sendInstrumentRequest(this.facilityid);
    this.sendSampleRequest();
    this.sendReservationRequest(this.facilityid);
    this.notify = this.facility;
    this.spinnerIndex = 0;
    for (var i = 0; i < this.userFacilitiesJson.length; i++) {
      this.storage.set('spinnerInbox', this.spinnerIndex);
      if (this.facilityid == this.userFacilitiesJson[i].GroupId) {
        break;
      }
      this.spinnerIndex++;
    }
  }



  sendReservationRequest(groupId: string) {
   this.http.post(this.getReservationRequestUrl, {
      userid: this.userJson.UserId,
      facilityid: groupId,
      usertoken: this.userJson.UserToken,
      starttime: this.event.startDate,
      endtime: this.event.endDate

    })
      .subscribe(
        (data: any) => {
          //RESPONSE
          this.reservStatus = true;
          
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);

          this.ReservationRequestJson = resJSON;
          this.resourceName = resJSON[0].ResourceName;
          this.apptid = resJSON[0].AppointmentId;
          this.adate = resJSON[0].strStartTime;
          this.bdate = resJSON[0].strEndTime;


        },//ERROR HANDLING
        error => {

          

          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);

          if (resErrJSON.status == 400) {

            this.checkStatus = "400";
            this.reservStatus = false;
          }

        }
      );
  }
  reservationRequest(actionJson: any) {
   
    let resErr = JSON.stringify(actionJson);
    let resErrJSON = JSON.parse(resErr);
    

    if (resErrJSON.Status == "Pending") {

      let actionSheet = this.actionctrl.create({
        title: 'Select Option : ',
        cssClass: 'myPage',
        buttons: [
          {
            text: 'Approve',
            role: 'destructive',
            cssClass: 'myActionSheetBtnStyle',
            handler: () => {
              this.updateAppointmentStatus(actionJson.AppointmentId, "true");
              //  this.notification.getUserDeviceDetails("appt",this.apptid,"TRS",`Your appointment request from ${this.adate} to ${this.bdate} for ${this.resourceName} has been approved`,"Appointment approval");
            }
          },
          {
            text: 'Reject',
            role: 'destructive',
            cssClass: 'myActionSheetBtnStyle',
            handler: () => {
              this.updateAppointmentStatus(actionJson.AppointmentId, "false");
              // this.notification.getUserDeviceDetails("appt",this.apptid,"TRS",`Your appointment request from ${this.adate} to ${this.bdate} for ${this.resourceName} has been rejected`,"Appointment approval");
            }
          },
        ]
      })
      actionSheet.present();
    }
    else if (resErrJSON.Status == "Approved") {


      let actionSheet = this.actionctrl.create({
        title: 'Select Option : ',
        cssClass: 'myPage',
        buttons: [
          {
            text: 'Reject',
            role: 'destructive',
            cssClass: 'myActionSheetBtnStyle',
            handler: () => {
              this.updateAppointmentStatus(actionJson.AppointmentId, "false");
              //  this.notification.getUserDeviceDetails("appt",this.apptid,"TRS",`Your appointment request from ${this.adate} to ${this.bdate} for ${this.resourceName} has been rejected`,"Appointment approval");
            }
          },
        ]
      })
      actionSheet.present();
    }
    else if (resErrJSON.Status == "Rejected") {


      let actionSheet = this.actionctrl.create({
        title: 'Select Option : ',
        cssClass: 'myPage',
        buttons: [
          {
            text: 'Approve',
            role: 'destructive',
            cssClass: 'myActionSheetBtnStyle',
            handler: () => {
              this.updateAppointmentStatus(actionJson.AppointmentId, "true");
            }
          },
        ]
      })
      actionSheet.present();
    }
  }
  sampleDetail(sampleJson) {
    /*
    let actionSheet = this.actionctrl.create({
      title: 'Select Options',
      cssClass: 'myPage',
      buttons: [
        {
          //updated by Abey Abraham
          text: 'Update Milestone',
          role: 'destructive',
          cssClass: 'myActionSheetBtnStyle',
          handler: () => {
           
          }
        },
        {
          text: 'Chat',
          role: 'destructive',
          cssClass: 'myActionSheetBtnStyle',
          handler: () => {
          
          }
        },
      ]
    })
    actionSheet.present();
*/
    
  





    if(this.roleType=="user"||this.roleType=="providerAdmin"||this.roleType == "super"||this.roleType == "labAdmin"||this.roleType == " admin")
    { 
  if(this.roleType=="user"||this.roleType=="labAdmin")
  {
   if(this.userJson.UserId!=sampleJson.UserId)
   {
     this.showdetails(sampleJson);
     return;
   }
   
  }
  if(this.roleType == "super"||this.roleType == "providerAdmin"||this.roleType == " admin")
  {
    if(this.userJson.UserId==sampleJson.UserId)
    {
      this.showdetails(sampleJson);
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
     if(this.roleType=="user"||this.roleType=="labAdmin"){
       this.navCtrl.push(MessagePage, {"WorkOrderId":`${sampleJson.WorkOrderId}`,"id":"user","ProviderId":`${sampleJson.ProviderId}`,"source":` ${sampleJson.RollNumber}`,"chatType":`SampleSubmission`});
     }
    else if(this.roleType == "super"||this.roleType == "providerAdmin"||this.roleType == " admin"){

      this.navCtrl.push('ChatContentPage', {"WorkOrderId":`${sampleJson.WorkOrderId}`,"ProviderId":`${sampleJson.ProviderId}`,"role":`${this.roleType}`,"userid":`${sampleJson.UserId}`,"adminid":`${this.userJson.UserId}`,"senderName":`${this.userJson.LastName} ${this.userJson.FirstName}`,"pin":`${this.pin}`,"source":` ${sampleJson.RollNumber}`,"chatType":`SampleSubmission`})
      // this.navCtrl.push(MessagePage, {"WorkOrderId":`${sampleJson.WorkOrderId}`,"id":"providerAdmin","ProviderId":`${sampleJson.ProviderId}`,"source":` ${sampleJson.RollNumber}`,"chatType":`SampleSubmission`});
     }
           }
         },
         {
           text: 'Details',
           role: 'destructive',
           cssClass: 'myActionSheetBtnStyle',
           handler: () => {
            this.sampleJson = sampleJson;
            this.statusJson = this.sampleJson.WorkOrderStatus;
            if (this.statusJson.toLowerCase().indexOf("approved by pi") >= 0 || this.statusJson.toLowerCase().indexOf("approved by user") >= 0 || this.statusJson.toLowerCase().indexOf("in progress") >= 0) {
              this.navCtrl.push(SampledetailPage, { "sampleJson": sampleJson, "showValue": "true" });
            }
            else {
              this.navCtrl.push(SampledetailPage, { "sampleJson": sampleJson, "showValue": "false" });
            }
        
           }
         },
       ]
     })
     actionSheet.present();
   }else{
     
    this.showdetails(sampleJson);
   }
 
  }
  showdetails(sampleJson)
  { let actionSheet = this.actionctrl.create({
    title: 'Select Options',
    cssClass: 'myPage',
    buttons: [
      {
       
        text: 'Details',
        role: 'destructive',
        cssClass: 'myActionSheetBtnStyle',
        handler: () => {
          console.log("here");
          this.sampleJson = sampleJson;
          this.statusJson = this.sampleJson.WorkOrderStatus;
          if (this.statusJson.toLowerCase().indexOf("approved by pi") >= 0 || this.statusJson.toLowerCase().indexOf("approved by user") >= 0 || this.statusJson.toLowerCase().indexOf("in progress") >= 0) {
            this.navCtrl.push(SampledetailPage, { "sampleJson": sampleJson, "showValue": "true" });
          }
          else {
            this.navCtrl.push(SampledetailPage, { "sampleJson": sampleJson, "showValue": "false" });
          }
        }
      },
    ]
  })
  actionSheet.present();
return;
}

  updateAppointmentStatus(AppointmentId: string, isapproved: string) {
 
    this.http.post(this.updateAppointmentStatusUrl, {
      apptid: AppointmentId,
      user: this.userJson.EmailAddress,
      isapproved: isapproved
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
      
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.AppointmentStatusUpdateJson = resJSON;

          //  this.notification.getUserDeviceDetails("appt",this.apptid,"TRS",`Your appointment request from ${this.adate} to ${this.bdate} for ${this.resourceName} has been approved`,"Appointment approval");

          this.sendReservationRequest(this.facilityid);
        
          let alert = this.alertCtrl.create({
            title: 'Message',
            subTitle: 'Status Updated Successfully!',
            buttons: ['OK']
          });
          alert.present();


        },//ERROR HANDLING
        error => {

  
   
          
          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);
          if(resErrJSON.status == 400){
     
          }
        
        }
      );
  }

  sendSampleRequest() {
    this.http.post(this.sampleRequestUrl, {
      facilityid: this.facilityid,
      starttime: this.sample_event.startDate,
      endtime: this.sample_event.endDate,
      usertoken: this.userJson.UserToken,
      loggedinuser: this.userJson.UserId
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
          
          this.sampleStatus = true;
        
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.sampleRequestJson = resJSON;
         
console.log(this.sampleRequestJson);

        },//ERROR HANDLING
        error => {
          this.sampleStatus = false;
         
          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);


        }
      );
  }
  suppliesRequest(){
   
    this.http.get(this.suppliedRequestUrl+`/${this.facilityid},0,${this.supplies_event.startDate},${this.supplies_event.endDate}`)
      .subscribe(
        (data: any) => {
          //RESPONSE
      
          this.suppliesValue = true;
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.suppliesJson = resJSON;
console.log(resJSON);
        },//ERROR HANDLING
        error => {
          let resErr = JSON.stringify(error);
           this.suppliesValue = false;
          
        }
      );
  }
  suppliesDetail(data){
   
    if(this.roleType=="user"||this.roleType=="providerAdmin"||this.roleType == "super"||this.roleType == "labAdmin"||this.roleType == " admin")
    { 
 if(this.roleType=="user"||this.roleType=="labAdmin")
 {
   if(this.userJson.UserId!=data.UserId)
   {
     this.showdetail(data);
     return;
   }
   
 }
 if(this.roleType == "super"||this.roleType == "providerAdmin"||this.roleType == " admin")
   {
     if(this.userJson.UserId==data.UserId)
     {
       console.log("same");
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
     console.log("y oy o",data.OrderId,data.ProviderId,data.OrderNumber);  
     if(this.roleType=="user"||this.roleType=="labAdmin"){
       
       this.navCtrl.push(MessagePage, {"OrderId":`${data.OrderId}`,"id":"user","ProviderId":`${data.ProviderId}`,"source":`Order Number : ${data.OrderNumber}`,"chatType":`SuppliesOrder`});
     }
    else if(this.roleType == "super"||this.roleType == "providerAdmin"||this.roleType == " admin"){
      this.navCtrl.push('ChatContentPage', {"OrderId":`${data.OrderId}`,"ProviderId":`${data.ProviderId}`,"role":`${this.roleType}`,"userid":`${data.UserId}`,"adminid":`${this.userJson.UserId}`,"senderName":`${this.userJson.LastName} ${this.userJson.FirstName}`,"pin":`${this.pin}`,"source":`Order Number : ${data.OrderNumber}`,"chatType":`SuppliesOrder`})
      // this.navCtrl.push(MessagePage, {"OrderId":`${data.OrderId}`,"id":"providerAdmin","ProviderId":`${data.ProviderId}`,"source":`Order Number : ${data.OrderNumber}`,"chatType":`SuppliesOrder`});
     }
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
  startdatetime(event, data) {

    if (this.event.startDate > this.event.endDate) {
      this.event.startDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();
      this.showAlert("Start date cannot be after End Date.")
      return false
    } else if (this.sample_event.startDate > this.sample_event.endDate) {
      this.showAlert("Start date cannot be after End Date.")
      return false
    }
  }



  enddatetime(event, data) {
    var chkDate;
    if (data == "sample") {
      this.sample_event.endDate = moment(this.sample_event.endDate).toISOString(true)
      this.sample_event.startDate = moment(this.sample_event.startDate).toISOString(true)
      chkDate = moment(this.sample_event.endDate).isAfter(this.sample_event.startDate)
    } else {
      this.event.startDate = moment(this.event.startDate).toISOString(true)
      this.event.endDate = moment(this.event.endDate).toISOString(true);
      chkDate = moment(this.event.endDate).isAfter(this.event.startDate)
    }

    
    if (!chkDate) {
      if (data == "sample") {
        this.sample_event.endDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();
      } else {
        this.event.endDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();
      }
      this.showAlert("Selected date cannot be before to start date.")

    }

    //this.endDate = moment(this.navParams.get("endDate")).toISOString(true);
  }

  showAlert(eventdata) {
    const alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: eventdata,
      buttons: ['Ok']
    });
    alert.present();
  }
}
