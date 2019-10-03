/**
 * Created By Sumit Rajpal
 */
import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController,AlertController} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import * as moment from 'moment';
import { NotificationProvider } from '../../providers/notification/notification';
import {  ActivitylogsProvider} from '../../providers/activitylogs/activitylogs';
import { AppointmentsPage } from '../appointments/appointments';
import { MessageProvider } from '../../providers/message/message';
import { MessagePage } from '../message/message';
@IonicPage()
@Component({
  selector: 'page-allreservation',
  templateUrl: 'allreservation.html',
})
export class AllreservationPage {

  
  public startDate;
  public endDate;
  
  appUrl:string;
  getUpdateReservationUrl:string;
  getUserReservationUrl:string;
  deleteAppointmentUrl:string;
  getReservationUrl:string;
  userFacilitiesJson:any;
  getFacilitiesUrl:string;
  userType:boolean;
  userJson:any;
  userReservtionJson:any;
  facilityId:string;
  methodUrl:string;
  facStatus:boolean;
  spinnerIndex:number;
  appid:string;
  reservationTitle:string;
  sdate:string;
  edate:string;
  resourscename:string;
  resid:string;
  emptyDropdown:boolean;
  selectOption:boolean;
  roletype:any
  pin:any;
  constructor(public message:MessageProvider,public logs : ActivitylogsProvider,public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController,
    public loading: LoadingController,public http:HttpClient,public storage: Storage,public actionctrl:ActionSheetController
    ,public alertCtrl:AlertController,public notification: NotificationProvider) {
      this.startDate=new Date(new Date().setDate(new Date().getDate())).toISOString();
      //new Date(new Date().setDate(new Date().getDate() + 7)).toISOString();
      this.endDate = new Date(new Date().setDate(new Date().getDate() + 30)).toISOString();
     // this.logs.insertlog("All Reservations","Menu Page","Clicked menu option",`User selected All Reservations options from Menu `,this.userJson.UserId);
    }

    responsibleUser:string
  ionViewDidLoad() {
    this.storage.get('appLink').then((val) =>{
      this.appUrl=val;
      this.getFacilitiesUrl=this.appUrl+'/WS/IdeaElanService.svc/GetFacilitiesUserIsAdmin';
      this.deleteAppointmentUrl = this.appUrl + '/WS/IdeaElanService.svc/DeleteAppointment';
      this.getReservationUrl=this.appUrl+'/WS/IdeaElanService.svc/GetReservationRequest';
      this.getUserReservationUrl=this.appUrl+'/WS/IdeaElanService.svc/GetUserReservations';
      this.getUpdateReservationUrl=this.appUrl+'/WS/IdeaElanService.svc/GetSampleSubmissionMilestoneDetails';
      
     });

      this.storage.get('userDetails').then((val1) => {
      this.userJson =val1;
    });
    this.storage.get('pin').then((val) => {
      this.pin=val;
             
            });
  
    this.storage.get('roleType').then((val) => {
      this.roletype=val;
      
     if(val=="user" || val=="labAdmin"){
      this.userType=true;
      this.reservationTitle = "My Reservation";
     }else if(val=="super" || val=="admin" || val=="providerAdmin"){
      this.userType=false;
      this.reservationTitle = "All Reservation";
     }
     else{
       
     }});
     
     
  }
  buttonRequest(){
    this.logs.insertlog("Reservation Request","All Reservation","Go button","User selected the dates and checked all reservations list ",this.userJson.UserId);
    if(this.userType){
      this.sendUserReservationRequest("initial");
    }else{
      this.sendReservationRequest(this.facilityId,"");
    }
 
}

ionViewWillEnter(){
    this.storage.get('spinnerReservation').then((val) =>{
      this.spinnerIndex=Number(val);
   });
    this.storage.get('userDetails').then((val2) => {

      if(this.userType){
        this.sendUserReservationRequest("initial");
      }else{
      this.sendFacilitiesRequest();
      }
      
      

    });
 
    
  }

  
  sendFacilitiesRequest(){
   
    this.http.post(this.getFacilitiesUrl,{ 
      userid:this.userJson.UserId,
      usertoken:this.userJson.UserToken,
     })
    .subscribe(
      (data:any) => {
        //RESPONSE
     
         this.emptyDropdown = false;
         this.selectOption = false;
         let resSTR = JSON.stringify(data);
         let resJSON = JSON.parse(resSTR);
         this.userFacilitiesJson=resJSON;
        console.log(resJSON);
        this.facilityId=resJSON[this.spinnerIndex].GroupId;
        this.sendReservationRequest(this.facilityId,"");
       
      },//ERROR HANDLING
      error => {
  
        this.selectOption = true;
         this.emptyDropdown = true;
         let resErr = JSON.stringify(error);
         let resErrJSON = JSON.parse(resErr);
         if(resErrJSON.status == 400){
         
         }
       
      }
    );
  }
  
