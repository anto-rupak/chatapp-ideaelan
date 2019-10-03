/***
 * Created By Sumit Rajpal
 */
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Toast, Platform  } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { PasswordPage } from '../password/password';
import { ReportPage } from '../report/report';
import { SigninPage } from '../signin/signin';
import { SchedularPage } from '../schedular/schedular';
import { ActualUsagePage } from '../actual-usage/actual-usage';
import { ActionSheetController } from 'ionic-angular';
import {of} from 'rxjs';
import { NotificationProvider } from '../../providers/notification/notification';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { duration } from 'moment';
import { loadQueryList } from '@angular/core/src/render3';
import { MessageProvider } from '../../providers/message/message';
import { ActivitylogsProvider } from '../../providers/activitylogs/activitylogs';
import { InstrumentstechissuePage } from '../../pages/instrumentstechissue/instrumentstechissue';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
export interface PageInterface {

}


@IonicPage()
@Component({
  selector: 'page-navi',
  templateUrl: 'navi.html',
})
export class NaviPage {
  @ViewChild('slider') slider: Slides;
  page = "1";
  /*****regular expression  */
  regexp: any
  /********Profile*******/
  userEmail: string;
  lastName: string;
  firstName: string;
  userPhone: string;
  userAddress: string;
  userCity: string;
  userState: string;
  userZip: string;
  userCountry: string;
  userCheckbox: boolean;
  userSync: number;
  userPhonee: string;
  pageSelected: number;
  /********URL**************/
  appUrl: string;
  fullUrl: string;
  getCountry: string;
  getInstrumentUrl: string;
  getLabUrl: string;
  getFacilityUrl;
  favouriteUrl: string;
  getUserDetailsUrl: string;
  updateDetailsUrl: string;
  updateInstrumentUrl: string;
  /***********JSON**********/
  countryJson: any;
  userLabJson: any;
  userInstrumentJson: any;
  userFacilityJson: any;
  userJson: any;
  userDetailsJson: any;
  instrumentJson: any;
  fakeShimmer: boolean;
  /******************** */
  favoriteItem: string;
  result: any = [];
  emptyString: boolean;
  checkStatus: string;
  labStatus: boolean;
  noInstruments: boolean;
  facilityStatus: boolean;
  instrumentname: string;
  as_role: string;
  as_option: string;
  as_report: string;
  as_rules: string;
  as_usage: string;
  as_allissue: string;
  searchText: any;
  clientType: string;
  favInstrumentJson: any;
  authCheckbox:boolean;
  IsToken:any;
  varloadauth:any;
  hidAuthVar:boolean;
  constructor(private platform :Platform, private faio: FingerprintAIO,public logs: ActivitylogsProvider, public message: MessageProvider, public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
    public loading: LoadingController, public http: HttpClient, public actionctrl: ActionSheetController, public formBuilder: FormBuilder, public notification: NotificationProvider) {
    this.as_role = 'destructive';
    this.as_option = 'Select Options';
    this.as_report = 'Report an Issue';
    this.as_rules = 'Rules and Regulations';
    this.as_usage = 'Start Actual Usage';
    this.as_allissue = 'View All Issues';
    this.regexp = new RegExp('(0/91)?[7-9][0-9]{9}');//as per indian number 
    this.authCheckbox=false;
    this.hidAuthVar=true;
  }

