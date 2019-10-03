import { MessageProvider } from './../../providers/message/message';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { isNumber } from 'util';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-inboxsuppliesdetails',
  templateUrl: 'inboxsuppliesdetails.html',
})
export class InboxsuppliesdetailsPage {
getOrderDetails:string;
appUrl:string;
userJson:any;
orderId:string;
amount:String;
updateOrderUrl:string;
orderStatusDropdown:string;
getOrderStatusUrl:string;
orderStatus:string;
orderNumber:string;
accountCode:string;
orderIds:string;
providerName:string;
groupName:string;
userName:string;
phone:string;
createdBy:string;
suppliesRequestJson:any;
productJson:any;
dropdownDescription:string
userAddress:string;
statusActive:string;
orderDate:string;
supplyStatus:string;
statusDisable:boolean;
categoryList1:string;
categoryList:string;
projectName:string;
  constructor(public message:MessageProvider,public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
    public loading: LoadingController, public http: HttpClient, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.orderId = this.navParams.get('orderId');
    this.supplyStatus = this.navParams.get('supplyStatus');
    this.storage.get('appLink').then((val) => {
    this.appUrl = val;
    this.getOrderDetails = this.appUrl + '/WS/IdeaElanService.svc/GetOrderDetails/'+this.orderId;
    this.getOrderStatusUrl= this.appUrl + '/WS/IdeaElanService.svc/GetAllOrderStatus';
    this.updateOrderUrl= this.appUrl + '/WS/IdeaElanService.svc/UpdateOrderDetails';
  });
  this.storage.get('userDetails').then((val1) => {
    this.userJson = val1;
  });
  }
  ionViewDidEnter(){
    if(this.supplyStatus == 'Completed'){
      this.statusDisable = true;
    }else{
     this.statusDisable = false;
    }
    this.suppliesRequest();
  }

  updateSupplies(){
    this.http.post(this.updateOrderUrl, {
          orderid:this.orderId,
          orderstatus:this.orderStatus,
          createdby:this.createdBy,
          activestatus:'Active'
    })
      .subscribe(
        (data: any) => {
          //RESPONSE
 
            if(!isNaN(data)){
           this.message.showMessagePop('Message','Status Updated Successfully');
          }else{
            this.message.showMessage('Message',data);
          }
           

        },//ERROR HANDLING
        error => {

          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);


        }
      );
  }
sendUpdateRequest(){
if(this.orderStatus == undefined || this.orderStatus == null){
this.message.showMessage('Alert','Select option');
}else{
  this.updateSupplies();
}
}
  suppliesRequest(){
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . ",
      duration: 3000
    });
    loader.present();
    this.http.get(this.getOrderDetails)
      .subscribe(
        (data: any) => {
          //RESPONSE
       
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.suppliesRequestJson = resJSON;
          this.orderIds = this.suppliesRequestJson[0].OrderId;
          this.orderNumber = this.suppliesRequestJson[0].OrderNumber;
          this.accountCode= this.suppliesRequestJson[0].AccountCode;
          this.providerName= this.suppliesRequestJson[0].ProviderName;
          this.groupName= this.suppliesRequestJson[0].GroupName;
          this.userName= this.suppliesRequestJson[0].UserFullName;
          this.phone= this.suppliesRequestJson[0].phone;
          this.createdBy= this.suppliesRequestJson[0].CreatedBy
          this.userAddress= this.suppliesRequestJson[0].UserAddress
          this.projectName= this.suppliesRequestJson[0].ProjectName;
          this.amount= this.suppliesRequestJson[0].Amount;
          this.productJson =this.suppliesRequestJson[0].Products;
          this.orderDate =moment(this.suppliesRequestJson[0].OrderDate).format('MMMM D, YYYY');;
          this.dropdownDescription = this.suppliesRequestJson[0].Description;
          this.statusActive = this.suppliesRequestJson[0].ActiveStatus;
          if(this.productJson!=null){


           
            this.categoryList="";
            
            this.productJson.map(item => item.CategoryName)
              .filter((value, index, self) => self.indexOf(value) === index)
          
            .filter((value, index, self) => self.indexOf(value) === index);
            this.categoryList1=this.productJson.map(item => item.CategoryName)
            .filter((value, index, self) => self.indexOf(value) === index);
            
             if(this.categoryList1!=null){
               for(let i=0;i<this.categoryList1.length ;i++)
               {     
                 
                if(i!=this.categoryList1.length-1)
                {
                this.categoryList = this.categoryList + ` ${this.categoryList1[i]}  ,`
                }
                else if(i==this.categoryList1.length-1)
                {
                 this.categoryList = this.categoryList + ` ${this.categoryList1[i]} `
                }
         
                
               }
              
             }
            }
          this.orderStatusRequest();
          loader.dismiss();
        },//ERROR HANDLING
        error => {
          loader.dismiss();
          let resErr = JSON.stringify(error);
        }
      );
  }
  
  orderStatusRequest(){
    this.http.get(this.getOrderStatusUrl)
      .subscribe(
        (data: any) => {
  
         this.orderStatusDropdown = JSON.parse(JSON.stringify(data));
         this.getorderId(this.dropdownDescription,this.orderStatusDropdown)
        },//ERROR HANDLING
        error => {
          let resErr = JSON.stringify(error);
        }
      );
  }
  updateChange(){
    this.orderStatus;
  }
  getorderId(key, data) {
    if (data.length > 0 || data != undefined) {
      for (let i = 0; data.length > i; i += 1) {
        if (data[i].Description == key) {
         this.orderStatus  = data[i].OrderStatusId
        }
      }
    } else {
     
    }
    //return this.labId = data[0].ProjectId;
  }
}
