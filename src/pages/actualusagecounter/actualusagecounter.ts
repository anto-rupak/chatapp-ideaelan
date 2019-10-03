import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import Timer from 'easytimer.js';
import * as $ from 'jquery';
import * as moment from "moment";
import { MenuPage } from '../menu/menu';
import { Storage } from '@ionic/storage';
import { LoadingController, AlertController } from 'ionic-angular';
import { MessageProvider } from '../../providers/message/message';
//Created by Anto Rupak
/**
 * Generated class for the ActualusagecounterPage page by Anto Rupak.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-actualusagecounter',
  templateUrl: 'actualusagecounter.html',
})
export class ActualusagecounterPage {
  appUrl: string;
  /*(nav-params variables)*/
  resUserName: string;
  projectId: any;
  labId: string;
  accountCodeId: string;
  sessionId: string;
  adminId: string;
  projectName: string;
  labName: string;
  startTime: any;
  accName: any;
  /*--------------- */
  value: any;
  getInsertUsageUrl: any;
  userJson: any;
  resourceId: any;
  labType: any;
  accountCodeFrom: any;
  sessionName: string;
  adminName: any;
  tagValue: any;
  tagId: any;
  ViewDateValue: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public messages: MessageProvider,
    public storage: Storage, public loading: LoadingController, public http: HttpClient, public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    this.resourceId = this.navParams.get('resourceId');
    this.resUserName = this.navParams.get('User');
    this.projectId = this.navParams.get('ProjectId');
    this.labId = this.navParams.get('labId');
    this.projectName = this.navParams.get('ProjectName');
    this.labName = this.navParams.get('LabName');
    this.accountCodeId = this.navParams.get('AccountCode');
    this.sessionId = this.navParams.get('SessionType');
    this.adminId = this.navParams.get('Admin');
    this.adminName = this.navParams.get('adminName')
    this.labType = this.navParams.get('labType');
    this.accountCodeFrom = this.navParams.get('accountCodeFrom');
    this.sessionName = this.navParams.get('SessionName');
    this.tagValue = this.navParams.get('TagName');
    this.tagId = this.navParams.get('tagId');
    this.accName = this.navParams.get('accName');
    this.startTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    this.ViewDateValue = moment(new Date()).format("MM-DD-YYYY HH:mm:ss")
    this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.getInsertUsageUrl = this.appUrl + '/WS/IdeaElanService.svc/InsertUsage';
    });
    this.storage.get('userDetails').then((val1) => {
      this.userJson = val1;
    });


  }

  ionViewDidEnter() {
    var timer = new Timer();
    timer.start();
    $('#chronoExample .stopButton').click(function (e) {

    });
    $('.stopButton').click(function (e) {
      timer.stop()
    });
    timer.addEventListener('secondsUpdated', function () {
      $('#chronoExample .timer').html(timer.getTimeValues().toString());
    });
    timer.addEventListener('started', function () {
      $('#chronoExample .timer').html(timer.getTimeValues().toString());
    });
    timer.addEventListener('reset', function () {
      $('#chronoExample .timer').html(timer.getTimeValues().toString());
    });
  }

  conformUsage(resourceId) {
    const prompt = this.alertCtrl.create({
      title: 'Confirm',
      message: "Are you sure want to stop Actual Usage.?",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            this.insertActualUsage()
          }
        }
      ]
    });
    prompt.present();
  }

  insertActualUsage() {
    var stoptime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    if (this.projectId === "undefined") {
      this.projectId = "0"
    }
    //timer.stop()
    var misc = "User:" + this.userJson.UserId + "LabId:" + this.labId + "LabType:" + this.labType + "Account Code:"
     + this.accountCodeId + ";" + "From Where:" + "accountCodeFrom:" + this.accountCodeFrom + "ProjectId:"
    + this.projectId + "Session type:" + this.sessionId + "AdminId:" + this.adminId 
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    loader.present();
    this.http.post(this.getInsertUsageUrl, {
      userid: this.userJson.UserId,
      username: this.userJson.FirstName,
      resourceid: this.resourceId,
      appname: "Mobile",
      starttime: this.startTime,
      endtime: stoptime,
      apptid: "0",
      labid: this.labId,
      accountcodeid: this.accountCodeId,
      labtype: this.labType,
      accountcodefrom: this.accountCodeFrom,
      projectid: this.projectId,
      sessiontypeid: this.sessionId,
      adminid: this.adminId,
      misc:  misc,
      usertoken: this.userJson.UserToken,
      tagids: this.tagId

    })
      .subscribe(
        (data: any) => {
          //RESPONSE

          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);


          loader.dismiss();
          this.navCtrl.push(MenuPage, {"page" : "NaviPage" });
        },//ERROR HANDLING
        error => {
          loader.dismiss();

          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);
          if (resErrJSON.status = 400) {
            let alert = this.alertCtrl.create({
              title: "Alert",
              message: "Error Processsing request",
              enableBackdropDismiss: false,
              buttons: [
                {
                  text: 'OK',
                  handler: () => {
                    this.navCtrl.push(MenuPage, {"page" : "NaviPage" });
                    //  nav.pop();
                  }
                }
              ]
            });

            alert.present();

          }
        }
      );

  }


}
