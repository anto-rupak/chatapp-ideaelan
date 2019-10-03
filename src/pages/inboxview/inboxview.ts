import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import * as moment from 'moment';
import { PIinboxPage } from '../p-iinbox/p-iinbox';
import { NotificationProvider } from '../../providers/notification/notification';
import {  ActivitylogsProvider} from '../../providers/activitylogs/activitylogs';
/**
 * Generated class for the InboxviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inboxview',
  templateUrl: 'inboxview.html',
})
export class InboxviewPage {
  InvoiceNumber:string;
  TotalAmount:string;
  Status:string;
  CreatedDate:string;
  appUrl:string;
  userJson:any;
  emptyString:boolean;
  getInvoiceDetailsUrl:string;
  userInvoiceDetailsJson:any;
  userInvoiceJson:any;
  invoiceid:string;
  checkStatus:boolean = false;
  InvoiceUpdateJson:any;
  updateInvoiceUrl:string;
  labId:string;

  constructor(public logs : ActivitylogsProvider,public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController,public storage: Storage,
    public loading: LoadingController,public http:HttpClient,public platform:Platform,private alertCtrl: AlertController,
    public actionctrl:ActionSheetController,public notification: NotificationProvider) {

      
  }

  ionViewDidLoad() {
    this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.getInvoiceDetailsUrl = this.appUrl + '/WS/IdeaElanService.svc/GetInvoiceDetailsByInvoiceId';
      this.updateInvoiceUrl=this.appUrl+'/WS/IdeaElanService.svc/UpdateInvoicePaymentStatus';
      this.userInvoiceJson=this.navParams.get("invoicUserJson");
      this.labId=this.navParams.get("labId");
    });
    this.storage.get('userDetails').then((val1) => {
      this.userJson = val1;
    });
  }
  ionViewDidEnter(){
   this.Status=this.userInvoiceJson.Status;
   if(this.userInvoiceJson.Status=="Approved" || this.userInvoiceJson.Status=="Payment Received (Partially)" )  {
    this.checkStatus= true;
  }
  else if(this.userInvoiceJson.Status=="Dispatched")
  {
  this.checkStatus=false;
  }
   this.InvoiceNumber=this.userInvoiceJson.InvoiceNumber;
   this.TotalAmount=this.userInvoiceJson.TotalAmount;
   this.sendInvoiceRequest();
}


  sendInvoiceRequest() {
    this.http.post(this.getInvoiceDetailsUrl, {
      invoiceid:this.userInvoiceJson.InvoiceId,
      userid:this.userJson.UserId,
      usertoken:this.userJson.UserToken,
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.emptyString=false;
          this.userInvoiceDetailsJson = resJSON;
        //  loader.dismiss();
        },//ERROR HANDLING
        error => {
          let resErr = JSON.stringify(error);
         
    
        }
      );
  }


  invoiceRequest(){
  this.logs.insertlog("Invoice Approval ","PI Inbox View page","clicked Approve button ",`user approved invoice with invoice number : ${this.userInvoiceJson.InvoiceNumber} `,this.userJson.UserId);
    this.notification.getUserDeviceDetails("facilityadmin",this.userInvoiceJson.ProviderId, "INV", ` invoice number : ${this.userInvoiceJson.InvoiceNumber} has been approved `, "Invoice approved");
      this.updateInvoiceRequest(this.userInvoiceJson.InvoiceId,"Approved",this.labId);
      
  
}
  
    updateInvoiceRequest(invoiceid:string, status:string, groupId:string){
    let loader = this.loading.create({
      spinner:"crescent",
      content:"Loading . . . "
    });
    loader.present();
    this.http.post(this.updateInvoiceUrl,{ 
    invoiceid:invoiceid,
    status:status,
    paiddate:moment().format("MM/DD/YYYY"),
    labid:groupId,
    user: this.userJson.EmailAddress,
    note: ""
     })
    .subscribe(
      (data:any) => {
        //RESPONSE
         let resSTR = JSON.stringify(data);
         let resJSON = JSON.parse(resSTR);
        this.InvoiceUpdateJson=resJSON;
         this.notification.getUserDeviceDetails("facilityadmin","0","INV",`Invoice Number : ${this.userInvoiceJson.InvoiceNumber} has been approved`,"Invoice Approved");
         loader.dismiss();
         
         let alert = this.alertCtrl.create({
          title: 'Message',
          subTitle: 'Status Updated Successfully!',
          buttons: ['OK']
      });
      alert.present();

         this.navCtrl.push(PIinboxPage)
         
      },//ERROR HANDLING
      error => {
  
         loader.dismiss();
        
      }
    );
  }
}
