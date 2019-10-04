webpackJsonp([3],{

/***/ 827:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeneralChatPageModule", function() { return GeneralChatPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__general_chat__ = __webpack_require__(866);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GeneralChatPageModule = /** @class */ (function () {
    function GeneralChatPageModule() {
    }
    GeneralChatPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__general_chat__["a" /* GeneralChatPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__general_chat__["a" /* GeneralChatPage */]),
            ],
        })
    ], GeneralChatPageModule);
    return GeneralChatPageModule;
}());

//# sourceMappingURL=general-chat.module.js.map

/***/ }),

/***/ 866:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeneralChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
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
 * Generated class for the GeneralChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GeneralChatPage = /** @class */ (function () {
    function GeneralChatPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    GeneralChatPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GeneralChatPage');
    };
    GeneralChatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-general-chat',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\general-chat\general-chat.html"*/'<!--\n  Generated template for the GeneralChatPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>Chat</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content >\n  <ion-searchbar animated showCancelButton="always" (ionInput)="getItems()" [(ngModel)]="searchText"> <ion-icon name="options"></ion-icon></ion-searchbar>\n  <!-- *ngFor="let adminlist of adminListJson1; let i = index;" -->\n  \n  <!-- *ngFor="let userlist of users; let i = index;"-->\n  <ion-list >\n  <ion-card-content >\n  <!-- *ngIf=\'!testtrue\' -->\n  <ion-item *ngFor="let chatList of userchatList" (click)="fetchChatdetails(chatList)">\n  <ion-avatar item-start>\n   <img src="{{chatList.UserImage}}">\n  \n  </ion-avatar>\n  <h2>{{chatList.senderName}}</h2>\n  <!-- *ngIf="userlist.unReadMessage > 0" color="primary" style="float:right" -->\n  <!--<h3>{{chatList.message}}<ion-badge *ngIf="chatList.messageCount > 0" color="primary" style="float:right">{{chatList.messageCount}}</ion-badge></h3> -->\n  </ion-item>\n  \n  </ion-card-content>\n  </ion-list>\n  \n  \n</ion-content>\n'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\general-chat\general-chat.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], GeneralChatPage);
    return GeneralChatPage;
}());

//# sourceMappingURL=general-chat.js.map

/***/ })

});
//# sourceMappingURL=3.js.map