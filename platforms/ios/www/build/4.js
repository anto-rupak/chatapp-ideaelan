webpackJsonp([4],{

/***/ 817:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivitydetailsPageModule", function() { return ActivitydetailsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__activitydetails__ = __webpack_require__(824);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ActivitydetailsPageModule = /** @class */ (function () {
    function ActivitydetailsPageModule() {
    }
    ActivitydetailsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__activitydetails__["a" /* ActivitydetailsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__activitydetails__["a" /* ActivitydetailsPage */]),
            ],
        })
    ], ActivitydetailsPageModule);
    return ActivitydetailsPageModule;
}());

//# sourceMappingURL=activitydetails.module.js.map

/***/ }),

/***/ 824:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivitydetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_notification_notification__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__sampledetail_sampledetail__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_message_message__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__appointments_appointments__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_activitylogs_activitylogs__ = __webpack_require__(18);
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
 * Created By Sumit Rajpal
 */












var ActivitydetailsPage = /** @class */ (function () {
    function ActivitydetailsPage(logs, navCtrl, navParams, loading, http, storage, actionctrl, notification, message) {
        this.logs = logs;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loading = loading;
        this.http = http;
        this.storage = storage;
        this.actionctrl = actionctrl;
        this.notification = notification;
        this.message = message;
    }
    ActivitydetailsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.deleteAppointmentUrl = _this.appUrl + '/WS/IdeaElanService.svc/DeleteAppointment';
            _this.getFacilitiesUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetFacilityAccessRequest';
            _this.getInstrumentUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetInstrumentAccessRequest';
            _this.getUpdateFacilitiesUrl = _this.appUrl + '/WS/IdeaElanService.svc/UpdateProviderRequestStatus';
            _this.getUpdateInstrumentUrl = _this.appUrl + '/WS/IdeaElanService.svc/InsertResourcePermission';
            _this.getReservationUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetReservationRequest';
            _this.getSampleUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetWorkOrdersByProviderIdByDateRange';
            _this.getUpdateReservationUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetSampleSubmissionMilestoneDetails';
            _this.getUserDeviceDetailsUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetUserDeviceDetails';
            _this.sendPushNotificationUrl = _this.appUrl + '/WS/IdeaElanService.svc/SendPushMessageToTokens';
            _this.updateAppointmentUrl = _this.appUrl + '/WS/IdeaElanService.svc/UpdateAppointmentStatusByApptId';
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
        });
        this.facilityId = this.navParams.get('facilityId');
        this.pageType = this.navParams.get('pageType');
        this.facilityName = this.navParams.get('facilityName');
    };
    ActivitydetailsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('userDetails').then(function (val1) {
            _this.startDate = __WEBPACK_IMPORTED_MODULE_4_moment__(__WEBPACK_IMPORTED_MODULE_4_moment__().startOf("isoWeek").toDate()).format("MM/DD/YYYY HH:mm:ss");
            _this.endDate = __WEBPACK_IMPORTED_MODULE_4_moment__(__WEBPACK_IMPORTED_MODULE_4_moment__().add(1, 'weeks').startOf("isoWeek").toDate()).format("MM/DD/YYYY HH:mm:ss");
            (_this.startDate, _this.endDate);
            if (_this.pageType == "Facility") {
                _this.sendFacilitiesRequest(_this.facilityId, _this.getFacilitiesUrl, "");
            }
            else if (_this.pageType == "Instruments") {
                _this.sendFacilitiesRequest(_this.facilityId, _this.getInstrumentUrl, "");
            }
            else if (_this.pageType == "Reservation") {
                _this.sendReservationRequest(_this.facilityId, _this.getReservationUrl, "");
            }
            else if (_this.pageType == "Sample") {
                _this.sendSampleRequest(_this.facilityId, _this.getSampleUrl);
            }
        });
    };
    ActivitydetailsPage.prototype.sendReservationRequest = function (facilityId, methodUrl, status) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        this.http.post(methodUrl, {
            userid: "",
            usertoken: "",
            facilityid: facilityId,
            starttime: this.startDate,
            endtime: this.endDate
        })
            .subscribe(function (data) {
            //RESPONSE
            _this.facStatus = true;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userReservtionJson = resJSON;
            _this.appid = resJSON[0].AppointmentId;
            _this.sdate = resJSON[0].strStartTime;
            _this.edate = resJSON[0].strEndTime;
            _this.resourscename = resJSON[0].ResourceName;
            _this.resid = resJSON[0].ResourceId;
            loader.dismiss();
            if (status == "update") {
                _this.message.showMessage("Message", "Status Updated Successfully !!");
            }
            else if (status == "cancel") {
                _this.message.showMessage("Message", "Appointment cancelled Successfully !!");
            }
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            _this.facStatus = false;
            if (resErrJSON.status == 400) {
            }
        });
    };
    ActivitydetailsPage.prototype.sendSampleRequest = function (facilityId, methodUrl) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        this.http.post(methodUrl, {
            loggedinuser: this.userJson.UserId,
            usertoken: this.userJson.UserToken,
            facilityid: facilityId,
            starttime: this.startDate,
            endtime: this.endDate
        })
            .subscribe(function (data) {
            //RESPONSE
            _this.facStatus = true;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userFacilitiesJson = resJSON;
            loader.dismiss();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            _this.facStatus = false;
            if (resErrJSON.status == 400) {
            }
        });
    };
    ActivitydetailsPage.prototype.sendFacilitiesRequest = function (facilityId, methodUrl, status) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        this.http.post(methodUrl, {
            userid: this.userJson.UserId,
            usertoken: this.userJson.UserToken,
            facilityid: facilityId
        })
            .subscribe(function (data) {
            //RESPONSE
            _this.facStatus = true;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userFacilitiesJson = resJSON;
            _this.name = resJSON[0].UserName;
            _this.instrument = resJSON[0].ResourceName;
            loader.dismiss();
            if (status == "update") {
                _this.message.showMessage("Message", " Access Approved Sccessfully");
            }
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            _this.facStatus = false;
            if (resErrJSON.status == 400) {
            }
        });
    };
    ActivitydetailsPage.prototype.sendFacilitiesUpdateRequest = function (facilityId, methodUrl, uStatus, userId) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        this.http.post(methodUrl, {
            userid: userId,
            status: uStatus,
            facilityid: facilityId,
            user: this.userJson.EmailAddress
        })
            .subscribe(function (data) {
            //RESPONSE
            _this.sendFacilitiesRequest(_this.facilityId, _this.getFacilitiesUrl, "update");
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            // loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
        });
    };
    ActivitydetailsPage.prototype.sendReservationUpdateRequest = function (is_appId, is_approve, is_user) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        this.http.post(this.updateAppointmentUrl, {
            apptid: is_appId,
            isapproved: is_approve,
            user: is_user
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            //  this.notification.getUserDeviceDetails("appt",this.appid,"TRS", `Your appointment request from ${this.sdate} to ${this.edate} for ${this.resourscename} has been approved`,"Appointment approval");
            loader.dismiss();
            _this.sendReservationRequest(_this.facilityId, _this.getReservationUrl, "update");
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
        });
    };
    ActivitydetailsPage.prototype.sendInstrumentUpdateRequest = function (facilityId, methodUrl, isApprove, permissionid, resourceid) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        this.http.post(methodUrl, {
            permissionid: permissionid,
            facilityid: facilityId,
            userid: this.userJson.UserId,
            resourceid: resourceid,
            user: this.userJson.EmailAddress,
            isapproved: isApprove
        })
            .subscribe(function (data) {
            //RESPONSE
            //this.getUserDeviceDetails(resourceid);
            _this.sendFacilitiesRequest(_this.facilityId, _this.getInstrumentUrl, "update");
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
        });
    };
    ActivitydetailsPage.prototype.sampleDetailPage = function (sampleJson) {
        this.sampleJson = sampleJson;
        this.statusJson = this.sampleJson.WorkOrderStatus;
        if (this.statusJson.toLowerCase().indexOf("approved by pi") >= 0 || this.statusJson.toLowerCase().indexOf("approved by user") >= 0 || this.statusJson.toLowerCase().indexOf("in progress") >= 0) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__sampledetail_sampledetail__["a" /* SampledetailPage */], { "sampleJson": sampleJson, "showValue": "true" });
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__sampledetail_sampledetail__["a" /* SampledetailPage */], { "sampleJson": sampleJson, "showValue": "false" });
        }
    };
    ActivitydetailsPage.prototype.actionSheetMethod = function (facilityAccess) {
        var _this = this;
        this.appid = facilityAccess.AppointmentId;
        this.sdate = facilityAccess.strStartTime;
        this.edate = facilityAccess.strEndTime;
        this.resourscename = facilityAccess.ResourceName;
        this.appointmentButton = [
            {
                text: 'Yes',
                handler: function () {
                    _this.CancelAppointmentRequest(facilityAccess.AppointmentId);
                }
            },
            {
                text: 'No',
                handler: function () {
                }
            }
        ];
        if (this.pageType == "Reservation") {
            if (facilityAccess.Status == "Pending") {
                var actionSheetR = this.actionctrl.create({
                    title: 'Select Option : ' + facilityAccess.ResourceName,
                    cssClass: 'myPage',
                    buttons: [
                        {
                            text: "Edit Appointment",
                            role: 'destructive',
                            cssClass: 'myActionSheetBtnStyle',
                            handler: function () {
                                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__appointments_appointments__["a" /* AppointmentsPage */], {
                                    "pageType": "edit",
                                    "AccountCode": facilityAccess.LabAccountCodeId,
                                    "AdminUserId": facilityAccess.AdminUserId,
                                    "AppointmentId": facilityAccess.AppointmentId,
                                    "ProjectId": facilityAccess.ProjectId,
                                    "ResourceId": facilityAccess.ResourceId,
                                    "SpecialInstruction": facilityAccess.SpecialInstruction,
                                    "StartDate": facilityAccess.strStartTime,
                                    "EndDate": facilityAccess.strEndTime,
                                    "TagIds": facilityAccess.TagIds,
                                    "LabId": facilityAccess.LabId,
                                    "SessionId": facilityAccess.SessionId,
                                    "UserId": facilityAccess.UserId,
                                    "FacilityName": facilityAccess.FacilityName
                                });
                            }
                        },
                        {
                            text: 'Cancel Appointment',
                            role: 'destructive',
                            cssClass: 'myActionSheetBtnStyle',
                            handler: function () {
                                _this.message.showMessageButton('Cancel Appointment', 'Are you sure you want to cancel the Appointment ?', _this.appointmentButton);
                            }
                        },
                        {
                            text: 'Approve',
                            role: 'destructive',
                            cssClass: 'myActionSheetBtnStyle',
                            handler: function () {
                                /* Modified by Abey Abraham */
                                _this.sendReservationUpdateRequest(facilityAccess.AppointmentId, "true", facilityAccess.UserId);
                                _this.logs.insertlog("Activity Dasboard", "Activity Details", "Selection of Approve option", "User " + _this.userJson.UserId + " approved appointment request from " + _this.sdate + " to " + _this.edate + " for " + _this.resourscename + " by clicking approve button ", _this.userJson.UserId);
                                _this.notification.getUserDeviceDetails("appt", _this.appid, "TRS", "Your appointment request from " + _this.sdate + " to " + _this.edate + " for " + _this.resourscename + " has been approved", "Appointment approval");
                            }
                        },
                        {
                            text: 'Reject',
                            role: 'destructive',
                            cssClass: 'myActionSheetBtnStyle',
                            handler: function () {
                                _this.sendReservationUpdateRequest(facilityAccess.AppointmentId, "false", facilityAccess.UserId);
                                _this.logs.insertlog("Activity Dasboard", "Activity Details", "Selection of Reject option", "User " + _this.userJson.UserId + " rejected appointment request from " + _this.sdate + " to " + _this.edate + " for " + _this.resourscename + " by clicking reject button ", _this.userJson.UserId);
                                _this.notification.getUserDeviceDetails("appt", _this.appid, "TRS", "Your appointment request from " + _this.sdate + " to " + _this.edate + " for " + _this.resourscename + " has been rejected", "Appointment approval");
                            }
                        }
                    ]
                });
                actionSheetR.present();
            }
            else if (facilityAccess.Status == "Approved") {
                var actionSheetR = this.actionctrl.create({
                    title: 'Select Option : ' + facilityAccess.ResourceName,
                    cssClass: 'myPage',
                    buttons: [
                        {
                            text: "Edit Appointment",
                            role: 'destructive',
                            cssClass: 'myActionSheetBtnStyle',
                            handler: function () {
                                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__appointments_appointments__["a" /* AppointmentsPage */], {
                                    "pageType": "edit",
                                    "AccountCode": facilityAccess.LabAccountCodeId,
                                    "AdminUserId": facilityAccess.AdminUserId,
                                    "AppointmentId": facilityAccess.AppointmentId,
                                    "ProjectId": facilityAccess.ProjectId,
                                    "ResourceId": facilityAccess.ResourceId,
                                    "SpecialInstruction": facilityAccess.SpecialInstruction,
                                    "StartDate": facilityAccess.strStartTime,
                                    "EndDate": facilityAccess.strEndTime,
                                    "TagIds": facilityAccess.TagIds,
                                    "LabId": facilityAccess.LabId,
                                    "SessionId": facilityAccess.SessionId,
                                    "UserId": facilityAccess.UserId,
                                    "FacilityName": facilityAccess.FacilityName
                                });
                            }
                        },
                        {
                            text: 'Cancel Appointment',
                            role: 'destructive',
                            cssClass: 'myActionSheetBtnStyle',
                            handler: function () {
                                _this.message.showMessageButton('Cancel Appointment', 'Are you sure you want to cancel the Appointment ?', _this.appointmentButton);
                            }
                        },
                        {
                            text: 'Reject',
                            role: 'destructive',
                            cssClass: 'myActionSheetBtnStyle',
                            handler: function () {
                                /* Modified by Abey Abraham */
                                _this.sendReservationUpdateRequest(facilityAccess.AppointmentId, "false", facilityAccess.UserId);
                                _this.logs.insertlog("Activity Dasboard", "Activity Details", "Selection of Reject option", "User " + _this.userJson.UserId + " rejected appointment request from " + _this.sdate + " to " + _this.edate + " for " + _this.resourscename + " by clicking reject button ", _this.userJson.UserId);
                                _this.notification.getUserDeviceDetails("appt", _this.appid, "TRS", "Your appointment request from " + _this.sdate + " to " + _this.edate + " for " + _this.resourscename + " has been rejected", "Appointment approval");
                            }
                        }
                    ]
                });
                actionSheetR.present();
            }
            else if (facilityAccess.Status == "Rejected") {
                var actionSheetR = this.actionctrl.create({
                    title: 'Select Option : ' + facilityAccess.ResourceName,
                    cssClass: 'myPage',
                    buttons: [
                        {
                            text: "Edit Appointment",
                            role: 'destructive',
                            cssClass: 'myActionSheetBtnStyle',
                            handler: function () {
                                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__appointments_appointments__["a" /* AppointmentsPage */], {
                                    "pageType": "edit",
                                    "AccountCode": facilityAccess.LabAccountCodeId,
                                    "AdminUserId": facilityAccess.AdminUserId,
                                    "AppointmentId": facilityAccess.AppointmentId,
                                    "ProjectId": facilityAccess.ProjectId,
                                    "ResourceId": facilityAccess.ResourceId,
                                    "SpecialInstruction": facilityAccess.SpecialInstruction,
                                    "StartDate": facilityAccess.strStartTime,
                                    "EndDate": facilityAccess.strEndTime,
                                    "TagIds": facilityAccess.TagIds,
                                    "LabId": facilityAccess.LabId,
                                    "SessionId": facilityAccess.SessionId,
                                    "UserId": facilityAccess.UserId,
                                    "FacilityName": facilityAccess.FacilityName
                                });
                            }
                        },
                        {
                            text: 'Cancel Appointment',
                            role: 'destructive',
                            cssClass: 'myActionSheetBtnStyle',
                            handler: function () {
                                _this.message.showMessageButton('Cancel Appointment', 'Are you sure you want to cancel the Appointment ?', _this.appointmentButton);
                            }
                        },
                        {
                            text: 'Approve',
                            role: 'destructive',
                            cssClass: 'myActionSheetBtnStyle',
                            handler: function () {
                                /* Modified by Abey Abraham */
                                _this.sendReservationUpdateRequest(facilityAccess.AppointmentId, "true", facilityAccess.UserId);
                                _this.logs.insertlog("Activity Dasboard", "Activity Details", "Selection of Approve option", "User " + _this.userJson.UserId + " approved appointment request from " + _this.sdate + " to " + _this.edate + " for " + _this.resourscename + " by clicking approve button ", _this.userJson.UserId);
                                _this.notification.getUserDeviceDetails("appt", _this.appid, "TRS", "Your appointment request from " + _this.sdate + " to " + _this.edate + " for " + _this.resourscename + " has been approved", "Appointment approval");
                            }
                        }
                    ]
                });
                actionSheetR.present();
            }
        }
        else if (this.pageType == "Instruments" || this.pageType == "Facility") {
            var actionSheet = this.actionctrl.create({
                title: 'Select Options : ',
                cssClass: 'myPage',
                buttons: [
                    {
                        text: "Approve",
                        role: 'destructive',
                        cssClass: 'myActionSheetBtnStyle',
                        handler: function () {
                            /* Modified by Abey Abraham */
                            if (_this.pageType == "Facility") {
                                _this.sendFacilitiesUpdateRequest(_this.facilityId, _this.getUpdateFacilitiesUrl, "1", facilityAccess.UserId);
                                _this.logs.insertlog("Facility", "Facility Access Request ", "Selection of Approve option", "User " + _this.userJson.UserId + " approved Request to access " + _this.facilityName + " ", _this.userJson.UserId);
                                _this.notification.getUserDeviceDetails("user", facilityAccess.UserId, "FARS", " Request to access " + _this.facilityName + " has been approved", "Facility Access Request ");
                            }
                            else if (_this.pageType == "Instruments") {
                                _this.sendInstrumentUpdateRequest(_this.facilityId, _this.getUpdateInstrumentUrl, "1", facilityAccess.PermissionId, facilityAccess.ResourceId);
                                _this.logs.insertlog("Instruments", "Instrument Access Request ", "Selection of Approve option", "User " + _this.userJson.UserId + " approved Request to access " + _this.instrument + " ", _this.userJson.UserId);
                                _this.notification.getUserDeviceDetails("user", facilityAccess.UserId, "IARS", "Access for " + _this.instrument + " has been approved", "Instrument Access Request ");
                            }
                        }
                    },
                    {
                        text: 'Reject',
                        role: 'destructive',
                        cssClass: 'myActionSheetBtnStyle',
                        handler: function () {
                            if (_this.pageType == "Facility") {
                                _this.sendFacilitiesUpdateRequest(_this.facilityId, _this.getUpdateFacilitiesUrl, "0", facilityAccess.UserId);
                                _this.logs.insertlog("Facility", "Facility Access Request ", "Selection of Reject option", "User " + _this.userJson.UserId + " rejected Request to access " + _this.facilityName + " ", _this.userJson.UserId);
                                _this.notification.getUserDeviceDetails("user", facilityAccess.UserId, "FARS", "Request to access " + _this.facilityName + " has been rejected", "Facility Access Request ");
                            }
                            else if (_this.pageType == "Instruments") {
                                _this.sendInstrumentUpdateRequest(_this.facilityId, _this.getUpdateInstrumentUrl, "3", facilityAccess.PermissionId, facilityAccess.ResourceId);
                                _this.logs.insertlog("Instruments", "Instrument Access Request ", "Selection of Reject option", "User " + _this.userJson.UserId + " rejected Request to access " + _this.instrument + " ", _this.userJson.UserId);
                                _this.notification.getUserDeviceDetails("user", facilityAccess.UserId, "IARS", "Access for " + _this.instrument + " has been rejected", "Instrument Access Request ");
                            }
                        }
                    }
                ]
            });
            actionSheet.present();
        }
    }; //Cancel Appointment 
    ActivitydetailsPage.prototype.CancelAppointmentRequest = function (eventid) {
        var _this = this;
        this.http.post(this.deleteAppointmentUrl, {
            apptid: eventid,
            user: this.userJson.EmailAddress
        })
            .subscribe(function (data) {
            //     .log(data);
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            if (resJSON == "Success") {
                _this.logs.insertlog("Activity Dasboard", "Activity Details", "Clicked Cancel Appointment", "User " + _this.userJson.UserId + " cancelled appointment from " + _this.sdate + " to " + _this.edate + " for " + _this.resourscename + " ", _this.userJson.UserId);
                _this.notification.getUserDeviceDetails("resource", _this.resid, "UCA", "Appointment from " + _this.sdate + " to " + _this.edate + " for " + _this.resourscename + " has been cancelled", "Appointment Cancelled");
                _this.sendReservationRequest(_this.facilityId, _this.getReservationUrl, "cancel");
            }
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
        });
    };
    ActivitydetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-activitydetails',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Supplies IdeaElan\src\pages\activitydetails\activitydetails.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Activity Dashboard</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content [ngSwitch]=pageType >\n\n  <div *ngSwitchCase="\'Facility\'">\n\n    <p class="cardslayout">Facility Access Request</p>\n\n \n\n    <ion-card-content *ngIf=\'!facStatus\'>No Records Found</ion-card-content>\n\n\n\n    <div *ngIf=\'facStatus\'>\n\n      <ion-card *ngFor="let facilityAccess of userFacilitiesJson; let i = index;"  (click)="actionSheetMethod(facilityAccess)" >\n\n      <div class="cardsubheading">{{facilityAccess.UserName}}</div>\n\n      <div class="cardsubtext"> Institution : {{facilityAccess.Institution}}</div>\n\n      <div class="cardsubtext"> Lab : {{facilityAccess.Lab}}</div>\n\n      <div class="cardsubtext"> Date : {{facilityAccess.CreatedDate}}</div>\n\n      </ion-card>\n\n    </div>\n\n  </div>\n\n  \n\n\n\n  <div *ngSwitchCase="\'Instruments\'">\n\n    <p class="cardslayout">Instruments Access Request</p>\n\n\n\n    <ion-card-content *ngIf=\'!facStatus\'>No Records Found</ion-card-content>\n\n  <div *ngIf=\'facStatus\'>\n\n    <ion-card *ngFor="let facilityAccess of userFacilitiesJson; let i = index;"\n\n    (click)=\'actionSheetMethod(facilityAccess)\' >\n\n    <div class="cardsubheading">{{facilityAccess.ResourceName}}</div>\n\n    <div class="cardsubtext"> User : {{facilityAccess.UserName}}</div>\n\n    <div class="cardsubtext"> Date : {{facilityAccess.strCreatedDate}}</div>\n\n    </ion-card>\n\n  </div>\n\n  </div>\n\n\n\n  <div *ngSwitchCase="\'Reservation\'">\n\n    <p class="cardslayout">Reservation</p>\n\n\n\n    <ion-card-content *ngIf=\'!facStatus\'>No Records Found</ion-card-content>\n\n        \n\n  <div *ngIf=\'facStatus\'>\n\n    <ion-card *ngFor="let reservationAccess of userReservtionJson; let i = index;" [ngSwitch]=reservationAccess.Status  (click)=\'actionSheetMethod(reservationAccess)\'>\n\n    <div class="cardheading">{{reservationAccess.ResourceName}}</div>\n\n    <div class="cardsubheading">User : {{reservationAccess.UserFullName}}</div>\n\n    <div class="cardcontainertext">\n\n      <span class="cardlefttext">Lab : {{reservationAccess.LabName}}</span>\n\n       <span class="cardrighttext">{{reservationAccess.SessionType}}</span>\n\n      </div>\n\n    <div class="cardsubtext" *ngIf="reservationAccess.GroupType!=\'P\'">Account Code : {{reservationAccess.AccountCode}}</div>\n\n    <div class="cardsubtext" *ngIf="reservationAccess.GroupType==\'P\'">PO Number : {{reservationAccess.AccountCode}}</div>\n\n    <div *ngSwitchCase="\'Approved\'" class="cardcontainertext">\n\n      <span class="cardstatus" >Status : </span>\n\n      <span class="cardstatusgreen"><ion-icon name="checkmark-circle" class="text"></ion-icon> {{reservationAccess.Status}}\n\n      </span>\n\n    </div>\n\n    <div *ngSwitchCase="\'Waitlisted\'" class="cardcontainertext"><span class="cardstatus" >Status : </span><span class="cardstatusgreen"><ion-icon name="checkmark-circle" class="text"></ion-icon> {{reservationAccess.Status}}</span></div>\n\n    <div *ngSwitchCase="\'Rejected\'" class="cardcontainertext"><span class="cardstatus" >Status : </span><span class="cardstatusred"> <ion-icon name="close-circle" class="text"></ion-icon> {{reservationAccess.Status}}</span></div>\n\n    <div *ngSwitchCase="\'Pending\'" class="cardcontainertext"><span class="cardstatus" >Status : </span><span class="cardstatusred"><ion-icon name="close-circle" class="text"></ion-icon> {{reservationAccess.Status}}</span></div>\n\n    <div *ngSwitchCase="\'Upcoming\'" class="cardcontainertext"><span class="cardstatus" >Status : </span><span class="cardstatusgreen"><ion-icon name="checkmark-circle" class="text"></ion-icon> {{reservationAccess.Status}}</span></div>\n\n    <div *ngSwitchCase="\'Elapsed\'" class="cardcontainertext"><span class="cardstatus" >Status : </span><span class="cardstatusred"><ion-icon name="close-circle" class="text"></ion-icon> {{reservationAccess.Status}}</span></div>\n\n    <div class="cardcontainertext">\n\n      <span class="cardlefttime"> <ion-icon name="time" class="text"></ion-icon> {{reservationAccess.strStartTime}}</span> \n\n      <span class="cardrighttime"><ion-icon name="time" class="text"></ion-icon> {{reservationAccess.strEndTime}}</span>\n\n    </div>\n\n    </ion-card>\n\n    </div>\n\n   <!--\n\n    <div  *ngIf=\'facStatus\'>\n\n    <ion-card *ngFor="let reservationAccess of userReservtionJson; let i = index;" [ngSwitch]=reservationAccess.Status\n\n      (click)=\'actionSheetMethod(reservationAccess)\' >\n\n\n\n     \n\n      <p class="cardcontents"><b>{{reservationAccess.ResourceName}}</b></p>\n\n      <p class="cardcontents">User : <b>{{reservationAccess.UserFullName}}</b></p>\n\n      <p class="cardcontents">Lab : {{reservationAccess.LabName}}</p>\n\n      <p class="cardcontents" >Account Code : {{reservationAccess.AccountCode}}</p>\n\n      <p class="cardcontents">Session Type : {{reservationAccess.SessionType}}</p>\n\n      <div *ngSwitchCase="\'Approved\'" class="cardcontents">Status :<span class="approved">\n\n          {{reservationAccess.Status}}</span></div>\n\n      <div *ngSwitchCase="\'Rejected\'" class="cardcontents">Status :<span class="rejected">\n\n          {{reservationAccess.Status}}</span></div>\n\n      <div *ngSwitchCase="\'Pending\'" class="cardcontents">Status : <span\n\n          class="rejected">{{reservationAccess.Status}}</span></div>\n\n      <p class="cardcontents">{{reservationAccess.strStartTime}}&nbsp;&nbsp;&nbsp;&nbsp;{{reservationAccess.strEndTime}}\n\n      </p>\n\n     \n\n    </ion-card>\n\n    </div>--> \n\n  </div> \n\n\n\n  \n\n  <div *ngSwitchCase="\'Sample\'">\n\n    <p class="cardslayout">Sample Submission/Service Requests</p>\n\n\n\n    <ion-card-content *ngIf=\'!facStatus\'>No Records Found</ion-card-content>\n\n    <div *ngIf=\'facStatus\'>\n\n      <ion-card *ngFor="let facilityAccess of userFacilitiesJson; let i = index;"\n\n      [ngSwitch]=facilityAccess.WorkOrderStatus.trim() (click)=\'sampleDetailPage(facilityAccess)\'>\n\n      <div class="cardheading">{{facilityAccess.RollNumber}}</div>\n\n      <div class="cardsubheading">Template : {{facilityAccess.TemplateName}}</div>\n\n      <div class="cardsubtext" >User : {{facilityAccess.UserFullName}}</div>\n\n      <div class="cardsubtext" >Lab : {{facilityAccess.LabName}}</div>\n\n      <div class="cardsubtext" >PI : {{facilityAccess.PIName}}</div>\n\n      \n\n      <div  *ngIf="facilityAccess.WorkOrderStatus.trim()==\'Approval Process (Cancel)\'" class="cardcontainertext">\n\n        <span class="cardstatus" >Status : </span>\n\n        <span class="cardstatusgreen"><ion-icon name="close-circle" class="text"></ion-icon> {{facilityAccess.WorkOrderStatus}}\n\n        </span>\n\n      </div>\n\n      <div  *ngIf="facilityAccess.WorkOrderStatus.trim()!=\'Approval Process (Cancel)\'" class="cardcontainertext">\n\n        <span class="cardstatus" >Status : </span>\n\n        <span class="cardstatusgreen"><ion-icon name="checkmark-circle" class="text"></ion-icon> {{facilityAccess.WorkOrderStatus}}\n\n        </span>\n\n      </div>\n\n      \n\n      <div class="cardsubtext" >Date : {{facilityAccess.strCreatedDate}}</div>\n\n    </ion-card>\n\n      </div>\n\n      <!--\n\n\n\n     \n\n    <ion-card *ngFor="let facilityAccess of userFacilitiesJson; let i = index;"\n\n      [ngSwitch]=facilityAccess.WorkOrderStatus.trim() (click)=\'sampleDetailPage(facilityAccess)\'>\n\n\n\n     \n\n      <p class="cardcontents"><b>{{facilityAccess.RollNumber}}</b></p>\n\n      <p class="cardcontents">Template : {{facilityAccess.TemplateName}}</p>\n\n      <p class="cardcontents">User : {{facilityAccess.UserFullName}}</p>\n\n      <p class="cardcontents">Lab : {{facilityAccess.LabName}}</p>\n\n      <p class="cardcontents">PI : {{facilityAccess.PIName}}</p>\n\n      <div  *ngIf="facilityAccess.WorkOrderStatus.trim()==\'Approval Process (Cancel)\'">\n\n        <div class="cardcontents">Status : <span class="rejected">{{facilityAccess.WorkOrderStatus}}</span></div>\n\n      </div>\n\n      <div  *ngIf="facilityAccess.WorkOrderStatus.trim()!=\'Approval Process (Cancel)\'">\n\n      <div class="cardcontents">Status : <span class="approved">{{facilityAccess.WorkOrderStatus}}</span></div>\n\n     </div>\n\n      <p class="cardcontents">Date : {{facilityAccess.strCreatedDate}}</p>\n\n     \n\n    </ion-card>\n\n     -->\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Admin\Desktop\Supplies IdeaElan\src\pages\activitydetails\activitydetails.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_9__providers_activitylogs_activitylogs__["a" /* ActivitylogsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_notification_notification__["a" /* NotificationProvider */], __WEBPACK_IMPORTED_MODULE_7__providers_message_message__["a" /* MessageProvider */]])
    ], ActivitydetailsPage);
    return ActivitydetailsPage;
}());

//# sourceMappingURL=activitydetails.js.map

/***/ })

});
//# sourceMappingURL=4.js.map