  ionViewDidLoad() {
    this.pageSelected =1;
    this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.updateDetailsUrl = this.appUrl + '/WS/IdeaElanService.svc/InsertUpdateUser';
      this.getCountry = this.appUrl + '/WS/IdeaElanService.svc/GetAllCountries';
      this.getInstrumentUrl = this.appUrl + '/WS/IdeaElanService.svc/GetResourcesNonIOT'
      this.getFacilityUrl = this.appUrl + '/WS/IdeaElanService.svc/GetAllFacilities';
      this.getLabUrl = this.appUrl + '/WS/IdeaElanService.svc/GetUserLabs';
      this.favouriteUrl = this.appUrl + '/WS/IdeaElanService.svc/InsertUserFavorite';
      this.getUserDetailsUrl = this.appUrl + '/WS/IdeaElanService.svc/GetUserDetails';
      this.updateInstrumentUrl = this.appUrl + '/WS/IdeaElanService.svc/InsertResourcePermission';
 
      if (this.appUrl.includes('/NMI')) { this.clientType = 'nmi' } else
        if (this.appUrl.includes('/uq')) { this.clientType = 'uq' } else
          if (this.appUrl.includes('/caltech')) { this.clientType = 'caltech' }
          this.storage.set('clientType', this.clientType)
    });
    this.storage.get('userDetails').then((val1) => {
      this.userJson = val1;

    });
  
   // console.log("userdetails", this.userJson );
    this.emptyString = true;
    this.noInstruments = false;
  }

  async ionViewDidEnter() {
    this.loadauth();
    await  this.storage.get('FToken').then((val1) => {
       this.IsToken=val1;
    });
    this.storage.get('userDetails').then((val1) => {
      this.userJson = val1;

      if (this.userJson.UserId == "" || this.userJson.UserId == null) {
        this.navCtrl.push(SigninPage);
      } else {
        this.selectedTab(this.pageSelected);

      }
    }).catch(err => of(err));
if(this.IsToken!=null){
  this.authCheckbox=this.IsToken;
  //alert(`token:${this.IsToken}`);
}

  }

  selectedTab(ind) {
   
    this.slider.slideTo(ind);
  }

  moveButton($event) {
    this.page = $event._snapIndex.toString();
    switch (this.page) {
      case '0':
        this.pageSelected = 0;
        this.favoriteItem = "Remove From Favorite";

 
        this.sendInstrumentRequest("true", "");


        break;
      case '1':
        this.pageSelected = 1;
        //  this.userInstrumentJson=[];
        this.searchText = ""
        this.favoriteItem = "Mark as Favorite";

        this.sendInstrumentRequest("false", "");
        //  }
        break;
      case '2':
        this.pageSelected = 2;
        let loader = this.loading.create({
          spinner: "crescent",
          content: "Updating . . ."
        });

        loader.present().then(() => {
          return this.sendUserDetailsRequest();
        }).then(() => {
          return this.sendCountryRequest();
        }).then(() => {
          return this.sendFacilityRequest();
        }).then(() => {
          return this.sendLabRequest();
        }).then(() => { loader.dismiss() })

        break;
      default:

    }
  }
  actionSheetMethod(actionJson: any) {
    if (actionJson.FavoriteId == undefined) {
      
      this.favoriteItem = "Mark as Favorite";
    } else {
      this.favoriteItem = "Remove From Favorite";
    }

    if (actionJson.UsageType === "A" && actionJson.Status === "Approved") {
      let actionSheet = this.actionctrl.create({
        cssClass: 'myPage',
        title: this.as_option + " : " + actionJson.ResourceName,

        buttons: [
          {
            text: this.favoriteItem,
            role: this.as_role,
            cssClass: 'myActionSheetBtnStyle',
            handler: () => {
   /* Modified by Abey Abraham */
              if (this.favoriteItem == "Remove From Favorite") {
                this.logs.insertlog("Favourites", "navi", "Option Button Click and selection of mark as favourite", "User clicked option button in instruments part of navi page and selected Remove from mark as favorites ", this.userJson.UserId);
                this.sendFavoriteRequest(actionJson.FavoriteId, actionJson.ResourceId);
              } else if (this.favoriteItem == "Mark as Favorite") {
                this.logs.insertlog("Instruments", "navi", "Option Button Click and selection of mark as favourite", "User clicked option button in instruments part of navi page and selected mark as favorites ", this.userJson.UserId);
                this.sendFavoriteRequest(actionJson.ResourceId, actionJson.ResourceId);
              }

            }
          },
          {
            text: this.as_report,
            role: this.as_role,
            cssClass: 'myActionSheetBtnStyle',
            handler: () => {
              this.logs.insertlog("Instruments", "navi", "Option Button Click and selection of Report an issue", "User clicked option button in instruments part of navi page and selected Report an issue", this.userJson.UserId);
              this.navCtrl.push(`ReportPage`, {
                "resourceId": actionJson.ResourceId, "user": this.userJson.UserId, "fname": this.userJson.FirstName,
                "lname": this.userJson.LastName, "name": this.userJson.LastName,
                "instrument": actionJson.ResourceName, "pageType": "report"
              });
            }
          },
          {
            text: this.as_allissue,
            role: this.as_role,
            cssClass: 'myActionSheetBtnStyle',
            handler: () => {
              this.logs.insertlog("Instruments", "navi", "Option Button Click and selection of View all issue", "User clicked option button in instruments part of navi page and selected View all issue", this.userJson.UserId);
          
             this.navCtrl.push(InstrumentstechissuePage,{
              "resourceId": actionJson.ResourceId});
            }
          },
          {

            text: this.as_usage,
            role: this.as_role,
            cssClass: 'myActionSheetBtnStyle',
            handler: () => {
              this.logs.insertlog("Instruments", "navi", "Option Button Click and selection of Start Actual Usage", "User clicked option button in instruments part of navi page and selected Start Actual Usage", this.userJson.UserId);
              
              this.navCtrl.push(ActualUsagePage, {

                "resourceId": actionJson.ResourceId, 
                "user": this.userJson.UserId,
                 "labId": actionJson.GroupId,
                'FacilityName': actionJson.GroupName,
                
              });
            }
          },
          {

            text: this.as_rules,
            role: this.as_role,
            cssClass: 'myActionSheetBtnStyle',
            handler: () => {
              this.logs.insertlog("Instruments", "navi", "Option Button Click and selection of Rules and Regulations", "User clicked option button in instruments part of navi page and selected Rules and Regulations", this.userJson.UserId);
              this.navCtrl.push('RegulationPage', { "resourceId": actionJson.ResourceId })
            }
          }
        ]
      })
      actionSheet.present();
    } else {
      let actionSheet = this.actionctrl.create({
        title: this.as_option,
        cssClass: 'myPage',
        buttons: [
          {
            text: this.favoriteItem,
            role: this.as_role,
            cssClass: 'myActionSheetBtnStyle',
            handler: () => {
 
              if (this.favoriteItem == "Remove From Favorite") {
                this.sendFavoriteRequest(actionJson.FavoriteId, actionJson.ResourceId);
              } else if (this.favoriteItem == "Mark as Favorite") {
                this.sendFavoriteRequest(actionJson.ResourceId, actionJson.ResourceId);
              }
              else {
              }
            }
          },
          {
            text: this.as_report,
            role: this.as_role,
            cssClass: 'myActionSheetBtnStyle',
            handler: () => {
              this.navCtrl.push('ReportPage', {
                "resourceId": actionJson.ResourceId, "user": this.userJson.UserId, "fname": this.userJson.FirstName,
                "lname": this.userJson.LastName, "name": this.userJson.LastName,
                "instrument": actionJson.ResourceName, "pageType": "report"
              });
            }
          },
          {
            text: this.as_allissue,
            role: this.as_role,
            cssClass: 'myActionSheetBtnStyle',
            handler: () => {
              this.logs.insertlog("Instruments", "navi", "Option Button Click and selection of View all issue", "User clicked option button in instruments part of navi page and selected View all issue", this.userJson.UserId);
             this.navCtrl.push(InstrumentstechissuePage,{
              "resourceId": actionJson.ResourceId});
            }
          },
          {
            text: this.as_rules,
            role: this.as_role,
            cssClass: 'myActionSheetBtnStyle',
            handler: () => {
              this.navCtrl.push('RegulationPage', { "resourceId": actionJson.ResourceId })
            }
          }
        ]
      })
      actionSheet.present();
    }


  }

  updateInstrument(instrument) {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Updating . . ."
    });
    this.http.post(this.updateInstrumentUrl,
      {
        permissionid: "0",
        facilityid: instrument.GroupId,
        userid: this.userJson.UserId,
        resourceid: instrument.ResourceId,
        user: this.userJson.EmailAddress,
        isapproved: "2"
      })
      .subscribe(
        (data: any) => {
          this.notification.getUserDeviceDetails("resource", instrument.ResourceId, "IAR", `${this.userJson.FirstName + " " + this.userJson.LastName} requested access for ${instrument.ResourceName}`, "Instrument Access Request");

          this.sendInstrumentRequest("false", "");

        },//ERROR HANDLING
        error => {
          loader.dismiss();
          //   (error);

        }
      );
  }


  sendFavoriteRequest(favoriteId: string, resourceId: string) {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Updating . . ."
    });


    //SEDNING UPDATE REQUEST
    this.http.post(this.favouriteUrl,
      {
        favoriteid: favoriteId,
        userid: this.userJson.UserId,
        resourceid: resourceId,
        user: ""
      })
      .subscribe(
        (data: any) => {
          //RESPONSE

          if (this.pageSelected == 0) {
            this.sendInstrumentRequest("true", "");
          } else if (this.pageSelected == 1) {
            this.sendInstrumentRequest("false", "");

          }
          if (this.favoriteItem == "Remove From Favorite") {

            this.message.showMessage('Message', 'Instrument successfully removed from favorites');
          } else if (this.favoriteItem == "Mark as Favorite") {
            this.message.showMessage('Message', 'Instrument successfully marked as favorites');
          }
          else {

          }



        },//ERROR HANDLING
        error => {

          loader.dismiss();
          //   (error);

        }
      );
  }
  /*************************************************** */

  sendUpdateRequest() {

    
    if (this.userPhone != "") {


  }
  
    if (this.firstName == "" || this.lastName == "" ) {
      this.message.showMessage('Message','Please Enter all the required fields.');
   
      return false;
    }
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Updating . . ."
    });
    //loader.present();

    //SEDNING UPDATE REQUEST
    this.http.post(this.updateDetailsUrl,
      {
        firstname: this.firstName,
        lastname: this.lastName,
        emailaddress: this.userEmail,
        userid: this.userJson.UserId,
        password: "",
        address: this.userAddress,
        city: this.userCity,
        state: this.userState,
        zip: this.userZip,
        country: this.userCountry,
        phone: this.userPhone,
        syncreservation: this.userCheckbox

      })
      .subscribe(
        (data: string) => {
          //RESPONSE
          //  (data);
          this.logs.insertlog("Profile", "navi", "Update button click", "User  updated the profile details by clicking update button", this.userJson.UserId);
          if (data.includes("success")) {
            this.message.showMessage('Message', 'Updated Successfully');
          }



        },//ERROR HANDLING
        error => {

          // loader.dismiss();
          //   (error);

        }
      );
  }



  //Sending country Request
  sendCountryRequest() {
    var countryName = this.userJson.CountryCode;
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    //  loader.present();

    this.http.post(this.getCountry, {
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.countryJson = resJSON;
          if(this.userJson.CountryCode != (undefined || null || '')){}
          this.userCountry = String(this.userJson.CountryCode).trim();

        },//ERROR HANDLING
        error => {

          loader.dismiss();
          //  (error);

        }
      );
  }
  /*****************************************/
  //Sending INSTRUMENT Request
  isSearchResult: any;
  sendInstrumentRequest(favorite: string, value) {
    if (value = true) {
      var loader = this.loading.create({
        spinner: "crescent",
        content: "Loading . . . ",
      });
      loader.present();
    }

     (this.getInstrumentUrl);
    this.http.post(this.getInstrumentUrl, {
      userid: this.userJson.UserId,
      beaconid: "",
      usertoken: this.userJson.UserToken,
      fav: favorite,
      resourceid: "0"
    })
      .subscribe(
        (data: any) => {
          //RESPONSE

          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.emptyString = false;
          this.noInstruments = false;

          //   this.isSearchResult=false;
          if (favorite == 'true') {
            this.favInstrumentJson = resJSON;
          } else if (favorite == 'false') {
            this.userInstrumentJson = resJSON;
            console.log("instrumentjson",resJSON);
            
            
            console.log("userdetails", this.userJson);
          }
          //used for searchbar filtering json objects.
          this.instrumentJson = resJSON;
          if (value = true) {
            loader.dismiss()
          }
          //client check for nmi for appointments

        },//ERROR HANDLING
        error => {

          this.emptyString = true;
          this.noInstruments = true;
          //   (error);
          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);
          loader.dismiss()
          if (resErrJSON.status == 400) {
            this.emptyString = true;
            this.checkStatus = "400";

          }

        }
      );
  }
  /*******************************/
  //Sending Facility Request
  sendFacilityRequest() {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    //  loader.present();

    this.http.post(this.getFacilityUrl, {
      userid: this.userJson.UserId,
      usertoken: this.userJson.UserToken,
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
          //    (data);
          this.facilityStatus = true;
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.userFacilityJson = resJSON;
         



        },//ERROR HANDLING
        error => {

          loader.dismiss();
        
          this.facilityStatus = false;
        }
      );
  }
  /*******************************/
  //Sending Lab Request
  sendLabRequest() {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    //   loader.present();

    this.http.post(this.getLabUrl, {
      userid: this.userJson.UserId,
      usertoken: this.userJson.UserToken,
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
          //     (data);
          this.labStatus = true;
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.userLabJson = resJSON;
          //   ('Lab', resJSON);

 console.log("userlab",this.userLabJson);

        },//ERROR HANDLING
        error => {

          loader.dismiss();
          //  (error);
          this.labStatus = false;
        }
      );
  }

  //GET USER DETAILS METHOD
  sendUserDetailsRequest() {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    // loader.present();

    //SEDNING REQUEST
    this.http.post(this.getUserDetailsUrl,
      {
        email: this.userJson.EmailAddress

      })
      .subscribe(
        (data: any) => {
          //RESPONSE
           (data);
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.userDetailsJson = resJSON;
          this.getJsonDetails();


        },//ERROR HANDLING
        error => {

          loader.dismiss();
          //    (error);

        }
      );
  }


  //getting json request and seeting to the fields
  getJsonDetails() {
    this.firstName = this.userDetailsJson.FirstName;
    this.userEmail = this.userDetailsJson.EmailAddress;
    this.lastName = this.userDetailsJson.LastName;
    this.userPhone = this.userDetailsJson.Phone;
    this.userAddress = this.userDetailsJson.Address1;
    this.userCity = this.userDetailsJson.City;
    this.userState = this.userDetailsJson.State;
    this.userZip = this.userDetailsJson.PostalCode;
    if (this.userDetailsJson.SyncReservations == "1") {
      this.userCheckbox = false;
    } else {
      this.userCheckbox = true;
    }
  }

  changePassword() {
    this.logs.insertlog("Profile", "navi", "Change Password button click", "User  clicked change password button in profile part of navi page ", this.userJson.UserId);
    this.navCtrl.push(PasswordPage, { "useremail": this.userEmail });
  }
  updateChange() {
    this.userCheckbox;
    this.userCountry;
  }
  authupdateChange()
  {
    if(this.authCheckbox==true)
    {if(this.hidAuthVar=false){
      this.message.showMessage('Message',  ` ${this.varloadauth} added successfully  `);
    }
     
      this.storage.set('FToken', true);
    
    }
else{
  this.storage.set('FToken', false);
}
  }
  
  changeScheduler(pagetype, instrument) {
    if (this.clientType === 'nmi') {
      var user = instrument.Contacts.split(",")
       ("EmailSplit", user)
      let responsible_user = user.filter(i => i === this.userJson.EmailAddress);

      if (responsible_user.length > 0) {

        var isContactMatch = true
      }else{
        isContactMatch = false
      }
    }

    this.logs.insertlog("favourites", "navi", "Schedule Button Click ", "User clicked schedule button in favourites part of navi page ", this.userJson.UserId);

    this.storage.set('SchedularFav', pagetype);
    this.navCtrl.push(SchedularPage, {
      "resourceId": instrument.ResourceId, "labId": instrument.GroupId, 'projectId': this.userJson.DefaultProject, 'instrumentName': instrument.ResourceName, 'isContactMatch': isContactMatch, 'FacilityName': instrument.GroupName,'PageSelected':this.pageSelected
    });
  }



  getItems(searchbar) {
    var q = this.searchText;


    if (q == null || q == "") {
      this.isSearchResult = false

      this.sendInstrumentRequest("false", true)

      return true;
    }

    this.userInstrumentJson = this.instrumentJson.filter((v) => {
      if (v.ResourceName && q) {
        if (v.ResourceName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          //  this.isSearchResult = false
          return true;
        } else if (v.ResourceName.toLowerCase().indexOf(q.toLowerCase()) < -1) {
          // this.isSearchResult = true
          this.userInstrumentJson = []
        }


        return false;
      }

      //   ()
    });


  }

  doRefresh(refresher) {
   
    this.sendInstrumentRequest("false", "");
    setTimeout(() => {
   
      refresher.complete();
    }, 2000);
  }
  async loadauth()//method to display the option availabe for fingerprint or face id authentication
  {
    try{
      await this.platform.ready();
      
      const available = await this.faio.isAvailable();
      
  
      if(available=="finger"){
        this.hidAuthVar=false;
        this.varloadauth="Fingerprint Authentication "
      }
     else if(available=="face"){
      this.hidAuthVar=false;
      this.varloadauth="Face Id Authentication "
     }else{
      this.hidAuthVar=true;
     }
  }
  catch(e){

  }
}
}
