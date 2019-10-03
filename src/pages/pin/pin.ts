/**
 * Created By Sumit Rajpal
 */
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController} from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-pin',
  templateUrl: 'pin.html',
})
export class PinPage {

pin: string;
  result: any = [];
  passcode: any;
  pageStatus: any;
  codeone: any;
  codetwo: any;
  codethree: any;
  codefour: any;
  codefive: any;
  int: any;
  newPincount: any;
  message: boolean = true;
  finalPin: any;
  fingerPin: any;

  constructor(public platform:Platform,public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
    public http: HttpClient, public alertCtrl: AlertController, public loading: LoadingController,) {
    this.passcode = '';
    this.finalPin = '';
    this.message = true;
    this.int = 0;
    this.newPincount = 0;
    this.fingerPin = false;
    this.platform.registerBackButtonAction(() => {

    });
  }

  ionViewDidLoad() {

  }

  sendPinRequest(event) {
    this.pin = event;
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Logging in . . ."
    });
    loader.present();
    this.http.post(`https://secure2.ideaelan.com/WS/IdeaElanService.svc/GetClientDetails`,
      {
        code: this.pin
      }).subscribe(
        (data: any) => {

          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
        
          this.storage.set('appLink', resJSON.APILink);
          this.storage.set('pinResponse', resJSON);
          console.log("pin",resJSON);
          console.log("pin",this.pin);
          //Modified by Anto Rupak
          this.storage.set('pin', this.pin)
          this.storage.set('InsitutionName', resJSON.InstitutionName)
          this.storage.set('InternalDomain', resJSON.InternalDomain)
          this.storage.set('IsSSOEnabled', String(resJSON.IsSSOEnabled));
       
          this.storage.set('clientImage',resJSON.ImageUrl)
          this.result = data;
          loader.dismiss()
          this.navCtrl.push(SigninPage);
        },
        error => {
          loader.dismiss()
          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);

          if (resErrJSON.status == 500) {
            this.message = false;
            
            return;
          }
          if (resErrJSON.status == 400) {

            //this.sendRequest();
            // loader.dismiss();
          }
        }
      );

  }




  add(value) {
    if (this.passcode.length < 5) {
      this.passcode = this.passcode + value;
      if (this.int == 0) {
        this.codeone = value;
        this.int++
      } else if (this.int == 1) {
        this.codetwo = value;
        this.int++
      } else if (this.int == 2) {
        this.codethree = value;
        this.int++
      } else if (this.int == 3) {
        this.codefour = value;
        this.int++
      } else if (this.int == 4) {
        this.codefive = value;
        this.int++
      }

      if (this.passcode.length == 5) {
        this.sendPinRequest(this.passcode)
        this.message = true;
      }
    }

  }

  delete() {
    if (this.passcode.length > 0) {
      if (this.passcode.length == 1) {
        this.codeone = null
        this.int--
      } else if (this.passcode.length == 2) {
        this.codetwo = null;
        this.int--
      } else if (this.passcode.length == 3) {
        this.codethree = null;
        this.int--
      } else if (this.passcode.length == 4) {
        this.codefour = null;
        this.int--
      } else if (this.passcode.length == 5) {
        this.codefive = null;
        this.int--
      }
      this.passcode = this.passcode.substr(0, this.passcode.length - 1);
    }
    if(this.passcode.length <= 0){
      this.message = true
    }
      
   
  }
}
