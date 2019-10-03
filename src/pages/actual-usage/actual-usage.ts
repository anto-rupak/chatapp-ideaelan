import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import * as moment from "moment";
import { AlertController } from 'ionic-angular';
import { ActualusagecounterPage } from '../actualusagecounter/actualusagecounter';
import { ToastController } from 'ionic-angular';
import { map } from 'rxjs/operators';
import { ActivitylogsProvider } from '../../providers/activitylogs/activitylogs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
//Created by Anto Rupak
@IonicPage()
@Component({
  selector: 'page-actual-usage',
  templateUrl: 'actual-usage.html',
})
export class ActualUsagePage {

  appUrl: string;
  /*(ng-model variables)*/
  resUserId: string;
  projectId: any;
  labId: any;
  accountCodeId: any;
  sessionId: any;
  splInst: string;
  adminId: string[];
  /*--------------- */

  /* (API URL variables)*/
  getLabUrl: string;
  getAccountUrl: string;
  getProjectUrl: string;
  getSessionUrl: string;
  getAdminUrl: string;
  getResourceUrl: string;
  checkAppointmentUrl: string;
  getTagsUrl: string;
  /*------------------*/

  /* JSON Objects */
  labJson: any;
  resourceJson: any;
  userJson: any;
  accountJson: any;
  projectJson: any;
  sessionJson: any;
  AdminJson: any;
  /*--------------- */
  /**Boolean values for No Records found */
  statusProject: boolean;
  statusLab: boolean;
  adminDropdown: any;
  adminSelection: boolean = true;
  admin: boolean;
  isAdmin: string;
  connectivityFlag: boolean = true;
  /** nav params variables */
  resourceId: string;
  listItems: any;


  labName: any;
  projectName: any;
  accName: any;
  sessionName: any;
  adminName: string[] = [];
  labType: any;
  accountCodeFrom: any;
  statusAccount: boolean;
  statusSession: boolean;
  userName: any;
  resetUserId: any;
  resetLabId: any;
  tagJson: any;
  tagId: string[];
  isTagOpenUp: boolean = false;
  tagName: string[] = [];
  isTagMandatory: boolean = false;
  isAccountTrue: boolean = false;
  facilityName:string;
  clientType:string;
  isProjectMand:boolean;
  loader = this.loading.create({
    spinner: "crescent",
    content: "Loading . . . "
  });

