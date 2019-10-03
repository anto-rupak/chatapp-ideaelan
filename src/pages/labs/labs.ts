import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import {  ActivitylogsProvider} from '../../providers/activitylogs/activitylogs';
/**
 * Generated class for the LabsPage page Anto Rupak.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// Created by Anto Rupak
@IonicPage()
@Component({
  selector: 'page-labs',
  templateUrl: 'labs.html',
})
export class LabsPage {
  appUrl: string;
  fullUrl: string;
  getLabUrl: string;
  getLabAccessUrl: string;
  userJson: any;
  userLabJson: string;
  emptyString: boolean;
  userType: boolean;
  getDashboardUrl: string;
  getFacilityDashboardUrl: string;
  userLabUpdateJson: string;
  labJson: any;
  searchText:any;

  constructor( public logs : ActivitylogsProvider,public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
    public http: HttpClient, public loading: LoadingController, public actionctrl: ActionSheetController, private alertCtrl: AlertController) {
    
    }

  ionViewDidLoad() {
    this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.getLabUrl = this.appUrl + '/WS/IdeaElanService.svc/GetAllLabs';
      this.getLabAccessUrl = this.appUrl + '/WS/IdeaElanService.svc/InsertLabAccessRequest';

    });
    this.storage.get('userDetails').then((val1) => {
      this.userJson = val1;
    });
  
  }

  ionViewDidEnter() {

    this.storage.get('userDetails').then((val1) => {
      this.userJson = val1;

      if (this.userJson.UserId != "" || this.userJson.UserId != null) {
        this.sendLabRequest();
        this.logs.insertlog("Labs","Menu Page","Labs Menu ","User clicked Labs part in the menu page",this.userJson.UserId);

      } else {
        this.navCtrl.push(MenuPage);

      }
    })

  }
  ionViewCanLeave() {

    this.navCtrl.popToRoot();

  }
  sendLabRequest() {


    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    loader.present();

    this.http.post(this.getLabUrl, {
      userid: this.userJson.UserId,
      usertoken: this.userJson.UserToken,
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.userLabJson = resJSON;
          // search bar to find objects
          this.labJson = resJSON;
          loader.dismiss();
        },//ERROR HANDLING
        error => {

          loader.dismiss();
          let resErr = JSON.stringify(error);
       


        }
      );
  }

  alertRequest(actionJson: any) {
    let alert = this.alertCtrl.create({
      title: 'Request Access',
      message: 'Are you sure you want to request access.',
      buttons: [
        {
          text: 'OK',
          role: 'destructive',
          handler: () => {
            this.updateLabRequest(actionJson.GroupId);
          }
        },
        {
          text: 'Cancel',
          role: 'destructive',
          handler: () => {

          }
        },
      ]
    })
    alert.present();
  }

  updateLabRequest(labId: string) {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    loader.present();

    this.http.post(this.getLabAccessUrl, {
      userid: this.userJson.UserId,
      labid: labId,
      user: this.userJson.LastName,
      isactive: "-1"
    })
      .subscribe(
        (data: any) => {
          //RESPONSE

          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.userLabUpdateJson = resJSON;
          loader.dismiss();
          this.logs.insertlog("Labs Request  ","Labs Page ",`use requested access for lab ${labId}   `,`use requested access for lab ${labId}  by clicking on the lab which is listed in the labs page  `,this.userJson.UserId);
          if (resJSON == "Success") {
            let alert = this.alertCtrl.create({
              title: 'Lab Access',
              message: 'Access Requested Successfully',
              buttons: ['Dismiss']
            });
            alert.present();
          } else if (resJSON == "-1") {
            let alert = this.alertCtrl.create({
              title: 'Lab Access',
              message: 'Already Requested',
              buttons: ['Dismiss']
            });
            alert.present();
          }

          //   this.sendLabRequest();
        },//ERROR HANDLING
        error => {

          loader.dismiss();
          let resErr = JSON.stringify(error);
      


        }
      );
  }

  doRefresh(refresher) {
  
    this.searchText = ""
    this.sendLabRequest();
    setTimeout(() => {
 
      refresher.complete();
    }, 2000);
  }

  getItems(searchbar) {



    var q= this.searchText
    if (!q) {
      this.sendLabRequest()
      return true;
    }

    this.userLabJson = this.labJson.filter((v) => {
      if (v.GroupName && q) {
        if (v.GroupName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }

    });
  }

}