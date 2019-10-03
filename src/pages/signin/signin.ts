/**
 * Created By Sumit Rajpal
 */
import { Platform } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { Device } from '@ionic-native/device';
import { AlertController } from 'ionic-angular';
import { InstrumentSearchPage } from '../instrument-search/instrument-search';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { SignupPage } from '../signup/signup';
import { PinPage } from '../pin/pin';
import { FcmProvider } from '../../providers/fcm/fcm';
import {  FormBuilder, FormGroup } from '@angular/forms';
import { ActivitylogsProvider } from '../../providers/activitylogs/activitylogs';
import { MessageProvider } from '../../providers/message/message';
import { AnyARecord } from 'dns';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/';
@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  tok: string;
  token: string
  username: string;
  password: string;
  appUrl: string;
  fullUrl: string;
  notificationUrl: string;
  getDetails: string;
  registerDevice: string;
  deviceModel: string;
  deviceSerial: string;
  devicePlatform: string;
  deviceVersion: string;
  deviceId: string;
  userToken: string;
  userId: string;
  userDetailsJson: any;
  result: any = [];
  data: Observable<any>;
  roleType: string;
  insitutionName: any;
  instance: string;
  private todo: FormGroup;
  randomNumber: string;
  pinResponse: any;
  phoneNumber: string;
  updatePhoneNumber: number;
  internalDomain: string;
  IsSSOEnabled: string
  isPhoneNumber: boolean;
  updatePhoneNumberUrl: string;
  sendEmailUrl: string
  emailMessage: string;
  emailSubject: string;
  phoneMessage: string;
  isLoginAll: boolean;
  userResponseJson: any;
  otpMessage: string;
  otp: string;
  regexpem: any;
  regexphone: any;
  isOtp = false;
  placeholderText: string;
  pagetypeval: any;
  userJson: any;
  searchval: any;
  checkUrl:string;
  updatePhoneRequestButton: any;
  clientType:any;
  ImageUrl:any;
  userLogout:any;
  FToken:any;
  hid:any;
  btn_cont:any;
  constructor(private faio: FingerprintAIO,private platform: Platform, public message: MessageProvider, public navCtrl: NavController, public fcm: FcmProvider, public navParams: NavParams,
    public storage: Storage, public loading: LoadingController, public http: HttpClient, public toastCtrl: ToastController,
    public device: Device, public alertCtrl: AlertController, private formBuilder: FormBuilder, public logs: ActivitylogsProvider) {
      this.hid=true;
      this.btn_cont="";
    this.platform.registerBackButtonAction(() => {

    });


    storage.ready().then(() => {
    });

  }

  ionViewDidLoad() {


     this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.fullUrl = this.appUrl + '/WS/IdeaElanService.svc/ValidateLogin';
      this.getDetails = this.appUrl + '/WS/IdeaElanService.svc/GetUserDetails';
      this.registerDevice = this.appUrl + '/WS/IdeaElanService.svc/RegisterDevice';
      this.notificationUrl = this.appUrl + '/WS/IdeaElanService.svc/GetMobileAppNotifications';
      this.sendEmailUrl = this.appUrl + '/WS/IdeaElanService.svc/SendEmail';


    });
  
    //Modified by Anto Rupak
    this.isLoginAll = true;

    this.isPhoneNumber = false;
    this.regexpem = new RegExp('^[a-zA-Z_0-9._%+-]+@[a-zA-Z_0-9.-]+\\.[a-zA-Z_0-9]{2,4}$');
    this.storage.get("clientImage").then((details)=>{

      if(details == null || details == undefined || details == ""){
        this.ImageUrl="assets/imgs/splash.png"
      }else{
        this.ImageUrl = details;
      }
    
      
    })
   
    this.storage.get("InsitutionName").then((name) => {
      if (name == null) {
        this.navCtrl.push(PinPage)
      } else {
        this.insitutionName = name;

      }

    });

    this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.fullUrl = this.appUrl + '/WS/IdeaElanService.svc/ValidateLogin';
      this.getDetails = this.appUrl + '/WS/IdeaElanService.svc/GetUserDetails';
      this.registerDevice = this.appUrl + '/WS/IdeaElanService.svc/RegisterDevice';
      this.notificationUrl = this.appUrl + '/WS/IdeaElanService.svc/GetMobileAppNotifications';
      this.sendEmailUrl = this.appUrl + '/WS/IdeaElanService.svc/SendEmail';

      if (this.appUrl.includes('/NMI')) { this.clientType = 'nmi' } else
        if (this.appUrl.includes('/uq')) { this.clientType = 'uq' } else
          if (this.appUrl.includes('/caltech')) { this.clientType = 'caltech' }
          this.storage.set('clientType', this.clientType)
    });
    this.storage.get('InternalDomain').then((val) => {
      this.internalDomain = val;
    });
    this.storage.get('IsSSOEnabled').then((val) => {
      this.IsSSOEnabled = val;
    });


 
    this.deviceModel = this.device.model;
    this.devicePlatform = this.device.platform;
    this.deviceSerial = this.device.serial;
    this.deviceId = this.device.uuid;
    this.deviceVersion = this.device.version;
    this.pagetypeval = this.navParams.get('pagename');
    this.searchval = this.navParams.get('searchval');

    this.storage.get("userLogout").then((name) => {
      this.userLogout=name;
    });
    //alert(`logout:${this.userLogout}`);
    this.storage.get("FToken").then((name) => {
      this.FToken=name;
    });
     
   // alert(`token:${this.FToken}`);
    if(this.FToken==false || this.FToken==null ){
      this.hid=true;
      //alert("true");
    }
    else{
      this.hid=false; 
      //alert("false");
    }
   
  this.btn_disp_avail();
   
  }
  ionViewDidEnter() {
    
    this.storage.get("userLogout").then((name) => {
      this.userLogout=name;
    });
    //alert(`logout:${this.userLogout}`);
    this.storage.get("FToken").then((name) => {
      this.FToken=name;
    });
     
   // alert(`token:${this.FToken}`);
    if(this.FToken==false || this.FToken==null ){
      this.hid=true;
      //alert("true");
    }
    else{
      this.hid=false; 
      //alert("false");
    }
   
  }
  postData() {
    if (this.isOtp) {
      if (this.otp == null || this.username == null || this.otp == "" || this.username == "") {
        this.message.showMessage('Alert', 'Please Enter the OTP');

      } else {

        this.sendOtp();
      }
    }
    else {
      if (this.password == null || this.username == null || this.password == "" || this.username == "") {
        this.message.showMessage('Alert', 'Enter the Credentials');

      } else {

        this.sendRequest(this.username, this.password);
      }
    }

  }

  authpostData(){
if(this.userLogout==true && this.FToken==true){
 
    this.showFingerPrintDialog()
  
}
    
  }


  //REQUEST METHOD
  sendRequest(m_username: string, m_password: string) {

    let loader = this.loading.create({
      spinner: "crescent",
      content: "Signing In"
    });
    // loader.present();

    //SEDNING REQUEST
    this.http.post(this.fullUrl,
      {
        username: m_username,
        password: m_password

      })
      .subscribe(
        (data: any) => {
          //RESPONSE

          loader.dismiss();
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.userResponseJson = resJSON;

          this.roleType = resJSON.UserRole;
          this.phoneNumber = resJSON.Phone;
          if (this.isOtp) {
            this.phoneEmailOtpRequest();
          } else {
            this.sendToNaviPage();
          }
        },//ERROR HANDLING
        error => {

          loader.dismiss();

          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);
          if (resErrJSON.status == 400) {
            if (this.isOtp) {
              this.message.showMessage('Alert', 'Please check the username');
            } else {
              this.message.showMessage('Alert', 'Error Processing Request ');
            }
          }
        }
      );
  }

  phoneEmailOtpRequest() {

    this.randomNumber = String(100000 + Math.floor(Math.random() * 999999));
    this.storage.set('otp', this.randomNumber);
console.log("otp",this.randomNumber)
    if (this.phoneNumber.toLowerCase().includes('ext')) {

      this.sendEmailRequest(this.username, "mail")
    } else {

      this.phoneNumber = this.phoneNumber.replace(/[^0-9]/g, '');

      if (this.phoneNumber.length > 11) {


        this.sendingOtpRequest();
      } else {

        this.isLoginAll = false;
        this.isPhoneNumber = true

      }
    }

  }
  sendingOtpRequest() {

    this.otpMessage = "Enter the code " + this.randomNumber + " where prompted in the IE Infinity mobile app";
    this.phoneMessage = 'Verification Code has been sent to your registered email address : &nbsp; <b>' + this.username + '</b> and phone : <b>' + this.phoneNumber + '</b>. Please enter the verification code to login';
    var smsurl = "https://platform.clickatell.com/messages/http/send?apiKey=IimV6RBFR2eit558aiGF7g==&to=" + this.phoneNumber + "&content=" + this.otpMessage;
    this.http.get(smsurl)
      .subscribe(
        (data: any) => {
          let resjSON = JSON.stringify(data);
          let result = JSON.parse(resjSON);

          if (result.messages[0].accepted) {
            this.sendEmailRequest(this.username, 'phone')
          } else {
            this.sendEmailRequest(this.username, 'mail')
          }

        },//ERROR HANDLING
        error => {

          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);

          //  this.barcode=resErr;
          if (resErrJSON.status == 400) {

          }

        }
      );

  }
  sendToNaviPage() {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Signing In"
    });

    this.storage.set('devicetoken', this.tok);
    this.userId = this.userResponseJson.UserId;
    this.userToken = this.userResponseJson.UserToken;
  this.storage.set('userLogout',false);
    if (!this.userResponseJson.hasOwnProperty('UserRole')) {
      this.storage.set('roleType', "user");
      loader.present().then(() => {
        return this.sendRegisterDeviceRequest();
      }).then(() => {
        return this.sendDetailsRequest();
      }).then(() => { loader.dismiss() });
    } else {
      this.storage.set('userRole', this.userResponseJson.UserRole);
      if (this.roleType.includes("Super Admin")) {
        this.storage.set('roleType', "super");
      } else if (this.roleType.includes("Institution Admin")) {
        this.storage.set('roleType', "admin");
      } else if (this.roleType.includes("Provider Admin")) {
        this.storage.set('roleType', "providerAdmin");
      } else if (this.roleType.includes("Group Admin")) {
        this.storage.set('roleType', "labAdmin");
      } else {
        this.storage.set('roleType', "user");
      }
      var externalUser = this.userResponseJson.UserRole.includes("External User");

      this.storage.set('userType', externalUser);
      loader.present().then(() => {
        return this.sendRegisterDeviceRequest();
      }).then(() => {
        return this.sendDetailsRequest();
      }).then(() => { loader.dismiss() });
    }
  }
  sendOtp() {
    this.storage.get("otp").then((confirmOtp) => {
      if (confirmOtp == this.otp) {
        this.sendToNaviPage();
      } else {
        this.message.showMessage('Alert', 'Please the Enter the Valid OTP ! ');
      }

    });


  }


  changeIsLogin() {
    this.otp = '';
    this.updatePhoneNumber = null;
    this.isLoginAll = true;
    this.isPhoneNumber = false;
    if (this.isOtp) {
      this.isOtp = true;
    } else {
      this.isOtp = false;
    }
  }


  sendEmailRequest(username: string, type: string) {
    this.emailSubject = "IE Infinity Verification Code";
    this.emailMessage = 'Verification Code has been sent to your registered email address <b>' + this.username + '</b>. Please enter the verification code to login';
    this.otpMessage = "Enter this code where prompted in the IE Infinity mobile app <br/><br/><h3>" + this.randomNumber + "</h3>";
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Sending OTP . . ."
    });
    loader.present();
   
    //SEDNING REQUEST
    this.http.post(this.sendEmailUrl,
      {
        emailaddress: username,
        emailmessage: this.otpMessage,
        emailsubject: this.emailSubject

      })
      .subscribe(
        (data: any) => {
    
          loader.dismiss();
          this.isLoginAll = true;
          this.isPhoneNumber = false;
          if (type == 'mail') {
            this.message.showMessage('Message', this.emailMessage);
          }
          else {
            this.message.showMessage('Message', this.phoneMessage);
          }

        },//ERROR HANDLING
        error => {
          loader.dismiss();
 

        }
      );
  }
