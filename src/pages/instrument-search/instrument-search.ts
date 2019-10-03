//Created by Anto Rupak

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { Device } from '@ionic-native/device';
import { MenuPage } from '../menu/menu';
import { SchedularPage } from '../schedular/schedular';
import { ActionSheetController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { SignInModalPage } from '../../pages/sign-in-modal/sign-in-modal'
//Created by Anto Rupak

/**
 * Generated class for the InstrumentSearchPage page Anto Rupak.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-instrument-search',
  templateUrl: 'instrument-search.html',
})
export class InstrumentSearchPage {
  tok: string;
  searchText: any;
  appUrl: string;
  fullUrl: string;
  notificationUrl: string;
  getDetails: string;
  registerDevice: string;
  searchResultsUrl: string;
  userJson: any;
  userToken: string;
  userId: string;
  userDetailsJson: any;
  searchResultsJson: any;
  username: string;
  password: string;
  deviceModel: string;
  deviceSerial: string;
  devicePlatform: string;
  deviceVersion: string;
  deviceId: string;
  result: any = [];
  loginSucsses: boolean = false;
  roleType: string;
  getFacilitiesAccessUrl: string;
  getInstrumentAccessUrl: string;
  FacilityUpdateJson: any;
  searchstatus: boolean;
  loginStatus: any
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, public storage: Storage, public http: HttpClient,
    public loading: LoadingController, public alertCtrl: AlertController, public device: Device, public actionctrl: ActionSheetController, public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {

    this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.searchResultsUrl = this.appUrl + '/WS/IdeaElanService.svc/GetSearchResults';
      this.fullUrl = this.appUrl + '/WS/IdeaElanService.svc/ValidateLogin';
      this.getDetails = this.appUrl + '/WS/IdeaElanService.svc/GetUserDetails';
      this.registerDevice = this.appUrl + '/WS/IdeaElanService.svc/RegisterDevice';
      this.notificationUrl = this.appUrl + '/WS/IdeaElanService.svc/GetMobileAppNotifications';
      this.getFacilitiesAccessUrl = this.appUrl + '/WS/IdeaElanService.svc/InsertFacilityAccessRequest';
      this.getInstrumentAccessUrl = this.appUrl + '/WS/IdeaElanService.svc/InsertResourcePermission';
    });
    this.storage.get('userDetails').then((val1) => {
      this.userJson = val1;
    });
    this.deviceModel = this.device.model;
    this.devicePlatform = this.device.platform;
    this.deviceSerial = this.device.serial;
    this.deviceId = this.device.uuid;
    this.deviceVersion = this.device.version;
  }

  ionViewDidEnter() {
    this.storage.get('userDetails').then((val1) => {
      this.userJson = val1;
     
    });
    if (this.userJson != null) {

      this.searchText = this.navParams.get('searchval');
      this.loginSucsses = true;
      this.getSearchResults()
    }
  }
  getSearchResults() {
    if(this.userJson != null){
      this.userId = this.userJson.UserId
    }
   
    if (this.searchText == null || this.searchText == "") {
      this.searchResultsJson = []
      this.searchstatus = false
      return false;


    }
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Updating . . ."
    });
    loader.present();
    this.http.post(this.searchResultsUrl,
      {
        searchtext: this.searchText,
        userid: this.userId

      })
      .subscribe(
        (data: any) => {
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.searchstatus = false
          this.searchResultsJson = resJSON
          loader.dismiss();
        },//ERROR HANDLING
        error => {
          loader.dismiss();
          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);
          if (resErrJSON.status == 400) {
            this.searchResultsJson = []
            this.searchstatus = true
          }
        
        }
      );
  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: SignInModalPage,
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    });

    modal.onDidDismiss((dataReturned: any) => {
      if (dataReturned !== null) {
      }
    });

    return await modal.present();
  }
  async userLogin1(resourceId) {
    var modalPage = await this.modalCtrl.create(SignInModalPage,
      {
        searchval: `${this.searchText}`
      });
    modalPage.present();
    modalPage.onDidDismiss(data => { //this method is called when 
  

    });
  


  }


  userLogin(resourceId) {




    const prompt = this.alertCtrl.create({
      title: 'Login',
      inputs: [
        {
          name: 'title',
          placeholder: 'UserName',
          type: 'email',

        },

        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Login',
          handler: data => {
            let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            var email = regexp.test(data.title)
            if (email && data.title !== "" && data.password !== "") {
           
              this.sendRequest(data.title, data.password, resourceId)
            } else {
              if (!email) {
                this.failedAlert("Enter Valid Email", resourceId);
                return true
              } else {
                this.failedAlert('Enter Valid User Details.', resourceId);
                return true
              }

            }
          }
        }
      ]
    });
    prompt.present();
  }
  failedAlert(text, resourceId) {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: text,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.userLogin(resourceId);
        }
      }]

    });
    alert.present();
  }

  sendRequest(m_username: string, m_password: string, resourceId) {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Signing In"
    });
    // loader.present();

    //SEDNING REQUEST
    this.http.post(this.fullUrl,
      {
        username: m_username,
        password: m_password

      })
      .subscribe(
        (data: any) => {
          //RESPONSE
       
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.roleType = resJSON.UserRole;
          this.storage.set('devicetoken', this.tok);
          this.userId = resJSON.UserId;
          this.userToken = resJSON.UserToken;
          this.storage.set('userRole', resJSON.UserRole);
          if (this.roleType.includes("Super Admin")) {
            this.storage.set('roleType', "super");
          } else if (this.roleType.includes("Insitution Admin")) {
            this.storage.set('roleType', "admin");
          } else if (this.roleType.includes("Group Admin")) {
            this.storage.set('roleType', "super");
          } else if (this.roleType.includes("Provider Admin")) {
            this.storage.set('roleType', "admin");
          } else if (resJSON.UserRole.includes("User")) {
            this.storage.set('roleType', "user");
          }
          var externalUser = resJSON.UserRole.includes("External User");
          this.storage.set('userType', externalUser);


          loader.present().then(() => {
            return this.sendRegisterDeviceRequest(m_username, resourceId);
          }).then(() => {
            return this.sendDetailsRequest(m_username, resourceId);
          }).then(() => { loader.dismiss() });


        },//ERROR HANDLING
        error => {

          loader.dismiss();
          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);
          if (resErrJSON.status == 400) {
            this.alert(resErrJSON.statusText);
          }
        }
      );
  }
  //TOAST METHOD
  alert(toastStr: string) {
    let toast = this.alertCtrl.create({
      title: 'Alert',
      message: toastStr,
      buttons: ['OK']
    });
    toast.present();
  }

  //GET USER DETAILS METHOD
  sendDetailsRequest(userName, resourceId) {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Getting User Details"
    });
    // loader.present();

    //SEDNING REQUEST
    this.http.post(this.getDetails,
      {
        email: userName
      })
      .subscribe(
        (data: any) => {
          //RESPONSE
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.userDetailsJson = resJSON;
          this.loginSucsses = true;
          this.storage.set('userDetails', this.userDetailsJson);
          // loader.dismiss();
          this.storage.get('userDetails').then((val1) => {
            this.userJson = val1;
            //  this.userJson.UserId = this.userId;

          });
          this.searchResultsJson = null;
          this.getSearchResults()
        },//ERROR HANDLING
        error => {

          loader.dismiss();

        }
      );
  }

  //REGISTER DEVICE METHOD
  sendRegisterDeviceRequest(userName, resourceId) {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Registering Device"
    });
    // loader.present();
    //SEDNING REQUEST
    this.http.post(this.registerDevice,
      {
        userid: userName,
        deviceid: this.deviceId,
        devicetoken: this.deviceVersion,
        devicename: this.devicePlatform,
        devicemodel: this.deviceModel,
        deviceversion: this.deviceVersion,
        usertoken: this.userToken


      })
      .subscribe(
        (data: any) => {
          //RESPONSE
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.storage.set('userDeviceResponse', resJSON.RegisterDeviceResult);
          // loader.dismiss();
          this.sendDetailsRequest(userName, resourceId);


        },//ERROR HANDLING
        error => {

          loader.dismiss();

        }
      );
  }

  actionSheetMethod(actionJson: any) {
    var status;
    if (actionJson.FacilityStatus === "Approved" && actionJson.ResourceStatus === "Approved") {
      //MakeReservation
      status = 1
    } else if (actionJson.FacilityStatus === "Request Access" && actionJson.ResourceStatus === "Request Access") {
      //send request for both
      status = 2
    } else if (actionJson.FacilityStatus === "Waiting for approval" && actionJson.ResourceStatus === "Waiting for approval") {
      //go to infinity
      status = 3
    } else if (actionJson.FacilityStatus === "Approved" || actionJson.FacilityStatus === "Waiting for approval" && actionJson.ResourceStatus === "Request Access" || actionJson.ResourceStatus === "Approved") {
      //show Instrument request && Go to Infinity
      status = 4
    } else if (actionJson.FacilityStatus === "Request Access" && actionJson.ResourceStatus === "Approved" || actionJson.ResourceStatus === "Pending") {
      //show Facility request && Go to Infinity
      status = 5
    }
    else if (actionJson.FacilityStatus === "Rejected" && actionJson.ResourceStatus === "Request Access") {
      //Go to Infinity
      status = 6
    }
    else if (actionJson.FacilityStatus === "Request Access" && actionJson.ResourceStatus === "Rejected") {
      //Go to Infinity
      status = 7
    }
    switch (status) {

      case 1: {
        let actionSheet = this.actionctrl.create({
          title: 'Select Options',
          buttons: [
            {
              text: "Make Reservation",
              role: 'destructive',
              handler: () => {
                this.navCtrl.push(SchedularPage, { 'resourceId': actionJson.TemplateId, 'pageName': 'Instument' ,'FacilityName':actionJson.ProviderName})
              }
            },
          ]
        })
        actionSheet.present();
      }
        break;
      case 2: {
        let actionSheet = this.actionctrl.create({
          title: 'Select Options',
          buttons: [
            {
              text: "Request facility Access",
              role: 'destructive',
              handler: () => {
                // this.navCtrl.push(MenuPage,{'resourceId':actionJson.TemplateId, 'isInstrumentSearch': 1});
                this.updateFacilityRequest(actionJson.ProviderId)
              }
            },
            {
              text: "Request Instrument Access",
              role: 'destructive',
              handler: () => {
                this.updateInstrumentAccessRequest(actionJson)
              }
            },
            {
              text: "Go to Infinity",
              role: 'destructive',
              handler: () => {
                this.navCtrl.push(MenuPage, { "page": "NaviPage" });
              }
            },
          ]
        })
        actionSheet.present();
      }
        break;
      case 3: {
        let actionSheet = this.actionctrl.create({
          title: 'Select Options',
          buttons: [
            {
              text: "Go to Infinity",
              role: 'destructive',
              handler: () => {
                this.navCtrl.push(MenuPage, { "page": "NaviPage" });
              }
            },
          ]
        })
        actionSheet.present();
      }
        break;
      case 4: {
        let actionSheet = this.actionctrl.create({
          title: 'Select Options',
          buttons: [
            {
              text: "Request Instrument Access",
              role: 'destructive',
              handler: () => {
                this.updateInstrumentAccessRequest(actionJson)
              }
            },
            {
              text: "Go to Infinity ",
              role: 'destructive',
              handler: () => {
                this.navCtrl.push(MenuPage, { "page": "NaviPage" });
              }
            },
          ]
        })
        actionSheet.present();
      }
        break;
      case 5: {
        let actionSheet = this.actionctrl.create({
          title: 'Select Options',
          buttons: [
            {
              text: "Request Instrument Access",
              role: 'destructive',
              handler: () => {
                this.updateInstrumentAccessRequest(actionJson)
              }
            },
            {
              text: "Go to Infinity ",
              role: 'destructive',
              handler: () => {
                this.navCtrl.push(MenuPage, { "page": "NaviPage" });
              }
            },
          ]
        })
        actionSheet.present();
      }
        break;
      case 6: {
        let actionSheet = this.actionctrl.create({
          title: 'Select Options',
          buttons: [
            {
              text: "Go to Infinity ",
              role: 'destructive',
              handler: () => {
                this.navCtrl.push(MenuPage, { "page": "NaviPage" });
              }
            },
          ]
        })
        actionSheet.present();
      }
        break;
      case 7: {
        let actionSheet = this.actionctrl.create({
          title: 'Select Options',
          buttons: [
            {
              text: "Go to Infinity ",
              role: 'destructive',
              handler: () => {
                this.navCtrl.push(MenuPage, { "page": "NaviPage" });
              }
            },
          ]
        })
        actionSheet.present();
      }
        break;
    }
  }
  getFacilityDescription(description) {
    const myModal = this.modalCtrl.create('DecriptionModalPage', { description: description })
    myModal.present();
  }
  signup() {
    this.navCtrl.push(SigninPage)
  }


  updateFacilityRequest(FacilityId: string) {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    loader.present();
    this.http.post(this.getFacilitiesAccessUrl, {
      userid: this.userJson.UserId,
      facilityid: FacilityId,
      user: 'admin',
      isactive: "-1"
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.FacilityUpdateJson = resJSON;
          //this.getUserDeviceDetails(labId);
          this.getSearchResults()
          loader.dismiss();
        },//ERROR HANDLING
        error => {
          loader.dismiss();
         
          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);
        }
      );
  }

  updateInstrumentAccessRequest(actionJson) {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    loader.present();
    this.http.post(this.getInstrumentAccessUrl, {
      permissionid: "0",
      facilityid: actionJson.ProviderId,
      userid: actionJson.UserId,
      resourceid: actionJson.TemplateId,
      user: actionJson.EmailAddress,
      isapproved: "2"
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
      
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.FacilityUpdateJson = resJSON;
          //this.getUserDeviceDetails(labId);
          this.searchResultsJson = []
          this.getSearchResults()
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
