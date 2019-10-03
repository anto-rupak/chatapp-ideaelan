import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AnyTxtRecord } from 'dns';
import { map } from 'rxjs/operators';
import { AlertController, ActionSheetController, LoadingController, ToastController } from 'ionic-angular';
import { isNumber } from 'util';
import * as moment from "moment";
import { NaviPage } from '../navi/navi';
import { MenuPage } from '../menu/menu';
import { AllsuppliesPage } from '../allsupplies/allsupplies';
/**
 * Generated class for the SuppliesOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-supplies-order',
  templateUrl: 'supplies-order.html',
})

export class SuppliesOrderPage {
  getResourceUrl: string;
  getAccountUrl: string;
  getProjectUrl: string;
  getLabUrl: string;
  userJson: any = [];
  curr_user_Json: any;
  appUrl: string;
  facilityId: number;
  orderDetails: any;
  project_Json: any;
  account_Json: any;
  lab_Json: any;
  user_Id: number;
  project_Id: any;
  lab_Id: any;
  account_Id: any;
  role_Type: string;
  isUserOpenUp: boolean;
  status_Proj: boolean;
  status_Lab: boolean;
  account_mul_proj_val: any = []
  labType: string = "Account Code";
  isAccountOpenup: boolean;
  status_Account: boolean;
  projectType: string;
  getProdcutsByCategoryIdsUrl: string;
  productStatus: boolean;
  isprojectDisabled: boolean = true;
  productJson: any = [];
  curr_role_type: string;
  curr_order_Id: number;
  orderId: number;
  insertOrderUrl: string;
  getUserRoleBasedOnUserIdUrl: string;
  totalPrice: number = 0;
  curr_user_id: number
  userRoleOnFacility: string;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public storage: Storage,
    public loading: LoadingController, public http: HttpClient, private alertCtrl: AlertController, public actionctrl: ActionSheetController, ) {
  }

  ionViewDidLoad() {

    this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.getProdcutsByCategoryIdsUrl = this.appUrl + '/WS/IdeaElanService.svc/GetProdcutsByCategoryIds';
      this.getResourceUrl = this.appUrl + '/WS/IdeaElanService.svc/GetUsersByProviderId';
      this.getAccountUrl = this.appUrl + '/WS/IdeaElanService.svc/GetAccountCodes';
      this.getProjectUrl = this.appUrl + '/WS/IdeaElanService.svc/GetProjects';
      this.getLabUrl = this.appUrl + '/WS/IdeaElanService.svc/GetLabs';
      this.insertOrderUrl = this.appUrl + '/WS/IdeaElanService.svc/InsertOrder';
      this.getUserRoleBasedOnUserIdUrl = this.appUrl + '/WS/IdeaElanService.svc/GetUserRoleByUserIdAndProviderId';

    });
    this.storage.get('userDetails').then((val1) => {
      this.curr_user_Json = val1;
      this.user_Id = this.curr_user_Json.UserId
      this.curr_user_id = this.curr_user_Json.UserId
      this.orderDetails = this.navParams.get('orderDetails')
      this.facilityId = this.navParams.get('facilityId')
      this.orderId = this.navParams.get('orderId')
      this.curr_order_Id = this.navParams.get('curr_Order_Id')
      this.orderDetails = this.navParams.get('orderDetails')
      this.tempProductJson = this.orderDetails
      this.userRoleOnFacility = this.navParams.get('userRoleOnFacility')
      
      this.project_Id = val1.DefaultProject; if (this.project_Id <= 0 || this.project_Id === undefined) { this.project_Id = 0 }
      this.lab_Id = val1.DefaultGroup; if (this.lab_Id <= 0 || this.lab_Id === undefined) { this.lab_Id = 0 }
    
      var temp = 0;
      for (let i = 0; i < this.orderDetails.length; i++) {
        this.totalPrice = this.orderDetails[i].TotalPrice + temp
        temp = this.totalPrice
      }
   
      if (this.curr_user_Json.Address1.length > 0) {
        this.shippingAddress = this.curr_user_Json.Address1
      }
      if (this.curr_user_Json.City.length > 0) {
        this.shippingAddress = this.shippingAddress + ',' + this.curr_user_Json.City
      }
      if (this.curr_user_Json.State.length > 0) {
        this.shippingAddress = this.shippingAddress + ',' + this.curr_user_Json.State
      }
      if (this.curr_user_Json.PostalCode.length > 0) {
        this.shippingAddress = this.shippingAddress + ', ' + this.curr_user_Json.PostalCode
      }
      // this.shippingAddress = this.curr_user_Json.Address1 + ',' + this.curr_user_Json.City + ',' + this.curr_user_Json.State + ',' + this.curr_user_Json.PostalCode
      this.getResourceRequest()
      this.GetProjectDetails()
      this.sendLabRequest()


      //  this.phonenumber = this.curr_user_Json.Phone
      //  this.shippingAddress = this.curr_user_Json.Address1
  
    });


  }
  ionViewDidEnter() {

  }
  tempProductJson: any;
  grantName: string;

  getResourceRequest() {
    this.http.get(this.getResourceUrl + '/' + this.facilityId).subscribe(
      (data: any) => {
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
        this.userJson = resJSON
        
        if(this.curr_user_id > 0){
          var Json_Sel_user = this.userJson.filter(i => i.UserId == this.curr_user_id);
       
        }
        if(Json_Sel_user.length <= 0){
       
         
          this.userJson.push({
            EmailAddress: this.curr_user_Json.EmailAddress,
            FirstName: this.curr_user_Json.FirstName,
            UserId: this.curr_user_Json.UserId,
            UserName: this.curr_user_Json.EmailAddress,
            phone: this.curr_user_Json.Phone
          });
       
        }
        //  this.user_Json = resJSON;
      },//ERROR HANDLING
      error => {
        
      }
    );
  }
  GetProjectDetails() {
    var dateTime = moment().format("YYYY/MM/DD");
    
    this.http.post(this.getProjectUrl, {
      userid: this.user_Id,
      resourceid: 0,
      usertoken: this.curr_user_Json.UserToken,
      startdate: dateTime,
      loggedinuser: this.curr_user_Json.UserId,
      providerid: this.facilityId,
      isreservation: 0
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
        
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.project_Json = resJSON;
       
          if (this.project_Json[0].hasOwnProperty('Message')) {

            this.project_Id=0 
            this.isprojectDisabled = false
          } else {
            this.isprojectDisabled = true
          }


        },//ERROR HANDLING
        error => {
        
          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);
          if (resErrJSON.status == 400) {
            this.project_Json = []
          }
        }
      );
  }

  sendLabRequest() {
   
    this.status_Lab = false
    this.http.post(this.getLabUrl, {
      userid: this.user_Id,
      resourceid: 0,
      usertoken: this.curr_user_Json.UserToken,
      projectid: this.project_Id,
      loggedinuser: this.curr_user_Json.UserId,
      providerid: this.facilityId
    }).subscribe(
      (data: any) => {
        //RESPONSE
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
       console.log('group', resJSON)
        this.lab_Json = resJSON;
        // this.lab_Id = resJSON[0].GroupId
        this.getUserRoleBasedOnUserId()
      //  /  this.changeProductBasedOnGrant()
        this.GetAccountDetails()
      },//ERROR HANDLING
      error => {
        //  loader.dismiss();
      
        let resErr = JSON.stringify(error);
        let resErrJSON = JSON.parse(resErr);
        this.lab_Id = 0
        this.lab_Json = [];
        if (resErrJSON.status == 400) {

        }
      });
  }

  GetAccountDetails() {
    if (this.isAccountOpenup) {
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
      resourceid: 0,
      labid: this.lab_Id,
      usertoken: this.curr_user_Json.UserToken,
      loggedinuser: this.curr_user_Json.UserId,
      providerid: this.facilityId
    }).subscribe(
      (data: any) => {
        //RESPONSE
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
        this.account_Json = resJSON;
        if (this.project_Id > 0 && this.isprojectDisabled) {
          this.account_mul_proj_val = []
          for (let p = 0; this.account_Json.length > p; p += 1) {
            if (this.account_Json[p].hasOwnProperty('ProjectIds')) {
              if (this.account_Json[p].ProjectIds == -1) {
                this.account_mul_proj_val.push(this.account_Json[p]);
              } else {
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

  accountHandling() {
    this.getUserRoleBasedOnUserId()
    this.changeProductBasedOnGrant()
    this.getAccountValueByKey(this.lab_Id, this.lab_Json)
    if (!this.isAccountOpenup) {
      this.GetAccountDetails();
    } else {
      this.account_Id = 0;
      return false;
    }
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
  shippingAddress: string;
  createOrderRequest() {
    var cxml = '<eSelectOrderDetailsList>';
    for (let i = 0; i < this.orderDetails.length; i++) {
      if (this.orderDetails[i].OrderQty > 0) {
        var productxml = cxml + "<eSelectOrderDetails><ProductId>" + this.orderDetails[i].ProductId + "</ProductId><Quantity>" + this.orderDetails[i].OrderQty + "</Quantity></eSelectOrderDetails>"
        cxml = productxml
      }
    }
    cxml = cxml + "</eSelectOrderDetailsList>"
    var strProducts = ""
    for (let i = 0; i < this.orderDetails.length; i++) {
      var productlog = strProducts + this.orderDetails[i].ProductName + " with quantity " + this.orderDetails[i].OrderQty + " and with unit price " + this.orderDetails[i].UnitPrice + ", "
      strProducts = productlog

    }
    strProducts = "Order Created" + " for User role " + this.curr_role_type + " with Products: " + strProducts;
   
    this.http.post(this.insertOrderUrl, {
      userid: this.user_Id,
      labid: this.lab_Id,
      providerid: this.facilityId,
      accountcodeid: this.account_Id,
      shipaddress: this.shippingAddress,
      createdby: this.curr_user_Json.EmailAddress,
      ordernumber: this.orderId,
      currentordernumber: this.curr_order_Id,
      discountprec: "0",
      discountamount: "0",
      freight: "0",
      clientmessage: "",
      orderamount: this.totalPrice,
      adminmessage: "",
      activestatus: "Active",
      projectid: this.project_Id,
      phone: "",
      xmlproducts: cxml,
      strproducts: strProducts
    }).subscribe(
      (data: any) => {
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
        if (isNumber(resJSON) || !isNaN(resJSON)) {
          //  this.customToast("Order Placed Succesfully.")
          this.navCtrl.push(MenuPage, { 'page': 'AllSupplies' })
          //  this.getProductDetailsBasedOnFacility()
        } else {
          this.customToast(resJSON)
        }
        //this.orderId = resJSON

      },//ERROR HANDLING
      error => {
        
      }
    );
  }
  getUserRoleBasedOnUserId() {

    this.http.get(this.getUserRoleBasedOnUserIdUrl + '/' + this.facilityId + ',' + this.user_Id + ',' + this.lab_Id).subscribe(
      (data: any) => {
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);

        this.curr_role_type = resJSON.split(',')
       
        if (this.userRoleOnFacility[0] == "Super Admin" || this.userRoleOnFacility[0] == "Provider Admin" || this.userRoleOnFacility[0] == "Institution Admin") {
          this.isUserOpenUp = true
        } else {
          this.isUserOpenUp = false
        }
        this.changeProductBasedOnGrant()
        
      },//ERROR HANDLING
      error => {
        
      }
    );
  }
  userOnChangeHandeler() {
    this.project_Id = 0
    this.GetProjectDetails()
    this.sendLabRequest()
    this.changeProductBasedOnGrant()

  }
  splitval: any;
  changeProductBasedOnGrant() {
   
    if (this.account_Id > 0) {
      let sel_account_json = this.account_Json.filter(i => i.GroupAccountCodeId == this.account_Id);
      this.grantName = sel_account_json[0].GrantName
     
    } else {
      this.grantName = null
    }
    for (let i = 0; i < this.orderDetails.length; i++) {
      var temp_split_user_value = this.orderDetails[i].AllRoles.split(',')
      var indexof_curr_user = temp_split_user_value.indexOf(this.curr_role_type[0])


      var temp_split_price_value = this.orderDetails[i].AllRolesPrice.split(',')
     

      if (this.orderDetails[i].IsGrantPrice == false && this.orderDetails[i].IsUnitPrice == false) {
        //role based price
        if (indexof_curr_user >= 0) {
          this.orderDetails[i].UnitPrice = temp_split_price_value[indexof_curr_user]
          this.orderDetails[i].TotalPrice = this.orderDetails[i].UnitPrice * this.orderDetails[i].OrderQty
        } else {
          this.orderDetails[i].UnitPrice = 0
          this.orderDetails[i].TotalPrice = this.orderDetails[i].UnitPrice * this.orderDetails[i].OrderQty
        }

      } else if (this.orderDetails[i].IsGrantPrice) {
        // grant price

        if (this.grantName == null || this.grantName == undefined || this.grantName == "") {
          this.orderDetails[i].UnitPrice = 0
          this.orderDetails[i].TotalPrice = this.orderDetails[i].UnitPrice * this.orderDetails[i].OrderQty
        } else {
          var indexof_grant_acc_name = temp_split_user_value.indexOf(this.grantName)
        
        }

        if (indexof_grant_acc_name >= 0) {
          this.orderDetails[i].UnitPrice = temp_split_price_value[indexof_grant_acc_name]
          this.orderDetails[i].TotalPrice = this.orderDetails[i].UnitPrice * this.orderDetails[i].OrderQty
        } else {
          this.orderDetails[i].UnitPrice = 0
          this.orderDetails[i].TotalPrice = this.orderDetails[i].UnitPrice * this.orderDetails[i].OrderQty
        }

      } else if (this.orderDetails[i].IsUnitPrice) {
        // unit price

      }
    }
    var temp = 0;
    for (let i = 0; i < this.orderDetails.length; i++) {
      this.totalPrice = this.orderDetails[i].TotalPrice + temp
      temp = this.totalPrice
    }
  }
  projectOnChangeHandeler() {

    this.sendLabRequest()
    // this.GetAccountDetails()
  }
  customToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  validationRequest() {
    if (this.isAccountOpenup) {
      if (this.lab_Id <= 0 || this.facilityId <= 0) {
        // this.showAlert("Enter required fields")
        this.customToast('Select Required Fileds')
        return false
      } else {
        this.createOrderRequest()
      }
    } else if (this.lab_Id <= 0 || this.account_Id <= 0 || this.facilityId <= 0) {

      /// this.showAlert("Enter required fields")
      this.customToast('Select Required Fileds')
      return false
    } else {
      this.createOrderRequest()
    }

  }
}