updatePhoneButton(){
  if(this.updatePhoneNumber != null){
      
      if(String(this.updatePhoneNumber).length < 11 || String(this.updatePhoneNumber).includes('.')){
       
        
        this.message.showMessage('Alert','Enter the valid Phone Number');
      }else{
        this.sendPhoneUpdateRequest();
      }

    } else {
      this.message.showMessage('Message', 'Please Enter the Phone Number ');
    }
  }
  sendPhoneUpdateRequest() {
    this.updatePhoneRequestButton = [
      {
        text: 'OK',
        handler: () => {
          this.sendRequest(this.username, "");
        }
      }
    ];
    this.updatePhoneNumberUrl = this.appUrl + '/WS/IdeaElanService.svc/UpdateUserPhone';
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Updating Phone Number . . ."
    });
    loader.present();

    //SEDNING REQUEST
    this.http.post(this.updatePhoneNumberUrl,
      {
        email: this.username,
        phone: this.updatePhoneNumber

      })
      .subscribe(
        (data: any) => {
          this.isLoginAll = true;
          this.isPhoneNumber = false;
          loader.dismiss();
     
          this.updatePhoneNumber = null;
          this.message.showMessageButton("Message", "Phone number has been updated", this.updatePhoneRequestButton);


        },//ERROR HANDLING
        error => {
          this.isLoginAll = true;
          this.isOtp = false;
          this.isPhoneNumber = false;
          loader.dismiss();
   
          this.updatePhoneNumber = null;
        }
      );

  }



  //GET USER DETAILS METHOD
  sendDetailsRequest() {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Getting User Details"
    });
    // loader.present();

    //SEDNING REQUEST
    this.http.post(this.getDetails,
      {
        email: this.username

      })
      .subscribe(
        (data: any) => {
          //RESPONSE

          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.userDetailsJson = resJSON;
console.log("user details after post method ",resJSON)
     
          this.storage.set('userDetails', this.userDetailsJson);
          // loader.dismiss();
          //this.navCtrl.push(MenuPage);
         

            this.navCtrl.push(MenuPage)
              .then(() => {
                const startIndex = this.navCtrl.getActive().index - 1;
                this.navCtrl.remove(startIndex, 1);
              });
          }
        ,//ERROR HANDLING
        error => {

          //   loader.dismiss();
       

        }
      );

  }

  //REGISTER DEVICE METHOD
  sendRegisterDeviceRequest() {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Registering Device"
    });
    this.fcm.getToken().then(token => {
    
      this.tok = token;


      this.http.post(this.registerDevice,
        {
          userid: this.userId,
          deviceid: this.deviceId,
          devicetoken: this.tok,
          devicename: this.devicePlatform,
          devicemodel: this.deviceModel,
          deviceversion: this.deviceVersion,
          usertoken: this.userToken
        })
        .subscribe(
          (data: any) => {
            //RESPONSE
           
            let resSTR = JSON.stringify(data);
            let resJSON = JSON.parse(resSTR);
            this.storage.set('userDeviceResponse', resJSON.RegisterDeviceResult);
            //  loader.dismiss(); 
          },//ERROR HANDLING
          error => {
            loader.dismiss();

          }
        );
    });


  }
  //Modifed by Anto Rupak
  searchInstrument() {
    this.navCtrl.push(InstrumentSearchPage)
  }
  //Modifed by Anto Rupak
  resetPassword() {
    this.navCtrl.push(ResetPasswordPage)
  }
  //Modifed by Anto Rupak
  signup() {
    this.navCtrl.push(SignupPage)
  }
  emailChange() {
    if (this.regexpem.test(this.username) == false || this.username == null || this.username == '') {

      this.isOtp = false

      this.message.showMessage('Alert', "Enter a valid email address ")
      return false
    } else {
      if (this.username.toLowerCase().indexOf(this.internalDomain) > 0 && this.IsSSOEnabled == "true") {
        this.isOtp = true;
        this.otp = '';
        this.sendRequest(this.username, "");
      } else {
        this.isOtp = false
      }
    }
  }
