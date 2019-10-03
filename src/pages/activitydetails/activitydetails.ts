/**
 * Created By Sumit Rajpal
 */
import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import * as moment from 'moment';
import { NotificationProvider } from '../../providers/notification/notification';
import { SampledetailPage } from '../sampledetail/sampledetail';
import { MessageProvider } from '../../providers/message/message';
import { AppointmentsPage } from '../appointments/appointments';
import { ActivitylogsProvider } from '../../providers/activitylogs/activitylogs';
@IonicPage()
@Component({
  selector: 'page-activitydetails',
  templateUrl: 'activitydetails.html',
})
export class ActivitydetailsPage {
  appUrl:string;
  getFacilitiesUrl:string;
  getInstrumentUrl:string;
  getUpdateFacilitiesUrl:string;
  getUpdateReservationUrl:string;
  getReservationUrl:string;
  deleteAppointmentUrl:string;
  getSampleUrl:string;
  updateAppointmentUrl:string;
  getUpdateInstrumentUrl:string;
  userType:boolean;
  userJson:any;
  userFacilitiesJson:any;
  userReservtionJson:any;
  facilityId:string;
  pageType:string;
  methodUrl:string;
  facStatus:boolean;
  startDate:string;
  endDate:string;
  getUserDeviceDetailsUrl:string;
  sendPushNotificationUrl:string; 
  name:string;
  instrument:String;
  facilityName:string;
  appid:string;
  sdate:string;
  edate:string;
  resourscename:string;
  resid:string;
  statusJson:string;
  sampleJson:any;
  selectOption:string;
  appointmentButton:any;
  constructor(public logs: ActivitylogsProvider,public navCtrl: NavController, public navParams: NavParams,
    public loading: LoadingController,public http:HttpClient,public storage: Storage,public actionctrl:ActionSheetController,
    public notification: NotificationProvider,public message:MessageProvider) {
  }
  ionViewDidLoad() {
    this.storage.get('appLink').then((val) =>{
      this.appUrl=val;
      this.deleteAppointmentUrl = this.appUrl + '/WS/IdeaElanService.svc/DeleteAppointment';
      this.getFacilitiesUrl=this.appUrl+'/WS/IdeaElanService.svc/GetFacilityAccessRequest';
      this.getInstrumentUrl=this.appUrl+'/WS/IdeaElanService.svc/GetInstrumentAccessRequest';
      this.getUpdateFacilitiesUrl=this.appUrl+'/WS/IdeaElanService.svc/UpdateProviderRequestStatus';
      this.getUpdateInstrumentUrl=this.appUrl+'/WS/IdeaElanService.svc/InsertResourcePermission';
      this.getReservationUrl=this.appUrl+'/WS/IdeaElanService.svc/GetReservationRequest';
      this.getSampleUrl=this.appUrl+'/WS/IdeaElanService.svc/GetWorkOrdersByProviderIdByDateRange';
      this.getUpdateReservationUrl=this.appUrl+'/WS/IdeaElanService.svc/GetSampleSubmissionMilestoneDetails';
      this.getUserDeviceDetailsUrl = this.appUrl + '/WS/IdeaElanService.svc/GetUserDeviceDetails';
      this.sendPushNotificationUrl = this.appUrl + '/WS/IdeaElanService.svc/SendPushMessageToTokens'
      this.updateAppointmentUrl=this.appUrl+'/WS/IdeaElanService.svc/UpdateAppointmentStatusByApptId'; 
     });

      this.storage.get('userDetails').then((val1) => {
      this.userJson =val1;
    });

      this.facilityId=this.navParams.get('facilityId');
      this.pageType=this.navParams.get('pageType');
      this.facilityName=this.navParams.get('facilityName');
   
     
  }
  ionViewWillEnter(){
    
    this.storage.get('userDetails').then((val1) => {
      this.startDate=moment(moment().startOf("isoWeek").toDate()).format("MM/DD/YYYY HH:mm:ss");
      this.endDate=moment(moment().add(1, 'weeks').startOf("isoWeek").toDate()).format("MM/DD/YYYY HH:mm:ss");  
      (this.startDate,this.endDate)
     if(this.pageType=="Facility"){
        this.sendFacilitiesRequest(this.facilityId,this.getFacilitiesUrl,"");
      }else if(this.pageType=="Instruments"){
        this.sendFacilitiesRequest(this.facilityId,this.getInstrumentUrl,"");
        
      }
      else if(this.pageType=="Reservation"){
      
        this.sendReservationRequest(this.facilityId,this.getReservationUrl,"");
      }
      else if(this.pageType=="Sample"){
        this.sendSampleRequest(this.facilityId,this.getSampleUrl);
      }

    });
 
    
  }
  
  

