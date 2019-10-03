/* Modified by Abey Abraham */
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import {AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the PasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage {
  appUrl: string;
  updateDetailsUrl:string;
  userJson:any;
  emptyString:boolean;
  username:string;
  userEmail: string;
  password:string;
  cpassword:string;
  regexp:any
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,public http: HttpClient,
    private alertCtrl: AlertController,public loading: LoadingController,) {
      /* Modified by Abey Abraham */
      this.regexp= new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,10}$');
  }

  ionViewDidLoad() {
    this.userEmail = this.navParams.get('useremail');
    this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.updateDetailsUrl = this.appUrl + '/WS/IdeaElanService.svc/ResetPassword';
    });
    this.storage.get('userDetails').then((val1) => {
      this.userJson = val1;
    });
    this.emptyString = false;
   
  }

  sendUpdateRequest() {
    /* Modified by Abey Abraham */
    if(this.password == null ||this.cpassword == null ){
      this.alert("Please Enter all the required fields.")
      return false;
   }
   if(this.regexp.test(this.cpassword)==false)
   {
     this.alert("Enter a valid password ")
     return false
   }
   if(this.password != this.cpassword  ){
    this.alert(" There should not be mismatch in password")
    return false;
 }
 
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Updating . . ."
    });
    loader.present();
    //SEDNING UPDATE REQUEST
    this.http.post(this.updateDetailsUrl,
      {
        username:this.userEmail,
        password: this.password,

      })
      .subscribe(
        (data: string) => {
          //RESPONSE
          loader.dismiss();
        
          this.alert("Updated Successfully");
          this.password="";
           this.cpassword="";
        },//ERROR HANDLING
        error => {
          loader.dismiss();
          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);
          if (resErrJSON.status == 500) {
            this.alert(resErrJSON.statusText)
          } else if (resErrJSON.status == 400) {
            this.alert('Internal server error')
          }
this.password="";
this.cpassword="";

        }
      );
  }
  alert(toastStr: string) {
    let alert = this.alertCtrl.create({
      title:"Message",
      message: toastStr,
      buttons: ['Ok']
    });
    alert.present();
  }

}