//Created by Abey Abraham
  async showFingerPrintDialog()//method for ingerprint Signin
  {
    try{
await this.platform.ready();

const available = await this.faio.isAvailable()



if(available=="finger"|| available=="face"){
  this.faio.show({
    clientId: 'IdeaElan',
    clientSecret: 'IdeaElan', //Only necessary for Android
    disableBackup: false, //Only for Android(optional)
    localizedFallbackTitle: 'Use Pin', //Only for iOS
    localizedReason: 'Please Authenticate' //Only for iOS
}).then((result: any) => {
  

 //alert(`${result}`);
 this.storage.set('userLogout',false);
  this.navCtrl.push(MenuPage).then(() => {
    const startIndex = this.navCtrl.getActive().index - 1;
   this.navCtrl.remove(startIndex, 1);
                                           });
  }

).catch((error: any) => {
  //Fingerprint/Face was not successfully verified

  if(error.message=="minimum SDK version 23 required")
  {
    this.navCtrl.push(MenuPage).then(() => {
      const startIndex = this.navCtrl.getActive().index - 1;
     this.navCtrl.remove(startIndex, 1);
                                             });
  }
 // alert(" error not verified");
  this.navCtrl.push(SigninPage); 
 });


}

else{
  this.storage.set('userLogout',false);
  this.navCtrl.push(MenuPage).then(() => {
    const startIndex = this.navCtrl.getActive().index - 1;
   this.navCtrl.remove(startIndex, 1);
                                           });
}
    







}
    catch(e)
    {
    
      console.error(e);
      if(e.message ==="Cancelled"){
        this.navCtrl.push(SigninPage);    
       }
    
       if(e.message === "minimum SDK version 23 required")
       {
         this.storage.set('userLogout',false);
         this.navCtrl.push(MenuPage).then(() => {
           const startIndex = this.navCtrl.getActive().index - 1;
          this.navCtrl.remove(startIndex, 1);
                                                  });
       }
       
       this.storage.set('userLogout',false);
       this.navCtrl.push(MenuPage).then(() => {
        const startIndex = this.navCtrl.getActive().index - 1;
       this.navCtrl.remove(startIndex, 1);
                                               });
    }
  }

 async btn_disp_avail() // This method is for setting button label for fingerprint/face id authentication
  {
    try{
      await this.platform.ready();
      
      const fin_available = await this.faio.isAvailable()
      if(fin_available=="finger")
      {
        this.btn_cont = "Login with finger print";
      }
      if(fin_available=="face")
      {
        this.btn_cont = "Login with Face ID"
      }
    }
    catch (e)
    {

    }
  }

}