  actionSheetMethod(facilityAccess:any){
    console.log("this.roletype",this.roletype);
    if(this.roletype=="user"||this.roletype=="providerAdmin")
    {  console.log("if1");
 if(this.roletype=="user")
 { console.log("if2");
   if(this.userJson.UserId!=facilityAccess.UserId)
   {console.log("if3");
     this.showdetail(facilityAccess);
     return;
   }
  }
  if(this.roletype=="providerAdmin")
{
  if(this.userJson.UserId==facilityAccess.UserId)
  {
    this.showdetail(facilityAccess);
    return;
  }
  
}
   
  //&& facilityAccess.Status!="Elapsed"
  if(facilityAccess.Status!="Rejected" ){
    let actionSheetR = this.actionctrl.create({
      title:'Select Option : '+facilityAccess.ResourceName,
      cssClass: 'myPage',
      buttons:[
        {
          text:"Edit Appointment",
          role:'destructive',
          cssClass: 'myActionSheetBtnStyle',
          handler:() =>{
            this.logs.insertlog("Edit Appointment","All Reservation","Action Sheet",`User selected the edit appointment option for Appointment id ${facilityAccess.AppointmentId} `,this.userJson.UserId);
            this.navCtrl.push(AppointmentsPage, {
              "pageType": "edit",
              "AccountCode": facilityAccess.LabAccountCodeId,
              "AdminUserId": facilityAccess.AdminUserId,
              "AppointmentId": facilityAccess.AppointmentId,
              "ProjectId": facilityAccess.ProjectId,
              "ResourceId": facilityAccess.ResourceId,
              "SpecialInstruction": facilityAccess.SpecialInstruction,
              "StartDate": facilityAccess.strStartTime,
              "EndDate": facilityAccess.strEndTime,
              "TagIds": facilityAccess.TagIds,
              "LabId": facilityAccess.LabId,
              "SessionId": facilityAccess.SessionId,
              "UserId": facilityAccess.UserId,
              "FacilityName":facilityAccess.FacilityName
            });
         }
        },
        {
          text:'Cancel Appointment',
          role:'destructive',
          cssClass: 'myActionSheetBtnStyle',
          handler:() =>{
            let confirm = this.alertCtrl.create({
              title: "Cancel Appointment",
              message: 'Do you want to cancel the Appointment ?',
              buttons: [
               
                
                {
                  text: 'Yes',
                  handler: () => {
                    this.logs.insertlog("Cancel Appointment","All Reservation","Action Sheet",`User selected the edit appointment option for Appointment id ${facilityAccess.AppointmentId} `,this.userJson.UserId);
                    //changes by Abey Abraham
                    this.appid=facilityAccess.AppointmentId;
                    this.sdate=facilityAccess.strStartTime;
                    this.edate=facilityAccess.strEndTime;
                    this.resourscename=facilityAccess.ResourceName;
                    this.resid=facilityAccess.ResourceId;
                    this.CancelAppointmentRequest(facilityAccess.AppointmentId);
                  }
                },
                {
                  text: 'No',
                  handler: () => {
                    
                  }
                }
              ]
            });
            confirm.present();
            
          }
        },
        {
          text:"Chat",
          role:'destructive',
          cssClass: 'myActionSheetBtnStyle',
          handler:() =>{
            if(this.roletype=="user"){
              this.navCtrl.push(MessagePage, {"LabId":`${facilityAccess.LabId}`,"instrumentid":`${facilityAccess.ResourceId}`,"id":"user","AppointmentId":`${facilityAccess.AppointmentId}`,"source":`${facilityAccess.ResourceName}`,"chatType":`Reservations`});
            }
           else if(this.roletype=="providerAdmin"){

            this.navCtrl.push('ChatContentPage', {"role":`${this.roletype}`,"userid":`${facilityAccess.UserId}`,"adminid":`${this.userJson.UserId}`,"instrumentid":`${facilityAccess.ResourceId}`,"senderName":`${facilityAccess.LastName} ${facilityAccess.FirstName}`,"pin":`${this.pin}`,"source":`${facilityAccess.ResourceName}`,"chatType":`Reservations`,"AppointmentId":`${facilityAccess.AppointmentId}`})


              //this.navCtrl.push(MessagePage, {"LabId":`${facilityAccess.LabId}`,"instrumentid":`${facilityAccess.ResourceId}`,"id":"providerAdmin","AppointmentId":`${facilityAccess.AppointmentId}`,"source":`${facilityAccess.ResourceName}`,"chatType":`Reservations`});
            }
         }
        }
      ]
    })
    actionSheetR.present();
   }
 
 
 
    }


    else{
      console.log("if4");
      this.showdetail(facilityAccess);
     }
    
    }
    showdetail(facilityAccess)
    {
      
  if(facilityAccess.Status!="Rejected" && facilityAccess.Status!="Elapsed"){
    let actionSheetR = this.actionctrl.create({
      title:'Select Option : '+facilityAccess.ResourceName,
      cssClass: 'myPage',
      buttons:[
        {
          text:"Edit Appointment",
          role:'destructive',
          cssClass: 'myActionSheetBtnStyle',
          handler:() =>{
            this.logs.insertlog("Edit Appointment","All Reservation","Action Sheet",`User selected the edit appointment option for Appointment id ${facilityAccess.AppointmentId} `,this.userJson.UserId);
            this.navCtrl.push(AppointmentsPage, {
              "pageType": "edit",
              "AccountCode": facilityAccess.LabAccountCodeId,
              "AdminUserId": facilityAccess.AdminUserId,
              "AppointmentId": facilityAccess.AppointmentId,
              "ProjectId": facilityAccess.ProjectId,
              "ResourceId": facilityAccess.ResourceId,
              "SpecialInstruction": facilityAccess.SpecialInstruction,
              "StartDate": facilityAccess.strStartTime,
              "EndDate": facilityAccess.strEndTime,
              "TagIds": facilityAccess.TagIds,
              "LabId": facilityAccess.LabId,
              "SessionId": facilityAccess.SessionId,
              "UserId": facilityAccess.UserId,
              "FacilityName":facilityAccess.FacilityName
            });
         }
        },
        {
          text:'Cancel Appointment',
          role:'destructive',
          cssClass: 'myActionSheetBtnStyle',
          handler:() =>{
            let confirm = this.alertCtrl.create({
              title: "Cancel Appointment",
              message: 'Do you want to cancel the Appointment ?',
              buttons: [
               
                
                {
                  text: 'Yes',
                  handler: () => {
                    this.logs.insertlog("Cancel Appointment","All Reservation","Action Sheet",`User selected the edit appointment option for Appointment id ${facilityAccess.AppointmentId} `,this.userJson.UserId);
                    //changes by Abey Abraham
                    this.appid=facilityAccess.AppointmentId;
                    this.sdate=facilityAccess.strStartTime;
                    this.edate=facilityAccess.strEndTime;
                    this.resourscename=facilityAccess.ResourceName;
                    this.resid=facilityAccess.ResourceId;
                    this.CancelAppointmentRequest(facilityAccess.AppointmentId);
                  }
                },
                {
                  text: 'No',
                  handler: () => {
                    
                  }
                }
              ]
            });
            confirm.present();
            
          }
        },
      
      ]
    })
    actionSheetR.present();
   }
   return;
  }
   //Cancel Appointment 
   CancelAppointmentRequest(eventid) {

    this.http.post(this.deleteAppointmentUrl,
      {
        apptid: eventid,
        user:this.userJson.EmailAddress
      })
      .subscribe(
        (data: any) => {
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.notification.getUserDeviceDetails("resource",this.resid,"UCA",`Appointment from ${this.sdate} to ${this.edate} for ${this.resourscename} has been cancelled`,"Appointment Cancelled")
          if(resJSON=="Success"){
             if(this.userType){
              this.sendUserReservationRequest("cancel");
            }else{
              this.sendReservationRequest(this.facilityId,"cancel");
            }
          }
           
          
          
          
      //    this.getUserDeviceDetails("Appointment Cancelled","Appointment has been cancelled","UCA")
         
        },//ERROR HANDLING
        error => {
          
      
        }
      );
  }

 
  sendReservationRequest(faclility:string,status:string){
    let loader = this.loading.create({
      spinner:"crescent",
      content:"Loading . . . "
    });
    loader.present();
    this.http.post(this.getReservationUrl,{ 
      userid:"",
      usertoken:"",
      facilityid:faclility,
      starttime:this.startDate,
      endtime:this.endDate
     })
    .subscribe(
      (data:any) => {
        //RESPONSE
         this.facStatus=true;
         let resSTR = JSON.stringify(data);
         let resJSON = JSON.parse(resSTR);
         this.userReservtionJson=resJSON;
         console.log("details",this.userReservtionJson);
         this.appid=resJSON[0].AppointmentId;
         this.sdate=resJSON[0].strStartTime;
         this.edate=resJSON[0].strEndTime;
         this.resourscename=resJSON[0].ResourceName;
         this.resid=resJSON[0].ResourceId;
         loader.dismiss();
         if(status.match("cancel")){
          let alert = this.alertCtrl.create({
            title: 'Message',
            subTitle: 'Appointment cancelled Successfully',
            buttons: ['Dismiss']
          });
          alert.present();
         }
        // loader.dismiss();
         
      },//ERROR HANDLING
      error => {
  
         loader.dismiss();
     
         let resErr = JSON.stringify(error);
         let resErrJSON = JSON.parse(resErr);
         this.facStatus=false;
         if(resErrJSON.status == 400){
         
         }
       
      }
    );
  }
  
