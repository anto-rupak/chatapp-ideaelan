import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { LoadingController, AlertController } from 'ionic-angular';
import * as moment from "moment";
import { isNumber } from 'util';
import { SchedularPage } from '../schedular/schedular';
import { map} from 'rxjs/operators';
import { NotificationProvider } from '../../providers/notification/notification';
import { MessageProvider } from '../../providers/message/message';
import { ActivitylogsProvider } from '../../providers/activitylogs/activitylogs';
import { Calendar } from '@ionic-native/calendar';
import {Injectable} from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-appointments',
  templateUrl: 'appointments.html',
})


export class AppointmentsPage {
  //==========Page Type===========
  pageType: string;
  pageName: string;
  //==========URL==============
  appUrl: string;
  getLabUrl: string;
  getResourceUrl: string;
  getAccountUrl: string;
  getProjectUrl: string;
  getSessionUrl: string;
  getAdminUrl: string;
  getTagsUrl: string;
  updateAppointmentUrl: string;
  getAppointmentUrl: string;
  getUserDeviceDetailsUrl: string;
  sendPushNotificationUrl: string;
  membershipValue: string;
  //==========Json===========
  project_Json: any;
  lab_Json: any;
  curr_user_Json: any;
  user_Json: any;
  admin_Json: any;
  session_Json: any;
  account_Json: any;
  tag_Json: any;
  selectedLabJson: any;
  //===========Open-up drop-down Based on Value================
  isTagOpenUp: boolean;
  isAdminOpenup: boolean;
  isAccountOpenup: boolean;
  isUserOpenUp: boolean;
  isTagMandatory: boolean;
  //=================Global Variables==========================
  project_Id: any;
  lab_Id: any;
  account_Id: any;
  admin_Id: string[];
  resource_Id: any;
  tag_Id: string[];
  session_Id: any;
  session_name: any;
  startTime: string;
  endTime: any;
  specialInst: string;
  appointment_Id: any;

  curr_user_Id: string;
  user_Id: any;
  role_Type: string;
  isAdminTrue: boolean;
  projectType: string;

  status_Proj: boolean;
  status_Lab: boolean;
  status_Session: boolean;
  status_Account: boolean;
  buttonName: any
  defaultStrDate: any;
  clientType: string;
  loginUrl: string;
  //reset
  resetUser: any;
  resetdefaultLab: any;
  resetdefaultSession: any;
  resetdefaultProject: any;
  resetdefaultAccount: any;
  resetdefaultAdmin: any;
  resetdefaultTag: any;
  resetSpecialInstruction: any;
  resetStartDate: any
  resetEndDate: any;
  loader = this.loading.create({
    spinner: "crescent",
    content: "Loading . . . "
  });
  adm: any;
  isProjectMand: boolean
  isContactMatched:string
  constructor(public calendar:Calendar,public logs: ActivitylogsProvider, public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public storage: Storage,
    public loading: LoadingController, public notification: NotificationProvider, public alertCtrl: AlertController, public message: MessageProvider) {

  }

