/**
 * Created By Sumit Rajpal & No Modification
 */
import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import {  ActivitylogsProvider} from '../../providers/activitylogs/activitylogs';

@IonicPage()
@Component({
  selector: 'page-activitydashboard',
  templateUrl: 'activitydashboard.html',
})
export class ActivitydashboardPage {
appUrl:string;
userJson:any;
userFacilitiesJson:any;
providerValue:string;
emptyString:boolean;
getFacilitiesUrl:string;
userType:boolean;
activityDashboardJson:any;
facWeek:string;
facToday:string;
insWeek:string;
insToday:string;
resWeek:string;
resToday:string;
samWeek:string;
samToday:string;
proWeek:string;
proToday:string;
spinnerIndex:number;
groupname:string;
tok:string;
popup:boolean;
  constructor(public logs : ActivitylogsProvider,public loading: LoadingController,public navCtrl: NavController, public navParams: NavParams,public http:HttpClient, public storage: Storage) {
  
  }

  ionViewDidLoad() {
    this.storage.get('appLink').then((val) =>{
      this.appUrl=val;
      this.getFacilitiesUrl=this.appUrl+'/WS/IdeaElanService.svc/GetFacilitiesUserIsAdmin';
     });
      this.storage.get('userDetails').then((val1) => {
      this.userJson =val1;
    });
    
    this.storage.get('roleType').then((val) => {
      if(val=="user" || val=="labAdmin"){
       this.userType=true;
       
      }else if(val=="super" || val=="admin" || val=="providerAdmin" ){
       this.userType=false;
      }
      else{
        
      }});
    
  }
  ionViewWillEnter(){
   
    this.storage.get('spinnerIndex').then((val) =>{
     
      this.spinnerIndex=Number(val);
   });
   
    this.facWeek="0";
    this.facToday="0";
    this.facToday="0";
    this.insWeek="0";
    this.insToday="0";
    this.resWeek="0";
    this.resToday="0";
    this.samWeek="0";
    this.samToday="0";
    this.proWeek="0";
    this.proToday="0";
    this.popup=false;
    this.storage.get('userDetails').then((val1) => {
      this.userJson =val1;
   
  
  if(this.userJson.UserId!="" || this.userJson.UserId!=null){
    this.sendFacilitiesRequest();
    
   
  }else
  {
  
  }
});
 
    
  }
  activityDetailsPage(pageType:string){
    if(!this.emptyString){
    this.navCtrl.push('ActivitydetailsPage',{"facilityId":this.providerValue,"pageType":pageType, "facilityName":this.groupname
  });
     }
  }

  sendFacilitiesRequest(){
    let loader = this.loading.create({
      spinner:"crescent",
      content:"Loading . . . "
    });
    loader.present();
  
    this.http.post(this.getFacilitiesUrl,{ 
      userid:this.userJson.UserId,
      usertoken:this.userJson.UserToken,
     })
    .subscribe(
      (data:any) => {
        //RESPONSE
         this.emptyString=false;
         let resSTR = JSON.stringify(data);
         let resJSON = JSON.parse(resSTR);
         this.userFacilitiesJson=resJSON;
          if(resJSON==null)
          {
            this.popup=true
          }
         this.providerValue=resJSON[this.spinnerIndex].GroupId;
         this.groupname=resJSON[this.spinnerIndex].GroupName;
         loader.dismiss();
         this.sendLabRequest(this.userJson.UserId,this.providerValue);      
      },//ERROR HANDLING
      error => {
  
         loader.dismiss();
        
         this.popup=true
         this.emptyString=true;
         let resErr = JSON.stringify(error);
         let resErrJSON = JSON.parse(resErr);
         if(resErrJSON.status == 400){
         
         }
       
      }
    );
  }
  private sendLabRequest(userId:string,providerId:string) {
    var getActiviyDashboardUrl=this.appUrl+'/WS/IdeaElanService.svc/GetActivityDashboardDetails/'+userId+','+providerId;

    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });

    
    this.http.get(getActiviyDashboardUrl)
      .subscribe(
        (data: any) => {
          //RESPONSE
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.facWeek=resJSON[0].count;
          this.facToday=resJSON[1].count;
          this.insWeek=resJSON[2].count;
          this.insToday=resJSON[3].count;
          this.resWeek=resJSON[4].count;
          this.resToday=resJSON[5].count;
          this.samWeek=resJSON[6].count;
          this.samToday=resJSON[7].count;
          this.proWeek=resJSON[8].count;
          this.proToday=resJSON[9].count;
        },//ERROR HANDLING
        error => {

          loader.dismiss();
        
          let resErr = JSON.stringify(error);
        }
      );
  }


updateChange(){
  if(this.providerValue!="null"){
  this.providerValue;
  this.spinnerIndex=0;
  for(var i=0;i<this.userFacilitiesJson.length;i++){
    this.storage.set('spinnerIndex', this.spinnerIndex);
    this.spinnerIndex++;
  
   if(this.providerValue==this.userFacilitiesJson[i].GroupId){
     break;
   }
}
 this.sendLabRequest(this.userJson.UserId,this.providerValue);
  }
  
}
selectedPage(index:string){
   

}

}
