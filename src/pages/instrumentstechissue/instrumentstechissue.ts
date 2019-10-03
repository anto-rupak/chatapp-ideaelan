import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {HttpClient} from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
import{DashboarddetailPage} from '../dashboarddetail/dashboarddetail'

@IonicPage()
@Component({
  selector: 'page-instrumentstechissue',
  templateUrl: 'instrumentstechissue.html',
})
export class InstrumentstechissuePage {
  chart:any;
  userFacilitiesJson:any;
  userType:boolean;
  userFacilitiesTechnicalIssuesJson:any;
  appUrl:string;
  providerValue:string;
  facilityTechnicalIssuelist:string;
  getFacilitiesUrl:string;
  getFacilitiesTechnicalIssueUrl:string;
  getFacilityGraphUrl:string;
  getDashboardUrl:string;
  getFacilityDashboardUrl:string;
  userJson:any;
  chartVar:any;
  emptyString:boolean;
  fullString:boolean;
  technicalStatus:boolean;
  monthlyAmt:string;
  monthlyCount:string;
  quaterlyAmt:string;
  quaterlyCount:string;
  spinnerIndex:number;
  graphHide:boolean;
  resourceId:any;

  constructor(public storage: Storage, public loading: LoadingController,public navCtrl: NavController, public navParams: NavParams,public http:HttpClient) {
  }
ionViewDidEnter(){
  this.sendFacilitesTechnicalIssueRequest("ResourceId",`${this.resourceId}`);
}
  ionViewDidLoad() {
 
    this.storage.get('userDetails').then( (val1) => {
      this.userJson =  val1;
    });
    this.resourceId=this.navParams.get('resourceId')
    this.storage.get('appLink').then((val) =>{
    this.appUrl=val;
    this.getFacilitiesUrl=this.appUrl+'/WS/IdeaElanService.svc/GetFacilitiesUserIsAdmin';
    this.getFacilitiesTechnicalIssueUrl=this.appUrl+'/WS/IdeaElanService.svc/GetTechnicalIssues';

    
   });

  
   this.storage.get('roleType').then((val) => {
    
    if(val=="user"|| val== "labAdmin"){
     this.userType=true;
     
    }else if(val=="super" || val=="admin" || val=="providerAdmin" || val=="labAdmin"){
     this.userType=false;
     
    }
    else{
      
    }});
      
  }
  sendFacilitesTechnicalIssueRequest(paramname:string,paramvalue:string){
    let loader = this.loading.create({
      spinner:"crescent",
      content:"Loading . . . "
    });
    loader.present();

    this.http.post(this.getFacilitiesTechnicalIssueUrl,{ 
      userid:this.userJson.UserId,
      usertoken:this.userJson.UserToken,
      paramname:paramname,
      paramvalue:paramvalue
     })
    .subscribe(
      (data:any) => {
        //RESPONSE

         
         this.technicalStatus=true;
         let resSTR = JSON.stringify(data);
         let resJSON = JSON.parse(resSTR);
         this.userFacilitiesTechnicalIssuesJson=resJSON;
         loader.dismiss();
         
      },//ERROR HANDLING
      error => {
        
         loader.dismiss();
        
         let resErr = JSON.stringify(error);
         let resErrJSON = JSON.parse(resErr);

         if(resErrJSON.status == 400){
          this.technicalStatus=false;
       
         }
        
      }
    );
  }

  techIssuePage(instrument){ 
    this.navCtrl.push(DashboarddetailPage, {"dashboardTicketDetail":instrument});

  }
}
