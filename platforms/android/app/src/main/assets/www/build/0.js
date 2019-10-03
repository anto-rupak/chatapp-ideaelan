webpackJsonp([0],{

/***/ 841:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuppliesDetailPageModule", function() { return SuppliesDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__supplies_detail__ = __webpack_require__(867);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SuppliesDetailPageModule = /** @class */ (function () {
    function SuppliesDetailPageModule() {
    }
    SuppliesDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__supplies_detail__["a" /* SuppliesDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__supplies_detail__["a" /* SuppliesDetailPage */]),
            ],
        })
    ], SuppliesDetailPageModule);
    return SuppliesDetailPageModule;
}());

//# sourceMappingURL=supplies-detail.module.js.map

/***/ }),

/***/ 867:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SuppliesDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_message_message__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the SuppliesDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SuppliesDetailPage = /** @class */ (function () {
    function SuppliesDetailPage(message, storage, loading, http, navCtrl, navParams) {
        this.message = message;
        this.storage = storage;
        this.loading = loading;
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dispTable = false;
        this.piinbox = false;
    }
    SuppliesDetailPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.getSuppliesDetailUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetOrderDetails';
            _this.UpdateOrderDetailsUrl = _this.appUrl + '/WS/IdeaElanService.svc/UpdateOrderDetails';
            _this.getCategoryUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetProductCategories';
        });
        this.orderid = this.navParams.get('orderid');
        this.piinbox = this.navParams.get('piinbox');
        if (this.piinbox == null) {
            this.piinbox = false;
        }
    };
    SuppliesDetailPage.prototype.ionViewDidEnter = function () {
        this.getproducts();
    };
    SuppliesDetailPage.prototype.updateChange = function () {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        this.http.post(this.UpdateOrderDetailsUrl, {
            orderid: this.OrderId,
            orderstatus: this.SupplyStatus,
            createdby: this.CreatedBy,
            activestatus: this.ActiveStatus
        })
            .subscribe(function (data) {
            //RESPONSE
            loader.dismiss();
            _this.message.showMessagePop("Message", "Status Updated Successfully !!");
            //  this.navCtrl.pop();
            /*
            if(status=="update"){
              this.message.showMessage("Message","Status Updated Successfully !!");
            }
            else if(status =="cancel"){
             this.message.showMessage("Message","Appointment cancelled Successfully !!");
            }
            */
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
            }
        });
    };
    SuppliesDetailPage.prototype.getproducts = function () {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        this.http.get(this.getSuppliesDetailUrl + ("/" + this.orderid)
        //+this.userJson.UserId
        )
            .subscribe(function (data) {
            //RESPONSE
            // this.SupStatus=true;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.listjson = resJSON[0].Products;
            if (_this.listjson != null) {
                _this.categoryList = "";
                _this.listjson.map(function (item) { return item.CategoryName; })
                    .filter(function (value, index, self) { return self.indexOf(value) === index; })
                    .filter(function (value, index, self) { return self.indexOf(value) === index; });
                _this.categoryList1 = _this.listjson.map(function (item) { return item.CategoryName; })
                    .filter(function (value, index, self) { return self.indexOf(value) === index; });
                if (_this.categoryList1 != null) {
                    for (var i = 0; i < _this.categoryList1.length; i++) {
                        if (i != _this.categoryList1.length - 1) {
                            _this.categoryList = _this.categoryList + (" " + _this.categoryList1[i] + "  ,");
                        }
                        else if (i == _this.categoryList1.length - 1) {
                            _this.categoryList = _this.categoryList + (" " + _this.categoryList1[i] + " ");
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
            _this.OrderDate = __WEBPACK_IMPORTED_MODULE_4_moment__(resJSON[0].OrderDate).format('MMMM D, YYYY');
            if (resJSON[0].Products != null) {
                _this.dispTable = true;
            }
            else {
                _this.dispTable = false;
            }
            _this.phone = resJSON[0].phone;
            _this.amount = resJSON[0].Amount;
            _this.createdby = resJSON[0].CreatedBy;
            _this.description = resJSON[0].Description;
            _this.SupplyStatus = resJSON[0].Description;
            if (_this.SupplyStatus == "Approved" || _this.SupplyStatus == "Cancelled" || _this.SupplyStatus == "Completed") {
                _this.piinbox = false;
            }
            _this.projectName = resJSON[0].ProjectName;
            _this.labname = resJSON[0].GroupName;
            _this.ordernumber = resJSON[0].OrderNumber;
            _this.shipaddress = resJSON[0].ShipAddress;
            _this.useraddress = resJSON[0].UserAddress;
            _this.user = resJSON[0].UserFullName;
            _this.Astatus = resJSON[0].ActiveStatus;
            _this.OrderId = resJSON[0].OrderId;
            _this.CreatedBy = resJSON[0].CreatedBy;
            _this.AccountCode = resJSON[0].AccountCode;
            _this.ActiveStatus = resJSON[0].ActiveStatus;
            _this.pid = resJSON[0].ProviderId;
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
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            //this.SupStatus=true;
            if (resErrJSON.status == 400) {
            }
        });
    };
    SuppliesDetailPage.prototype.getCategory = function (pid) {
        var _this = this;
        this.http.get(this.getCategoryUrl + ("/" + pid)
        //+this.userJson.UserId
        )
            .subscribe(function (data) {
            //RESPONSE
            // this.SupStatus=true;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.categoryList = "";
            //this.categoryList =resJSON[0].CategoryName;
            if (resJSON != null) {
                for (var i = 0; i < resJSON.length - 1; i++) {
                    _this.categoryList = _this.categoryList + (resJSON[i].CategoryName + " , ");
                }
            }
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            // loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            //this.SupStatus=true;
            if (resErrJSON.status == 400) {
            }
        });
    };
    SuppliesDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-supplies-detail',template:/*ion-inline-start:"F:\abey_new_mobile_app\src\pages\supplies-detail\supplies-detail.html"*/'\n\n<ion-header hideBackButton="true">\n\n\n\n    <ion-navbar>\n\n      <button ion-button icon-only menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n      <ion-title ion-align=\'center\'>View Supplies</ion-title>\n\n    </ion-navbar>\n\n  \n\n  </ion-header>\n\n  \n\n  <ion-content padding>\n\n      <ion-row>\n\n          <ion-col class="cols" col-4><b>Order Number</b></ion-col>\n\n          <ion-col class="cols" col-6>{{ordernumber}}</ion-col>\n\n        </ion-row>\n\n        <hr>\n\n  \n\n      <ion-row>\n\n          <ion-col class="cols" col-4><b>User </b></ion-col>\n\n          <ion-col class="cols"col-6>{{user}}</ion-col>\n\n        </ion-row>\n\n        <hr>\n\n    <ion-row>\n\n      <ion-col class="cols" col-4><b>Amount </b></ion-col>\n\n      <ion-col *ngIf="!amount" class="cols"  col-6> 0.00 USD</ion-col>\n\n      <ion-col *ngIf="amount"  class="cols"  col-6>{{amount | number:\'1.2-2\'}} USD</ion-col>\n\n    </ion-row>\n\n        <hr>\n\n    <ion-row>\n\n      <ion-col class="cols" col-4><b>Account Code</b></ion-col>\n\n      <ion-col class="cols" col-6>{{AccountCode}}</ion-col>\n\n    </ion-row>\n\n        <hr>\n\n     <ion-row>\n\n      <ion-col class="cols" col-4><b>Project Name</b></ion-col>\n\n      <ion-col class="cols" col-6>{{projectName}}</ion-col>\n\n     </ion-row>\n\n            <hr>\n\n    <ion-row>\n\n      <ion-col class="cols" col-4><b>Lab Name</b></ion-col>\n\n      <ion-col class="cols" col-6>{{labname}}</ion-col>\n\n    </ion-row>\n\n        <hr>\n\n    <ion-row>\n\n      <ion-col class="cols" col-4><b>Status </b></ion-col>\n\n      <ion-col class="cols" col-6 >{{description}}</ion-col>\n\n    </ion-row>\n\n    <hr>\n\n    <ion-row>\n\n      <ion-col class="cols" col-4><b>Order Date</b></ion-col>\n\n      <ion-col class="cols" col-6>{{OrderDate}}</ion-col>\n\n    </ion-row>\n\n    <hr>\n\n    <ion-row>\n\n        <ion-col class="cols" col-4><b>Category</b></ion-col>\n\n        <ion-col class="cols" col-6>{{categoryList}}</ion-col>\n\n      </ion-row>\n\n      <hr>\n\n    <ion-row>\n\n      <ion-col class="cols" col-4><b>Name / Address </b></ion-col>\n\n      <ion-col class="cols" col-6>{{useraddress}}</ion-col>\n\n    </ion-row>\n\n    <hr> \n\n  <div *ngIf="piinbox">\n\n    <ion-row style="align-items: center"><ion-col col-5><b>Order Status</b></ion-col>\n\n      <ion-col col-6>\n\n        <ion-select   [(ngModel)]="SupplyStatus" placeholder=\'status\' multiple="false" (ionChange)="updateChange()" >\n\n                \n\n          <ion-option value="2">Approved</ion-option>\n\n          <ion-option value="5">Cancelled</ion-option>\n\n          \n\n        </ion-select>\n\n      </ion-col></ion-row> \n\n  </div>\n\n  <p class="dropdown">Products</p>\n\n  <ion-card-content class="cardalign" *ngIf=\'!listjson\'>No Records Found</ion-card-content>\n\n\n\n\n\n\n\n  <!-- \n\n\n\n  <ion-list *ngFor="let products of listjson; let i = index;">\n\n      <ion-card-content  *ngIf=\'listjson\'>\n\n       \n\n        <ion-list  class="disp" >\n\n           -->\n\n    <div *ngIf=\'listjson\'>\n\n    <ion-card *ngFor="let products of listjson; let i = index;">\n\n    <div class="cardsubheading">Product Name : {{products.ProductName}}</div>\n\n    <div  class="cardsubtext">Quantity / Unit : {{products.QuantityPerUnit}}</div>\n\n    <div  class="cardsubtext">Price : {{products.UnitPrice}}</div>\n\n  </ion-card>\n\n  </div>\n\n    <!--\n\n  </ion-list>\n\n</ion-card-content>\n\n\n\n  </ion-list>\n\n-->\n\n\n\n\n\n\n\n  </ion-content>\n\n  '/*ion-inline-end:"F:\abey_new_mobile_app\src\pages\supplies-detail\supplies-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__providers_message_message__["a" /* MessageProvider */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], SuppliesDetailPage);
    return SuppliesDetailPage;
}());

//# sourceMappingURL=supplies-detail.js.map

/***/ })

});
//# sourceMappingURL=0.js.map