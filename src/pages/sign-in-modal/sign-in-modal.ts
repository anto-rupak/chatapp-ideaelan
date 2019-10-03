/* Created by Abey Abraham */
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { AlertController } from 'ionic-angular';
import { InstrumentSearchPage } from '../instrument-search/instrument-search';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { SignupPage } from '../signup/signup';
import { PinPage } from '../pin/pin';
import { FcmProvider } from '../../providers/fcm/fcm';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  ActivitylogsProvider} from '../../providers/activitylogs/activitylogs';
import { MessageProvider } from '../../providers/message/message';

/**
 * Generated class for the SignInModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-in-modal',
  templateUrl: 'sign-in-modal.html',
})
export class SignInModalPage {
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
  private todo : FormGroup;
  randomNumber:string;
  pinResponse:any;
  phoneNumber:string;
  updatePhoneNumber:string;
  internalDomain:string;
  IsSSOEnabled:string
  isPhoneNumber:boolean;
  updatePhoneNumberUrl:string;
  sendEmailUrl:string
  emailMessage:string;
  emailSubject:string;
  phoneMessage:string;
  isLoginAll:boolean;
  userResponseJson:any;
  otpMessage:string;
  otp:string;
  regexpem:any;
  isOtp = false;
  placeholderText:string;
  pagetypeval:any;
  userJson:any;
  searchval:any;
  updatePhoneRequestButton:any;
  constructor( public view : ViewController,public message:MessageProvider,public navCtrl: NavController, public fcm: FcmProvider, public navParams: NavParams,
    public storage: Storage, public loading: LoadingController, public http: HttpClient, public toastCtrl: ToastController,
    public device: Device, public alertCtrl: AlertController,private formBuilder: FormBuilder, public logs : ActivitylogsProvider) {
  }

  ionViewDidLoad() {
    //Modified by Anto Rupak
    this.isLoginAll =true;
  
    this.isPhoneNumber = false;
    this.regexpem=new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
    
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
      this.sendEmailUrl =this.appUrl+'/WS/IdeaElanService.svc/SendEmail';
 

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
this.pagetypeval=this.navParams.get('pagename');
this.searchval=this.navParams.get('searchval');


  }
  ionViewDidEnter() {
    
  }
  postData() {
    if(this.isOtp){
      if (this.otp == null || this.username == null || this.otp == "" || this.username == "") {
        this.message.showMessage('Alert','Please Enter the OTP');
  
      } else {
        
            this.sendOtp();
        } 
    }
    else{
      if (this.password == null || this.username == null || this.password == "" || this.username == "") {
        this.message.showMessage('Alert','Enter the Credentials');
  
      } else {
        
          this.sendRequest(this.username, this.password);
        }
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
          if(this.isOtp){
         this.phoneEmailOtpRequest();
        }else{
          this.sendToNaviPage();
        }
        },//ERROR HANDLING
        error => {

          loader.dismiss();

          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);
          if (resErrJSON.status == 400) {
            if(this.isOtp){
              this.message.showMessage('Alert','Please check the username');
            }else{
              this.message.showMessage('Alert',resErrJSON.statusText);
            }
          }
        }
      );
  }

  phoneEmailOtpRequest(){

    this.randomNumber = String(100000 + Math.floor(Math.random() * 999999));
    this.storage.set('otp',this.randomNumber);

    if(this.phoneNumber.toLowerCase().includes('ext')){
            
      this.sendEmailRequest(this.username,"mail")
     }else{

       this.phoneNumber =this.phoneNumber.replace(/[^0-9]/g, '');
       
       if(this.phoneNumber.length > 11){
        
       
        this.sendingOtpRequest();
       }else{
       
         this.isLoginAll = false;
         this.isPhoneNumber = true
       
       }
     }
    
  }
sendingOtpRequest(){

    this.otpMessage = "Enter the code " + this.randomNumber + " where prompted in the IE Infinity mobile app";
    this.phoneMessage = 'Verification Code has been sent to your registered email address : &nbsp; <b>' + this.username + '</b> and phone : <b>' + this.phoneNumber + '</b>. Please enter the verification code to login';
    var smsurl = "https://platform.clickatell.com/messages/http/send?apiKey=IimV6RBFR2eit558aiGF7g==&to=" + this.phoneNumber + "&content=" + this.otpMessage;
    this.http.get(smsurl)
    .subscribe(
      (data:any) => {
        let resjSON = JSON.stringify(data);
         let result = JSON.parse(resjSON);
         
       if(result.messages[0].accepted){
          this.sendEmailRequest(this.username,'phone')
       }else{
        this.sendEmailRequest(this.username,'mail')
       }
    
      },//ERROR HANDLING
      error => {
  
         let resErr = JSON.stringify(error);
         let resErrJSON = JSON.parse(resErr);
        
       //  this.barcode=resErr;
         if(resErrJSON.status == 400){
         
         }
       
      }
    );

}
sendToNaviPage(){
  let loader = this.loading.create({
    spinner: "crescent",
    content: "Signing In"
  });

  this.storage.set('devicetoken', this.tok);
  this.userId = this.userResponseJson.UserId;
  this.userToken = this.userResponseJson.UserToken;

  if(!this.userResponseJson.hasOwnProperty('UserRole')){
    this.storage.set('roleType', "user");
    loader.present().then(() => {
      return this.sendRegisterDeviceRequest();
    }).then(() => {
      return this.sendDetailsRequest();
    }).then(() => { loader.dismiss() });
  }else{
  this.storage.set('userRole', this.userResponseJson.UserRole);
  if (this.roleType.includes("Super Admin")) {
    this.storage.set('roleType', "super");
  } else if (this.roleType.includes("Institution Admin")) {
    this.storage.set('roleType', "admin");
  } else if (this.roleType.includes("Provider Admin")) {
    this.storage.set('roleType', "providerAdmin");    
  } else if (this.roleType.includes("Group Admin")) {
    this.storage.set('roleType', "labAdmin");
  } else if (this.userResponseJson.UserRole.includes("User")) {
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
  sendOtp(){
    this.storage.get("otp").then((confirmOtp) => {
      if (confirmOtp == this.otp) {
       this.sendToNaviPage();
      } else {
        this.message.showMessage('Alert','Please the Enter the Valid OTP ! ');
      }

    });
    

  }


  changeIsLogin() {
    this.otp = '';
    this.updatePhoneNumber = null;
    this.isLoginAll = true;
    this.isPhoneNumber = false;
    if(this.isOtp){
      this.isOtp = true;
    }else{
      this.isOtp = false;
    }
  }


  sendEmailRequest(username:string,type:string) {
    this.emailSubject = "IE Infinity Verification Code";
    this.emailMessage = 'Verification Code has been sent to your registered email address <b>' + this.username+'</b>. Please enter the verification code to login';
    this.otpMessage = "Enter this code where prompted in the IE Infinity mobile app <br/><br/><h3>" + this.randomNumber + "</h3>";
    let loader = this.loading.create({
      spinner:"crescent",
      content:"Sending OTP . . ."
    });
    loader.present();
   
    //SEDNING REQUEST
    this.http.post(this.sendEmailUrl,
      {
        emailaddress:username,
        emailmessage:this.otpMessage,
        emailsubject: this.emailSubject

      })
      .subscribe(
        (data: any) => {
          loader.dismiss();
          this.isLoginAll = true;
          this.isPhoneNumber = false;
          if(type=='mail'){
            this.message.showMessage('Message',this.emailMessage);
          }
          else{
            this.message.showMessage('Message',this.phoneMessage);
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
    
  }else{
   this.message.showMessage('Message','Please Enter the Phone Number ');
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
    this.updatePhoneNumberUrl = this.appUrl+'/WS/IdeaElanService.svc/UpdateUserPhone';
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Updating Phone Number . . ."
    });
     loader.present();

    //SEDNING REQUEST
    this.http.post(this.updatePhoneNumberUrl,
      {
        email: this.username,
        phone:this.updatePhoneNumber

      })
      .subscribe(
        (data: any) => {
          this.isLoginAll =true;
          this.isPhoneNumber = false;
          loader.dismiss();
          this.updatePhoneNumber = null;
          this.message.showMessageButton("Message","Phone number has been updated",this.updatePhoneRequestButton);
          
         
        },//ERROR HANDLING
        error => {
          this.isLoginAll =true;
          this.isOtp = false;
          this.isPhoneNumber = false;
          loader.dismiss();
          this.updatePhoneNumber= null;
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

          this.storage.set('userDetails', this.userDetailsJson);
          this.navCtrl.push(InstrumentSearchPage,
            {
              loginStatus:"success",
              searchval:`${this.searchval}`
            }) .then(() => {
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

  cancel(){
    this.view.dismiss();
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
  emailChange(){
    if(this.regexpem.test(this.username)==false || this.username==null || this.username=='')
    {
      
      this.isOtp = false
      
      this.message.showMessage('Alert',"Enter a valid email address ")
      return false
    }else{
      if(this.username.toLowerCase().indexOf(this.internalDomain) > 0 && this.IsSSOEnabled=="true"){
         this.isOtp = true;
         this.otp = '';
         this.sendRequest(this.username, "");
    }else{
         this.isOtp = false
    }
    }
  }
}