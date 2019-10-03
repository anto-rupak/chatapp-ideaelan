/**
 * Created By Sumit Rajpal
 */
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { ActivitylogsProvider } from '../../providers/activitylogs/activitylogs';
import { MessagePage } from '../message/message';
import { ActionSheetController } from 'ionic-angular';
import { exists } from 'fs';
@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  roletype:any;
  chart: any;
  userFacilitiesJson: any;
  userType: boolean;
  userFacilitiesTechnicalIssuesJson: any;
  appUrl: string;
  providerValue: string;
  facilityTechnicalIssuelist: string;
  getFacilitiesUrl: string;
  getFacilitiesTechnicalIssueUrl: string;
  getFacilityGraphUrl: string;
  getDashboardUrl: string;
  getFacilityDashboardUrl: string;
  userJson: any;
  chartVar: any;
  emptyString: boolean;
  fullString: boolean;
  technicalStatus: boolean;
  monthlyAmt: string;
  monthlyCount: string;
  quaterlyAmt: string;
  quaterlyCount: string;
  spinnerIndex: number;
  graphHide: boolean;
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  barChart: any;
  doughnutChart: any;
  pin:any;
  constructor(public logs: ActivitylogsProvider, public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
    public loading: LoadingController, public http: HttpClient, public actionctrl: ActionSheetController,) {
    //  this.logs.insertlog("Facility Dashboard","Menu Page","clicked facility dashboard ","User clicked facility dashboard option from menu   ",this.userJson.UserId);
  }

  ionViewDidLoad() {
    this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.getFacilitiesUrl = this.appUrl + '/WS/IdeaElanService.svc/GetFacilitiesUserIsAdmin';
      this.getFacilitiesTechnicalIssueUrl = this.appUrl + '/WS/IdeaElanService.svc/GetTechnicalIssues';
      this.getFacilityGraphUrl = this.appUrl + '/WS/IdeaElanService.svc/GetFrequentlyUsedInstruments';
      this.getDashboardUrl = this.appUrl + '/WS/IdeaElanService.svc/GetUserDashboardDetails';
      this.getFacilityDashboardUrl = this.appUrl + '/WS/IdeaElanService.svc/GetFacilityDashboardDetails';

    });


    this.storage.get('roleType').then((val) => {
this.roletype=val;
      if (val == "user" || val == "labAdmin") {
        this.userType = true;

      } else if (val == "super" || val == "admin" || val == "providerAdmin" || val == "labAdmin") {
        this.userType = false;

      }
      else {

      }
    });
    
    this.storage.get('pin').then((val) => {
    this.pin=val;
           
          });

  }
  ionViewWillEnter() {
    this.storage.get('spinnerDashboard').then((val) => {
      this.spinnerIndex = Number(val);
    });
    this.storage.get('userDetails').then((val1) => {
      this.userJson = val1;
      if (this.userType) {
        this.sendFacilitesTechnicalIssueRequest("UserId", `${this.userJson.UserId}`);
        this.sendDashboardDetails();
        this.sendFacilityGraphDetails("0");
      } else if (!this.userType) {

        this.sendFacilitiesRequest(this.userJson.UserToken, this.userJson.UserId);

      }
    });
  }
  ionViewDidEnter() {

  }

  sendFacilitiesRequest(userToken: string, userId: string) {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    loader.present();

    this.http.post(this.getFacilitiesUrl, {
      userid: userId,
      usertoken: userToken,
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.userFacilitiesJson = resJSON;
          this.providerValue = resJSON[this.spinnerIndex].GroupId;
          this.emptyString = false;
          loader.dismiss();
          console.log("roletype",this.roletype);

        this.sendFacilitesTechnicalIssueRequest("ProviderId", this.providerValue);

        },//ERROR HANDLING
        error => {

          loader.dismiss();
          this.emptyString = true;
          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);
          if (resErrJSON.status == 400) {

          }

        }
      );
  }
