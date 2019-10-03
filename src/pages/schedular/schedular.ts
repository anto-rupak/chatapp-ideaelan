// Created by Anto Rupak

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
import * as moment from "moment";
import * as $ from 'jquery';
import 'fullcalendar';
import { AlertController } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';
import { isNumber } from 'util';
import { MenuPage } from '../menu/menu';
import { AppointmentsPage } from '../appointments/appointments';

@Component({
  selector: 'page-home',
  templateUrl: 'schedular.html'
})
export class SchedularPage {
  apptJson: any;
  eventLoader: string;
  eventcolor: string;
  textcolor: string;
  eveload: any;
  getAppointmentUrl: string;
  instrumentname: string;
  deleteAppointmentUrl: string;
  updateAppointmentUrl: string;
  getCancellationRuleUrl: string;
  getUserDeviceDetailsUrl: string;
  sendPushNotificationUrl: string;
  getUserDefaultDetailsUrl: any;
  checkReservationRuleUrl: string;
  start_date: any;
  end_date: any;
  resourceId: any;
  appUrl: string;
  userJson: any;
  isAdmin: any;
  admin: boolean;
  labId: any;
  startdate: any;
  endate: any;
  instrument: any;
  UserName: string;
  roleType: any;
  other: any = [];
  pageName: any;
  pageRedirction: any;
  projectId: any;
  isappointment: any;
  isSuperAdmin: boolean = false;
  startTime: any;
  clientType: string;
  isContactMatched: string;
  rid: any;
  public innerWidth: any;
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, public storage: Storage, public http: HttpClient,
    public loading: LoadingController, public alertCtrl: AlertController, public notification: NotificationProvider) {
  }
  ionViewDidLoad() {
    this.resourceId = this.navParams.get('resourceId');
    this.labId = this.navParams.get('labId');

    this.instrumentname = this.navParams.get('instrumentName')
    this.pageName = this.navParams.get('pageName');
    this.projectId = this.navParams.get('projectId');
    this.isappointment = this.navParams.get('appointmentcreated')
    this.isContactMatched = this.navParams.get('isContactMatch');
    //Client Based modification for /nmi  --Anto
    this.clientType = this.navParams.get('clientType')
    this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.deleteAppointmentUrl = this.appUrl + '/WS/IdeaElanService.svc/DeleteAppointment';
      this.updateAppointmentUrl = this.appUrl + '/WS/IdeaElanService.svc/InsertUpdateAppointment';
      this.getAppointmentUrl = this.appUrl + '/WS/IdeaElanService.svc/GetAllReservations';
      this.getCancellationRuleUrl = this.appUrl + '/WS/IdeaElanService.svc/CheckCancellationRule';
      this.getUserDeviceDetailsUrl = this.appUrl + '/WS/IdeaElanService.svc/GetUserDeviceDetails';
      this.sendPushNotificationUrl = this.appUrl + '/WS/IdeaElanService.svc/SendPushMessageToTokens';
      this.getUserDefaultDetailsUrl = this.appUrl + '/WS/IdeaElanService.svc/getUserDefaultDetails';
      this.checkReservationRuleUrl = this.appUrl + '/WS/IdeaElanService.svc/CheckReservationRule'
      if (this.pageName === 'Instument' || this.pageName === 'appointment') {
        this.pageRedirction = true
      }
    });
    this.storage.get('userDetails').then((val1) => {
      this.userJson = val1;
    });

    this.storage.get('userDetails').then((val1) => {
      this.userJson = val1;
      this.isAdmin = this.userJson.UserRole;
      if (this.isAdmin.includes("Admin")) {
        this.admin = true;
      }
    });
    this.storage.get('roleType').then((role) => {
      this.roleType = role
      var isContactMatched = this.navParams.get('isContactMatch');
      if (this.roleType === 'admin' || this.roleType === 'super' || this.roleType === 'providerAdmin' || isContactMatched) {
        this.isSuperAdmin = true;
      } else {
        this.isSuperAdmin = false
      }
    })
  }
  ionViewDidEnter() {
    this.startTime = new Date().getTime()
    let containerEl: JQuery = $('#calendar');
    containerEl.fullCalendar({
      header: {
        left: 'title',
        center: '',
        right: 'prev,next today'
      },
      height: 680,
      defaultView: "agendaWeek",
      editable: true,
      selectable: true,
      selectHelper: true,
      unselectAuto: true,
      selectOverlap: true,
      businessHours: true,
      timezone: 'local',
      dragScroll: true,
      allDaySlot: false,
      eventOverlap: (stillEvent, movingEvent) => {
        this.showAlert("Time slot is unavailable for this appointment ")
        return false
      },
      //  timeFormat: 'H(: mm)',
      select: (startDate, endDate) => {
        var selTime = moment(startDate, 'YYYY-MM-DD h:m:s A').format('HH:mm:ss')
        var curtime = moment().format('YYYY-MM-DD h:m:s A')
        var shour = moment(startDate).isAfter(curtime) //parseInt(selarr[0]) + " hrs";
        var stdate = startDate.toString()
        var endate = endDate.toString()
        if (!this.isSuperAdmin) {
          if ((Date.parse(stdate) <= Date.now())) {
            this.dateUnselectAlert();
            $('#calendar').fullCalendar('unselect');
            return false;
          }
        }
        this.GetUserDefaultDetails(startDate, endDate);
      },
      eventRender: (event, element, view) => {


      },
      eventAfterRender: (event, element, view) => {
        const dateIsBefore = moment(new Date()).isBefore(moment(event.start));
        var startDate = moment(new Date(event.start.toString())).format('L');
        if (this.isSuperAdmin) {
          element.find(".fc-bg").css("pointer-events", "none");
          element.prepend('<span><img id="Delete" src="assets/icon/Delete.png" width="20%" align="right" /></span><br/><div style="clear:both"></div>');
        } else {
          if (moment().diff(startDate, 'days') > 0) {

          } else {
            if (this.userJson.UserId != event.userId) {

            } else {
              element.find(".fc-bg").css("pointer-events", "none");
              element.prepend('<span><img id="Delete" src="assets/icon/Delete.png" width="20%" align="right" /></span><br/><div style="clear:both"></div>');
            }

          }

        }

      },

      eventClick: (calEvent, jsEvent, view) => {
        var eventid = $(jsEvent.target).attr('id')
        if (eventid === 'Delete') {
          this.CheckAppointmentCancellationRule(calEvent.id, calEvent.start, calEvent.end)
        }
      },

      viewRender: (view, element) => {
        containerEl.fullCalendar('removeEvents') //Hide all events
        this.GetAppointmentRequest();

      },

      eventResize: (event, delta, revertFunc, view) => {
        var sdate = moment(event.start).format('MMMM Do YYYY, h:mm:ss a');
        var edate = moment(event.end).format('MMMM Do YYYY, h:mm:ss a');
        this.sendUpdateRequest(event)
      },

      eventDrop: (event, delta, revertFunc, jsEvent, ui, view) => {
        if (!this.isSuperAdmin) {
          var selTime = moment(event.start, 'YYYY-MM-DD h:m:s A').format('YYYY-MM-DD h:m:s A')
          var curtime = moment().format('YYYY-MM-DD h:m:s A')
          var shour = moment(selTime).isBefore(curtime) //parseInt(selarr[0]) + " hrs";
          if (shour) {
            this.showAlert(" Cannot create/update reservation earlier than today date and time.")
            revertFunc()
          } else {
            this.sendUpdateRequest(event)
          }
        } else {
          this.sendUpdateRequest(event)

        }
        //  this.sendUpdateRequest(event)
        // containerEl.fullCalendar('refetchEvents')
      }
    });
  }
  // swipe right and left
  swipeEvent(e) {
    let containerEl: JQuery = $('#calendar');
    if (e.direction == 2) {
      //direction 2 = right to left swipe.
      containerEl.fullCalendar('next');
    } else if (e.direction == 4) {
      //direction 4 = left to right swipe.
      containerEl.fullCalendar('prev');
    }
  }
  isEditable: any;
  //Request for appointment from API
  GetAppointmentRequest() {
    this.other = [];
    let containerEl: JQuery = $('#calendar');
    this.start_date = containerEl.fullCalendar('getView').start
    this.end_date = containerEl.fullCalendar('getView').end
    var sdate = moment(this.start_date).format("MM/DD/YYYY");
    var edate = moment(this.end_date).format("MM/DD/YYYY");
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Updating . . ."
    });
    loader.present();
    var calendarEl = document.getElementById('calendar');
    //SEDNING UPDATE REQUEST
    this.http.post(this.getAppointmentUrl,
      {
        resourceid: this.resourceId,
        starttime: sdate,
        endtime: edate
      })
      .subscribe(
        (data: any) => {
          //RESPONSE
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.apptJson = resJSON;
        
          //New <Session Type> appointment created by <User Name> from <Start date and time> to <End Date and Time> for <Instrument Name>
          //this.notification.getUserDeviceDetails("resource", this.resourceId, "NAC", `Appointment created by <username> from ${sdate} to ${edate} for ${this.instrumentname} `, "New Appointment")
          this.apptJson.map(item => {
            switch (item.ColorType) {
              case 1: this.eventcolor = "#FF8A65"; this.textcolor = ""; break;
              case 2: this.eventcolor = "#EE82EE"; this.textcolor = ""; break;
              case 3: this.eventcolor = "#7CFC00"; this.textcolor = ""; break;
              case 4: this.eventcolor = "#BDB76B"; this.textcolor = "#000000"; break;
              case 5: this.eventcolor = "#0000ff"; this.textcolor = ""; break;
              case 6: this.eventcolor = "#000080"; this.textcolor = ""; break;
              case 7: this.eventcolor = "#FFC0CB"; this.textcolor = "#000000"; break;
              case 8: this.eventcolor = "#228B22"; this.textcolor = ""; break;
              case 9: this.eventcolor = "#B22222"; this.textcolor = ""; break;
              default: this.eventcolor = "";
            }
            if (this.isSuperAdmin) {
              this.isEditable = true
            } else if (item.UserId == this.userJson.UserId) {
              if (moment().diff(item.strStartTime, 'days') > 0) {
                this.isEditable = false
              } else {
                this.isEditable = true
              }
            } else {
              this.isEditable = false
            }
            return {
              userId: item.UserId,
              title: item.ApptName,
              resourceId: item.ResourceId,
              labId: item.LabId,
              projectId: item.ProjectId,
              sessionId: item.SessionId,
              id: item.AppointmentId,
              accountCodeFrom: item.AccountCodeFrom,
              sessionTypeId: item.SessionId,
              username: item.UserFullName,
              accountCodeId: item.LabAccountCodeId,
              adminUserId: item.AdminUserId,
              allDay: false,
              start: new Date(item.strStartTime),
              end: new Date(item.strEndTime),
              tag: item.TagIds,
              textColor: this.textcolor,
              backgroundColor: this.eventcolor,
              eventBorderColor: 'none',
              editable: this.isEditable,
              SpecialInstruction: item.SpecialInstruction
            }
          }).forEach(item => this.other.push(item));
          //Adding Events for the Calendar
      
          containerEl.fullCalendar('addEventSource', this.other);
          loader.dismiss();
        },//ERROR HANDLING
        error => {
          loader.dismiss();
        
        }
      );
  }

  //Cancel Appointment 
  CancelAppointmentRequest(eventid, eventstart, eventend) {
    var sdate = moment(eventstart).format('MMMM Do YYYY, h:mm:ss a');
    var edate = moment(eventend).format('MMMM Do YYYY, h:mm:ss a');
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Updating . . ."
    });
    loader.present();
    this.http.post(this.deleteAppointmentUrl,
      {
        apptid: eventid,
        user: this.userJson.EmailAddress
      })
      .subscribe(
        (data: any) => {
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.apptJson = resJSON;
          let containerEl: JQuery = $('#calendar');
          containerEl.fullCalendar('removeEvents', eventid)
          this.showAlert("Appointment Cancelled successfully.")
          this.notification.getUserDeviceDetails("resource", this.resourceId, "UCA", `Appointment from ${sdate} to ${edate} for ${this.instrumentname} has been cancelled`, "Appointment Cancelled")
          loader.dismiss();
        },//ERROR HANDLING
        error => {
          loader.dismiss();
        
        }
      );
  }

  sendUpdateRequest(event) {
    this.rid = event.resourceId
    var sdate = moment(new Date(event.start._d)).format("YYYY-MM-DD HH:mm")
    var edate = moment(new Date(event.end._d)).format("YYYY-MM-DD HH:mm")
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Updating . . ."
    });
    loader.present();
    //SEDNING UPDATE REQUEST
    this.http.post(this.updateAppointmentUrl,
      {
        userid: event.userId,
        resourceid: event.resourceId,
        labid: event.labId,
        accountcodeid: event.accountCodeId,
        projectid: event.projectId,
        sessiontypeid: event.sessionId,
        starttime: sdate,
        endtime: edate,
        username: event.username,
        accountcodefrom: event.accountCodeFrom,
        specialinst: event.SpecialInstruction,
        apptid: event.id,
        user: this.userJson.EmailAddress,
        incharge: event.adminUserId,
        tagids: event.tag
      })
      .subscribe(
        (data: any) => {
          //RESPONSE
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          let i=0;
          for(i=0;i<this.apptJson.length;i++)
          {
            if(this.apptJson[i].ResourceId==event.resourceId)
            {
              this.instrumentname=this.apptJson[i].ResourceName;
              break;
            }
          
          }


        
          if (isNumber(resJSON.InsertUpdateAppointmentResult) || !isNaN(resJSON.InsertUpdateAppointmentResult)) {
          
            this.notification.getUserDeviceDetails("resource", this.resourceId, "UEA", `Appointment from ${sdate} to ${edate} for ${this.instrumentname} has been modified`, "Appointment Modified");
          } else {
            this.showAlert(resJSON.InsertUpdateAppointmentResult)
          }

          loader.dismiss();
        },//ERROR HANDLING
        error => {
          loader.dismiss();
    
        }
      );
  }

  showConfirm(eventid, eventstart, eventend) {
    const confirm = this.alertCtrl.create({
      title: 'Cancel Appointment',
      message: 'Are you sure you want to Cancel Appointment.',
      buttons: [
        {
          text: 'Cancel',
          handler: () => { }
        },
        {
          text: 'Yes',
          handler: () => {
            this.CancelAppointmentRequest(eventid, eventstart, eventend);
          }
        }
      ]
    });
    confirm.present();
  }


  CheckAppointmentCancellationRule(eventid, eventstart, eventend) {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Updating . . ."
    });
    loader.present();
    this.http.post(this.getCancellationRuleUrl,
      {
        apptid: eventid,
        loggedinuser: this.userJson.UserId
      })
      .subscribe(
        (data: any) => {
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          if (resJSON.IsSuccess = true) { this.showConfirm(eventid, eventstart, eventend) }
          else { this.showAlert(resJSON.Alert) }
          loader.dismiss();
        },//ERROR HANDLING
        error => {
          loader.dismiss();
     
        }
      );
  }

  CheckAppointmentReservationRule(eventid, eventstart, eventend) {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Updating . . ."
    });
    loader.present();
    this.http.post(this.checkReservationRuleUrl,
      {
        apptid: eventid,
        loggedinuser: this.userJson.UserId,
     
        flag: 'O'
      })
      .subscribe(
        (data: any) => {
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          if (resJSON.IsSuccess = true) { this.showConfirm(eventid, eventstart, eventend) }
          else { this.showAlert(resJSON.Alert) }
          loader.dismiss();
        },//ERROR HANDLING
        error => {
          loader.dismiss();
      
        }
      );
  }

  showAlert(eventdata) {
    const alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: eventdata,
      buttons: ['OK']
    });
    alert.present();
  }
  dateUnselectAlert() {
    const alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: "Cannot create appointment in the past",
      buttons: ['OK']
    });
    alert.present();
  }

  createAppointmentRequest(start, end, defaultJson) {

  //  var sdate = moment(new Date(start)).format("YYYY-MM-DD HH:mm")
  //  var edate = moment(new Date(end)).format("YYYY-MM-DD HH:mm")
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Updating . . ."
    });
    loader.present();
    //SEDNING UPDATE REQUEST
    this.http.post(this.updateAppointmentUrl,
      {
        userid: this.userJson.UserId,
        resourceid: this.resourceId,
        labid: defaultJson.LabId,
        accountcodeid: defaultJson.LabAccountCodeId,
        projectid: defaultJson.ProjectId,
        sessiontypeid: defaultJson.ProviderSessionMapId,
        starttime: start,
        endtime: end,
        username: this.userJson.FirstName,
        accountcodefrom: defaultJson.AccountCodeFrom,
        specialinst: "",
        apptid: "0",
        user: this.userJson.EmailAddress,
        incharge: "",
        tagids: "0"
      })
      .subscribe(
        (data: any) => {
          // modified by Abey Abraham

          this.notification.getUserDeviceDetails("resource", this.resourceId, "NAC", `Appointment created by ${this.userJson.LastName} ${this.userJson.FirstName}  from ${start} to ${end} for ${this.instrumentname} `, "New Appointment")
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          if (isNumber(resJSON.InsertUpdateAppointmentResult) || !isNaN(resJSON.InsertUpdateAppointmentResult)) {
            let containerEl: JQuery = $('#calendar');
            containerEl.fullCalendar('removeEventSource', this.other)
            $('#calendar').fullCalendar('unselect');
            this.GetAppointmentRequest()
          } else {
            let alert = this.alertCtrl.create({
              title: 'Alert',
              message: resJSON.InsertUpdateAppointmentResult,
              buttons: ['OK']
            });
            alert.present();
          }
          loader.dismiss();
        },//ERROR HANDLING
        error => {
          loader.dismiss();

        }
      );
  }
  userDefaultJson: any;
  GetUserDefaultDetails(sdate, edate) {
    var startdate = moment(new Date(sdate._d)).format("YYYY-MM-DD HH:mm")
    var enddate = moment(new Date(edate._d)).format("YYYY-MM-DD HH:mm")
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
  
    //  loader.present();
    this.http.post(this.getUserDefaultDetailsUrl, {
      resourceid: this.resourceId,
      userid: this.userJson.UserId,
      start: startdate,
      end: enddate
    }).subscribe(
      (data: any) => {
        //RESPONSE
   
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
        this.userDefaultJson = resJSON
  
        if (resJSON.Table[0].IsError === true) {
          let alert = this.alertCtrl.create({
            title: 'Alert',
            message: resJSON.Table[0].Message,
            buttons: ['OK']

          });
          alert.present();
          return false;
        }
        else if (resJSON.Table[0].IsOpenPopup === true) {
          this.storage.set("defaultAppStrDate", sdate)
          this.storage.set("defaultAppEnDate", edate)
          this.storage.set('pageSelected', this.navParams.get('PageSelected'));
     
          this.navCtrl.push(AppointmentsPage, {
            "StartDate": sdate,
            "EndDate": edate,
            "ResourceId": this.resourceId,
            "LabId": this.labId,
            "page": "schedule",
            "UserId": this.userJson.UserId,
        
            'ProjectId': this.projectId,
            "pageType": "create",
            "isContactMatch": this.isContactMatched,
            "FacilityName": this.navParams.get('FacilityName')
          }).then(() => {
            const startIndex = this.navCtrl.getActive().index - 1;
            this.navCtrl.remove(startIndex, 1);
          });
        } else if (resJSON.Table[0].IsOpenPopup === false) {
          this.createAppointmentRequest(startdate, enddate, resJSON.Table1[0])
        }
      },//ERROR HANDLING
      error => {
        loader.dismiss();

      }
    );
  }
  goBack() {
    this.navCtrl.push(MenuPage, { "page": "NaviPage" }).then(() => {
      const startIndex = this.navCtrl.getActive().index - 1;
      this.navCtrl.remove(startIndex, 1);
    });
  }

}
