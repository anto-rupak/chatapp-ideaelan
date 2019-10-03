import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import {Chart} from 'chart.js';
/**
 * Generated class for the LabDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lab-dashboard',
  templateUrl: 'lab-dashboard.html',
})
export class LabDashboardPage {

  chart:any;
  userType:boolean;
  appUrl:string;
  providerValue:string;
  getLabUrl:string;
  getDashboardUrl:string;
  userJson:any;
  chartVar:any;
  emptyString:boolean;
  fullString:boolean;
  technicalStatus:boolean;
  monthlyAmt:string;
  monthlyCount:string;
  quaterlyAmt:string;
  quaterlyCount:string;
  userLabJson:any;
  labid:string;
  getLabTechnicalIssueUrl:string;
  userLabTechnicalIssuesJson:any;
  getLabDashboardUrl:string;
  getLabGraphUrl:string;

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
    barChart: any;
    doughnutChart:any;

  constructor(public navCtrl: NavController,public toastCtrl: ToastController, public navParams: NavParams,public storage: Storage,
    public loading: LoadingController,public http:HttpClient) {
  }

  ionViewDidLoad() {

    this.storage.get('appLink').then((val) =>{
      this.appUrl=val;
      this.getLabUrl=this.appUrl+'/WS/IdeaElanService.svc/GetLabsUserIsAdmin';
      this.getLabGraphUrl=this.appUrl+'/WS/IdeaElanService.svc/GetFrequentlyUsedInstruments';
      this.getDashboardUrl=this.appUrl+'/WS/IdeaElanService.svc/GetUserDashboardDetails';
      this.getLabDashboardUrl=this.appUrl+'/WS/IdeaElanService.svc/GetLabDashboardDetails';


     });
      this.storage.get('userDetails').then((val1) => {
      this.userJson =val1;
    });
    
     this.storage.get('roleType').then((val) => {
      
      if(val=="user"){
       this.userType=true;
       
      }else if(val=="super" || val=="admin" || val=="providerAdmin" || val=="labAdmin"){
       this.userType=false;
       
      }
      else{
        
      }});
}
ionViewDidEnter(){
  this.storage.get('userDetails').then((val1) => {
    if(this.userType){
      this.sendDashboardDetails();
    }else if(!this.userType){
      this.sendLabRequest();
      
    }
  });

  
}

sendLabRequest(){ 
 let loader = this.loading.create({
  spinner:"crescent",
   content:"Loading . . . "
 });
 // loader.present();

  this.http.post(this.getLabUrl,{ 
    userid:this.userJson.UserId,
    usertoken:this.userJson.UserToken,
  })
  .subscribe(
    (data:any) => {
      //RESPONSE

       let resSTR = JSON.stringify(data);
       let resJSON = JSON.parse(resSTR);
       this.userLabJson=resJSON;
   
      this.labid=resJSON[0].GroupId;
      // loader.dismiss();
      this.emptyString=false;

   
    },//ERROR HANDLING
    error => {

     //  loader.dismiss();
    
       this.emptyString=true;
     
    }
  );
}
sendDashboardDetails(){
  let loader = this.loading.create({
    spinner:"crescent",
    content:"Loading . . . "
  });
 loader.present();

  this.http.post(this.getDashboardUrl,{ 
    userid:this.userJson.UserId,
    usertoken:this.userJson.UserToken,
   })
  .subscribe(
    (data:any) => {
      //RESPONSE

       this.fullString=true;
       let resSTR = JSON.stringify(data);
       let resJSON = JSON.parse(resSTR);
       this.monthlyAmt=resJSON.MonthlyAmount;
       this.monthlyCount=resJSON.MonthlyCount;
       this.quaterlyAmt=resJSON.QuarterlyAmount;
       this.quaterlyCount=resJSON.QuarterlyCount;

       
      // loader.dismiss();
       
       
    },//ERROR HANDLING
    error => {
      this.fullString=false;
      

       let resErr = JSON.stringify(error);
       let resErrJSON = JSON.parse(resErr);
    }
  );
}
sendLabGraphDetails(graphProviderValue:string){
  let loader = this.loading.create({
  spinner:"crescent",
    content:"Loading . . . "
 });
//  loader.present();
  this.http.post(this.getLabGraphUrl,{ 
    userid:this.userJson.UserId,
    labid:graphProviderValue,
    providerid:"0"
   })
  .subscribe(
    (data:any) => {
      //RESPONSE

      let chartdata=[];
      let chartlabels=[];
       this.fullString=true;
       let resSTR = JSON.stringify(data);
       let resJSON = JSON.parse(resSTR);
       for(var i=0;i<resJSON.length;i++){
          chartlabels.push(resJSON[i].ResourceName);
          chartdata.push(resJSON[i].Apptcount);
       }
       if(this.doughnutChart!=null)
       {
        this.doughnutChart.destroy();
       }
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
/* Modified by Abey Abraham */
      type: 'doughnut',
      data: {
          labels: chartlabels,
          datasets: [{
              label: '',
              data: chartdata,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#FF6384",
                
              ]
          }]
      },options: {
        showDatasetLabels : true,
        cutoutPercentage: 41,
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
            }
          }
        }
         }

  });
  if(this.barChart!=null){
  this.barChart.destroy();
  }

  this.barChart = new Chart(this.barCanvas.nativeElement, {

    type: 'bar',
    data: {
        labels:chartlabels, //['Instrument123456', 'Instrument132456', 'Instrument123456', 'Instrument123456'],//chartlabels,
        datasets: [{
            label: ' ',
            data: chartdata,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
               
            ],
            borderWidth: 1
        }]
        
    },
    options: {
      showDatasetLabels : true,
        cutoutPercentage: 41,
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
            }
          }
        },
      legend: {
        display: false
     },
        scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Percentage'
              },
                ticks: {  minRotation: 45,
                    beginAtZero:true
                    
                }
            }]
            ,
    xAxes: [{
      ticks: {
        minRotation: 45,
        autoSkip: false
      }
    }]
        }
    }

});


      

       
    },//ERROR HANDLING
    error => {
      this.fullString=false;
    
     //  loader.dismiss();
 

       let resErr = JSON.stringify(error);
       let resErrJSON = JSON.parse(resErr);
       
 
      
    }
  );
}

sendLabDashboardDetails(providerValue:string){
  let loader = this.loading.create({
  spinner:"crescent",
   content:"Loading . . . "
  });
  //loader.present();

  this.http.post(this.getLabDashboardUrl,{ 
    userid:this.userJson.UserId,
    usertoken:this.userJson.UserToken,
    labid:providerValue
   })
  .subscribe(
    (data:any) => {
      //RESPONSE
      
       this.fullString=true;
      
       let resSTR = JSON.stringify(data);
       let resJSON = JSON.parse(resSTR);
       this.monthlyAmt=resJSON.MonthlyAmount;
       this.monthlyCount=resJSON.MonthlyCount;
       this.quaterlyAmt=resJSON.QuarterlyAmount;
       this.quaterlyCount=resJSON.QuarterlyCount;

       
       
    },//ERROR HANDLING
    error => {
      this.fullString=false;
     
     //  loader.dismiss();
   
       let resErr = JSON.stringify(error);
       let resErrJSON = JSON.parse(resErr);

    }
  );
}





updateChange(){
  if(!this.emptyString){
  this.labid;
 this.sendLabDashboardDetails(this.labid);
 this.sendLabGraphDetails(this.labid);
 
  }
}
}