  ionViewDidLoad() {
    this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.getLabUrl = this.appUrl + '/WS/IdeaElanService.svc/GetLabs';
      this.getResourceUrl = this.appUrl + '/WS/IdeaElanService.svc/GetAllUserBasedOnResourceId';
      this.getAccountUrl = this.appUrl + '/WS/IdeaElanService.svc/GetAccountCodes';
      this.getProjectUrl = this.appUrl + '/WS/IdeaElanService.svc/GetProjects';
      this.getSessionUrl = this.appUrl + '/WS/IdeaElanService.svc/GetSessionType';
      this.getAdminUrl = this.appUrl + '/WS/IdeaElanService.svc/GetAdmins';
      this.updateAppointmentUrl = this.appUrl + '/WS/IdeaElanService.svc/InsertUpdateAppointment';
      this.getAppointmentUrl = this.appUrl + '/WS/IdeaElanService.svc/GetAllReservations';
      this.getUserDeviceDetailsUrl = this.appUrl + '/WS/IdeaElanService.svc/GetUserDeviceDetails';
      this.sendPushNotificationUrl = this.appUrl + '/WS/IdeaElanService.svc/SendPushMessageToTokens';
      this.getTagsUrl = this.appUrl + '/WS/IdeaElanService.svc/GetApplicationTags/';
      this.loginUrl = this.appUrl + '/WS/IdeaElanService.svc/ValidateLogin';
      if (this.appUrl.includes('/NMI')) { this.clientType = 'nmi' } else
      if (this.appUrl.includes('/uq')) { this.clientType = 'uq' } else
        if (this.appUrl.includes('/caltech')) { this.clientType = 'caltech' }
        this.storage.set('clientType', this.clientType)

    });
    this.storage.get('userDetails').then((val1) => {
      this.curr_user_Json = val1;
    });
    this.storage.get('clientType').then((client) => {
      this.clientType = client;

      if (this.clientType === 'nmi' || this.clientType === 'uq') {
        this.isProjectMand = true;
      }
      if (this.clientType === 'caltech') {
        if (this.navParams.get('FacilityName') === 'Biological and Cryo-TEM') {
          this.isProjectMand = true;
        } else {
          this.isProjectMand = false;
        }
      }
    });
    this.storage.get('defaultAppEnDate').then((end) => {
      this.defaultEndDate = moment(end).toISOString(true)
    })
    this.storage.get('defaultAppStrDate').then((str) => {
      this.defaultStrDate = moment(str).toISOString(true)
    })
    this.storage.get('roleType').then((role) => {
      this.role_Type = role
      //Client based modification
      this.isContactMatched = this.navParams.get('isContactMatch');

      if (this.role_Type === 'admin' || this.role_Type === 'super' || this.role_Type === 'providerAdmin' || this.isContactMatched) {
        this.isUserOpenUp = true;
        //  this.admin = true
      } else {
        this.isUserOpenUp = false
      }
    })

    //To get the Page the either to edit or create.
    this.pageType = this.navParams.get('pageType');
    if (this.pageType == "create") {
      this.pageName = "Create Appointment"
      this.buttonName = "Save"
      this.storage.get('userDetails').then((val1) => {
        this.project_Id = val1.DefaultProject; if (this.project_Id <= 0 || this.project_Id === undefined) { this.project_Id = 0 }
        this.lab_Id = val1.DefaultGroup; if (this.lab_Id <= 0 || this.lab_Id === undefined) { this.lab_Id = 0 }
        this.resetdefaultLab = this.lab_Id
        this.resetdefaultTag = 0
        this.tag_Id = []
      });
    } else if (this.pageType == "edit") {
      this.pageName = "Edit Appointment"
      this.buttonName = "Update"
      this.lab_Id = this.navParams.get('LabId'); if (this.lab_Id <= 0 || this.lab_Id === undefined) { this.lab_Id = 0 }
      this.resetdefaultLab = this.lab_Id
      this.tag_Id = this.navParams.get('TagIds');
      if (this.tag_Id == null || this.tag_Id === undefined) {
        this.tag_Id = []
      } else {
        var tagValue = this.tag_Id.toString()
        var tag = tagValue.split(",")
        this.tag_Id = tag
      }
      this.resetdefaultTag = this.tag_Id

    } else {

    }
    //Navparms to get the values from other pages.
    this.user_Id = this.navParams.get('UserId');
    this.resetUser = this.user_Id
    this.project_Id = this.navParams.get('ProjectId'); if (this.project_Id <= 0 || this.project_Id === undefined) { this.project_Id = 0 }
    this.resetdefaultProject = this.project_Id
    this.resource_Id = this.navParams.get('ResourceId');
    this.appointment_Id = this.navParams.get('AppointmentId'); if (this.appointment_Id <= 0 || this.appointment_Id === undefined) { this.appointment_Id = 0 }
    this.account_Id = this.navParams.get('AccountCode'); if (this.account_Id <= 0 || this.account_Id === undefined) { this.account_Id = 0 }
    this.resetdefaultAccount = this.account_Id
    this.admin_Id = this.navParams.get('AdminUserId'); if (this.admin_Id == null || this.admin_Id === undefined) { this.admin_Id = [] } else {
      var adminValue = this.admin_Id.toString()
      var admin = adminValue.split(",")
      this.admin_Id = admin
    }
    this.resetdefaultAdmin = this.admin_Id
    this.session_Id = this.navParams.get('SessionId'); if (this.session_Id <= 0 || this.session_Id === undefined) { this.session_Id = 0 }
    this.resetdefaultSession = this.session_Id
    this.specialInst = this.navParams.get('SpecialInstruction');
    this.resetSpecialInstruction = this.specialInst
    this.startTime = moment(this.navParams.get("StartDate")).toISOString(true);
    this.resetStartDate = this.startTime
    this.endTime = moment(this.navParams.get("EndDate")).toISOString(true);
    this.resetEndDate = this.endTime
  }

  ionViewDidEnter() {
    this.getResourceRequest()
    this.GetProjectDetails();
    this.sendLabRequest()
    this.GetTag()
    this.GetSessionDetails()
  }
  getResourceRequest() {
    this.http.post(this.getResourceUrl, {
      resourceid: this.resource_Id,
    }).subscribe(
      (data: any) => {
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
        this.user_Json = resJSON;
      },//ERROR HANDLING
      error => {
 
      }
    );
  }
  isprojectDisabled: boolean;
  userOnChangeHandeler() {
    this.project_Id = 0
    this.GetProjectDetails()
  }
  GetProjectDetails() {
    this.status_Proj = false
    var dateTime = moment().format("YYYY/MM/DD");
   
    this.http.post(this.getProjectUrl, {
      userid: this.user_Id,
      resourceid: this.resource_Id,
      usertoken: this.curr_user_Json.UserToken,
      startdate: dateTime,
      loggedinuser: this.curr_user_Json.UserId,
      providerid: 0,
      isreservation: 1
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
    
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.project_Json = resJSON;
          if (this.project_Json[0].hasOwnProperty('Message')) {
            this.isprojectDisabled = true
          } else {
            this.isprojectDisabled = false
          }
          this.GetSessionDetails()
          this.projectOnChangeHandeler()
        },//ERROR HANDLING
        error => {
     
          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);
          if (resErrJSON.status == 400) {
            this.project_Json = []
            this.status_Proj = true
          }
        }
      );
  }

  sendLabRequest() {
    this.status_Lab = false
    this.http.post(this.getLabUrl, {
      userid: this.user_Id,
      resourceid: this.resource_Id,
      usertoken: this.curr_user_Json.UserToken,
      projectid: this.project_Id,
      loggedinuser: this.curr_user_Json.UserId
      //providerid: 0
    }).subscribe(
      (data: any) => {
        //RESPONSE
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
        this.lab_Json = resJSON;
      
        if (this.lab_Id > 0) {
          var lab_Id = this.lab_Json.filter(p => p.GroupId == this.lab_Id);
        }

        if (lab_Id == undefined || JSON.parse(lab_Id.length) <= 0) {
          this.lab_Id = 0
        }
        this.getProjectIdByKey(this.project_Id, this.project_Json);
        this.getAccountValueByKey(this.lab_Id, this.lab_Json);
        this.GetAccountDetails();

      },//ERROR HANDLING
      error => {
        //  loader.dismiss();
 
        let resErr = JSON.stringify(error);
        let resErrJSON = JSON.parse(resErr);
        this.lab_Id = 0
        this.lab_Json = [];
        if (resErrJSON.status == 400) {
          this.status_Lab = true
        }
      });
  }
  projectName:string;
  projectOnChangeHandeler() {
    this.globalLoader()
    this.sendLabRequest()
    if (this.project_Id > 0 && this.clientType == "nmi") {
      let Json_Sel_project = this.project_Json.filter(i => i.ProjectId == this.project_Id);
      this.projectName =Json_Sel_project[0].ProjectName
        var n = this.projectName.includes("Service")
        if (n && this.session_Json.length > 0) {
          let session_Details = this.session_Json.filter(i => i.SessionType === "Maintenance");
          this.session_Id = session_Details[0].SessionMapId
        }
    }
  }
  labType: string = "Account Code";

  accountHandling() {
    this.globalLoader()
    this.getAccountValueByKey(this.lab_Id, this.lab_Json)
    if (!this.isAccountOpenup  ) {
      this.GetAccountDetails();
    } else {
      this.account_Id = 0;
      return false;
    }
  }
  globalLoader() {
    let loading = this.loading.create({
      spinner: "crescent",
      content: 'Loading ...'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

  account_mul_proj_val: any = []

  GetAccountDetails() {
    if (this.isAccountOpenup ) {
      return false
    }
  
    this.status_Account = false
    if (!this.isAccountOpenup) {
      if (this.lab_Id > 0) {
        let Json_Sel_lab = this.lab_Json.filter(i => i.GroupId == this.lab_Id);
        if (Json_Sel_lab[0].GroupType === "P") {
          this.labType = "PO Number"
        } else {
          this.labType = "Account Code"
        }
      }
    }
    this.http.post(this.getAccountUrl, {
      userid: this.user_Id,
      resourceid: this.resource_Id,
      labid: this.lab_Id,
      usertoken: this.curr_user_Json.UserToken,
      loggedinuser: this.curr_user_Json.UserId
    }).pipe(
      map((res: any) => {
        return res.filter((post) => {
         
          if (this.project_Id == undefined || this.project_Id == 0 || this.projectType == "project" ) {
            return post.IsExpired == false && post.IsMembership == false;
          } else if (this.projectType == "membership") {

            return post
            // return post.ProjectId == this.project_Id;
          }else if(this.project_Id > 0){
            return post.IsExpired == false && post.IsMembership == false;
          }
          // return post;
        })
      })
    ).subscribe(
      (data: any) => {
        //RESPONSE
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
        this.account_Json = resJSON;
        if (this.project_Id > 0 && !this.isprojectDisabled) {
          this.account_mul_proj_val = []
          for (let p = 0; this.account_Json.length > p; p += 1) {
            if (this.account_Json[p].hasOwnProperty('ProjectIds')) {
              if(this.account_Json[p].ProjectIds == -1){
                this.account_mul_proj_val.push(this.account_Json[p]);
              }else{
                var acc_map_multiple_acc = this.account_Json[p].ProjectIds.split(",")
                for (let i = 0; acc_map_multiple_acc.length > i; i += 1) {
                  if (acc_map_multiple_acc[i] == this.project_Id) {
                    this.account_mul_proj_val.push(this.account_Json[p]);
                  }
                }
              }
            
            }
          }

          this.account_Json = this.account_mul_proj_val
         
        }
        if (this.account_Id > 0) {
          var acc_Id = this.account_Json.filter(p => p.GroupAccountCodeId == this.account_Id);
        }

        if (acc_Id == undefined || JSON.parse(acc_Id.length) <= 0) {
          this.account_Id = 0
        }
        if (this.projectType == "membership") {
          // Select the default PO code or Membership code.
          if (this.account_Json.length > 0) {
            this.account_Id = this.account_Json[0].GroupAccountCodeId
          }
          //client based modification -- requirements:: "If membership is 'true' then hide Account code"
        }
        if (this.clientType === 'uq' && this.projectType == "membership") {
          this.account_Id = 0
          this.isAccountOpenup = true
          return false
        } else {
          this.isAccountOpenup = false
        }
    
      },//ERROR HANDLING
      error => {
     

        let resErr = JSON.stringify(error);
        let resErrJSON = JSON.parse(resErr);
        if (resErrJSON.status == 400) {
          this.account_Id = 0
          this.account_Json = [];
          this.status_Account = true
          //     this.GetSessionDetails(id);
        }
      });
  }

  getAccountValueByKey(key, data) {
    // Requirements:: If GroupType=='N' then hide the Account code dropdown.
    if (data.length > 0) {
      for (let i = 0; data.length > i; i += 1) {
        if (data[i].GroupId == key) {
          if (data[i].GroupType === 'N') {
            this.isAccountOpenup = true

         
            return false
          } else {
            this.isAccountOpenup = false
           
            return true
          }

        }
      }
    }
  }
  getProjectIdByKey(key, data) {
    //Requirements:: To check whether project is based on membership or project.
    if (key == 0 || key == "0") {
      this.projectType = "project"
      this.isAccountOpenup = false
      return true
    }
    if(data == undefined){
      data =""
    }
    if (data.length > 0 || data != undefined) {
      for (let i = 0; data.length > i; i += 1) {
        if (data[i].ProjectId == key) {
          if (data[i].hasOwnProperty('IsMembership')) {
            this.projectType = "membership";
            this.isAccountOpenup = false
            this.membershipValue = data[i].IsMembership;
          } else {
            this.projectType = "project"
          }
          break;
        }
      }
    } else {
      this.projectType = "project"
    }
    //return this.labId = data[0].ProjectId;
  }

  GetSessionDetails() {

    this.status_Session = false
    this.http.post(this.getSessionUrl, {
      userid: this.user_Id,
      resourceid: this.resource_Id,
      labid: this.lab_Id,
      usertoken: this.curr_user_Json.UserToken,
      loggedinuser: this.curr_user_Json.UserId
    }).subscribe(
      (data: any) => {
   
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
        this.session_Json = resJSON;
        if (this.project_Id > 0 && this.clientType == "nmi" && this.pageType == "create") {
          let Json_Sel_project = this.project_Json.filter(i => i.ProjectId == this.project_Id);
          this.projectName =Json_Sel_project[0].ProjectName
            var n = this.projectName.includes("Service")
            
            if (n && this.session_Json.length > 0) {
              let session_Details = this.session_Json.filter(i => i.SessionType === "Maintenance");
              this.session_Id = session_Details[0].SessionMapId
              
            }
        
        }
        if (this.pageType == "create" && this.clientType != "nmi") {
          this.session_Id = resJSON[0].DefaultProviderSessionMapId;
          for (let i = 0; this.session_Json.length > i; i += 1) {
            if (this.session_Json[i].SessionMapId == this.session_Id) {
              this.session_Id = resJSON[0].DefaultProviderSessionMapId;
              var sessionvalue = true
              return this.session_Id
            } else {
              sessionvalue = false
            }
          }
          if (!sessionvalue) { this.session_Id = 0 }
    
          //  this.session_Id = sessionvalue
        }
       
        this.GetAdminDetails()
      },//ERROR HANDLING
      error => {
     
        let resErr = JSON.stringify(error);
        let resErrJSON = JSON.parse(resErr);
        if (resErrJSON.status == 400) {
          this.session_Json = [];
          this.status_Session = true
        }
      }
    );
  }

  GetTag() {
    this.http.get(this.getTagsUrl + this.resource_Id + ',' + 0)
      .subscribe(
        (data: any) => {
          //RESPONSE
        
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.tag_Json = resJSON;
          this.isTagOpenUp = true
          if (resJSON[0].IsTagMandatory) {
            this.isTagMandatory = true
          } else {
            this.isTagMandatory = false
          }
  
        },//ERROR HANDLING
        error => {
      
          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);
          if (resErrJSON.status == 400) {
            this.isTagOpenUp = false
            //this.stat = true
          }
        }
      );
  }

  GetAdminDetails() {
    //  this.getSessionValuesBySessionId(id)
    if (this.session_Id > 0) {
      let Json_Sel_Proj = this.session_Json.filter(i => i.SessionMapId == this.session_Id);
      if (Json_Sel_Proj.length > 0) {
        if (Json_Sel_Proj[0].hasOwnProperty('showAdminSelection')) {
          this.isAdminOpenup = Json_Sel_Proj[0].showAdminSelection;
        } else {
          this.isAdminOpenup = false
        }
      }


      if (this.isAdminOpenup) {
        this.isAdminOpenup = true
      } else {
        this.admin_Id = []
        this.isAdminOpenup = false
      }
    }

    this.http.post(this.getAdminUrl, {
      userid: this.curr_user_Json.UserId,
      usertoken: this.curr_user_Json.UserToken,
      resourceid: this.resource_Id
    })
      .subscribe(
        (data: any) => {
 
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.admin_Json = resJSON;
        },//ERROR HANDLING
        error => {
     
        }
      );
  }

  validationRequest() {
    if (this.isProjectMand) {
      if (this.project_Id <= 0 || this.project_Id == undefined) {
        this.showAlert("Project is Mandatory.")
        return false
      }
    }

    if (this.isAccountOpenup) {
      if (this.lab_Id <= 0 || this.session_Id <= 0) {
        this.showAlert("Enter required fields")
        return false
      }
    } else {
      if (this.lab_Id <= 0 || this.session_Id <= 0 || this.account_Id <= 0) {
        this.showAlert("Enter required fields")
        return false
      }
    }


    if (this.isAdminOpenup) {
      if (this.admin_Id.length <= 0 || this.admin_Id === undefined || this.admin_Id == null || this.admin_Id[0] == "") {
        this.showAlert("Enter Admin details")
        return false
      }
    }

    if (this.isTagMandatory) {
      if (this.tag_Id == null || this.tag_Id === undefined || this.tag_Id.length <= 0 || this.tag_Id.length == undefined) {
        this.showAlert("Enter Tag details")
        return false
      }
    }
    if (this.startTime > this.endTime) {
      this.startTime = this.defaultStrDate
      this.endTime = this.defaultEndDate
      this.showAlert("Start Date Cannot be after End Date.")
      return false
    }

    if (this.account_Id > 0) {
      if (this.project_Id <= 0 && !this.isprojectDisabled) {
        let Json_Sel_acc = this.account_Json.filter(i => i.GroupAccountCodeId == this.account_Id);
   
        if (Json_Sel_acc[0].hasOwnProperty('ProjectIds')) {
          
          if (!Json_Sel_acc[0].hasOwnProperty('IsMembership')) {
            var acc_map_multiple_acc = Json_Sel_acc[0].ProjectIds.split(",")
            if (acc_map_multiple_acc.length > 1) {
              this.showAlert(this.labType + " is mapped with multiple project. Select atleast one project.")
              return false
            }
          }

        }
      }
    }

    this.sendUpdateRequest()
  }
  tagValue: []
  sendUpdateRequest() {
    this.globalLoader()
    if (this.lab_Json.length > 0 || this.lab_Id != null) {
      let Json_Sel_Lab = this.lab_Json.filter(i => i.GroupId == this.lab_Id);
   
      this.selectedLabJson = Json_Sel_Lab;
      var AccountCodeFrom = Json_Sel_Lab[0].AccountCodeFrom
    }

    if (this.user_Id > 0) {
      var user_detail = this.user_Json.filter(p => p.UserId == this.user_Id);
   
    }

    if (this.isTagOpenUp) {
      if (this.tag_Id.length > 0 || this.tag_Id.length != undefined) {
        var tagValue = this.tag_Id.join(",");
      
      }
    }
    if (this.isAdminOpenup) {
      if (this.admin_Id.length > 0) {
        var adminValue = this.admin_Id.join(",")
      }
    }

    var startdate = moment(new Date(this.startTime)).format("YYYY-MM-DD HH:mm:ss")
    var enddate = moment(new Date(this.endTime)).format("YYYY-MM-DD HH:mm:ss")
    var apptName = user_detail[0].LastName + " " + user_detail[0].FirstName
    //SEDNING UPDATE REQUEST
    this.http.post(this.updateAppointmentUrl,
      {
        userid: user_detail[0].UserId,
        resourceid: this.resource_Id,
        labid: this.lab_Id,
        accountcodeid: this.account_Id,
        projectid: this.project_Id,
        sessiontypeid: this.session_Id,
        starttime: startdate,
        endtime: enddate,
        username: apptName,
        accountcodefrom: AccountCodeFrom,
        specialinst: this.specialInst,
        apptid: this.appointment_Id,
        user: this.curr_user_Json.EmailAddress,
        incharge: adminValue,
        tagids: tagValue
      })
      .subscribe(
        (data: any) => {
          //RESPONSE
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          if (isNumber(resJSON.InsertUpdateAppointmentResult) || !isNaN(resJSON.InsertUpdateAppointmentResult)) {
          
            if (this.pageType == "create") {

          //  this.saveEvent(this.project_Id,this.lab_Id,this.specialInst,startdate,enddate);
              let alert = this.alertCtrl.create({
                title: 'Success',
                message: "Appointment created Successfully",
                buttons: [{
                  text: 'OK',
                  handler: data => {
                    this.navCtrl.push(SchedularPage, { 'resourceId': this.resource_Id, 'labId': this.lab_Id, 'pageName': 'appointment','isContactMatch': this.isContactMatched,'FacilityName': this.navParams.get('FacilityName')})
                      .then(() => {
                        
                        const startIndex = this.navCtrl.getActive().index - 1;
                        this.navCtrl.remove(startIndex, 1);
                      });

                  }
                }],
              });
              alert.present();
              /*modified by ABEY ABRAHAM
              
                  let i=0;
                           for(i=0;i<this.session_Json.length;i++)
                           {
                             if(this.session_Json[i])
                           }
              
              */

              let i = 0;
              for (i = 0; i < this.session_Json.length; i++) {
                if (this.session_Json[i].SessionMapId == this.session_Id) {
                  this.session_name = this.session_Json[i].SessionType;
                  break;
                }
              }

              if (this.session_name == null) {
                this.session_name = this.session_Id;
              }

           
              if (this.isAdminOpenup) {
                this.logs.insertlog("Appointment   ", "Create Appointment Page", " clicked create apppointment button ", `User clicked create appointment button and admin selection dropdown is also selected , New ${this.session_name} appointment created by ${this.curr_user_Json.LastName} ${this.curr_user_Json.FirstName} from ${startdate} to ${enddate} for ${this.selectedLabJson[0].GroupName}  `, this.curr_user_Json.UserId);
        
                
                this.notification.getUserDeviceDetails("resource", this.resource_Id, "TRM", `New ${this.session_name} appointment created by ${this.curr_user_Json.LastName} ${this.curr_user_Json.FirstName} from ${startdate} to ${enddate} for ${this.selectedLabJson[0].GroupName}`, `${this.session_name} appointment notification`);
              }
              else {
            
                this.logs.insertlog("Appointment   ", "Create Appointment Page", " clicked create apppointment button ", `User clicked create appointment button , New ${this.session_name} appointment created by ${this.curr_user_Json.LastName} ${this.curr_user_Json.FirstName} from ${startdate} to ${enddate} for ${this.selectedLabJson[0].GroupName}  `, this.curr_user_Json.UserId);
                this.notification.getUserDeviceDetails("resource", this.resource_Id, "NAC", `New ${this.session_name} appointment created by ${this.curr_user_Json.LastName} ${this.curr_user_Json.FirstName} from ${startdate} to ${enddate} for ${this.selectedLabJson[0].GroupName}`, `${this.session_name} appointment notification`);
              }


              //ifadminselection is true
              // this.notification.getUserDeviceDetails("user", user_detail[0].UserId, "TRM", `New ${this.session_name} appointment created by ${this.curr_user_Json.LastName} ${this.curr_user_Json.FirstName} from ${startdate} to ${enddate} for ${this.selectedLabJson.GroupName}`, `${this.session_name} appointment notification`);
              //ifadminselection is false
              // this.notification.getUserDeviceDetails("resource",this.resource_Id, "NAC", `New ${this.session_name} appointment created by ${this.curr_user_Json.LastName} ${this.curr_user_Json.FirstName} from ${startdate} to ${enddate} for ${this.selectedLabJson.GroupName}`, `${this.session_name} appointment notification`);

            } else {



              //edit appointment
              this.logs.insertlog("Appointment   ", "Edit Appointment Page", " clicked edit apppointment button ", `User clicked edit appointment button clicked , Appointment from ${startdate} to ${enddate} for ${this.selectedLabJson[0].GroupName} has been modified`, this.curr_user_Json.UserId);
              this.notification.getUserDeviceDetails("resource", this.resource_Id, "UEA", `Appointment from ${startdate} to ${enddate} for ${this.selectedLabJson[0].GroupName} has been modified`, "Appointment Modified");
              this.message.showMessagePop('Alert', 'Appointment Updated Successfully');
            }

            // this.navCtrl.push(MenuPage);
          } else {
            this.showAlert(resJSON.InsertUpdateAppointmentResult)
          }
        },//ERROR HANDLING
        error => {
    
        }
      );
  }


  startdatetime(event) {
    var startDate = (event.month + '/' + event.day + '/' + event.year + " " + event.hour + ':' + event.minute);
    startDate = moment(startDate).toISOString(true);
    //    if (this.startTime > this.endTime) {
    //      this.startTime = this.navParams.get('StartDate')
    //      this.showAlert("Start Date Cannot be after End Date.")
    //       return false
    //    } else {
    //      this.GetProjectDetails()
    //    }
    if (!this.isUserOpenUp) {
      var curtime = moment().format('YYYY-MM-DD h:m:s A')
      var shour = moment(startDate).isAfter(curtime)
      if (!shour) {
        this.startTime = this.defaultStrDate
        this.showAlert("Appointment cannot be created in the past.")
      } else {
        this.GetProjectDetails()
      }

    }

    //this.endDate = moment(this.navParams.get("endDate")).toISOString(true);
  }
  defaultEndDate: any;
  enddatetime(event) {
   
    var endDate = (event.month + '/' + event.day + '/' + event.year + " " + event.hour + ':' + event.minute);
  
    var stime = moment(this.startTime).toISOString(true)
    var etime = moment(this.endTime).toISOString(true)
    if (etime < stime) {
      this.endTime = this.defaultEndDate
      this.showAlert("Selected date cannot be before to start date.")
    } else {
      this.GetProjectDetails()
    }
  }

  showAlert(eventdata) {
    const alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: eventdata,
      buttons: ['Ok']
    });
    alert.present();
  }

  goBack() {
    if (this.pageType == "create") {

      this.navCtrl.push(SchedularPage, { 'resourceId': this.resource_Id, 'pageName': 'appointment', 'labId': this.lab_Id,'FacilityName': this.navParams.get('FacilityName') })
    }
    else {
      this.navCtrl.pop();
    }

  }
  resetPage() {

    let loader = this.loading.create({
      spinner: "crescent",
      content: "Signing In"
    });
    loader.present();

    this.user_Id = this.resetUser
    this.project_Id = this.resetdefaultProject
    this.lab_Id = this.resetdefaultLab
    this.account_Id = this.resetdefaultAccount
    this.session_Id = this.resetdefaultSession
    this.admin_Id = this.resetdefaultAdmin
    this.tag_Id = this.resetdefaultTag
    this.specialInst = this.resetSpecialInstruction
    this.startTime = this.resetStartDate
    this.endTime = this.resetEndDate
    loader.dismiss();
    this.sendRequest()
  }
  saveEvent(title:string,location:string,message:string,startDate:string,endDate:string) {
    this.calendar.createEvent(title,location, message, new Date(startDate), new Date(endDate)).then(
      (msg) => {
    
      },
      (err) => {
        this.message.showMessage('Alert','Failed to add to the calendar !');
      }
    );
  }
  sendRequest() {

    //SEDNING REQUEST
    this.http.post(this.loginUrl,
      {
        username: this.curr_user_Json.EmailAddress,
        password: ""

      })
      .subscribe(
        (data: any) => {
          //RESPONSE

 

          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
      
          this.curr_user_Json = resJSON
          this.lab_Id = this.curr_user_Json.DefaultGroup
          this.project_Id= this.curr_user_Json.DefaultProject
          this.account_Id = this.curr_user_Json.DefaultAccountCodeId
        },//ERROR HANDLING
        error => {

          //  loader.dismiss();
     
          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);
          if (resErrJSON.status == 400) {

          }
        }
      );
  }
}
