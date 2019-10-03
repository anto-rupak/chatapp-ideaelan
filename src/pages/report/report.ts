import 'aws-sdk/dist/aws-sdk';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { LoadingController, AlertController, ActionSheetController } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';
import { Camera} from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Media, MediaObject} from '@ionic-native/media';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { MessageProvider } from '../../providers/message/message';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import Timer from 'easytimer.js';

import * as $ from 'jquery';
import { AngularFireModule } from 'angularfire2';
import { watchFile } from 'fs';
import { delay } from 'rxjs/operators';
const AWS = window.AWS;
const  timer = new Timer();

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {
  subject: string;
  description: string;
  issueType: string;
  appUrl: string;
  reportUrl: string;
  zeissUrl: string;
  user: string;
  resourceId: string;
  ResourceName: string;
  name: string
  fname: string;
  lname: string;
  userJson: any;
  instrument: string;
  issueTypeValue: string;
  ticketDetails: any;
  getUserDeviceDetailsUrl: string;
  sendPushNotificationUrl: string;
  base64Image: any;
  photos: any;
  tId: any;
  ImageFile: any;
  ImageUrl: any;
  zeissImageUrl: any;
  flname: any;
  ico: boolean;
  imagestatus: any;
  ticketJson: any;
  pageType: any;
  selectedImage: any;
 url:any;
 recording = false;
 filePath: string;
 fileName: string;
 audio: MediaObject;
 audioPermission:boolean;
 storagePermission:boolean;
 audioList: any[] = [];
 data: string;
 err: string;
 bucket: any;
 path: string;
 awsLocation:string;
 flnew:string;
 audioReady = false;
 toogleAudio = true;
 uploadImageButton = true;
 awsUrlLocation:string;
 timerValue = '00:00:00';
  constructor(private media: Media, private file: File,private permission: AndroidPermissions,public transfer: FileTransfer, public actionSheetCtrl: ActionSheetController, private camera: Camera, public navCtrl: NavController, public notification: NotificationProvider, public navParams: NavParams, public platform: Platform,
    public storage: Storage, public loading: LoadingController, public http: HttpClient, public message: MessageProvider, public alertCtrl: AlertController) {
    this.ico = true;
    this.selectedImage = false;
this.url=" "
  }

  ionViewDidLoad() {
    this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.ImageUrl = this.appUrl + '/WS/IdeaElanService.svc/SaveFile';
      this.reportUrl = this.appUrl + '/WS/IdeaElanService.svc/ReportIssue';
      this.getUserDeviceDetailsUrl = this.appUrl + '/WS/IdeaElanService.svc/GetUserDeviceDetails';
      this.sendPushNotificationUrl = this.appUrl + '/WS/IdeaElanService.svc/SendPushMessageToTokens'
      this.zeissUrl = this.appUrl + '/WS/IdeaElanService.svc/CreateZeissServiceTicket'
      this.zeissImageUrl = this.appUrl + '/WS/IdeaElanService.svc/CreateZeissServiceTicketWithAttachment'
      this.resourceId = this.navParams.get('resourceId');
      this.ticketDetails = this.navParams.get('ticketDetails')
      this.ticketJson = this.navParams.get('ticketJson')
      this.user = this.navParams.get('user');
      this.name = this.navParams.get('name');
      this.fname = this.navParams.get('fname');
      this.lname = this.navParams.get('lname');
    
      this.pageType = this.navParams.get('pageType')
      if (this.pageType == "report") {
        this.pageType = "Report Issue"
       
      } else if (this.pageType == "zeissTicket") {
        this.pageType = "Create Ticket"
      }
      this.instrument = this.navParams.get('instrument');
      this.issueTypeValue = "0";

    });
   // item.userId = AWS.config.credentials.identityId;
        //item.created = (new Date().getTime() / 1000);
      
      
  }

  async permissionConfig(){
    if(this.platform.is('android')){
      this.permission.requestPermissions([this.permission.PERMISSION.RECORD_AUDIO, this. permission.PERMISSION.WRITE_EXTERNAL_STORAGE]);
     await this.permission.checkPermission(this.permission.PERMISSION.RECORD_AUDIO).then(
        result => {
          if(result.hasPermission){
            this.audioPermission =true;
          }else{
            this.audioPermission =false;
          }
        },
        err => {
          this.permission.requestPermission(this.permission.PERMISSION.RECORD_AUDIO);
        }     
                  
      );
     await this.permission.checkPermission(this.permission.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
        result => {
      
          if(result.hasPermission){
            this.storagePermission = true;
          }else{
            this.storagePermission = false;
          }
        },
        err =>        
          this.permission.requestPermission(this. permission.PERMISSION.WRITE_EXTERNAL_STORAGE)      
      );
    }
  }
