import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { SigninPage } from '../signin/signin';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
//Created by Anto Rupak
export class SignupPage {
  fname: string;
  lname: string;
  email: string;
  password: string;
  cpassword: string;
  appUrl: string;
  signupUrl: string;
  regexp:any
  regexpem:any
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient,
    public loading: LoadingController, public storage: Storage, public alertCtrl: AlertController) {
     
     this.regexpem=new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
   this.regexp= new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,10}$');
    }

  ionViewDidLoad() {
    this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.signupUrl = this.appUrl + '/WS/IdeaElanService.svc/InsertUpdateUser';
    });
  }
  registerUser() {
    /* Modified by Abey Abraham */
    if (this.fname == null || this.lname == null || this.email == null || this.password == null || this.cpassword == null) {
      this.alert("Please Enter all the required fields.")
      return false;
    }
    if (this.password != this.cpassword) {
      this.alert("Password Mismatch")
      return false;
    }
    if(this.regexpem.test(this.email)==false)
    {
      this.alert("Enter a valid email address ")
      return false
    }
    if(this.regexp.test(this.password)==false)
    {
      this.alert("Enter a valid password ")
      return false
    }
  

  
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Signing Up..."
    });
    loader.present();

    this.http.post(this.signupUrl,
      {
        firstname: this.fname,
        lastname: this.lname,
        emailaddress: this.email,
        userid: "0",
        password: this.cpassword,
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        phone: "",
        syncreservation: ""
      })
      .subscribe(
        (data: any) => {
          //RESPONSE
          
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.alert("Registration successful. Click the verification link sent to your email to confirm registration.")
    
          this.navCtrl.push(SigninPage)
          loader.dismiss();
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

        }
      );
  }
  alert(toastStr: string) {
    let alert = this.alertCtrl.create({
      title:'Alert',
      message: toastStr,
      buttons: ['Ok']
    });
    alert.present();
  }
  signIn() {
    this.navCtrl.push(SigninPage)
  }
}
