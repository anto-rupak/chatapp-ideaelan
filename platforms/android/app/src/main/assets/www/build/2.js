webpackJsonp([2],{

/***/ 829:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InboxsuppliesdetailsPageModule", function() { return InboxsuppliesdetailsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__inboxsuppliesdetails__ = __webpack_require__(865);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var InboxsuppliesdetailsPageModule = /** @class */ (function () {
    function InboxsuppliesdetailsPageModule() {
    }
    InboxsuppliesdetailsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__inboxsuppliesdetails__["a" /* InboxsuppliesdetailsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__inboxsuppliesdetails__["a" /* InboxsuppliesdetailsPage */]),
            ],
        })
    ], InboxsuppliesdetailsPageModule);
    return InboxsuppliesdetailsPageModule;
}());

//# sourceMappingURL=inboxsuppliesdetails.module.js.map

/***/ }),

/***/ 865:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InboxsuppliesdetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_message_message__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var InboxsuppliesdetailsPage = /** @class */ (function () {
    function InboxsuppliesdetailsPage(message, navCtrl, navParams, storage, loading, http, alertCtrl) {
        this.message = message;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.loading = loading;
        this.http = http;
        this.alertCtrl = alertCtrl;
    }
    InboxsuppliesdetailsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.orderId = this.navParams.get('orderId');
        this.supplyStatus = this.navParams.get('supplyStatus');
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.getOrderDetails = _this.appUrl + '/WS/IdeaElanService.svc/GetOrderDetails/' + _this.orderId;
            _this.getOrderStatusUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetAllOrderStatus';
            _this.updateOrderUrl = _this.appUrl + '/WS/IdeaElanService.svc/UpdateOrderDetails';
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
        });
    };
    InboxsuppliesdetailsPage.prototype.ionViewDidEnter = function () {
        if (this.supplyStatus == 'Completed') {
            this.statusDisable = true;
        }
        else {
            this.statusDisable = false;
        }
        this.suppliesRequest();
    };
    InboxsuppliesdetailsPage.prototype.updateSupplies = function () {
        var _this = this;
        this.http.post(this.updateOrderUrl, {
            orderid: this.orderId,
            orderstatus: this.orderStatus,
            createdby: this.createdBy,
            activestatus: 'Active'
        })
            .subscribe(function (data) {
            //RESPONSE
            if (!isNaN(data)) {
                _this.message.showMessagePop('Message', 'Status Updated Successfully');
            }
            else {
                _this.message.showMessage('Message', data);
            }
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
        });
    };
    InboxsuppliesdetailsPage.prototype.sendUpdateRequest = function () {
        if (this.orderStatus == undefined || this.orderStatus == null) {
            this.message.showMessage('Alert', 'Select option');
        }
        else {
            this.updateSupplies();
        }
    };
    InboxsuppliesdetailsPage.prototype.suppliesRequest = function () {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . ",
            duration: 3000
        });
        loader.present();
        this.http.get(this.getOrderDetails)
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.suppliesRequestJson = resJSON;
            _this.orderIds = _this.suppliesRequestJson[0].OrderId;
            _this.orderNumber = _this.suppliesRequestJson[0].OrderNumber;
            _this.accountCode = _this.suppliesRequestJson[0].AccountCode;
            _this.providerName = _this.suppliesRequestJson[0].ProviderName;
            _this.groupName = _this.suppliesRequestJson[0].GroupName;
            _this.userName = _this.suppliesRequestJson[0].UserFullName;
            _this.phone = _this.suppliesRequestJson[0].phone;
            _this.createdBy = _this.suppliesRequestJson[0].CreatedBy;
            _this.userAddress = _this.suppliesRequestJson[0].UserAddress;
            _this.projectName = _this.suppliesRequestJson[0].ProjectName;
            _this.amount = _this.suppliesRequestJson[0].Amount;
            _this.productJson = _this.suppliesRequestJson[0].Products;
            _this.orderDate = __WEBPACK_IMPORTED_MODULE_5_moment__(_this.suppliesRequestJson[0].OrderDate).format('MMMM D, YYYY');
            ;
            _this.dropdownDescription = _this.suppliesRequestJson[0].Description;
            _this.statusActive = _this.suppliesRequestJson[0].ActiveStatus;
            if (_this.productJson != null) {
                _this.categoryList = "";
                _this.productJson.map(function (item) { return item.CategoryName; })
                    .filter(function (value, index, self) { return self.indexOf(value) === index; })
                    .filter(function (value, index, self) { return self.indexOf(value) === index; });
                _this.categoryList1 = _this.productJson.map(function (item) { return item.CategoryName; })
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
            _this.orderStatusRequest();
            loader.dismiss();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
        });
    };
    InboxsuppliesdetailsPage.prototype.orderStatusRequest = function () {
        var _this = this;
        this.http.get(this.getOrderStatusUrl)
            .subscribe(function (data) {
            _this.orderStatusDropdown = JSON.parse(JSON.stringify(data));
            _this.getorderId(_this.dropdownDescription, _this.orderStatusDropdown);
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            var resErr = JSON.stringify(error);
        });
    };
    InboxsuppliesdetailsPage.prototype.updateChange = function () {
        this.orderStatus;
    };
    InboxsuppliesdetailsPage.prototype.getorderId = function (key, data) {
        if (data.length > 0 || data != undefined) {
            for (var i = 0; data.length > i; i += 1) {
                if (data[i].Description == key) {
                    this.orderStatus = data[i].OrderStatusId;
                }
            }
        }
        else {
        }
        //return this.labId = data[0].ProjectId;
    };
    InboxsuppliesdetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'page-inboxsuppliesdetails',template:/*ion-inline-start:"F:\abey_new_mobile_app\src\pages\inboxsuppliesdetails\inboxsuppliesdetails.html"*/'\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Supplies</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-row><ion-col col-5><b>Order Number</b></ion-col><ion-col col-6>{{orderNumber}}</ion-col></ion-row><hr>\n\n  <ion-row><ion-col col-5><b>User</b></ion-col><ion-col col-6>{{userName}}</ion-col></ion-row><hr> \n\n  <ion-row><ion-col col-5><b>Amount</b></ion-col><ion-col *ngIf="!amount"  col-6>0.00 USD</ion-col> <ion-col  *ngIf="amount" col-6>{{amount | number:\'1.2-2\'}} USD</ion-col> </ion-row><hr>\n\n  <ion-row><ion-col col-5><b>Account Code</b></ion-col><ion-col col-6>{{accountCode}}</ion-col></ion-row><hr>\n\n  <ion-row><ion-col col-5><b>Project Name</b></ion-col><ion-col col-6>{{projectName}}</ion-col></ion-row><hr>\n\n  <ion-row><ion-col col-5><b>Lab Name</b></ion-col><ion-col col-6>{{groupName}}</ion-col></ion-row><hr>\n\n  <ion-row><ion-col col-5><b>Facility Name</b></ion-col><ion-col col-6>{{providerName}}</ion-col></ion-row><hr>\n\n  <ion-row><ion-col col-5><b>Status</b></ion-col><ion-col col-6>{{statusActive}}</ion-col></ion-row><hr> \n\n  <ion-row><ion-col col-5><b>Order Date</b></ion-col><ion-col col-6>{{orderDate}}</ion-col></ion-row><hr> \n\n  <ion-row><ion-col col-5><b>Category</b></ion-col><ion-col col-6>{{categoryList}}</ion-col></ion-row><hr> \n\n  <ion-row><ion-col col-5><b>Name / Address</b></ion-col><ion-col col-6>{{userAddress}}</ion-col></ion-row><hr>   \n\n  <div>\n\n    <ion-row style="align-items: center"><ion-col col-5><b>Order Status</b></ion-col>\n\n      <ion-col col-6>\n\n        <ion-select [(ngModel)]="orderStatus" placeholder=\'Select Order Status\' multiple="false" (ionChange)="updateChange()" [disabled]="statusDisable">\n\n        <ion-option *ngFor="let orderstatus of orderStatusDropdown" value="{{orderstatus.OrderStatusId}}" >{{orderstatus.Description}}</ion-option>\n\n           </ion-select>\n\n      </ion-col></ion-row> \n\n  </div>\n\n  <br>\n\n <div text-center><button ion-button (click)=\'sendUpdateRequest()\' >Update Suppies</button></div>\n\n \n\n<br>\n\n<p class="dropdown">Products</p>\n\n \n\n  <div>\n\n    <ion-card *ngFor="let products of productJson; let i = index;" >\n\n    <div class="cardsubheading">Product Name : {{products.ProductName}}</div>\n\n    <div class="cardsubtext"> Quantity Per Unit : {{products.QuantityPerUnit}}</div>\n\n    <div class="cardsubtext"> Price : {{products.UnitPrice}}</div>\n\n    </ion-card>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"F:\abey_new_mobile_app\src\pages\inboxsuppliesdetails\inboxsuppliesdetails.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_message_message__["a" /* MessageProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */]])
    ], InboxsuppliesdetailsPage);
    return InboxsuppliesdetailsPage;
}());

//# sourceMappingURL=inboxsuppliesdetails.js.map

/***/ })

});
//# sourceMappingURL=2.js.map