  sendUserReservationRequest(text:string){
    let loader = this.loading.create({
      spinner:"crescent",
      content:"Loading . . . "
    });
    loader.present();
    this.http.post(this.getUserReservationUrl,{ 
      userid:this.userJson.UserId,
      starttime:this.startDate,
      endtime:this.endDate
     })
    .subscribe(
      (data:any) => {
        //RESPONSE
         this.facStatus=true;
         this.selectOption = false;
         let resSTR = JSON.stringify(data);
         let resJSON = JSON.parse(resSTR);
         this.userReservtionJson=resJSON;
         console.log(resJSON);
         loader.dismiss();
         if(text.match("cancel")){
          let alert = this.alertCtrl.create({
            title: 'Message',
            subTitle: 'Appointment cancelled Successfully',
            buttons: ['Dismiss']
          });
          alert.present();
         }
      },//ERROR HANDLING
      error => {
        this.selectOption = true;
         loader.dismiss();
         let resErr = JSON.stringify(error);
         let resErrJSON = JSON.parse(resErr);
         this.facStatus=false;
         if(resErrJSON.status == 400){
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
         }
       
      }
    );
  }

  

  updateChange(){
    this.facilityId;
    this.sendReservationRequest(this.facilityId,"");
    this.spinnerIndex=0;
    for(var i=0;i<this.userFacilitiesJson.length;i++){
      this.storage.set('spinnerReservation', this.spinnerIndex);
      this.spinnerIndex++;
     if(this.facilityId==this.userFacilitiesJson[i].GroupId){
       break;
     }
    
  }
  }

  startdatetime(event, data) {
    if (this.startDate > this.endDate) {
      this.startDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();
      this.message.showMessage('Alert',"Start date cannot be after End Date.")
       return false
    }
  }

  enddatetime(event) {
    this.startDate = moment(this.startDate).toISOString(true)
    this.endDate = moment(this.endDate).toISOString(true);
    if (!moment( this.endDate).isAfter(this.startDate) ) {
      this.endDate = new Date(new Date().setDate(new Date().getDate() + 30)).toISOString();
      this.message.showMessage('Alert',"Selected date cannot be before to start date.")
    }
    
    //this.endDate = moment(this.navParams.get("endDate")).toISOString(true);
  }

 
}