  constructor(public logs: ActivitylogsProvider, public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public storage: Storage,
    public loading: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.resourceId = this.navParams.get('resourceId');
    this.labId = this.navParams.get('labId');
    this.facilityName = this.navParams.get('FacilityName')
    this.labName = this.navParams.get('labName')
    this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.getLabUrl = this.appUrl + '/WS/IdeaElanService.svc/GetLabs';
      this.getAccountUrl = this.appUrl + '/WS/IdeaElanService.svc/GetAccountCodes';
      this.getProjectUrl = this.appUrl + '/WS/IdeaElanService.svc/GetProjects';
      this.getSessionUrl = this.appUrl + '/WS/IdeaElanService.svc/GetSessionType';
      this.getAdminUrl = this.appUrl + '/WS/IdeaElanService.svc/GetAdmins';
      this.getResourceUrl = this.appUrl + '/WS/IdeaElanService.svc/GetAllUserBasedOnResourceId';
      this.checkAppointmentUrl = this.appUrl + '/WS/IdeaElanService.svc/CheckAppointment';
      this.getTagsUrl = this.appUrl + '/WS/IdeaElanService.svc/GetApplicationTags/'
      if (this.appUrl.includes('/NMI')) { this.clientType = 'nmi' } else
      if (this.appUrl.includes('/uq')) { this.clientType = 'uq' } else
        if (this.appUrl.includes('/caltech')) { this.clientType = 'caltech' }
        this.storage.set('clientType', this.clientType)

        this.storage.get('clientType').then((client) => {
          this.clientType = client;
    
          if (this.clientType === 'nmi' || this.clientType === 'uq') {
            this.isProjectMand = true;
          }else{
            this.isProjectMand = false
          }
          if (this.clientType === 'caltech') {
            if (this.navParams.get('FacilityName') === 'Biological and Cryo-TEM') {
              this.isProjectMand = true;
            } else {
              this.isProjectMand = false;
            }
          }
        });
    });
    this.storage.get('userDetails').then((val1) => {
      this.userJson = val1;
      this.resUserId = this.userJson.UserId;
      this.isAdmin = this.userJson.UserRole;
      this.userName = this.userJson.FirstName;
      this.resetUserId = this.userJson.UserId;
      this.resetLabId = this.labId
      if (this.isAdmin.includes("Admin")) {
        this.admin = true;
      }
    });
  }

  ionViewDidEnter() {
    this.checkAppointmentDetails();
    this.sendResourceRequest();
    this.GetTag();
  }


  isprojectDisabled: boolean;

  GetProjectDetails(user, id) {
    this.statusProject = false
    this.getResourceValueByKey(id, this.resourceJson)
    var startdate = moment(new Date()).format("YYYY/MM/DD")
    this.http.post(this.getProjectUrl, {
      userid: this.resUserId,
      resourceid: this.resourceId,
      usertoken: this.userJson.UserToken,
      startdate: startdate,
      loggedinuser: this.userJson.UserId,
      providerid: 0,
      isreservation: 1
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.projectJson = resJSON;
          if (this.projectJson[0].hasOwnProperty('Message')) {
            this.isprojectDisabled = true
            this.projectName = ''
          } else {
            this.isprojectDisabled = false
          }
          this.sendLabRequest(id, 0);
          this.GetSessionDetails("0")
        },//ERROR HANDLING
        error => {
          this.loader.dismiss();
      
          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);
          if (resErrJSON.status == 400) {
            this.projectJson = []
            this.statusProject = true
            this.sendLabRequest(id, 0);
          }
        }
      );
  }
  getResourceValueByKey(key, data) {
    for (let i = 0; data.length > i; i += 1) {
      if (data[i].UserId === key) {
        this.userName = data[i].FirstName;
        return true;
      }
    }
    return false;
  }

  projectOnChangeHandeler() {

  //  this.globalLoader()
    this.sendLabRequest(this.projectId, 1)

    if (this.projectId > 0 && this.clientType == "nmi") {
      let Json_Sel_project = this.projectJson.filter(i => i.ProjectId == this.projectId);
      this.projectName =Json_Sel_project[0].ProjectName
        var n = this.projectName.includes("Service")
        
        if (n && this.sessionJson.length > 0) {
          let session_Details = this.sessionJson.filter(i => i.SessionType === "Maintenance");
          this.sessionId = session_Details[0].SessionMapId
        }
    }
 

  }
  sendLabRequest(id, value) {
    this.statusLab = false
    //  if (value == 1) {
    //    this.getProjectValueByKey(this.projectId, this.projectJson);
    //  }
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    loader.present()
    this.http.post(this.getLabUrl, {
      userid: this.resUserId,
      resourceid: this.resourceId,
      usertoken: this.userJson.UserToken,
      projectid: this.projectId,
      loggedinuser: this.userJson.UserId
    }).subscribe(
      (data: any) => {
        //RESPONSE
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
        this.labJson = resJSON;
        

        this.getLabIdByKey(this.labId, this.labJson)

        if (id == 1) {
          this.labId = resJSON[0].GroupId
        }
        if (this.labId == null) {
          this.labId = resJSON[0].GroupId
        }



        this.GetAccountDetails(this.labId, '0');
        loader.dismiss()
      },//ERROR HANDLING
      error => {
                let resErr = JSON.stringify(error);
        let resErrJSON = JSON.parse(resErr);
        if (resErrJSON.status == 400) {
          this.labJson = []
          this.labId = "0"
          this.statusLab = true

        }
        loader.dismiss()
      }
    );
  }
  getLabIdByKey(key, data) {
    for (let i = 0; data.length > i; i += 1) {
      if (data[i].GroupId === key) {
       
        // this.username = data[i].FirstName;

        return this.labId = data[i].GroupId
      }
    }
    this.resetLabId = data[0].GroupId
    return this.labId = data[0].GroupId
  }


  getProjectIdByKey(key, data: any) {
    for (let i = 0; data.length > i; i += 1) {
      if (data[i].ProjectId == key) {
        if (data[i].hasOwnProperty('IsMembership')) {
          this.projectType = "membership";
          if (this.clientType === 'uq') {
            this.accountCodeId = 0
            this.accName = ""
            this.isAccountTrue = true
            return false
          } else {
            this.isAccountTrue = false
          }
        } else {
          this.projectType = "project"
        }
        break;
      }
    }
  }
  labval: string;
  get_N_ValuefromLabDetails(key, value) {
    if (this.labId != null) {
      for (let i = 0; value.length > i; i += 1) {
        if (value[i].GroupId == this.labId) {
          if (value[i].GroupType === 'N') {
            this.accName = ""
            this.isAccountTrue = true
          } else {
            this.isAccountTrue = false
          }
          return true;
        }
      }
      return false
    }
  }
  projectType: string;
  account_mul_proj_val: any = []
  GetAccountDetails(id, value) {
    this.statusAccount = false
    if (!this.isAccountTrue) {
      if (this.labId > 0) {
        let Json_Sel_lab = this.labJson.filter(i => i.GroupId == this.labId);
        if (Json_Sel_lab[0].GroupType === "P") {
          this.labval = "PO Number"
        } else {
          this.labval = "Account Code"
        }
      }
    }
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    if (value == 1) {
      this.accountCodeId = '0'
 
      loader.present()
    }

    this.get_N_ValuefromLabDetails(this.labId, this.labJson)
    this.getLabValueByKey(this.labId, this.labJson)
    this.getProjectIdByKey(this.projectId, this.projectJson);
    this.http.post(this.getAccountUrl, {
      userid: this.resUserId,
      resourceid: this.resourceId,
      labid: this.labId,
      usertoken: this.userJson.UserToken,
      loggedinuser: this.userJson.UserId
    }).pipe(
      map((res: any) => {
        return res.filter((post) => {
         
          if (this.projectId == undefined || this.projectId == "0" || this.projectType == "project") {
            return post.IsExpired == false && post.IsMembership == false;
          } else if (this.projectType == "membership") {
            return post
          }
        })
      })
    ).subscribe(
      (data: any) => {
        //RESPONSE
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
        this.accountJson = resJSON
        if (value == 1) {
          loader.dismiss()
        }
        if (this.accountCodeId > 0) {
          var acc_Id = this.accountJson.filter(p => p.GroupAccountCodeId == this.accountCodeId);
        }

        if (acc_Id == undefined || JSON.parse(acc_Id.length) <= 0) {
          this.accountCodeId = 0
        } else if (this.projectType == "membership") {
          this.accountCodeId = resJSON[0].GroupAccountCodeId
        }
        if (this.projectId > 0) {
          this.account_mul_proj_val = []
          for (let p = 0; this.accountJson.length > p; p += 1) {
            if (this.accountJson[p].hasOwnProperty('ProjectIds')) {
              if(this.accountJson[p].ProjectIds == -1){
                this.account_mul_proj_val.push(this.accountJson[p]);
              }else{
                var acc_map_multiple_acc = this.accountJson[p].ProjectIds.split(",")
                for (let i = 0; acc_map_multiple_acc.length > i; i += 1) {
                  if (acc_map_multiple_acc[i] == this.projectId) {
                    this.account_mul_proj_val.push(this.accountJson[p]);
                  }
                }
              }
         
            }
          }
          this.accountJson = this.account_mul_proj_val
        }
        if (this.clientType === 'uq' && this.projectType == "membership") {
          this.accountCodeId = 0
          this.accName=""
          this.isAccountTrue = true
          return false
        } else {
          this.isAccountTrue = false
        }
        this.GetSessionDetails("0");
      },//ERROR HANDLING
      error => {
        loader.dismiss();
        let resErr = JSON.stringify(error);
        let resErrJSON = JSON.parse(resErr);
        if (resErrJSON.status == 400) {
          this.accountJson = []
          this.statusAccount = true
        }
      }
    );
  }

  getLabValueByKey(key, data) {
    for (let i = 0; data.length > i; i += 1) {
      if (data[i].GroupId == key) {
        this.labId = data[i].GroupId;
        this.labName = data[i].GroupName;
        this.labType = data[i].GroupType;
        this.accountCodeFrom = data[i].AccountCodeFrom;
        return true;
      }
    }
    return false;
  }

  GetSessionDetails(id) {

    this.statusSession = false
    this.http.post(this.getSessionUrl, {
      userid: this.resUserId,
      resourceid: this.resourceId,
      labid: this.labId,
      usertoken: this.userJson.UserToken,
      loggedinuser: this.userJson.UserId
    }).subscribe(
      (data: any) => {
        //RESPONSE
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
        this.sessionJson = resJSON;
        if (this.projectId > 0 && this.clientType == "nmi") {
          let Json_Sel_project = this.projectJson.filter(i => i.ProjectId == this.projectId);
          this.projectName =Json_Sel_project[0].ProjectName
            var n = this.projectName.includes("Service")
            
            if (n && this.sessionJson.length > 0) {
              let session_Details = this.sessionJson.filter(i => i.SessionType === "Maintenance");
              this.sessionId = session_Details[0].SessionMapId
              
            }
        
        }
    
        this.GetAdminDetails("0");

      },//ERROR HANDLING
      error => {
        // this.loader.dismiss();
 
        let resErr = JSON.stringify(error);
        let resErrJSON = JSON.parse(resErr);
        if (resErrJSON.status == 400) {
          this.sessionJson = []
          this.statusSession = true
        }
      }
    );
  }

  getAccountValueByKey(key, data) {
    let Json_Sel_Acc = this.accountJson.filter(person => person.GroupAccountCodeId == this.accountCodeId);
    if (Json_Sel_Acc.length > 0) {
      this.accName = Json_Sel_Acc[0].AccountCode
    }



  }

  GetAdminDetails(id) {
    if (id != 0) {
      var sessionData = this.sessionJson.filter(function (i) {
        return i.SessionMapId == id;
      });
      this.sessionId = sessionData[0].SessionMapId;
      this.sessionName = sessionData[0].SessionType;
      this.adminDropdown = sessionData[0].showAdminSelection;
    }
    //  this.getSessionValueByKey(id,this.sessionJson)
    if (this.adminDropdown == true || this.adminDropdown != null) {
      this.adminName = [], this.adminId = []
      this.adminSelection = false
    } else {
      this.adminName = [], this.adminId = []
      this.adminSelection = true
    }


    this.http.post(this.getAdminUrl, {
      userid: this.resUserId,
      usertoken: this.userJson.UserToken,
      resourceid: this.resourceId
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.AdminJson = resJSON;
          //  loader.dismiss();

        },//ERROR HANDLING
        error => {
          //   this.loader.dismiss();
          
        }
      );
  }

  sendResourceRequest() {

    this.http.post(this.getResourceUrl, {
      resourceid: this.resourceId,
    }).subscribe(
      (data: any) => {
        //RESPONSE
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
        this.resourceJson = resJSON;
        this.GetProjectDetails(this.resUserId, '0');
      },//ERROR HANDLING
      error => {
        
      }
    );
  }

  checkAppointmentDetails() {
    var startdate = moment(new Date()).format("YYYY-MM-DD HH:mm")
    this.http.post(this.checkAppointmentUrl, {
      userid: this.userJson.UserId,
      resourceid: this.resourceId,
      starttime: startdate,
      usertoken: this.userJson.UserToken,
      loggedinuser: this.userJson.UserId
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          var count = Object.keys(resJSON).length;
          if (count != 0) {
            const confirm = this.alertCtrl.create({
              title: 'Actual Usage',
              message: `Do you want to use exsisting scheduled appointment from &nbsp` + resJSON.StartTime + `&nbsp to &nbsp` + resJSON.EndTime,
              buttons: [
                {
                  text: 'Start New',
                  handler: () => {
                  }
                },
                {
                  text: 'Yes',
                  handler: () => {
                    this.connectivityFlag = false
                  }
                }
              ]
            });
            confirm.present();
          }
        },//ERROR HANDLING
        error => {
        }
      );
  }

  getAdminValueByKey(key, parameter) {
    this.adminName = []
    for (var i = 0; i < key.length; i = i + 1) {
      for (var j = 0; j < parameter.length; j = j + 1) {
        if (key[i] == parameter[j].AdminId) {
          this.adminName.push(parameter[j].UserName);
        }
      }
    }
  }



  alertConfirmActualUsage() {
    this.logs.insertlog("Actual Usage  ", "Actual Usage Page", " clicked start usage button  ", "User clicked start usage button in actual usage page ", this.userJson.UserId);
    if (this.isProjectMand) {
      if (this.projectId <= 0 || this.projectId == undefined) {
        this.showAlert("Project is Mandatory.")
        return false
      }
    }
    var session_id = this.sessionId
    if (this.sessionId > 0) {
      var sessionData = this.sessionJson.filter(function (i) {
        return i.SessionMapId === session_id;
      });
      this.sessionId = sessionData[0].SessionMapId;
      this.sessionName = sessionData[0].SessionType;
    }
    if (this.projectId == null) { this.projectName = '' }
    if (this.tagId != null) {
      var tagValue = this.tagId.join(", ");
      this.getTagNameValueByKey(this.tagId, this.tagJson)
    } else {
      tagValue = ''
    }
    if (this.adminId != null) {
      this.getAdminValueByKey(this.adminId, this.AdminJson)
      var adminValue = this.adminId.join(", ");
    } else {
      adminValue = ''
    }


    if (this.isAccountTrue) {

      if (this.labId == null || this.labId == "0"|| this.sessionId == null || this.labId === undefined || this.sessionId === undefined || this.sessionId == '0') {
        this.showAlert("Please Enter all the requied fields")
        return false;
      }
    } else {
      if (this.labId == null || this.sessionId == null || this.labId === undefined || this.sessionId === undefined || this.accountCodeId == '0' || this.sessionId == '0') {
        this.showAlert("Please Enter all the requied fields")
        return false;
      }
    }

    if (this.isTagMandatory) {
      if (this.tagId == null) {
        this.showAlert("Please Enter all the requied fields")
        return false;
      }
    }

    if (!this.adminSelection) {
      if (this.adminId == null || this.adminId.length == 0) {
        this.showAlert("Please Enter all the requied fields")
        return false;
      }

    }

    this.getAccountValueByKey(this.accountCodeId, this.accountJson)


    let Json_Sel_Proj = this.projectJson.filter(person => person.ProjectId == this.projectId);
    if (Json_Sel_Proj.length > 0) {
      if (Json_Sel_Proj[0].hasOwnProperty('ProjectName')) {
        this.projectName = Json_Sel_Proj[0].ProjectName
      } else {
        this.projectName = ''
      }

    } else {
      this.projectName = ""
    }
    var msgText = `<table>` +
      `<tr>` + "User:" + this.userJson.LastName + " " + this.userJson.FirstName + `<br/></tr>` +

      `<tr>` + "Project/Membership:" + this.projectName + `<br/></tr>` +
      `<tr>` + "Lab:" + this.labName + `<br/></tr>` +
      `<tr>` + "Account Code:" + this.accName + `<br/></tr>` +
      `<tr>` + "Session:" + this.sessionName + `<br/></tr>` +
      `<tr>` + "Admin:" + this.adminName + `<br/></tr>` +
      `<tr>` + "Tags:" + this.tagName + `<br/></tr>` +
      `<tr>` + "Are you sure you want to start usage?" + `</tr>`
      + `</table>`;
    const confirm = this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: 'Start Usage',
      message: msgText,
      buttons: [
        {
          text: 'Cancel',
          handler: () => { }
        },
        {
          text: 'Yes',
          handler: () => {
            this.startCountDownTimer(tagValue, adminValue);
          }
        }
      ]
    });
    confirm.present();
  }


  startCountDownTimer(tagValue,adminValue) {
    this.navCtrl.push(ActualusagecounterPage, {
      "User": this.userName, "labId": this.labId, "LabName": this.labName, "ProjectId": this.projectId, "ProjectName": this.projectName,
      "AccountCode": this.accountCodeId, "SessionType": this.sessionId, "Admin": adminValue, "resourceId": this.resourceId, "accName": this.accName,
      "labType": this.labType, "accountCodeFrom": this.accountCodeFrom, "SessionName": this.sessionName, "adminName": this.adminName, 'TagName': this.tagName, 'tagId': tagValue
    });
  }
  reset() {

    this.loader.present()
    this.resUserId = this.resetUserId
    this.labId = this.resetLabId
    this.sessionId = '0';
    this.adminId = []
    this.accountCodeId = "0";
    this.projectId = 0
    this.tagId = []
  
    this.loader.dismiss()
  }
  GetTag() {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    this.http.get(this.getTagsUrl + this.resourceId + ',' + 0)
      .subscribe(
        (data: any) => {
          //RESPONSE
  
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.tagJson = resJSON;
          this.isTagOpenUp = true
          if (resJSON[0].IsTagMandatory) {
            this.isTagMandatory = true
          } else {
            this.isTagMandatory = false
          }
        },//ERROR HANDLING
        error => {
          loader.dismiss();
          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);
          if (resErrJSON.status == 400) {
            this.isTagOpenUp = false
            //this.stat = true
          }
        }
      );
  }

  getTagNameValueByKey(key, parameter) {
    this.tagName = []
    for (var i = 0; i < key.length; i = i + 1) {
      for (var j = 0; j < parameter.length; j = j + 1) {
        if (key[i] == parameter[j].TagId) {
          this.tagName.push(parameter[j].TagName);
        }
      }
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
}