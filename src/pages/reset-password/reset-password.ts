import { NertworkrequestProvider } from './../../providers/nertworkrequest/nertworkrequest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { MessageProvider } from '../../providers/message/message';

//Created by Anto rupak & Modification By Sumit

/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  passwordResetForm= new FormGroup({
    email:new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])

    })
  emailId: any;
  appUrl:string;
  emailShow:boolean=true;
  resetPasswordUrl:string;
 
  constructor(public network:NertworkrequestProvider,public navCtrl: NavController, public navParams: NavParams,public http: HttpClient,
     public loading: LoadingController,public storage: Storage, public alertCtrl: AlertController,public message:MessageProvider) {
  }
 
  ionViewDidLoad() {
    this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.resetPasswordUrl = this.appUrl + '/WS/IdeaElanService.svc/ResetPassword';

    
    });
   
  }
closePage(){
  this.navCtrl.pop();
}

  changePassword(){
    if (this.passwordResetForm.get('email').hasError('required')||this.passwordResetForm.get('email').hasError('pattern'))
    {

      this.emailShow=false;
    }
    else
    {
      this.emailShow=true;
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Registering Device"
    });
 
    this.http.post(this.resetPasswordUrl,
      {
        username: this.emailId,
        password: "",
      })
      .subscribe(
        (data: any) => {
          //RESPONSE  
          this.emailId="";
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
        
         if(resJSON== "success"){
          this.message.showMessage("Message","Password change link has been sent to your mail address")
         }else{
          this.message.showMessage("Alert","Email not found !")
         }
         
        },//ERROR HANDLING
        error => {

          loader.dismiss();

        }
      );
    }
  }
  
}
