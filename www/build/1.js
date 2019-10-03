webpackJsonp([1],{

/***/ 836:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegulationPageModule", function() { return RegulationPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__regulation__ = __webpack_require__(866);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RegulationPageModule = /** @class */ (function () {
    function RegulationPageModule() {
    }
    RegulationPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__regulation__["a" /* RegulationPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__regulation__["a" /* RegulationPage */]),
            ],
        })
    ], RegulationPageModule);
    return RegulationPageModule;
}());

//# sourceMappingURL=regulation.module.js.map

/***/ }),

/***/ 866:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegulationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
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
 * Generated class for the RegulationPage page by Anto Rupak.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// Created by Anto Rupak
var RegulationPage = /** @class */ (function () {
    function RegulationPage(navCtrl, navParams, http, storage, loading) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.loading = loading;
    }
    RegulationPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.resourceId = this.navParams.get('resourceId');
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.getRulesandRegulationsUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetAllInstrumentRulesToShow/' + _this.resourceId;
        });
    };
    RegulationPage.prototype.ionViewDidEnter = function () {
        this.getRulesandRegulations();
    };
    RegulationPage.prototype.getRulesandRegulations = function () {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Updating . . ."
        });
        loader.present();
        //SEDNING UPDATE REQUEST
        this.http.get(this.getRulesandRegulationsUrl)
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.ruleJson = resJSON;
            loader.dismiss();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
                _this.statusrules = true;
            }
        });
    };
    RegulationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-regulation',template:/*ion-inline-start:"F:\abey_new_mobile_app\src\pages\regulation\regulation.html"*/'<!--Module worked by Anto Rupak-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Rules and Regulation</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content >\n\n\n\n<div>\n\n  <ion-card  *ngFor="let c of ruleJson"> \n\n    <ion-card-content [innerHTML]=\'c.RuleDescription\'></ion-card-content>\n\n \n\n  </ion-card>\n\n  <div *ngIf=\'statusrules\'><ion-card><ion-card-content>No rules and regulation applied for this instrument.</ion-card-content></ion-card> </div>\n\n \n\n</div>\n\n \n\n</ion-content>'/*ion-inline-end:"F:\abey_new_mobile_app\src\pages\regulation\regulation.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */]])
    ], RegulationPage);
    return RegulationPage;
}());

//# sourceMappingURL=regulation.js.map

/***/ })

});
//# sourceMappingURL=1.js.map