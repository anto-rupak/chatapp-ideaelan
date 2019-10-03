import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { AlertController, ActionSheetController, LoadingController, ToastController } from 'ionic-angular';
import { SuppliesOrderPage } from '../supplies-order/supplies-order';
import { AppointmentProvider } from '../../providers/appointment/appointment'
import { map } from 'rxjs/operators';
import { isNumber } from 'util';
import * as moment from "moment";
/**
 * Generated class for the SuppliesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-supplies',
  templateUrl: 'supplies.html',
})
export class SuppliesPage {
  appUrl: string;
  getFacilitiesUrl: string;
  barcodeValue: any;
  barcodeValueSub: any;
  getProdcutsByCategoryIds: string;
  userJson: any;
  emptyDropdown: boolean;
  userFacilitiesJson: any;
  facilityid: any;
  spinnerIndex: number;
  productJson: any = [];
  productStatus: boolean;
  insertOrderUrl: string;
  getResourceUrl: string;
  getAccountUrl: string;
  getProjectUrl: string;
  productCategoriesUrl: string;
  getUserRoleBasedOnUserIdUrl: string;
  getLabUrl: string;
  getOrderID: string;
  curr_user_Json: any;
  orderId: any;
  orderDetails: any;
  project_Json: any;
  account_Json: any;
  lab_Json: any;
  user_Id: number;
  project_Id: any;
  lab_Id: any;
  shippingAddress: string;
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
  isprojectDisabled: boolean = true;
  totalPrice: number = 0;
  categoryId: number;
  phonenumber: any;
  currentDate = Date;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public storage: Storage,
    public loading: LoadingController, public http: HttpClient, private alertCtrl: AlertController, public actionctrl: ActionSheetController,
    public appointment: AppointmentProvider, private barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
  
    this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.getFacilitiesUrl = this.appUrl + '/WS/IdeaElanService.svc/GetAllProvidersUserBelongsTo';
      this.getProdcutsByCategoryIds = this.appUrl + '/WS/IdeaElanService.svc/GetProdcutsByCategoryIds';
      this.getResourceUrl = this.appUrl + '/WS/IdeaElanService.svc/GetUsersByProviderId';
      this.getAccountUrl = this.appUrl + '/WS/IdeaElanService.svc/GetAccountCodes';
      this.getProjectUrl = this.appUrl + '/WS/IdeaElanService.svc/GetProjects';
      this.getLabUrl = this.appUrl + '/WS/IdeaElanService.svc/GetLabs';
      this.getOrderID = this.appUrl + '/WS/IdeaElanService.svc/GetOrderId';
      this.insertOrderUrl = this.appUrl + '/WS/IdeaElanService.svc/InsertOrder';
      this.productCategoriesUrl = this.appUrl + '/WS/IdeaElanService.svc/GetProductCategories';
      this.getUserRoleBasedOnUserIdUrl = this.appUrl + '/WS/IdeaElanService.svc/GetUserRoleByUserIdAndProviderId';
    });
    this.storage.get('userDetails').then((val1) => {
      this.curr_user_Json = val1;
      this.user_Id = this.curr_user_Json.UserId
      this.phonenumber = this.curr_user_Json.Phone
      this.shippingAddress = this.curr_user_Json.Address1
   
     
      this.sendFacilitiesRequest()
    });


  }
  ionViewDidEnter() {

    //  this.storage.get('spinnerInbox').then((val) => {
    //    this.spinnerIndex = Number(val);
    //  });
    this.storage.get('userDetails').then((val1) => {
      this.curr_user_Json = val1;
      this.user_Id = this.curr_user_Json.UserId
     


      // this.GetAccountDetails()
    });
    // this.sendFacilitiesRequest()



  }
  sendFacilitiesRequest() {

 
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . ",
      duration: 3000
    });
    loader.present();
    this.http.get(this.getFacilitiesUrl + "/" + this.user_Id)
      .subscribe(
        (data: any) => {
          //RESPONSE
     
          this.emptyDropdown = false;
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.userFacilitiesJson = resJSON;
          this.facilityid = resJSON[0].GroupId;
        //  this.categoryId = 0
          this.getUserRoleBasedOnUserId()
          this.getResourceRequest()
          this.GetProjectDetails()
          this.getOrderIdBasedonFacility()
        },//ERROR HANDLING
        error => {

          loader.dismiss();
          this.emptyDropdown = true;
          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);
          if (resErrJSON.status == 400) {


          }

        });
  }
  tempProductJson: any;
  grantName: string;
  getProductDetailsBasedOnFacility() {

    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . ",
      duration: 3000
    });
    loader.present();
    this.http.post(this.getProdcutsByCategoryIds, {
      "paramname": "ProviderId",
      "paramvalue": this.facilityid
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
    
          //  this.emptyDropdown = false;
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          //  this.productJson = resJSON;
          this.categoryId = 0
          this.isFilterOpenUp = false

          this.productJson = []
          var unitpricebasedonrole;
          var tempvalue;
          resJSON.map(item => {
           

            if (this.curr_role_type[0] == "Super Admin" || this.curr_role_type[0] == "Provider Admin" || this.curr_role_type[0] == "Institution Admin") {

            } else {
              if (!item.IsActive) {
                return false
              }
            }

            return {
              ProductId: item.ProductId,
              ProductName: item.ProductName,
              QuantityPerUnit: item.QuantityPerUnit,
              UnitPrice: item.UnitPrice,
              UnitsInStock: item.UnitsInStock,
              IsActive: item.IsActive,
              IsGrantPrice: item.IsGrantPrice,
              AllRoles: item.AllRoles,
              AllRolesPrice: item.AllRolesPrice,
              UnitsOnOrder: item.UnitsOnOrder,
              CategoryId: item.CategoryId,
              OrderQty: 0,
              TotalPrice: 0,
              IsUnitPrice: item.IsUnitPrice
            }
          }).forEach(item => this.productJson.push(item));
          this.tempProductJson = this.productJson
          // this.facilityid = resJSON[this.spinnerIndex].GroupId;
          this.getResourceRequest()
          this.getUserRoleBasedOnUserId()
          this.getOrderIdBasedonFacility()
          this.changeProductBasedOnGrant()
          this.productStatus = true;
         

        },//ERROR HANDLING
        error => {

          loader.dismiss();
          // this.emptyDropdown = true;
          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);
          if (resErrJSON.status == 400) {
            this.productJson = []
            this.getOrderIdBasedonFacility()
            this.productStatus = false;
          }

        });
  }
  addproduct(productId) {


    for (let i = 0; i < this.productJson.length; i++) {
      if (this.productJson[i].ProductId == productId) {
        let avilableQty = this.productJson[i].UnitsInStock - this.productJson[i].UnitsOnOrder
        if(avilableQty > 0){
          if (this.productJson[i].OrderQty + 1 < avilableQty) {
            this.productJson[i].OrderQty = this.productJson[i].OrderQty + 1
            this.productJson[i].TotalPrice = this.productJson[i].OrderQty * this.productJson[i].UnitPrice
           
          } else {
            const toast = this.toastCtrl.create({
              message: 'You have exceeded the stock limit.',
              duration: 2000
            });
            toast.present();
          }
        }else {
          const toast = this.toastCtrl.create({
            message: 'Item not available.',
            duration: 2000
          });
          toast.present();
        }
      }
    }
  }

  removeproduct(productId) {
    for (let i = 0; i < this.productJson.length; i++) {
      if (this.productJson[i].ProductId == productId) {
        if (this.productJson[i].OrderQty > 0) {
          this.productJson[i].OrderQty = this.productJson[i].OrderQty - 1
          this.productJson[i].TotalPrice = this.productJson[i].OrderQty * this.productJson[i].UnitPrice
      
        } else {
          const toast = this.toastCtrl.create({
            message: 'Quantity is alredy empty.',
            duration: 2000
          });
          toast.present();
        }

      }
    }
  }
  orderProduct() {
    let sel_product_json = this.productJson.filter(i => i.OrderQty > 0);
    this.navCtrl.push(SuppliesOrderPage, { 'orderDetails': sel_product_json, 'facilityId': this.facilityid })
  }
  getResourceRequest() {
 
    this.http.get(this.getResourceUrl + '/' + this.facilityid).subscribe(
      (data: any) => {
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
        this.userJson = resJSON
     

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
      providerid: this.facilityid,
      isreservation: 0
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
          
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.project_Json = resJSON;
       
          if (this.project_Json[0].hasOwnProperty('Message')) {
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
      providerid: this.facilityid
    }).subscribe(
      (data: any) => {
        //RESPONSE
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
        this.lab_Json = resJSON;


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


  accountHandling() {

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
      loggedinuser: this.curr_user_Json.UserId
    }).pipe(
      map((res: any) => {
        return res.filter((post) => {
          if (this.project_Id == undefined || this.project_Id == 0 || this.projectType == "project") {
            return post.IsExpired == false && post.IsMembership == false;
          } else if (this.projectType == "membership") {

            return post
            // return post.ProjectId == this.project_Id;
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
  curr_order_Id: string;
  getOrderIdBasedonFacility() {

    this.http.get(this.getOrderID + '/' + this.facilityid).subscribe(
      (data: any) => {
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
        var order = resJSON.split('$', 2)
        this.orderId = order[0]
        this.curr_order_Id = order[1]
  
      },//ERROR HANDLING
      error => {

      }
    );
  }
  validationRequest() {
    let sel_product_json = this.productJson.filter(i => i.OrderQty > 0);
    for (let i = 0; i < this.productJson.length; i++) {
      if (this.productJson[i].OrderQty > 0) {
        this.totalPrice = this.totalPrice + this.productJson[i].TotalPrice
      }
    }
    if (this.isAccountOpenup) {
      if (this.lab_Id <= 0 || this.facilityid <= 0) {
        // this.showAlert("Enter required fields")
        this.customToast('Select Required Fileds')
        return false
      }
    } else {
      if (this.lab_Id <= 0 || this.account_Id <= 0 || this.facilityid <= 0) {
        /// this.showAlert("Enter required fields")
        this.customToast('Select Required Fileds')
        return false
      }
    }

    if (sel_product_json.length <= 0) {
      this.customToast('Quantity should not be empty.')
    }
    else if (this.phonenumber.length >= 10) {
      this.customToast('Check your phone number.')
    }
    else {
      this.createOrderRequest()
    }

  }
  createOrderRequest() {
    var cxml = '';
    for (let i = 0; i < this.productJson.length; i++) {
      if (this.productJson[i].OrderQty > 0) {
        var productxml = cxml + "<eSelectOrderDetailsList><eSelectOrderDetails><ProductId>" + this.productJson[i].ProductId + "</ProductId><Quantity>" + this.productJson[i].OrderQty + "</Quantity></eSelectOrderDetails></eSelectOrderDetailsList>"
        cxml = productxml
      }
    }
  
    this.http.post(this.insertOrderUrl, {
      userid: this.user_Id,
      labid: this.lab_Id,
      providerid: this.facilityid,
      accountcodeid: this.account_Id,
      shipaddress: this.shippingAddress,
      createdby: this.curr_user_Json.EmailAddress,
      ordernumber: this.orderId,
      currentordernumber: this.curr_order_Id,
      discountprec: "0",
      discountamount: "0",
      freight: "0",
      clientmessage: "test",
      orderamount: this.totalPrice,
      adminmessage: "",
      activestatus: "Active",
      projectid: this.project_Id,
      phone: this.phonenumber,
      xmlproducts: cxml,
      strproducts: "sample"
    }).subscribe(
      (data: any) => {
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
        if (isNumber(resJSON) || !isNaN(resJSON)) {
          this.customToast("Order Placed Succesfully.")
          this.project_Id = 0
          this.lab_Id = 0
          this.account_Id = 0
          this.getProductDetailsBasedOnFacility()
        }
        //this.orderId = resJSON
      
      },//ERROR HANDLING
      error => {
     
      }
    );
  }
  customToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  isFilterOpenUp: boolean = false;
  isSearchOpenUp: boolean = false;
  filterbyCategory() {
    if (this.isSearchOpenUp) {
      this.isSearchOpenUp = false
    }
    if (this.isFilterOpenUp) {
      this.isFilterOpenUp = false;
    } else {
      this.isFilterOpenUp = true;
    }
    this.filterProductBasedOnProductId()
  }
  searchbyProductList() {
    if (this.isFilterOpenUp) {
      this.isFilterOpenUp = false
    }
    if (this.isSearchOpenUp) {
      this.isSearchOpenUp = false;
    } else {
      this.isSearchOpenUp = true;
    }
  }
  searchText: string;
  getSearchResults() {
    var q = this.searchText;
    var tempProductJson = this.productJson
    if (q == null || q == "") {
      this.productJson = this.tempProductJson
      return true;
    }
    this.productJson = this.tempProductJson.filter((v) => {
      if (v.ProductName && q) {
        if (v.ProductName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        } else if (v.ProductName.toLowerCase().indexOf(q.toLowerCase()) < -1) {
          this.productJson = []
        }
        return false;
      }
      //   ()
    });
  }

  categoryJson: any;
  filterProductBasedOnProductId() {
    this.http.get(this.productCategoriesUrl + '/' + this.facilityid).subscribe(
      (data: any) => {
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
        this.categoryJson = resJSON
      
      },//ERROR HANDLING
      error => {
      
      }
    );
  }
  filterBasedOnCategory() {
    if (this.categoryId > 0) {
      this.productJson = this.tempProductJson.filter(i => i.CategoryId == this.categoryId);
    } else {
   //   this.categoryId = 0
      this.productJson = this.tempProductJson
    }


  }

  startScanner() {

    this.barcodeScanner.scan().then(barcodeData => {
      let barcodeCapture = JSON.stringify(barcodeData);
      let barcodeJsonOutput = JSON.parse(barcodeCapture);
      if (barcodeJsonOutput.text == null || barcodeJsonOutput.text == "") {

      } else {
        this.barcodeValue = barcodeJsonOutput.text;
        this.barcodeValueSub = this.barcodeValue.split('-');
        if (this.barcodeValueSub[0] != "ProID") {
          this.customToast('Invalid Barcode');
        }
        else {
        
          let sel_prod_json = this.productJson.filter(i => i.ProductId == this.barcodeValueSub[1]);
        
          if (sel_prod_json.length > 0) {
            this.addproduct(this.barcodeValueSub[1]);
          }
          else {
            this.customToast('Product not found');
          }
        }
        // alert(`${this.barcodeValueSub[0]} and ${this.barcodeValueSub[1]}`)
      }

    }).catch(err => {
    });
  }
  userOnChangeHandeler() {
    this.project_Id = 0
    this.GetProjectDetails()
    this.sendLabRequest()
  }
  curr_role_type: string;
  getUserRoleBasedOnUserId() {

    this.http.get(this.getUserRoleBasedOnUserIdUrl + '/' + this.facilityid + ',' + this.user_Id + ',' + 0).subscribe(
      (data: any) => {
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
     
        this.curr_role_type = resJSON.split(',')

    
        if (this.curr_role_type[0] == "Super Admin" || this.curr_role_type[0] == "Provider Admin" || this.curr_role_type[0] == "Institution Admin") {
          this.isUserOpenUp = true
        } else {
          this.isUserOpenUp = false
        }
        
      },//ERROR HANDLING
      error => {
      
      }
    );
  }
  splitval: any;
  changeProductBasedOnGrant() {

    for (let i = 0; i < this.productJson.length; i++) {
      if(this.productJson[i]){
        var temp_split_user_value = this.productJson[i].AllRoles.split(',')
        var indexof_curr_user = temp_split_user_value.indexOf(this.curr_role_type[0])
        var temp_split_price_value = this.productJson[i].AllRolesPrice.split(',')
      }
     
     

      if (this.productJson[i].IsGrantPrice == false && this.productJson[i].IsUnitPrice == false) {
        //role based price
        if (indexof_curr_user >= 0) {
          this.productJson[i].UnitPrice = temp_split_price_value[indexof_curr_user]
          this.productJson[i].TotalPrice = this.productJson[i].UnitPrice * this.productJson[i].OrderQty
        } else {
          this.productJson[i].UnitPrice = 0
          this.productJson[i].TotalPrice = this.productJson[i].UnitPrice * this.productJson[i].OrderQty
        }

      }  else if (this.productJson[i].IsUnitPrice) {
        // unit price
     
      }
    }
  
  }

  continueToOrder() {

    let sel_Order_Qty = this.productJson.filter(i => i.OrderQty > 0);
 
    if(sel_Order_Qty.length <= 0){
      this.customToast("Quantity should not be empty.")
      return false
    }
    this.navCtrl.push(SuppliesOrderPage, {
      'facilityId': this.facilityid, 'orderId': this.orderId, 'curr_Order_Id': this.curr_order_Id, 
      'orderDetails': sel_Order_Qty, 'tempProductJson': this.tempProductJson, 'userRoleOnFacility':this.curr_role_type
    })
  }

  addProductInValue(value, productId){

    let sel_product_json = this.productJson.filter(i => i.ProductId == productId);

    sel_product_json[0].OrderQty = value.target.value
    sel_product_json[0].TotalPrice =  sel_product_json[0].OrderQty *  sel_product_json[0].UnitPrice
 
    this.changeProductBasedOnGrant()
  }
}
