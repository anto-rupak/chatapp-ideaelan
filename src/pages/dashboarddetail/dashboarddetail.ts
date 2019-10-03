/**
 * Created By Sumit Rajpal
 */
import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { MessageProvider } from '../../providers/message/message';
import { ActivitylogsProvider } from '../../providers/activitylogs/activitylogs';
import { ReportPage } from '../report/report';
import { MessagePage } from '../message/message';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
@IonicPage()
@Component({
  selector: 'page-dashboarddetail',
  templateUrl: 'dashboarddetail.html',
})
export class DashboarddetailPage {
  getDashboardDetailUrl: string;
  getDashboardDetailUpdateUrl: string;
  userJson: any;
  userType: boolean;
  dashboardDetailJson: any;
  dashboardJson: any;
  appUrl: string;
  ticketId: string;
  issue: string;
  subject: string;
  desc: string;
  inst: string;
  cdate: any;
  userId:string;
  selectStatus: boolean;
  cby: string;
  cstatus: string
  message: string;
  bottomHide: boolean;
  issueType: string;
  isZeiss: boolean;
  ticketDetailsUrl:string;
  audioPlay:boolean;
  audioPlayLink:string;
  msbapTitle = 'Audio Title';
  msbapAudioUrl = '';   
  msbapDisplayTitle = false; 
  msbapDisplayVolumeControls = true; 
  constructor(private streamingMedia: StreamingMedia,public logs: ActivitylogsProvider, public messages: MessageProvider, public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, public storage: Storage,
    public loading: LoadingController, public http: HttpClient, public alertCtrl: AlertController) {

    this.bottomHide = true;

  }


  ionViewDidLoad() {
    this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.getDashboardDetailUrl = this.appUrl + '/WS/IdeaElanService.svc/GetTicketDetailsByTicketId';
      this.getDashboardDetailUpdateUrl = this.appUrl + '/WS/IdeaElanService.svc/UpdateTicketStatus';
      this.ticketDetailsUrl = this.appUrl + '/WS/IdeaElanService.svc/GetTicketDetailsByTicketId';
      this.dashboardJson = this.navParams.get("dashboardTicketDetail");
      this.userId = this.navParams.get("userId");
      this.issueType = this.dashboardJson.IssueType;
    });
    

    this.storage.get('roleType').then((val) => {

      if (val == "user" || val == "labAdmin") {
        this.userType = true;

        this.bottomHide = true;

      } else if (val == "super" || val == "admin" || val == "providerAdmin") {
        this.userType = false;
        this.bottomHide = false;

      }
      else {

      }
    });
    this.audioPlay = false;
  }
  ionViewDidEnter() {
    this.storage.get('userDetails').then((val1) => {

      this.userJson = val1;
      this.dashboardDetailRequest();
    });
   
    this.storage.get('userDetails').then((val1) => {

    });

    if (this.userType) {
      if (this.userId != this.dashboardJson.UserId) {
        this.bottomHide = true;

      }
      else {
        this.bottomHide = false;
      }
    }
  }
  updateRequest() {
    this.dashboardDetailUpdate();
  
  }
  ZeissTicketId: any
  ZeissTicketSubmitDate: any
  ZeissSymptomText: any
  ZeissTicketDescription: any
  ZeissTicketStatus: any
  showZeissTicketDetails: boolean

  dashboardDetailRequest() {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    loader.present();

    this.http.post(this.getDashboardDetailUrl, {
      ticketid: this.dashboardJson.TicketId,
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.dashboardDetailJson = resJSON;
          this.issue = this.dashboardDetailJson.TicketNumber;
          this.subject = this.dashboardDetailJson.Subject;
          this.desc = this.dashboardDetailJson.Description;
          this.inst = this.dashboardDetailJson.SubCategory;
          this.cdate = this.dashboardDetailJson.strCreatedDate;
        
          this.cby = this.dashboardDetailJson.UserName;
          // zeiss modification - Anto : 23-07-2019
          this.ZeissTicketId = this.dashboardDetailJson.ZeissTicketId
          this.ZeissTicketSubmitDate = this.dashboardDetailJson.ZeissTicketSubmitDate
          this.ZeissSymptomText = this.dashboardDetailJson.ZeissSymptomText
          this.ZeissTicketDescription = this.dashboardDetailJson.ZeissTicketDescription
          this.ZeissTicketStatus = this.dashboardDetailJson.ZeissTicketStatus
          if (this.dashboardJson.IsZeiss) {
            this.isZeiss = true
           
          } else {
            this.isZeiss = false
        
          }
          if (this.ZeissTicketId != "") {
            this.showZeissTicketDetails = true
            //  this.isZeiss = false
          } else {
            this.showZeissTicketDetails = false

          }
          this.s3AudioPlay();
          loader.dismiss();

        },//ERROR HANDLING
        error => {

          loader.dismiss();
       

          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);
          if (resErrJSON.status == 400) {

          }

        }
      );
  }

  dashboardDetailUpdate() {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    loader.present();

    this.http.post(this.getDashboardDetailUpdateUrl, {
      ticketid: this.dashboardJson.TicketId,
      status: this.cstatus,
      userid: this.userJson.UserId,
      message: this.message
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
       
          let resSTR = JSON.stringify(data);
         
   
          this.logs.insertlog("Issue Details ", "Dashboard Details Page (Issue Details Page)", "clicked update button", "User clicked update button in the Issue Details Page   ", this.userJson.UserId);
          loader.dismiss();
          this.messages.showMessagePop('Message', 'Updated Successfully');

        },//ERROR HANDLING
        error => {

          loader.dismiss();
         

          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);
          if (resErrJSON.status == 400) {

          }

        }
      );
  }


  s3AudioPlay() {
    
    this.http.post(this.ticketDetailsUrl, {
      ticketid: this.dashboardJson.TicketId,
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
        
       let resData = JSON.stringify(data);
       let resJson = JSON.parse(resData);
    
        if(String(resJson.Filename).toLowerCase().indexOf('https://ieinfinity-uploads.s3.amazonaws.com') >= 0){
         this.audioPlay = true;
         this.audioPlayLink = resJson.Filename;

        }else{
          this.audioPlay = false;
        }
        },//ERROR HANDLING
        error => {

         

          let resErr = JSON.stringify(error);
       

        }
      );
  }


  playAudio(){
    let options: StreamingVideoOptions = {
      successCallback: () => {  },
      errorCallback: (e) => {  },
      orientation: 'portrait',
      shouldAutoClose: false,
      controls: true
    };
    this.streamingMedia.playAudio(this.audioPlayLink , options);
  }
  updateChange() {
    this.cstatus;
    this.selectStatus = true;
  }

  zeissRequest() {

    this.navCtrl.push(ReportPage, { "pageType": "zeissTicket", "ticketDetails": this.dashboardJson, "ticketJson": this.dashboardDetailJson })
  }
}