  sendReservationRequest(facilityId:string,methodUrl:string,status:string){
    let loader = this.loading.create({
      spinner:"crescent",
      content:"Loading . . . "
    });
    loader.present();
  
    this.http.post(methodUrl,{ 
      userid:"",
      usertoken:"",
      facilityid:facilityId,
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
         this.appid=resJSON[0].AppointmentId;
         this.sdate=resJSON[0].strStartTime;
         this.edate=resJSON[0].strEndTime;
         this.resourscename=resJSON[0].ResourceName;
         this.resid=resJSON[0].ResourceId;
        
      
         loader.dismiss();
         if(status=="update"){
           this.message.showMessage("Message","Status Updated Successfully !!");
         }
         else if(status =="cancel"){
          this.message.showMessage("Message","Appointment cancelled Successfully !!");
         }
         
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
  sendSampleRequest(facilityId:string,methodUrl:string){
    let loader = this.loading.create({
      spinner:"crescent",
      content:"Loading . . . "
    });
    loader.present();
  
    this.http.post(methodUrl,{ 
      loggedinuser:this.userJson.UserId,
      usertoken:this.userJson.UserToken,
      facilityid:facilityId,
      starttime:this.startDate,
      endtime:this.endDate
     })
    .subscribe(
      (data:any) => {
        //RESPONSE
         
         this.facStatus=true;
         let resSTR = JSON.stringify(data);
         let resJSON = JSON.parse(resSTR);
         this.userFacilitiesJson=resJSON;
         
         loader.dismiss();
         
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
  

  
  sendFacilitiesRequest(facilityId:string,methodUrl:string,status:string){
    let loader = this.loading.create({
      spinner:"crescent",
      content:"Loading . . . "
    });
    loader.present();
  
    this.http.post(methodUrl,{ 
      userid:this.userJson.UserId,
      usertoken:this.userJson.UserToken,
      facilityid:facilityId
     })
    .subscribe(
      (data:any) => {
        //RESPONSE
            
         this.facStatus=true;
         let resSTR = JSON.stringify(data);
         let resJSON = JSON.parse(resSTR);
         this.userFacilitiesJson=resJSON;
         this.name=resJSON[0].UserName;
         this.instrument=resJSON[0].ResourceName;
        loader.dismiss(); 
         if(status=="update"){
          this.message.showMessage("Message"," Access Approved Sccessfully");
         }
         
    
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
  
  sendFacilitiesUpdateRequest(facilityId:string,methodUrl:string,uStatus:string,userId){
    let loader = this.loading.create({
      spinner:"crescent",
      content:"Loading . . . "
    });
    
 
    this.http.post(methodUrl,{ 
      userid:userId,
      status:uStatus,
      facilityid:facilityId,
      user:this.userJson.EmailAddress
     })
    .subscribe(
      (data:any) => {
        //RESPONSE
         this.sendFacilitiesRequest(this.facilityId,this.getFacilitiesUrl,"update");
      },//ERROR HANDLING
      error => {
  
        // loader.dismiss();
         
         let resErr = JSON.stringify(error);
         let resErrJSON = JSON.parse(resErr);
      
       
      }
    );
  }
  
  sendReservationUpdateRequest(is_appId:string,is_approve:string,is_user:string){
    let loader = this.loading.create({
      spinner:"crescent",
      content:"Loading . . . "
    });
    
  
    this.http.post(this.updateAppointmentUrl,{ 
      apptid:is_appId,
      isapproved:is_approve,
      user:is_user
     })
    .subscribe(
      (data:any) => {
        //RESPONSE
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
          
       //  this.notification.getUserDeviceDetails("appt",this.appid,"TRS", `Your appointment request from ${this.sdate} to ${this.edate} for ${this.resourscename} has been approved`,"Appointment approval");
           loader.dismiss();
          
           this.sendReservationRequest(this.facilityId,this.getReservationUrl,"update");
      },//ERROR HANDLING
      error => {
  
         loader.dismiss();
         
         let resErr = JSON.stringify(error);
         let resErrJSON = JSON.parse(resErr);
      
       
      }
    );
  }
  
  sendInstrumentUpdateRequest(facilityId:string,methodUrl:string,isApprove:string,permissionid:string,resourceid:string){
    let loader = this.loading.create({
      spinner:"crescent",
      content:"Loading . . . "
    });
  
    this.http.post(methodUrl,{ 
      permissionid:permissionid,
      facilityid:facilityId,
      userid:this.userJson.UserId,
      resourceid:resourceid,
      user:this.userJson.EmailAddress,
      isapproved:isApprove
     })
    .subscribe(
      (data:any) => {
        //RESPONSE
       
         
        
         //this.getUserDeviceDetails(resourceid);
         this.sendFacilitiesRequest(this.facilityId,this.getInstrumentUrl,"update");
      },//ERROR HANDLING
      error => {
  
         loader.dismiss();
          
         let resErr = JSON.stringify(error);
         let resErrJSON = JSON.parse(resErr);
      
       
      }
    );
  }

  sampleDetailPage(sampleJson){
    this.sampleJson= sampleJson;
    this.statusJson = this.sampleJson.WorkOrderStatus;
    if (this.statusJson.toLowerCase().indexOf("approved by pi") >= 0 || this.statusJson.toLowerCase().indexOf("approved by user") >= 0 || this.statusJson.toLowerCase().indexOf("in progress") >= 0)
    {
      this.navCtrl.push(SampledetailPage,{"sampleJson":sampleJson,"showValue":"true"});
    }
    else{
      this.navCtrl.push(SampledetailPage,{"sampleJson":sampleJson,"showValue":"false"});
    }
  }
  actionSheetMethod(facilityAccess:any){
    this.appid=facilityAccess.AppointmentId;
    this.sdate=facilityAccess.strStartTime;
    this.edate=facilityAccess.strEndTime;
    this.resourscename=facilityAccess.ResourceName;
     this.appointmentButton = [              
      {
        text: 'Yes',
        handler: () => {
          this.CancelAppointmentRequest(facilityAccess.AppointmentId);
        }
      },
      {
        text: 'No',
        handler: () => {
          
        }
      }
    ];
      if(this.pageType=="Reservation"){
        if(facilityAccess.Status=="Pending"){
       
          let actionSheetR = this.actionctrl.create({
            title:'Select Option : '+facilityAccess.ResourceName,
            cssClass:'myPage',
            buttons:[
              {
                text:"Edit Appointment",
                role:'destructive',
                cssClass: 'myActionSheetBtnStyle',
                handler:() =>{
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
                    "FacilityName": facilityAccess.FacilityName
                  });
               }
              },
              {
                text:'Cancel Appointment',
                role:'destructive',
                cssClass: 'myActionSheetBtnStyle',
                handler:() =>{
                this.message.showMessageButton('Cancel Appointment','Are you sure you want to cancel the Appointment ?',this.appointmentButton);
                }
              },
              {
                text:'Approve',
                role:'destructive',
                cssClass: 'myActionSheetBtnStyle',
                handler:() =>{

                  /* Modified by Abey Abraham */
                  this.sendReservationUpdateRequest(facilityAccess.AppointmentId,"true",facilityAccess.UserId);
                  this.logs.insertlog("Activity Dasboard", "Activity Details", "Selection of Approve option", `User ${this.userJson.UserId} approved appointment request from ${this.sdate} to ${this.edate} for ${this.resourscename} by clicking approve button `, this.userJson.UserId);
                  this.notification.getUserDeviceDetails("appt",this.appid,"TRS", `Your appointment request from ${this.sdate} to ${this.edate} for ${this.resourscename} has been approved`,"Appointment approval");
                }
              },
              {
                text:'Reject',
                role:'destructive',
                cssClass: 'myActionSheetBtnStyle',
                handler:() =>{
                  this.sendReservationUpdateRequest(facilityAccess.AppointmentId,"false",facilityAccess.UserId);
                  this.logs.insertlog("Activity Dasboard", "Activity Details", "Selection of Reject option", `User ${this.userJson.UserId} rejected appointment request from ${this.sdate} to ${this.edate} for ${this.resourscename} by clicking reject button `, this.userJson.UserId);
                  this.notification.getUserDeviceDetails("appt",this.appid,"TRS", `Your appointment request from ${this.sdate} to ${this.edate} for ${this.resourscename} has been rejected`,"Appointment approval");
                }
              }
            ]
          })
          actionSheetR.present();
        }else if(facilityAccess.Status=="Approved"){
        
          let actionSheetR = this.actionctrl.create({
            title:'Select Option : '+facilityAccess.ResourceName,
            cssClass:'myPage',
            buttons:[
              {
                text:"Edit Appointment",
                role:'destructive',
                cssClass: 'myActionSheetBtnStyle',
                handler:() =>{
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
                    "FacilityName": facilityAccess.FacilityName
                  });
               }
              },
              {
                text:'Cancel Appointment',
                role:'destructive',
                cssClass: 'myActionSheetBtnStyle',
                handler:() =>{
                  this.message.showMessageButton('Cancel Appointment','Are you sure you want to cancel the Appointment ?',this.appointmentButton);
                }
              },
              {
                text:'Reject',
                role:'destructive',
                cssClass: 'myActionSheetBtnStyle',
                handler:() =>{

                  /* Modified by Abey Abraham */
                  this.sendReservationUpdateRequest(facilityAccess.AppointmentId,"false",facilityAccess.UserId);
                  this.logs.insertlog("Activity Dasboard", "Activity Details", "Selection of Reject option", `User ${this.userJson.UserId} rejected appointment request from ${this.sdate} to ${this.edate} for ${this.resourscename} by clicking reject button `, this.userJson.UserId);
                this.notification.getUserDeviceDetails("appt",this.appid,"TRS", `Your appointment request from ${this.sdate} to ${this.edate} for ${this.resourscename} has been rejected`,"Appointment approval");
                }
              }
            ]
          })
          actionSheetR.present();
        }
        else if(facilityAccess.Status=="Rejected"){
        
          let actionSheetR = this.actionctrl.create({
            title:'Select Option : '+facilityAccess.ResourceName,
            cssClass:'myPage',
            buttons:[
              {
                text:"Edit Appointment",
                role:'destructive',
                cssClass: 'myActionSheetBtnStyle',
                handler:() =>{
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
                    "FacilityName": facilityAccess.FacilityName
                  });
               }
              },
              {
                text:'Cancel Appointment',
                role:'destructive',
                cssClass: 'myActionSheetBtnStyle',
                handler:() =>{
                  this.message.showMessageButton('Cancel Appointment','Are you sure you want to cancel the Appointment ?',this.appointmentButton);
                }
              },
              {
                text:'Approve',
                role:'destructive',
                cssClass: 'myActionSheetBtnStyle',
                handler:() =>{
                  /* Modified by Abey Abraham */
                  this.sendReservationUpdateRequest(facilityAccess.AppointmentId,"true",facilityAccess.UserId);
                  this.logs.insertlog("Activity Dasboard", "Activity Details", "Selection of Approve option", `User ${this.userJson.UserId} approved appointment request from ${this.sdate} to ${this.edate} for ${this.resourscename} by clicking approve button `, this.userJson.UserId);
                 this.notification.getUserDeviceDetails("appt",this.appid,"TRS", `Your appointment request from ${this.sdate} to ${this.edate} for ${this.resourscename} has been approved`,"Appointment approval");
                }
            }
            
            ]
          })
          actionSheetR.present();
        }
      }
       
      else if(this.pageType=="Instruments" || this.pageType=="Facility"){
      let actionSheet = this.actionctrl.create({
        title:'Select Options : ' ,
        cssClass:'myPage',
        buttons:[
          {
            text:"Approve",
            role:'destructive',
            cssClass: 'myActionSheetBtnStyle',
            handler:() =>{
              /* Modified by Abey Abraham */
              if(this.pageType=="Facility"){ 
 
                this.sendFacilitiesUpdateRequest(this.facilityId,this.getUpdateFacilitiesUrl,"1",facilityAccess.UserId);
                this.logs.insertlog("Facility", "Facility Access Request ", "Selection of Approve option", `User ${this.userJson.UserId} approved Request to access ${this.facilityName} `, this.userJson.UserId);
                this.notification.getUserDeviceDetails("user",facilityAccess.UserId,"FARS", ` Request to access ${this.facilityName} has been approved`,"Facility Access Request ");
              }else if(this.pageType=="Instruments"){
                this.sendInstrumentUpdateRequest(this.facilityId,this.getUpdateInstrumentUrl,"1",facilityAccess.PermissionId,facilityAccess.ResourceId);
                this.logs.insertlog("Instruments", "Instrument Access Request ", "Selection of Approve option", `User ${this.userJson.UserId} approved Request to access ${this.instrument} `, this.userJson.UserId);
                this.notification.getUserDeviceDetails("user",facilityAccess.UserId,"IARS", `Access for ${this.instrument} has been approved`,"Instrument Access Request ");
              
              }
           }
          },
          {
            text:'Reject',   
            role:'destructive',
            cssClass: 'myActionSheetBtnStyle',
            handler:() =>{
              if(this.pageType=="Facility"){
                this.sendFacilitiesUpdateRequest(this.facilityId,this.getUpdateFacilitiesUrl,"0",facilityAccess.UserId);
                this.logs.insertlog("Facility", "Facility Access Request ", "Selection of Reject option", `User ${this.userJson.UserId} rejected Request to access ${this.facilityName} `, this.userJson.UserId);
                this.notification.getUserDeviceDetails("user",facilityAccess.UserId,"FARS", `Request to access ${this.facilityName} has been rejected`,"Facility Access Request ");
              }else if(this.pageType=="Instruments"){
                this.sendInstrumentUpdateRequest(this.facilityId,this.getUpdateInstrumentUrl,"3",facilityAccess.PermissionId,facilityAccess.ResourceId);
                this.logs.insertlog("Instruments", "Instrument Access Request ", "Selection of Reject option", `User ${this.userJson.UserId} rejected Request to access ${this.instrument} `, this.userJson.UserId);
                this.notification.getUserDeviceDetails("user",facilityAccess.UserId,"IARS", `Access for ${this.instrument} has been rejected`,"Instrument Access Request ");
              }
            }
          }
        ]
      })
      actionSheet.present();
    }
    }   //Cancel Appointment 
     CancelAppointmentRequest(eventid) {

      this.http.post(this.deleteAppointmentUrl,
        {
          apptid: eventid,
          user:this.userJson.EmailAddress
        })
        .subscribe(
          (data: any) => {
          //     .log(data);
            let resSTR = JSON.stringify(data);
            let resJSON = JSON.parse(resSTR);
   
            if(resJSON=="Success"){
              this.logs.insertlog("Activity Dasboard", "Activity Details", "Clicked Cancel Appointment", `User ${this.userJson.UserId} cancelled appointment from ${this.sdate} to ${this.edate} for ${this.resourscename} `, this.userJson.UserId);
              this.notification.getUserDeviceDetails("resource",this.resid,"UCA",`Appointment from ${this.sdate} to ${this.edate} for ${this.resourscename} has been cancelled`,"Appointment Cancelled")
              this.sendReservationRequest(this.facilityId,this.getReservationUrl,"cancel");   
            }
            
          },//ERROR HANDLING
          error => {
            
              
          }
        );
        }
  

  }
