webpackJsonp([3],{

/***/ 784:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DecriptionModalPageModule", function() { return DecriptionModalPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__decription_modal__ = __webpack_require__(820);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DecriptionModalPageModule = /** @class */ (function () {
    function DecriptionModalPageModule() {
    }
    DecriptionModalPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__decription_modal__["a" /* DecriptionModalPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__decription_modal__["a" /* DecriptionModalPage */]),
            ],
        })
    ], DecriptionModalPageModule);
    return DecriptionModalPageModule;
}());

//# sourceMappingURL=decription-modal.module.js.map

/***/ }),

/***/ 820:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DecriptionModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
//Created by Anto rupak
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
 * Generated class for the DecriptionModalPage page Anto Rupak.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DecriptionModalPage = /** @class */ (function () {
    function DecriptionModalPage(navCtrl, navParams, view) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.view = view;
    }
    DecriptionModalPage.prototype.closeModal = function () {
        this.view.dismiss();
    };
    DecriptionModalPage.prototype.ionViewWillLoad = function () {
        this.description = this.navParams.get('description');
    };
    DecriptionModalPage.prototype.ionViewDidEnter = function () {
        var myDiv1 = document.getElementById("myDiv1");
        myDiv1.innerHTML = this.description;
    };
    DecriptionModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-decription-modal',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Supplies IdeaElan\src\pages\decription-modal\decription-modal.html"*/'<!--Created by Anto Rupak-->\n\n<!--\n\n  Generated template for the DecriptionModalPage page by Anto Rupak.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Description</ion-title>\n\n    <ion-buttons end>\n\n     <button ion-button (click)="closeModal()" >Close</button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n    <div id="myDiv1"></div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Admin\Desktop\Supplies IdeaElan\src\pages\decription-modal\decription-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */]])
    ], DecriptionModalPage);
    return DecriptionModalPage;
}());

//# sourceMappingURL=decription-modal.js.map

/***/ })

});
//# sourceMappingURL=3.js.map