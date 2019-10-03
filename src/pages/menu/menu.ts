/**
 * Created By Sumit Rajpal
 * 
 */
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DashboardPage } from '../dashboard/dashboard';
import { PIinboxPage } from '../p-iinbox/p-iinbox';
import { LabDashboardPage } from '../lab-dashboard/lab-dashboard';
import { AllsuppliesPage } from '../allsupplies/allsupplies';
import { AllreservationPage } from '../allreservation/allreservation';
import { AlertController } from 'ionic-angular';
import { NotificationPage } from '../notification/notification';
import { SigninPage } from '../signin/signin';
import { SamplesubmissionPage } from '../samplesubmission/samplesubmission';
import { NaviPage } from '../navi/navi';
import { ActivitydashboardPage } from '../activitydashboard/activitydashboard';
import { FacilitiesPage } from '../facilities/facilities';
import { LabsPage } from '../labs/labs';
import { InboxPage } from '../inbox/inbox';
import { ScannerPage } from '../scanner/scanner';
import { SuppliesPage } from '../supplies/supplies';
import { MessagePage } from '../message/message'
import {AllchatsPage} from '../allchats/allchats'
import { ActivitylogsProvider } from '../../providers/activitylogs/activitylogs';
export interface PageInterface {
  title: string;
  pageName: string;
  tabCompenent?: any;
  index?: number;
  icon: string;

}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  activePage: string;
  rootPage: string;
  roleType: string;
  pageType: string;
  userJson: any;
  page: string;
  clientDetails: string;
  @ViewChild(Nav) nav: Nav;
  pages: PageInterface[];
  InsitutionName: string;
  internalDomain: string;
  IsSSOEnabled: string;
  IsFtoken: any;
  userLogout: any;
  constructor(public logs: ActivitylogsProvider, public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    this.page = this.navParams.get('page');

    this.storage.get('appLink').then((val) => {
      this.appUrl = val;
    });
    
    this.storage.get('FToken').then((val) => {
      this.IsFtoken = val;
    });
    /*
    this.storage.get('userLogout').then((val) => {
      this.userLogout = val;
    });

    */
    this.storage.get('roleType').then((role) => {
      this.roleType = role;
      if (this.page == undefined || this.page == "" || this.page == null) {
        if (this.roleType == "user") {
          this.pageType = "NaviPage"
        }
        else if (this.roleType == "super") {
          this.pageType = "ActivitydashboardPage"
        }
        else if (this.roleType == "admin") {
          this.pageType = "ActivitydashboardPage"
        } else if (this.roleType == 'labAdmin') {
          this.pageType = "NaviPage"
        } else if (this.roleType == 'providerAdmin') {
          this.pageType = "ActivitydashboardPage"
        }
      } else if (this.page === "NaviPage") {
        this.pageType = "NaviPage";
      } else if (this.page === "AllSupplies") {
        this.pageType = "AllsuppliesPage";
      }
    });
    //Index modified according to the page - Anto Rupak
    this.storage.get('roleType').then((val) => {
      if (this.roleType == null) {
        this.navCtrl.push(SigninPage).then(() => {
          const startIndex = this.navCtrl.getActive().index - 1;
          this.navCtrl.remove(startIndex, 1);
        });
      }
      this.storage.get('userDetails').then((val1) => {
        this.userJson = val1;

      });
      this.roleType = val;
      console.log("userdetails", this.userJson);
      console.log("roletype",this.roleType);
      //Modification of the pages -Sumit Rajpal 
      if (this.roleType === "user") {

        this.rootPage = this.pageType;
        this.pages = [{ title: 'Instruments', pageName: 'NaviPage', icon: 'assets/icon/facilities-wt.png', index: 0 },
        { title: 'Facilities', pageName: 'FacilitiesPage', icon: 'assets/icon/Instruments-wt.png', index: 2 },
        { title: 'Labs', pageName: 'LabsPage', icon: 'assets/icon/lab-wt.png', index: 3 },
        { title: 'Chats', pageName: 'AllchatsPage', icon: 'assets/icon/notification.png', index: 16 },
        { title: 'Supplies', pageName: 'SuppliesPage', icon: 'assets/icon/sample-sub-req.png', index: 13 },
        { title: 'Sample Submission', pageName: 'SamplesubmissionPage', icon: 'assets/icon/sample-sub-req.png', index: 12 },
        { title: 'My Reservations', pageName: 'AllreservationPage', icon: 'assets/icon/my-reserv-wt.png', index: 7 },
        { title: 'My Supplies', pageName: 'AllsuppliesPage', icon: 'assets/icon/my-reserv-wt.png', index: 14 },
        { title: 'My Dashboard', pageName: 'DashboardPage', icon: 'assets/icon/my-dashboard.png', index: 5 },
        { title: 'Notification', pageName: 'NotificationPage', icon: 'assets/icon/notification.png', index: 10 },
        { title: 'Scanner', pageName: 'ScannerPage', icon: 'assets/icon/scan.png', index: 6 },
        { title: 'Logout', pageName: 'HomePage', icon: 'assets/icon/logout.png', index: 11 }];
      } else if (this.roleType === "super") {
        this.rootPage = this.pageType;

        this.pages = [
          { title: 'Activity Dashboard', pageName: 'ActivitydashboardPage', icon: 'assets/icon/activitty-dashboard.png', index: 1 },
          { title: 'Instruments', pageName: 'NaviPage', icon: 'assets/icon/Instruments-wt.png', index: 0 },
          { title: 'Facilities', pageName: 'FacilitiesPage', icon: 'assets/icon/facilities-wt.png', index: 2 },
          { title: 'Labs', pageName: 'LabsPage', icon: 'assets/icon/lab-wt.png', index: 3 },
          { title: 'Chats', pageName: 'AllchatsPage', icon: 'assets/icon/notification.png', index: 16 },
          { title: 'Inbox', pageName: 'InboxPage', icon: 'assets/icon/access-request-wt.png', index: 4 },
          { title: 'All Reservations', pageName: 'AllreservationPage', icon: 'assets/icon/my-reserv-wt.png', index: 7 },
          { title: 'My Supplies', pageName: 'AllsuppliesPage', icon: 'assets/icon/my-reserv-wt.png', index: 14 },
          { title: 'Facility Dashboard', pageName: 'DashboardPage', icon: 'assets/icon/facility-dashboard.png', index: 5 },
          //  { title: 'Lab Dashboard', pageName: 'LabDashboardPage', icon: 'assets/icon/dashboard-wt.png', index: 9 },
          { title: 'Scanner', pageName: 'ScannerPage', icon: 'assets/icon/scan.png', index: 6 },
          { title: 'Logout', pageName: 'HomePage', icon: 'assets/icon/logout.png', index: 11 }
        ];

      } else if (this.roleType === "admin") {

        this.rootPage = this.pageType;
        this.pages = [
          { title: 'Activity Dashboard', pageName: 'ActivitydashboardPage', icon: 'assets/icon/activitty-dashboard.png', index: 1 },
          { title: 'Instruments', pageName: 'NaviPage', icon: 'assets/icon/Instruments-wt.png', index: 0 },
          { title: 'Facilities', pageName: 'FacilitiesPage', icon: 'assets/icon/facilities-wt.png', index: 2 },
          { title: 'Labs', pageName: 'LabsPage', icon: 'assets/icon/lab-wt.png', index: 3 },
          { title: 'Chats', pageName: 'AllchatsPage', icon: 'assets/icon/notification.png', index: 16 },
          { title: 'Inbox', pageName: 'InboxPage', icon: 'assets/icon/access-request-wt.png', index: 4 },
          { title: 'All Reservations', pageName: 'AllreservationPage', icon: 'assets/icon/my-reserv-wt.png', index: 7 },
          { title: 'Supplies', pageName: 'SuppliesPage', icon: 'assets/icon/sample-sub-req.png', index: 13 },
          { title: 'My Supplies', pageName: 'AllsuppliesPage', icon: 'assets/icon/my-reserv-wt.png', index: 14 },
          { title: 'Facility Dashboard', pageName: 'DashboardPage', icon: 'assets/icon/facility-dashboard.png', index: 5 },
          { title: 'Notification', pageName: 'NotificationPage', icon: 'assets/icon/notification.png', index: 10 },
          { title: 'Scanner', pageName: 'ScannerPage', icon: 'assets/icon/scan.png', index: 6 },
          { title: 'Logout', pageName: 'HomePage', icon: 'assets/icon/logout.png', index: 11 }
        ];
      } else if (this.roleType === "labAdmin") {

        this.rootPage = this.pageType;
        this.pages = [
          //  { title: 'Activity Dashboard', pageName: 'ActivitydashboardPage', icon: 'assets/icon/activitty-dashboard.png', index: 1 },
          { title: 'Instruments', pageName: 'NaviPage', icon: 'assets/icon/Instruments-wt.png', index: 0 },
          { title: 'Facilities', pageName: 'FacilitiesPage', icon: 'assets/icon/facilities-wt.png', index: 2 },
          { title: 'Labs', pageName: 'LabsPage', icon: 'assets/icon/lab-wt.png', index: 3 },
          { title: 'Chats', pageName: 'AllchatsPage', icon: 'assets/icon/notification.png', index: 16 },
          { title: 'Supplies', pageName: 'SuppliesPage', icon: 'assets/icon/sample-sub-req.png', index: 13 },
          { title: 'Sample Submission', pageName: 'SamplesubmissionPage', icon: 'assets/icon/sample-sub-req.png', index: 12 },
        //  { title: 'Inbox', pageName: 'InboxPage', icon: 'assets/icon/access-request-wt.png', index: 4 },
          { title: 'PI Inbox', pageName: 'PIinboxPage', icon: 'assets/icon/access-request-wt.png', index: 8 },
          { title: 'Lab Dashboard', pageName: 'LabDashboardPage', icon: 'assets/icon/dashboard-wt.png', index: 9 },
          { title: 'My Reservations', pageName: 'AllreservationPage', icon: 'assets/icon/my-reserv-wt.png', index: 7 },
          { title: 'My Supplies', pageName: 'AllsuppliesPage', icon: 'assets/icon/my-reserv-wt.png', index: 14 },
          { title: 'My Dashboard', pageName: 'DashboardPage', icon: 'assets/icon/my-dashboard.png', index: 5 },
          //  { title: 'Facility Dashboard', pageName: 'DashboardPage', icon: 'assets/icon/facility-dashboard.png', index: 5 },
          { title: 'Notification', pageName: 'NotificationPage', icon: 'assets/icon/notification.png', index: 10 },
          { title: 'Scanner', pageName: 'ScannerPage', icon: 'assets/icon/scan.png', index: 6 },
          { title: 'Logout', pageName: 'HomePage', icon: 'assets/icon/logout.png', index: 11 }
        ];
      } else if (this.roleType === "providerAdmin") {

        this.rootPage = this.pageType;
        this.pages = [
          { title: 'Activity Dashboard', pageName: 'ActivitydashboardPage', icon: 'assets/icon/activitty-dashboard.png', index: 1 },
          { title: 'Instruments', pageName: 'NaviPage', icon: 'assets/icon/Instruments-wt.png', index: 0 },
          { title: 'Facilities', pageName: 'FacilitiesPage', icon: 'assets/icon/facilities-wt.png', index: 2 },
          { title: 'Labs', pageName: 'LabsPage', icon: 'assets/icon/lab-wt.png', index: 3 },
          { title: 'Chats', pageName: 'AllchatsPage', icon: 'assets/icon/notification.png', index: 16 },
          { title: 'Supplies', pageName: 'SuppliesPage', icon: 'assets/icon/sample-sub-req.png', index: 13 },
          { title: 'Inbox', pageName: 'InboxPage', icon: 'assets/icon/access-request-wt.png', index: 4 },
          { title: 'All Reservations', pageName: 'AllreservationPage', icon: 'assets/icon/my-reserv-wt.png', index: 7 },
          { title: 'My Supplies', pageName: 'AllsuppliesPage', icon: 'assets/icon/my-reserv-wt.png', index: 14 },
          { title: 'Facility Dashboard', pageName: 'DashboardPage', icon: 'assets/icon/facility-dashboard.png', index: 5 },
          //    { title: 'PI Inbox', pageName: 'PIinboxPage', icon: 'assets/icon/access-request-wt.png', index: 8 },
          //    { title: 'My Dashboard', pageName: 'DashboardPage', icon: 'assets/icon/my-dashboard.png', index: 5 },

          //    { title: 'Sample Submission', pageName: 'SamplesubmissionPage', icon: 'assets/icon/my-dashboard.png', index: 12 },
          //    { title: 'Lab Dashboard', pageName: 'LabDashboardPage', icon: 'assets/icon/dashboard-wt.png', index: 9 },
          { title: 'Notification', pageName: 'NotificationPage', icon: 'assets/icon/notification.png', index: 10 },
          { title: 'Scanner', pageName: 'ScannerPage', icon: 'assets/icon/scan.png', index: 6 },
          { title: 'Logout', pageName: 'HomePage', icon: 'assets/icon/logout.png', index: 11 }
        ];
      }
    });
  }
  ngOnInit() {

  }
  onViewDidEnter() {

    this.storage.get('userDetails').then((val1) => {
      this.userJson = val1;

    });
 
    console.log("userdetails", this.userJson);
  }

  isInboxTrue: boolean = false;
  // Modified by Anto Rupak & Sumit Rajpal
  openPage(page) {

    let params = {};
    if (page.index) {
      params = { pageIndex: page.index };
    }
    let view = this.nav.getActive();

    //Modified by Anto Rupak & Sumit Rajpal
    switch (page.index) {

      case 0: {
        if (view.instance instanceof NaviPage) {

        }
        else {
          this.nav.setRoot("NaviPage")
        }
      }
        break;
      case 1: {
        if (view.instance instanceof ActivitydashboardPage) {

        } else {
          this.storage.set('spinnerIndex', "0");
          this.nav.setRoot("ActivitydashboardPage")
        }

      }
        break;
      case 2: {
        if (view.instance instanceof FacilitiesPage) {

        } else
          this.nav.setRoot("FacilitiesPage")

      }
        break;
      case 3: {
        if (view.instance instanceof LabsPage) {

        } else {
          this.nav.setRoot("LabsPage")
        }


      }
        break;
      case 4: {
        this.isInboxTrue = true;
        if (view.instance instanceof InboxPage) {

        } else {
          this.storage.set('spinnerInbox', "0");
          this.nav.setRoot(page.pageName);
        }

      }
        break;
      case 5: {
        if (view.instance instanceof DashboardPage) {

        } else {
          this.storage.set('spinnerDashboard', "0");
          this.nav.setRoot(DashboardPage);
        }
      }
        break;
      case 6: {
        if (view.instance instanceof ScannerPage) {

        } else {
          this.nav.setRoot(page.pageName)
        }
      }
        break;
      case 7: {
        if (view.instance instanceof AllreservationPage) {

        } else {
          this.storage.set('spinnerReservation', "0");
          this.nav.setRoot(page.pageName);
        }
      }
        break;
      case 8: {
        if (view.instance instanceof PIinboxPage) {

        } else {
          this.storage.set('spinnerPiInbox', "0");
          this.nav.setRoot(page.pageName);
        }
      }
        break;
      case 9: {
        if (view.instance instanceof LabDashboardPage) {

        } else {
          this.nav.setRoot(LabDashboardPage);
        }
      }
        break;
      case 10: {
        if (view.instance instanceof NotificationPage) {

        } else {
          this.nav.setRoot('NotificationPage');
        }
      }
        break;
      case 11: {
        this.presentConfirm();
      }
        break;
      case 12: {
        if (view.instance instanceof SamplesubmissionPage) {

        } else {
          this.nav.setRoot(SamplesubmissionPage)
        }
      }
        break;
      case 13: {
        if (view.instance instanceof SuppliesPage) {

        } else {
          this.nav.setRoot(SuppliesPage)
        }
      }
        break;
      case 14: {
        if (view.instance instanceof AllsuppliesPage) {

        } else {
          this.nav.setRoot('AllsuppliesPage')
        }
      } break;
      case 15: {
        if (view.instance instanceof  MessagePage ) {

        } else {
          this.nav.setRoot('MessagePage')
        }
      }break;
      case 16: {
        if (view.instance instanceof  AllchatsPage ) {

        } else {
          this.nav.setRoot('AllchatsPage')
        }
      }

    }
  }

  //Modified by Anto Rupak & Sumit Rajpal
  presentConfirm() {
    //Modified by Anto Rupak
    this.storage.get('InsitutionName').then((val) => {
      this.InsitutionName = val;
    });
    this.storage.get('InternalDomain').then((val) => {
      this.internalDomain = val;
    });
    this.storage.get('IsSSOEnabled').then((val) => {
      this.IsSSOEnabled = val;
    });
    this.storage.get('clientImage').then((val) => {
      this.clientDetails = val;
    });
    let alert = this.alertCtrl.create({
      title: 'Logout',
      message: 'Are you sure you want to Logout ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.logs.insertlog("Logout", "Menu Page", "User clicked log out button   ", "User clicked log out option in the menu and clicked  yes for loging out  ", this.userJson.UserId);
            this.logoutUser();

          }
        }
      ]
    });
    alert.present();
  }
  isActive(page: PageInterface) {
    if (this.nav.getActive().name === page.pageName) {
      return false;
    }
  }
  appUrl: any;
  //Modified by Anto Rupak
  logoutUser() {
    //this.storage.clear();
    
     this.storage.set('userLogout',true);
     if(this.IsFtoken ==false && this.userLogout==true )
     {
       this.storage.clear();
     }
    
    this.storage.set('clientImage', this.clientDetails)
    this.storage.set('InsitutionName', this.InsitutionName)
    this.storage.set('InternalDomain', this.internalDomain)
    this.storage.set('IsSSOEnabled', this.IsSSOEnabled)
    this.storage.set('appLink', this.appUrl).then(() => {
      this.navCtrl.push(SigninPage).then(() => {
        const startIndex = this.navCtrl.getActive().index - 1;
        this.navCtrl.remove(startIndex, 1);
      });
    });

  }
}