ionViewDidEnter(){
  AWS.config.accessKeyId = 'AKIAJJKRPJ22Z6FG5CXA';

  AWS.config.secretAccessKey = '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';

  this.bucket = new AWS.S3(
    {
      accessKeyId: 'AKIAJJKRPJ22Z6FG5CXA',
      secretAccessKey: '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',
    }
  );
  if(this.platform.is('android')){
    this.permissionConfig();
  }
 
}
startRecord() {
  this.startTimer();
  this.url='';
  if (this.platform.is('ios')) {
    this.fileName = 'record' + new Date().getDate() + new Date().getMonth() +
      new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.m4a';
   /* this.filePath = this.file.documentsDirectory+ this.fileName;
    console.log("filepath write",this.file.documentsDirectory);
    this.audio = this.media.create(this.filePath);*/
    this.file.createFile(this.file.tempDirectory, this.fileName, true).then(() => {
      this.audio = this.media.create(this.file.tempDirectory.replace(/^file:\/\//, '') + this.fileName);
      this.audio.startRecord();
    });
  } else if (this.platform.is('android')) {
    this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.m4a';
    this.filePath = this.file.externalRootDirectory.replace(/file:\/\//g, '') + 'Download/' + this.fileName;
    this.audio = this.media.create(this.filePath);
    this.audio.startRecord();
  }
  
  this.recording = true;
  
}

async stopRecord() {
  this.endTimer();
  this.audio.stopRecord();
  
    if (this.platform.is('ios')) {
       await this.file.readAsArrayBuffer(this.file.tempDirectory, this.fileName).then((audio: any) => {
         console.log("audio");
        this.sendAudioRequest(audio);
      }).catch((err) => {
        console.log(err);
        });
    } else if (this.platform.is('android')) {
       var path = this.file.externalRootDirectory+'Download/';
      await this.file.readAsArrayBuffer(path, this.fileName).then((audio: any) => {
        this.sendAudioRequest(audio);
        this.audio.release();
      }).catch((err) => {
        console.log(err);
        });
     
    
    }
  
}

async recordButton(){
  await this.permissionConfig();
  if(this.platform.is('ios')){
 this.startRecord();
} else if(this.platform.is('android')){ 
 if(this.storagePermission && this.audioPermission){
   this.startRecord();
 }else{

 }
}
}
sendAudioRequest(fileInput: any) {
  let loader = this.loading.create({
    spinner:"crescent",
    content:"Loading . . . "
  });
  loader.present();
  const file = fileInput;
  const params = {
    Bucket: 'ieinfinity-uploads',
    Key: 'appaudio/' + this.fileName,
    Body: file,
    ACL: 'public-read',
    ContentType: 'audio/m4a'
  };
  const options = { partSize: 10  *1024  *1024, queueSize: 1 };

  this.bucket.upload(params, options).on('httpUploadProgress', (evt) => {

  }).send((err, data) => {
    if (err) {
      loader.dismiss();
      this.awsUrlLocation = '';
      this.recording = false;
      return false;
    }
    let awsResponse = JSON.parse(JSON.stringify(data));
    loader.dismiss();
    this.awsUrlLocation = awsResponse.Location;
    this.flname = this.fileName;
    this.audioReady = true;
    this.recording = false;
    return true;
  });
}

  sendReportIssue() {
   
    if (this.subject == "" || this.subject == null || this.description == "" || this.description == null) {
      this.message.showMessage("Alert", "Field cannot be empty !")
    } else {
      if (this.selectedImage == true) {
     
        this.sendRequest(this.flname);
      }
      else {
       if(this.audioReady && !this.recording){ 
           this.flname=this.fileName;
          this.sendRequest(this.awsUrlLocation);
       }
       else if(this.recording){
        this.message.showMessage('Alert','Stop the recording')
       }
       else{
        this.sendRequest('');
       }
      }
    }
  }

  //REQUEST METHOD
  sendRequest( fileParam:string) {
    


    let loader = this.loading.create({
      spinner: "crescent",
      content: "Reporting Issue"
    });
    loader.present();

    this.http.post(this.reportUrl,
      {
        issuetype: this.issueTypeValue,
        resourceid: this.resourceId,
        subject: this.subject.trim(),
        desc: this.description.trim(),
        user: this.user,
        status: "Open",
        ticketid: "0",
        name: this.fname,
        instrument: this.ResourceName,
        filename: fileParam
      })
      .subscribe(
        (data: any) => {
          / Modified by Abey Abraham /
          if (this.ImageFile != null) {
            
            this.tId = data;
            const fileTransfer: FileTransferObject = this.transfer.create();
            let options1: FileUploadOptions = {
              fileKey: 'file',
              fileName: `${this.flname}`,
              chunkedMode: false,
              mimeType: "multipart/form-data",
              params: { 'id': this.tId, 'type': 'issue' }  
            }

            fileTransfer.upload(this.ImageFile, `${this.ImageUrl}`, options1)
              .then((data) => {

                loader.dismiss();
                this.message.showMessagePop("Message", "Issue Reported Successfully");
                this.subject = "";
                this.description = "";
                this.ico = true;
                this.url="";
              }, (err) => {

                loader.dismiss();
                this.subject = "";
                this.description = "";
                this.ImageFile = "";
                this.url="";
                this.ico = true;
              });

          } else {
            loader.dismiss();
            this.message.showMessagePop("Message", "Issue Reported Successfully")
            this.subject = "";
            this.description = "";
            this.ImageFile = "";
            this.url="";
          }
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);


          this.notification.getUserDeviceDetails("resource", this.resourceId, "TIC", `New issue reported by ${this.lname} ${this.fname}   for ${this.instrument}`, "New Issue");


        },//ERROR HANDLING
        error => {

          loader.dismiss();
          this.message.showMessagePop("Message", "Issue Not Reported !!")
        }
      );
  }




  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 15,
      sourceType: sourceType,

    };


    if (sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      this.camera.getPicture(options).then((imageData) => {

        this.ImageFile = imageData;


       this.url=this.ImageFile
var filename = this.url.substring(this.url.lastIndexOf('/')+1);
           this.url=filename;
        this.selectedImage = true;
        this.ico = false;
        this.flname = new Date().getTime();
        this.flname = this.flname + ".jpg"
      });

    }

    else {
      this.camera.getPicture(options).then((imageData) => {
        this.ImageFile = imageData;
        this.url=this.ImageFile
var filename = this.url.substring(this.url.lastIndexOf('/')+1);
           this.url=filename;
        this.selectedImage = true;
        this.ico = false;
        this.flname = new Date().getTime();
        this.flname = this.flname + ".jpg"
      });

    }

  }
  public presentActionSheet() {
   
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
         
               this.timerValue ='00:00:00';
               this.toogleAudio = true;
               this.flname =''
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
         
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.timerValue ='00:00:00'; 
            this.toogleAudio = true;
            this.flname =''
            this.takePicture(this.camera.PictureSourceType.CAMERA);
       
          }
        },
        {
          text: 'Record Audio',
          handler: () => {
            this.flname =''
            this.selectedImage = false;
            this.toogleAudio = false;
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  createZesissServiceRequest() {
    if (this.selectedImage == true) {
    //  this.flname = new Date().getTime();
     // this.flname = this.flname + ".jpg"
    }
    else {
      this.flname = " ";
    }
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Updating . . ."
    });
    loader.present();
    if (this.ImageFile != null) {
      const fileTransfer: FileTransferObject = this.transfer.create();
      var params = {
        'symptomcode': this.issueTypeValue,
        'description': this.description.trim(),
        'ticketid': this.ticketDetails.TicketId,
        'resourceid': this.ticketJson.ResourceId,
        'userid': this.ticketDetails.UserId
      }

      let options1: FileUploadOptions = {
        fileKey: 'file',
        fileName: `${this.flname}`,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        httpMethod: "POST",
        params: params
       
      }

      fileTransfer.upload(this.ImageFile, `${this.zeissImageUrl}`, options1)
        .then((data) => {
          loader.dismiss();
          this.message.showMessagePop("Message", data.response);
          this.ico = true;
        }, (err) => {

          loader.dismiss();
          //  this.subject = "";
          this.message.showMessage("Message", "Error processing request.");
        });

    } else {
      this.http.post(this.zeissUrl, {
        symptomcode: this.issueTypeValue,
        description: this.description.trim(),
        ticketid: this.ticketDetails.TicketId,
        resourceid: this.ticketJson.ResourceId,
        userid: this.ticketDetails.UserId
        //ticketid: 0,
      })
        .subscribe(

          (data: any) => {
            //RESPONSE

            let resSTR = JSON.stringify(data);
            let resJSON = JSON.parse(resSTR);
          
            loader.dismiss();
          },//ERROR HANDLING
          error => {
            loader.dismiss();
         
            let resErr = JSON.stringify(error);
            let resErrJSON = JSON.parse(resErr);

          }
        );
    }

  }
  startTimer(){
    timer.reset();
    $('#chronoExample .stopButton').click(function (e) {
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
    timer.start();
  }
  endTimer(){
 
            timer.stop();
           
  }

  onBackButton() {
    this.navCtrl.pop();
  }
}