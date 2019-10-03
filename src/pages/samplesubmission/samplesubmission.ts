/*
Created By Sumit Rajpal & No Modification
*/ 
import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import * as moment from 'moment';
import { SampledetailPage } from '../sampledetail/sampledetail';
import { MessagePage } from '../message/message';
@IonicPage()
@Component({
  selector: 'page-samplesubmission',
  templateUrl: 'samplesubmission.html',
})
export class SamplesubmissionPage {
  public startDate;
  public endDate;
  userJson:any;
  appUrl:string;
  sampleRequestUrl:string;
  sampleDetailRequestUrl:string;
  sampleRequestJson:any;
  sampleStatus:boolean;
  sampleJson:any;
  roleType:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loading: LoadingController,public http:HttpClient,public storage: Storage,public actionctrl:ActionSheetController
    ,public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    this.storage.get('appLink').then((val) =>{
      this.appUrl=val;
      this.sampleRequestUrl=this.appUrl+'/WS/IdeaElanService.svc/GetWorkOrdersByUserIdByDateRange';
     
      this.endDate=new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();
      //new Date(new Date().setDate(new Date().getDate() + 7)).toISOString();
      this.startDate = new Date(new Date().setDate(new Date().getDate() - 90 )).toISOString();
     });

   

  }
  ionViewDidEnter(){
    
    this.storage.get('userDetails').then((val1) => {
      this.userJson =val1;
      this.sendSampleRequest(); 
    });
    this.storage.get('roleType').then((val) => {
      this.roleType=val;
   });
      
  
  }

  goButtonRequest(){
  
        this.sendSampleRequest();
    
  }

  sendSampleRequest(){
    let loader = this.loading.create({
      spinner:"crescent",
      content:"Loading . . . "
    });
    loader.present();
  
    this.http.post(this.sampleRequestUrl,{ 
      userid:this.userJson.UserId,
      starttime:this.startDate,
      endtime:this.endDate,
      usertoken:this.userJson.UserToken,
      loggedinuser:this.userJson.UserId
  
     })
    .subscribe(
      (data:any) => {
        //RESPONSE
        this.sampleStatus=true;
         let resSTR = JSON.stringify(data);
         let resJSON = JSON.parse(resSTR);
         this.sampleRequestJson=resJSON;
         console.log(resJSON);
         loader.dismiss();
       
        
      },//ERROR HANDLING
      error => {
         this.sampleStatus=false;
         loader.dismiss();
         let resErr = JSON.stringify(error);
         let resErrJSON = JSON.parse(resErr);
        
       
      }
    );
  }
  sampleDetail(sampleJson){




//  this.navCtrl.push(SampledetailPage,{"sampleJson":sampleJson});
 




  if(this.roleType=="user"||this.roleType=="providerAdmin")
  { 
if(this.roleType=="user")
{
 if(this.userJson.UserId!=sampleJson.UserId)
 {
   this.showdetail(sampleJson);
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
     this.navCtrl.push(MessagePage, {"WorkOrderId":`${sampleJson.WorkOrderId}`,"id":"user","ProviderId":`${sampleJson.ProviderId}`,"source":` ${sampleJson.RollNumber}`,"chatType":`SampleSubmission`});
   }
  else if(this.roleType=="providerAdmin"){
     this.navCtrl.push(MessagePage, {"WorkOrderId":`${sampleJson.WorkOrderId}`,"id":"providerAdmin","ProviderId":`${sampleJson.ProviderId}`,"source":` ${sampleJson.RollNumber}`,"chatType":`SampleSubmission`});
   }
         }
       },
       {
         text: 'Details',
         role: 'destructive',
         cssClass: 'myActionSheetBtnStyle',
         handler: () => {
          this.navCtrl.push(SampledetailPage,{"sampleJson":sampleJson});
         }
       },
     ]
   })
   actionSheet.present();
 }else{
   
  this.showdetail(sampleJson);
 }

}
showdetail(sampleJson)
  { let actionSheet = this.actionctrl.create({
    title: 'Select Options',
    cssClass: 'myPage',
    buttons: [
      {
       
        text: 'Details',
        role: 'destructive',
        cssClass: 'myActionSheetBtnStyle',
        handler: () => {
          this.navCtrl.push(SampledetailPage,{"sampleJson":sampleJson});
        }
      },
    ]
  })
  actionSheet.present();
return;
}

   toast(toastStr: string) {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      message: toastStr,
      buttons: ['OK']
    });
    alert.present();
  }

  enddatetime(event) {
    this.startDate = moment(this.startDate).toISOString(true)
    this.endDate = moment(this.endDate).toISOString(true);
    if (!moment( this.endDate).isAfter(this.startDate) ) {
      this.endDate=new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();
      let alert = this.alertCtrl.create({
        title: "Alert",
        message: "Selected date cannot be before to start date.",
        buttons: ['OK']
      });
      alert.present();
    }
    
    //this.endDate = moment(this.navParams.get("endDate")).toISOString(true);
  }
  startdatetime(event) {
    if (this.startDate > this.endDate) {
      this.startDate = new Date(new Date().setDate(new Date().getDate() - 90 )).toISOString();

      this.showAlert("Start date cannot be after End Date.")
       return false
    }
  }

  showAlert(eventdata) {
    const alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: eventdata,
      buttons: ['OK']
    });
    alert.present();
  }
}
