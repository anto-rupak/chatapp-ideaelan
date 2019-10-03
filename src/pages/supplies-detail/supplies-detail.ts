import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
import * as moment from 'moment';
import { MessageProvider } from '../../providers/message/message';
/**
 * Generated class for the SuppliesDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-supplies-detail',
  templateUrl: 'supplies-detail.html',
})
export class SuppliesDetailPage {
appUrl:any;
getSuppliesDetailUrl :any;
orderid:any;
amount:any;
createdby:any;
description:any;
labname:any;
ordernumber:any;
shipaddress:any;
useraddress:any;
user:any;
Astatus:any;
OrderDate:any;
phone:any;
dispTable:boolean;
listjson:any;
piinbox:boolean;
SupplyStatus:any;
UpdateOrderDetailsUrl:any;
OrderId:any;
CreatedBy:any;
AccountCode:any;
ActiveStatus:any;
categoryList:any;
categoryList1:any;
pid:any;
getCategoryUrl:any;
projectName:any;
  constructor(public message:MessageProvider,public storage: Storage,public loading: LoadingController,public http: HttpClient,public navCtrl: NavController, public navParams: NavParams) {
    this.dispTable=false;
    this.piinbox=false;
  }

  ionViewDidLoad() {

    this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.getSuppliesDetailUrl = this.appUrl + '/WS/IdeaElanService.svc/GetOrderDetails';
      this.UpdateOrderDetailsUrl=this.appUrl + '/WS/IdeaElanService.svc/UpdateOrderDetails'
      this.getCategoryUrl=this.appUrl + '/WS/IdeaElanService.svc/GetProductCategories'
    });
    this.orderid=this.navParams.get('orderid');
    this.piinbox=this.navParams.get('piinbox');
    if(this.piinbox==null){
      this.piinbox=false;
    }
   
  }

  ionViewDidEnter(){
  this.getproducts();
  }
  updateChange()
  { let loader = this.loading.create({
    spinner:"crescent",
    content:"Loading . . . "
  });
  loader.present();

    this.http.post(this.UpdateOrderDetailsUrl,{ 
      orderid:this.OrderId,
orderstatus:this.SupplyStatus,
createdby:this.CreatedBy,
activestatus: this.ActiveStatus
     })
    .subscribe(
      (data:any) => {
        //RESPONSE
           
        
      
         loader.dismiss();
         
         this.message.showMessagePop("Message","Status Updated Successfully !!");
       //  this.navCtrl.pop();
         /*
         if(status=="update"){
           this.message.showMessage("Message","Status Updated Successfully !!");
         }
         else if(status =="cancel"){
          this.message.showMessage("Message","Appointment cancelled Successfully !!");
         }
         */
      },//ERROR HANDLING
      error => {
  
         loader.dismiss();
           
         let resErr = JSON.stringify(error);
         let resErrJSON = JSON.parse(resErr);
         
         if(resErrJSON.status == 400){
         
         }
       
      }
    );
  }
  getproducts(){
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    loader.present();
    this.http.get(this.getSuppliesDetailUrl+`/${this.orderid}`
    //+this.userJson.UserId
    )
   .subscribe(
     (data:any) => {
       //RESPONSE
      // this.SupStatus=true;
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
       
this.listjson=resJSON[0].Products;
if(this.listjson!=null){



this.categoryList="";

this.listjson.map(item => item.CategoryName)
  .filter((value, index, self) => self.indexOf(value) === index)

.filter((value, index, self) => self.indexOf(value) === index);
this.categoryList1=this.listjson.map(item => item.CategoryName)
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




        //***FOR DATE *********/
       var s = resJSON[0].OrderDate;
        // Get the number parts
      //  let b:any = s.match(/\d+/g);
        
        // Get the sign of the offset
       // var sign = /-/.test(s)? -1 : +1;
        
        // Adjust the time value by the offset converted to milliseconds
        // and use to create a Date
        //var ms = +b[0] + sign * (b[1].slice(0,2)*3.6e6 + b[1].slice(-2)*6e4);
       // this.OrderDate=new Date(ms).toISOString();
        this.OrderDate= moment(resJSON[0].OrderDate).format('MMMM D, YYYY');

        if(resJSON[0].Products!=null){
   
          this.dispTable=true;
        }else
        {
          this.dispTable=false;
       
        }
        this.phone=resJSON[0].phone;
        this.amount=resJSON[0].Amount;
        this.createdby = resJSON[0].CreatedBy;
        this.description = resJSON[0].Description;
        this.SupplyStatus=resJSON[0].Description;
        if(this.SupplyStatus=="Approved" ||this.SupplyStatus=="Cancelled" || this.SupplyStatus=="Completed" )
        {
         this.piinbox=false; 
        }
        this.projectName=resJSON[0].ProjectName;
      
        this.labname = resJSON[0].GroupName;
        this.ordernumber=resJSON[0].OrderNumber;
        this.shipaddress=resJSON[0].ShipAddress;
        this.useraddress=resJSON[0].UserAddress;
        this.user=resJSON[0].UserFullName;
        this.Astatus=resJSON[0].ActiveStatus;
        this.OrderId=resJSON[0].OrderId;
        this.CreatedBy=resJSON[0].CreatedBy;
        this.AccountCode=resJSON[0].AccountCode;
        this.ActiveStatus=resJSON[0].ActiveStatus;
        this.pid=resJSON[0].ProviderId;
      // this.getCategory(this.pid);
   
        //this.userSuppliesJson=resJSON;
        //this.userReservtionJson=resJSON;
        //this.appid=resJSON[0].AppointmentId;
        //this.sdate=resJSON[0].strStartTime;
       // this.edate=resJSON[0].strEndTime;
        //this.resourscename=resJSON[0].ResourceName;
       // this.resid=resJSON[0].ResourceId;
        loader.dismiss();


/*

        if(status.match("cancel")){
         let alert = this.alertCtrl.create({
           title: 'Message',
           subTitle: 'Appointment cancelled Successfully',
           buttons: ['Dismiss']
         });
         alert.present();
        }
       // loader.dismiss();
        */
     },//ERROR HANDLING
     error => {
 
        loader.dismiss();
    
        let resErr = JSON.stringify(error);
        let resErrJSON = JSON.parse(resErr);
        //this.SupStatus=true;
        if(resErrJSON.status == 400){
        
        }
      
     }
   );
  }
  getCategory(pid:any){
    this.http.get(this.getCategoryUrl+`/${pid}`
    //+this.userJson.UserId
    )
   .subscribe(
     (data:any) => {
       //RESPONSE
      // this.SupStatus=true;
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
     
        this.categoryList="";
       //this.categoryList =resJSON[0].CategoryName;
     
        if(resJSON!=null){
          for(let i=0;i<resJSON.length -1;i++)
          {
            this.categoryList = this.categoryList + `${resJSON[i].CategoryName} , `
          }
        }
     },//ERROR HANDLING
     error => {
 
       // loader.dismiss();
    
        let resErr = JSON.stringify(error);
        let resErrJSON = JSON.parse(resErr);
        //this.SupStatus=true;
        if(resErrJSON.status == 400){
        
        }
      
     }
   );

  }
}
