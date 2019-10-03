import 'aws-sdk/dist/aws-sdk';
import { Component, ComponentFactoryResolver} from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import * as moment from 'moment';
import Timer from 'easytimer.js';
import * as $ from 'jquery';
import { File } from '@ionic-native/file';
import { Media, MediaObject} from '@ionic-native/media';
import { MessageProvider } from '../../providers/message/message';
import { AndroidPermissions } from '@ionic-native/android-permissions';
var timer = new Timer();
var timerRecording = new Timer();
const AWS = window.AWS;
@IonicPage()
@Component({
  selector: 'page-sampledetail',
  templateUrl: 'sampledetail.html',
})
export class SampledetailPage {
  appUrl:string;
  sampleDroppedUrl:string;
  userJson:any;
  sampleJson:any;
  s_id:string;
  s_tname:string;
  s_user:string;
  s_lab:string;
  p_name:string;
  r_type:string;
  audioPermission:boolean;
  storagePermission:boolean;
  milestonesData:string;
  sampleMilestoneUrl:string;
  sampleMilestoneUpdateUrl:string;
  droppedButton:boolean;
  startTime:string;
  endTime:string;
  milestoneJson:any;
  userType:boolean;
  buttonToogle:boolean;
  showTimer:boolean;
  optionSelected:boolean;
  description:string
  disa:boolean;
  showValue:string;
  alertButton:any;
  s_account:string;
  accountType:string
  projectExist:boolean;
  recording = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];
  data: string;
  err: string;
  bucket: any;
  path: string;
  awsLocation:string;
  timerValue = '00:00:00';
  constructor(private permission: AndroidPermissions,private media: Media, private file: File, public platform: Platform,public message:MessageProvider,public navCtrl: NavController, public navParams: NavParams,public loading: LoadingController,public http:HttpClient,public storage: Storage) {
    this.userType=true;
    this.droppedButton=true;
  }

  ionViewDidLoad() {
    this.storage.get('appLink').then((val) =>{
      this.appUrl=val;
      this.sampleDroppedUrl=this.appUrl+'/WS/IdeaElanService.svc/UpdateWorkOrdersSamplesDropped';
      this.sampleMilestoneUrl=this.appUrl+'/WS/IdeaElanService.svc/GetSampleSubmissionMilestoneDetails';
      this.sampleMilestoneUpdateUrl=this.appUrl+'/WS/IdeaElanService.svc/InsertUpdateMilestoneDetails';
     });
    
     
     this.storage.get('userDetails').then((val1) => {
      this.userJson =val1;
    
    });
     this.sampleJson = this.navParams.get("sampleJson");
     if(this.sampleJson.Region=="Sample Submission" || this.sampleJson.Region == "W" ){
       this.r_type="Sample Submission Id";
     }else if(this.sampleJson.Region=="Service Request" || this.sampleJson.Region=="SR" ){
      this.r_type="Service Request Id";
     }
     this.accountType = this.sampleJson.GroupType;
     if(this.accountType!=undefined){
     if(this.accountType.trim().toLowerCase().includes('p')) {
        this.accountType = 'PO Number';
     }else{
       this.accountType ='Account Code';
     }}else{
      this.accountType ='Account Code';
     }
     this.showValue = this.navParams.get("showValue");
     this.storage.get('roleType').then((val) => {
      if(val=="user" || val=="labAdmin"){
        this.userType=true;
         
        
         if(this.sampleJson.SamplesDropped==undefined){
         this.droppedButton= false;
         }else if(this.sampleJson.SamplesDropped==true){
         this.droppedButton=true;
         }
     
      }else if(val=="super" || val=="admin" || val=="providerAdmin" ){
        if(this.showValue=="false"){
          this.userType=true;
          this.droppedButton=true;
        }
        else{
       this.droppedButton=true;
        this.buttonToogle=true;
        this.userType=false;
        this.showTimer= true;
        }
       
        
        
       
      }
      else{
        
      }});
    
      this.s_id= this.sampleJson.RollNumber;
      this.s_tname=this.sampleJson.TemplateName
      this.s_lab= this.sampleJson.LabName;
      if(!this.sampleJson.hasOwnProperty('ProjectName') ||this.sampleJson.ProjectName =="" ||this.sampleJson.ProjectName == null ){
        this.projectExist=true;
      }else{
        this.p_name = this.sampleJson.ProjectName;
      }
      
      this.startTime=moment().format("MM/DD/YYYY hh:mm:ss A");
      this.s_user = this.sampleJson.UserFullName
      this.s_account = this.sampleJson.AccountCode
    
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
  if(this.platform.is('android')){
    this.permissionConfig();
  }
 
  this.disa= false;
  this.awsLocation = 'error';
   this.storage.get('roleType').then((val) => {
      
    if(val=="user"  || val=="labAdmin"){
     
     
    }else if((val=="super" || val=="admin" || val=="providerAdmin") && this.showValue=="true"){
      
      this.mileStoneDetail();
     this.optionSelected= false;
     
    }
    else{
      
    }});

    AWS.config.accessKeyId = 'AKIAJJKRPJ22Z6FG5CXA';

    AWS.config.secretAccessKey = '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';

    this.bucket = new AWS.S3(
      {
        accessKeyId: 'AKIAJJKRPJ22Z6FG5CXA',
        secretAccessKey: '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',
      }
    );

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
async startButtonRequest(){
if(this.optionSelected==true){
     this.startTimer();
}
else{
  this.message.showMessage('Message','Please Select the Milestone');
}
}
  startTimer(){
    timer.start();
    this.buttonToogle=false;
    this.disa= true;
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
  }

  startReccordingTimer(){
    timerRecording.reset();
    timerRecording.start();
    $('#chronoExample1 .stopButton').click(function (e) {

    });
    
    timerRecording.addEventListener('secondsUpdated', function () {
      $('#chronoExample1 .timer1').html(timerRecording.getTimeValues().toString());
    });
    timerRecording.addEventListener('started', function () {
      $('#chronoExample1 .timer1').html(timerRecording.getTimeValues().toString());
    });
    timerRecording.addEventListener('reset', function () {
      $('#chronoExample1 .timer1').html(timerRecording.getTimeValues().toString());
    });
  }


  endTimer(){
    this.alertButton = [ 
      {
        text: 'Yes',
        handler: () => {
         if(this.recording == false && this.awsLocation == 'error'){
            timer.stop();
            this.mileStoneUpdate('');
          }else if(this.recording == false && this.awsLocation != 'error'){
            timer.stop(); 
            this.mileStoneUpdate(this.awsLocation);
          }
         
         
        }
      },
      {
        text: 'No',
        handler: () => {
          
        }
      }
    ];
    if(this.recording == true){
      this.message.showMessage('Alert','Stop recording first');
    }else{
      this.message.showMessageButton('Sample Submission','Are you sure you want to Stop & End ?',this.alertButton);
    }
  
  
  }
  endRecordingTimer(){
    timerRecording.stop();
  
  }
sampleDropped(){
    let loader = this.loading.create({
      spinner:"crescent",
      content:"Loading . . . "
    });
    
  loader.present();
    this.http.post(this.sampleDroppedUrl,{ 
      woid:this.sampleJson.WorkOrderId,
      user:this.userJson.EmailAddress
     })
    .subscribe(
      (data:any) => {
        //RESPONSE
     //   this.sampleStatus=true;
         loader.dismiss();
         let resSTR = JSON.stringify(data);
         let resJSON = JSON.parse(resSTR);
         this.navCtrl.pop();
      },//ERROR HANDLING
      error => {
       //  this.sampleStatus=false;
         loader.dismiss();
         let resErr = JSON.stringify(error);
         let resErrJSON = JSON.parse(resErr);
        
       
      }
    );
  }
  
  
mileStoneDetail(){
   
  let loader = this.loading.create({
    spinner:"crescent",
    content:"Loading . . . "
  });
  
loader.present();
  this.http.post(this.sampleMilestoneUrl,{ 
    woid:this.sampleJson.WorkOrderId,
    usertoken:this.userJson.UserToken,
    loggedinuser:this.userJson.UserId
   })
  .subscribe(
    (data:any) => {
       loader.dismiss();
       this.showTimer= true;
       let resSTR = JSON.stringify(data);
       let resJSON = JSON.parse(resSTR);
       this.milestoneJson = resJSON;
    },//ERROR HANDLING
    error => {
       loader.dismiss();
       let resErr = JSON.stringify(error);
       let resErrJSON = JSON.parse(resErr);
      if(resErrJSON.status==400){
        this.showTimer= false;
      }
     
    }
  );
}


mileStoneUpdate(awsPath:string){
  this.endTime=moment().format("MM-DD-YY hh:mm:ss A");
  let loader = this.loading.create({
    spinner:"crescent",
    content:"Loading . . . "
  });
  
loader.present();
  this.http.post(this.sampleMilestoneUpdateUrl,{ 
    woid:this.sampleJson.WorkOrderId,//from the json
    usertoken:this.userJson.UserToken,//from the json
    loggedinuser:this.userJson.UserId,//from the json
    statusdescid:this.milestonesData,//condition id
    desc:this.description,//textarea
    user:this.userJson.EmailAddress,//from the json
    start:this.startTime,
    end:this.endTime,
    filepath:awsPath

   })
  .subscribe(
    (data:any) => {
       loader.dismiss();
       let resSTR = JSON.stringify(data);
       let resJSON = JSON.parse(resSTR);
       this.message.showMessagePop('Message','Milestone Updated Successfully');
    },//ERROR HANDLING
    error => {
       loader.dismiss();
       let resErr = JSON.stringify(error);
       let resErrJSON = JSON.parse(resErr);
    }
  );
}
startRecord() {
 
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
    this.fileName = 'record' + new Date().getDate() +
      new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.m4a';
    this.filePath = this.file.externalRootDirectory.replace(/file:\/\//g, '') + 'Download/' + this.fileName;
    this.audio = this.media.create(this.filePath);  
    this.audio.startRecord();
  }

  this.recording = true;
  this.startReccordingTimer();

}

async stopRecord() {
  this.endRecordingTimer();
  this.audio.stopRecord();
    if (this.platform.is('ios')) {
      await this.file.readAsArrayBuffer(this.file.tempDirectory, this.fileName).then((audio: any) => {
       this.sendAudioRequest(audio);
     }).catch((err) => {
       console.log(err);
       });
    } else if (this.platform.is('android')) {
      //  this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
       var path = this.file.externalRootDirectory+'Download/';
      await this.file.readAsArrayBuffer(path, this.fileName).then((audio: any) => {
        this.sendAudioRequest(audio);
      });
     
    
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
  const options = { partSize: 10  * 1024 * 1024, queueSize: 1 };

  this.bucket.upload(params, options).on('httpUploadProgress', (evt) => {

  }).send((err, data) => {
    if (err) {
      loader.dismiss();
      this.awsLocation = 'error'
    //  this.message.showMessage('Alert','Check your internet connection');
      this.recording = false;
      return false;
    }
  
    let awsResponse = JSON.parse(JSON.stringify(data));
    loader.dismiss();
    this.awsLocation = awsResponse.Location;
    this.recording = false;
    return true;
  });
}

  updateChange(){
    this.milestonesData;
    this.optionSelected= true;
  }
  

}