/*
  dashPage(instrument) {
    this.logs.insertlog("View Issues ", "Facility Dashboard Page", "click event of card content", "User clicked the issues displayed in cards for viewing details  ", this.userJson.UserId);
    //this.navCtrl.push('DashboarddetailPage', { "dashboardTicketDetail": instrument ,"userId":this.userJson.UserId});
    if(this.roletype=="user"){
      this.navCtrl.push(MessagePage, {"instrumentid":`${instrument.ResourceId}`,"id":"user","ticketid":`${instrument.TicketId}`});
    }
   else if(this.roletype=="providerAdmin"){
      this.navCtrl.push(MessagePage, {"instrumentid":`${instrument.ResourceId}`,"id":"providerAdmin","ticketid":`${instrument.TicketId}`});
    }
else{
  this.navCtrl.push('DashboarddetailPage', { "dashboardTicketDetail": instrument ,"userId":this.userJson.UserId,"ticketid":`${instrument.TicketId}`});
}
  }
  */
 dashPage(instrument) {




   if(this.roletype=="user"||this.roletype=="providerAdmin"||this.roletype == "super"||this.roletype == "labAdmin"||this.roletype == " admin")
   { 
if(this.roletype=="user"||this.roletype == "labAdmin")
{ 
  if(this.userJson.UserId==instrument.UserId)
  {
    console.log(`user ${this.userJson.UserId} admin${instrument.UserId}`);
    this.showdetail(instrument);
    return;
  }
  
} 
if(this.roletype == "super"||this.roletype == "providerAdmin"||this.roletype == " admin")
{
  if(this.userJson.UserId==instrument.UserId)
  {
    console.log(`user ${this.userJson.UserId} admin${instrument.UserId}`);
    this.showdetail(instrument);
    return;
  }
  
}
   
    let actionSheet = this.actionctrl.create({
      title: 'Select Options',
      cssClass: 'myPage',
      buttons: [
        {
          //updated by Abey Abraham
          text: 'Chat',
          role: 'destructive',
          cssClass: 'myActionSheetBtnStyle',
          handler: () => {
            this.logs.insertlog("View Issues ", "Facility Dashboard Page", "click event of card content", "User clicked the issues displayed in cards for viewing details  ", this.userJson.UserId);
    //this.navCtrl.push('DashboarddetailPage', { "dashboardTicketDetail": instrument ,"userId":this.userJson.UserId});
    if(this.roletype=="user"||this.roletype == "labAdmin"){
      console.log(`user ${this.userJson.UserId} admin${instrument.UserId}`);
      this.navCtrl.push(MessagePage, {"instrumentid":`${instrument.ResourceId}`,"id":"user","ticketid":`${instrument.TicketId}`,"source":`${instrument.Source}`,"chatType":`TechnicalIssues`});
      //this.navCtrl.push('ChatContentPage', {"role":`${this.roletype}`,"userid":`${this.userJson.UserId}`,"adminid":`${instrument.UserId}`,"instrumentid":`${instrument.ResourceId}`,"ticketid":`${instrument.TicketId}`,"senderName":`${instrument.FirstName}`,"pin":`${this.pin}`,"source":`${instrument.Source}`,"chatType":`TechnicalIssues`})
    }
   else if(this.roletype == "super"||this.roletype == "providerAdmin"||this.roletype == " admin"){

console.log("admin , user source",this.userJson.UserId,instrument.UserId,instrument.Source);
    this.navCtrl.push('ChatContentPage', {"role":`${this.roletype}`,"userid":`${instrument.UserId}`,"adminid":`${this.userJson.UserId}`,"instrumentid":`${instrument.ResourceId}`,"ticketid":`${instrument.TicketId}`,"senderName":`${this.userJson.LastName} ${this.userJson.FirstName}`,"pin":`${this.pin}`,"source":`${instrument.Source}`,"chatType":`TechnicalIssues`})

      //this.navCtrl.push(MessagePage, {"instrumentid":`${instrument.ResourceId}`,"id":"providerAdmin","ticketid":`${instrument.TicketId}`,"source":`${instrument.Source}`,"chatType":`TechnicalIssues`});
    }
          }
        },
        {
          text: 'Details',
          role: 'destructive',
          cssClass: 'myActionSheetBtnStyle',
          handler: () => {
            this.navCtrl.push('DashboarddetailPage', { "dashboardTicketDetail": instrument ,"userId":this.userJson.UserId,"ticketid":`${instrument.TicketId}`});
          }
        },
      ]
    })
    actionSheet.present();
  }else{
    
   this.showdetail(instrument);
  }
  }
  showdetail(instrument)
  { let actionSheet = this.actionctrl.create({
    title: 'Select Options',
    cssClass: 'myPage',
    buttons: [
      {
       
        text: 'Details',
        role: 'destructive',
        cssClass: 'myActionSheetBtnStyle',
        handler: () => {
          this.navCtrl.push('DashboarddetailPage', { "dashboardTicketDetail": instrument ,"userId":this.userJson.UserId,"ticketid":`${instrument.TicketId}`});
        }
      },
    ]
  })
  actionSheet.present();
return;
}
  sendDashboardDetails() {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    loader.present();

    this.http.post(this.getDashboardUrl, {
      userid: this.userJson.UserId,
      usertoken: this.userJson.UserToken,
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
          this.fullString = true;
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.monthlyAmt = resJSON.MonthlyAmount;
          this.monthlyCount = resJSON.MonthlyCount;
          this.quaterlyAmt = resJSON.QuarterlyAmount;
          this.quaterlyCount = resJSON.QuarterlyCount;

          loader.dismiss();


        },//ERROR HANDLING
        error => {
          this.fullString = false;
          loader.dismiss();
          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);


        }
      );
  }
  sendFacilityGraphDetails(graphProviderValue: string) {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    //  loader.present();

    this.http.post(this.getFacilityGraphUrl, {
      userid: this.userJson.UserId,
      labid: "0",
      providerid: graphProviderValue
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
          let chartdata = [];
          let chartlabels = [];
          this.fullString = true;

          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.graphHide = false;
          for (var i = 0; i < resJSON.length; i++) {
            chartlabels.push(resJSON[i].ResourceName);
            chartdata.push(resJSON[i].Apptcount);
          }
          if (this.doughnutChart != null) {
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
            }, options: {
              showDatasetLabels: true,
              cutoutPercentage: 41,
              tooltips: {
                callbacks: {
                  label: function (tooltipItem, data) {
                    return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
                  }
                }
              }
            }

          });
          if (this.barChart != null) {
            this.barChart.destroy();
          }

          this.barChart = new Chart(this.barCanvas.nativeElement, {

            type: 'bar',
            data: {
              labels: chartlabels, //['Instrument123456', 'Instrument132456', 'Instrument123456', 'Instrument123456'],//chartlabels,
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
              showDatasetLabels: true,
              cutoutPercentage: 41,
              tooltips: {
                callbacks: {
                  label: function (tooltipItem, data) {
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
                  ticks: {
                    minRotation: 45,
                    beginAtZero: true

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
          this.fullString = false;

          loader.dismiss();
          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);

          if (resErrJSON.status == 400) {
            this.graphHide = true;
          }

        }
      );
  }

  /*Facility Dashboard*/
  sendFacilityDashboardDetails(providerValue: string) {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    // loader.present();

    this.http.post(this.getFacilityDashboardUrl, {
      userid: this.userJson.UserId,
      usertoken: this.userJson.UserToken,
      facilityid: providerValue
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
          this.fullString = true;

          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.monthlyAmt = resJSON.MonthlyAmount;
          this.monthlyCount = resJSON.MonthlyCount;
          this.quaterlyAmt = resJSON.QuarterlyAmount;
          this.quaterlyCount = resJSON.QuarterlyCount;
     


        },//ERROR HANDLING
        error => {
          this.fullString = false;
          loader.dismiss();
          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);


        }
      );
  }
  sendFacilitesTechnicalIssueRequest(paramname: string, paramvalue: string) {
    console.log(paramvalue,paramname);
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    //  loader.present();
    
    this.http.post(this.getFacilitiesTechnicalIssueUrl, {
      userid: this.userJson.UserId,
      usertoken: this.userJson.UserToken,
     paramname: paramname,
      paramvalue:paramvalue
    })
      .subscribe(
        (data: any) => {
          //RESPONSE

          this.technicalStatus = true;
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.userFacilitiesTechnicalIssuesJson = resJSON;
          console.log("test",this.userFacilitiesTechnicalIssuesJson);
          // 

          //loader.dismiss();



        },//ERROR HANDLING
        error => {

          loader.dismiss();

          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);
          //  this.userFacilitiesTechnicalIssuesJson=resErrJSON;
          if (resErrJSON.status == 400) {
            this.technicalStatus = false;

          }

        }
      );
  }
  //TOAST METHOD




  updateChange() {
    //fvbgfrgb
    this.providerValue;
    
      this.sendFacilitesTechnicalIssueRequest("ProviderId", this.providerValue);
    
    
    this.sendFacilityGraphDetails(this.providerValue);
    this.sendFacilityDashboardDetails(this.providerValue);
    this.spinnerIndex = 0;
    for (var i = 0; i < this.userFacilitiesJson.length; i++) {
      this.storage.set('spinnerDashboard', this.spinnerIndex);
      this.spinnerIndex++;
      if (this.providerValue == this.userFacilitiesJson[i].GroupId) {
        break;
      }
    }

  }




}
