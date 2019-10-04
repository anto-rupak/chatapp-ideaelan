webpackJsonp([44],{

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SchedularPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_fullcalendar__ = __webpack_require__(772);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_fullcalendar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_fullcalendar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_notification_notification__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_util__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_util__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__menu_menu__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__appointments_appointments__ = __webpack_require__(139);
// Created by Anto Rupak
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var SchedularPage = /** @class */ (function () {
    function SchedularPage(navCtrl, toastCtrl, navParams, storage, http, loading, alertCtrl, notification) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.http = http;
        this.loading = loading;
        this.alertCtrl = alertCtrl;
        this.notification = notification;
        this.other = [];
        this.isSuperAdmin = false;
    }
    SchedularPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.resourceId = this.navParams.get('resourceId');
        this.labId = this.navParams.get('labId');
        this.instrumentname = this.navParams.get('instrumentName');
        this.pageName = this.navParams.get('pageName');
        this.projectId = this.navParams.get('projectId');
        this.isappointment = this.navParams.get('appointmentcreated');
        this.isContactMatched = this.navParams.get('isContactMatch');
        //Client Based modification for /nmi  --Anto
        this.clientType = this.navParams.get('clientType');
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.deleteAppointmentUrl = _this.appUrl + '/WS/IdeaElanService.svc/DeleteAppointment';
            _this.updateAppointmentUrl = _this.appUrl + '/WS/IdeaElanService.svc/InsertUpdateAppointment';
            _this.getAppointmentUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetAllReservations';
            _this.getCancellationRuleUrl = _this.appUrl + '/WS/IdeaElanService.svc/CheckCancellationRule';
            _this.getUserDeviceDetailsUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetUserDeviceDetails';
            _this.sendPushNotificationUrl = _this.appUrl + '/WS/IdeaElanService.svc/SendPushMessageToTokens';
            _this.getUserDefaultDetailsUrl = _this.appUrl + '/WS/IdeaElanService.svc/getUserDefaultDetails';
            _this.checkReservationRuleUrl = _this.appUrl + '/WS/IdeaElanService.svc/CheckReservationRule';
            if (_this.pageName === 'Instument' || _this.pageName === 'appointment') {
                _this.pageRedirction = true;
            }
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
            _this.isAdmin = _this.userJson.UserRole;
            if (_this.isAdmin.includes("Admin")) {
                _this.admin = true;
            }
        });
        this.storage.get('roleType').then(function (role) {
            _this.roleType = role;
            var isContactMatched = _this.navParams.get('isContactMatch');
            if (_this.roleType === 'admin' || _this.roleType === 'super' || _this.roleType === 'providerAdmin' || isContactMatched) {
                _this.isSuperAdmin = true;
            }
            else {
                _this.isSuperAdmin = false;
            }
        });
    };
    SchedularPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.startTime = new Date().getTime();
        var containerEl = __WEBPACK_IMPORTED_MODULE_5_jquery__('#calendar');
        containerEl.fullCalendar({
            header: {
                left: 'title',
                center: '',
                right: 'prev,next today'
            },
            height: 680,
            defaultView: "agendaWeek",
            editable: true,
            selectable: true,
            selectHelper: true,
            unselectAuto: true,
            selectOverlap: true,
            businessHours: true,
            timezone: 'local',
            dragScroll: true,
            allDaySlot: false,
            eventOverlap: function (stillEvent, movingEvent) {
                _this.showAlert("Time slot is unavailable for this appointment ");
                return false;
            },
            //  timeFormat: 'H(: mm)',
            select: function (startDate, endDate) {
                var selTime = __WEBPACK_IMPORTED_MODULE_4_moment__(startDate, 'YYYY-MM-DD h:m:s A').format('HH:mm:ss');
                var curtime = __WEBPACK_IMPORTED_MODULE_4_moment__().format('YYYY-MM-DD h:m:s A');
                var shour = __WEBPACK_IMPORTED_MODULE_4_moment__(startDate).isAfter(curtime); //parseInt(selarr[0]) + " hrs";
                var stdate = startDate.toString();
                var endate = endDate.toString();
                if (!_this.isSuperAdmin) {
                    if ((Date.parse(stdate) <= Date.now())) {
                        _this.dateUnselectAlert();
                        __WEBPACK_IMPORTED_MODULE_5_jquery__('#calendar').fullCalendar('unselect');
                        return false;
                    }
                }
                _this.GetUserDefaultDetails(startDate, endDate);
            },
            eventRender: function (event, element, view) {
            },
            eventAfterRender: function (event, element, view) {
                var dateIsBefore = __WEBPACK_IMPORTED_MODULE_4_moment__(new Date()).isBefore(__WEBPACK_IMPORTED_MODULE_4_moment__(event.start));
                var startDate = __WEBPACK_IMPORTED_MODULE_4_moment__(new Date(event.start.toString())).format('L');
                if (_this.isSuperAdmin) {
                    element.find(".fc-bg").css("pointer-events", "none");
                    element.prepend('<span><img id="Delete" src="assets/icon/Delete.png" width="20%" align="right" /></span><br/><div style="clear:both"></div>');
                }
                else {
                    if (__WEBPACK_IMPORTED_MODULE_4_moment__().diff(startDate, 'days') > 0) {
                    }
                    else {
                        if (_this.userJson.UserId != event.userId) {
                        }
                        else {
                            element.find(".fc-bg").css("pointer-events", "none");
                            element.prepend('<span><img id="Delete" src="assets/icon/Delete.png" width="20%" align="right" /></span><br/><div style="clear:both"></div>');
                        }
                    }
                }
            },
            eventClick: function (calEvent, jsEvent, view) {
                var eventid = __WEBPACK_IMPORTED_MODULE_5_jquery__(jsEvent.target).attr('id');
                if (eventid === 'Delete') {
                    _this.CheckAppointmentCancellationRule(calEvent.id, calEvent.start, calEvent.end);
                }
            },
            viewRender: function (view, element) {
                containerEl.fullCalendar('removeEvents'); //Hide all events
                _this.GetAppointmentRequest();
            },
            eventResize: function (event, delta, revertFunc, view) {
                var sdate = __WEBPACK_IMPORTED_MODULE_4_moment__(event.start).format('MMMM Do YYYY, h:mm:ss a');
                var edate = __WEBPACK_IMPORTED_MODULE_4_moment__(event.end).format('MMMM Do YYYY, h:mm:ss a');
                _this.sendUpdateRequest(event);
            },
            eventDrop: function (event, delta, revertFunc, jsEvent, ui, view) {
                if (!_this.isSuperAdmin) {
                    var selTime = __WEBPACK_IMPORTED_MODULE_4_moment__(event.start, 'YYYY-MM-DD h:m:s A').format('YYYY-MM-DD h:m:s A');
                    var curtime = __WEBPACK_IMPORTED_MODULE_4_moment__().format('YYYY-MM-DD h:m:s A');
                    var shour = __WEBPACK_IMPORTED_MODULE_4_moment__(selTime).isBefore(curtime); //parseInt(selarr[0]) + " hrs";
                    if (shour) {
                        _this.showAlert(" Cannot create/update reservation earlier than today date and time.");
                        revertFunc();
                    }
                    else {
                        _this.sendUpdateRequest(event);
                    }
                }
                else {
                    _this.sendUpdateRequest(event);
                }
                //  this.sendUpdateRequest(event)
                // containerEl.fullCalendar('refetchEvents')
            }
        });
    };
    // swipe right and left
    SchedularPage.prototype.swipeEvent = function (e) {
        var containerEl = __WEBPACK_IMPORTED_MODULE_5_jquery__('#calendar');
        if (e.direction == 2) {
            //direction 2 = right to left swipe.
            containerEl.fullCalendar('next');
        }
        else if (e.direction == 4) {
            //direction 4 = left to right swipe.
            containerEl.fullCalendar('prev');
        }
    };
    //Request for appointment from API
    SchedularPage.prototype.GetAppointmentRequest = function () {
        var _this = this;
        this.other = [];
        var containerEl = __WEBPACK_IMPORTED_MODULE_5_jquery__('#calendar');
        this.start_date = containerEl.fullCalendar('getView').start;
        this.end_date = containerEl.fullCalendar('getView').end;
        var sdate = __WEBPACK_IMPORTED_MODULE_4_moment__(this.start_date).format("MM/DD/YYYY");
        var edate = __WEBPACK_IMPORTED_MODULE_4_moment__(this.end_date).format("MM/DD/YYYY");
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Updating . . ."
        });
        loader.present();
        var calendarEl = document.getElementById('calendar');
        //SEDNING UPDATE REQUEST
        this.http.post(this.getAppointmentUrl, {
            resourceid: this.resourceId,
            starttime: sdate,
            endtime: edate
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.apptJson = resJSON;
            //New <Session Type> appointment created by <User Name> from <Start date and time> to <End Date and Time> for <Instrument Name>
            //this.notification.getUserDeviceDetails("resource", this.resourceId, "NAC", `Appointment created by <username> from ${sdate} to ${edate} for ${this.instrumentname} `, "New Appointment")
            _this.apptJson.map(function (item) {
                switch (item.ColorType) {
                    case 1:
                        _this.eventcolor = "#FF8A65";
                        _this.textcolor = "";
                        break;
                    case 2:
                        _this.eventcolor = "#EE82EE";
                        _this.textcolor = "";
                        break;
                    case 3:
                        _this.eventcolor = "#7CFC00";
                        _this.textcolor = "";
                        break;
                    case 4:
                        _this.eventcolor = "#BDB76B";
                        _this.textcolor = "#000000";
                        break;
                    case 5:
                        _this.eventcolor = "#0000ff";
                        _this.textcolor = "";
                        break;
                    case 6:
                        _this.eventcolor = "#000080";
                        _this.textcolor = "";
                        break;
                    case 7:
                        _this.eventcolor = "#FFC0CB";
                        _this.textcolor = "#000000";
                        break;
                    case 8:
                        _this.eventcolor = "#228B22";
                        _this.textcolor = "";
                        break;
                    case 9:
                        _this.eventcolor = "#B22222";
                        _this.textcolor = "";
                        break;
                    default: _this.eventcolor = "";
                }
                if (_this.isSuperAdmin) {
                    _this.isEditable = true;
                }
                else if (item.UserId == _this.userJson.UserId) {
                    if (__WEBPACK_IMPORTED_MODULE_4_moment__().diff(item.strStartTime, 'days') > 0) {
                        _this.isEditable = false;
                    }
                    else {
                        _this.isEditable = true;
                    }
                }
                else {
                    _this.isEditable = false;
                }
                return {
                    userId: item.UserId,
                    title: item.ApptName,
                    resourceId: item.ResourceId,
                    labId: item.LabId,
                    projectId: item.ProjectId,
                    sessionId: item.SessionId,
                    id: item.AppointmentId,
                    accountCodeFrom: item.AccountCodeFrom,
                    sessionTypeId: item.SessionId,
                    username: item.UserFullName,
                    accountCodeId: item.LabAccountCodeId,
                    adminUserId: item.AdminUserId,
                    allDay: false,
                    start: new Date(item.strStartTime),
                    end: new Date(item.strEndTime),
                    tag: item.TagIds,
                    textColor: _this.textcolor,
                    backgroundColor: _this.eventcolor,
                    eventBorderColor: 'none',
                    editable: _this.isEditable,
                    SpecialInstruction: item.SpecialInstruction
                };
            }).forEach(function (item) { return _this.other.push(item); });
            //Adding Events for the Calendar
            containerEl.fullCalendar('addEventSource', _this.other);
            loader.dismiss();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
        });
    };
    //Cancel Appointment 
    SchedularPage.prototype.CancelAppointmentRequest = function (eventid, eventstart, eventend) {
        var _this = this;
        var sdate = __WEBPACK_IMPORTED_MODULE_4_moment__(eventstart).format('MMMM Do YYYY, h:mm:ss a');
        var edate = __WEBPACK_IMPORTED_MODULE_4_moment__(eventend).format('MMMM Do YYYY, h:mm:ss a');
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Updating . . ."
        });
        loader.present();
        this.http.post(this.deleteAppointmentUrl, {
            apptid: eventid,
            user: this.userJson.EmailAddress
        })
            .subscribe(function (data) {
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.apptJson = resJSON;
            var containerEl = __WEBPACK_IMPORTED_MODULE_5_jquery__('#calendar');
            containerEl.fullCalendar('removeEvents', eventid);
            _this.showAlert("Appointment Cancelled successfully.");
            _this.notification.getUserDeviceDetails("resource", _this.resourceId, "UCA", "Appointment from " + sdate + " to " + edate + " for " + _this.instrumentname + " has been cancelled", "Appointment Cancelled");
            loader.dismiss();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
        });
    };
    SchedularPage.prototype.sendUpdateRequest = function (event) {
        var _this = this;
        this.rid = event.resourceId;
        var sdate = __WEBPACK_IMPORTED_MODULE_4_moment__(new Date(event.start._d)).format("YYYY-MM-DD HH:mm");
        var edate = __WEBPACK_IMPORTED_MODULE_4_moment__(new Date(event.end._d)).format("YYYY-MM-DD HH:mm");
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Updating . . ."
        });
        loader.present();
        //SEDNING UPDATE REQUEST
        this.http.post(this.updateAppointmentUrl, {
            userid: event.userId,
            resourceid: event.resourceId,
            labid: event.labId,
            accountcodeid: event.accountCodeId,
            projectid: event.projectId,
            sessiontypeid: event.sessionId,
            starttime: sdate,
            endtime: edate,
            username: event.username,
            accountcodefrom: event.accountCodeFrom,
            specialinst: event.SpecialInstruction,
            apptid: event.id,
            user: this.userJson.EmailAddress,
            incharge: event.adminUserId,
            tagids: event.tag
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            var i = 0;
            for (i = 0; i < _this.apptJson.length; i++) {
                if (_this.apptJson[i].ResourceId == event.resourceId) {
                    _this.instrumentname = _this.apptJson[i].ResourceName;
                    break;
                }
            }
            if (Object(__WEBPACK_IMPORTED_MODULE_8_util__["isNumber"])(resJSON.InsertUpdateAppointmentResult) || !isNaN(resJSON.InsertUpdateAppointmentResult)) {
                _this.notification.getUserDeviceDetails("resource", _this.resourceId, "UEA", "Appointment from " + sdate + " to " + edate + " for " + _this.instrumentname + " has been modified", "Appointment Modified");
            }
            else {
                _this.showAlert(resJSON.InsertUpdateAppointmentResult);
            }
            loader.dismiss();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
        });
    };
    SchedularPage.prototype.showConfirm = function (eventid, eventstart, eventend) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Cancel Appointment',
            message: 'Are you sure you want to Cancel Appointment.',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () { }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.CancelAppointmentRequest(eventid, eventstart, eventend);
                    }
                }
            ]
        });
        confirm.present();
    };
    SchedularPage.prototype.CheckAppointmentCancellationRule = function (eventid, eventstart, eventend) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Updating . . ."
        });
        loader.present();
        this.http.post(this.getCancellationRuleUrl, {
            apptid: eventid,
            loggedinuser: this.userJson.UserId
        })
            .subscribe(function (data) {
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            if (resJSON.IsSuccess = true) {
                _this.showConfirm(eventid, eventstart, eventend);
            }
            else {
                _this.showAlert(resJSON.Alert);
            }
            loader.dismiss();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
        });
    };
    SchedularPage.prototype.CheckAppointmentReservationRule = function (eventid, eventstart, eventend) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Updating . . ."
        });
        loader.present();
        this.http.post(this.checkReservationRuleUrl, {
            apptid: eventid,
            loggedinuser: this.userJson.UserId,
            flag: 'O'
        })
            .subscribe(function (data) {
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            if (resJSON.IsSuccess = true) {
                _this.showConfirm(eventid, eventstart, eventend);
            }
            else {
                _this.showAlert(resJSON.Alert);
            }
            loader.dismiss();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
        });
    };
    SchedularPage.prototype.showAlert = function (eventdata) {
        var alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: eventdata,
            buttons: ['OK']
        });
        alert.present();
    };
    SchedularPage.prototype.dateUnselectAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: "Cannot create appointment in the past",
            buttons: ['OK']
        });
        alert.present();
    };
    SchedularPage.prototype.createAppointmentRequest = function (start, end, defaultJson) {
        var _this = this;
        //  var sdate = moment(new Date(start)).format("YYYY-MM-DD HH:mm")
        //  var edate = moment(new Date(end)).format("YYYY-MM-DD HH:mm")
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Updating . . ."
        });
        loader.present();
        //SEDNING UPDATE REQUEST
        this.http.post(this.updateAppointmentUrl, {
            userid: this.userJson.UserId,
            resourceid: this.resourceId,
            labid: defaultJson.LabId,
            accountcodeid: defaultJson.LabAccountCodeId,
            projectid: defaultJson.ProjectId,
            sessiontypeid: defaultJson.ProviderSessionMapId,
            starttime: start,
            endtime: end,
            username: this.userJson.FirstName,
            accountcodefrom: defaultJson.AccountCodeFrom,
            specialinst: "",
            apptid: "0",
            user: this.userJson.EmailAddress,
            incharge: "",
            tagids: "0"
        })
            .subscribe(function (data) {
            // modified by Abey Abraham
            _this.notification.getUserDeviceDetails("resource", _this.resourceId, "NAC", "Appointment created by " + _this.userJson.LastName + " " + _this.userJson.FirstName + "  from " + start + " to " + end + " for " + _this.instrumentname + " ", "New Appointment");
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            if (Object(__WEBPACK_IMPORTED_MODULE_8_util__["isNumber"])(resJSON.InsertUpdateAppointmentResult) || !isNaN(resJSON.InsertUpdateAppointmentResult)) {
                var containerEl = __WEBPACK_IMPORTED_MODULE_5_jquery__('#calendar');
                containerEl.fullCalendar('removeEventSource', _this.other);
                __WEBPACK_IMPORTED_MODULE_5_jquery__('#calendar').fullCalendar('unselect');
                _this.GetAppointmentRequest();
            }
            else {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Alert',
                    message: resJSON.InsertUpdateAppointmentResult,
                    buttons: ['OK']
                });
                alert_1.present();
            }
            loader.dismiss();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
        });
    };
    SchedularPage.prototype.GetUserDefaultDetails = function (sdate, edate) {
        var _this = this;
        var startdate = __WEBPACK_IMPORTED_MODULE_4_moment__(new Date(sdate._d)).format("YYYY-MM-DD HH:mm");
        var enddate = __WEBPACK_IMPORTED_MODULE_4_moment__(new Date(edate._d)).format("YYYY-MM-DD HH:mm");
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        //  loader.present();
        this.http.post(this.getUserDefaultDetailsUrl, {
            resourceid: this.resourceId,
            userid: this.userJson.UserId,
            start: startdate,
            end: enddate
        }).subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userDefaultJson = resJSON;
            if (resJSON.Table[0].IsError === true) {
                var alert_2 = _this.alertCtrl.create({
                    title: 'Alert',
                    message: resJSON.Table[0].Message,
                    buttons: ['OK']
                });
                alert_2.present();
                return false;
            }
            else if (resJSON.Table[0].IsOpenPopup === true) {
                _this.storage.set("defaultAppStrDate", sdate);
                _this.storage.set("defaultAppEnDate", edate);
                _this.storage.set('pageSelected', _this.navParams.get('PageSelected'));
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__appointments_appointments__["a" /* AppointmentsPage */], {
                    "StartDate": sdate,
                    "EndDate": edate,
                    "ResourceId": _this.resourceId,
                    "LabId": _this.labId,
                    "page": "schedule",
                    "UserId": _this.userJson.UserId,
                    'ProjectId': _this.projectId,
                    "pageType": "create",
                    "isContactMatch": _this.isContactMatched,
                    "FacilityName": _this.navParams.get('FacilityName')
                }).then(function () {
                    var startIndex = _this.navCtrl.getActive().index - 1;
                    _this.navCtrl.remove(startIndex, 1);
                });
            }
            else if (resJSON.Table[0].IsOpenPopup === false) {
                _this.createAppointmentRequest(startdate, enddate, resJSON.Table1[0]);
            }
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
        });
    };
    SchedularPage.prototype.goBack = function () {
        var _this = this;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__menu_menu__["a" /* MenuPage */], { "page": "NaviPage" }).then(function () {
            var startIndex = _this.navCtrl.getActive().index - 1;
            _this.navCtrl.remove(startIndex, 1);
        });
    };
    SchedularPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\schedular\schedular.html"*/'<!--Created by Anto Rupak-->\n\n\n\n<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.0/fullcalendar.css" />\n\n<script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.0/fullcalendar.js"\n\n  integrity="sha256-qvPuuRTvNHTt0G2JBmvG1jAORbJm5xmxA+6UW/ZSVf8=" crossorigin="anonymous"></script>\n\n<ion-header>\n\n\n\n  <ion-navbar text-center  hideBackButton *ngIf=\'pageRedirction\'>\n\n    <ion-toolbar style="background-color:white">\n\n      <ion-buttons start>\n\n          <button (click)="goBack()" royal>\n\n              <ion-icon name="arrow-round-back" style=\'color: #0096ff\'></ion-icon>\n\n          </button>\n\n      </ion-buttons>\n\n      <ion-title>Scheduler</ion-title>\n\n  </ion-toolbar>\n\n  </ion-navbar>\n\n\n\n  <ion-navbar text-center   *ngIf=\'!pageRedirction\'>\n\n    <ion-title> \n\n      Scheduler\n\n    </ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <p><b>Long press a time slot to schedule.</b></p>\n\n  <div id=\'calendar\' (swipe)="swipeEvent($event)"></div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\schedular\schedular.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_7__providers_notification_notification__["a" /* NotificationProvider */]])
    ], SchedularPage);
    return SchedularPage;
}());

//# sourceMappingURL=schedular.js.map

/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppointmentsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_util__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_util__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__schedular_schedular__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operators__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_notification_notification__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_message_message__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_activitylogs_activitylogs__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_calendar__ = __webpack_require__(472);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var AppointmentsPage = /** @class */ (function () {
    function AppointmentsPage(calendar, logs, navCtrl, navParams, http, storage, loading, notification, alertCtrl, message) {
        this.calendar = calendar;
        this.logs = logs;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.loading = loading;
        this.notification = notification;
        this.alertCtrl = alertCtrl;
        this.message = message;
        this.loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        this.labType = "Account Code";
        this.account_mul_proj_val = [];
    }
    AppointmentsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.getLabUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetLabs';
            _this.getResourceUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetAllUserBasedOnResourceId';
            _this.getAccountUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetAccountCodes';
            _this.getProjectUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetProjects';
            _this.getSessionUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetSessionType';
            _this.getAdminUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetAdmins';
            _this.updateAppointmentUrl = _this.appUrl + '/WS/IdeaElanService.svc/InsertUpdateAppointment';
            _this.getAppointmentUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetAllReservations';
            _this.getUserDeviceDetailsUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetUserDeviceDetails';
            _this.sendPushNotificationUrl = _this.appUrl + '/WS/IdeaElanService.svc/SendPushMessageToTokens';
            _this.getTagsUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetApplicationTags/';
            _this.loginUrl = _this.appUrl + '/WS/IdeaElanService.svc/ValidateLogin';
            if (_this.appUrl.includes('/NMI')) {
                _this.clientType = 'nmi';
            }
            else if (_this.appUrl.includes('/uq')) {
                _this.clientType = 'uq';
            }
            else if (_this.appUrl.includes('/caltech')) {
                _this.clientType = 'caltech';
            }
            _this.storage.set('clientType', _this.clientType);
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.curr_user_Json = val1;
        });
        this.storage.get('clientType').then(function (client) {
            _this.clientType = client;
            if (_this.clientType === 'nmi' || _this.clientType === 'uq') {
                _this.isProjectMand = true;
            }
            if (_this.clientType === 'caltech') {
                if (_this.navParams.get('FacilityName') === 'Biological and Cryo-TEM') {
                    _this.isProjectMand = true;
                }
                else {
                    _this.isProjectMand = false;
                }
            }
        });
        this.storage.get('defaultAppEnDate').then(function (end) {
            _this.defaultEndDate = __WEBPACK_IMPORTED_MODULE_4_moment__(end).toISOString(true);
        });
        this.storage.get('defaultAppStrDate').then(function (str) {
            _this.defaultStrDate = __WEBPACK_IMPORTED_MODULE_4_moment__(str).toISOString(true);
        });
        this.storage.get('roleType').then(function (role) {
            _this.role_Type = role;
            //Client based modification
            _this.isContactMatched = _this.navParams.get('isContactMatch');
            if (_this.role_Type === 'admin' || _this.role_Type === 'super' || _this.role_Type === 'providerAdmin' || _this.isContactMatched) {
                _this.isUserOpenUp = true;
                //  this.admin = true
            }
            else {
                _this.isUserOpenUp = false;
            }
        });
        //To get the Page the either to edit or create.
        this.pageType = this.navParams.get('pageType');
        if (this.pageType == "create") {
            this.pageName = "Create Appointment";
            this.buttonName = "Save";
            this.storage.get('userDetails').then(function (val1) {
                _this.project_Id = val1.DefaultProject;
                if (_this.project_Id <= 0 || _this.project_Id === undefined) {
                    _this.project_Id = 0;
                }
                _this.lab_Id = val1.DefaultGroup;
                if (_this.lab_Id <= 0 || _this.lab_Id === undefined) {
                    _this.lab_Id = 0;
                }
                _this.resetdefaultLab = _this.lab_Id;
                _this.resetdefaultTag = 0;
                _this.tag_Id = [];
            });
        }
        else if (this.pageType == "edit") {
            this.pageName = "Edit Appointment";
            this.buttonName = "Update";
            this.lab_Id = this.navParams.get('LabId');
            if (this.lab_Id <= 0 || this.lab_Id === undefined) {
                this.lab_Id = 0;
            }
            this.resetdefaultLab = this.lab_Id;
            this.tag_Id = this.navParams.get('TagIds');
            if (this.tag_Id == null || this.tag_Id === undefined) {
                this.tag_Id = [];
            }
            else {
                var tagValue = this.tag_Id.toString();
                var tag = tagValue.split(",");
                this.tag_Id = tag;
            }
            this.resetdefaultTag = this.tag_Id;
        }
        else {
        }
        //Navparms to get the values from other pages.
        this.user_Id = this.navParams.get('UserId');
        this.resetUser = this.user_Id;
        this.project_Id = this.navParams.get('ProjectId');
        if (this.project_Id <= 0 || this.project_Id === undefined) {
            this.project_Id = 0;
        }
        this.resetdefaultProject = this.project_Id;
        this.resource_Id = this.navParams.get('ResourceId');
        this.appointment_Id = this.navParams.get('AppointmentId');
        if (this.appointment_Id <= 0 || this.appointment_Id === undefined) {
            this.appointment_Id = 0;
        }
        this.account_Id = this.navParams.get('AccountCode');
        if (this.account_Id <= 0 || this.account_Id === undefined) {
            this.account_Id = 0;
        }
        this.resetdefaultAccount = this.account_Id;
        this.admin_Id = this.navParams.get('AdminUserId');
        if (this.admin_Id == null || this.admin_Id === undefined) {
            this.admin_Id = [];
        }
        else {
            var adminValue = this.admin_Id.toString();
            var admin = adminValue.split(",");
            this.admin_Id = admin;
        }
        this.resetdefaultAdmin = this.admin_Id;
        this.session_Id = this.navParams.get('SessionId');
        if (this.session_Id <= 0 || this.session_Id === undefined) {
            this.session_Id = 0;
        }
        this.resetdefaultSession = this.session_Id;
        this.specialInst = this.navParams.get('SpecialInstruction');
        this.resetSpecialInstruction = this.specialInst;
        this.startTime = __WEBPACK_IMPORTED_MODULE_4_moment__(this.navParams.get("StartDate")).toISOString(true);
        this.resetStartDate = this.startTime;
        this.endTime = __WEBPACK_IMPORTED_MODULE_4_moment__(this.navParams.get("EndDate")).toISOString(true);
        this.resetEndDate = this.endTime;
    };
    AppointmentsPage.prototype.ionViewDidEnter = function () {
        this.getResourceRequest();
        this.GetProjectDetails();
        this.sendLabRequest();
        this.GetTag();
        this.GetSessionDetails();
    };
    AppointmentsPage.prototype.getResourceRequest = function () {
        var _this = this;
        this.http.post(this.getResourceUrl, {
            resourceid: this.resource_Id,
        }).subscribe(function (data) {
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.user_Json = resJSON;
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
        });
    };
    AppointmentsPage.prototype.userOnChangeHandeler = function () {
        this.project_Id = 0;
        this.GetProjectDetails();
    };
    AppointmentsPage.prototype.GetProjectDetails = function () {
        var _this = this;
        this.status_Proj = false;
        var dateTime = __WEBPACK_IMPORTED_MODULE_4_moment__().format("YYYY/MM/DD");
        this.http.post(this.getProjectUrl, {
            userid: this.user_Id,
            resourceid: this.resource_Id,
            usertoken: this.curr_user_Json.UserToken,
            startdate: dateTime,
            loggedinuser: this.curr_user_Json.UserId,
            providerid: 0,
            isreservation: 1
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.project_Json = resJSON;
            if (_this.project_Json[0].hasOwnProperty('Message')) {
                _this.isprojectDisabled = true;
            }
            else {
                _this.isprojectDisabled = false;
            }
            _this.GetSessionDetails();
            _this.projectOnChangeHandeler();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
                _this.project_Json = [];
                _this.status_Proj = true;
            }
        });
    };
    AppointmentsPage.prototype.sendLabRequest = function () {
        var _this = this;
        this.status_Lab = false;
        this.http.post(this.getLabUrl, {
            userid: this.user_Id,
            resourceid: this.resource_Id,
            usertoken: this.curr_user_Json.UserToken,
            projectid: this.project_Id,
            loggedinuser: this.curr_user_Json.UserId
            //providerid: 0
        }).subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.lab_Json = resJSON;
            if (_this.lab_Id > 0) {
                var lab_Id = _this.lab_Json.filter(function (p) { return p.GroupId == _this.lab_Id; });
            }
            if (lab_Id == undefined || JSON.parse(lab_Id.length) <= 0) {
                _this.lab_Id = 0;
            }
            _this.getProjectIdByKey(_this.project_Id, _this.project_Json);
            _this.getAccountValueByKey(_this.lab_Id, _this.lab_Json);
            _this.GetAccountDetails();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            //  loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            _this.lab_Id = 0;
            _this.lab_Json = [];
            if (resErrJSON.status == 400) {
                _this.status_Lab = true;
            }
        });
    };
    AppointmentsPage.prototype.projectOnChangeHandeler = function () {
        var _this = this;
        this.globalLoader();
        this.sendLabRequest();
        if (this.project_Id > 0 && this.clientType == "nmi") {
            var Json_Sel_project = this.project_Json.filter(function (i) { return i.ProjectId == _this.project_Id; });
            this.projectName = Json_Sel_project[0].ProjectName;
            var n = this.projectName.includes("Service");
            if (n && this.session_Json.length > 0) {
                var session_Details = this.session_Json.filter(function (i) { return i.SessionType === "Maintenance"; });
                this.session_Id = session_Details[0].SessionMapId;
            }
        }
    };
    AppointmentsPage.prototype.accountHandling = function () {
        this.globalLoader();
        this.getAccountValueByKey(this.lab_Id, this.lab_Json);
        if (!this.isAccountOpenup) {
            this.GetAccountDetails();
        }
        else {
            this.account_Id = 0;
            return false;
        }
    };
    AppointmentsPage.prototype.globalLoader = function () {
        var loading = this.loading.create({
            spinner: "crescent",
            content: 'Loading ...'
        });
        loading.present();
        setTimeout(function () {
            loading.dismiss();
        }, 2000);
    };
    AppointmentsPage.prototype.GetAccountDetails = function () {
        var _this = this;
        if (this.isAccountOpenup) {
            return false;
        }
        this.status_Account = false;
        if (!this.isAccountOpenup) {
            if (this.lab_Id > 0) {
                var Json_Sel_lab = this.lab_Json.filter(function (i) { return i.GroupId == _this.lab_Id; });
                if (Json_Sel_lab[0].GroupType === "P") {
                    this.labType = "PO Number";
                }
                else {
                    this.labType = "Account Code";
                }
            }
        }
        this.http.post(this.getAccountUrl, {
            userid: this.user_Id,
            resourceid: this.resource_Id,
            labid: this.lab_Id,
            usertoken: this.curr_user_Json.UserToken,
            loggedinuser: this.curr_user_Json.UserId
        }).pipe(Object(__WEBPACK_IMPORTED_MODULE_7_rxjs_operators__["map"])(function (res) {
            return res.filter(function (post) {
                if (_this.project_Id == undefined || _this.project_Id == 0 || _this.projectType == "project") {
                    return post.IsExpired == false && post.IsMembership == false;
                }
                else if (_this.projectType == "membership") {
                    return post;
                    // return post.ProjectId == this.project_Id;
                }
                else if (_this.project_Id > 0) {
                    return post.IsExpired == false && post.IsMembership == false;
                }
                // return post;
            });
        })).subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.account_Json = resJSON;
            if (_this.project_Id > 0 && !_this.isprojectDisabled) {
                _this.account_mul_proj_val = [];
                for (var p = 0; _this.account_Json.length > p; p += 1) {
                    if (_this.account_Json[p].hasOwnProperty('ProjectIds')) {
                        if (_this.account_Json[p].ProjectIds == -1) {
                            _this.account_mul_proj_val.push(_this.account_Json[p]);
                        }
                        else {
                            var acc_map_multiple_acc = _this.account_Json[p].ProjectIds.split(",");
                            for (var i = 0; acc_map_multiple_acc.length > i; i += 1) {
                                if (acc_map_multiple_acc[i] == _this.project_Id) {
                                    _this.account_mul_proj_val.push(_this.account_Json[p]);
                                }
                            }
                        }
                    }
                }
                _this.account_Json = _this.account_mul_proj_val;
            }
            if (_this.account_Id > 0) {
                var acc_Id = _this.account_Json.filter(function (p) { return p.GroupAccountCodeId == _this.account_Id; });
            }
            if (acc_Id == undefined || JSON.parse(acc_Id.length) <= 0) {
                _this.account_Id = 0;
            }
            if (_this.projectType == "membership") {
                // Select the default PO code or Membership code.
                if (_this.account_Json.length > 0) {
                    _this.account_Id = _this.account_Json[0].GroupAccountCodeId;
                }
                //client based modification -- requirements:: "If membership is 'true' then hide Account code"
            }
            if (_this.clientType === 'uq' && _this.projectType == "membership") {
                _this.account_Id = 0;
                _this.isAccountOpenup = true;
                return false;
            }
            else {
                _this.isAccountOpenup = false;
            }
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
                _this.account_Id = 0;
                _this.account_Json = [];
                _this.status_Account = true;
                //     this.GetSessionDetails(id);
            }
        });
    };
    AppointmentsPage.prototype.getAccountValueByKey = function (key, data) {
        // Requirements:: If GroupType=='N' then hide the Account code dropdown.
        if (data.length > 0) {
            for (var i = 0; data.length > i; i += 1) {
                if (data[i].GroupId == key) {
                    if (data[i].GroupType === 'N') {
                        this.isAccountOpenup = true;
                        return false;
                    }
                    else {
                        this.isAccountOpenup = false;
                        return true;
                    }
                }
            }
        }
    };
    AppointmentsPage.prototype.getProjectIdByKey = function (key, data) {
        //Requirements:: To check whether project is based on membership or project.
        if (key == 0 || key == "0") {
            this.projectType = "project";
            this.isAccountOpenup = false;
            return true;
        }
        if (data == undefined) {
            data = "";
        }
        if (data.length > 0 || data != undefined) {
            for (var i = 0; data.length > i; i += 1) {
                if (data[i].ProjectId == key) {
                    if (data[i].hasOwnProperty('IsMembership')) {
                        this.projectType = "membership";
                        this.isAccountOpenup = false;
                        this.membershipValue = data[i].IsMembership;
                    }
                    else {
                        this.projectType = "project";
                    }
                    break;
                }
            }
        }
        else {
            this.projectType = "project";
        }
        //return this.labId = data[0].ProjectId;
    };
    AppointmentsPage.prototype.GetSessionDetails = function () {
        var _this = this;
        this.status_Session = false;
        this.http.post(this.getSessionUrl, {
            userid: this.user_Id,
            resourceid: this.resource_Id,
            labid: this.lab_Id,
            usertoken: this.curr_user_Json.UserToken,
            loggedinuser: this.curr_user_Json.UserId
        }).subscribe(function (data) {
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.session_Json = resJSON;
            if (_this.project_Id > 0 && _this.clientType == "nmi" && _this.pageType == "create") {
                var Json_Sel_project = _this.project_Json.filter(function (i) { return i.ProjectId == _this.project_Id; });
                _this.projectName = Json_Sel_project[0].ProjectName;
                var n = _this.projectName.includes("Service");
                if (n && _this.session_Json.length > 0) {
                    var session_Details = _this.session_Json.filter(function (i) { return i.SessionType === "Maintenance"; });
                    _this.session_Id = session_Details[0].SessionMapId;
                }
            }
            if (_this.pageType == "create" && _this.clientType != "nmi") {
                _this.session_Id = resJSON[0].DefaultProviderSessionMapId;
                for (var i = 0; _this.session_Json.length > i; i += 1) {
                    if (_this.session_Json[i].SessionMapId == _this.session_Id) {
                        _this.session_Id = resJSON[0].DefaultProviderSessionMapId;
                        var sessionvalue = true;
                        return _this.session_Id;
                    }
                    else {
                        sessionvalue = false;
                    }
                }
                if (!sessionvalue) {
                    _this.session_Id = 0;
                }
                //  this.session_Id = sessionvalue
            }
            _this.GetAdminDetails();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
                _this.session_Json = [];
                _this.status_Session = true;
            }
        });
    };
    AppointmentsPage.prototype.GetTag = function () {
        var _this = this;
        this.http.get(this.getTagsUrl + this.resource_Id + ',' + 0)
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.tag_Json = resJSON;
            _this.isTagOpenUp = true;
            if (resJSON[0].IsTagMandatory) {
                _this.isTagMandatory = true;
            }
            else {
                _this.isTagMandatory = false;
            }
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
                _this.isTagOpenUp = false;
                //this.stat = true
            }
        });
    };
    AppointmentsPage.prototype.GetAdminDetails = function () {
        var _this = this;
        //  this.getSessionValuesBySessionId(id)
        if (this.session_Id > 0) {
            var Json_Sel_Proj = this.session_Json.filter(function (i) { return i.SessionMapId == _this.session_Id; });
            if (Json_Sel_Proj.length > 0) {
                if (Json_Sel_Proj[0].hasOwnProperty('showAdminSelection')) {
                    this.isAdminOpenup = Json_Sel_Proj[0].showAdminSelection;
                }
                else {
                    this.isAdminOpenup = false;
                }
            }
            if (this.isAdminOpenup) {
                this.isAdminOpenup = true;
            }
            else {
                this.admin_Id = [];
                this.isAdminOpenup = false;
            }
        }
        this.http.post(this.getAdminUrl, {
            userid: this.curr_user_Json.UserId,
            usertoken: this.curr_user_Json.UserToken,
            resourceid: this.resource_Id
        })
            .subscribe(function (data) {
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.admin_Json = resJSON;
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
        });
    };
    AppointmentsPage.prototype.validationRequest = function () {
        var _this = this;
        if (this.isProjectMand) {
            if (this.project_Id <= 0 || this.project_Id == undefined) {
                this.showAlert("Project is Mandatory.");
                return false;
            }
        }
        if (this.isAccountOpenup) {
            if (this.lab_Id <= 0 || this.session_Id <= 0) {
                this.showAlert("Enter required fields");
                return false;
            }
        }
        else {
            if (this.lab_Id <= 0 || this.session_Id <= 0 || this.account_Id <= 0) {
                this.showAlert("Enter required fields");
                return false;
            }
        }
        if (this.isAdminOpenup) {
            if (this.admin_Id.length <= 0 || this.admin_Id === undefined || this.admin_Id == null || this.admin_Id[0] == "") {
                this.showAlert("Enter Admin details");
                return false;
            }
        }
        if (this.isTagMandatory) {
            if (this.tag_Id == null || this.tag_Id === undefined || this.tag_Id.length <= 0 || this.tag_Id.length == undefined) {
                this.showAlert("Enter Tag details");
                return false;
            }
        }
        if (this.startTime > this.endTime) {
            this.startTime = this.defaultStrDate;
            this.endTime = this.defaultEndDate;
            this.showAlert("Start Date Cannot be after End Date.");
            return false;
        }
        if (this.account_Id > 0) {
            if (this.project_Id <= 0 && !this.isprojectDisabled) {
                var Json_Sel_acc = this.account_Json.filter(function (i) { return i.GroupAccountCodeId == _this.account_Id; });
                if (Json_Sel_acc[0].hasOwnProperty('ProjectIds')) {
                    if (!Json_Sel_acc[0].hasOwnProperty('IsMembership')) {
                        var acc_map_multiple_acc = Json_Sel_acc[0].ProjectIds.split(",");
                        if (acc_map_multiple_acc.length > 1) {
                            this.showAlert(this.labType + " is mapped with multiple project. Select atleast one project.");
                            return false;
                        }
                    }
                }
            }
        }
        this.sendUpdateRequest();
    };
    AppointmentsPage.prototype.sendUpdateRequest = function () {
        var _this = this;
        this.globalLoader();
        if (this.lab_Json.length > 0 || this.lab_Id != null) {
            var Json_Sel_Lab = this.lab_Json.filter(function (i) { return i.GroupId == _this.lab_Id; });
            this.selectedLabJson = Json_Sel_Lab;
            var AccountCodeFrom = Json_Sel_Lab[0].AccountCodeFrom;
        }
        if (this.user_Id > 0) {
            var user_detail = this.user_Json.filter(function (p) { return p.UserId == _this.user_Id; });
        }
        if (this.isTagOpenUp) {
            if (this.tag_Id.length > 0 || this.tag_Id.length != undefined) {
                var tagValue = this.tag_Id.join(",");
            }
        }
        if (this.isAdminOpenup) {
            if (this.admin_Id.length > 0) {
                var adminValue = this.admin_Id.join(",");
            }
        }
        var startdate = __WEBPACK_IMPORTED_MODULE_4_moment__(new Date(this.startTime)).format("YYYY-MM-DD HH:mm:ss");
        var enddate = __WEBPACK_IMPORTED_MODULE_4_moment__(new Date(this.endTime)).format("YYYY-MM-DD HH:mm:ss");
        var apptName = user_detail[0].LastName + " " + user_detail[0].FirstName;
        //SEDNING UPDATE REQUEST
        this.http.post(this.updateAppointmentUrl, {
            userid: user_detail[0].UserId,
            resourceid: this.resource_Id,
            labid: this.lab_Id,
            accountcodeid: this.account_Id,
            projectid: this.project_Id,
            sessiontypeid: this.session_Id,
            starttime: startdate,
            endtime: enddate,
            username: apptName,
            accountcodefrom: AccountCodeFrom,
            specialinst: this.specialInst,
            apptid: this.appointment_Id,
            user: this.curr_user_Json.EmailAddress,
            incharge: adminValue,
            tagids: tagValue
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            if (Object(__WEBPACK_IMPORTED_MODULE_5_util__["isNumber"])(resJSON.InsertUpdateAppointmentResult) || !isNaN(resJSON.InsertUpdateAppointmentResult)) {
                if (_this.pageType == "create") {
                    //  this.saveEvent(this.project_Id,this.lab_Id,this.specialInst,startdate,enddate);
                    var alert_1 = _this.alertCtrl.create({
                        title: 'Success',
                        message: "Appointment created Successfully",
                        buttons: [{
                                text: 'OK',
                                handler: function (data) {
                                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__schedular_schedular__["a" /* SchedularPage */], { 'resourceId': _this.resource_Id, 'labId': _this.lab_Id, 'pageName': 'appointment', 'isContactMatch': _this.isContactMatched, 'FacilityName': _this.navParams.get('FacilityName') })
                                        .then(function () {
                                        var startIndex = _this.navCtrl.getActive().index - 1;
                                        _this.navCtrl.remove(startIndex, 1);
                                    });
                                }
                            }],
                    });
                    alert_1.present();
                    /*modified by ABEY ABRAHAM
                    
                        let i=0;
                                 for(i=0;i<this.session_Json.length;i++)
                                 {
                                   if(this.session_Json[i])
                                 }
                    
                    */
                    var i = 0;
                    for (i = 0; i < _this.session_Json.length; i++) {
                        if (_this.session_Json[i].SessionMapId == _this.session_Id) {
                            _this.session_name = _this.session_Json[i].SessionType;
                            break;
                        }
                    }
                    if (_this.session_name == null) {
                        _this.session_name = _this.session_Id;
                    }
                    if (_this.isAdminOpenup) {
                        _this.logs.insertlog("Appointment   ", "Create Appointment Page", " clicked create apppointment button ", "User clicked create appointment button and admin selection dropdown is also selected , New " + _this.session_name + " appointment created by " + _this.curr_user_Json.LastName + " " + _this.curr_user_Json.FirstName + " from " + startdate + " to " + enddate + " for " + _this.selectedLabJson[0].GroupName + "  ", _this.curr_user_Json.UserId);
                        _this.notification.getUserDeviceDetails("resource", _this.resource_Id, "TRM", "New " + _this.session_name + " appointment created by " + _this.curr_user_Json.LastName + " " + _this.curr_user_Json.FirstName + " from " + startdate + " to " + enddate + " for " + _this.selectedLabJson[0].GroupName, _this.session_name + " appointment notification");
                    }
                    else {
                        _this.logs.insertlog("Appointment   ", "Create Appointment Page", " clicked create apppointment button ", "User clicked create appointment button , New " + _this.session_name + " appointment created by " + _this.curr_user_Json.LastName + " " + _this.curr_user_Json.FirstName + " from " + startdate + " to " + enddate + " for " + _this.selectedLabJson[0].GroupName + "  ", _this.curr_user_Json.UserId);
                        _this.notification.getUserDeviceDetails("resource", _this.resource_Id, "NAC", "New " + _this.session_name + " appointment created by " + _this.curr_user_Json.LastName + " " + _this.curr_user_Json.FirstName + " from " + startdate + " to " + enddate + " for " + _this.selectedLabJson[0].GroupName, _this.session_name + " appointment notification");
                    }
                    //ifadminselection is true
                    // this.notification.getUserDeviceDetails("user", user_detail[0].UserId, "TRM", `New ${this.session_name} appointment created by ${this.curr_user_Json.LastName} ${this.curr_user_Json.FirstName} from ${startdate} to ${enddate} for ${this.selectedLabJson.GroupName}`, `${this.session_name} appointment notification`);
                    //ifadminselection is false
                    // this.notification.getUserDeviceDetails("resource",this.resource_Id, "NAC", `New ${this.session_name} appointment created by ${this.curr_user_Json.LastName} ${this.curr_user_Json.FirstName} from ${startdate} to ${enddate} for ${this.selectedLabJson.GroupName}`, `${this.session_name} appointment notification`);
                }
                else {
                    //edit appointment
                    _this.logs.insertlog("Appointment   ", "Edit Appointment Page", " clicked edit apppointment button ", "User clicked edit appointment button clicked , Appointment from " + startdate + " to " + enddate + " for " + _this.selectedLabJson[0].GroupName + " has been modified", _this.curr_user_Json.UserId);
                    _this.notification.getUserDeviceDetails("resource", _this.resource_Id, "UEA", "Appointment from " + startdate + " to " + enddate + " for " + _this.selectedLabJson[0].GroupName + " has been modified", "Appointment Modified");
                    _this.message.showMessagePop('Alert', 'Appointment Updated Successfully');
                }
                // this.navCtrl.push(MenuPage);
            }
            else {
                _this.showAlert(resJSON.InsertUpdateAppointmentResult);
            }
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
        });
    };
    AppointmentsPage.prototype.startdatetime = function (event) {
        var startDate = (event.month + '/' + event.day + '/' + event.year + " " + event.hour + ':' + event.minute);
        startDate = __WEBPACK_IMPORTED_MODULE_4_moment__(startDate).toISOString(true);
        //    if (this.startTime > this.endTime) {
        //      this.startTime = this.navParams.get('StartDate')
        //      this.showAlert("Start Date Cannot be after End Date.")
        //       return false
        //    } else {
        //      this.GetProjectDetails()
        //    }
        if (!this.isUserOpenUp) {
            var curtime = __WEBPACK_IMPORTED_MODULE_4_moment__().format('YYYY-MM-DD h:m:s A');
            var shour = __WEBPACK_IMPORTED_MODULE_4_moment__(startDate).isAfter(curtime);
            if (!shour) {
                this.startTime = this.defaultStrDate;
                this.showAlert("Appointment cannot be created in the past.");
            }
            else {
                this.GetProjectDetails();
            }
        }
        //this.endDate = moment(this.navParams.get("endDate")).toISOString(true);
    };
    AppointmentsPage.prototype.enddatetime = function (event) {
        var endDate = (event.month + '/' + event.day + '/' + event.year + " " + event.hour + ':' + event.minute);
        var stime = __WEBPACK_IMPORTED_MODULE_4_moment__(this.startTime).toISOString(true);
        var etime = __WEBPACK_IMPORTED_MODULE_4_moment__(this.endTime).toISOString(true);
        if (etime < stime) {
            this.endTime = this.defaultEndDate;
            this.showAlert("Selected date cannot be before to start date.");
        }
        else {
            this.GetProjectDetails();
        }
    };
    AppointmentsPage.prototype.showAlert = function (eventdata) {
        var alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: eventdata,
            buttons: ['Ok']
        });
        alert.present();
    };
    AppointmentsPage.prototype.goBack = function () {
        if (this.pageType == "create") {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__schedular_schedular__["a" /* SchedularPage */], { 'resourceId': this.resource_Id, 'pageName': 'appointment', 'labId': this.lab_Id, 'FacilityName': this.navParams.get('FacilityName') });
        }
        else {
            this.navCtrl.pop();
        }
    };
    AppointmentsPage.prototype.resetPage = function () {
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Signing In"
        });
        loader.present();
        this.user_Id = this.resetUser;
        this.project_Id = this.resetdefaultProject;
        this.lab_Id = this.resetdefaultLab;
        this.account_Id = this.resetdefaultAccount;
        this.session_Id = this.resetdefaultSession;
        this.admin_Id = this.resetdefaultAdmin;
        this.tag_Id = this.resetdefaultTag;
        this.specialInst = this.resetSpecialInstruction;
        this.startTime = this.resetStartDate;
        this.endTime = this.resetEndDate;
        loader.dismiss();
        this.sendRequest();
    };
    AppointmentsPage.prototype.saveEvent = function (title, location, message, startDate, endDate) {
        var _this = this;
        this.calendar.createEvent(title, location, message, new Date(startDate), new Date(endDate)).then(function (msg) {
        }, function (err) {
            _this.message.showMessage('Alert', 'Failed to add to the calendar !');
        });
    };
    AppointmentsPage.prototype.sendRequest = function () {
        var _this = this;
        //SEDNING REQUEST
        this.http.post(this.loginUrl, {
            username: this.curr_user_Json.EmailAddress,
            password: ""
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.curr_user_Json = resJSON;
            _this.lab_Id = _this.curr_user_Json.DefaultGroup;
            _this.project_Id = _this.curr_user_Json.DefaultProject;
            _this.account_Id = _this.curr_user_Json.DefaultAccountCodeId;
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            //  loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
            }
        });
    };
    AppointmentsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-appointments',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\appointments\appointments.html"*/'<!--\n\n  Generated template for the AppointmentsPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar hideBackButton>\n\n    \n\n     <ion-buttons start>\n\n      <button (click)="goBack()" royal>\n\n        <ion-icon name="arrow-round-back" style=\'zoom:1;color: #0096ff\'></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title>{{pageName}}</ion-title>\n\n   <ion-buttons end>\n\n      <div (click)="resetPage()">\n\n        <ion-icon name="refresh" style="zoom:1;color: #0096ff;"></ion-icon>\n\n      </div>\n\n    </ion-buttons>\n\n   \n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div>\n\n    <ion-item>\n\n      <ion-datetime picker [(ngModel)]="startTime" (ionChange)="startdatetime($event)" displayFormat=" MM D YYYY h:mm A"\n\n        minuteValues="0,15,30,45" max="2099" min="1990">\n\n      </ion-datetime>\n\n      <ion-label> <button ion-button id="endbutton">Start Date</button> <span\n\n          style="margin-top:50%;">{{startTime | date: "MM-dd-yyyy h:mm a"}}</span></ion-label>\n\n    </ion-item>\n\n  </div>\n\n  <div>\n\n    <ion-item>\n\n      <ion-datetime picker [(ngModel)]="endTime" (ionChange)="enddatetime($event)" displayFormat="MM D YYYY h:mm A"\n\n        minuteValues="0,15,30,45" max="2099" min="1990"></ion-datetime>\n\n      <ion-label> <button ion-button id="startbutton">End Date</button>\n\n        <span style="margin-top:50%;">{{endTime | date: "MM-dd-yyyy h:mm a"}}</span></ion-label>\n\n    </ion-item>\n\n  </div>\n\n  <ion-item *ngIf=\'isUserOpenUp\'>\n\n    <ion-label>\n\n      User\n\n    </ion-label>\n\n    <ion-select placeholder=\'\' multiple="false" [(ngModel)]="user_Id" (ionChange)="userOnChangeHandeler()">\n\n      <ion-option *ngFor="let user of user_Json" value="{{user.UserId}}">{{user.UserName}}</ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n  <ion-item id="page-select1" *ngIf =\'!isprojectDisabled\'>\n\n    <ion-label>\n\n      Project/Membership <span *ngIf="isProjectMand">*</span>\n\n    </ion-label>\n\n    <ion-select placeholder=\'\' multiple="false" [(ngModel)]="project_Id" (ionChange)="projectOnChangeHandeler()">\n\n      <ion-option *ngIf=\'status_Proj\' value=\'0\' selected>No Records Found</ion-option>\n\n      <ion-option *ngIf=\'!status_Proj\' value=\'0\' selected>Not Applicable</ion-option>\n\n      <ion-option *ngFor="let project of project_Json " value="{{project.ProjectId}}">{{project.ProjectName}}\n\n      </ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n  <ion-item id="page-select2">\n\n    <ion-label>\n\n      Lab*\n\n    </ion-label>\n\n    <ion-select placeholder=\'\' multiple="false" [(ngModel)]="lab_Id" (ionChange)="accountHandling()">\n\n      <ion-option *ngIf=\'status_Lab\' value=\'0\' selected>No Records Found</ion-option>\n\n      <ion-option *ngIf=\'!status_Lab\' value=\'0\' selected>Select Lab</ion-option>\n\n      <ion-option *ngFor="let lab of lab_Json" value="{{lab.GroupId}}">{{lab.GroupName}}</ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n  <ion-item id="page-select3" [hidden]="isAccountOpenup">\n\n    <ion-label>\n\n      {{labType}}*\n\n    </ion-label>\n\n    <ion-select placeholder=\'\' multiple="false" [(ngModel)]="account_Id" (ionChange)="GetSessionDetails()">\n\n      <ion-option *ngIf=\'status_Account\' value="0">No Records Found</ion-option>\n\n      <ion-option *ngIf=\'!status_Account\' value=\'0\' selected>{{labType}}</ion-option>\n\n\n\n      <ion-option *ngFor="let AccCode of account_Json" value="{{AccCode.GroupAccountCodeId}}">{{AccCode.AccountCode}}\n\n      </ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n  <ion-item id="page-select4">\n\n    <ion-label>\n\n      Session*\n\n    </ion-label>\n\n    <ion-select placeholder=\'\' multiple="false" [(ngModel)]="session_Id" (ionChange)="GetAdminDetails()" >\n\n      <ion-option *ngIf=\'status_Session\' value=\'0\' selected>No Records Found</ion-option>\n\n      <ion-option *ngIf=\'!status_Session\' value=\'0\' selected>Select Session</ion-option>\n\n      <ion-option *ngFor="let Session of session_Json" value="{{Session.SessionMapId}}">{{Session.SessionType}}\n\n      </ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n  <ion-item id="page-select7" *ngIf=\'isAdminOpenup\'>\n\n    <ion-label>\n\n      Admin*\n\n    </ion-label>\n\n    <ion-select placeholder=\'Select Admin\' multiple="true" [(ngModel)]="admin_Id" >\n\n      <ion-option *ngFor="let Admin of admin_Json" value="{{Admin.AdminId}}">{{Admin.UserName}}</ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n  <ion-item id="page-select7" [hidden]="!isTagOpenUp">\n\n    <ion-label>\n\n      Tags <span *ngIf="isTagMandatory">*</span>\n\n    </ion-label>\n\n    <ion-select placeholder=\'Select Tags\' multiple="true" [(ngModel)]="tag_Id">\n\n      <ion-option *ngFor="let tags of tag_Json" value="{{tags.TagId}}">{{tags.TagName}}</ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n\n\n  <ion-item id="page-textarea1">\n\n    \n\n    <ion-textarea [(ngModel)]="specialInst" style=" border: 1px solid #000000; margin: 0.1em;" placeholder=\'Special Instruction\'></ion-textarea>\n\n  </ion-item>\n\n  \n\n  <ion-row center>\n\n    <ion-col text-center>\n\n      <button id="page-button3" ion-button color="positive" (click)=\'validationRequest()\'>\n\n        {{this.buttonName}}\n\n      </button>\n\n    </ion-col>\n\n  </ion-row>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\appointments\appointments.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_11__ionic_native_calendar__["a" /* Calendar */], __WEBPACK_IMPORTED_MODULE_10__providers_activitylogs_activitylogs__["a" /* ActivitylogsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_8__providers_notification_notification__["a" /* NotificationProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_9__providers_message_message__["a" /* MessageProvider */]])
    ], AppointmentsPage);
    return AppointmentsPage;
}());

//# sourceMappingURL=appointments.js.map

/***/ }),

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SampledetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_aws_sdk_dist_aws_sdk__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_aws_sdk_dist_aws_sdk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_aws_sdk_dist_aws_sdk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_easytimer_js__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_easytimer_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_easytimer_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jquery__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_media__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_message_message__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_android_permissions__ = __webpack_require__(201);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};













var timer = new __WEBPACK_IMPORTED_MODULE_6_easytimer_js___default.a();
var timerRecording = new __WEBPACK_IMPORTED_MODULE_6_easytimer_js___default.a();
var AWS = window.AWS;
var SampledetailPage = /** @class */ (function () {
    function SampledetailPage(permission, media, file, platform, message, navCtrl, navParams, loading, http, storage) {
        this.permission = permission;
        this.media = media;
        this.file = file;
        this.platform = platform;
        this.message = message;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loading = loading;
        this.http = http;
        this.storage = storage;
        this.recording = false;
        this.audioList = [];
        this.timerValue = '00:00:00';
        this.userType = true;
        this.droppedButton = true;
    }
    SampledetailPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.sampleDroppedUrl = _this.appUrl + '/WS/IdeaElanService.svc/UpdateWorkOrdersSamplesDropped';
            _this.sampleMilestoneUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetSampleSubmissionMilestoneDetails';
            _this.sampleMilestoneUpdateUrl = _this.appUrl + '/WS/IdeaElanService.svc/InsertUpdateMilestoneDetails';
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
        });
        this.sampleJson = this.navParams.get("sampleJson");
        if (this.sampleJson.Region == "Sample Submission" || this.sampleJson.Region == "W") {
            this.r_type = "Sample Submission Id";
        }
        else if (this.sampleJson.Region == "Service Request" || this.sampleJson.Region == "SR") {
            this.r_type = "Service Request Id";
        }
        this.accountType = this.sampleJson.GroupType;
        if (this.accountType != undefined) {
            if (this.accountType.trim().toLowerCase().includes('p')) {
                this.accountType = 'PO Number';
            }
            else {
                this.accountType = 'Account Code';
            }
        }
        else {
            this.accountType = 'Account Code';
        }
        this.showValue = this.navParams.get("showValue");
        this.storage.get('roleType').then(function (val) {
            if (val == "user" || val == "labAdmin") {
                _this.userType = true;
                if (_this.sampleJson.SamplesDropped == undefined) {
                    _this.droppedButton = false;
                }
                else if (_this.sampleJson.SamplesDropped == true) {
                    _this.droppedButton = true;
                }
            }
            else if (val == "super" || val == "admin" || val == "providerAdmin") {
                if (_this.showValue == "false") {
                    _this.userType = true;
                    _this.droppedButton = true;
                }
                else {
                    _this.droppedButton = true;
                    _this.buttonToogle = true;
                    _this.userType = false;
                    _this.showTimer = true;
                }
            }
            else {
            }
        });
        this.s_id = this.sampleJson.RollNumber;
        this.s_tname = this.sampleJson.TemplateName;
        this.s_lab = this.sampleJson.LabName;
        if (!this.sampleJson.hasOwnProperty('ProjectName') || this.sampleJson.ProjectName == "" || this.sampleJson.ProjectName == null) {
            this.projectExist = true;
        }
        else {
            this.p_name = this.sampleJson.ProjectName;
        }
        this.startTime = __WEBPACK_IMPORTED_MODULE_5_moment__().format("MM/DD/YYYY hh:mm:ss A");
        this.s_user = this.sampleJson.UserFullName;
        this.s_account = this.sampleJson.AccountCode;
    };
    SampledetailPage.prototype.permissionConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.platform.is('android')) return [3 /*break*/, 3];
                        this.permission.requestPermissions([this.permission.PERMISSION.RECORD_AUDIO, this.permission.PERMISSION.WRITE_EXTERNAL_STORAGE]);
                        return [4 /*yield*/, this.permission.checkPermission(this.permission.PERMISSION.RECORD_AUDIO).then(function (result) {
                                if (result.hasPermission) {
                                    _this.audioPermission = true;
                                }
                                else {
                                    _this.audioPermission = false;
                                }
                            }, function (err) {
                                _this.permission.requestPermission(_this.permission.PERMISSION.RECORD_AUDIO);
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.permission.checkPermission(this.permission.PERMISSION.WRITE_EXTERNAL_STORAGE).then(function (result) {
                                if (result.hasPermission) {
                                    _this.storagePermission = true;
                                }
                                else {
                                    _this.storagePermission = false;
                                }
                            }, function (err) {
                                return _this.permission.requestPermission(_this.permission.PERMISSION.WRITE_EXTERNAL_STORAGE);
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SampledetailPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        if (this.platform.is('android')) {
            this.permissionConfig();
        }
        this.disa = false;
        this.awsLocation = 'error';
        this.storage.get('roleType').then(function (val) {
            if (val == "user" || val == "labAdmin") {
            }
            else if ((val == "super" || val == "admin" || val == "providerAdmin") && _this.showValue == "true") {
                _this.mileStoneDetail();
                _this.optionSelected = false;
            }
            else {
            }
        });
        AWS.config.accessKeyId = 'AKIAJJKRPJ22Z6FG5CXA';
        AWS.config.secretAccessKey = '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';
        this.bucket = new AWS.S3({
            accessKeyId: 'AKIAJJKRPJ22Z6FG5CXA',
            secretAccessKey: 'LcfuPOhW0MjHU4tOGgRgwNGydFLDRWNtw4eVROi5',
        });
    };
    SampledetailPage.prototype.recordButton = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.permissionConfig()];
                    case 1:
                        _a.sent();
                        if (this.platform.is('ios')) {
                            this.startRecord();
                        }
                        else if (this.platform.is('android')) {
                            if (this.storagePermission && this.audioPermission) {
                                this.startRecord();
                            }
                            else {
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SampledetailPage.prototype.startButtonRequest = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.optionSelected == true) {
                    this.startTimer();
                }
                else {
                    this.message.showMessage('Message', 'Please Select the Milestone');
                }
                return [2 /*return*/];
            });
        });
    };
    SampledetailPage.prototype.startTimer = function () {
        timer.start();
        this.buttonToogle = false;
        this.disa = true;
        __WEBPACK_IMPORTED_MODULE_7_jquery__('#chronoExample .stopButton').click(function (e) {
        });
        timer.addEventListener('secondsUpdated', function () {
            __WEBPACK_IMPORTED_MODULE_7_jquery__('#chronoExample .timer').html(timer.getTimeValues().toString());
        });
        timer.addEventListener('started', function () {
            __WEBPACK_IMPORTED_MODULE_7_jquery__('#chronoExample .timer').html(timer.getTimeValues().toString());
        });
        timer.addEventListener('reset', function () {
            __WEBPACK_IMPORTED_MODULE_7_jquery__('#chronoExample .timer').html(timer.getTimeValues().toString());
        });
    };
    SampledetailPage.prototype.startReccordingTimer = function () {
        timerRecording.reset();
        timerRecording.start();
        __WEBPACK_IMPORTED_MODULE_7_jquery__('#chronoExample1 .stopButton').click(function (e) {
        });
        timerRecording.addEventListener('secondsUpdated', function () {
            __WEBPACK_IMPORTED_MODULE_7_jquery__('#chronoExample1 .timer1').html(timerRecording.getTimeValues().toString());
        });
        timerRecording.addEventListener('started', function () {
            __WEBPACK_IMPORTED_MODULE_7_jquery__('#chronoExample1 .timer1').html(timerRecording.getTimeValues().toString());
        });
        timerRecording.addEventListener('reset', function () {
            __WEBPACK_IMPORTED_MODULE_7_jquery__('#chronoExample1 .timer1').html(timerRecording.getTimeValues().toString());
        });
    };
    SampledetailPage.prototype.endTimer = function () {
        var _this = this;
        this.alertButton = [
            {
                text: 'Yes',
                handler: function () {
                    if (_this.recording == false && _this.awsLocation == 'error') {
                        timer.stop();
                        _this.mileStoneUpdate('');
                    }
                    else if (_this.recording == false && _this.awsLocation != 'error') {
                        timer.stop();
                        _this.mileStoneUpdate(_this.awsLocation);
                    }
                }
            },
            {
                text: 'No',
                handler: function () {
                }
            }
        ];
        if (this.recording == true) {
            this.message.showMessage('Alert', 'Stop recording first');
        }
        else {
            this.message.showMessageButton('Sample Submission', 'Are you sure you want to Stop & End ?', this.alertButton);
        }
    };
    SampledetailPage.prototype.endRecordingTimer = function () {
        timerRecording.stop();
    };
    SampledetailPage.prototype.sampleDropped = function () {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        this.http.post(this.sampleDroppedUrl, {
            woid: this.sampleJson.WorkOrderId,
            user: this.userJson.EmailAddress
        })
            .subscribe(function (data) {
            //RESPONSE
            //   this.sampleStatus=true;
            loader.dismiss();
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.navCtrl.pop();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            //  this.sampleStatus=false;
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
        });
    };
    SampledetailPage.prototype.mileStoneDetail = function () {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        this.http.post(this.sampleMilestoneUrl, {
            woid: this.sampleJson.WorkOrderId,
            usertoken: this.userJson.UserToken,
            loggedinuser: this.userJson.UserId
        })
            .subscribe(function (data) {
            loader.dismiss();
            _this.showTimer = true;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.milestoneJson = resJSON;
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
                _this.showTimer = false;
            }
        });
    };
    SampledetailPage.prototype.mileStoneUpdate = function (awsPath) {
        var _this = this;
        this.endTime = __WEBPACK_IMPORTED_MODULE_5_moment__().format("MM-DD-YY hh:mm:ss A");
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        this.http.post(this.sampleMilestoneUpdateUrl, {
            woid: this.sampleJson.WorkOrderId,
            usertoken: this.userJson.UserToken,
            loggedinuser: this.userJson.UserId,
            statusdescid: this.milestonesData,
            desc: this.description,
            user: this.userJson.EmailAddress,
            start: this.startTime,
            end: this.endTime,
            filepath: awsPath
        })
            .subscribe(function (data) {
            loader.dismiss();
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.message.showMessagePop('Message', 'Milestone Updated Successfully');
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
        });
    };
    SampledetailPage.prototype.startRecord = function () {
        var _this = this;
        if (this.platform.is('ios')) {
            this.fileName = 'record' + new Date().getDate() + new Date().getMonth() +
                new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.m4a';
            /* this.filePath = this.file.documentsDirectory+ this.fileName;
           console.log("filepath write",this.file.documentsDirectory);
           this.audio = this.media.create(this.filePath);*/
            this.file.createFile(this.file.tempDirectory, this.fileName, true).then(function () {
                _this.audio = _this.media.create(_this.file.tempDirectory.replace(/^file:\/\//, '') + _this.fileName);
                _this.audio.startRecord();
            });
        }
        else if (this.platform.is('android')) {
            this.fileName = 'record' + new Date().getDate() +
                new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.m4a';
            this.filePath = this.file.externalRootDirectory.replace(/file:\/\//g, '') + 'Download/' + this.fileName;
            this.audio = this.media.create(this.filePath);
            this.audio.startRecord();
        }
        this.recording = true;
        this.startReccordingTimer();
    };
    SampledetailPage.prototype.stopRecord = function () {
        return __awaiter(this, void 0, void 0, function () {
            var path;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.endRecordingTimer();
                        this.audio.stopRecord();
                        if (!this.platform.is('ios')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.file.readAsArrayBuffer(this.file.tempDirectory, this.fileName).then(function (audio) {
                                _this.sendAudioRequest(audio);
                            }).catch(function (err) {
                                console.log(err);
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!this.platform.is('android')) return [3 /*break*/, 4];
                        path = this.file.externalRootDirectory + 'Download/';
                        return [4 /*yield*/, this.file.readAsArrayBuffer(path, this.fileName).then(function (audio) {
                                _this.sendAudioRequest(audio);
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SampledetailPage.prototype.sendAudioRequest = function (fileInput) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        var file = fileInput;
        var params = {
            Bucket: 'ieinfinity-uploads',
            Key: 'appaudio/' + this.fileName,
            Body: file,
            ACL: 'public-read',
            ContentType: 'audio/m4a'
        };
        var options = { partSize: 10 * 1024 * 1024, queueSize: 1 };
        this.bucket.upload(params, options).on('httpUploadProgress', function (evt) {
        }).send(function (err, data) {
            if (err) {
                loader.dismiss();
                _this.awsLocation = 'error';
                //  this.message.showMessage('Alert','Check your internet connection');
                _this.recording = false;
                return false;
            }
            var awsResponse = JSON.parse(JSON.stringify(data));
            loader.dismiss();
            _this.awsLocation = awsResponse.Location;
            _this.recording = false;
            return true;
        });
    };
    SampledetailPage.prototype.updateChange = function () {
        this.milestonesData;
        this.optionSelected = true;
    };
    SampledetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'page-sampledetail',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\sampledetail\sampledetail.html"*/'\n\n<ion-header>\n\n  <ion-navbar  hideBackButton="{{disa}}">\n\n    <ion-title>Sample Submission</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n  <ion-row><ion-col col-5><b>{{r_type}}</b></ion-col><ion-col col-6>{{s_id}}</ion-col></ion-row><hr>\n\n  <ion-row><ion-col col-5><b>{{accountType}}</b></ion-col><ion-col col-6>{{s_account}}</ion-col></ion-row><hr>\n\n  <ion-row><ion-col col-5><b>User</b></ion-col><ion-col col-6>{{s_user}}</ion-col></ion-row><hr>\n\n  <ion-row><ion-col col-5><b>Template Name</b></ion-col><ion-col col-6>{{s_tname}}</ion-col></ion-row><hr>\n\n  <ion-row><ion-col col-5><b>Lab Name</b></ion-col><ion-col col-6>{{s_lab}}</ion-col></ion-row><hr>\n\n  <ion-row [class.hide]="projectExist"><ion-col col-5><b>Project Name</b></ion-col><ion-col col-6>{{p_name}}</ion-col></ion-row><hr>\n\n  <div [class.hide]="userType">\n\n    <ion-row ><ion-col col-5><b>Start Time </b></ion-col><ion-col col-6>{{startTime}}</ion-col></ion-row><hr>\n\n    <ion-row style="align-items: center"><ion-col col-5><b>Milestone </b></ion-col>\n\n      <ion-col col-6>\n\n        <ion-select [(ngModel)]="milestonesData" placeholder=\'Select Milestone\' multiple="false" (ionChange)="updateChange()" disabled="{{disa}}" >\n\n        <ion-option *ngFor="let milestone of milestoneJson" value="{{milestone.ConditionId}}" >{{milestone.ConditionDescription}}</ion-option>\n\n           </ion-select>\n\n      </ion-col></ion-row><hr>\n\n      \n\n  <b >Comments</b>\n\n  <ion-row ><ion-col><ion-textarea [(ngModel)]="description"></ion-textarea></ion-col></ion-row><hr>  \n\n  </div>\n\n <div text-center><button ion-button (click)=\'sampleDropped()\'  [class.hide]="droppedButton" >Sample Dropped</button></div>\n\n\n\n <ion-row [class.hide]="!showTimer"><ion-col col-3>  \n\n   <button [class.hide]="recording" ion-button icon-only (click)=\'recordButton()\'>\n\n    <ion-icon name="mic"></ion-icon>\n\n  </button> \n\n  <button [class.hide]="!recording" ion-button icon-only style="background-color: red;" (click)=\'stopRecord()\'>\n\n      <ion-icon name="mic"></ion-icon>\n\n    </button>   <div id="chronoExample1">\n\n      <div class="timer1">{{timerValue}}</div>\n\n    </div> </ion-col>\n\n    <ion-col col-9>\n\n    <div>\n\n        <div id="chronoExample">\n\n          <div class="timer">00:00:00</div>\n\n        </div>\n\n        <button [class.hide]="!buttonToogle" ion-button style="background-color: green;" block class="startButton" (click)=\'startButtonRequest()\'>\n\n          Start\n\n        </button>\n\n        <button [class.hide]="buttonToogle" [disabled]="recording" ion-button style="background-color: red;" block class="stopButton" (click)=\'endTimer()\'>\n\n          Stop & End\n\n        </button>\n\n      </div>\n\n      \n\n </ion-col></ion-row>\n\n \n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\sampledetail\sampledetail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_11__ionic_native_android_permissions__["a" /* AndroidPermissions */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_media__["a" /* Media */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_10__providers_message_message__["a" /* MessageProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], SampledetailPage);
    return SampledetailPage;
}());

//# sourceMappingURL=sampledetail.js.map

/***/ }),

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InstrumentSearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__signin_signin__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_device__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__menu_menu__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__schedular_schedular__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_sign_in_modal_sign_in_modal__ = __webpack_require__(234);
//Created by Anto Rupak
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};














//Created by Anto Rupak
/**
 * Generated class for the InstrumentSearchPage page Anto Rupak.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var InstrumentSearchPage = /** @class */ (function () {
    function InstrumentSearchPage(navCtrl, toastCtrl, navParams, storage, http, loading, alertCtrl, device, actionctrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.http = http;
        this.loading = loading;
        this.alertCtrl = alertCtrl;
        this.device = device;
        this.actionctrl = actionctrl;
        this.modalCtrl = modalCtrl;
        this.result = [];
        this.loginSucsses = false;
    }
    InstrumentSearchPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.searchResultsUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetSearchResults';
            _this.fullUrl = _this.appUrl + '/WS/IdeaElanService.svc/ValidateLogin';
            _this.getDetails = _this.appUrl + '/WS/IdeaElanService.svc/GetUserDetails';
            _this.registerDevice = _this.appUrl + '/WS/IdeaElanService.svc/RegisterDevice';
            _this.notificationUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetMobileAppNotifications';
            _this.getFacilitiesAccessUrl = _this.appUrl + '/WS/IdeaElanService.svc/InsertFacilityAccessRequest';
            _this.getInstrumentAccessUrl = _this.appUrl + '/WS/IdeaElanService.svc/InsertResourcePermission';
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
        });
        this.deviceModel = this.device.model;
        this.devicePlatform = this.device.platform;
        this.deviceSerial = this.device.serial;
        this.deviceId = this.device.uuid;
        this.deviceVersion = this.device.version;
    };
    InstrumentSearchPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
        });
        if (this.userJson != null) {
            this.searchText = this.navParams.get('searchval');
            this.loginSucsses = true;
            this.getSearchResults();
        }
    };
    InstrumentSearchPage.prototype.getSearchResults = function () {
        var _this = this;
        if (this.userJson != null) {
            this.userId = this.userJson.UserId;
        }
        if (this.searchText == null || this.searchText == "") {
            this.searchResultsJson = [];
            this.searchstatus = false;
            return false;
        }
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Updating . . ."
        });
        loader.present();
        this.http.post(this.searchResultsUrl, {
            searchtext: this.searchText,
            userid: this.userId
        })
            .subscribe(function (data) {
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.searchstatus = false;
            _this.searchResultsJson = resJSON;
            loader.dismiss();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
                _this.searchResultsJson = [];
                _this.searchstatus = true;
            }
        });
    };
    InstrumentSearchPage.prototype.openModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: __WEBPACK_IMPORTED_MODULE_8__pages_sign_in_modal_sign_in_modal__["a" /* SignInModalPage */],
                            componentProps: {
                                "paramID": 123,
                                "paramTitle": "Test Title"
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss(function (dataReturned) {
                            if (dataReturned !== null) {
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InstrumentSearchPage.prototype.userLogin1 = function (resourceId) {
        return __awaiter(this, void 0, void 0, function () {
            var modalPage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__pages_sign_in_modal_sign_in_modal__["a" /* SignInModalPage */], {
                            searchval: "" + this.searchText
                        })];
                    case 1:
                        modalPage = _a.sent();
                        modalPage.present();
                        modalPage.onDidDismiss(function (data) {
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    InstrumentSearchPage.prototype.userLogin = function (resourceId) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Login',
            inputs: [
                {
                    name: 'title',
                    placeholder: 'UserName',
                    type: 'email',
                },
                {
                    name: 'password',
                    placeholder: 'Password',
                    type: 'password'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                    }
                },
                {
                    text: 'Login',
                    handler: function (data) {
                        var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                        var email = regexp.test(data.title);
                        if (email && data.title !== "" && data.password !== "") {
                            _this.sendRequest(data.title, data.password, resourceId);
                        }
                        else {
                            if (!email) {
                                _this.failedAlert("Enter Valid Email", resourceId);
                                return true;
                            }
                            else {
                                _this.failedAlert('Enter Valid User Details.', resourceId);
                                return true;
                            }
                        }
                    }
                }
            ]
        });
        prompt.present();
    };
    InstrumentSearchPage.prototype.failedAlert = function (text, resourceId) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: text,
            buttons: [{
                    text: 'Ok',
                    handler: function () {
                        _this.userLogin(resourceId);
                    }
                }]
        });
        alert.present();
    };
    InstrumentSearchPage.prototype.sendRequest = function (m_username, m_password, resourceId) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Signing In"
        });
        // loader.present();
        //SEDNING REQUEST
        this.http.post(this.fullUrl, {
            username: m_username,
            password: m_password
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.roleType = resJSON.UserRole;
            _this.storage.set('devicetoken', _this.tok);
            _this.userId = resJSON.UserId;
            _this.userToken = resJSON.UserToken;
            _this.storage.set('userRole', resJSON.UserRole);
            if (_this.roleType.includes("Super Admin")) {
                _this.storage.set('roleType', "super");
            }
            else if (_this.roleType.includes("Insitution Admin")) {
                _this.storage.set('roleType', "admin");
            }
            else if (_this.roleType.includes("Group Admin")) {
                _this.storage.set('roleType', "super");
            }
            else if (_this.roleType.includes("Provider Admin")) {
                _this.storage.set('roleType', "admin");
            }
            else if (resJSON.UserRole.includes("User")) {
                _this.storage.set('roleType', "user");
            }
            var externalUser = resJSON.UserRole.includes("External User");
            _this.storage.set('userType', externalUser);
            loader.present().then(function () {
                return _this.sendRegisterDeviceRequest(m_username, resourceId);
            }).then(function () {
                return _this.sendDetailsRequest(m_username, resourceId);
            }).then(function () { loader.dismiss(); });
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
                _this.alert(resErrJSON.statusText);
            }
        });
    };
    //TOAST METHOD
    InstrumentSearchPage.prototype.alert = function (toastStr) {
        var toast = this.alertCtrl.create({
            title: 'Alert',
            message: toastStr,
            buttons: ['OK']
        });
        toast.present();
    };
    //GET USER DETAILS METHOD
    InstrumentSearchPage.prototype.sendDetailsRequest = function (userName, resourceId) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Getting User Details"
        });
        // loader.present();
        //SEDNING REQUEST
        this.http.post(this.getDetails, {
            email: userName
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userDetailsJson = resJSON;
            _this.loginSucsses = true;
            _this.storage.set('userDetails', _this.userDetailsJson);
            // loader.dismiss();
            _this.storage.get('userDetails').then(function (val1) {
                _this.userJson = val1;
                //  this.userJson.UserId = this.userId;
            });
            _this.searchResultsJson = null;
            _this.getSearchResults();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
        });
    };
    //REGISTER DEVICE METHOD
    InstrumentSearchPage.prototype.sendRegisterDeviceRequest = function (userName, resourceId) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Registering Device"
        });
        // loader.present();
        //SEDNING REQUEST
        this.http.post(this.registerDevice, {
            userid: userName,
            deviceid: this.deviceId,
            devicetoken: this.deviceVersion,
            devicename: this.devicePlatform,
            devicemodel: this.deviceModel,
            deviceversion: this.deviceVersion,
            usertoken: this.userToken
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.storage.set('userDeviceResponse', resJSON.RegisterDeviceResult);
            // loader.dismiss();
            _this.sendDetailsRequest(userName, resourceId);
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
        });
    };
    InstrumentSearchPage.prototype.actionSheetMethod = function (actionJson) {
        var _this = this;
        var status;
        if (actionJson.FacilityStatus === "Approved" && actionJson.ResourceStatus === "Approved") {
            //MakeReservation
            status = 1;
        }
        else if (actionJson.FacilityStatus === "Request Access" && actionJson.ResourceStatus === "Request Access") {
            //send request for both
            status = 2;
        }
        else if (actionJson.FacilityStatus === "Waiting for approval" && actionJson.ResourceStatus === "Waiting for approval") {
            //go to infinity
            status = 3;
        }
        else if (actionJson.FacilityStatus === "Approved" || actionJson.FacilityStatus === "Waiting for approval" && actionJson.ResourceStatus === "Request Access" || actionJson.ResourceStatus === "Approved") {
            //show Instrument request && Go to Infinity
            status = 4;
        }
        else if (actionJson.FacilityStatus === "Request Access" && actionJson.ResourceStatus === "Approved" || actionJson.ResourceStatus === "Pending") {
            //show Facility request && Go to Infinity
            status = 5;
        }
        else if (actionJson.FacilityStatus === "Rejected" && actionJson.ResourceStatus === "Request Access") {
            //Go to Infinity
            status = 6;
        }
        else if (actionJson.FacilityStatus === "Request Access" && actionJson.ResourceStatus === "Rejected") {
            //Go to Infinity
            status = 7;
        }
        switch (status) {
            case 1:
                {
                    var actionSheet = this.actionctrl.create({
                        title: 'Select Options',
                        buttons: [
                            {
                                text: "Make Reservation",
                                role: 'destructive',
                                handler: function () {
                                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__schedular_schedular__["a" /* SchedularPage */], { 'resourceId': actionJson.TemplateId, 'pageName': 'Instument', 'FacilityName': actionJson.ProviderName });
                                }
                            },
                        ]
                    });
                    actionSheet.present();
                }
                break;
            case 2:
                {
                    var actionSheet = this.actionctrl.create({
                        title: 'Select Options',
                        buttons: [
                            {
                                text: "Request facility Access",
                                role: 'destructive',
                                handler: function () {
                                    // this.navCtrl.push(MenuPage,{'resourceId':actionJson.TemplateId, 'isInstrumentSearch': 1});
                                    _this.updateFacilityRequest(actionJson.ProviderId);
                                }
                            },
                            {
                                text: "Request Instrument Access",
                                role: 'destructive',
                                handler: function () {
                                    _this.updateInstrumentAccessRequest(actionJson);
                                }
                            },
                            {
                                text: "Go to Infinity",
                                role: 'destructive',
                                handler: function () {
                                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__menu_menu__["a" /* MenuPage */], { "page": "NaviPage" });
                                }
                            },
                        ]
                    });
                    actionSheet.present();
                }
                break;
            case 3:
                {
                    var actionSheet = this.actionctrl.create({
                        title: 'Select Options',
                        buttons: [
                            {
                                text: "Go to Infinity",
                                role: 'destructive',
                                handler: function () {
                                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__menu_menu__["a" /* MenuPage */], { "page": "NaviPage" });
                                }
                            },
                        ]
                    });
                    actionSheet.present();
                }
                break;
            case 4:
                {
                    var actionSheet = this.actionctrl.create({
                        title: 'Select Options',
                        buttons: [
                            {
                                text: "Request Instrument Access",
                                role: 'destructive',
                                handler: function () {
                                    _this.updateInstrumentAccessRequest(actionJson);
                                }
                            },
                            {
                                text: "Go to Infinity ",
                                role: 'destructive',
                                handler: function () {
                                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__menu_menu__["a" /* MenuPage */], { "page": "NaviPage" });
                                }
                            },
                        ]
                    });
                    actionSheet.present();
                }
                break;
            case 5:
                {
                    var actionSheet = this.actionctrl.create({
                        title: 'Select Options',
                        buttons: [
                            {
                                text: "Request Instrument Access",
                                role: 'destructive',
                                handler: function () {
                                    _this.updateInstrumentAccessRequest(actionJson);
                                }
                            },
                            {
                                text: "Go to Infinity ",
                                role: 'destructive',
                                handler: function () {
                                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__menu_menu__["a" /* MenuPage */], { "page": "NaviPage" });
                                }
                            },
                        ]
                    });
                    actionSheet.present();
                }
                break;
            case 6:
                {
                    var actionSheet = this.actionctrl.create({
                        title: 'Select Options',
                        buttons: [
                            {
                                text: "Go to Infinity ",
                                role: 'destructive',
                                handler: function () {
                                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__menu_menu__["a" /* MenuPage */], { "page": "NaviPage" });
                                }
                            },
                        ]
                    });
                    actionSheet.present();
                }
                break;
            case 7:
                {
                    var actionSheet = this.actionctrl.create({
                        title: 'Select Options',
                        buttons: [
                            {
                                text: "Go to Infinity ",
                                role: 'destructive',
                                handler: function () {
                                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__menu_menu__["a" /* MenuPage */], { "page": "NaviPage" });
                                }
                            },
                        ]
                    });
                    actionSheet.present();
                }
                break;
        }
    };
    InstrumentSearchPage.prototype.getFacilityDescription = function (description) {
        var myModal = this.modalCtrl.create('DecriptionModalPage', { description: description });
        myModal.present();
    };
    InstrumentSearchPage.prototype.signup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__signin_signin__["a" /* SigninPage */]);
    };
    InstrumentSearchPage.prototype.updateFacilityRequest = function (FacilityId) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        this.http.post(this.getFacilitiesAccessUrl, {
            userid: this.userJson.UserId,
            facilityid: FacilityId,
            user: 'admin',
            isactive: "-1"
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.FacilityUpdateJson = resJSON;
            //this.getUserDeviceDetails(labId);
            _this.getSearchResults();
            loader.dismiss();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
        });
    };
    InstrumentSearchPage.prototype.updateInstrumentAccessRequest = function (actionJson) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        this.http.post(this.getInstrumentAccessUrl, {
            permissionid: "0",
            facilityid: actionJson.ProviderId,
            userid: actionJson.UserId,
            resourceid: actionJson.TemplateId,
            user: actionJson.EmailAddress,
            isapproved: "2"
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.FacilityUpdateJson = resJSON;
            //this.getUserDeviceDetails(labId);
            _this.searchResultsJson = [];
            _this.getSearchResults();
            loader.dismiss();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
        });
    };
    InstrumentSearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-instrument-search',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\instrument-search\instrument-search.html"*/'<!--Created by Anto Rupak-->\n\n<!--\n\n  Generated template for the InstrumentSearchPage page by Anto Rupak.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n\n\n\n\n\n\n<ion-content>\n\n  <img src="assets/imgs/splash.png" class="imageTitle">\n\n  <ion-searchbar [(ngModel)]="searchText" debounce=450 (ionInput)="getSearchResults()"></ion-searchbar>\n\n  <!--<ion-row center>\n\n    <ion-col text-center>\n\n      <button ion-button (click)=\'getSearchResults()\'>Search</button>\n\n    </ion-col>\n\n  </ion-row>-->\n\n  <ion-row center>\n\n    <ion-col text-center>\n\n\n\n      <span style="text-decoration:underline; color:#1976D2" (click)=\'signup()\' *ngIf=\'!loginSucsses\'> Back to\n\n        Login</span><br />\n\n\n\n    </ion-col>\n\n  </ion-row>\n\n  <div *ngIf=\'searchstatus\' style="text-align: center"><b>No Results Found</b> </div>\n\n  <ion-card *ngFor="let results of searchResultsJson" style="border: 1px solid;">\n\n    <ion-row>\n\n      <ion-col col-4>\n\n        <ion-row row-3>\n\n          <img src="{{results.Image}}" class="cardImage" alt="No Image">\n\n        </ion-row>\n\n      </ion-col>\n\n      <ion-col col-6>\n\n        <h2><b>{{results.TemplateName}}</b></h2>\n\n        <span class="cardcontents">{{results.ProviderName}}</span>\n\n        <div *ngIf=\'loginSucsses\'>\n\n          <span class="cardcontents">Facility Access: {{results.FacilityStatus}}</span><br/>\n\n          <span class="cardcontents">Instrument Access: {{results.ResourceStatus}}</span>\n\n        </div>\n\n\n\n      </ion-col>\n\n    </ion-row>\n\n    <div class="title">\n\n      <span class="b2">\n\n        <button ion-button *ngIf=\'!loginSucsses\' (click)="userLogin1(results.TemplateId)">Login</button>\n\n        <button ion-button *ngIf=\'loginSucsses\' (click)="actionSheetMethod(results)">Options</button>\n\n      </span>\n\n      <span class="b1"><button ion-button (click)=\'getFacilityDescription(results.TemplateDescription)\'>Full\n\n          Description</button></span>\n\n    </div>\n\n  </ion-card>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\instrument-search\instrument-search.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
    ], InstrumentSearchPage);
    return InstrumentSearchPage;
}());

//# sourceMappingURL=instrument-search.js.map

/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivitylogsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//Done by Abey Abraham



/*
  Generated class for the ActivitylogsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ActivitylogsProvider = /** @class */ (function () {
    function ActivitylogsProvider(http, storage) {
        var _this = this;
        this.http = http;
        this.storage = storage;
        //fetching the link should be done in constructor part of providers , it wont work as adding the same to ionviewdidload()
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.activityurl = _this.appUrl + '/WS/IdeaElanService.svc/InsertActivityTrail';
        });
    }
    ActivitylogsProvider.prototype.ionViewDidLoad = function () {
    };
    ActivitylogsProvider.prototype.insertlog = function (modulename, pagename, action, description, loggedinuser) {
        this.http.post(this.activityurl, {
            modulename: modulename,
            pagename: pagename,
            action: action,
            description: description,
            loggedinuser: loggedinuser
        })
            .subscribe(function (data) {
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
        });
    };
    ActivitylogsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], ActivitylogsProvider);
    return ActivitylogsProvider;
}());

//# sourceMappingURL=activitylogs.js.map

/***/ }),

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageProvider; });
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



var MessageProvider = /** @class */ (function () {
    function MessageProvider(alertCtrl, app) {
        this.alertCtrl = alertCtrl;
        this.app = app;
    }
    MessageProvider.prototype.showMessage = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            message: message,
            enableBackdropDismiss: false,
            buttons: ['Ok']
        });
        alert.present();
    };
    MessageProvider.prototype.showMessageButton = function (title, message, object) {
        var alert = this.alertCtrl.create({
            title: title,
            message: message,
            enableBackdropDismiss: false,
            buttons: object
        });
        alert.present();
    };
    MessageProvider.prototype.showMessagePop = function (title, message) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: title,
            message: message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok',
                    handler: function () {
                        var nav = _this.app.getActiveNav();
                        nav.pop();
                    }
                }
            ]
        });
        alert.present();
    };
    MessageProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */]])
    ], MessageProvider);
    return MessageProvider;
}());

//# sourceMappingURL=message.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActualusagecounterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_easytimer_js__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_easytimer_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_easytimer_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__menu_menu__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_message_message__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










//Created by Anto Rupak
/**
 * Generated class for the ActualusagecounterPage page by Anto Rupak.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ActualusagecounterPage = /** @class */ (function () {
    function ActualusagecounterPage(navCtrl, navParams, messages, storage, loading, http, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.messages = messages;
        this.storage = storage;
        this.loading = loading;
        this.http = http;
        this.alertCtrl = alertCtrl;
    }
    ActualusagecounterPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.resourceId = this.navParams.get('resourceId');
        this.resUserName = this.navParams.get('User');
        this.projectId = this.navParams.get('ProjectId');
        this.labId = this.navParams.get('labId');
        this.projectName = this.navParams.get('ProjectName');
        this.labName = this.navParams.get('LabName');
        this.accountCodeId = this.navParams.get('AccountCode');
        this.sessionId = this.navParams.get('SessionType');
        this.adminId = this.navParams.get('Admin');
        this.adminName = this.navParams.get('adminName');
        this.labType = this.navParams.get('labType');
        this.accountCodeFrom = this.navParams.get('accountCodeFrom');
        this.sessionName = this.navParams.get('SessionName');
        this.tagValue = this.navParams.get('TagName');
        this.tagId = this.navParams.get('tagId');
        this.accName = this.navParams.get('accName');
        this.startTime = __WEBPACK_IMPORTED_MODULE_5_moment__(new Date()).format("YYYY-MM-DD HH:mm:ss");
        this.ViewDateValue = __WEBPACK_IMPORTED_MODULE_5_moment__(new Date()).format("MM-DD-YYYY HH:mm:ss");
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.getInsertUsageUrl = _this.appUrl + '/WS/IdeaElanService.svc/InsertUsage';
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
        });
    };
    ActualusagecounterPage.prototype.ionViewDidEnter = function () {
        var timer = new __WEBPACK_IMPORTED_MODULE_3_easytimer_js___default.a();
        timer.start();
        __WEBPACK_IMPORTED_MODULE_4_jquery__('#chronoExample .stopButton').click(function (e) {
        });
        __WEBPACK_IMPORTED_MODULE_4_jquery__('.stopButton').click(function (e) {
            timer.stop();
        });
        timer.addEventListener('secondsUpdated', function () {
            __WEBPACK_IMPORTED_MODULE_4_jquery__('#chronoExample .timer').html(timer.getTimeValues().toString());
        });
        timer.addEventListener('started', function () {
            __WEBPACK_IMPORTED_MODULE_4_jquery__('#chronoExample .timer').html(timer.getTimeValues().toString());
        });
        timer.addEventListener('reset', function () {
            __WEBPACK_IMPORTED_MODULE_4_jquery__('#chronoExample .timer').html(timer.getTimeValues().toString());
        });
    };
    ActualusagecounterPage.prototype.conformUsage = function (resourceId) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Confirm',
            message: "Are you sure want to stop Actual Usage.?",
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                    }
                },
                {
                    text: 'Confirm',
                    handler: function (data) {
                        _this.insertActualUsage();
                    }
                }
            ]
        });
        prompt.present();
    };
    ActualusagecounterPage.prototype.insertActualUsage = function () {
        var _this = this;
        var stoptime = __WEBPACK_IMPORTED_MODULE_5_moment__(new Date()).format("YYYY-MM-DD HH:mm:ss");
        if (this.projectId === "undefined") {
            this.projectId = "0";
        }
        //timer.stop()
        var misc = "User:" + this.userJson.UserId + "LabId:" + this.labId + "LabType:" + this.labType + "Account Code:"
            + this.accountCodeId + ";" + "From Where:" + "accountCodeFrom:" + this.accountCodeFrom + "ProjectId:"
            + this.projectId + "Session type:" + this.sessionId + "AdminId:" + this.adminId;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        this.http.post(this.getInsertUsageUrl, {
            userid: this.userJson.UserId,
            username: this.userJson.FirstName,
            resourceid: this.resourceId,
            appname: "Mobile",
            starttime: this.startTime,
            endtime: stoptime,
            apptid: "0",
            labid: this.labId,
            accountcodeid: this.accountCodeId,
            labtype: this.labType,
            accountcodefrom: this.accountCodeFrom,
            projectid: this.projectId,
            sessiontypeid: this.sessionId,
            adminid: this.adminId,
            misc: misc,
            usertoken: this.userJson.UserToken,
            tagids: this.tagId
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            loader.dismiss();
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__menu_menu__["a" /* MenuPage */], { "page": "NaviPage" });
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status = 400) {
                var alert_1 = _this.alertCtrl.create({
                    title: "Alert",
                    message: "Error Processsing request",
                    enableBackdropDismiss: false,
                    buttons: [
                        {
                            text: 'OK',
                            handler: function () {
                                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__menu_menu__["a" /* MenuPage */], { "page": "NaviPage" });
                                //  nav.pop();
                            }
                        }
                    ]
                });
                alert_1.present();
            }
        });
    };
    ActualusagecounterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-actualusagecounter',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\actualusagecounter\actualusagecounter.html"*/'<!--Created by Anto Rupak-->\n\n<script src="lib/easytimer/dist/easytimer.min.js"></script>\n\n<script>\n\n  var timerInstance = new easytimer.Timer();\n\n</script>\n\n\n\n<ion-header>\n\n  <ion-navbar hideBackButton>\n\n    <ion-title>Actual Usage</ion-title>\n\n</ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n   \n\n  <ion-item><ion-row><ion-col col-4><b>User:</b></ion-col> <ion-col col-5>{{resUserName}}</ion-col></ion-row></ion-item>\n\n  <ion-item><ion-row><ion-col col-4><b>Lab:</b></ion-col><ion-col col-5>{{labName}}</ion-col></ion-row> </ion-item>\n\n  <ion-item><ion-row><ion-col col-4><b>Project:</b></ion-col><ion-col col-5>{{projectName}}</ion-col></ion-row> </ion-item>\n\n  <ion-item><ion-row><ion-col col-4><b>Account Code:</b></ion-col><ion-col col-5>{{accName}}</ion-col></ion-row> </ion-item>\n\n  <ion-item><ion-row><ion-col col-4><b>Session Type:</b></ion-col><ion-col col-5>{{sessionName}}</ion-col></ion-row> </ion-item>\n\n  <ion-item><ion-row><ion-col col-4><b>Admin:</b></ion-col><ion-col col-5>{{adminName}}</ion-col></ion-row> </ion-item>\n\n  <ion-item><ion-row><ion-col col-4><b>Tag Name:</b></ion-col><ion-col col-5>{{tagValue}}</ion-col></ion-row> </ion-item>\n\n  <ion-item><ion-row><ion-col col-4><b>Start Time:</b></ion-col><ion-col col-5> {{ViewDateValue}}</ion-col></ion-row></ion-item>\n\n  <ion-item>\n\n    <div id="chronoExample">\n\n      <div class="timer">00:00:00</div>\n\n    </div>\n\n  </ion-item>\n\n  <ion-item>\n\n\n\n    <button ion-button  block class="stopButton" (click)=\'conformUsage()\'>\n\n      Stop\n\n    </button>\n\n  </ion-item>\n\n\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\actualusagecounter\actualusagecounter.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_8__providers_message_message__["a" /* MessageProvider */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], ActualusagecounterPage);
    return ActualusagecounterPage;
}());

//# sourceMappingURL=actualusagecounter.js.map

/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_chart_js__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_activitylogs_activitylogs__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__message_message__ = __webpack_require__(67);
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









var DashboardPage = /** @class */ (function () {
    function DashboardPage(logs, navCtrl, navParams, storage, loading, http, actionctrl) {
        this.logs = logs;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.loading = loading;
        this.http = http;
        this.actionctrl = actionctrl;
        //  this.logs.insertlog("Facility Dashboard","Menu Page","clicked facility dashboard ","User clicked facility dashboard option from menu   ",this.userJson.UserId);
    }
    DashboardPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.getFacilitiesUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetFacilitiesUserIsAdmin';
            _this.getFacilitiesTechnicalIssueUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetTechnicalIssues';
            _this.getFacilityGraphUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetFrequentlyUsedInstruments';
            _this.getDashboardUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetUserDashboardDetails';
            _this.getFacilityDashboardUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetFacilityDashboardDetails';
        });
        this.storage.get('roleType').then(function (val) {
            _this.roletype = val;
            if (val == "user" || val == "labAdmin") {
                _this.userType = true;
            }
            else if (val == "super" || val == "admin" || val == "providerAdmin" || val == "labAdmin") {
                _this.userType = false;
            }
            else {
            }
        });
        this.storage.get('pin').then(function (val) {
            _this.pin = val;
        });
    };
    DashboardPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('spinnerDashboard').then(function (val) {
            _this.spinnerIndex = Number(val);
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
            if (_this.userType) {
                _this.sendFacilitesTechnicalIssueRequest("UserId", "" + _this.userJson.UserId);
                _this.sendDashboardDetails();
                _this.sendFacilityGraphDetails("0");
            }
            else if (!_this.userType) {
                _this.sendFacilitiesRequest(_this.userJson.UserToken, _this.userJson.UserId);
            }
        });
    };
    DashboardPage.prototype.ionViewDidEnter = function () {
    };
    DashboardPage.prototype.sendFacilitiesRequest = function (userToken, userId) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        this.http.post(this.getFacilitiesUrl, {
            userid: userId,
            usertoken: userToken,
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userFacilitiesJson = resJSON;
            _this.providerValue = resJSON[_this.spinnerIndex].GroupId;
            _this.emptyString = false;
            loader.dismiss();
            console.log("roletype", _this.roletype);
            _this.sendFacilitesTechnicalIssueRequest("ProviderId", _this.providerValue);
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            _this.emptyString = true;
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
            }
        });
    };
    /*
      dashPage(instrument) {
        this.logs.insertlog("View Issues ", "Facility Dashboard Page", "click event of card content", "User clicked the issues displayed in cards for viewing details  ", this.userJson.UserId);
        //this.navCtrl.push('DashboarddetailPage', { "dashboardTicketDetail": instrument ,"userId":this.userJson.UserId});
        if(this.roletype=="user"){
          this.navCtrl.push(MessagePage, {"instrumentid":`${instrument.ResourceId}`,"id":"user","ticketid":`${instrument.TicketId}`});
        }
       else if(this.roletype=="providerAdmin"){
          this.navCtrl.push(MessagePage, {"instrumentid":`${instrument.ResourceId}`,"id":"providerAdmin","ticketid":`${instrument.TicketId}`});
        }
    else{
      this.navCtrl.push('DashboarddetailPage', { "dashboardTicketDetail": instrument ,"userId":this.userJson.UserId,"ticketid":`${instrument.TicketId}`});
    }
      }
      */
    DashboardPage.prototype.dashPage = function (instrument) {
        var _this = this;
        if (this.roletype == "user" || this.roletype == "providerAdmin" || this.roletype == "super" || this.roletype == "labAdmin" || this.roletype == " admin") {
            if (this.roletype == "user" || this.roletype == "labAdmin") {
                if (this.userJson.UserId == instrument.UserId) {
                    console.log("user " + this.userJson.UserId + " admin" + instrument.UserId);
                    this.showdetail(instrument);
                    return;
                }
            }
            if (this.roletype == "super" || this.roletype == "providerAdmin" || this.roletype == " admin") {
                if (this.userJson.UserId == instrument.UserId) {
                    console.log("user " + this.userJson.UserId + " admin" + instrument.UserId);
                    this.showdetail(instrument);
                    return;
                }
            }
            var actionSheet = this.actionctrl.create({
                title: 'Select Options',
                cssClass: 'myPage',
                buttons: [
                    {
                        //updated by Abey Abraham
                        text: 'Chat',
                        role: 'destructive',
                        cssClass: 'myActionSheetBtnStyle',
                        handler: function () {
                            _this.logs.insertlog("View Issues ", "Facility Dashboard Page", "click event of card content", "User clicked the issues displayed in cards for viewing details  ", _this.userJson.UserId);
                            //this.navCtrl.push('DashboarddetailPage', { "dashboardTicketDetail": instrument ,"userId":this.userJson.UserId});
                            if (_this.roletype == "user" || _this.roletype == "labAdmin") {
                                console.log("user " + _this.userJson.UserId + " admin" + instrument.UserId);
                                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__message_message__["a" /* MessagePage */], { "instrumentid": "" + instrument.ResourceId, "id": "user", "ticketid": "" + instrument.TicketId, "source": "" + instrument.Source, "chatType": "TechnicalIssues" });
                                //this.navCtrl.push('ChatContentPage', {"role":`${this.roletype}`,"userid":`${this.userJson.UserId}`,"adminid":`${instrument.UserId}`,"instrumentid":`${instrument.ResourceId}`,"ticketid":`${instrument.TicketId}`,"senderName":`${instrument.FirstName}`,"pin":`${this.pin}`,"source":`${instrument.Source}`,"chatType":`TechnicalIssues`})
                            }
                            else if (_this.roletype == "super" || _this.roletype == "providerAdmin" || _this.roletype == " admin") {
                                console.log("admin , user source", _this.userJson.UserId, instrument.UserId, instrument.Source);
                                _this.navCtrl.push('ChatContentPage', { "role": "" + _this.roletype, "userid": "" + instrument.UserId, "adminid": "" + _this.userJson.UserId, "instrumentid": "" + instrument.ResourceId, "ticketid": "" + instrument.TicketId, "senderName": _this.userJson.LastName + " " + _this.userJson.FirstName, "pin": "" + _this.pin, "source": "" + instrument.Source, "chatType": "TechnicalIssues" });
                                //this.navCtrl.push(MessagePage, {"instrumentid":`${instrument.ResourceId}`,"id":"providerAdmin","ticketid":`${instrument.TicketId}`,"source":`${instrument.Source}`,"chatType":`TechnicalIssues`});
                            }
                        }
                    },
                    {
                        text: 'Details',
                        role: 'destructive',
                        cssClass: 'myActionSheetBtnStyle',
                        handler: function () {
                            _this.navCtrl.push('DashboarddetailPage', { "dashboardTicketDetail": instrument, "userId": _this.userJson.UserId, "ticketid": "" + instrument.TicketId });
                        }
                    },
                ]
            });
            actionSheet.present();
        }
        else {
            this.showdetail(instrument);
        }
    };
    DashboardPage.prototype.showdetail = function (instrument) {
        var _this = this;
        var actionSheet = this.actionctrl.create({
            title: 'Select Options',
            cssClass: 'myPage',
            buttons: [
                {
                    text: 'Details',
                    role: 'destructive',
                    cssClass: 'myActionSheetBtnStyle',
                    handler: function () {
                        _this.navCtrl.push('DashboarddetailPage', { "dashboardTicketDetail": instrument, "userId": _this.userJson.UserId, "ticketid": "" + instrument.TicketId });
                    }
                },
            ]
        });
        actionSheet.present();
        return;
    };
    DashboardPage.prototype.sendDashboardDetails = function () {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        this.http.post(this.getDashboardUrl, {
            userid: this.userJson.UserId,
            usertoken: this.userJson.UserToken,
        })
            .subscribe(function (data) {
            //RESPONSE
            _this.fullString = true;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.monthlyAmt = resJSON.MonthlyAmount;
            _this.monthlyCount = resJSON.MonthlyCount;
            _this.quaterlyAmt = resJSON.QuarterlyAmount;
            _this.quaterlyCount = resJSON.QuarterlyCount;
            loader.dismiss();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            _this.fullString = false;
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
        });
    };
    DashboardPage.prototype.sendFacilityGraphDetails = function (graphProviderValue) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        //  loader.present();
        this.http.post(this.getFacilityGraphUrl, {
            userid: this.userJson.UserId,
            labid: "0",
            providerid: graphProviderValue
        })
            .subscribe(function (data) {
            //RESPONSE
            var chartdata = [];
            var chartlabels = [];
            _this.fullString = true;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.graphHide = false;
            for (var i = 0; i < resJSON.length; i++) {
                chartlabels.push(resJSON[i].ResourceName);
                chartdata.push(resJSON[i].Apptcount);
            }
            if (_this.doughnutChart != null) {
                _this.doughnutChart.destroy();
            }
            _this.doughnutChart = new __WEBPACK_IMPORTED_MODULE_4_chart_js__["Chart"](_this.doughnutCanvas.nativeElement, {
                /* Modified by Abey Abraham */
                type: 'doughnut',
                data: {
                    labels: chartlabels,
                    datasets: [{
                            label: '',
                            data: chartdata,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                            ],
                            hoverBackgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                                "#FFCE56",
                                "#FF6384",
                            ]
                        }]
                }, options: {
                    showDatasetLabels: true,
                    cutoutPercentage: 41,
                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem, data) {
                                return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
                            }
                        }
                    }
                }
            });
            if (_this.barChart != null) {
                _this.barChart.destroy();
            }
            _this.barChart = new __WEBPACK_IMPORTED_MODULE_4_chart_js__["Chart"](_this.barCanvas.nativeElement, {
                type: 'bar',
                data: {
                    labels: chartlabels,
                    datasets: [{
                            label: ' ',
                            data: chartdata,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                            ],
                            borderWidth: 1
                        }]
                },
                options: {
                    showDatasetLabels: true,
                    cutoutPercentage: 41,
                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem, data) {
                                return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
                            }
                        }
                    },
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Percentage'
                                },
                                ticks: {
                                    minRotation: 45,
                                    beginAtZero: true
                                }
                            }],
                        xAxes: [{
                                ticks: {
                                    minRotation: 45,
                                    autoSkip: false
                                }
                            }]
                    }
                }
            });
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            _this.fullString = false;
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
                _this.graphHide = true;
            }
        });
    };
    /*Facility Dashboard*/
    DashboardPage.prototype.sendFacilityDashboardDetails = function (providerValue) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        // loader.present();
        this.http.post(this.getFacilityDashboardUrl, {
            userid: this.userJson.UserId,
            usertoken: this.userJson.UserToken,
            facilityid: providerValue
        })
            .subscribe(function (data) {
            //RESPONSE
            _this.fullString = true;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.monthlyAmt = resJSON.MonthlyAmount;
            _this.monthlyCount = resJSON.MonthlyCount;
            _this.quaterlyAmt = resJSON.QuarterlyAmount;
            _this.quaterlyCount = resJSON.QuarterlyCount;
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            _this.fullString = false;
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
        });
    };
    DashboardPage.prototype.sendFacilitesTechnicalIssueRequest = function (paramname, paramvalue) {
        var _this = this;
        console.log(paramvalue, paramname);
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        //  loader.present();
        this.http.post(this.getFacilitiesTechnicalIssueUrl, {
            userid: this.userJson.UserId,
            usertoken: this.userJson.UserToken,
            paramname: paramname,
            paramvalue: paramvalue
        })
            .subscribe(function (data) {
            //RESPONSE
            _this.technicalStatus = true;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userFacilitiesTechnicalIssuesJson = resJSON;
            console.log("test", _this.userFacilitiesTechnicalIssuesJson);
            // 
            //loader.dismiss();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            //  this.userFacilitiesTechnicalIssuesJson=resErrJSON;
            if (resErrJSON.status == 400) {
                _this.technicalStatus = false;
            }
        });
    };
    //TOAST METHOD
    DashboardPage.prototype.updateChange = function () {
        //fvbgfrgb
        this.providerValue;
        this.sendFacilitesTechnicalIssueRequest("ProviderId", this.providerValue);
        this.sendFacilityGraphDetails(this.providerValue);
        this.sendFacilityDashboardDetails(this.providerValue);
        this.spinnerIndex = 0;
        for (var i = 0; i < this.userFacilitiesJson.length; i++) {
            this.storage.set('spinnerDashboard', this.spinnerIndex);
            this.spinnerIndex++;
            if (this.providerValue == this.userFacilitiesJson[i].GroupId) {
                break;
            }
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('barCanvas'),
        __metadata("design:type", Object)
    ], DashboardPage.prototype, "barCanvas", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('doughnutCanvas'),
        __metadata("design:type", Object)
    ], DashboardPage.prototype, "doughnutCanvas", void 0);
    DashboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-dashboard',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\dashboard\dashboard.html"*/'<ion-header>\n\n  <ion-navbar hideBackButton>\n\n\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n\n\n    <ion-title> My Dashboard</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content >\n\n  <ion-row [class.hide]="userType" class="rowstyle">\n\n    <ion-col>\n\n      <p class="dropdown">Facility</p>\n\n    </ion-col>\n\n    <ion-col  class="colstyle">\n\n      <ion-select *ngIf=\'emptyString\' disabled="true" [(ngModel)]="providerValue" placeholder=\'No Records Found\'\n\n        multiple="false" (ionChange)="updateChange()">\n\n      </ion-select>\n\n      <ion-select *ngIf=\'!emptyString\' [(ngModel)]="providerValue" placeholder=\'Facility\' multiple="false"\n\n        (ionChange)="updateChange()">\n\n        <ion-option *ngFor="let facility of userFacilitiesJson; let i = index;" selected="{{(i==0)}}"\n\n          value="{{facility.GroupId}}">{{facility.GroupName}}</ion-option>\n\n      </ion-select>\n\n    </ion-col>\n\n\n\n  </ion-row>\n\n  <hr [class.hide]="userType">\n\n\n\n  <p class="cardslayout">Instrument Usage</p>\n\n  <table>\n\n    <tr>\n\n      <th>Monthly</th>\n\n\n\n    </tr>\n\n    <tr>\n\n      <td>No. of Reservations : <b>{{monthlyCount}}</b></td>\n\n\n\n    </tr>\n\n    <tr>\n\n      <td>Total Amount : <b>{{monthlyAmt}}</b></td>\n\n\n\n    </tr>\n\n\n\n  </table>\n\n  &nbsp;\n\n  <table>\n\n    <tr>\n\n      <th>Quaterly</th>\n\n\n\n    </tr>\n\n    <tr>\n\n      <td>No. of Reservations : <b>{{quaterlyCount}}</b></td>\n\n\n\n    </tr>\n\n    <tr>\n\n      <td>Total Amount : <b>{{quaterlyAmt}}</b></td>\n\n\n\n    </tr>\n\n\n\n  </table>\n\n\n\n  <p ion-align="center">\n\n    <canvas #doughnutCanvas width="450" height="350" [class.hide]="graphHide" class="canvasstyle"></canvas>\n\n  </p>\n\n  <p ion-align="left"><canvas #barCanvas width="450" height="350" [class.hide]="graphHide"\n\n      style="align-items: center;"></canvas>\n\n  </p>\n\n\n\n  <p class="cardslayout">Technical Issues</p>\n\n  <ion-card-content *ngIf=\'!technicalStatus\'>No Records Found</ion-card-content>\n\n  <div *ngIf=\'technicalStatus\'>\n\n        <ion-card *ngFor="let technicalIssues of userFacilitiesTechnicalIssuesJson"  (click)=\'dashPage(technicalIssues)\'>\n\n        <div class="cardsubheading">Resource : {{technicalIssues.Source}}</div>\n\n        <div class="cardsubtext"> Created Date : {{technicalIssues.strCreatedDate}}</div>\n\n        <div class="cardsubtext"> Status : {{technicalIssues.Status}}</div>\n\n        </ion-card>\n\n  </div>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\dashboard\dashboard.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__providers_activitylogs_activitylogs__["a" /* ActivitylogsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
    ], DashboardPage);
    return DashboardPage;
}());

//# sourceMappingURL=dashboard.js.map

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PIinboxPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__inboxview_inboxview__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_notification_notification__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_activitylogs_activitylogs__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/*
Done by Abey Abraham
*/













/**
 * Generated class for the PIinboxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PIinboxPage = /** @class */ (function () {
    function PIinboxPage(logs, navCtrl, navParams, toastCtrl, storage, loading, http, platform, alertCtrl, actionctrl, notification) {
        this.logs = logs;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.loading = loading;
        this.http = http;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.actionctrl = actionctrl;
        this.notification = notification;
        this.event = { startDate: "", endDate: "" };
        this.page = "0";
        this.event.startDate = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString();
        this.event.endDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();
        //this.startDate=new Date(new Date().setDate(new Date().getDate())).toISOString();
        //this.startDate= moment(this.startDate).format('YYYY-MM-DD');
        //new Date(new Date().setDate(new Date().getDate() + 7)).toISOString();
        //   this.endDate = new Date(new Date().setDate(new Date().getDate() + 30)).toISOString();
        // this.endDate= moment(this.endDate).format('YYYY-MM-DD');
    }
    PIinboxPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.pageSelected = 0;
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.getLabUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetLabsUserIsAdmin';
            _this.getLabAccessUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetLabAccessRequest';
            _this.updateLabUrl = _this.appUrl + '/WS/IdeaElanService.svc/UpdateLabRequestStatus';
            _this.getInvoiceUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetAllInvoices';
            _this.getInvoiceDetailsUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetInvoiceDetailsByInvoiceId';
            _this.updateInvoiceUrl = _this.appUrl + '/WS/IdeaElanService.svc/UpdateInvoicePaymentStatus';
            _this.getUserDeviceDetailsUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetUserDeviceDetails';
            _this.sendPushNotificationUrl = _this.appUrl + '/WS/IdeaElanService.svc/SendPushMessageToTokens';
            _this.GetOrderByLabAndDates = _this.appUrl + '/WS/IdeaElanService.svc/GetOrderByLabAndDates';
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
        });
    };
    PIinboxPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.get('spinnerPiInbox').then(function (val) {
            _this.spinnerPiIndex = Number(val);
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
            if (_this.userJson.UserId == "" || _this.userJson.UserId == null) {
            }
            else {
                _this.sendLabRequest();
            }
        });
    };
    PIinboxPage.prototype.labRequestButton = function () {
        this.logs.insertlog("Invoice Module  ", "PI Inbox page", "clicked go button ", "User clicked go button after selecting the startdate and end date  ", this.userJson.UserId);
        this.sendLabRequest();
    };
    PIinboxPage.prototype.sendLabRequest = function () {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        this.http.post(this.getLabUrl, {
            userid: this.userJson.UserId,
            usertoken: this.userJson.UserToken,
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userLabJson = resJSON;
            _this.labid = resJSON[_this.spinnerPiIndex].GroupId;
            _this.labname = resJSON[_this.spinnerPiIndex].GroupName;
            _this.emptyDropdown = false;
            loader.present().then(function () {
                return _this.sendLabAccessRequest(_this.labid);
            }).then(function () {
                return _this.sendInvoiceRequest(_this.labid);
            }).then(function () { loader.dismiss(); });
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            _this.emptyDropdown = true;
        });
    };
    PIinboxPage.prototype.sendLabAccessRequest = function (groupId) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        //  loader.present();
        this.http.post(this.getLabAccessUrl, {
            userid: this.userJson.UserId,
            labid: groupId,
            usertoken: this.userJson.UserToken
        })
            .subscribe(function (data) {
            //RESPONSE
            _this.labStatus = true;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.emptyString = false;
            _this.userLabAccessJson = resJSON;
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            _this.emptyString = true;
            if (resErrJSON.status == 400) {
                _this.checkStatus = "400";
                _this.labStatus = false;
                // this.toast(resErrJSON.statusText);
            }
        });
    };
    PIinboxPage.prototype.actionSheetMethod = function (actionJson) {
        var _this = this;
        var actionSheet = this.actionctrl.create({
            title: 'Select Options',
            cssClass: 'myPage',
            buttons: [
                {
                    //updated by Abey Abraham
                    text: 'Approve',
                    role: 'destructive',
                    cssClass: 'myActionSheetBtnStyle',
                    handler: function () {
                        _this.updateLabRequest(_this.labid, "-1", actionJson.UserId);
                        _this.notification.getUserDeviceDetails("user", actionJson.UserId, "LARS", "Request to access " + _this.labname + " has been approved", "Lab Access Request");
                    }
                },
                {
                    text: 'Reject',
                    role: 'destructive',
                    cssClass: 'myActionSheetBtnStyle',
                    handler: function () {
                        _this.updateLabRequest(_this.labid, "-2", actionJson.UserId);
                        _this.notification.getUserDeviceDetails("user", actionJson.UserId, "LARS", "Request to access " + _this.labname + " has been rejected", "Lab Access Request");
                    }
                },
            ]
        });
        actionSheet.present();
    };
    PIinboxPage.prototype.updateLabRequest = function (groupID, status, userid) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        // loader.present();
        this.http.post(this.updateLabUrl, {
            labid: groupID,
            userid: userid,
            status: status,
            user: this.userJson.EmailAddress
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.labUpdateJson = resJSON;
            // loader.dismiss();
            _this.sendLabAccessRequest(_this.labid);
            var alert = _this.alertCtrl.create({
                title: 'Message',
                subTitle: 'Status Updated Successfully!',
                buttons: ['OK']
            });
            alert.present();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
        });
    };
    PIinboxPage.prototype.sendInvoiceRequest = function (groupId) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        this.http.post(this.getInvoiceUrl, {
            providerid: "0",
            labid: groupId,
            start: this.event.startDate,
            end: this.event.endDate,
            loggedinuser: this.userJson.UserId,
            usertoken: this.userJson.UserToken,
        })
            .subscribe(function (data) {
            //RESPONSE
            _this.invoiceStatus = true;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.emptyString = false;
            _this.userInvoiceJson = resJSON;
            if (_this.userInvoiceJson.TotalAmount == null) {
                _this.userInvoiceJson.TotalAmount = 0.00;
            }
            _this.invoiceno = resJSON[0].InvoiceNumber;
            // this.updateFacilityRequest(this.facilityid);
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
                _this.emptyString = true;
                _this.checkStatus = "400";
                _this.invoiceStatus = false;
                // this.toast(resErrJSON.statusText);
            }
        });
    };
    PIinboxPage.prototype.invoiceRequest = function (actionJson) {
        var _this = this;
        var resErr = JSON.stringify(actionJson);
        var resErrJSON = JSON.parse(resErr);
        if (resErrJSON.Status === "Dispatched" || resErrJSON.Status === "Reviewed" || resErrJSON.Status === "In Review") {
            var actionSheet = this.actionctrl.create({
                title: 'Select Option',
                buttons: [
                    {
                        text: 'View',
                        role: 'destructive',
                        handler: function () {
                            _this.logs.insertlog("Invoice Module ", "PI Inbox page", "clicked on view option of Actionsheet after clicking on invoice list", "User selected view option of actionsheet after clicking on the invoice list cards ", _this.userJson.UserId);
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__inboxview_inboxview__["a" /* InboxviewPage */], { "invoicUserJson": actionJson, "labId": _this.labid });
                        }
                    },
                    {
                        //updated by abey abraham
                        text: 'Approve',
                        role: 'destructive',
                        handler: function () {
                            _this.logs.insertlog("Invoice Module ", "PI Inbox page", "clicked on view option of Actionsheet after clicking on invoice list", "User selected view option of actionsheet after clicking on the invoice list cards ", _this.userJson.UserId);
                            _this.notification.getUserDeviceDetails("facilityadmin", actionJson.ProviderId, "INV", " invoice number : " + _this.invoiceno + " has been approved ", "Invoice approved");
                            _this.updateInvoiceRequest(actionJson.InvoiceId, "Approved", _this.labid);
                        }
                    },
                ]
            });
            actionSheet.present();
        }
        else if (resErrJSON.Status === "Approved" || resErrJSON.Status === "Payment Received (Partially)") {
            var actionSheet = this.actionctrl.create({
                title: 'Select Option',
                buttons: [
                    {
                        text: 'View',
                        role: 'destructive',
                        handler: function () {
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__inboxview_inboxview__["a" /* InboxviewPage */], {
                                "invoicUserJson": actionJson, "labId": _this.labid
                            });
                        }
                    },
                ]
            });
            actionSheet.present();
        }
    };
    PIinboxPage.prototype.updateInvoiceRequest = function (invoiceid, status, groupId) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        // loader.present();
        this.http.post(this.updateInvoiceUrl, {
            invoiceid: invoiceid,
            status: status,
            paiddate: __WEBPACK_IMPORTED_MODULE_5_moment__().format("MM/DD/YYYY"),
            labid: groupId,
            user: this.userJson.EmailAddress,
            note: ""
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.InvoiceUpdateJson = resJSON;
            _this.notification.getUserDeviceDetails("facilityadmin", "0", "INV", "Invoice Number : " + _this.invoiceno + " has been approved", "Invoice Approved");
            // loader.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Message',
                subTitle: 'Status Updated Successfully!',
                buttons: ['OK']
            });
            alert.present();
            _this.sendInvoiceRequest(_this.labid);
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
        });
    };
    PIinboxPage.prototype.toast = function (toastStr) {
        var alert = this.alertCtrl.create({
            title: 'Alert',
            message: toastStr,
            buttons: ['Ok']
        });
        alert.present();
    };
    PIinboxPage.prototype.updateChange = function () {
        this.labid;
        this.sendLabAccessRequest(this.labid);
        this.sendInvoiceRequest(this.labid);
        this.sendSuppliesRequest(this.labid);
        this.spinnerPiIndex = 0;
        for (var i = 0; i < this.userLabJson.length; i++) {
            this.storage.set('spinnerPiInbox', this.spinnerPiIndex);
            if (this.labid == this.userLabJson[i].GroupId) {
                break;
            }
            this.spinnerPiIndex++;
        }
        //this. sendFacilitiesRequest();
    };
    PIinboxPage.prototype.startdatetime = function (event) {
        if (this.event.startDate > this.event.endDate) {
            this.event.startDate = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString();
            this.showAlert("Start date cannot be after End Date.");
            return false;
        }
    };
    PIinboxPage.prototype.showAlert = function (eventdata) {
        var alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: eventdata,
            buttons: ['Ok']
        });
        alert.present();
    };
    PIinboxPage.prototype.enddatetime = function (event) {
        this.event.startDate = __WEBPACK_IMPORTED_MODULE_5_moment__(this.event.startDate).toISOString(true);
        this.event.endDate = __WEBPACK_IMPORTED_MODULE_5_moment__(this.event.endDate).toISOString(true);
        if (!__WEBPACK_IMPORTED_MODULE_5_moment__(this.event.endDate).isAfter(this.event.startDate)) {
            this.event.endDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();
            this.showAlert("Selected date cannot be before to start date.");
        }
    };
    PIinboxPage.prototype.sendSuppliesRequest = function (groupId) {
        var _this = this;
        this.startDate = __WEBPACK_IMPORTED_MODULE_5_moment__(this.event.startDate).format('YYYY-MM-DD');
        this.endDate = __WEBPACK_IMPORTED_MODULE_5_moment__(this.event.endDate).format('YYYY-MM-DD');
        this.http.get(this.GetOrderByLabAndDates + "/" + groupId + ",0," + this.startDate + "," + this.endDate)
            .subscribe(function (data) {
            //RESPONSE
            _this.SupStatus = true;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userSuppliesJson = resJSON;
            //this.userReservtionJson=resJSON;
            //this.appid=resJSON[0].AppointmentId;
            //this.sdate=resJSON[0].strStartTime;
            // this.edate=resJSON[0].strEndTime;
            //this.resourscename=resJSON[0].ResourceName;
            // this.resid=resJSON[0].ResourceId;
            //  loader.dismiss();
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
            //loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            _this.SupStatus = true;
            if (resErrJSON.status == 400) {
            }
        });
    };
    PIinboxPage.prototype.detailpage = function (data) {
        this.navCtrl.push("SuppliesDetailPage", {
            "orderid": data,
            "piinbox": true
        });
    };
    PIinboxPage.prototype.selectedTab = function (ind) {
        this.slider.slideTo(ind);
    };
    PIinboxPage.prototype.moveButton = function ($event) {
        this.page = $event._snapIndex.toString();
        switch (this.page) {
            case '0':
                this.pageSelected = 0;
                break;
            case '1':
                this.pageSelected = 1;
                break;
            case '2':
                this.pageSelected = 2;
                break;
            default:
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('slider'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Slides */])
    ], PIinboxPage.prototype, "slider", void 0);
    PIinboxPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-p-iinbox',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\p-iinbox\p-iinbox.html"*/'<ion-header>\n\n  <ion-navbar hideBackButton text-center>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Inbox</ion-title>\n\n  </ion-navbar>\n\n  <ion-row [class.hide]="userType" class="rowalign">\n\n    <ion-col>\n\n      <p class="drop">Lab/PI</p>\n\n    </ion-col>\n\n    <ion-col>\n\n      <ion-select *ngIf=\'emptyDropdown\' [(ngModel)]="labid" disabled="true" placeholder=\'No Records Found\'\n\n        multiple="false" (ionChange)="updateChange()">\n\n      </ion-select>\n\n      <ion-select *ngIf=\'!emptyDropdown\' [(ngModel)]="labid" placeholder=\'Lab\' multiple="false"\n\n        (ionChange)="updateChange()">\n\n        <ion-option *ngIf=\'emptyDropdown\' value="0">No Records Found</ion-option>\n\n        <ion-option *ngFor="let lab of userLabJson; let i = index;" selected="{{(i==0)}}" value="{{lab.GroupId}}">\n\n          {{lab.GroupName}}</ion-option>\n\n      </ion-select>\n\n    </ion-col>\n\n  </ion-row>\n\n\n\n  <ion-segment [(ngModel)]="page">\n\n    <ion-segment-button value="0" (click)="selectedTab(0)">\n\n      Access Request\n\n    </ion-segment-button>\n\n    <ion-segment-button value="1" (click)="selectedTab(1)">\n\n      Invoice Request\n\n    </ion-segment-button>\n\n    <ion-segment-button value="2" (click)="selectedTab(2)">\n\n      Supplies\n\n    </ion-segment-button>\n\n  </ion-segment>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-slides class="forgot" #slider (ionSlideWillChange)="moveButton($event)">\n\n    <ion-slide>\n\n\n\n      <p class="dropdown">Lab Access Request</p>\n\n\n\n      <ion-card-content *ngIf=\'!labStatus\'>No Records Found</ion-card-content>\n\n\n\n      <ion-list *ngFor="let labAccess of userLabAccessJson; let i = index;" class="list_padding_for_card">\n\n        <ion-card>\n\n          <ion-card-content *ngIf=\'labStatus\'>\n\n            <ion-list (click)=\'actionSheetMethod(labAccess)\'>\n\n\n\n              <div class="cardsubheading"><b>{{labAccess.UserName}}</b></div>\n\n\n\n              <div class="cardsubtext"> Date : {{labAccess.CreatedDate}}</div>\n\n\n\n            </ion-list>\n\n          </ion-card-content>\n\n        </ion-card>\n\n      </ion-list>\n\n\n\n    </ion-slide>\n\n\n\n\n\n\n\n    <ion-slide>\n\n\n\n\n\n      <ion-grid>\n\n\n\n        <ion-row class="ion-align-items-center">\n\n          <ion-col>\n\n\n\n          </ion-col>\n\n          <ion-col>\n\n            <div>\n\n              <ion-label>\n\n                <button ion-button id="pistartbutton">\n\n                  <ion-datetime picker date [(ngModel)]="event.startDate" max="2099" min="1990"\n\n                    (ionChange)="startdatetime($event)"></ion-datetime>\n\n                  <ion-icon name=\'calendar\'></ion-icon> <br> <br><label class="btninlabel">Start Date</label>\n\n                </button>\n\n              </ion-label>\n\n            </div>\n\n            <div class="date_times">{{event.startDate| date: "MM-dd-yyyy"}}</div>\n\n          </ion-col>\n\n          <ion-col>\n\n            <div>\n\n              <ion-label>\n\n                <button ion-button id="piendbutton">\n\n                  <ion-datetime picker date [(ngModel)]="event.endDate" (ionChange)="enddatetime($event)" max="2099"\n\n                    min="1990"></ion-datetime>\n\n\n\n                  <ion-icon name=\'calendar\'></ion-icon> <br> <br><label class="btninlabel">End Date &nbsp;\n\n                    &nbsp;</label>\n\n                </button>\n\n\n\n              </ion-label>\n\n            </div>\n\n            <div class="date_timee">{{event.endDate   | date: "MM-dd-yyyy"}}</div>\n\n          </ion-col>\n\n          <ion-col>\n\n\n\n          </ion-col>\n\n        </ion-row>\n\n      </ion-grid>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n      <div text-center><button ion-button (click)="labRequestButton()" class="dateButton">Go</button></div>\n\n      <ion-card-content *ngIf=\'!invoiceStatus\'>No Records Found</ion-card-content>\n\n\n\n     \n\n        <ion-card *ngFor="let invoice of userInvoiceJson" class="list_padding_for_card">\n\n          <ion-card-content *ngIf=\'invoiceStatus\'>\n\n            <ion-list (click)=\'invoiceRequest(invoice)\' [ngSwitch]=invoice.Status>\n\n\n\n              <div class="cardheading"><b>{{invoice.InvoiceNumber}}</b></div>\n\n              <div class="cardsubheading"> Lab Name : {{invoice.LabName}}</div>\n\n              <div class="cardsubtext"> Facility : {{invoice.FacilityName}}</div>\n\n              <div *ngIf=\'!invoice.TotalAmount\' class="cardsubtext"> Total : 0.00 USD</div>\n\n              <div *ngIf=\'invoice.TotalAmount\' class="cardsubtext"> Total : {{invoice.TotalAmount | number:\'1.2-2\'}} USD\n\n              </div>\n\n              <div *ngSwitchCase="\'Approved\'" class="cardcontainertext"><span class="cardstatus">Status : </span><span\n\n                  class="cardstatusgreen">\n\n                  <ion-icon name="checkmark-circle" class="text"></ion-icon> {{invoice.Status}}\n\n                </span></div>\n\n              <div *ngSwitchCase="\'Payment Received (Partially)\'" class="cardcontainertext"><span\n\n                  class="cardstatus">Status : </span><span class="cardstatusgreen">\n\n                  <ion-icon name="checkmark-circle" class="text"></ion-icon> {{invoice.Status}}\n\n                </span></div>\n\n              <div *ngSwitchCase="\'Dispatched\'" class="cardcontainertext"><span class="cardstatus">Status : </span><span\n\n                  class="cardstatusorange">\n\n                  <ion-icon name="close-circle" class="text"></ion-icon> {{invoice.Status}}\n\n                </span></div>\n\n              <div *ngSwitchCase="\'Reviewed\'" class="cardcontainertext"><span class="cardstatus">Status : </span><span\n\n                  class="cardstatusorange">\n\n                  <ion-icon name="close-circle" class="text"></ion-icon> {{invoice.Status}}\n\n                </span></div>\n\n              <div *ngSwitchCase="\'In Review\'" class="cardcontainertext"><span class="cardstatus">Status : </span><span\n\n                  class="cardstatusorange">\n\n                  <ion-icon name="checkmark-circle" class="text"></ion-icon> {{invoice.Status}}\n\n                </span></div>\n\n              <div *ngSwitchCase="\'Generated\'" class="cardcontainertext"><span class="cardstatus">Status : </span><span\n\n                  class="cardstatusgreen">\n\n                  <ion-icon name="close-circle" class="text"></ion-icon> {{invoice.Status}}\n\n                </span></div>\n\n              <div *ngSwitchCase="\'Invoice Posted Partially \'" class="cardcontainertext"><span class="cardstatus">Status\n\n                  : </span><span class="cardstatusorange">\n\n                  <ion-icon name="close-circle" class="text"></ion-icon> {{invoice.Status}}\n\n                </span></div>\n\n              <div *ngSwitchCase="\'Invoice Posted\'" class="cardcontainertext"><span class="cardstatus">Status :\n\n                </span><span class="cardstatusorange">\n\n                  <ion-icon name="close-circle" class="text"></ion-icon> {{invoice.Status}}\n\n                </span></div>\n\n              <div *ngSwitchCase="\'Payment Received\'" class="cardcontainertext"><span class="cardstatus">Status :\n\n                </span><span class="cardstatusgreen">\n\n                  <ion-icon name="close-circle" class="text"></ion-icon> {{invoice.Status}}\n\n                </span></div>\n\n\n\n              <div class="cardcontainertext">\n\n                <span class="cardlefttime">\n\n                  <ion-icon name="time" class="text"></ion-icon> {{invoice.FromDate | date: "MM-dd-yyyy "}}\n\n                </span>\n\n                <span class="cardrighttime">\n\n                  <ion-icon name="time" class="text"></ion-icon> {{invoice.ToDate | date: "MM-dd-yyyy "}}\n\n                </span>\n\n              </div>\n\n\n\n\n\n            </ion-list>\n\n          </ion-card-content>\n\n        </ion-card>\n\n     \n\n\n\n    </ion-slide>\n\n\n\n    <ion-slide>\n\n     <ion-grid>\n\n\n\n        <ion-row class="ion-align-items-center">\n\n          <ion-col>\n\n\n\n          </ion-col>\n\n          <ion-col>\n\n            <div>\n\n              <ion-label>\n\n                <button ion-button id="pistartbutton">\n\n                  <ion-datetime picker date [(ngModel)]="event.startDate" max="2099" min="1990"\n\n                    (ionChange)="startdatetime($event)"></ion-datetime>\n\n                  <ion-icon name=\'calendar\'></ion-icon> <br> <br><label class="btninlabel">Start Date</label>\n\n                </button>\n\n              </ion-label>\n\n            </div>\n\n            <div class="date_times">{{event.startDate| date: "MM-dd-yyyy"}}</div>\n\n          </ion-col>\n\n          <ion-col>\n\n            <div>\n\n              <ion-label>\n\n                <button ion-button id="piendbutton">\n\n                  <ion-datetime picker date [(ngModel)]="event.endDate" (ionChange)="enddatetime($event)" max="2099"\n\n                    min="1990"></ion-datetime>\n\n\n\n                  <ion-icon name=\'calendar\'></ion-icon> <br> <br><label class="btninlabel">End Date &nbsp;\n\n                    &nbsp;</label>\n\n                </button>\n\n\n\n              </ion-label>\n\n            </div>\n\n            <div class="date_timee">{{event.endDate   | date: "MM-dd-yyyy"}}</div>\n\n          </ion-col>\n\n          <ion-col>\n\n\n\n          </ion-col>\n\n        </ion-row>\n\n      </ion-grid>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n      <div text-center><button ion-button (click)="labRequestButton()" class="dateButton">Go</button></div>\n\n      <ion-card-content class="cardalign" *ngIf=\'!SupStatus\'>No Records Found</ion-card-content>\n\n      <!-- \n\n [ngSwitch]=reservationAccess.Status (click)=\'actionSheetMethod(reservationAccess)\'\n\n     -->\n\n\n\n\n\n        <ion-card text-wrap *ngFor="let Supplies of userSuppliesJson; let i = index;" class="list_padding_for_card"\n\n        [ngSwitch]=Supplies.Status>\n\n          <ion-card-content *ngIf=\'SupStatus\'>\n\n            <ion-list (click)="detailpage(Supplies.OrderId)">\n\n\n\n              <div class="cardheading"><b>Order Number : {{Supplies.OrderNumber}}</b></div>\n\n              <div class="cardsubheading">User : {{Supplies.UserFullName}}</div>\n\n              <div class="cardsubtext">Date : {{Supplies.CreatedDate}}</div>\n\n              <div class="cardsubtext" *ngIf="!Supplies.TotalAmount">Total Amount : 0.00 {{Supplies.Currencycode}}</div>\n\n              <div class="cardsubtext" *ngIf="Supplies.TotalAmount">Total Amount :\n\n                {{Supplies.TotalAmount | number:\'1.2-2\'}} {{Supplies.Currencycode}}</div>\n\n              <div *ngSwitchCase="\'Approved\'" class="cardcontainertext">\n\n                <span class="cardstatus">Status : </span>\n\n                <span class="cardstatusgreen">\n\n                  <ion-icon name="checkmark-circle" class="text"></ion-icon> {{Supplies.Status}}\n\n                </span>\n\n              </div>\n\n              <div *ngSwitchCase="\'Created\'" class="cardcontainertext"><span class="cardstatus">Status : </span><span\n\n                  class="cardstatusgreen">\n\n                  <ion-icon name="checkmark-circle" class="text"></ion-icon> {{Supplies.Status}}\n\n                </span></div>\n\n              <div *ngSwitchCase="\'Completed\'" class="cardcontainertext"><span class="cardstatus">Status : </span><span\n\n                  class="cardstatusgreen">\n\n                  <ion-icon name="checkmark-circle" class="text"></ion-icon> {{Supplies.Status}}\n\n                </span></div>\n\n              <div *ngSwitchCase="\'Cancelled\'" class="cardcontainertext"><span class="cardstatus">Status : </span><span\n\n                  class="cardstatusred">\n\n                  <ion-icon name="close-circle" class="text"></ion-icon> {{Supplies.Status}}\n\n                </span></div>\n\n              <div *ngSwitchCase="\'Pending\'" class="cardcontainertext"><span class="cardstatus">Status : </span><span\n\n                  class="cardstatusred">\n\n                  <ion-icon name="close-circle" class="text"></ion-icon> {{Supplies.Status}}\n\n                </span></div>\n\n\n\n\n\n            </ion-list>\n\n          </ion-card-content>\n\n        </ion-card>\n\n\n\n\n\n\n\n\n\n    </ion-slide>\n\n\n\n  </ion-slides>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\p-iinbox\p-iinbox.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__providers_activitylogs_activitylogs__["a" /* ActivitylogsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_6__providers_notification_notification__["a" /* NotificationProvider */]])
    ], PIinboxPage);
    return PIinboxPage;
}());

//# sourceMappingURL=p-iinbox.js.map

/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InboxviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__p_iinbox_p_iinbox__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_notification_notification__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_activitylogs_activitylogs__ = __webpack_require__(18);
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
 * Generated class for the InboxviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var InboxviewPage = /** @class */ (function () {
    function InboxviewPage(logs, navCtrl, navParams, toastCtrl, storage, loading, http, platform, alertCtrl, actionctrl, notification) {
        this.logs = logs;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.loading = loading;
        this.http = http;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.actionctrl = actionctrl;
        this.notification = notification;
        this.checkStatus = false;
    }
    InboxviewPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.getInvoiceDetailsUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetInvoiceDetailsByInvoiceId';
            _this.updateInvoiceUrl = _this.appUrl + '/WS/IdeaElanService.svc/UpdateInvoicePaymentStatus';
            _this.userInvoiceJson = _this.navParams.get("invoicUserJson");
            _this.labId = _this.navParams.get("labId");
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
        });
    };
    InboxviewPage.prototype.ionViewDidEnter = function () {
        this.Status = this.userInvoiceJson.Status;
        if (this.userInvoiceJson.Status == "Approved" || this.userInvoiceJson.Status == "Payment Received (Partially)") {
            this.checkStatus = true;
        }
        else if (this.userInvoiceJson.Status == "Dispatched") {
            this.checkStatus = false;
        }
        this.InvoiceNumber = this.userInvoiceJson.InvoiceNumber;
        this.TotalAmount = this.userInvoiceJson.TotalAmount;
        this.sendInvoiceRequest();
    };
    InboxviewPage.prototype.sendInvoiceRequest = function () {
        var _this = this;
        this.http.post(this.getInvoiceDetailsUrl, {
            invoiceid: this.userInvoiceJson.InvoiceId,
            userid: this.userJson.UserId,
            usertoken: this.userJson.UserToken,
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.emptyString = false;
            _this.userInvoiceDetailsJson = resJSON;
            //  loader.dismiss();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            var resErr = JSON.stringify(error);
        });
    };
    InboxviewPage.prototype.invoiceRequest = function () {
        this.logs.insertlog("Invoice Approval ", "PI Inbox View page", "clicked Approve button ", "user approved invoice with invoice number : " + this.userInvoiceJson.InvoiceNumber + " ", this.userJson.UserId);
        this.notification.getUserDeviceDetails("facilityadmin", this.userInvoiceJson.ProviderId, "INV", " invoice number : " + this.userInvoiceJson.InvoiceNumber + " has been approved ", "Invoice approved");
        this.updateInvoiceRequest(this.userInvoiceJson.InvoiceId, "Approved", this.labId);
    };
    InboxviewPage.prototype.updateInvoiceRequest = function (invoiceid, status, groupId) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        this.http.post(this.updateInvoiceUrl, {
            invoiceid: invoiceid,
            status: status,
            paiddate: __WEBPACK_IMPORTED_MODULE_4_moment__().format("MM/DD/YYYY"),
            labid: groupId,
            user: this.userJson.EmailAddress,
            note: ""
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.InvoiceUpdateJson = resJSON;
            _this.notification.getUserDeviceDetails("facilityadmin", "0", "INV", "Invoice Number : " + _this.userInvoiceJson.InvoiceNumber + " has been approved", "Invoice Approved");
            loader.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Message',
                subTitle: 'Status Updated Successfully!',
                buttons: ['OK']
            });
            alert.present();
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__p_iinbox_p_iinbox__["a" /* PIinboxPage */]);
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
        });
    };
    InboxviewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-inboxview',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\inboxview\inboxview.html"*/'  <ion-header hideBackButton="true">\n\n\n\n    <ion-navbar>\n\n      <button ion-button  icon-only menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n  <ion-title ion-align=\'center\'>View Invoice</ion-title>\n\n    </ion-navbar>\n\n  \n\n  </ion-header>\n\n\n\n<ion-content padding>\n\n  \n\n        <ion-row><p class="cardcontents"> <b>Invoice Number</b> <br />{{InvoiceNumber}}</p></ion-row><hr>\n\n        <ion-row>\n\n          <p *ngIf=\'TotalAmount\' class="cardcontents"> <b>Amount</b> <br /> {{TotalAmount| number:\'1.2-2\'}} USD</p>\n\n          <p *ngIf=\'!TotalAmount\' class="cardcontents"> <b>Amount</b> <br /> 0.00 USD</p>\n\n        </ion-row><hr>\n\n        <ion-row><p class="cardcontents"> <b>Discount</b> <br /> 0.00 %</p></ion-row><hr>\n\n        <ion-row><p class="cardcontents"> <b>Tax</b> <br /> 0.00 %</p></ion-row><hr>\n\n        <ion-row><p *ngIf=\'TotalAmount\' class="cardcontents"> <b>Total Amount</b> <br /> {{TotalAmount | number:\'1.2-2\'}} USD</p>\n\n          <p *ngIf=\'!TotalAmount\' class="cardcontents"> <b>Total Amount</b> <br /> 0.00 USD</p>\n\n        </ion-row>\n\n    \n\n     <hr>\n\n<p style=" font-size: 18px; color:#1976D2;">Invoice Status</p>\n\n<ion-row><p class="cardcontents"><b>Status:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{Status}}</p></ion-row>\n\n<ion-row><p class="cardcontents" *ngIf=\'!checkStatus\'> Note : <ion-item id="rounded"> <ion-input type="text" value=""></ion-input></ion-item></p></ion-row>\n\n<div text-center><button ion-button (click)=\'invoiceRequest()\'  *ngIf=\'!checkStatus\'>Approve Invoice</button></div>\n\n\n\n     <hr>\n\n<p style=" font-size: 18px; color:#1976D2;">Invoice Transactions</p>  \n\n   \n\n        <ion-list *ngFor="let invoiceDetails of userInvoiceDetailsJson; let i = index;"  style=" border: 0.5px solid #000000;">\n\n          <ion-card-content><ion-list >\n\n            <p class="cardcontents"> <b>Status:</b> {{invoiceDetails.Status}}</p>\n\n            <p class="cardcontents"> <b>User:</b> {{invoiceDetails.UserName}}</p>\n\n            <p class="cardcontents"> <b>Lab:</b> {{invoiceDetails.LabName}}</p>\n\n            <p class="cardcontents"> <b>Account Code:</b> {{invoiceDetails.AccountCode}}</p>\n\n            <p class="cardcontents"> <b>Service Type:</b> {{invoiceDetails.Type}}</p>\n\n            <p class="cardcontents"> <b>Name:</b> {{invoiceDetails.Name}}</p>\n\n            <p class="cardcontents"> <b>Date:</b> {{invoiceDetails.TransactionDate | date: "MM-dd-yyyy "}}</p>\n\n            <p class="cardcontents"> <b>Description:</b> {{invoiceDetails.Other}}</p> \n\n            <p class="cardcontents"> <b>Quantity:</b> {{invoiceDetails.UsageHours}}</p>\n\n            <p class="cardcontents"> <b>Rate:</b> {{invoiceDetails.Unit}}</p>\n\n            <p *ngIf=\'!invoiceDetails.Fee\' class="cardcontents"> <b>Total:</b> 0.00 {{invoiceDetails.CurrencyCode}}</p>\n\n            <p *ngIf=\'invoiceDetails.Fee\' class="cardcontents"> <b>Total:</b> {{invoiceDetails.Fee | number:\'1.2-2\'}} {{invoiceDetails.CurrencyCode}}</p>\n\n          </ion-list>\n\n        </ion-card-content>\n\n</ion-list>\n\n \n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\inboxview\inboxview.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__providers_activitylogs_activitylogs__["a" /* ActivitylogsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_6__providers_notification_notification__["a" /* NotificationProvider */]])
    ], InboxviewPage);
    return InboxviewPage;
}());

//# sourceMappingURL=inboxview.js.map

/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LabDashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_chart_js__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_chart_js__);
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
 * Generated class for the LabDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LabDashboardPage = /** @class */ (function () {
    function LabDashboardPage(navCtrl, toastCtrl, navParams, storage, loading, http) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.loading = loading;
        this.http = http;
    }
    LabDashboardPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.getLabUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetLabsUserIsAdmin';
            _this.getLabGraphUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetFrequentlyUsedInstruments';
            _this.getDashboardUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetUserDashboardDetails';
            _this.getLabDashboardUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetLabDashboardDetails';
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
        });
        this.storage.get('roleType').then(function (val) {
            if (val == "user") {
                _this.userType = true;
            }
            else if (val == "super" || val == "admin" || val == "providerAdmin" || val == "labAdmin") {
                _this.userType = false;
            }
            else {
            }
        });
    };
    LabDashboardPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.get('userDetails').then(function (val1) {
            if (_this.userType) {
                _this.sendDashboardDetails();
            }
            else if (!_this.userType) {
                _this.sendLabRequest();
            }
        });
    };
    LabDashboardPage.prototype.sendLabRequest = function () {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        // loader.present();
        this.http.post(this.getLabUrl, {
            userid: this.userJson.UserId,
            usertoken: this.userJson.UserToken,
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userLabJson = resJSON;
            _this.labid = resJSON[0].GroupId;
            // loader.dismiss();
            _this.emptyString = false;
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            //  loader.dismiss();
            _this.emptyString = true;
        });
    };
    LabDashboardPage.prototype.sendDashboardDetails = function () {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        this.http.post(this.getDashboardUrl, {
            userid: this.userJson.UserId,
            usertoken: this.userJson.UserToken,
        })
            .subscribe(function (data) {
            //RESPONSE
            _this.fullString = true;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.monthlyAmt = resJSON.MonthlyAmount;
            _this.monthlyCount = resJSON.MonthlyCount;
            _this.quaterlyAmt = resJSON.QuarterlyAmount;
            _this.quaterlyCount = resJSON.QuarterlyCount;
            // loader.dismiss();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            _this.fullString = false;
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
        });
    };
    LabDashboardPage.prototype.sendLabGraphDetails = function (graphProviderValue) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        //  loader.present();
        this.http.post(this.getLabGraphUrl, {
            userid: this.userJson.UserId,
            labid: graphProviderValue,
            providerid: "0"
        })
            .subscribe(function (data) {
            //RESPONSE
            var chartdata = [];
            var chartlabels = [];
            _this.fullString = true;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            for (var i = 0; i < resJSON.length; i++) {
                chartlabels.push(resJSON[i].ResourceName);
                chartdata.push(resJSON[i].Apptcount);
            }
            if (_this.doughnutChart != null) {
                _this.doughnutChart.destroy();
            }
            _this.doughnutChart = new __WEBPACK_IMPORTED_MODULE_4_chart_js__["Chart"](_this.doughnutCanvas.nativeElement, {
                /* Modified by Abey Abraham */
                type: 'doughnut',
                data: {
                    labels: chartlabels,
                    datasets: [{
                            label: '',
                            data: chartdata,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                            ],
                            hoverBackgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                                "#FFCE56",
                                "#FF6384",
                            ]
                        }]
                }, options: {
                    showDatasetLabels: true,
                    cutoutPercentage: 41,
                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem, data) {
                                return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
                            }
                        }
                    }
                }
            });
            if (_this.barChart != null) {
                _this.barChart.destroy();
            }
            _this.barChart = new __WEBPACK_IMPORTED_MODULE_4_chart_js__["Chart"](_this.barCanvas.nativeElement, {
                type: 'bar',
                data: {
                    labels: chartlabels,
                    datasets: [{
                            label: ' ',
                            data: chartdata,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                            ],
                            borderWidth: 1
                        }]
                },
                options: {
                    showDatasetLabels: true,
                    cutoutPercentage: 41,
                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem, data) {
                                return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
                            }
                        }
                    },
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Percentage'
                                },
                                ticks: { minRotation: 45,
                                    beginAtZero: true
                                }
                            }],
                        xAxes: [{
                                ticks: {
                                    minRotation: 45,
                                    autoSkip: false
                                }
                            }]
                    }
                }
            });
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            _this.fullString = false;
            //  loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
        });
    };
    LabDashboardPage.prototype.sendLabDashboardDetails = function (providerValue) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        //loader.present();
        this.http.post(this.getLabDashboardUrl, {
            userid: this.userJson.UserId,
            usertoken: this.userJson.UserToken,
            labid: providerValue
        })
            .subscribe(function (data) {
            //RESPONSE
            _this.fullString = true;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.monthlyAmt = resJSON.MonthlyAmount;
            _this.monthlyCount = resJSON.MonthlyCount;
            _this.quaterlyAmt = resJSON.QuarterlyAmount;
            _this.quaterlyCount = resJSON.QuarterlyCount;
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            _this.fullString = false;
            //  loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
        });
    };
    LabDashboardPage.prototype.updateChange = function () {
        if (!this.emptyString) {
            this.labid;
            this.sendLabDashboardDetails(this.labid);
            this.sendLabGraphDetails(this.labid);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('barCanvas'),
        __metadata("design:type", Object)
    ], LabDashboardPage.prototype, "barCanvas", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('doughnutCanvas'),
        __metadata("design:type", Object)
    ], LabDashboardPage.prototype, "doughnutCanvas", void 0);
    LabDashboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-lab-dashboard',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\lab-dashboard\lab-dashboard.html"*/'<!--\n\n  Generated template for the LabDashboardPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header hideBackButton="true">\n\n\n\n    <ion-navbar>\n\n      <button ion-button  icon-only menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n  <ion-title ion-align=\'center\'>Dashboard</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content >\n\n  <ion-row  [class.hide]="userType" class="rowstyle" >\n\n    <ion-col >\n\n        <p class="dropdown" >Lab</p>\n\n  </ion-col>\n\n  <ion-col class="colstyle">\n\n    <ion-select  *ngIf=\'emptyString\' [(ngModel)]="labid" disabled="true" placeholder=\'No Records Found\' multiple="false" (ionChange)="updateChange()">\n\n      </ion-select>\n\n      <ion-select  *ngIf=\'!emptyString\' [(ngModel)]="labid"  placeholder=\'Lab\' multiple="false" (ionChange)="updateChange()">\n\n          <ion-option *ngIf=\'emptyString\'  value="0">No Records Found</ion-option>  \n\n        <ion-option *ngFor="let lab of userLabJson; let i = index;" selected="{{(i==0)}}" value="{{lab.GroupId}}">{{lab.GroupName}}</ion-option>\n\n          </ion-select>\n\n          \n\n   </ion-col>\n\n  \n\n</ion-row>\n\n<hr>\n\n<hr [class.hide]="true">\n\n\n\n<p class="cardslayout">Instrument Usage</p>\n\n<table>\n\n  <tr>\n\n    <th>Monthly</th>\n\n    \n\n  </tr>\n\n  <tr>\n\n    <td>No. of Reservations : <b>{{monthlyCount}}</b></td>\n\n   \n\n  </tr>\n\n  <tr>\n\n    <td>Total Amount : <b>{{monthlyAmt}}</b></td>\n\n    \n\n  </tr>\n\n  \n\n</table>\n\n&nbsp;\n\n<table>\n\n  <tr>\n\n    <th>Quaterly</th>\n\n    \n\n  </tr>\n\n  <tr>\n\n    <td>No. of Reservations : <b>{{quaterlyCount}}</b></td>\n\n   \n\n  </tr>\n\n  <tr>\n\n    <td>Total Amount  : <b>{{quaterlyAmt}}</b></td>\n\n    \n\n  </tr>\n\n  \n\n</table>\n\n\n\n\n\n<p ion-align="center">\n\n    <canvas #doughnutCanvas width="450" height="350"></canvas>\n\n    </p>\n\n    <p ion-align="left"><canvas #barCanvas width="450" height="350"></canvas>\n\n    </p>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\lab-dashboard\lab-dashboard.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]])
    ], LabDashboardPage);
    return LabDashboardPage;
}());

//# sourceMappingURL=lab-dashboard.js.map

/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignInModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_device__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__instrument_search_instrument_search__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__reset_password_reset_password__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__signup_signup__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pin_pin__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_fcm_fcm__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_forms__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_activitylogs_activitylogs__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_message_message__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/* Created by Abey Abraham */

















/**
 * Generated class for the SignInModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SignInModalPage = /** @class */ (function () {
    function SignInModalPage(view, message, navCtrl, fcm, navParams, storage, loading, http, toastCtrl, device, alertCtrl, formBuilder, logs) {
        this.view = view;
        this.message = message;
        this.navCtrl = navCtrl;
        this.fcm = fcm;
        this.navParams = navParams;
        this.storage = storage;
        this.loading = loading;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.device = device;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.logs = logs;
        this.result = [];
        this.isOtp = false;
    }
    SignInModalPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        //Modified by Anto Rupak
        this.isLoginAll = true;
        this.isPhoneNumber = false;
        this.regexpem = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
        this.storage.get("InsitutionName").then(function (name) {
            if (name == null) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__pin_pin__["a" /* PinPage */]);
            }
            else {
                _this.insitutionName = name;
            }
        });
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.fullUrl = _this.appUrl + '/WS/IdeaElanService.svc/ValidateLogin';
            _this.getDetails = _this.appUrl + '/WS/IdeaElanService.svc/GetUserDetails';
            _this.registerDevice = _this.appUrl + '/WS/IdeaElanService.svc/RegisterDevice';
            _this.notificationUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetMobileAppNotifications';
            _this.sendEmailUrl = _this.appUrl + '/WS/IdeaElanService.svc/SendEmail';
        });
        this.storage.get('InternalDomain').then(function (val) {
            _this.internalDomain = val;
        });
        this.storage.get('IsSSOEnabled').then(function (val) {
            _this.IsSSOEnabled = val;
        });
        this.deviceModel = this.device.model;
        this.devicePlatform = this.device.platform;
        this.deviceSerial = this.device.serial;
        this.deviceId = this.device.uuid;
        this.deviceVersion = this.device.version;
        this.pagetypeval = this.navParams.get('pagename');
        this.searchval = this.navParams.get('searchval');
    };
    SignInModalPage.prototype.ionViewDidEnter = function () {
    };
    SignInModalPage.prototype.postData = function () {
        if (this.isOtp) {
            if (this.otp == null || this.username == null || this.otp == "" || this.username == "") {
                this.message.showMessage('Alert', 'Please Enter the OTP');
            }
            else {
                this.sendOtp();
            }
        }
        else {
            if (this.password == null || this.username == null || this.password == "" || this.username == "") {
                this.message.showMessage('Alert', 'Enter the Credentials');
            }
            else {
                this.sendRequest(this.username, this.password);
            }
        }
    };
    //REQUEST METHOD
    SignInModalPage.prototype.sendRequest = function (m_username, m_password) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Signing In"
        });
        // loader.present();
        //SEDNING REQUEST
        this.http.post(this.fullUrl, {
            username: m_username,
            password: m_password
        })
            .subscribe(function (data) {
            //RESPONSE
            loader.dismiss();
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userResponseJson = resJSON;
            _this.roleType = resJSON.UserRole;
            _this.phoneNumber = resJSON.Phone;
            if (_this.isOtp) {
                _this.phoneEmailOtpRequest();
            }
            else {
                _this.sendToNaviPage();
            }
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
                if (_this.isOtp) {
                    _this.message.showMessage('Alert', 'Please check the username');
                }
                else {
                    _this.message.showMessage('Alert', resErrJSON.statusText);
                }
            }
        });
    };
    SignInModalPage.prototype.phoneEmailOtpRequest = function () {
        this.randomNumber = String(100000 + Math.floor(Math.random() * 999999));
        this.storage.set('otp', this.randomNumber);
        if (this.phoneNumber.toLowerCase().includes('ext')) {
            this.sendEmailRequest(this.username, "mail");
        }
        else {
            this.phoneNumber = this.phoneNumber.replace(/[^0-9]/g, '');
            if (this.phoneNumber.length > 11) {
                this.sendingOtpRequest();
            }
            else {
                this.isLoginAll = false;
                this.isPhoneNumber = true;
            }
        }
    };
    SignInModalPage.prototype.sendingOtpRequest = function () {
        var _this = this;
        this.otpMessage = "Enter the code " + this.randomNumber + " where prompted in the IE Infinity mobile app";
        this.phoneMessage = 'Verification Code has been sent to your registered email address : &nbsp; <b>' + this.username + '</b> and phone : <b>' + this.phoneNumber + '</b>. Please enter the verification code to login';
        var smsurl = "https://platform.clickatell.com/messages/http/send?apiKey=IimV6RBFR2eit558aiGF7g==&to=" + this.phoneNumber + "&content=" + this.otpMessage;
        this.http.get(smsurl)
            .subscribe(function (data) {
            var resjSON = JSON.stringify(data);
            var result = JSON.parse(resjSON);
            if (result.messages[0].accepted) {
                _this.sendEmailRequest(_this.username, 'phone');
            }
            else {
                _this.sendEmailRequest(_this.username, 'mail');
            }
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            //  this.barcode=resErr;
            if (resErrJSON.status == 400) {
            }
        });
    };
    SignInModalPage.prototype.sendToNaviPage = function () {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Signing In"
        });
        this.storage.set('devicetoken', this.tok);
        this.userId = this.userResponseJson.UserId;
        this.userToken = this.userResponseJson.UserToken;
        if (!this.userResponseJson.hasOwnProperty('UserRole')) {
            this.storage.set('roleType', "user");
            loader.present().then(function () {
                return _this.sendRegisterDeviceRequest();
            }).then(function () {
                return _this.sendDetailsRequest();
            }).then(function () { loader.dismiss(); });
        }
        else {
            this.storage.set('userRole', this.userResponseJson.UserRole);
            if (this.roleType.includes("Super Admin")) {
                this.storage.set('roleType', "super");
            }
            else if (this.roleType.includes("Institution Admin")) {
                this.storage.set('roleType', "admin");
            }
            else if (this.roleType.includes("Provider Admin")) {
                this.storage.set('roleType', "providerAdmin");
            }
            else if (this.roleType.includes("Group Admin")) {
                this.storage.set('roleType', "labAdmin");
            }
            else if (this.userResponseJson.UserRole.includes("User")) {
                this.storage.set('roleType', "user");
            }
            var externalUser = this.userResponseJson.UserRole.includes("External User");
            this.storage.set('userType', externalUser);
            loader.present().then(function () {
                return _this.sendRegisterDeviceRequest();
            }).then(function () {
                return _this.sendDetailsRequest();
            }).then(function () { loader.dismiss(); });
        }
    };
    SignInModalPage.prototype.sendOtp = function () {
        var _this = this;
        this.storage.get("otp").then(function (confirmOtp) {
            if (confirmOtp == _this.otp) {
                _this.sendToNaviPage();
            }
            else {
                _this.message.showMessage('Alert', 'Please the Enter the Valid OTP ! ');
            }
        });
    };
    SignInModalPage.prototype.changeIsLogin = function () {
        this.otp = '';
        this.updatePhoneNumber = null;
        this.isLoginAll = true;
        this.isPhoneNumber = false;
        if (this.isOtp) {
            this.isOtp = true;
        }
        else {
            this.isOtp = false;
        }
    };
    SignInModalPage.prototype.sendEmailRequest = function (username, type) {
        var _this = this;
        this.emailSubject = "IE Infinity Verification Code";
        this.emailMessage = 'Verification Code has been sent to your registered email address <b>' + this.username + '</b>. Please enter the verification code to login';
        this.otpMessage = "Enter this code where prompted in the IE Infinity mobile app <br/><br/><h3>" + this.randomNumber + "</h3>";
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Sending OTP . . ."
        });
        loader.present();
        //SEDNING REQUEST
        this.http.post(this.sendEmailUrl, {
            emailaddress: username,
            emailmessage: this.otpMessage,
            emailsubject: this.emailSubject
        })
            .subscribe(function (data) {
            loader.dismiss();
            _this.isLoginAll = true;
            _this.isPhoneNumber = false;
            if (type == 'mail') {
                _this.message.showMessage('Message', _this.emailMessage);
            }
            else {
                _this.message.showMessage('Message', _this.phoneMessage);
            }
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
        });
    };
    SignInModalPage.prototype.updatePhoneButton = function () {
        if (this.updatePhoneNumber != null) {
            if (String(this.updatePhoneNumber).length < 11 || String(this.updatePhoneNumber).includes('.')) {
                this.message.showMessage('Alert', 'Enter the valid Phone Number');
            }
            else {
                this.sendPhoneUpdateRequest();
            }
        }
        else {
            this.message.showMessage('Message', 'Please Enter the Phone Number ');
        }
    };
    SignInModalPage.prototype.sendPhoneUpdateRequest = function () {
        var _this = this;
        this.updatePhoneRequestButton = [
            {
                text: 'OK',
                handler: function () {
                    _this.sendRequest(_this.username, "");
                }
            }
        ];
        this.updatePhoneNumberUrl = this.appUrl + '/WS/IdeaElanService.svc/UpdateUserPhone';
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Updating Phone Number . . ."
        });
        loader.present();
        //SEDNING REQUEST
        this.http.post(this.updatePhoneNumberUrl, {
            email: this.username,
            phone: this.updatePhoneNumber
        })
            .subscribe(function (data) {
            _this.isLoginAll = true;
            _this.isPhoneNumber = false;
            loader.dismiss();
            _this.updatePhoneNumber = null;
            _this.message.showMessageButton("Message", "Phone number has been updated", _this.updatePhoneRequestButton);
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            _this.isLoginAll = true;
            _this.isOtp = false;
            _this.isPhoneNumber = false;
            loader.dismiss();
            _this.updatePhoneNumber = null;
        });
    };
    //GET USER DETAILS METHOD
    SignInModalPage.prototype.sendDetailsRequest = function () {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Getting User Details"
        });
        // loader.present();
        //SEDNING REQUEST
        this.http.post(this.getDetails, {
            email: this.username
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userDetailsJson = resJSON;
            _this.storage.set('userDetails', _this.userDetailsJson);
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__instrument_search_instrument_search__["a" /* InstrumentSearchPage */], {
                loginStatus: "success",
                searchval: "" + _this.searchval
            }).then(function () {
                var startIndex = _this.navCtrl.getActive().index - 1;
                _this.navCtrl.remove(startIndex, 1);
            });
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            //   loader.dismiss();
        });
    };
    //REGISTER DEVICE METHOD
    SignInModalPage.prototype.sendRegisterDeviceRequest = function () {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Registering Device"
        });
        this.fcm.getToken().then(function (token) {
            _this.tok = token;
            _this.http.post(_this.registerDevice, {
                userid: _this.userId,
                deviceid: _this.deviceId,
                devicetoken: _this.tok,
                devicename: _this.devicePlatform,
                devicemodel: _this.deviceModel,
                deviceversion: _this.deviceVersion,
                usertoken: _this.userToken
            })
                .subscribe(function (data) {
                //RESPONSE
                var resSTR = JSON.stringify(data);
                var resJSON = JSON.parse(resSTR);
                _this.storage.set('userDeviceResponse', resJSON.RegisterDeviceResult);
                //  loader.dismiss(); 
            }, //ERROR HANDLING
            function (//ERROR HANDLING
            error) {
                loader.dismiss();
            });
        });
    };
    SignInModalPage.prototype.cancel = function () {
        this.view.dismiss();
    };
    //Modifed by Anto Rupak
    SignInModalPage.prototype.searchInstrument = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__instrument_search_instrument_search__["a" /* InstrumentSearchPage */]);
    };
    //Modifed by Anto Rupak
    SignInModalPage.prototype.resetPassword = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__reset_password_reset_password__["a" /* ResetPasswordPage */]);
    };
    //Modifed by Anto Rupak
    SignInModalPage.prototype.signup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__signup_signup__["a" /* SignupPage */]);
    };
    SignInModalPage.prototype.emailChange = function () {
        if (this.regexpem.test(this.username) == false || this.username == null || this.username == '') {
            this.isOtp = false;
            this.message.showMessage('Alert', "Enter a valid email address ");
            return false;
        }
        else {
            if (this.username.toLowerCase().indexOf(this.internalDomain) > 0 && this.IsSSOEnabled == "true") {
                this.isOtp = true;
                this.otp = '';
                this.sendRequest(this.username, "");
            }
            else {
                this.isOtp = false;
            }
        }
    };
    SignInModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-sign-in-modal',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\sign-in-modal\sign-in-modal.html"*/'\n\n<ion-content class="main-view" padding #container>\n\n  <div class="overlay" ></div>\n\n  <ion-scroll  class="modal_content" scrollY=true >\n\n  <div *ngIf=\'isLoginAll\'>\n\n    <!-- Content here -->\n\n\n\n    <div class="input-icon-wrap" style="margin-top: 1em">\n\n      <span class="input-icon">\n\n        <ion-icon name="mail"></ion-icon>\n\n      </span>\n\n      <input type="email" class="input-with-icon" placeholder="Email ID" [(ngModel)]="username" id="user_email"\n\n        autocomplete="new-password" (change)="emailChange()">\n\n    </div>\n\n    <div class="input-icon-wrap" style="margin-top: 1em"  *ngIf=\'!isOtp\'>\n\n      <span class="input-icon">\n\n        <ion-icon name="lock"></ion-icon>\n\n      </span>\n\n      <input type="password" class="input-with-icon" autocomplete="new-password" placeholder="Password"\n\n        [(ngModel)]="password" id="user_password" (keyup.enter)="postData()">\n\n    </div>\n\n    <div class="input-icon-wrap" style="margin-top: 1em" *ngIf=\'isOtp\'>\n\n      <span class="input-icon">\n\n        <ion-icon name="lock"></ion-icon>\n\n      </span>\n\n      <input type="number" class="input-with-icon"  placeholder="OTP" [(ngModel)]="otp" (keyup.enter)="postData()">\n\n    </div>\n\n    <!--Modified by Anto Rupak-->\n\n    <span>\n\n      <p class="forgot" ion-align=\'left\' (click)=\'phoneEmailOtpRequest()\' *ngIf=\'isOtp\'>Resend OTP</p>\n\n    </span> \n\n   \n\n\n\n    <ion-row center>\n\n        <ion-col text-center>\n\n            <button ion-button full (click)="cancel()">Cancel</button><br />\n\n          \n\n          </ion-col>\n\n      <ion-col text-center>\n\n        <button ion-button full (click)="postData()">Sign In</button><br />\n\n      \n\n      </ion-col>\n\n    </ion-row>\n\n\n\n   \n\n\n\n  </div>\n\n  <div *ngIf=\'isPhoneNumber\'>\n\n\n\n    <div class="input-icon-wrap" style="margin-top: 1em">\n\n      <span class="input-icon">\n\n        <ion-icon name="call"></ion-icon>\n\n      </span>\n\n      <input type="number" class="input-with-icon" placeholder="Enter Correct Phone Number" [(ngModel)]="updatePhoneNumber">\n\n    </div>\n\n\n\n    <ion-row center>\n\n      <ion-col text-center>\n\n        <button ion-button full (click)="updatePhoneButton()">Update Phone</button><br />\n\n        \n\n        <span class="name" style="text-decoration:underline; color:#1976D2" (click)=\'changeIsLogin()\'>SignIn</span>\n\n      </ion-col>\n\n\n\n    </ion-row>\n\n\n\n  </div>\n\n</ion-scroll>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\sign-in-modal\sign-in-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_12__providers_message_message__["a" /* MessageProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_9__providers_fcm_fcm__["a" /* FcmProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_10__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_11__providers_activitylogs_activitylogs__["a" /* ActivitylogsProvider */]])
    ], SignInModalPage);
    return SignInModalPage;
}());

//# sourceMappingURL=sign-in-modal.js.map

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_nertworkrequest_nertworkrequest__ = __webpack_require__(473);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_message_message__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









//Created by Anto rupak & Modification By Sumit
/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ResetPasswordPage = /** @class */ (function () {
    function ResetPasswordPage(network, navCtrl, navParams, http, loading, storage, alertCtrl, message) {
        this.network = network;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.loading = loading;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.message = message;
        this.passwordResetForm = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormGroup */]({
            email: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
        });
        this.emailShow = true;
    }
    ResetPasswordPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.resetPasswordUrl = _this.appUrl + '/WS/IdeaElanService.svc/ResetPassword';
        });
    };
    ResetPasswordPage.prototype.closePage = function () {
        this.navCtrl.pop();
    };
    ResetPasswordPage.prototype.changePassword = function () {
        var _this = this;
        if (this.passwordResetForm.get('email').hasError('required') || this.passwordResetForm.get('email').hasError('pattern')) {
            this.emailShow = false;
        }
        else {
            this.emailShow = true;
            var loader_1 = this.loading.create({
                spinner: "crescent",
                content: "Registering Device"
            });
            this.http.post(this.resetPasswordUrl, {
                username: this.emailId,
                password: "",
            })
                .subscribe(function (data) {
                //RESPONSE  
                _this.emailId = "";
                var resSTR = JSON.stringify(data);
                var resJSON = JSON.parse(resSTR);
                if (resJSON == "success") {
                    _this.message.showMessage("Message", "Password change link has been sent to your mail address");
                }
                else {
                    _this.message.showMessage("Alert", "Email not found !");
                }
            }, //ERROR HANDLING
            function (//ERROR HANDLING
            error) {
                loader_1.dismiss();
            });
        }
    };
    ResetPasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'page-reset-password',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\reset-password\reset-password.html"*/'<!--Created by Anto Rupak-->\n\n\n\n<!--\n\n  Generated template for the ResetPasswordPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar hideBackButton>\n\n    <ion-title>Forgot Password</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<!--<ion-content>\n\n  <form [formGroup]="passwordResetForm">\n\n    <ion-row>\n\n      <ion-item>\n\n        <ion-label stacked>Email Id</ion-label>\n\n        <ion-input type="text" [(ngModel)]="emailId" class="input-with-icon" formControlName="email" name="email">\n\n        </ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item [hidden]="emailShow" no-lines\n\n        *ngIf="passwordResetForm.get(\'email\').hasError(\'pattern\') || passwordResetForm.get(\'email\').hasError(\'required\')">\n\n        <ion-label stacked color="danger"\n\n          *ngIf="passwordResetForm.get(\'email\').hasError(\'pattern\') || passwordResetForm.get(\'email\').hasError(\'required\')">\n\n          please enter a valid email id\n\n        </ion-label>\n\n      </ion-item>\n\n    </ion-row>\n\n    <ion-row center>\n\n      <ion-col text-center>\n\n        <button ion-button full (click)="changePassword()">Update</button><br />\n\n        <span style="text-decoration:underline; color:#0096ff" (click)="closePage()">Back to Login</span>\n\n      </ion-col>\n\n    </ion-row>\n\n  </form>\n\n</ion-content>-->\n\n\n\n<ion-content padding>\n\n    <div id="over">\n\n        <img src="assets/imgs/splash.png" alt="couldn\'t load">\n\n      </div>\n\n  <form [formGroup]="passwordResetForm">\n\n    <div>\n\n      <div class="input-icon-wrap" style="margin-top: 1em">\n\n          <span class="input-icon">\n\n              <ion-icon name="lock"></ion-icon>\n\n            </span>\n\n        <input type="text" class="input-with-icon"  placeholder="Email ID" formControlName="email" [(ngModel)]="emailId" >\n\n      \n\n      </div>\n\n    \n\n        <ion-item stacked color="danger" [hidden]="emailShow" no-lines\n\n        *ngIf="passwordResetForm.get(\'email\').hasError(\'pattern\') || passwordResetForm.get(\'email\').hasError(\'required\')">\n\n          please enter a valid email id\n\n        </ion-item>\n\n \n\n      <ion-row center>\n\n        <ion-col text-center>\n\n          <button ion-button full (click)="changePassword()">Update</button><br />\n\n          <span style="text-decoration:underline; color:#0096ff" (click)="closePage()">Back to Login</span>\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n\n\n    </div>\n\n  </form>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\reset-password\reset-password.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_nertworkrequest_nertworkrequest__["a" /* NertworkrequestProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_6__providers_message_message__["a" /* MessageProvider */]])
    ], ResetPasswordPage);
    return ResetPasswordPage;
}());

//# sourceMappingURL=reset-password.js.map

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__signin_signin__ = __webpack_require__(63);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, navParams, http, loading, storage, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.loading = loading;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.regexpem = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
        this.regexp = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,10}$');
    }
    SignupPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.signupUrl = _this.appUrl + '/WS/IdeaElanService.svc/InsertUpdateUser';
        });
    };
    SignupPage.prototype.registerUser = function () {
        var _this = this;
        /* Modified by Abey Abraham */
        if (this.fname == null || this.lname == null || this.email == null || this.password == null || this.cpassword == null) {
            this.alert("Please Enter all the required fields.");
            return false;
        }
        if (this.password != this.cpassword) {
            this.alert("Password Mismatch");
            return false;
        }
        if (this.regexpem.test(this.email) == false) {
            this.alert("Enter a valid email address ");
            return false;
        }
        if (this.regexp.test(this.password) == false) {
            this.alert("Enter a valid password ");
            return false;
        }
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Signing Up..."
        });
        loader.present();
        this.http.post(this.signupUrl, {
            firstname: this.fname,
            lastname: this.lname,
            emailaddress: this.email,
            userid: "0",
            password: this.cpassword,
            address: "",
            city: "",
            state: "",
            zip: "",
            country: "",
            phone: "",
            syncreservation: ""
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.alert("Registration successful. Click the verification link sent to your email to confirm registration.");
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__signin_signin__["a" /* SigninPage */]);
            loader.dismiss();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 500) {
                _this.alert(resErrJSON.statusText);
            }
            else if (resErrJSON.status == 400) {
                _this.alert('Internal server error');
            }
        });
    };
    SignupPage.prototype.alert = function (toastStr) {
        var alert = this.alertCtrl.create({
            title: 'Alert',
            message: toastStr,
            buttons: ['Ok']
        });
        alert.present();
    };
    SignupPage.prototype.signIn = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__signin_signin__["a" /* SigninPage */]);
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-signup',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\signup\signup.html"*/'<!--\n\n  Generated template for the SignupPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<!--Created by Anto Rupak-->\n\n\n\n<ion-header>\n\n  <ion-navbar hideBackButton>\n\n    <ion-title>Registration</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<!--<ion-content>\n\n  <div class="container">\n\n   \n\n    <div class="input-group input-group-lg" style="margin-top: 1em">\n\n      <div class="input-group-prepend">\n\n        <span class="input-group-text" id="inputGroup-sizing-lg">\n\n          <ion-icon name="person"></ion-icon>\n\n        </span>\n\n      </div>\n\n      <input type="text" class="input-with-icon" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"\n\n        placeholder="First Name*" [(ngModel)]="fname">\n\n    </div>\n\n    <div class="input-group input-group-lg" style="margin-top: 1em">\n\n      <div class="input-group-prepend">\n\n        <span class="input-group-text" id="inputGroup-sizing-lg">\n\n          <ion-icon name="person"></ion-icon>\n\n        </span>\n\n      </div>\n\n      <input type="text" class="input-with-icon" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"\n\n        placeholder="Last Name*" [(ngModel)]="lname">\n\n    </div>\n\n    <div class="input-group input-group-lg" style="margin-top: 1em">\n\n      <div class="input-group-prepend">\n\n        <span class="input-group-text" id="inputGroup-sizing-lg">\n\n          <ion-icon name="mail"></ion-icon>\n\n        </span>\n\n      </div>\n\n      <input type="text" class="input-with-icon" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"\n\n        placeholder="Email ID*" [(ngModel)]="email">\n\n    </div>\n\n    <div class="input-group input-group-lg" style="margin-top: 1em">\n\n      <div class="input-group-prepend">\n\n        <span class="input-group-text" id="inputGroup-sizing-lg">\n\n          <ion-icon name="lock"></ion-icon>\n\n        </span>\n\n      </div>\n\n      <input type="password" class="input-with-icon" aria-label="Sizing example input"\n\n        aria-describedby="inputGroup-sizing-lg" placeholder="Password*" [(ngModel)]="password">\n\n      <p style="font-weight: normal; font-size: 12px;"> Password must contain:8-10 characters,1 Uppercase letter,1\n\n        Lowecase letter,1 number,1 Special characters(such as !,$,@,#,% etc)</p>\n\n    </div>\n\n\n\n \n\n    <div class="input-group input-group-lg" style="margin-top: 1em">\n\n      <div class="input-group-prepend">\n\n        <span class="input-group-text" id="inputGroup-sizing-lg">\n\n          <ion-icon name="lock"></ion-icon>\n\n        </span>\n\n      </div>\n\n      <input type="password" class="input-with-icon" aria-label="Sizing example input"\n\n        aria-describedby="inputGroup-sizing-lg" placeholder="Confirm Password*" [(ngModel)]="cpassword">\n\n    </div>\n\n    <ion-row center>\n\n      <ion-col text-center>\n\n        <button ion-button (click)="registerUser()">Register</button><br />\n\n        Already have an account?<span style="text-decoration:underline; color:#0096ff" (click)="signIn()"> Sign in\n\n          now!</span>\n\n      </ion-col>\n\n    </ion-row>\n\n  </div>\n\n</ion-content>-->\n\n\n\n<ion-content padding>\n\n  <div id="over">\n\n    <img src="assets/imgs/splash.png" alt="couldn\'t load">\n\n  </div>\n\n  <div class="input-icon-wrap" style="margin-top: 1em">\n\n    <span class="input-icon">\n\n      <ion-icon name="contact"></ion-icon>\n\n    </span>\n\n    <input type="text" class="input-with-icon" placeholder="First Name*" [(ngModel)]="fname">\n\n  </div>\n\n  <div class="input-icon-wrap" style="margin-top: 1em">\n\n    <span class="input-icon">\n\n      <ion-icon name="contact"></ion-icon>\n\n    </span>\n\n    <input type="text" class="input-with-icon"  placeholder="Last Name*" [(ngModel)]="lname">\n\n  </div>\n\n  <div class="input-icon-wrap" style="margin-top: 1em">\n\n    <span class="input-icon">\n\n      <ion-icon name="mail"></ion-icon>\n\n    </span>\n\n    <input type="email" class="input-with-icon" placeholder="Email ID*" [(ngModel)]="email">\n\n  </div>\n\n  <div class="input-icon-wrap" style="margin-top: 1em">\n\n    <span class="input-icon">\n\n      <ion-icon name="lock"></ion-icon>\n\n    </span>\n\n    <input type="password" class="input-with-icon"  placeholder="Password*" [(ngModel)]="password">\n\n  </div>\n\n  <p style="font-weight: normal; font-size: 12px;"> Password must contain:8-10 characters,1 Uppercase letter,1\n\n    Lowecase letter,1 number,1 Special characters(such as !,$,@,#,% etc)</p>\n\n  <div class="input-icon-wrap" style="margin-top: 1em">\n\n    <span class="input-icon">\n\n      <ion-icon name="lock"></ion-icon>\n\n    </span>\n\n    <input type="password" class="input-with-icon" placeholder="Confirm Password*" [(ngModel)]="cpassword">\n\n  </div>\n\n  <ion-row center>\n\n    <ion-col text-center>\n\n      <button ion-button (click)="registerUser()">Register</button><br />\n\n      Already have an account?<span style="text-decoration:underline; color:#0096ff" (click)="signIn()"> Sign in\n\n        now!</span>\n\n    </ion-col>\n\n  </ion-row>\n\n \n\n</ion-content>'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\signup\signup.html"*/,
        })
        //Created by Anto Rupak
        ,
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PinPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signin_signin__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(7);
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







var PinPage = /** @class */ (function () {
    function PinPage(platform, navCtrl, navParams, storage, http, alertCtrl, loading) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loading = loading;
        this.result = [];
        this.message = true;
        this.passcode = '';
        this.finalPin = '';
        this.message = true;
        this.int = 0;
        this.newPincount = 0;
        this.fingerPin = false;
        this.platform.registerBackButtonAction(function () {
        });
    }
    PinPage.prototype.ionViewDidLoad = function () {
    };
    PinPage.prototype.sendPinRequest = function (event) {
        var _this = this;
        this.pin = event;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Logging in . . ."
        });
        loader.present();
        this.http.post("https://secure2.ideaelan.com/WS/IdeaElanService.svc/GetClientDetails", {
            code: this.pin
        }).subscribe(function (data) {
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.storage.set('appLink', resJSON.APILink);
            _this.storage.set('pinResponse', resJSON);
            console.log("pin", resJSON);
            console.log("pin", _this.pin);
            //Modified by Anto Rupak
            _this.storage.set('pin', _this.pin);
            _this.storage.set('InsitutionName', resJSON.InstitutionName);
            _this.storage.set('InternalDomain', resJSON.InternalDomain);
            _this.storage.set('IsSSOEnabled', String(resJSON.IsSSOEnabled));
            _this.storage.set('clientImage', resJSON.ImageUrl);
            _this.result = data;
            loader.dismiss();
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__signin_signin__["a" /* SigninPage */]);
        }, function (error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 500) {
                _this.message = false;
                return;
            }
            if (resErrJSON.status == 400) {
                //this.sendRequest();
                // loader.dismiss();
            }
        });
    };
    PinPage.prototype.add = function (value) {
        if (this.passcode.length < 5) {
            this.passcode = this.passcode + value;
            if (this.int == 0) {
                this.codeone = value;
                this.int++;
            }
            else if (this.int == 1) {
                this.codetwo = value;
                this.int++;
            }
            else if (this.int == 2) {
                this.codethree = value;
                this.int++;
            }
            else if (this.int == 3) {
                this.codefour = value;
                this.int++;
            }
            else if (this.int == 4) {
                this.codefive = value;
                this.int++;
            }
            if (this.passcode.length == 5) {
                this.sendPinRequest(this.passcode);
                this.message = true;
            }
        }
    };
    PinPage.prototype.delete = function () {
        if (this.passcode.length > 0) {
            if (this.passcode.length == 1) {
                this.codeone = null;
                this.int--;
            }
            else if (this.passcode.length == 2) {
                this.codetwo = null;
                this.int--;
            }
            else if (this.passcode.length == 3) {
                this.codethree = null;
                this.int--;
            }
            else if (this.passcode.length == 4) {
                this.codefour = null;
                this.int--;
            }
            else if (this.passcode.length == 5) {
                this.codefive = null;
                this.int--;
            }
            this.passcode = this.passcode.substr(0, this.passcode.length - 1);
        }
        if (this.passcode.length <= 0) {
            this.message = true;
        }
    };
    PinPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-pin',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\pin\pin.html"*/'<ion-header>\n\n\n\n	<ion-navbar hideBackButton>\n\n		<ion-title ion-align=\'center\'>Code</ion-title>\n\n	</ion-navbar>\n\n\n\n</ion-header>\n\n<!--<ion-content padding>\n\n    <p>Please enter 5-digit code provided by your core to begin.This code to be entered only once.</p>\n\n   \n\n  <custom-pin  pagetitle="Enter The Code" (change)="sendPinRequest($event)"></custom-pin>\n\n  </ion-content>-->\n\n<ion-content padding class="center-vertical no-scroll">\n\n	<p>Please enter 5-digit code provided by your core to begin.This code to be entered only once.</p>\n\n	<ion-grid>\n\n		<ion-row class="row pincode-input">\n\n			<ion-col class="col col-10 col-offset-10">\n\n				<span *ngIf="codeone || codeone == 0">{{codeone}}</span>\n\n			</ion-col>&nbsp;&nbsp;\n\n			<ion-col class="col col-10 col-offset-10">\n\n				<span *ngIf="codetwo || codetwo == 0">{{codetwo}}</span>\n\n			</ion-col>&nbsp;&nbsp;\n\n			<ion-col class="col col-10 col-offset-10">\n\n				<span *ngIf="codethree || codethree == 0">{{codethree}}</span>\n\n			</ion-col>&nbsp;&nbsp;\n\n			<ion-col class="col col-10 col-offset-10">\n\n				<span *ngIf="codefour || codefour == 0">{{codefour}}</span>\n\n			</ion-col>&nbsp;&nbsp;\n\n			<ion-col class="col col-10 col-offset-10">\n\n				<span *ngIf="codefive || codefive == 0">{{codefive}}</span>\n\n			</ion-col>\n\n		</ion-row>\n\n\n\n	</ion-grid>\n\n	<br />\n\n	<div class="errorMessage" *ngIf="!message">\n\n		<span>Please Enter Correct Pin</span>\n\n	</div>\n\n	<ion-grid>\n\n		<ion-row class="row1">\n\n			<ion-col class="col numpad col-offset-10" >\n\n				<button ion-button outline class="number" (click)="add(\'1\')">1</button>\n\n			</ion-col>\n\n			<ion-col class="col numpad col-offset-10" >\n\n				<button ion-button outline class="number" (click)="add(\'2\')">2</button>\n\n			</ion-col>\n\n			<ion-col class="col numpad col-offset-10" >\n\n				<button ion-button outline class="number" (click)="add(\'3\')">3</button>\n\n			</ion-col>\n\n		</ion-row>\n\n		<ion-row>\n\n			<ion-col class="col numpad col-offset-10">\n\n				<button ion-button outline class="number" (click)="add(\'4\')">4</button>\n\n			</ion-col>\n\n			<ion-col class="col numpad col-offset-10">\n\n				<button ion-button outline class="number" (click)="add(\'5\')">5</button>\n\n			</ion-col>\n\n			<ion-col class="col numpad col-offset-10">\n\n				<button ion-button outline class="number" (click)="add(\'6\')">6</button>\n\n			</ion-col>\n\n		</ion-row>\n\n		<ion-row>\n\n			<ion-col class="col numpad col-offset-10">\n\n				<button ion-button outline class="number" (click)="add(\'7\')">7</button>\n\n			</ion-col>\n\n			<ion-col class="col numpad col-offset-10">\n\n				<button ion-button outline class="number" (click)="add(\'8\')">8</button>\n\n			</ion-col>\n\n			<ion-col class="col numpad col-offset-10">\n\n				<button ion-button outline class="number" (click)="add(\'9\')">9</button>\n\n			</ion-col>\n\n		</ion-row>\n\n		<ion-row>\n\n			<ion-col class="col numpad col-offset-10"></ion-col>\n\n			<ion-col class="col numpad col-offset-10">\n\n				<button ion-button outline class="number" (click)="add(\'0\')">0</button>\n\n			</ion-col>\n\n			<ion-col class="col numpad col-offset-10">\n\n				<div class="button icon ion-arrow-left-a button-light button-stretch" (click)="delete()">\n\n					<ion-icon name="backspace"></ion-icon>\n\n				</div>\n\n			</ion-col>\n\n		</ion-row>\n\n\n\n	</ion-grid>\n\n</ion-content>\n\n<!--<ion-content >\n\n\n\n\n\n<ion-list>\n\n \n\n    <p>Please enter 5-digit code provided by your core to begin.This code to be entered only once.</p>\n\n  \n\n    <ion-item >\n\n      <ion-label>\n\n        <ion-icon name="lock"></ion-icon>\n\n      </ion-label>\n\n      <ion-input type="number" [maxlength]="5" placeholder=\'5-digit code\' [(ngModel)]="pin" ></ion-input>\n\n    </ion-item>\n\n    \n\n<br>\n\n<input type="text" id="foo" value="bar" onkeyup="showMe(this)" />\n\n<ion-row center>  \n\n <ion-col text-center>   \n\n  <button ion-button (click)=\'sendPinRequest()\'>Proceed</button>  \n\n </ion-col> \n\n</ion-row>\n\n</ion-list>\n\n\n\n</ion-content>-->'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\pin\pin.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */]])
    ], PinPage);
    return PinPage;
}());

//# sourceMappingURL=pin.js.map

/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SamplesubmissionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sampledetail_sampledetail__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__message_message__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/*
Created By Sumit Rajpal & No Modification
*/










var SamplesubmissionPage = /** @class */ (function () {
    function SamplesubmissionPage(navCtrl, navParams, loading, http, storage, actionctrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loading = loading;
        this.http = http;
        this.storage = storage;
        this.actionctrl = actionctrl;
        this.alertCtrl = alertCtrl;
    }
    SamplesubmissionPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.sampleRequestUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetWorkOrdersByUserIdByDateRange';
            _this.endDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();
            //new Date(new Date().setDate(new Date().getDate() + 7)).toISOString();
            _this.startDate = new Date(new Date().setDate(new Date().getDate() - 90)).toISOString();
        });
    };
    SamplesubmissionPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
            _this.sendSampleRequest();
        });
        this.storage.get('roleType').then(function (val) {
            _this.roleType = val;
        });
    };
    SamplesubmissionPage.prototype.goButtonRequest = function () {
        this.sendSampleRequest();
    };
    SamplesubmissionPage.prototype.sendSampleRequest = function () {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        this.http.post(this.sampleRequestUrl, {
            userid: this.userJson.UserId,
            starttime: this.startDate,
            endtime: this.endDate,
            usertoken: this.userJson.UserToken,
            loggedinuser: this.userJson.UserId
        })
            .subscribe(function (data) {
            //RESPONSE
            _this.sampleStatus = true;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.sampleRequestJson = resJSON;
            console.log(resJSON);
            loader.dismiss();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            _this.sampleStatus = false;
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
        });
    };
    SamplesubmissionPage.prototype.sampleDetail = function (sampleJson) {
        //  this.navCtrl.push(SampledetailPage,{"sampleJson":sampleJson});
        var _this = this;
        if (this.roleType == "user" || this.roleType == "providerAdmin") {
            if (this.roleType == "user") {
                if (this.userJson.UserId != sampleJson.UserId) {
                    this.showdetail(sampleJson);
                    return;
                }
            }
            var actionSheet = this.actionctrl.create({
                title: 'Select Options',
                cssClass: 'myPage',
                buttons: [
                    {
                        //updated by Abey Abraham
                        text: 'Chat',
                        role: 'destructive',
                        cssClass: 'myActionSheetBtnStyle',
                        handler: function () {
                            //  this.logs.insertlog("View Issues ", "Facility Dashboard Page", "click event of card content", "User clicked the issues displayed in cards for viewing details  ", this.userJson.UserId);
                            //this.navCtrl.push('DashboarddetailPage', { "dashboardTicketDetail": instrument ,"userId":this.userJson.UserId});
                            if (_this.roleType == "user") {
                                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__message_message__["a" /* MessagePage */], { "WorkOrderId": "" + sampleJson.WorkOrderId, "id": "user", "ProviderId": "" + sampleJson.ProviderId, "source": " " + sampleJson.RollNumber, "chatType": "SampleSubmission" });
                            }
                            else if (_this.roleType == "providerAdmin") {
                                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__message_message__["a" /* MessagePage */], { "WorkOrderId": "" + sampleJson.WorkOrderId, "id": "providerAdmin", "ProviderId": "" + sampleJson.ProviderId, "source": " " + sampleJson.RollNumber, "chatType": "SampleSubmission" });
                            }
                        }
                    },
                    {
                        text: 'Details',
                        role: 'destructive',
                        cssClass: 'myActionSheetBtnStyle',
                        handler: function () {
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__sampledetail_sampledetail__["a" /* SampledetailPage */], { "sampleJson": sampleJson });
                        }
                    },
                ]
            });
            actionSheet.present();
        }
        else {
            this.showdetail(sampleJson);
        }
    };
    SamplesubmissionPage.prototype.showdetail = function (sampleJson) {
        var _this = this;
        var actionSheet = this.actionctrl.create({
            title: 'Select Options',
            cssClass: 'myPage',
            buttons: [
                {
                    text: 'Details',
                    role: 'destructive',
                    cssClass: 'myActionSheetBtnStyle',
                    handler: function () {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__sampledetail_sampledetail__["a" /* SampledetailPage */], { "sampleJson": sampleJson });
                    }
                },
            ]
        });
        actionSheet.present();
        return;
    };
    SamplesubmissionPage.prototype.toast = function (toastStr) {
        var alert = this.alertCtrl.create({
            title: 'Alert',
            message: toastStr,
            buttons: ['OK']
        });
        alert.present();
    };
    SamplesubmissionPage.prototype.enddatetime = function (event) {
        this.startDate = __WEBPACK_IMPORTED_MODULE_4_moment__(this.startDate).toISOString(true);
        this.endDate = __WEBPACK_IMPORTED_MODULE_4_moment__(this.endDate).toISOString(true);
        if (!__WEBPACK_IMPORTED_MODULE_4_moment__(this.endDate).isAfter(this.startDate)) {
            this.endDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();
            var alert_1 = this.alertCtrl.create({
                title: "Alert",
                message: "Selected date cannot be before to start date.",
                buttons: ['OK']
            });
            alert_1.present();
        }
        //this.endDate = moment(this.navParams.get("endDate")).toISOString(true);
    };
    SamplesubmissionPage.prototype.startdatetime = function (event) {
        if (this.startDate > this.endDate) {
            this.startDate = new Date(new Date().setDate(new Date().getDate() - 90)).toISOString();
            this.showAlert("Start date cannot be after End Date.");
            return false;
        }
    };
    SamplesubmissionPage.prototype.showAlert = function (eventdata) {
        var alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: eventdata,
            buttons: ['OK']
        });
        alert.present();
    };
    SamplesubmissionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-samplesubmission',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\samplesubmission\samplesubmission.html"*/'\n\n<ion-header>\n\n  <ion-navbar hideBackButton>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Sample Submission</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <p class="dropdown">Sample Submission/Service Requests</p>\n\n  <ion-grid>\n\n\n\n    <ion-row class="ion-align-items-center">\n\n      <ion-col>\n\n\n\n      </ion-col>\n\n      <ion-col>\n\n        <div>\n\n          <ion-label>\n\n            <button ion-button id="pistartbutton">\n\n              <ion-datetime picker date [(ngModel)]="startDate" max="2099" min="1990"\n\n                (ionChange)="startdatetime($event)"></ion-datetime>\n\n                <ion-icon name=\'calendar\'></ion-icon> <br> <br><label class="btninlabel">Start Date</label>\n\n            </button>\n\n          </ion-label>\n\n        </div>\n\n        <div class="date_times">{{startDate | date: "MM-dd-yyyy"}}</div>\n\n      </ion-col>\n\n      <ion-col>\n\n        <div>\n\n          <ion-label>\n\n            <button ion-button id="piendbutton">\n\n              <ion-datetime picker date [(ngModel)]="endDate" (ionChange)="enddatetime($event)" max="2099" min="1990">\n\n              </ion-datetime>\n\n\n\n              <ion-icon name=\'calendar\'></ion-icon> <br> <br><label class="btninlabel">End Date &nbsp; &nbsp;</label>\n\n            </button>\n\n\n\n          </ion-label>\n\n        </div>\n\n        <div class="date_timee">{{endDate | date: "MM-dd-yyyy"}}</div>\n\n      </ion-col>\n\n      <ion-col>\n\n\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <div text-center><button ion-button  class="dateButton" (click)="goButtonRequest()">Go</button></div>\n\n  <ion-card-content *ngIf=\'!sampleStatus\'>No Records Found</ion-card-content>\n\n  <!--\n\n  <div *ngIf=\'sampleStatus\'>\n\n\n\n  \n\n    <ion-card *ngFor="let sampleAccess of sampleRequestJson; let i = index;"\n\n      [ngSwitch]=sampleAccess.WorkOrderStatus.trim() (click)="sampleDetail(sampleAccess)">\n\n      <ion-card-content>\n\n        <b>{{sampleAccess.RollNumber}}</b> <br />\n\n        Template : {{sampleAccess.TemplateName}} <br />\n\n        Facility : {{sampleAccess.FacilityName}} <br />\n\n        Lab : {{sampleAccess.LabName}} <br />\n\n        <div *ngIf="sampleAccess.WorkOrderStatus.trim()==\'Approval Process (Cancel)\'">\n\n            Status :  <span class="rejected">{{sampleAccess.WorkOrderStatus}}</span>\n\n        </div>\n\n        <div *ngIf="sampleAccess.WorkOrderStatus.trim()!=\'Approval Process (Cancel)\'">\n\n            Status : <span class="approved">{{sampleAccess.WorkOrderStatus}}</span>\n\n        </div>\n\n       \n\n        Date : {{sampleAccess.strCreatedDate}}\n\n        <br />\n\n        <div *ngIf="sampleAccess.SamplesDropped" class="approved">Samples Dropped</div>\n\n\n\n      </ion-card-content>\n\n\n\n    </ion-card>\n\n  </div>\n\n\n\n  -->\n\n  <div *ngIf=\'sampleStatus\'>\n\n    \n\n    <ion-card *ngFor="let sampleAccess of sampleRequestJson; let i = index;"\n\n    [ngSwitch]=sampleAccess.WorkOrderStatus.trim() (click)="sampleDetail(sampleAccess)">\n\n        <div class="cardheading">{{sampleAccess.RollNumber}}</div>\n\n        <div class="cardsubheading">Template : {{sampleAccess.TemplateName}}</div>  \n\n        <div class="cardsubtext" >Facility : {{sampleAccess.FacilityName}}</div>\n\n        <div class="cardsubtext" >Lab : {{sampleAccess.LabName}}</div>     \n\n        <div *ngIf="sampleAccess.WorkOrderStatus.trim()!=\'Approval Process (Cancel)\'" class="cardcontainertext">\n\n            <span class="cardstatus" >Status :           \n\n            </span>\n\n            <span class="cardstatusgreen"><ion-icon name="checkmark-circle" class="text"></ion-icon> {{sampleAccess.WorkOrderStatus}}\n\n            </span>\n\n          </div>\n\n        <div *ngIf="sampleAccess.WorkOrderStatus.trim()==\'Approval Process (Cancel)\'" class="cardcontainertext">\n\n          <span class="cardstatus" >Status : </span>\n\n          <span class="cardstatusred"> <ion-icon name="close-circle" class="text"></ion-icon> {{sampleAccess.WorkOrderStatus}}\n\n          </span>\n\n        </div>\n\n        <div class="cardsubtext" >Date : {{sampleAccess.strCreatedDate}}</div> \n\n        <div *ngIf="sampleAccess.SamplesDropped" class="cardcontainertext">\n\n         <span class="cardstatusgreen">Samples Dropped </span> </div>\n\n      </ion-card>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\samplesubmission\samplesubmission.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], SamplesubmissionPage);
    return SamplesubmissionPage;
}());

//# sourceMappingURL=samplesubmission.js.map

/***/ }),

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActualUsagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__actualusagecounter_actualusagecounter__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_operators__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_activitylogs_activitylogs__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











//Created by Anto Rupak
var ActualUsagePage = /** @class */ (function () {
    function ActualUsagePage(logs, navCtrl, navParams, http, storage, loading, alertCtrl, toastCtrl) {
        this.logs = logs;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.loading = loading;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.adminSelection = true;
        this.connectivityFlag = true;
        this.adminName = [];
        this.isTagOpenUp = false;
        this.tagName = [];
        this.isTagMandatory = false;
        this.isAccountTrue = false;
        this.loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        this.account_mul_proj_val = [];
    }
    ActualUsagePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.resourceId = this.navParams.get('resourceId');
        this.labId = this.navParams.get('labId');
        this.facilityName = this.navParams.get('FacilityName');
        this.labName = this.navParams.get('labName');
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.getLabUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetLabs';
            _this.getAccountUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetAccountCodes';
            _this.getProjectUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetProjects';
            _this.getSessionUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetSessionType';
            _this.getAdminUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetAdmins';
            _this.getResourceUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetAllUserBasedOnResourceId';
            _this.checkAppointmentUrl = _this.appUrl + '/WS/IdeaElanService.svc/CheckAppointment';
            _this.getTagsUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetApplicationTags/';
            if (_this.appUrl.includes('/NMI')) {
                _this.clientType = 'nmi';
            }
            else if (_this.appUrl.includes('/uq')) {
                _this.clientType = 'uq';
            }
            else if (_this.appUrl.includes('/caltech')) {
                _this.clientType = 'caltech';
            }
            _this.storage.set('clientType', _this.clientType);
            _this.storage.get('clientType').then(function (client) {
                _this.clientType = client;
                if (_this.clientType === 'nmi' || _this.clientType === 'uq') {
                    _this.isProjectMand = true;
                }
                else {
                    _this.isProjectMand = false;
                }
                if (_this.clientType === 'caltech') {
                    if (_this.navParams.get('FacilityName') === 'Biological and Cryo-TEM') {
                        _this.isProjectMand = true;
                    }
                    else {
                        _this.isProjectMand = false;
                    }
                }
            });
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
            _this.resUserId = _this.userJson.UserId;
            _this.isAdmin = _this.userJson.UserRole;
            _this.userName = _this.userJson.FirstName;
            _this.resetUserId = _this.userJson.UserId;
            _this.resetLabId = _this.labId;
            if (_this.isAdmin.includes("Admin")) {
                _this.admin = true;
            }
        });
    };
    ActualUsagePage.prototype.ionViewDidEnter = function () {
        this.checkAppointmentDetails();
        this.sendResourceRequest();
        this.GetTag();
    };
    ActualUsagePage.prototype.GetProjectDetails = function (user, id) {
        var _this = this;
        this.statusProject = false;
        this.getResourceValueByKey(id, this.resourceJson);
        var startdate = __WEBPACK_IMPORTED_MODULE_4_moment__(new Date()).format("YYYY/MM/DD");
        this.http.post(this.getProjectUrl, {
            userid: this.resUserId,
            resourceid: this.resourceId,
            usertoken: this.userJson.UserToken,
            startdate: startdate,
            loggedinuser: this.userJson.UserId,
            providerid: 0,
            isreservation: 1
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.projectJson = resJSON;
            if (_this.projectJson[0].hasOwnProperty('Message')) {
                _this.isprojectDisabled = true;
                _this.projectName = '';
            }
            else {
                _this.isprojectDisabled = false;
            }
            _this.sendLabRequest(id, 0);
            _this.GetSessionDetails("0");
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            _this.loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
                _this.projectJson = [];
                _this.statusProject = true;
                _this.sendLabRequest(id, 0);
            }
        });
    };
    ActualUsagePage.prototype.getResourceValueByKey = function (key, data) {
        for (var i = 0; data.length > i; i += 1) {
            if (data[i].UserId === key) {
                this.userName = data[i].FirstName;
                return true;
            }
        }
        return false;
    };
    ActualUsagePage.prototype.projectOnChangeHandeler = function () {
        var _this = this;
        //  this.globalLoader()
        this.sendLabRequest(this.projectId, 1);
        if (this.projectId > 0 && this.clientType == "nmi") {
            var Json_Sel_project = this.projectJson.filter(function (i) { return i.ProjectId == _this.projectId; });
            this.projectName = Json_Sel_project[0].ProjectName;
            var n = this.projectName.includes("Service");
            if (n && this.sessionJson.length > 0) {
                var session_Details = this.sessionJson.filter(function (i) { return i.SessionType === "Maintenance"; });
                this.sessionId = session_Details[0].SessionMapId;
            }
        }
    };
    ActualUsagePage.prototype.sendLabRequest = function (id, value) {
        var _this = this;
        this.statusLab = false;
        //  if (value == 1) {
        //    this.getProjectValueByKey(this.projectId, this.projectJson);
        //  }
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        this.http.post(this.getLabUrl, {
            userid: this.resUserId,
            resourceid: this.resourceId,
            usertoken: this.userJson.UserToken,
            projectid: this.projectId,
            loggedinuser: this.userJson.UserId
        }).subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.labJson = resJSON;
            _this.getLabIdByKey(_this.labId, _this.labJson);
            if (id == 1) {
                _this.labId = resJSON[0].GroupId;
            }
            if (_this.labId == null) {
                _this.labId = resJSON[0].GroupId;
            }
            _this.GetAccountDetails(_this.labId, '0');
            loader.dismiss();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
                _this.labJson = [];
                _this.labId = "0";
                _this.statusLab = true;
            }
            loader.dismiss();
        });
    };
    ActualUsagePage.prototype.getLabIdByKey = function (key, data) {
        for (var i = 0; data.length > i; i += 1) {
            if (data[i].GroupId === key) {
                // this.username = data[i].FirstName;
                return this.labId = data[i].GroupId;
            }
        }
        this.resetLabId = data[0].GroupId;
        return this.labId = data[0].GroupId;
    };
    ActualUsagePage.prototype.getProjectIdByKey = function (key, data) {
        for (var i = 0; data.length > i; i += 1) {
            if (data[i].ProjectId == key) {
                if (data[i].hasOwnProperty('IsMembership')) {
                    this.projectType = "membership";
                    if (this.clientType === 'uq') {
                        this.accountCodeId = 0;
                        this.accName = "";
                        this.isAccountTrue = true;
                        return false;
                    }
                    else {
                        this.isAccountTrue = false;
                    }
                }
                else {
                    this.projectType = "project";
                }
                break;
            }
        }
    };
    ActualUsagePage.prototype.get_N_ValuefromLabDetails = function (key, value) {
        if (this.labId != null) {
            for (var i = 0; value.length > i; i += 1) {
                if (value[i].GroupId == this.labId) {
                    if (value[i].GroupType === 'N') {
                        this.accName = "";
                        this.isAccountTrue = true;
                    }
                    else {
                        this.isAccountTrue = false;
                    }
                    return true;
                }
            }
            return false;
        }
    };
    ActualUsagePage.prototype.GetAccountDetails = function (id, value) {
        var _this = this;
        this.statusAccount = false;
        if (!this.isAccountTrue) {
            if (this.labId > 0) {
                var Json_Sel_lab = this.labJson.filter(function (i) { return i.GroupId == _this.labId; });
                if (Json_Sel_lab[0].GroupType === "P") {
                    this.labval = "PO Number";
                }
                else {
                    this.labval = "Account Code";
                }
            }
        }
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        if (value == 1) {
            this.accountCodeId = '0';
            loader.present();
        }
        this.get_N_ValuefromLabDetails(this.labId, this.labJson);
        this.getLabValueByKey(this.labId, this.labJson);
        this.getProjectIdByKey(this.projectId, this.projectJson);
        this.http.post(this.getAccountUrl, {
            userid: this.resUserId,
            resourceid: this.resourceId,
            labid: this.labId,
            usertoken: this.userJson.UserToken,
            loggedinuser: this.userJson.UserId
        }).pipe(Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_operators__["map"])(function (res) {
            return res.filter(function (post) {
                if (_this.projectId == undefined || _this.projectId == "0" || _this.projectType == "project") {
                    return post.IsExpired == false && post.IsMembership == false;
                }
                else if (_this.projectType == "membership") {
                    return post;
                }
            });
        })).subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.accountJson = resJSON;
            if (value == 1) {
                loader.dismiss();
            }
            if (_this.accountCodeId > 0) {
                var acc_Id = _this.accountJson.filter(function (p) { return p.GroupAccountCodeId == _this.accountCodeId; });
            }
            if (acc_Id == undefined || JSON.parse(acc_Id.length) <= 0) {
                _this.accountCodeId = 0;
            }
            else if (_this.projectType == "membership") {
                _this.accountCodeId = resJSON[0].GroupAccountCodeId;
            }
            if (_this.projectId > 0) {
                _this.account_mul_proj_val = [];
                for (var p = 0; _this.accountJson.length > p; p += 1) {
                    if (_this.accountJson[p].hasOwnProperty('ProjectIds')) {
                        if (_this.accountJson[p].ProjectIds == -1) {
                            _this.account_mul_proj_val.push(_this.accountJson[p]);
                        }
                        else {
                            var acc_map_multiple_acc = _this.accountJson[p].ProjectIds.split(",");
                            for (var i = 0; acc_map_multiple_acc.length > i; i += 1) {
                                if (acc_map_multiple_acc[i] == _this.projectId) {
                                    _this.account_mul_proj_val.push(_this.accountJson[p]);
                                }
                            }
                        }
                    }
                }
                _this.accountJson = _this.account_mul_proj_val;
            }
            if (_this.clientType === 'uq' && _this.projectType == "membership") {
                _this.accountCodeId = 0;
                _this.accName = "";
                _this.isAccountTrue = true;
                return false;
            }
            else {
                _this.isAccountTrue = false;
            }
            _this.GetSessionDetails("0");
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
                _this.accountJson = [];
                _this.statusAccount = true;
            }
        });
    };
    ActualUsagePage.prototype.getLabValueByKey = function (key, data) {
        for (var i = 0; data.length > i; i += 1) {
            if (data[i].GroupId == key) {
                this.labId = data[i].GroupId;
                this.labName = data[i].GroupName;
                this.labType = data[i].GroupType;
                this.accountCodeFrom = data[i].AccountCodeFrom;
                return true;
            }
        }
        return false;
    };
    ActualUsagePage.prototype.GetSessionDetails = function (id) {
        var _this = this;
        this.statusSession = false;
        this.http.post(this.getSessionUrl, {
            userid: this.resUserId,
            resourceid: this.resourceId,
            labid: this.labId,
            usertoken: this.userJson.UserToken,
            loggedinuser: this.userJson.UserId
        }).subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.sessionJson = resJSON;
            if (_this.projectId > 0 && _this.clientType == "nmi") {
                var Json_Sel_project = _this.projectJson.filter(function (i) { return i.ProjectId == _this.projectId; });
                _this.projectName = Json_Sel_project[0].ProjectName;
                var n = _this.projectName.includes("Service");
                if (n && _this.sessionJson.length > 0) {
                    var session_Details = _this.sessionJson.filter(function (i) { return i.SessionType === "Maintenance"; });
                    _this.sessionId = session_Details[0].SessionMapId;
                }
            }
            _this.GetAdminDetails("0");
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            // this.loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
                _this.sessionJson = [];
                _this.statusSession = true;
            }
        });
    };
    ActualUsagePage.prototype.getAccountValueByKey = function (key, data) {
        var _this = this;
        var Json_Sel_Acc = this.accountJson.filter(function (person) { return person.GroupAccountCodeId == _this.accountCodeId; });
        if (Json_Sel_Acc.length > 0) {
            this.accName = Json_Sel_Acc[0].AccountCode;
        }
    };
    ActualUsagePage.prototype.GetAdminDetails = function (id) {
        var _this = this;
        if (id != 0) {
            var sessionData = this.sessionJson.filter(function (i) {
                return i.SessionMapId == id;
            });
            this.sessionId = sessionData[0].SessionMapId;
            this.sessionName = sessionData[0].SessionType;
            this.adminDropdown = sessionData[0].showAdminSelection;
        }
        //  this.getSessionValueByKey(id,this.sessionJson)
        if (this.adminDropdown == true || this.adminDropdown != null) {
            this.adminName = [], this.adminId = [];
            this.adminSelection = false;
        }
        else {
            this.adminName = [], this.adminId = [];
            this.adminSelection = true;
        }
        this.http.post(this.getAdminUrl, {
            userid: this.resUserId,
            usertoken: this.userJson.UserToken,
            resourceid: this.resourceId
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.AdminJson = resJSON;
            //  loader.dismiss();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            //   this.loader.dismiss();
        });
    };
    ActualUsagePage.prototype.sendResourceRequest = function () {
        var _this = this;
        this.http.post(this.getResourceUrl, {
            resourceid: this.resourceId,
        }).subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.resourceJson = resJSON;
            _this.GetProjectDetails(_this.resUserId, '0');
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
        });
    };
    ActualUsagePage.prototype.checkAppointmentDetails = function () {
        var _this = this;
        var startdate = __WEBPACK_IMPORTED_MODULE_4_moment__(new Date()).format("YYYY-MM-DD HH:mm");
        this.http.post(this.checkAppointmentUrl, {
            userid: this.userJson.UserId,
            resourceid: this.resourceId,
            starttime: startdate,
            usertoken: this.userJson.UserToken,
            loggedinuser: this.userJson.UserId
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            var count = Object.keys(resJSON).length;
            if (count != 0) {
                var confirm_1 = _this.alertCtrl.create({
                    title: 'Actual Usage',
                    message: "Do you want to use exsisting scheduled appointment from &nbsp" + resJSON.StartTime + "&nbsp to &nbsp" + resJSON.EndTime,
                    buttons: [
                        {
                            text: 'Start New',
                            handler: function () {
                            }
                        },
                        {
                            text: 'Yes',
                            handler: function () {
                                _this.connectivityFlag = false;
                            }
                        }
                    ]
                });
                confirm_1.present();
            }
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
        });
    };
    ActualUsagePage.prototype.getAdminValueByKey = function (key, parameter) {
        this.adminName = [];
        for (var i = 0; i < key.length; i = i + 1) {
            for (var j = 0; j < parameter.length; j = j + 1) {
                if (key[i] == parameter[j].AdminId) {
                    this.adminName.push(parameter[j].UserName);
                }
            }
        }
    };
    ActualUsagePage.prototype.alertConfirmActualUsage = function () {
        var _this = this;
        this.logs.insertlog("Actual Usage  ", "Actual Usage Page", " clicked start usage button  ", "User clicked start usage button in actual usage page ", this.userJson.UserId);
        if (this.isProjectMand) {
            if (this.projectId <= 0 || this.projectId == undefined) {
                this.showAlert("Project is Mandatory.");
                return false;
            }
        }
        var session_id = this.sessionId;
        if (this.sessionId > 0) {
            var sessionData = this.sessionJson.filter(function (i) {
                return i.SessionMapId === session_id;
            });
            this.sessionId = sessionData[0].SessionMapId;
            this.sessionName = sessionData[0].SessionType;
        }
        if (this.projectId == null) {
            this.projectName = '';
        }
        if (this.tagId != null) {
            var tagValue = this.tagId.join(", ");
            this.getTagNameValueByKey(this.tagId, this.tagJson);
        }
        else {
            tagValue = '';
        }
        if (this.adminId != null) {
            this.getAdminValueByKey(this.adminId, this.AdminJson);
            var adminValue = this.adminId.join(", ");
        }
        else {
            adminValue = '';
        }
        if (this.isAccountTrue) {
            if (this.labId == null || this.labId == "0" || this.sessionId == null || this.labId === undefined || this.sessionId === undefined || this.sessionId == '0') {
                this.showAlert("Please Enter all the requied fields");
                return false;
            }
        }
        else {
            if (this.labId == null || this.sessionId == null || this.labId === undefined || this.sessionId === undefined || this.accountCodeId == '0' || this.sessionId == '0') {
                this.showAlert("Please Enter all the requied fields");
                return false;
            }
        }
        if (this.isTagMandatory) {
            if (this.tagId == null) {
                this.showAlert("Please Enter all the requied fields");
                return false;
            }
        }
        if (!this.adminSelection) {
            if (this.adminId == null || this.adminId.length == 0) {
                this.showAlert("Please Enter all the requied fields");
                return false;
            }
        }
        this.getAccountValueByKey(this.accountCodeId, this.accountJson);
        var Json_Sel_Proj = this.projectJson.filter(function (person) { return person.ProjectId == _this.projectId; });
        if (Json_Sel_Proj.length > 0) {
            if (Json_Sel_Proj[0].hasOwnProperty('ProjectName')) {
                this.projectName = Json_Sel_Proj[0].ProjectName;
            }
            else {
                this.projectName = '';
            }
        }
        else {
            this.projectName = "";
        }
        var msgText = "<table>" +
            "<tr>" + "User:" + this.userJson.LastName + " " + this.userJson.FirstName + "<br/></tr>" +
            "<tr>" + "Project/Membership:" + this.projectName + "<br/></tr>" +
            "<tr>" + "Lab:" + this.labName + "<br/></tr>" +
            "<tr>" + "Account Code:" + this.accName + "<br/></tr>" +
            "<tr>" + "Session:" + this.sessionName + "<br/></tr>" +
            "<tr>" + "Admin:" + this.adminName + "<br/></tr>" +
            "<tr>" + "Tags:" + this.tagName + "<br/></tr>" +
            "<tr>" + "Are you sure you want to start usage?" + "</tr>"
            + "</table>";
        var confirm = this.alertCtrl.create({
            enableBackdropDismiss: false,
            title: 'Start Usage',
            message: msgText,
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () { }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.startCountDownTimer(tagValue, adminValue);
                    }
                }
            ]
        });
        confirm.present();
    };
    ActualUsagePage.prototype.startCountDownTimer = function (tagValue, adminValue) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__actualusagecounter_actualusagecounter__["a" /* ActualusagecounterPage */], {
            "User": this.userName, "labId": this.labId, "LabName": this.labName, "ProjectId": this.projectId, "ProjectName": this.projectName,
            "AccountCode": this.accountCodeId, "SessionType": this.sessionId, "Admin": adminValue, "resourceId": this.resourceId, "accName": this.accName,
            "labType": this.labType, "accountCodeFrom": this.accountCodeFrom, "SessionName": this.sessionName, "adminName": this.adminName, 'TagName': this.tagName, 'tagId': tagValue
        });
    };
    ActualUsagePage.prototype.reset = function () {
        this.loader.present();
        this.resUserId = this.resetUserId;
        this.labId = this.resetLabId;
        this.sessionId = '0';
        this.adminId = [];
        this.accountCodeId = "0";
        this.projectId = 0;
        this.tagId = [];
        this.loader.dismiss();
    };
    ActualUsagePage.prototype.GetTag = function () {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        this.http.get(this.getTagsUrl + this.resourceId + ',' + 0)
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.tagJson = resJSON;
            _this.isTagOpenUp = true;
            if (resJSON[0].IsTagMandatory) {
                _this.isTagMandatory = true;
            }
            else {
                _this.isTagMandatory = false;
            }
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
                _this.isTagOpenUp = false;
                //this.stat = true
            }
        });
    };
    ActualUsagePage.prototype.getTagNameValueByKey = function (key, parameter) {
        this.tagName = [];
        for (var i = 0; i < key.length; i = i + 1) {
            for (var j = 0; j < parameter.length; j = j + 1) {
                if (key[i] == parameter[j].TagId) {
                    this.tagName.push(parameter[j].TagName);
                }
            }
        }
    };
    ActualUsagePage.prototype.showAlert = function (eventdata) {
        var alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: eventdata,
            buttons: ['Ok']
        });
        alert.present();
    };
    ActualUsagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-actual-usage',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\actual-usage\actual-usage.html"*/'<!--Created by Anto Rupak-->\n\n\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Actual Usage</ion-title>\n\n    <ion-buttons end>\n\n      <div (click)=\'reset()\'>\n\n        <ion-icon name="refresh" class="iconstyle"></ion-icon>\n\n      </div>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <!-- <ion-item *ngIf=\'admin\'>\n\n    <ion-label>\n\n      User\n\n    </ion-label>\n\n    <ion-select placeholder=\'\' multiple="false" [(ngModel)]="resUserId" (ionChange)="GetProjectDetails(resUserId,1)">\n\n      <ion-option *ngFor="let resource of resourceJson" value="{{resource.UserId}}" >{{resource.UserName}}\n\n      </ion-option>\n\n    </ion-select>\n\n  </ion-item>-->\n\n  <ion-item  *ngIf =\'!isprojectDisabled\'>\n\n    <ion-label>\n\n      Project/Membership <span *ngIf="isProjectMand">*</span>\n\n    </ion-label>\n\n    <ion-select placeholder=\'\' multiple="false" [(ngModel)]="projectId" id="project" [disabled]="!connectivityFlag"\n\n      (ionChange)="projectOnChangeHandeler(projectId,1)">\n\n      <ion-option *ngIf=\'statusProject\' value="0">No Records Found</ion-option>\n\n      <ion-option *ngIf=\'!statusProject\' value=\'0\' selected>Select Project Id</ion-option>\n\n      <ion-option *ngFor="let project of projectJson" value="{{project.ProjectId}}">{{project.ProjectName}}</ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n  <ion-item id="page-select2">\n\n    <ion-label>\n\n      Lab*\n\n    </ion-label>\n\n    <ion-select placeholder=\'\' multiple="false" [(ngModel)]="labId" (ionChange)="GetAccountDetails(labId,1)"\n\n      [disabled]="!connectivityFlag">\n\n      <ion-option *ngIf=\'statusLab\' value="0">No Records Found</ion-option>\n\n      <ion-option value=\'0\' *ngIf=\'!statusLab\'>Select Lab Id</ion-option>\n\n      <ion-option *ngFor="let lab of labJson" value="{{lab.GroupId}}">{{lab.GroupName}}</ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n  <ion-item id="page-select3"  [hidden]="isAccountTrue">\n\n    <ion-label>\n\n      {{labval}}*\n\n    </ion-label>\n\n    <ion-select placeholder=\'\' multiple="false" [(ngModel)]="accountCodeId"\n\n      (ionChange)="GetSessionDetails(accountCodeId)" [disabled]="!connectivityFlag">\n\n      <ion-option *ngIf=\'statusAccount\' value="0">No Records Found</ion-option>\n\n      <ion-option selected value=\'0\' *ngIf=\'!statusAccount\'>{{labval}}</ion-option>\n\n      <ion-option *ngFor="let AccCode of accountJson" value="{{AccCode.GroupAccountCodeId}}">{{AccCode.AccountCode}}\n\n      </ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n  <ion-item id="page-select4">\n\n    <ion-label>\n\n      Session*\n\n    </ion-label>\n\n    <ion-select placeholder=\'\' multiple="false" [(ngModel)]="sessionId" (ionChange)="GetAdminDetails(sessionId)"\n\n      [disabled]="!connectivityFlag">\n\n      <ion-option *ngIf=\'statusSession\' value="0">No Records Found</ion-option>\n\n      <ion-option selected value=\'0\' *ngIf=\'!statusSession\'>Select Session Code</ion-option>\n\n      <ion-option *ngFor="let Session of sessionJson" value="{{Session.SessionMapId}}">{{Session.SessionType}}\n\n      </ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n\n\n  <ion-item id="page-select7" [hidden]="adminSelection">\n\n    <ion-label>\n\n      Admin*\n\n    </ion-label>\n\n    <ion-select placeholder=\'Select Admin\' multiple="true" [(ngModel)]="adminId">\n\n      <ion-option *ngFor="let Admin of AdminJson" value="{{Admin.AdminId}}">{{Admin.UserName}}</ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n  <ion-item id="page-select7" [hidden]="!isTagOpenUp">\n\n    <ion-label>\n\n      Tags<span *ngIf="isTagMandatory">*</span>\n\n    </ion-label>\n\n    <ion-select placeholder=\'Select Tags\' multiple="true" [(ngModel)]="tagId">\n\n      <ion-option *ngFor="let tags of tagJson" value="{{tags.TagId}}">{{tags.TagName}}</ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n\n\n  <ion-row center>\n\n    <ion-col text-center>\n\n      <button id="page-button3" ion-button color="positive" (click)=\'alertConfirmActualUsage()\'>\n\n        Start Usage\n\n      </button>\n\n    </ion-col>\n\n  </ion-row>\n\n\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\actual-usage\actual-usage.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__providers_activitylogs_activitylogs__["a" /* ActivitylogsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */]])
    ], ActualUsagePage);
    return ActualUsagePage;
}());

//# sourceMappingURL=actual-usage.js.map

/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InstrumentstechissuePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dashboarddetail_dashboarddetail__ = __webpack_require__(541);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var InstrumentstechissuePage = /** @class */ (function () {
    function InstrumentstechissuePage(storage, loading, navCtrl, navParams, http) {
        this.storage = storage;
        this.loading = loading;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
    }
    InstrumentstechissuePage.prototype.ionViewDidEnter = function () {
        this.sendFacilitesTechnicalIssueRequest("ResourceId", "" + this.resourceId);
    };
    InstrumentstechissuePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
        });
        this.resourceId = this.navParams.get('resourceId');
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.getFacilitiesUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetFacilitiesUserIsAdmin';
            _this.getFacilitiesTechnicalIssueUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetTechnicalIssues';
        });
        this.storage.get('roleType').then(function (val) {
            if (val == "user" || val == "labAdmin") {
                _this.userType = true;
            }
            else if (val == "super" || val == "admin" || val == "providerAdmin" || val == "labAdmin") {
                _this.userType = false;
            }
            else {
            }
        });
    };
    InstrumentstechissuePage.prototype.sendFacilitesTechnicalIssueRequest = function (paramname, paramvalue) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        this.http.post(this.getFacilitiesTechnicalIssueUrl, {
            userid: this.userJson.UserId,
            usertoken: this.userJson.UserToken,
            paramname: paramname,
            paramvalue: paramvalue
        })
            .subscribe(function (data) {
            //RESPONSE
            _this.technicalStatus = true;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userFacilitiesTechnicalIssuesJson = resJSON;
            loader.dismiss();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
                _this.technicalStatus = false;
            }
        });
    };
    InstrumentstechissuePage.prototype.techIssuePage = function (instrument) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__dashboarddetail_dashboarddetail__["a" /* DashboarddetailPage */], { "dashboardTicketDetail": instrument });
    };
    InstrumentstechissuePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-instrumentstechissue',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\instrumentstechissue\instrumentstechissue.html"*/'<!--\n\n  Generated template for the InstrumentstechissuePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Technical Issues</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content >\n\n  \n\n  <ion-card-content *ngIf=\'!technicalStatus\'>No Records Found</ion-card-content>\n\n      <div *ngIf=\'technicalStatus\'>\n\n        <ion-card *ngFor="let technicalIssues of userFacilitiesTechnicalIssuesJson"  (click)=\'techIssuePage(technicalIssues)\'>\n\n        <div class="cardsubheading">{{technicalIssues.Description}}</div>\n\n        <div class="cardsubtext"> Resource : {{technicalIssues.Source}}</div>\n\n        <div class="cardsubtext"> Created Date : {{technicalIssues.strCreatedDate}}</div>\n\n        <div class="cardsubtext"> Status : {{technicalIssues.Status}}</div>\n\n        </ion-card>\n\n  </div>\n\n        \n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\instrumentstechissue\instrumentstechissue.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */]])
    ], InstrumentstechissuePage);
    return InstrumentstechissuePage;
}());

//# sourceMappingURL=instrumentstechissue.js.map

/***/ }),

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewcagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_message_message__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_viewanimal_viewanimal__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__location_modal_location_modal__ = __webpack_require__(245);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/*
Done by Abey Abraham
*/









/**
 * Generated class for the ViewcagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ViewcagePage = /** @class */ (function () {
    function ViewcagePage(modalCtrl, navCtrl, messages, http, loading, storage, navParams, alertCtrl) {
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.messages = messages;
        this.http = http;
        this.loading = loading;
        this.storage = storage;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        /*
        Initially Setting all the previleges to open
        */
        this.icon1 = false;
        this.icon2 = false;
        this.icon3 = false;
        this.icon4 = false;
    }
    ViewcagePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.barCodeVal = this.navParams.get('bdata');
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.getCageUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetFacilitiesUserIsAdmin';
            _this.updateCageUrl = _this.appUrl + '/WS/IdeaElanService.svc/InsertUpdateCage';
            _this.barcodeUrl = _this.appUrl + ("/WS/IdeaElanService.svc/GetExtendedFieldValuesByBarcode/" + _this.barCodeVal); //C111-1144
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
        });
        this.barCodeValSub = this.barCodeVal.split('-');
        this.storage.get('roleType').then(function (role) {
            _this.roleType = role;
        });
    };
    ViewcagePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
        });
        this.loadCageList();
    };
    ViewcagePage.prototype.loadCageList = function () {
        var _this = this;
        var notification = this.getCageUrl;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . ."
        });
        loader.present();
        //SEDNING REQUEST
        this.http.get(this.barcodeUrl + "," + this.userJson.UserId)
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            if (resJSON[0].FieldValue == null || resJSON[0].FieldName != 'Cage Name') {
                _this.messages.showMessage("Message", "Invalid Barcode");
                _this.navCtrl.pop();
            }
            if (resJSON[0].FieldValue != null && resJSON[0].FieldName == 'Cage Name') {
                _this.cageName = resJSON[0].FieldValue;
                _this.species = resJSON[1].FieldValue;
                if (_this.userJson.FirstName != null && _this.userJson.LastName != null) {
                    _this.user = _this.userJson.LastName + " " + _this.userJson.FirstName;
                }
                else {
                    if (_this.userJson.EmailAddress != null) {
                        _this.user = _this.userJson.EmailAddress;
                    }
                    else {
                        _this.user = "";
                    }
                }
                _this.adminList = resJSON[11].FieldValue;
                _this.userList = resJSON[12].FieldValue;
                if (_this.roleType == "user" || _this.roleType == "labAdmin") {
                    if (_this.adminList.includes("" + _this.user) || _this.userList.includes("" + _this.user)) {
                    }
                    else {
                        _this.icon1 = true;
                        _this.icon2 = true;
                        _this.icon3 = true;
                        _this.icon4 = true;
                    }
                }
                _this.location = resJSON[2].FieldValue;
                _this.actDate = resJSON[3].FieldValue;
                _this.admin = resJSON[4].FieldValue;
                _this.faciltiy = resJSON[5].FieldValue;
                _this.contact = resJSON[6].FieldValue;
                _this.phone = resJSON[7].FieldValue;
                _this.nOfAnimals = resJSON[8].FieldValue;
                _this.animalsList = resJSON[9].FieldValue;
                _this.message = resJSON[10].FieldValue;
                _this.message = _this.message.replace(/<[^>]*>/g, '');
                _this.message = _this.message.replace("&nbsp;", "");
                _this.cstatus = resJSON[13].FieldValue;
                if (_this.cstatus == 'Discarded') {
                    _this.icon1 = true;
                    _this.icon2 = true;
                    _this.icon3 = true;
                    _this.icon4 = true;
                }
                loader.dismiss();
                var i = 0, c = 0, p = 0;
                for (i = 0; i < _this.location.length; i++) {
                    if (_this.location[i] == ':') {
                        c++;
                    }
                }
                if (_this.location != "") {
                    _this.indexs = _this.location.split(',');
                    if (_this.location.includes('Building')) {
                        _this.building = _this.indexs[p].split(":", -1);
                        p++;
                    }
                    else {
                        _this.building = ['', ''];
                    }
                    if (_this.location.includes('Room')) {
                        _this.room = _this.indexs[p].split(":");
                        p++;
                    }
                    else {
                        _this.room = ['', ''];
                    }
                    if (_this.location.includes('Rack')) {
                        _this.rack = _this.indexs[p].split(":");
                        p++;
                    }
                    else {
                        _this.rack = ['', ''];
                    }
                    if (_this.location.includes('Side')) {
                        _this.side = _this.indexs[p].split(":");
                        p++;
                    }
                    else {
                        _this.side = ['', ''];
                    }
                    if (_this.location.includes('Row')) {
                        _this.row = _this.indexs[p].split(":");
                        p++;
                    }
                    else {
                        _this.row = ['', ''];
                    }
                    if (_this.location.includes('Column')) {
                        _this.coloumn = _this.indexs[p].split(":");
                        p++;
                    }
                    else {
                        _this.coloumn = ['', ''];
                    }
                }
                else {
                    _this.building = ['', ''];
                    _this.room = ['', ''];
                    _this.rack = ['', ''];
                    _this.side = ['', ''];
                    _this.row = ['', ''];
                    _this.coloumn = ['', ''];
                }
            }
            else {
                loader.dismiss();
                _this.icon1 = true;
                _this.icon2 = true;
                _this.icon3 = true;
                _this.icon4 = true;
                _this.cageName = "";
                _this.species = "";
                if (_this.userJson.FirstName != null && _this.userJson.LastName != null) {
                    _this.user = _this.userJson.LastName + " " + _this.userJson.FirstName;
                }
                else {
                    if (_this.userJson.EmailAddress != null) {
                        _this.user = _this.userJson.EmailAddress;
                    }
                    else {
                        _this.user = "";
                    }
                }
                _this.location = "";
                _this.admin = "";
                _this.faciltiy = "";
                _this.contact = "";
                _this.phone = "";
                _this.nOfAnimals = "";
                _this.animalsList = "";
                _this.message = "";
            }
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
        });
    };
    ViewcagePage.prototype.updateRequest = function () {
        var _this = this;
        this.http.post(this.updateCageUrl, {
            cageid: "" + this.barCodeValSub[1],
            status: this.cstatus,
            notes: this.message,
            createdby: this.userJson.LastName + " " + this.userJson.FirstName,
            //createdby:this.userJson.UserId,
            building: this.building[1],
            room: this.room[1],
            rack: this.rack[1],
            side: this.side[1],
            row: this.row[1],
            column: this.coloumn[1]
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.messages.showMessage("Message", "Updated Successfully");
            _this.ionViewDidEnter();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            _this.messages.showMessage("Message", "Not Updated, Please try again later.");
        });
    };
    ViewcagePage.prototype.animalPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_viewanimal_viewanimal__["a" /* ViewanimalPage */], { data: this.animalsList, bdata: this.barCodeValSub[1], bfull: this.barCodeVal });
    };
    ViewcagePage.prototype.locationClicked = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ModalPage;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__location_modal_location_modal__["a" /* LocationModalPage */], { building: "" + this.building[1], room: "" + this.room[1], rack: "" + this.rack[1], side: "" + this.side[1], row: "" + this.row[1], coloumn: "" + this.coloumn[1] }, {
                            cssClass: 'page-loc'
                        })];
                    case 1:
                        ModalPage = _a.sent();
                        ModalPage.present();
                        ModalPage.onDidDismiss(function (data) {
                            _this.anData = data;
                            if (_this.anData != null) {
                                _this.http.post(_this.updateCageUrl, {
                                    cageid: "" + _this.barCodeValSub[1],
                                    status: _this.cstatus,
                                    notes: _this.message,
                                    createdby: _this.userJson.LastName + " " + _this.userJson.FirstName,
                                    //createdby:this.userJson.UserId,
                                    building: "" + data.Building,
                                    room: data.Room,
                                    rack: data.Rack,
                                    side: data.Side,
                                    row: data.Row,
                                    column: data.Coloumn
                                })
                                    .subscribe(function (data) {
                                    var resSTR = JSON.stringify(data);
                                    var resJSON = JSON.parse(resSTR);
                                    _this.ionViewDidEnter();
                                    _this.messages.showMessage("Message", "Updated Successfully");
                                }, //ERROR HANDLING
                                function (//ERROR HANDLING
                                error) {
                                    _this.messages.showMessage("Message", " Not Updated , Please try again later.");
                                });
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ViewcagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-viewcage',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\viewcage\viewcage.html"*/'<ion-header hideBackButton="true">\n\n\n\n  <ion-navbar>\n\n    <button ion-button  icon-only menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n<ion-title ion-align=\'center\'>View Cage</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n  <ion-row><ion-col col-4><b>Cage Name </b></ion-col><ion-col col-6>{{cageName}}</ion-col></ion-row><hr>\n\n  <ion-row><ion-col col-4><b>Species </b></ion-col><ion-col col-6>{{species}}</ion-col></ion-row><hr>\n\n  <ion-row><ion-col col-4><b>User</b></ion-col><ion-col col-6>{{user}}</ion-col></ion-row><hr>\n\n  <ion-row><ion-col col-4><b>Location </b></ion-col><ion-col col-6>{{location}}</ion-col>\n\n    <ion-icon [hidden]="icon1"  name="md-create" (click)=locationClicked()></ion-icon>\n\n  </ion-row><hr>\n\n  <ion-row><ion-col col-4><b>Activation Date </b></ion-col><ion-col col-6>{{actDate | date: "MM-dd-yyyy"}}</ion-col></ion-row> <hr>\n\n  <ion-row><ion-col col-4><b>PI/Lab Admin </b></ion-col><ion-col col-6>{{admin}}</ion-col></ion-row> <hr>\n\n  <ion-row><ion-col col-4><b>Facility</b></ion-col><ion-col col-6>{{faciltiy}}</ion-col></ion-row> <hr>\n\n  <ion-row><ion-col col-4><b>Contact </b></ion-col><ion-col col-6>{{contact}}</ion-col></ion-row> <hr>\n\n  <ion-row><ion-col col-4><b>Phone</b></ion-col><ion-col col-6>{{phone}}</ion-col></ion-row> <hr>\n\n  <ion-row><ion-col col-4><b>No. of Animals </b></ion-col><ion-col col-6>{{nOfAnimals}}</ion-col></ion-row> <hr>\n\n  <ion-row><ion-col col-4><b>Animals </b></ion-col><ion-col col-6>{{animalsList}}</ion-col>\n\n    <ion-icon [hidden]="icon2" name="md-create" (click)=animalPage()></ion-icon>\n\n  </ion-row> <hr>\n\n  <ion-row style="align-items: center; height: 3em"><ion-col col-4><b>Change Status  </b></ion-col>\n\n    <ion-col col-6>\n\n      <ion-select [disabled]="icon3" [(ngModel)]="cstatus" placeholder=\'Select Status\' multiple="false" >\n\n        \n\n        <ion-option >Active</ion-option>\n\n        <ion-option >Discarded</ion-option>\n\n      </ion-select>\n\n      \n\n    </ion-col>\n\n  </ion-row> <hr>\n\n  <div>\n\n \n\n   \n\n   <ion-row><ion-col col-4><b>Notes </b></ion-col>  <ion-item>\n\n    <ion-textarea [disabled]="icon3" [(ngModel)]="message"> Notes</ion-textarea>\n\n  </ion-item></ion-row> <hr>\n\n  \n\n<div text-center><button [hidden]="icon4" ion-button (click)=\'updateRequest()\'>Update</button></div>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\viewcage\viewcage.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__providers_message_message__["a" /* MessageProvider */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], ViewcagePage);
    return ViewcagePage;
}());

//# sourceMappingURL=viewcage.js.map

/***/ }),

/***/ 243:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewanimalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_modal_modal__ = __webpack_require__(244);
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/*
    Done By Abey Abraham
*/







var ViewanimalPage = /** @class */ (function () {
    function ViewanimalPage(alertCtrl, messages, modalCtrl, navCtrl, http, navParams, storage) {
        this.alertCtrl = alertCtrl;
        this.messages = messages;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.http = http;
        this.navParams = navParams;
        this.storage = storage;
        this.arr = [];
    }
    ViewanimalPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
        });
        this.animalList();
    };
    ViewanimalPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.bFull = this.navParams.get('bfull');
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.updateAnimalUrl = _this.appUrl + '/WS/IdeaElanService.svc/InsertUpdateAnimal';
            _this.barcodeUrl = _this.appUrl + ("/WS/IdeaElanService.svc/GetExtendedFieldValuesByBarcode/" + _this.bFull); //C111-1144
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
        });
        this.bcodeSub = this.navParams.get('bdata');
    };
    ViewanimalPage.prototype.addNewAnimal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modalPage;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_modal_modal__["a" /* ModalPage */], { data: this.arr })];
                    case 1:
                        modalPage = _a.sent();
                        modalPage.present();
                        modalPage.onDidDismiss(function (data) {
                            _this.anData = data;
                            if (_this.anData != null) {
                                _this.http.post(_this.updateAnimalUrl, {
                                    animalid: 0,
                                    animalname: _this.anData.name,
                                    cageid: "" + _this.bcodeSub,
                                    sex: _this.anData.sex,
                                    dob: _this.anData.dob,
                                    status: 1,
                                    notes: '',
                                    createdby: _this.userJson.EmailAddress,
                                    eartag: _this.anData.tag,
                                    backgroundstrain: _this.anData.bStrain,
                                    userid: _this.userJson.UserId
                                }).subscribe(function (data) {
                                    var resSTR = JSON.stringify(data);
                                    var resJSON = JSON.parse(resSTR);
                                    _this.animals = _this.animals + "," + _this.anData.name;
                                    _this.messages.showMessage("Message", "Animal Added Successfully");
                                    _this.ionViewDidLoad();
                                    _this.ionViewDidEnter();
                                }, //ERROR HANDLING
                                function (//ERROR HANDLING
                                error) {
                                    _this.animals = _this.animals + "," + _this.anData.name;
                                    _this.messages.showMessage("Message", "Animal is not added , Please try again later.");
                                    _this.ionViewDidLoad();
                                    _this.ionViewDidEnter();
                                });
                                _this.animals = _this.animals + "," + _this.anData.name;
                            }
                        });
                        this.ionViewDidLoad();
                        this.ionViewDidEnter();
                        return [2 /*return*/];
                }
            });
        });
    };
    ViewanimalPage.prototype.updateAnimalStatus = function (actionJson) {
        var _this = this;
        this.http.post(this.updateAnimalUrl, {
            animalid: 1,
            animalname: actionJson.name,
            cageid: "" + this.bcodeSub,
            status: actionJson.id,
        }).subscribe(function (data) {
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.arr = null;
            _this.ionViewDidLoad();
            _this.ionViewDidEnter();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            _this.arr = null;
            _this.ionViewDidLoad();
            _this.ionViewDidEnter();
        });
    };
    ViewanimalPage.prototype.onItemSelect = function (user) {
    };
    ViewanimalPage.prototype.animalList = function () {
        var _this = this;
        this.http.get(this.barcodeUrl + "," + this.userJson.UserId)
            .subscribe(function (data) {
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.animalNumber = resJSON[8].FieldValue;
            _this.animalsList = resJSON[9].FieldValue;
            _this.animals = _this.animalsList;
            var i = 0;
            if (_this.animalNumber != 0) {
                _this.ani = _this.animals.split(',');
                _this.arr = [];
                for (i = 0; i < _this.ani.length; i++) {
                    _this.arr.push({ "name": _this.ani[i], "id": 1 });
                }
            }
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
        });
    };
    ViewanimalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-viewanimal',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\viewanimal\viewanimal.html"*/'<!--\n\n  Generated template for the ViewanimalPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>View Animals</ion-title>\n\n    <ion-buttons  end>\n\n      <button class="background">\n\n          <ion-icon name="md-add" (click)=addNewAnimal() item-right></ion-icon>\n\n      </button>\n\n  </ion-buttons>\n\n  </ion-navbar>\n\n \n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <ion-list *ngFor="let animal of arr; let i = index;">\n\n       <ion-row style="align-items: center; height: 3em"><ion-col col-4><b>{{arr[i].name}}  </b></ion-col>\n\n        <ion-col col-6 >\n\n          <ion-select  [(ngModel)]="animal.id"  (ionChange)=updateAnimalStatus(animal)  placeholder=\'Select Status\' multiple="false" >\n\n            \n\n            <ion-option value = "1">Live</ion-option>\n\n            <ion-option value = "2">Dead</ion-option>\n\n            <ion-option value = "3">Sacrificed</ion-option>\n\n            <ion-option  value = "4">Missing</ion-option>\n\n            <ion-option  value = "5">Moved/Exported</ion-option>\n\n            <ion-option  value = "6">In Transit</ion-option>\n\n            <ion-option  value = "7">Unknown</ion-option>\n\n          </ion-select>\n\n        </ion-col>\n\n      </ion-row>\n\n      \n\n      \n\n    </ion-list>\n\n    <pre *ngIf="participant">{{participant | json}}</pre>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\viewanimal\viewanimal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5__providers_message_message__["a" /* MessageProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], ViewanimalPage);
    return ViewanimalPage;
}());

//# sourceMappingURL=viewanimal.js.map

/***/ }),

/***/ 244:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_message_message__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/*
    Done By Abey Abraham
*/


 //DatePipe is used for changing the date format which is being fetched from DatePicker



/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ModalPage = /** @class */ (function () {
    function ModalPage(storage, datepipe, message, navCtrl, navParams, view) {
        this.storage = storage;
        this.datepipe = datepipe;
        this.message = message;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.view = view;
        this.sex = "Unknown";
        this.cDate = new Date().toISOString();
        this.birthDate = this.cDate; //setting birthdate to current date
        this.count = 0;
        this.bStrain = false;
    }
    ModalPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.names = this.navParams.get('data');
        this.storage.get('roleType').then(function (val1) {
            _this.userJson = val1;
            if (_this.userJson == "user" || _this.userJson == "labAdmin") //If the roletype is user or labadmin , it is being disabled 
             {
                _this.bStrain = true;
            }
        });
    };
    ModalPage.prototype.returnParticipant = function () {
        /*
        code to check whether the name already exists or not
        */
        var i = 0;
        for (i = 0; i < this.names.length; i++) {
            if (this.name == this.names[i].name) {
                this.count = 1;
                break;
            }
        }
        if (this.count == 1) {
            this.message.showMessage("Alert", "Animal Name Already Exists !!");
            this.count = 0;
        }
        else if (this.name == null || (/^\s+$/.test(this.name) == true)) //if the name is null or simple empty space , it is not allowed
         {
            this.message.showMessage("Alert", "Enter Animal Name");
        }
        else if (this.sex == null) //this field cannot be null
         {
            this.message.showMessage("Alert", "Enter sex of Animal");
        }
        else if (this.birthDate == null) //birthdate also cannot be null
         {
            this.message.showMessage("Alert", "Enter Birthdate");
        }
        else {
            if (this.bStrain == null) {
                this.bStrain = '';
            }
            else if (this.tag == null) {
                this.tag = '';
            }
            var participant = {
                name: this.name,
                tag: this.tag,
                sex: this.sex,
                bStrain: this.bstrain,
                dob: this.datepipe.transform(this.birthDate, 'MM-dd-yyyy')
            };
            this.view.dismiss(participant); //dissmiss() helps to close the view and pass the parameter values to ViewAnimalPage
        }
    };
    ModalPage.prototype.close = function () {
        this.view.dismiss();
    };
    ModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-modal',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\modal\modal.html"*/'\n\n  <ion-content class="main-view" >\n\n      <div class="overlay" ></div>\n\n      <ion-scroll  class="modal_contentss" scrollY=true >\n\n    <ion-list>\n\n        <ion-title >\n\n            Add Animal\n\n          </ion-title>\n\n      <ion-item>\n\n        <ion-label  floating>Animal Name*</ion-label>\n\n        <ion-input  type="text" [(ngModel)]="name"></ion-input>\n\n      </ion-item>\n\n  \n\n     \n\n  \n\n      <ion-item>\n\n        <ion-label floating>Select sex*</ion-label>\n\n        <ion-select class="select" [(ngModel)]="sex">\n\n          <ion-option value="Male">Male</ion-option>\n\n          <ion-option value="Female">Female</ion-option>\n\n          <ion-option value="Unknown">Unknown</ion-option>\n\n        </ion-select>\n\n      </ion-item>\n\n      <ion-item>\n\n          <ion-label floating>Ear Tag</ion-label>\n\n          <ion-input type="text" [(ngModel)]="tag"></ion-input>\n\n        </ion-item>\n\n    \n\n    <ion-item>\n\n        <ion-label  floating>Background Strain</ion-label>\n\n        <ion-input [disabled]="bStrain"  type="text" [(ngModel)]="bstrain"></ion-input>\n\n      </ion-item>\n\n      <ion-item>\n\n          <ion-datetime picker date [(ngModel)]="birthDate" [(max)]="cDate" min="1890" ></ion-datetime>\n\n          <ion-label> <button ion-button id="startbutton">Date of Birth*</button><span\n\n            style="margin-top:50%;color: #000000">&nbsp;&nbsp;&nbsp;</span> </ion-label>\n\n          </ion-item>\n\n          <ion-item>\n\n          <ion-row>\n\n            <ion-col>\n\n              <button color="light" full ion-button (click)="close()">Cancel</button>\n\n            </ion-col>\n\n            <ion-col>\n\n            <button full ion-button (click)="returnParticipant()">Save</button>\n\n            </ion-col>\n\n          </ion-row>\n\n        </ion-item>\n\n  </ion-list>\n\n  \n\n  \n\n</ion-scroll>\n\n  </ion-content>'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\modal\modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2__angular_common__["d" /* DatePipe */], __WEBPACK_IMPORTED_MODULE_4__providers_message_message__["a" /* MessageProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */]])
    ], ModalPage);
    return ModalPage;
}());

//# sourceMappingURL=modal.js.map

/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationModalPage; });
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
/*
Done by Abey Abraham
*/



/**
 * Generated class for the LocationModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LocationModalPage = /** @class */ (function () {
    function LocationModalPage(view, navCtrl, navParams) {
        this.view = view;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    LocationModalPage.prototype.ionViewDidLoad = function () {
        this.bfromCage = this.navParams.get('building');
        this.roomfromCage = this.navParams.get('room');
        this.rackfromCage = this.navParams.get('rack');
        this.sidefromCage = this.navParams.get('side');
        this.rowfromCage = this.navParams.get('row');
        this.coloumnfromCage = this.navParams.get('coloumn');
        this.Building = this.bfromCage;
        this.Room = this.roomfromCage;
        this.Rack = this.rackfromCage;
        this.Side = this.sidefromCage;
        this.Row = this.rowfromCage;
        this.Coloumn = this.coloumnfromCage;
    };
    LocationModalPage.prototype.returnParticipant = function () {
        if (this.Building == null) {
            this.Building = "";
        }
        var participant = {
            Building: this.Building,
            Room: this.Room,
            Rack: this.Rack,
            Side: this.Side,
            Row: this.Row,
            Coloumn: this.Coloumn
        };
        this.view.dismiss(participant); //dissmiss() helps to close the view and pass the parameter values to ViewAnimalPage
    };
    LocationModalPage.prototype.close = function () {
        this.view.dismiss();
    };
    LocationModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-location-modal',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\location-modal\location-modal.html"*/'\n\n<ion-content class="main-view" >\n\n  <div class="overlay" ></div>\n\n  <ion-scroll  class="modal_contents" scrollY=true >\n\n<ion-list >\n\n    <ion-title >\n\n        Location\n\n      </ion-title>\n\n  <ion-item>\n\n    <ion-label >Building</ion-label>\n\n    <ion-input maxlength="100" type="text" [(ngModel)]="Building"></ion-input>\n\n\n\n  </ion-item>\n\n \n\n  <ion-item>\n\n    <ion-label >Room</ion-label>\n\n    <ion-input maxlength="100" type="text" [(ngModel)]="Room"></ion-input>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n    <ion-label >Rack</ion-label>\n\n    <ion-input maxlength="100"  type="text" [(ngModel)]="Rack"></ion-input>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n    <ion-label >Side</ion-label>\n\n    <ion-input maxlength="100" type="text" [(ngModel)]="Side"></ion-input>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n      <ion-label >Row</ion-label>\n\n      <ion-input maxlength="100" type="text" [(ngModel)]="Row"></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label >Coloumn</ion-label>\n\n      <ion-input maxlength="100" type="text" [(ngModel)]="Coloumn"></ion-input>\n\n    </ion-item>\n\n   \n\n  \n\n      <ion-item>\n\n      <ion-row>\n\n        <ion-col>\n\n          <button color="light" full ion-button (click)="close()">Cancel</button>\n\n        </ion-col>\n\n        <ion-col>\n\n        <button full ion-button (click)="returnParticipant()">Update</button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-item>\n\n    \n\n</ion-list>\n\n\n\n</ion-scroll>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\location-modal\location-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], LocationModalPage);
    return LocationModalPage;
}());

//# sourceMappingURL=location-modal.js.map

/***/ }),

/***/ 246:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SuppliesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_barcode_scanner__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__supplies_order_supplies_order__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_appointment_appointment__ = __webpack_require__(477);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operators__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_util__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_util__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_moment__);
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
 * Generated class for the SuppliesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SuppliesPage = /** @class */ (function () {
    function SuppliesPage(navCtrl, navParams, toastCtrl, storage, loading, http, alertCtrl, actionctrl, appointment, barcodeScanner) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.loading = loading;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.actionctrl = actionctrl;
        this.appointment = appointment;
        this.barcodeScanner = barcodeScanner;
        this.productJson = [];
        this.account_mul_proj_val = [];
        this.labType = "Account Code";
        this.isprojectDisabled = true;
        this.totalPrice = 0;
        this.currentDate = Date;
        this.isFilterOpenUp = false;
        this.isSearchOpenUp = false;
    }
    SuppliesPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.getFacilitiesUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetAllProvidersUserBelongsTo';
            _this.getProdcutsByCategoryIds = _this.appUrl + '/WS/IdeaElanService.svc/GetProdcutsByCategoryIds';
            _this.getResourceUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetUsersByProviderId';
            _this.getAccountUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetAccountCodes';
            _this.getProjectUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetProjects';
            _this.getLabUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetLabs';
            _this.getOrderID = _this.appUrl + '/WS/IdeaElanService.svc/GetOrderId';
            _this.insertOrderUrl = _this.appUrl + '/WS/IdeaElanService.svc/InsertOrder';
            _this.productCategoriesUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetProductCategories';
            _this.getUserRoleBasedOnUserIdUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetUserRoleByUserIdAndProviderId';
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.curr_user_Json = val1;
            _this.user_Id = _this.curr_user_Json.UserId;
            _this.phonenumber = _this.curr_user_Json.Phone;
            _this.shippingAddress = _this.curr_user_Json.Address1;
            _this.sendFacilitiesRequest();
        });
    };
    SuppliesPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        //  this.storage.get('spinnerInbox').then((val) => {
        //    this.spinnerIndex = Number(val);
        //  });
        this.storage.get('userDetails').then(function (val1) {
            _this.curr_user_Json = val1;
            _this.user_Id = _this.curr_user_Json.UserId;
            // this.GetAccountDetails()
        });
        // this.sendFacilitiesRequest()
    };
    SuppliesPage.prototype.sendFacilitiesRequest = function () {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . ",
            duration: 3000
        });
        loader.present();
        this.http.get(this.getFacilitiesUrl + "/" + this.user_Id)
            .subscribe(function (data) {
            //RESPONSE
            _this.emptyDropdown = false;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userFacilitiesJson = resJSON;
            _this.facilityid = resJSON[0].GroupId;
            //  this.categoryId = 0
            _this.getUserRoleBasedOnUserId();
            _this.getResourceRequest();
            _this.GetProjectDetails();
            _this.getOrderIdBasedonFacility();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            _this.emptyDropdown = true;
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
            }
        });
    };
    SuppliesPage.prototype.getProductDetailsBasedOnFacility = function () {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . ",
            duration: 3000
        });
        loader.present();
        this.http.post(this.getProdcutsByCategoryIds, {
            "paramname": "ProviderId",
            "paramvalue": this.facilityid
        })
            .subscribe(function (data) {
            //RESPONSE
            //  this.emptyDropdown = false;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            //  this.productJson = resJSON;
            _this.categoryId = 0;
            _this.isFilterOpenUp = false;
            _this.productJson = [];
            var unitpricebasedonrole;
            var tempvalue;
            resJSON.map(function (item) {
                if (_this.curr_role_type[0] == "Super Admin" || _this.curr_role_type[0] == "Provider Admin" || _this.curr_role_type[0] == "Institution Admin") {
                }
                else {
                    if (!item.IsActive) {
                        return false;
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
                };
            }).forEach(function (item) { return _this.productJson.push(item); });
            _this.tempProductJson = _this.productJson;
            // this.facilityid = resJSON[this.spinnerIndex].GroupId;
            _this.getResourceRequest();
            _this.getUserRoleBasedOnUserId();
            _this.getOrderIdBasedonFacility();
            _this.changeProductBasedOnGrant();
            _this.productStatus = true;
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            // this.emptyDropdown = true;
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
                _this.productJson = [];
                _this.getOrderIdBasedonFacility();
                _this.productStatus = false;
            }
        });
    };
    SuppliesPage.prototype.addproduct = function (productId) {
        for (var i = 0; i < this.productJson.length; i++) {
            if (this.productJson[i].ProductId == productId) {
                var avilableQty = this.productJson[i].UnitsInStock - this.productJson[i].UnitsOnOrder;
                if (avilableQty > 0) {
                    if (this.productJson[i].OrderQty + 1 < avilableQty) {
                        this.productJson[i].OrderQty = this.productJson[i].OrderQty + 1;
                        this.productJson[i].TotalPrice = this.productJson[i].OrderQty * this.productJson[i].UnitPrice;
                    }
                    else {
                        var toast = this.toastCtrl.create({
                            message: 'You have exceeded the stock limit.',
                            duration: 2000
                        });
                        toast.present();
                    }
                }
                else {
                    var toast = this.toastCtrl.create({
                        message: 'Item not available.',
                        duration: 2000
                    });
                    toast.present();
                }
            }
        }
    };
    SuppliesPage.prototype.removeproduct = function (productId) {
        for (var i = 0; i < this.productJson.length; i++) {
            if (this.productJson[i].ProductId == productId) {
                if (this.productJson[i].OrderQty > 0) {
                    this.productJson[i].OrderQty = this.productJson[i].OrderQty - 1;
                    this.productJson[i].TotalPrice = this.productJson[i].OrderQty * this.productJson[i].UnitPrice;
                }
                else {
                    var toast = this.toastCtrl.create({
                        message: 'Quantity is alredy empty.',
                        duration: 2000
                    });
                    toast.present();
                }
            }
        }
    };
    SuppliesPage.prototype.orderProduct = function () {
        var sel_product_json = this.productJson.filter(function (i) { return i.OrderQty > 0; });
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__supplies_order_supplies_order__["a" /* SuppliesOrderPage */], { 'orderDetails': sel_product_json, 'facilityId': this.facilityid });
    };
    SuppliesPage.prototype.getResourceRequest = function () {
        var _this = this;
        this.http.get(this.getResourceUrl + '/' + this.facilityid).subscribe(function (data) {
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userJson = resJSON;
            //  this.user_Json = resJSON;
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
        });
    };
    SuppliesPage.prototype.GetProjectDetails = function () {
        var _this = this;
        var dateTime = __WEBPACK_IMPORTED_MODULE_9_moment__().format("YYYY/MM/DD");
        this.http.post(this.getProjectUrl, {
            userid: this.user_Id,
            resourceid: 0,
            usertoken: this.curr_user_Json.UserToken,
            startdate: dateTime,
            loggedinuser: this.curr_user_Json.UserId,
            providerid: this.facilityid,
            isreservation: 0
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.project_Json = resJSON;
            if (_this.project_Json[0].hasOwnProperty('Message')) {
                _this.isprojectDisabled = false;
            }
            else {
                _this.isprojectDisabled = true;
            }
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
                _this.project_Json = [];
            }
        });
    };
    SuppliesPage.prototype.sendLabRequest = function () {
        var _this = this;
        this.status_Lab = false;
        this.http.post(this.getLabUrl, {
            userid: this.user_Id,
            resourceid: 0,
            usertoken: this.curr_user_Json.UserToken,
            projectid: this.project_Id,
            loggedinuser: this.curr_user_Json.UserId,
            providerid: this.facilityid
        }).subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.lab_Json = resJSON;
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            //  loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            _this.lab_Id = 0;
            _this.lab_Json = [];
            if (resErrJSON.status == 400) {
            }
        });
    };
    SuppliesPage.prototype.accountHandling = function () {
        this.getAccountValueByKey(this.lab_Id, this.lab_Json);
        if (!this.isAccountOpenup) {
            this.GetAccountDetails();
        }
        else {
            this.account_Id = 0;
            return false;
        }
    };
    SuppliesPage.prototype.getAccountValueByKey = function (key, data) {
        // Requirements:: If GroupType=='N' then hide the Account code dropdown.
        if (data.length > 0) {
            for (var i = 0; data.length > i; i += 1) {
                if (data[i].GroupId == key) {
                    if (data[i].GroupType === 'N') {
                        this.isAccountOpenup = true;
                        return false;
                    }
                    else {
                        this.isAccountOpenup = false;
                        return true;
                    }
                }
            }
        }
    };
    SuppliesPage.prototype.GetAccountDetails = function () {
        var _this = this;
        if (this.isAccountOpenup) {
            return false;
        }
        this.status_Account = false;
        if (!this.isAccountOpenup) {
            if (this.lab_Id > 0) {
                var Json_Sel_lab = this.lab_Json.filter(function (i) { return i.GroupId == _this.lab_Id; });
                if (Json_Sel_lab[0].GroupType === "P") {
                    this.labType = "PO Number";
                }
                else {
                    this.labType = "Account Code";
                }
            }
        }
        this.http.post(this.getAccountUrl, {
            userid: this.user_Id,
            resourceid: 0,
            labid: this.lab_Id,
            usertoken: this.curr_user_Json.UserToken,
            loggedinuser: this.curr_user_Json.UserId
        }).pipe(Object(__WEBPACK_IMPORTED_MODULE_7_rxjs_operators__["map"])(function (res) {
            return res.filter(function (post) {
                if (_this.project_Id == undefined || _this.project_Id == 0 || _this.projectType == "project") {
                    return post.IsExpired == false && post.IsMembership == false;
                }
                else if (_this.projectType == "membership") {
                    return post;
                    // return post.ProjectId == this.project_Id;
                }
                // return post;
            });
        })).subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.account_Json = resJSON;
            if (_this.project_Id > 0 && !_this.isprojectDisabled) {
                _this.account_mul_proj_val = [];
                for (var p = 0; _this.account_Json.length > p; p += 1) {
                    if (_this.account_Json[p].hasOwnProperty('ProjectIds')) {
                        if (_this.account_Json[p].ProjectIds == -1) {
                            _this.account_mul_proj_val.push(_this.account_Json[p]);
                        }
                        else {
                            var acc_map_multiple_acc = _this.account_Json[p].ProjectIds.split(",");
                            for (var i = 0; acc_map_multiple_acc.length > i; i += 1) {
                                if (acc_map_multiple_acc[i] == _this.project_Id) {
                                    _this.account_mul_proj_val.push(_this.account_Json[p]);
                                }
                            }
                        }
                    }
                }
                _this.account_Json = _this.account_mul_proj_val;
            }
            if (_this.account_Id > 0) {
                var acc_Id = _this.account_Json.filter(function (p) { return p.GroupAccountCodeId == _this.account_Id; });
            }
            if (acc_Id == undefined || JSON.parse(acc_Id.length) <= 0) {
                _this.account_Id = 0;
            }
            if (_this.projectType == "membership") {
                // Select the default PO code or Membership code.
                if (_this.account_Json.length > 0) {
                    _this.account_Id = _this.account_Json[0].GroupAccountCodeId;
                }
                //client based modification -- requirements:: "If membership is 'true' then hide Account code"
            }
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
                _this.account_Id = 0;
                _this.account_Json = [];
                _this.status_Account = true;
                //     this.GetSessionDetails(id);
            }
        });
    };
    SuppliesPage.prototype.getOrderIdBasedonFacility = function () {
        var _this = this;
        this.http.get(this.getOrderID + '/' + this.facilityid).subscribe(function (data) {
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            var order = resJSON.split('$', 2);
            _this.orderId = order[0];
            _this.curr_order_Id = order[1];
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
        });
    };
    SuppliesPage.prototype.validationRequest = function () {
        var sel_product_json = this.productJson.filter(function (i) { return i.OrderQty > 0; });
        for (var i = 0; i < this.productJson.length; i++) {
            if (this.productJson[i].OrderQty > 0) {
                this.totalPrice = this.totalPrice + this.productJson[i].TotalPrice;
            }
        }
        if (this.isAccountOpenup) {
            if (this.lab_Id <= 0 || this.facilityid <= 0) {
                // this.showAlert("Enter required fields")
                this.customToast('Select Required Fileds');
                return false;
            }
        }
        else {
            if (this.lab_Id <= 0 || this.account_Id <= 0 || this.facilityid <= 0) {
                /// this.showAlert("Enter required fields")
                this.customToast('Select Required Fileds');
                return false;
            }
        }
        if (sel_product_json.length <= 0) {
            this.customToast('Quantity should not be empty.');
        }
        else if (this.phonenumber.length >= 10) {
            this.customToast('Check your phone number.');
        }
        else {
            this.createOrderRequest();
        }
    };
    SuppliesPage.prototype.createOrderRequest = function () {
        var _this = this;
        var cxml = '';
        for (var i = 0; i < this.productJson.length; i++) {
            if (this.productJson[i].OrderQty > 0) {
                var productxml = cxml + "<eSelectOrderDetailsList><eSelectOrderDetails><ProductId>" + this.productJson[i].ProductId + "</ProductId><Quantity>" + this.productJson[i].OrderQty + "</Quantity></eSelectOrderDetails></eSelectOrderDetailsList>";
                cxml = productxml;
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
        }).subscribe(function (data) {
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            if (Object(__WEBPACK_IMPORTED_MODULE_8_util__["isNumber"])(resJSON) || !isNaN(resJSON)) {
                _this.customToast("Order Placed Succesfully.");
                _this.project_Id = 0;
                _this.lab_Id = 0;
                _this.account_Id = 0;
                _this.getProductDetailsBasedOnFacility();
            }
            //this.orderId = resJSON
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
        });
    };
    SuppliesPage.prototype.customToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 2000
        });
        toast.present();
    };
    SuppliesPage.prototype.filterbyCategory = function () {
        if (this.isSearchOpenUp) {
            this.isSearchOpenUp = false;
        }
        if (this.isFilterOpenUp) {
            this.isFilterOpenUp = false;
        }
        else {
            this.isFilterOpenUp = true;
        }
        this.filterProductBasedOnProductId();
    };
    SuppliesPage.prototype.searchbyProductList = function () {
        if (this.isFilterOpenUp) {
            this.isFilterOpenUp = false;
        }
        if (this.isSearchOpenUp) {
            this.isSearchOpenUp = false;
        }
        else {
            this.isSearchOpenUp = true;
        }
    };
    SuppliesPage.prototype.getSearchResults = function () {
        var _this = this;
        var q = this.searchText;
        var tempProductJson = this.productJson;
        if (q == null || q == "") {
            this.productJson = this.tempProductJson;
            return true;
        }
        this.productJson = this.tempProductJson.filter(function (v) {
            if (v.ProductName && q) {
                if (v.ProductName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                    return true;
                }
                else if (v.ProductName.toLowerCase().indexOf(q.toLowerCase()) < -1) {
                    _this.productJson = [];
                }
                return false;
            }
            //   ()
        });
    };
    SuppliesPage.prototype.filterProductBasedOnProductId = function () {
        var _this = this;
        this.http.get(this.productCategoriesUrl + '/' + this.facilityid).subscribe(function (data) {
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.categoryJson = resJSON;
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
        });
    };
    SuppliesPage.prototype.filterBasedOnCategory = function () {
        var _this = this;
        if (this.categoryId > 0) {
            this.productJson = this.tempProductJson.filter(function (i) { return i.CategoryId == _this.categoryId; });
        }
        else {
            //   this.categoryId = 0
            this.productJson = this.tempProductJson;
        }
    };
    SuppliesPage.prototype.startScanner = function () {
        var _this = this;
        this.barcodeScanner.scan().then(function (barcodeData) {
            var barcodeCapture = JSON.stringify(barcodeData);
            var barcodeJsonOutput = JSON.parse(barcodeCapture);
            if (barcodeJsonOutput.text == null || barcodeJsonOutput.text == "") {
            }
            else {
                _this.barcodeValue = barcodeJsonOutput.text;
                _this.barcodeValueSub = _this.barcodeValue.split('-');
                if (_this.barcodeValueSub[0] != "ProID") {
                    _this.customToast('Invalid Barcode');
                }
                else {
                    var sel_prod_json = _this.productJson.filter(function (i) { return i.ProductId == _this.barcodeValueSub[1]; });
                    if (sel_prod_json.length > 0) {
                        _this.addproduct(_this.barcodeValueSub[1]);
                    }
                    else {
                        _this.customToast('Product not found');
                    }
                }
                // alert(`${this.barcodeValueSub[0]} and ${this.barcodeValueSub[1]}`)
            }
        }).catch(function (err) {
        });
    };
    SuppliesPage.prototype.userOnChangeHandeler = function () {
        this.project_Id = 0;
        this.GetProjectDetails();
        this.sendLabRequest();
    };
    SuppliesPage.prototype.getUserRoleBasedOnUserId = function () {
        var _this = this;
        this.http.get(this.getUserRoleBasedOnUserIdUrl + '/' + this.facilityid + ',' + this.user_Id + ',' + 0).subscribe(function (data) {
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.curr_role_type = resJSON.split(',');
            if (_this.curr_role_type[0] == "Super Admin" || _this.curr_role_type[0] == "Provider Admin" || _this.curr_role_type[0] == "Institution Admin") {
                _this.isUserOpenUp = true;
            }
            else {
                _this.isUserOpenUp = false;
            }
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
        });
    };
    SuppliesPage.prototype.changeProductBasedOnGrant = function () {
        for (var i = 0; i < this.productJson.length; i++) {
            if (this.productJson[i]) {
                var temp_split_user_value = this.productJson[i].AllRoles.split(',');
                var indexof_curr_user = temp_split_user_value.indexOf(this.curr_role_type[0]);
                var temp_split_price_value = this.productJson[i].AllRolesPrice.split(',');
            }
            if (this.productJson[i].IsGrantPrice == false && this.productJson[i].IsUnitPrice == false) {
                //role based price
                if (indexof_curr_user >= 0) {
                    this.productJson[i].UnitPrice = temp_split_price_value[indexof_curr_user];
                    this.productJson[i].TotalPrice = this.productJson[i].UnitPrice * this.productJson[i].OrderQty;
                }
                else {
                    this.productJson[i].UnitPrice = 0;
                    this.productJson[i].TotalPrice = this.productJson[i].UnitPrice * this.productJson[i].OrderQty;
                }
            }
            else if (this.productJson[i].IsUnitPrice) {
                // unit price
            }
        }
    };
    SuppliesPage.prototype.continueToOrder = function () {
        var sel_Order_Qty = this.productJson.filter(function (i) { return i.OrderQty > 0; });
        if (sel_Order_Qty.length <= 0) {
            this.customToast("Quantity should not be empty.");
            return false;
        }
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__supplies_order_supplies_order__["a" /* SuppliesOrderPage */], {
            'facilityId': this.facilityid, 'orderId': this.orderId, 'curr_Order_Id': this.curr_order_Id,
            'orderDetails': sel_Order_Qty, 'tempProductJson': this.tempProductJson, 'userRoleOnFacility': this.curr_role_type
        });
    };
    SuppliesPage.prototype.addProductInValue = function (value, productId) {
        var sel_product_json = this.productJson.filter(function (i) { return i.ProductId == productId; });
        sel_product_json[0].OrderQty = value.target.value;
        sel_product_json[0].TotalPrice = sel_product_json[0].OrderQty * sel_product_json[0].UnitPrice;
        this.changeProductBasedOnGrant();
    };
    SuppliesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-supplies',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\supplies\supplies.html"*/'<!--\n\n  Generated template for the SuppliesPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n\n\n<ion-header>\n\n  <ion-navbar hideBackButton text-center>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Supplies</ion-title>\n\n    <ion-buttons end>\n\n      <div (click)="startScanner()">\n\n        <ion-icon name="qr-scanner" style="color: #0096ff"></ion-icon>\n\n\n\n      </div>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-item>\n\n    <ion-label>\n\n      Order Id : <b>{{orderId}}</b>\n\n    </ion-label>\n\n  </ion-item>\n\n  <ion-item>\n\n    <ion-label>\n\n      Facility*\n\n    </ion-label>\n\n    <ion-select placeholder=\'\' multiple="false" [(ngModel)]="facilityid"\n\n      (ionChange)="getProductDetailsBasedOnFacility()">\n\n      <ion-option *ngFor="let facility of userFacilitiesJson; let i = index;" selected="{{(i==0)}}"\n\n        value="{{facility.GroupId}}">{{facility.GroupName}}</ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n  <!--  <ion-item *ngIf="isUserOpenUp">\n\n    <ion-label>\n\n      User\n\n    </ion-label>\n\n    <ion-select placeholder=\'\' multiple="false" [(ngModel)]="user_Id" (ionChange)="userOnChangeHandeler()">\n\n      <ion-option *ngFor="let user of userJson" value="{{user.UserId}}">{{user.UserName}}</ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n  <ion-item id="page-select1" *ngIf="isprojectDisabled">\n\n    <ion-label>\n\n      Project<span *ngIf="isProjectMand">*</span>\n\n    </ion-label>\n\n    <ion-select placeholder=\'\' multiple="false" [(ngModel)]="project_Id" (ionChange)="sendLabRequest()">\n\n      <ion-option *ngIf=\'status_Proj\' value=\'0\' selected>No Records Found</ion-option>\n\n      <ion-option *ngIf=\'!status_Proj\' value=\'0\' selected>Not Applicable</ion-option>\n\n      <ion-option *ngFor="let project of project_Json " value="{{project.ProjectId}}">{{project.ProjectName}}\n\n      </ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n  <ion-item id="page-select2">\n\n    <ion-label>\n\n      Lab*\n\n    </ion-label>\n\n    <ion-select placeholder=\'\' multiple="false" [(ngModel)]="lab_Id" (ionChange)="accountHandling()">\n\n\n\n      <ion-option value=\'0\' selected>Select Lab</ion-option>\n\n      <ion-option *ngFor="let lab of lab_Json" value="{{lab.GroupId}}">{{lab.GroupName}}</ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n  <ion-item id="page-select3" [hidden]="isAccountOpenup">\n\n    <ion-label>\n\n      {{labType}}*\n\n    </ion-label>\n\n    <ion-select placeholder=\'\' multiple="false" [(ngModel)]="account_Id" (ionChange)="changeProductBasedOnGrant()">\n\n      <ion-option *ngIf=\'status_Account\' value="0">No Records Found</ion-option>\n\n      <ion-option *ngIf=\'!status_Account\' value=\'0\' selected>{{labType}}</ion-option>\n\n\n\n      <ion-option *ngFor="let AccCode of account_Json" value="{{AccCode.GroupAccountCodeId}}">{{AccCode.AccountCode}}\n\n      </ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n  <ion-item id="page-select3">\n\n      <ion-input type="number" value="" placeholder="Phone Number" [(ngModel)]="phonenumber"></ion-input>\n\n\n\n  </ion-item>\n\n\n\n  <ion-label>Shipping Address*</ion-label>\n\n  <ion-row>\n\n    <ion-col>\n\n      <ion-textarea [(ngModel)]="shippingAddress"></ion-textarea>\n\n    </ion-col>\n\n  </ion-row>-->\n\n\n\n\n\n  <ion-card>\n\n    <ion-row>\n\n      <ion-col col-1>\n\n        <ion-icon name="funnel" style="color: #0096ff;margin-top: 10px;" (click)="filterbyCategory()"></ion-icon>\n\n      </ion-col>\n\n      <ion-col>\n\n        <ion-searchbar [(ngModel)]="searchText" debounce=450 (ionInput)="getSearchResults()"\n\n          placeholder="Search Products">\n\n        </ion-searchbar>\n\n      </ion-col>\n\n    </ion-row>\n\n \n\n  </ion-card>\n\n\n\n  <ion-item id="page-select3" *ngIf="isFilterOpenUp">\n\n    <ion-select placeholder=\'\' multiple="false" [(ngModel)]="categoryId" id="filterbycategory"\n\n      (ionChange)="filterBasedOnCategory()">\n\n      <ion-option value=\'0\' selected>Select Category</ion-option>\n\n\n\n      <ion-option *ngFor="let category of categoryJson" value="{{category.CategoryId}}">{{category.CategoryName}}\n\n      </ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n\n\n  <ion-card-content *ngIf=\'!productStatus\'>No Records Found</ion-card-content>\n\n  <!-- <ion-list *ngFor="let products of productJson">\n\n    <div *ngIf=products.IsActive>\n\n      <ion-card-content *ngIf=\'productStatus\'>\n\n        <ion-list text-wrap class="disp">\n\n          <ion-grid>\n\n            <ion-row>\n\n              <ion-col col-9>\n\n                <p class="cardcontents"><b> {{products.ProductName}}</b></p>\n\n                <p class="cardcontents">Quantity Per Unit: {{products.QuantityPerUnit}}</p>\n\n\n\n              </ion-col>\n\n              <ion-col offset-4>\n\n                <p class="cardcontents">Price Per Unit: {{products.UnitPrice}} </p>\n\n                <ion-icon name="add-circle" (click)="addproduct(products.ProductId)" style="font-size: 25px;">\n\n                </ion-icon>\n\n                &nbsp;&nbsp;&nbsp;<b style="font-size: 25px;">{{products.OrderQty}}</b> &nbsp;&nbsp;&nbsp;\n\n                <ion-icon name="remove-circle" (click)="removeproduct(products.ProductId)" style="font-size: 25px;">\n\n                </ion-icon>\n\n\n\n              </ion-col>\n\n            </ion-row>\n\n          </ion-grid>\n\n\n\n        </ion-list>\n\n      </ion-card-content>\n\n    </div>\n\n  </ion-list>-->\n\n  <ion-card *ngFor="let products of productJson">\n\n\n\n    <ion-card-content>\n\n\n\n      <ion-row>\n\n        <ion-col col-7>\n\n          <b> {{products.ProductName}}</b>\n\n        </ion-col>\n\n        <ion-col>\n\n          <b> Price Per Unit: {{products.UnitPrice}}</b>\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n      <ion-row>\n\n        <ion-col col-7>\n\n          Quantity Per Unit: {{products.QuantityPerUnit}}\n\n        </ion-col>\n\n        <ion-col>\n\n       \n\n              <ion-icon name="remove-circle" (click)="removeproduct(products.ProductId)"\n\n              style="font-size: 25px;color: #0096ff">    </ion-icon>\n\n             <!--<ion-input type="text" placeholder={{products.OrderQty}} value={{products.OrderQty}} (change)="addProductInValue($event, products.ProductId)" style="    border-bottom: 1px solid;"></ion-input>-->\n\n           &nbsp;&nbsp;&nbsp;<b style="font-size: 25px;">{{products.OrderQty}}</b> &nbsp;&nbsp;&nbsp;\n\n            <ion-icon name="add-circle" (click)="addproduct(products.ProductId)"\n\n            style="font-size: 25px;color: #0096ff"></ion-icon>\n\n     \n\n\n\n      \n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-card-content>\n\n\n\n  </ion-card>\n\n  <br />\n\n  <br />\n\n</ion-content>\n\n<ion-footer no-shadow>\n\n  <ion-toolbar position="bottom" style="text-align: center;" *ngIf=\'productStatus\'>\n\n    <button ion-button block (click)="continueToOrder()">Continue</button>\n\n  </ion-toolbar>\n\n</ion-footer>'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\supplies\supplies.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_appointment_appointment__["a" /* AppointmentProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_barcode_scanner__["a" /* BarcodeScanner */]])
    ], SuppliesPage);
    return SuppliesPage;
}());

//# sourceMappingURL=supplies.js.map

/***/ }),

/***/ 247:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SuppliesOrderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_util__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_util__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__menu_menu__ = __webpack_require__(55);
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
 * Generated class for the SuppliesOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SuppliesOrderPage = /** @class */ (function () {
    function SuppliesOrderPage(navCtrl, navParams, toastCtrl, storage, loading, http, alertCtrl, actionctrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.loading = loading;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.actionctrl = actionctrl;
        this.userJson = [];
        this.account_mul_proj_val = [];
        this.labType = "Account Code";
        this.isprojectDisabled = true;
        this.productJson = [];
        this.totalPrice = 0;
    }
    SuppliesOrderPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.getProdcutsByCategoryIdsUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetProdcutsByCategoryIds';
            _this.getResourceUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetUsersByProviderId';
            _this.getAccountUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetAccountCodes';
            _this.getProjectUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetProjects';
            _this.getLabUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetLabs';
            _this.insertOrderUrl = _this.appUrl + '/WS/IdeaElanService.svc/InsertOrder';
            _this.getUserRoleBasedOnUserIdUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetUserRoleByUserIdAndProviderId';
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.curr_user_Json = val1;
            _this.user_Id = _this.curr_user_Json.UserId;
            _this.curr_user_id = _this.curr_user_Json.UserId;
            _this.orderDetails = _this.navParams.get('orderDetails');
            _this.facilityId = _this.navParams.get('facilityId');
            _this.orderId = _this.navParams.get('orderId');
            _this.curr_order_Id = _this.navParams.get('curr_Order_Id');
            _this.orderDetails = _this.navParams.get('orderDetails');
            _this.tempProductJson = _this.orderDetails;
            _this.userRoleOnFacility = _this.navParams.get('userRoleOnFacility');
            _this.project_Id = val1.DefaultProject;
            if (_this.project_Id <= 0 || _this.project_Id === undefined) {
                _this.project_Id = 0;
            }
            _this.lab_Id = val1.DefaultGroup;
            if (_this.lab_Id <= 0 || _this.lab_Id === undefined) {
                _this.lab_Id = 0;
            }
            var temp = 0;
            for (var i = 0; i < _this.orderDetails.length; i++) {
                _this.totalPrice = _this.orderDetails[i].TotalPrice + temp;
                temp = _this.totalPrice;
            }
            if (_this.curr_user_Json.Address1.length > 0) {
                _this.shippingAddress = _this.curr_user_Json.Address1;
            }
            if (_this.curr_user_Json.City.length > 0) {
                _this.shippingAddress = _this.shippingAddress + ',' + _this.curr_user_Json.City;
            }
            if (_this.curr_user_Json.State.length > 0) {
                _this.shippingAddress = _this.shippingAddress + ',' + _this.curr_user_Json.State;
            }
            if (_this.curr_user_Json.PostalCode.length > 0) {
                _this.shippingAddress = _this.shippingAddress + ', ' + _this.curr_user_Json.PostalCode;
            }
            // this.shippingAddress = this.curr_user_Json.Address1 + ',' + this.curr_user_Json.City + ',' + this.curr_user_Json.State + ',' + this.curr_user_Json.PostalCode
            _this.getResourceRequest();
            _this.GetProjectDetails();
            _this.sendLabRequest();
            //  this.phonenumber = this.curr_user_Json.Phone
            //  this.shippingAddress = this.curr_user_Json.Address1
        });
    };
    SuppliesOrderPage.prototype.ionViewDidEnter = function () {
    };
    SuppliesOrderPage.prototype.getResourceRequest = function () {
        var _this = this;
        this.http.get(this.getResourceUrl + '/' + this.facilityId).subscribe(function (data) {
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userJson = resJSON;
            if (_this.curr_user_id > 0) {
                var Json_Sel_user = _this.userJson.filter(function (i) { return i.UserId == _this.curr_user_id; });
            }
            if (Json_Sel_user.length <= 0) {
                _this.userJson.push({
                    EmailAddress: _this.curr_user_Json.EmailAddress,
                    FirstName: _this.curr_user_Json.FirstName,
                    UserId: _this.curr_user_Json.UserId,
                    UserName: _this.curr_user_Json.EmailAddress,
                    phone: _this.curr_user_Json.Phone
                });
            }
            //  this.user_Json = resJSON;
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
        });
    };
    SuppliesOrderPage.prototype.GetProjectDetails = function () {
        var _this = this;
        var dateTime = __WEBPACK_IMPORTED_MODULE_5_moment__().format("YYYY/MM/DD");
        this.http.post(this.getProjectUrl, {
            userid: this.user_Id,
            resourceid: 0,
            usertoken: this.curr_user_Json.UserToken,
            startdate: dateTime,
            loggedinuser: this.curr_user_Json.UserId,
            providerid: this.facilityId,
            isreservation: 0
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.project_Json = resJSON;
            if (_this.project_Json[0].hasOwnProperty('Message')) {
                _this.project_Id = 0;
                _this.isprojectDisabled = false;
            }
            else {
                _this.isprojectDisabled = true;
            }
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
                _this.project_Json = [];
            }
        });
    };
    SuppliesOrderPage.prototype.sendLabRequest = function () {
        var _this = this;
        this.status_Lab = false;
        this.http.post(this.getLabUrl, {
            userid: this.user_Id,
            resourceid: 0,
            usertoken: this.curr_user_Json.UserToken,
            projectid: this.project_Id,
            loggedinuser: this.curr_user_Json.UserId,
            providerid: this.facilityId
        }).subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            console.log('group', resJSON);
            _this.lab_Json = resJSON;
            // this.lab_Id = resJSON[0].GroupId
            _this.getUserRoleBasedOnUserId();
            //  /  this.changeProductBasedOnGrant()
            _this.GetAccountDetails();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            //  loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            _this.lab_Id = 0;
            _this.lab_Json = [];
            if (resErrJSON.status == 400) {
            }
        });
    };
    SuppliesOrderPage.prototype.GetAccountDetails = function () {
        var _this = this;
        if (this.isAccountOpenup) {
            return false;
        }
        this.status_Account = false;
        if (!this.isAccountOpenup) {
            if (this.lab_Id > 0) {
                var Json_Sel_lab = this.lab_Json.filter(function (i) { return i.GroupId == _this.lab_Id; });
                if (Json_Sel_lab[0].GroupType === "P") {
                    this.labType = "PO Number";
                }
                else {
                    this.labType = "Account Code";
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
        }).subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.account_Json = resJSON;
            if (_this.project_Id > 0 && _this.isprojectDisabled) {
                _this.account_mul_proj_val = [];
                for (var p = 0; _this.account_Json.length > p; p += 1) {
                    if (_this.account_Json[p].hasOwnProperty('ProjectIds')) {
                        if (_this.account_Json[p].ProjectIds == -1) {
                            _this.account_mul_proj_val.push(_this.account_Json[p]);
                        }
                        else {
                            var acc_map_multiple_acc = _this.account_Json[p].ProjectIds.split(",");
                            for (var i = 0; acc_map_multiple_acc.length > i; i += 1) {
                                if (acc_map_multiple_acc[i] == _this.project_Id) {
                                    _this.account_mul_proj_val.push(_this.account_Json[p]);
                                }
                            }
                        }
                    }
                }
                _this.account_Json = _this.account_mul_proj_val;
            }
            if (_this.account_Id > 0) {
                var acc_Id = _this.account_Json.filter(function (p) { return p.GroupAccountCodeId == _this.account_Id; });
            }
            if (acc_Id == undefined || JSON.parse(acc_Id.length) <= 0) {
                _this.account_Id = 0;
            }
            if (_this.projectType == "membership") {
                // Select the default PO code or Membership code.
                if (_this.account_Json.length > 0) {
                    _this.account_Id = _this.account_Json[0].GroupAccountCodeId;
                }
                //client based modification -- requirements:: "If membership is 'true' then hide Account code"
            }
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
                _this.account_Id = 0;
                _this.account_Json = [];
                _this.status_Account = true;
                //     this.GetSessionDetails(id);
            }
        });
    };
    SuppliesOrderPage.prototype.accountHandling = function () {
        this.getUserRoleBasedOnUserId();
        this.changeProductBasedOnGrant();
        this.getAccountValueByKey(this.lab_Id, this.lab_Json);
        if (!this.isAccountOpenup) {
            this.GetAccountDetails();
        }
        else {
            this.account_Id = 0;
            return false;
        }
    };
    SuppliesOrderPage.prototype.getAccountValueByKey = function (key, data) {
        // Requirements:: If GroupType=='N' then hide the Account code dropdown.
        if (data.length > 0) {
            for (var i = 0; data.length > i; i += 1) {
                if (data[i].GroupId == key) {
                    if (data[i].GroupType === 'N') {
                        this.isAccountOpenup = true;
                        return false;
                    }
                    else {
                        this.isAccountOpenup = false;
                        return true;
                    }
                }
            }
        }
    };
    SuppliesOrderPage.prototype.createOrderRequest = function () {
        var _this = this;
        var cxml = '<eSelectOrderDetailsList>';
        for (var i = 0; i < this.orderDetails.length; i++) {
            if (this.orderDetails[i].OrderQty > 0) {
                var productxml = cxml + "<eSelectOrderDetails><ProductId>" + this.orderDetails[i].ProductId + "</ProductId><Quantity>" + this.orderDetails[i].OrderQty + "</Quantity></eSelectOrderDetails>";
                cxml = productxml;
            }
        }
        cxml = cxml + "</eSelectOrderDetailsList>";
        var strProducts = "";
        for (var i = 0; i < this.orderDetails.length; i++) {
            var productlog = strProducts + this.orderDetails[i].ProductName + " with quantity " + this.orderDetails[i].OrderQty + " and with unit price " + this.orderDetails[i].UnitPrice + ", ";
            strProducts = productlog;
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
        }).subscribe(function (data) {
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            if (Object(__WEBPACK_IMPORTED_MODULE_4_util__["isNumber"])(resJSON) || !isNaN(resJSON)) {
                //  this.customToast("Order Placed Succesfully.")
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__menu_menu__["a" /* MenuPage */], { 'page': 'AllSupplies' });
                //  this.getProductDetailsBasedOnFacility()
            }
            else {
                _this.customToast(resJSON);
            }
            //this.orderId = resJSON
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
        });
    };
    SuppliesOrderPage.prototype.getUserRoleBasedOnUserId = function () {
        var _this = this;
        this.http.get(this.getUserRoleBasedOnUserIdUrl + '/' + this.facilityId + ',' + this.user_Id + ',' + this.lab_Id).subscribe(function (data) {
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.curr_role_type = resJSON.split(',');
            if (_this.userRoleOnFacility[0] == "Super Admin" || _this.userRoleOnFacility[0] == "Provider Admin" || _this.userRoleOnFacility[0] == "Institution Admin") {
                _this.isUserOpenUp = true;
            }
            else {
                _this.isUserOpenUp = false;
            }
            _this.changeProductBasedOnGrant();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
        });
    };
    SuppliesOrderPage.prototype.userOnChangeHandeler = function () {
        this.project_Id = 0;
        this.GetProjectDetails();
        this.sendLabRequest();
        this.changeProductBasedOnGrant();
    };
    SuppliesOrderPage.prototype.changeProductBasedOnGrant = function () {
        var _this = this;
        if (this.account_Id > 0) {
            var sel_account_json = this.account_Json.filter(function (i) { return i.GroupAccountCodeId == _this.account_Id; });
            this.grantName = sel_account_json[0].GrantName;
        }
        else {
            this.grantName = null;
        }
        for (var i = 0; i < this.orderDetails.length; i++) {
            var temp_split_user_value = this.orderDetails[i].AllRoles.split(',');
            var indexof_curr_user = temp_split_user_value.indexOf(this.curr_role_type[0]);
            var temp_split_price_value = this.orderDetails[i].AllRolesPrice.split(',');
            if (this.orderDetails[i].IsGrantPrice == false && this.orderDetails[i].IsUnitPrice == false) {
                //role based price
                if (indexof_curr_user >= 0) {
                    this.orderDetails[i].UnitPrice = temp_split_price_value[indexof_curr_user];
                    this.orderDetails[i].TotalPrice = this.orderDetails[i].UnitPrice * this.orderDetails[i].OrderQty;
                }
                else {
                    this.orderDetails[i].UnitPrice = 0;
                    this.orderDetails[i].TotalPrice = this.orderDetails[i].UnitPrice * this.orderDetails[i].OrderQty;
                }
            }
            else if (this.orderDetails[i].IsGrantPrice) {
                // grant price
                if (this.grantName == null || this.grantName == undefined || this.grantName == "") {
                    this.orderDetails[i].UnitPrice = 0;
                    this.orderDetails[i].TotalPrice = this.orderDetails[i].UnitPrice * this.orderDetails[i].OrderQty;
                }
                else {
                    var indexof_grant_acc_name = temp_split_user_value.indexOf(this.grantName);
                }
                if (indexof_grant_acc_name >= 0) {
                    this.orderDetails[i].UnitPrice = temp_split_price_value[indexof_grant_acc_name];
                    this.orderDetails[i].TotalPrice = this.orderDetails[i].UnitPrice * this.orderDetails[i].OrderQty;
                }
                else {
                    this.orderDetails[i].UnitPrice = 0;
                    this.orderDetails[i].TotalPrice = this.orderDetails[i].UnitPrice * this.orderDetails[i].OrderQty;
                }
            }
            else if (this.orderDetails[i].IsUnitPrice) {
                // unit price
            }
        }
        var temp = 0;
        for (var i = 0; i < this.orderDetails.length; i++) {
            this.totalPrice = this.orderDetails[i].TotalPrice + temp;
            temp = this.totalPrice;
        }
    };
    SuppliesOrderPage.prototype.projectOnChangeHandeler = function () {
        this.sendLabRequest();
        // this.GetAccountDetails()
    };
    SuppliesOrderPage.prototype.customToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 2000
        });
        toast.present();
    };
    SuppliesOrderPage.prototype.validationRequest = function () {
        if (this.isAccountOpenup) {
            if (this.lab_Id <= 0 || this.facilityId <= 0) {
                // this.showAlert("Enter required fields")
                this.customToast('Select Required Fileds');
                return false;
            }
            else {
                this.createOrderRequest();
            }
        }
        else if (this.lab_Id <= 0 || this.account_Id <= 0 || this.facilityId <= 0) {
            /// this.showAlert("Enter required fields")
            this.customToast('Select Required Fileds');
            return false;
        }
        else {
            this.createOrderRequest();
        }
    };
    SuppliesOrderPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-supplies-order',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\supplies-order\supplies-order.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Supplies Order</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-item  *ngIf="isUserOpenUp">\n\n    <ion-label>\n\n      User\n\n    </ion-label>\n\n    <ion-select placeholder=\'\' multiple="false" [(ngModel)]="user_Id" (ionChange)="userOnChangeHandeler()">\n\n      <ion-option *ngFor="let user of userJson" value="{{user.UserId}}">{{user.UserName}}</ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n  <ion-item id="page-select1" *ngIf="isprojectDisabled">\n\n    <ion-label>\n\n      Project \n\n    </ion-label>\n\n    <ion-select placeholder=\'\' multiple="false" [(ngModel)]="project_Id" (ionChange)="projectOnChangeHandeler()">\n\n      <ion-option *ngIf=\'status_Proj\' value=\'0\' selected>No Records Found</ion-option>\n\n      <ion-option *ngIf=\'!status_Proj\' value=\'0\' selected>Not Applicable</ion-option>\n\n      <ion-option *ngFor="let project of project_Json " value="{{project.ProjectId}}">{{project.ProjectName}}\n\n      </ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n  <ion-item id="page-select2">\n\n    <ion-label>\n\n      Lab*\n\n    </ion-label>\n\n    <ion-select placeholder=\'\' multiple="false" [(ngModel)]="lab_Id" (ionChange)="accountHandling()">\n\n\n\n      <ion-option  value=\'0\' selected>Select Lab</ion-option>\n\n      <ion-option *ngFor="let lab of lab_Json" value="{{lab.GroupId}}">{{lab.GroupName}}</ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n  <ion-item id="page-select3" [hidden]="isAccountOpenup">\n\n    <ion-label>\n\n      {{labType}}*\n\n    </ion-label>\n\n    <ion-select placeholder=\'\' multiple="false" [(ngModel)]="account_Id" (ionChange)="changeProductBasedOnGrant()">\n\n      <ion-option *ngIf=\'status_Account\' value="0">No Records Found</ion-option>\n\n      <ion-option *ngIf=\'!status_Account\' value=\'0\' selected>{{labType}}</ion-option>\n\n\n\n      <ion-option *ngFor="let AccCode of account_Json" value="{{AccCode.GroupAccountCodeId}}">{{AccCode.AccountCode}}\n\n      </ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n  <ion-label style="margin-left: 1px">\n\n   Shipping Address\n\n  </ion-label>\n\n  <ion-item>\n\n  \n\n      <ion-textarea [(ngModel)]="shippingAddress" style="border: 1px solid black;     padding: 5px 4px 3px 5px;" placeholder="Shipping Address"></ion-textarea>\n\n  </ion-item>\n\n  <p class="dropdown">Order Details</p>\n\n\n\n  <ion-card *ngFor="let orders of orderDetails">\n\n    <ion-card-content>\n\n          <ion-row>\n\n            <ion-col col-9>\n\n              <p class="cardcontents"><b> {{orders.ProductName}}</b></p>\n\n              <p class="cardcontents">Quantity Per Unit: {{orders.QuantityPerUnit}}</p>\n\n              <p class="cardcontents">Price Per Unit: {{orders.UnitPrice}} </p> \n\n              <p class="cardcontents">Order Qantity: {{orders.OrderQty}}</p>\n\n              <p class="cardcontents">Total Price: {{orders.OrderQty}} * {{orders.UnitPrice}} =  {{orders.TotalPrice}}</p>\n\n            </ion-col>       \n\n          </ion-row>\n\n    </ion-card-content>\n\n  </ion-card>\n\n  \n\n</ion-content>\n\n<ion-footer no-shadow>\n\n  <ion-toolbar position="bottom" style="text-align: center;" >\n\n    <ion-label><b>Total Price: {{totalPrice}}</b></ion-label>\n\n    <button ion-button block (click)="validationRequest()">Create an order</button>\n\n  </ion-toolbar>\n\n</ion-footer>\n\n\n\n\n\n \n\n'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\supplies-order\supplies-order.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
    ], SuppliesOrderPage);
    return SuppliesOrderPage;
}());

//# sourceMappingURL=supplies-order.js.map

/***/ }),

/***/ 280:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 280;

/***/ }),

/***/ 322:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/activitydashboard/activitydashboard.module": [
		821,
		43
	],
	"../pages/activitydetails/activitydetails.module": [
		861,
		6
	],
	"../pages/actual-usage/actual-usage.module": [
		848,
		42
	],
	"../pages/actualusagecounter/actualusagecounter.module": [
		822,
		41
	],
	"../pages/allchats/allchats.module": [
		849,
		40
	],
	"../pages/allreservation/allreservation.module": [
		850,
		39
	],
	"../pages/allsupplies/allsupplies.module": [
		823,
		38
	],
	"../pages/appointments/appointments.module": [
		864,
		37
	],
	"../pages/chat-content/chat-content.module": [
		851,
		5
	],
	"../pages/dashboard/dashboard.module": [
		852,
		36
	],
	"../pages/dashboarddetail/dashboarddetail.module": [
		824,
		35
	],
	"../pages/decription-modal/decription-modal.module": [
		825,
		4
	],
	"../pages/facilities/facilities.module": [
		826,
		34
	],
	"../pages/general-chat/general-chat.module": [
		827,
		3
	],
	"../pages/inbox/inbox.module": [
		862,
		33
	],
	"../pages/inboxsuppliesdetails/inboxsuppliesdetails.module": [
		828,
		2
	],
	"../pages/inboxview/inboxview.module": [
		829,
		32
	],
	"../pages/instrument-search/instrument-search.module": [
		853,
		31
	],
	"../pages/instrumentstechissue/instrumentstechissue.module": [
		830,
		30
	],
	"../pages/lab-dashboard/lab-dashboard.module": [
		844,
		29
	],
	"../pages/labs/labs.module": [
		831,
		28
	],
	"../pages/location-modal/location-modal.module": [
		832,
		27
	],
	"../pages/menu/menu.module": [
		854,
		26
	],
	"../pages/message/message.module": [
		855,
		25
	],
	"../pages/modal/modal.module": [
		833,
		24
	],
	"../pages/navi/navi.module": [
		863,
		23
	],
	"../pages/notification/notification.module": [
		834,
		22
	],
	"../pages/p-iinbox/p-iinbox.module": [
		856,
		21
	],
	"../pages/password/password.module": [
		837,
		20
	],
	"../pages/pin/pin.module": [
		835,
		19
	],
	"../pages/regulation/regulation.module": [
		836,
		1
	],
	"../pages/report/report.module": [
		857,
		18
	],
	"../pages/reset-password/reset-password.module": [
		838,
		17
	],
	"../pages/sampledetail/sampledetail.module": [
		845,
		16
	],
	"../pages/samplesubmission/samplesubmission.module": [
		839,
		15
	],
	"../pages/scanner/scanner.module": [
		840,
		14
	],
	"../pages/sign-in-modal/sign-in-modal.module": [
		846,
		13
	],
	"../pages/signin/signin.module": [
		858,
		12
	],
	"../pages/signup/signup.module": [
		841,
		11
	],
	"../pages/supplies-detail/supplies-detail.module": [
		842,
		0
	],
	"../pages/supplies-order/supplies-order.module": [
		859,
		10
	],
	"../pages/supplies/supplies.module": [
		860,
		9
	],
	"../pages/viewanimal/viewanimal.module": [
		843,
		8
	],
	"../pages/viewcage/viewcage.module": [
		847,
		7
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 322;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var NotificationProvider = /** @class */ (function () {
    function NotificationProvider(http, storage, loading, toastCtrl) {
        var _this = this;
        this.http = http;
        this.storage = storage;
        this.loading = loading;
        this.toastCtrl = toastCtrl;
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.getUserDeviceDetailsUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetUserDeviceDetails';
            _this.sendPushNotificationUrl = _this.appUrl + '/WS/IdeaElanService.svc/SendPushMessageToTokens';
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
        });
        this.storage.get('userType').then(function (val) {
        });
    }
    NotificationProvider.prototype.getUserDeviceDetails = function (name, value, type, msg, title) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . ."
        });
        // loader.present();
        //SEDNING REQUEST
        this.http.post(this.getUserDeviceDetailsUrl, {
            paramname: name,
            paramvalue: value,
            notificationtype: type,
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.sendPushNotification(resJSON, msg, title);
            //  loader.dismiss();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
        });
    };
    NotificationProvider.prototype.sendPushNotification = function (details, msg, title) {
        //SEDNING REQUEST
        // console.log("user details",this.f)
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . ."
        });
        //  loader.present();
        //SEDNING REQUEST
        this.http.post(this.sendPushNotificationUrl, {
            msg: msg,
            title: title,
            token: details,
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            //   this.notificationJson=resJSON;
            // loader.dismiss();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            // loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
        });
    };
    NotificationProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* ToastController */]])
    ], NotificationProvider);
    return NotificationProvider;
}());

//# sourceMappingURL=notification.js.map

/***/ }),

/***/ 473:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NertworkrequestProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var NertworkrequestProvider = /** @class */ (function () {
    function NertworkrequestProvider(http) {
        this.http = http;
    }
    NertworkrequestProvider.prototype.sendRequest = function (url, object) {
        var _this = this;
        this.http.post(url, { object: object }).subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); });
    };
    NertworkrequestProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], NertworkrequestProvider);
    return NertworkrequestProvider;
}());

//# sourceMappingURL=nertworkrequest.js.map

/***/ }),

/***/ 477:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppointmentProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the AppointmentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AppointmentProvider = /** @class */ (function () {
    function AppointmentProvider(http, storage) {
        var _this = this;
        this.http = http;
        this.storage = storage;
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.getLabUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetLabs';
            _this.getResourceUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetAllUserBasedOnResourceId';
            _this.getAccountUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetAccountCodes';
            _this.getProjectUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetProjects';
            _this.getSessionUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetSessionType';
            _this.getAdminUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetAdmins';
            _this.updateAppointmentUrl = _this.appUrl + '/WS/IdeaElanService.svc/InsertUpdateAppointment';
            _this.getAppointmentUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetAllReservations';
            _this.getUserDeviceDetailsUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetUserDeviceDetails';
            _this.getTagsUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetApplicationTags/';
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.user_Json = val1;
        });
    }
    AppointmentProvider.prototype.getResourceRequest = function (resource_Id) {
        this.http.post(this.getResourceUrl, {
            resourceid: resource_Id,
        }).subscribe(function (data) {
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            return resJSON;
            //  this.user_Json = resJSON;
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
        });
    };
    AppointmentProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], AppointmentProvider);
    return AppointmentProvider;
}());

//# sourceMappingURL=appointment.js.map

/***/ }),

/***/ 531:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signin_signin__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__menu_menu__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_fingerprint_aio__ = __webpack_require__(133);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







var HomePage = /** @class */ (function () {
    function HomePage(platform, faio, navCtrl, loading, storage) {
        var _this = this;
        this.platform = platform;
        this.faio = faio;
        this.navCtrl = navCtrl;
        this.loading = loading;
        this.storage = storage;
        this.storage.get('userLogout').then(function (val1) {
            _this.userLogout = val1;
            if (_this.userLogout == true) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__signin_signin__["a" /* SigninPage */]).then(function () {
                    var startIndex = _this.navCtrl.getActive().index - 1;
                    _this.navCtrl.remove(startIndex, 1);
                });
            }
        });
        this.storage.get("FToken").then(function (name) {
            _this.FToken = name;
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
        });
        this.storage.get('userRole').then(function (val) {
            _this.roleType = val;
        });
        //Modified by Anto Rupak
        this.storage.get('appLink').then(function (val1) {
            _this.checkUrl = val1;
            //Modified by Abey Abraham
            if (_this.checkUrl == null || _this.checkUrl == "") {
                _this.navCtrl.push('PinPage');
            }
            else if (_this.roleType == null) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__signin_signin__["a" /* SigninPage */]).then(function () {
                    var startIndex = _this.navCtrl.getActive().index - 1;
                    _this.navCtrl.remove(startIndex, 1);
                });
            }
            else if (_this.roleType != null || _this.roleType != "") {
                if (_this.userLogout == true) {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__signin_signin__["a" /* SigninPage */]).then(function () {
                        var startIndex = _this.navCtrl.getActive().index - 1;
                        _this.navCtrl.remove(startIndex, 1);
                    });
                }
                else {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__menu_menu__["a" /* MenuPage */]).then(function () {
                        var startIndex = _this.navCtrl.getActive().index - 1;
                        _this.navCtrl.remove(startIndex, 1);
                    });
                }
            }
            //ending
        });
    }
    HomePage.prototype.showFingerPrintDialog = function () {
        return __awaiter(this, void 0, void 0, function () {
            var available, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.platform.ready()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.faio.isAvailable()];
                    case 2:
                        available = _a.sent();
                        if (available == "finger" || available == "face") {
                            this.faio.show({
                                clientId: 'IdeaElan',
                                clientSecret: 'IdeaElan',
                                disableBackup: false,
                                localizedFallbackTitle: 'Use Pin',
                                localizedReason: 'Please Authenticate' //Only for iOS
                            }).then(function (result) {
                                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__menu_menu__["a" /* MenuPage */]).then(function () {
                                    var startIndex = _this.navCtrl.getActive().index - 1;
                                    _this.navCtrl.remove(startIndex, 1);
                                });
                            }).catch(function (error) {
                                //Fingerprint/Face was not successfully verified
                                if (error.message == "minimum SDK version 23 required") {
                                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__menu_menu__["a" /* MenuPage */]).then(function () {
                                        var startIndex = _this.navCtrl.getActive().index - 1;
                                        _this.navCtrl.remove(startIndex, 1);
                                    });
                                }
                                _this.platform.exitApp();
                            });
                        }
                        else {
                            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__menu_menu__["a" /* MenuPage */]).then(function () {
                                var startIndex = _this.navCtrl.getActive().index - 1;
                                _this.navCtrl.remove(startIndex, 1);
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        if (e_1.message === "Cancelled") {
                            //  this.navCtrl.push(SigninPage); 
                            this.platform.exitApp();
                        }
                        if (e_1.message === "minimum SDK version 23 required") {
                            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__menu_menu__["a" /* MenuPage */]).then(function () {
                                var startIndex = _this.navCtrl.getActive().index - 1;
                                _this.navCtrl.remove(startIndex, 1);
                            });
                        }
                        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__menu_menu__["a" /* MenuPage */]).then(function () {
                            var startIndex = _this.navCtrl.getActive().index - 1;
                            _this.navCtrl.remove(startIndex, 1);
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\home\home.html"*/'<ion-header>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  \n\n</ion-content>'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_fingerprint_aio__["a" /* FingerprintAIO */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 535:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivitydashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_activitylogs_activitylogs__ = __webpack_require__(18);
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
 * Created By Sumit Rajpal & No Modification
 */






var ActivitydashboardPage = /** @class */ (function () {
    function ActivitydashboardPage(logs, loading, navCtrl, navParams, http, storage) {
        this.logs = logs;
        this.loading = loading;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
    }
    ActivitydashboardPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.getFacilitiesUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetFacilitiesUserIsAdmin';
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
        });
        this.storage.get('roleType').then(function (val) {
            if (val == "user" || val == "labAdmin") {
                _this.userType = true;
            }
            else if (val == "super" || val == "admin" || val == "providerAdmin") {
                _this.userType = false;
            }
            else {
            }
        });
    };
    ActivitydashboardPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('spinnerIndex').then(function (val) {
            _this.spinnerIndex = Number(val);
        });
        this.facWeek = "0";
        this.facToday = "0";
        this.facToday = "0";
        this.insWeek = "0";
        this.insToday = "0";
        this.resWeek = "0";
        this.resToday = "0";
        this.samWeek = "0";
        this.samToday = "0";
        this.proWeek = "0";
        this.proToday = "0";
        this.popup = false;
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
            if (_this.userJson.UserId != "" || _this.userJson.UserId != null) {
                _this.sendFacilitiesRequest();
            }
            else {
            }
        });
    };
    ActivitydashboardPage.prototype.activityDetailsPage = function (pageType) {
        if (!this.emptyString) {
            this.navCtrl.push('ActivitydetailsPage', { "facilityId": this.providerValue, "pageType": pageType, "facilityName": this.groupname
            });
        }
    };
    ActivitydashboardPage.prototype.sendFacilitiesRequest = function () {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        this.http.post(this.getFacilitiesUrl, {
            userid: this.userJson.UserId,
            usertoken: this.userJson.UserToken,
        })
            .subscribe(function (data) {
            //RESPONSE
            _this.emptyString = false;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userFacilitiesJson = resJSON;
            if (resJSON == null) {
                _this.popup = true;
            }
            _this.providerValue = resJSON[_this.spinnerIndex].GroupId;
            _this.groupname = resJSON[_this.spinnerIndex].GroupName;
            loader.dismiss();
            _this.sendLabRequest(_this.userJson.UserId, _this.providerValue);
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            _this.popup = true;
            _this.emptyString = true;
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
            }
        });
    };
    ActivitydashboardPage.prototype.sendLabRequest = function (userId, providerId) {
        var _this = this;
        var getActiviyDashboardUrl = this.appUrl + '/WS/IdeaElanService.svc/GetActivityDashboardDetails/' + userId + ',' + providerId;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        this.http.get(getActiviyDashboardUrl)
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.facWeek = resJSON[0].count;
            _this.facToday = resJSON[1].count;
            _this.insWeek = resJSON[2].count;
            _this.insToday = resJSON[3].count;
            _this.resWeek = resJSON[4].count;
            _this.resToday = resJSON[5].count;
            _this.samWeek = resJSON[6].count;
            _this.samToday = resJSON[7].count;
            _this.proWeek = resJSON[8].count;
            _this.proToday = resJSON[9].count;
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
        });
    };
    ActivitydashboardPage.prototype.updateChange = function () {
        if (this.providerValue != "null") {
            this.providerValue;
            this.spinnerIndex = 0;
            for (var i = 0; i < this.userFacilitiesJson.length; i++) {
                this.storage.set('spinnerIndex', this.spinnerIndex);
                this.spinnerIndex++;
                if (this.providerValue == this.userFacilitiesJson[i].GroupId) {
                    break;
                }
            }
            this.sendLabRequest(this.userJson.UserId, this.providerValue);
        }
    };
    ActivitydashboardPage.prototype.selectedPage = function (index) {
    };
    ActivitydashboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-activitydashboard',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\activitydashboard\activitydashboard.html"*/'\n\n<ion-header>\n\n  <ion-navbar hideBackButton>\n\n\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n\n\n    <ion-title>Activity Dashboard</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content  overflow-scroll="false" >\n\n  <ion-row [class.hide]="userType" >\n\n    <ion-col>\n\n       <p class="dropdown">Facility</p>\n\n  </ion-col>\n\n  <ion-col class="dropcol">\n\n     <ion-select [(ngModel)]="providerValue" placeholder=\' Select Facility\' multiple="false" (ionChange)="updateChange()" >\n\n        <ion-option *ngIf=\'emptyString\' disabled selected value="null">No Records Found</ion-option>   \n\n      <ion-option *ngFor="let facility of userFacilitiesJson; let i = index;" selected="{{(i==0).toString()}}" value="{{facility.GroupId}}" >{{facility.GroupName}}</ion-option>\n\n         </ion-select>\n\n   </ion-col>\n\n  \n\n</ion-row>\n\n<hr>\n\n\n\n<ion-card class="facility" (click)="activityDetailsPage(\'Facility\')">\n\n           \n\n  \n\n<p class="cardp">Facility Access Requests</p>\n\n\n\n<table>\n\n  <tr>\n\n    <th>This Week</th>\n\n    <th>Today</th>\n\n  </tr>\n\n  <tr>\n\n    <td><b>{{facWeek}}</b></td>\n\n    <td><b>{{facToday}}</b></td>\n\n  </tr>\n\n  </table>\n\n</ion-card>\n\n<ion-card class="instrument" (click)="activityDetailsPage(\'Instruments\')">\n\n              \n\n  \n\n  <p class="cardp">Instrument Access Requests</p>\n\n  \n\n  <table>\n\n    <tr>\n\n      <th>This Week</th>\n\n      <th>Today</th>\n\n    </tr>\n\n    <tr>\n\n      <td><b>{{insToday}}</b></td>\n\n      <td><b>{{insWeek}}</b></td>\n\n    </tr>\n\n    </table>\n\n  </ion-card>\n\n  <ion-card class="reservation" (click)="activityDetailsPage(\'Reservation\')">\n\n              \n\n  \n\n    <p class="cardp">Reservations</p>\n\n    \n\n    <table>\n\n      <tr>\n\n        <th>This Week</th>\n\n        <th>Today</th>\n\n      </tr>\n\n      <tr>\n\n        <td><b>{{resToday}}</b></td>\n\n        <td><b>{{resWeek}}</b></td>\n\n      </tr>\n\n      </table>\n\n    </ion-card>\n\n    <ion-card class="sample" (click)="activityDetailsPage(\'Sample\')">\n\n              \n\n  \n\n      <p class="cardp">Sample Submission Requests</p>\n\n      \n\n      <table>\n\n        <tr>\n\n          <th>This Week</th>\n\n          <th>Today</th>\n\n        </tr>\n\n        <tr>\n\n          <td><b>{{samToday}}</b></td>\n\n          <td><b>{{samWeek}}</b></td>\n\n        </tr>\n\n        </table>\n\n      </ion-card>\n\n      <ion-card class="project">\n\n              \n\n  \n\n        <p class="cardp">Projects</p>\n\n        \n\n        <table >\n\n          <tr>\n\n            <th>This Week</th>\n\n            <th>Today</th>\n\n          </tr>\n\n          <tr>\n\n            <td><b>{{proWeek}}</b></td>\n\n            <td><b>{{proToday}}</b></td>\n\n          </tr>\n\n          </table>\n\n        </ion-card>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\activitydashboard\activitydashboard.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_activitylogs_activitylogs__["a" /* ActivitylogsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], ActivitydashboardPage);
    return ActivitydashboardPage;
}());

//# sourceMappingURL=activitydashboard.js.map

/***/ }),

/***/ 536:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllsuppliesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_message_message__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__message_message__ = __webpack_require__(67);
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
 * Generated class for the AllsuppliesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AllsuppliesPage = /** @class */ (function () {
    function AllsuppliesPage(actionctrl, message, navCtrl, storage, navParams, loading, http, alertCtrl) {
        this.actionctrl = actionctrl;
        this.message = message;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.navParams = navParams;
        this.loading = loading;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.startDate = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString();
        this.startDate = __WEBPACK_IMPORTED_MODULE_5_moment__(this.startDate).format('YYYY-MM-DD');
        //new Date(new Date().setDate(new Date().getDate() + 7)).toISOString();
        this.endDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();
        this.endDate = __WEBPACK_IMPORTED_MODULE_5_moment__(this.endDate).format('YYYY-MM-DD');
        this.SupStatus = false;
    }
    AllsuppliesPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.orderByUserId = _this.appUrl + '/WS/IdeaElanService.svc/GetOrdersByUserId';
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
        });
        this.storage.get('roleType').then(function (role) {
            _this.roleType = role;
            if (_this.roleType === "user" || _this.roleType === "labAdmin") {
                _this.title = "My Supplies";
            }
            else {
                _this.title = "All Supplies";
            }
        });
    };
    AllsuppliesPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
            if (_this.userJson.UserId == "" || _this.userJson.UserId == null) {
            }
            else {
                _this.sendSuppliesRequest();
            }
        });
    };
    AllsuppliesPage.prototype.startdatetime = function (event) {
        if (this.startDate > this.endDate) {
            this.startDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();
            this.startDate = __WEBPACK_IMPORTED_MODULE_5_moment__(this.startDate).format('YYYY-MM-DD');
            this.message.showMessage('Alert', "Start date cannot be after End Date.");
            return false;
        }
    };
    AllsuppliesPage.prototype.enddatetime = function (event) {
        this.startDate = __WEBPACK_IMPORTED_MODULE_5_moment__(this.startDate).format('YYYY-MM-DD');
        this.endDate = __WEBPACK_IMPORTED_MODULE_5_moment__(this.endDate).format('YYYY-MM-DD');
        if (!__WEBPACK_IMPORTED_MODULE_5_moment__(this.endDate).isAfter(this.startDate)) {
            this.endDate = new Date(new Date().setDate(new Date().getDate() + 30)).toISOString();
            this.endDate = __WEBPACK_IMPORTED_MODULE_5_moment__(this.endDate).format('YYYY-MM-DD');
            this.message.showMessage('Alert', "Selected date cannot be before to start date.");
        }
        //this.endDate = moment(this.navParams.get("endDate")).toISOString(true);
    };
    AllsuppliesPage.prototype.detailpage = function (data) {
        var _this = this;
        if (this.roleType == "user") {
            if (this.roleType == "user") {
                if (this.userJson.UserId != data.UserId) {
                    this.showdetail(data);
                    return;
                }
                if (data.Status == "Cancelled" || data.Status == "Completed") {
                    this.showdetail(data);
                    return;
                }
            }
            var actionSheet = this.actionctrl.create({
                title: 'Select Options',
                cssClass: 'myPage',
                buttons: [
                    {
                        //updated by Abey Abraham
                        text: 'Chat',
                        role: 'destructive',
                        cssClass: 'myActionSheetBtnStyle',
                        handler: function () {
                            //  this.logs.insertlog("View Issues ", "Facility Dashboard Page", "click event of card content", "User clicked the issues displayed in cards for viewing details  ", this.userJson.UserId);
                            //this.navCtrl.push('DashboarddetailPage', { "dashboardTicketDetail": instrument ,"userId":this.userJson.UserId});
                            if (_this.roleType == "user") {
                                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__message_message__["a" /* MessagePage */], { "OrderId": "" + data.OrderId, "id": "user", "ProviderId": "" + data.ProviderId, "source": "Order Number : " + data.OrderNumber, "chatType": "SuppliesOrder" });
                            }
                            // else if(this.roleType=="providerAdmin"){
                            //this.navCtrl.push(MessagePage, {"OrderId":`${data.OrderId}`,"id":"providerAdmin","ProviderId":`${data.ProviderId}`,"source":`Order Number : ${data.OrderNumber}`,"chatType":`SuppliesOrder`});
                            //}
                        }
                    },
                    {
                        text: 'Details',
                        role: 'destructive',
                        cssClass: 'myActionSheetBtnStyle',
                        handler: function () {
                            _this.navCtrl.push("SuppliesDetailPage", {
                                "orderid": data.OrderId,
                            });
                        }
                    },
                ]
            });
            actionSheet.present();
        }
        else {
            this.showdetail(data);
        }
    };
    AllsuppliesPage.prototype.showdetail = function (data) {
        var _this = this;
        var actionSheet = this.actionctrl.create({
            title: 'Select Options',
            cssClass: 'myPage',
            buttons: [
                {
                    text: 'Details',
                    role: 'destructive',
                    cssClass: 'myActionSheetBtnStyle',
                    handler: function () {
                        _this.navCtrl.push("SuppliesDetailPage", {
                            "orderid": data.OrderId,
                        });
                    }
                },
            ]
        });
        actionSheet.present();
        return;
    };
    AllsuppliesPage.prototype.sendSuppliesRequest = function () {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        /*
        userid:this.userJson.UserId,
          orderstatusid:0,
          fromdate:this.startDate,
          enddate:this.endDate
        */
        this.http.get(this.orderByUserId + "/" + this.userJson.UserId + ",0," + this.startDate + "," + this.endDate)
            .subscribe(function (data) {
            //RESPONSE
            _this.SupStatus = true;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userSuppliesJson = resJSON;
            console.log("response", resJSON);
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
            _this.SupStatus = true;
            if (resErrJSON.status == 400) {
            }
        });
    };
    AllsuppliesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-allsupplies',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\allsupplies\allsupplies.html"*/'\n\n<ion-header>\n\n  <ion-navbar hideBackButton text-center>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title> My Supplies</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content >\n\n  <!-- \n\n    <ion-row [class.hide]="userType" class="rowalign" >\n\n        <ion-col >\n\n           <p class="dropdown">Facility</p>\n\n      </ion-col>\n\n      <ion-col class="colalign">\n\n         <ion-select [(ngModel)]="facilityId" placeholder=\'Facility\' multiple="false" (ionChange)="updateChange()"  [disabled]="selectOption">\n\n            <ion-option *ngIf="emptyDropdown" selected>No Records Found</ion-option>  \n\n             <ion-option *ngFor="let facility of userFacilitiesJson; let i = index;" selected="{{(i==0)}}" value="{{facility.GroupId}}">{{facility.GroupName}}</ion-option>\n\n             </ion-select>\n\n       </ion-col>  \n\n    </ion-row>\n\n    \n\n    <hr [class.hide]="userType">\n\n  -->\n\n\n\n\n\n  <!--   original   \n\n    <div>\n\n      <ion-item>\n\n        <ion-datetime picker date [(ngModel)]="startDate" max="2099" min="1990" ></ion-datetime>\n\n        <ion-label> <button ion-button id="startbutton">Start Date</button> <span\n\n            class="date_time">{{startDate | date: "MM-dd-yyyy"}}</span></ion-label>\n\n      </ion-item>\n\n    </div>\n\n    <div>\n\n      <ion-item>\n\n        <ion-datetime picker date [(ngModel)]="endDate"  max="2099" min="1990"></ion-datetime>\n\n        <ion-label> <button ion-button id="endbutton">End Date</button>\n\n          <span class="date_time">{{endDate | date: "MM-dd-yyyy"}}</span></ion-label>\n\n      </ion-item>\n\n    </div>\n\n      <div text-center><button ion-button (click)="sendSuppliesRequest()">Go</button></div>       \n\n    <ion-card-content class="cardalign" *ngIf=\'!SupStatus\'>No Records Found</ion-card-content>\n\n\n\n  -->\n\n    <ion-grid>\n\n\n\n        <ion-row class="ion-align-items-center">\n\n          <ion-col>\n\n         \n\n          </ion-col>\n\n          <ion-col>\n\n            <div>\n\n              <ion-label>   \n\n                <button ion-button id="pistartbutton" >\n\n                    <ion-datetime picker date [(ngModel)]="startDate" max="2099" min="1990" (ionChange)="startdatetime($event)"></ion-datetime>\n\n                  <ion-icon name=\'calendar\'></ion-icon> <br>  <br><label class="btninlabel">Start Date</label>\n\n                  </button>\n\n               </ion-label>\n\n            </div>\n\n            <div class="date_times">{{startDate| date: "MM-dd-yyyy"}}</div>\n\n          </ion-col>\n\n          <ion-col>\n\n            <div>\n\n              <ion-label>   \n\n                <button ion-button id="piendbutton" >\n\n                    <ion-datetime picker date [(ngModel)]="endDate" (ionChange)="enddatetime($event)" max="2099" min="1990"></ion-datetime>\n\n    \n\n                  <ion-icon name=\'calendar\'></ion-icon> <br>  <br><label class="btninlabel">End Date &nbsp; &nbsp;</label></button>\n\n           \n\n              </ion-label>\n\n            </div>\n\n            <div class="date_timee">{{endDate   | date: "MM-dd-yyyy"}}</div>\n\n          </ion-col>\n\n          <ion-col>\n\n          \n\n          </ion-col>\n\n        </ion-row>\n\n      </ion-grid>\n\n        <div text-center ><button ion-button (click)="sendSuppliesRequest()" class="dateButton">Go</button></div>  \n\n        <ion-card-content class="cardalign" *ngIf=\'!SupStatus\'>No Records Found</ion-card-content>\n\n          \n\n     <!-- changes made \n\n    <ion-card-content class="cardalign" *ngIf=\'SupStatus\'>\n\n\n\n    <ion-list text-wrap *ngFor="let Supplies of userSuppliesJson; let i = index;" (click)="detailpage(Supplies.OrderId)" class="disp">\n\n      --> \n\n      <div *ngIf=\'SupStatus\' >\n\n      <ion-card *ngFor="let Supplies of userSuppliesJson; let i = index;" [ngSwitch]=Supplies.Status (click)="detailpage(Supplies)">\n\n      <div  class="cardheading"><b>Order Number : {{Supplies.OrderNumber}}</b></div>\n\n          <div class="cardsubheading">Lab Name : {{Supplies.GroupName}}</div>\n\n           <div class="cardsubtext">User : {{Supplies.UserFullName}}</div>\n\n           <div class="cardsubtext">Date : {{Supplies.CreatedDate |  date: "MM-dd-yyyy"}}</div>\n\n          <div class="cardsubtext" *ngIf="!Supplies.TotalAmount" >Total Amount : 0.00 {{Supplies.Currencycode}}</div>\n\n          <div class="cardsubtext" *ngIf="Supplies.TotalAmount" >Total Amount : {{Supplies.TotalAmount | number:\'1.2-2\'}} {{Supplies.Currencycode}}</div>\n\n          <div *ngSwitchCase="\'Approved\'" class="cardcontainertext">\n\n            <span class="cardstatus" >Status : </span>\n\n            <span class="cardstatusgreen"><ion-icon name="checkmark-circle" class="text"></ion-icon> {{Supplies.Status}}\n\n            </span>\n\n          </div>\n\n          <div *ngSwitchCase="\'Created\'" class="cardcontainertext"><span class="cardstatus" >Status : </span><span class="cardstatusgreen"><ion-icon name="checkmark-circle" class="text"></ion-icon> {{Supplies.Status}}</span></div>\n\n          <div *ngSwitchCase="\'Completed\'" class="cardcontainertext"><span class="cardstatus" >Status : </span><span class="cardstatusgreen"><ion-icon name="checkmark-circle" class="text"></ion-icon> {{Supplies.Status}}</span></div>\n\n          <div *ngSwitchCase="\'Cancelled\'" class="cardcontainertext"><span class="cardstatus" >Status : </span><span class="cardstatusred"> <ion-icon name="close-circle" class="text"></ion-icon> {{Supplies.Status}}</span></div>\n\n          <div *ngSwitchCase="\'Pending\'" class="cardcontainertext"><span class="cardstatus" >Status : </span><span class="cardstatusred"><ion-icon name="close-circle" class="text"></ion-icon> {{Supplies.Status}}</span></div>\n\n        \n\n         \n\n      </ion-card>\n\n      </div>\n\n      <!--\n\n      </ion-list>\n\n    </ion-card-content>\n\n    -->\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\allsupplies\allsupplies.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_4__providers_message_message__["a" /* MessageProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], AllsuppliesPage);
    return AllsuppliesPage;
}());

//# sourceMappingURL=allsupplies.js.map

/***/ }),

/***/ 537:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllreservationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_notification_notification__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_activitylogs_activitylogs__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__appointments_appointments__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_message_message__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__message_message__ = __webpack_require__(67);
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













var AllreservationPage = /** @class */ (function () {
    function AllreservationPage(message, logs, navCtrl, navParams, toastCtrl, loading, http, storage, actionctrl, alertCtrl, notification) {
        this.message = message;
        this.logs = logs;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.loading = loading;
        this.http = http;
        this.storage = storage;
        this.actionctrl = actionctrl;
        this.alertCtrl = alertCtrl;
        this.notification = notification;
        this.startDate = new Date(new Date().setDate(new Date().getDate())).toISOString();
        //new Date(new Date().setDate(new Date().getDate() + 7)).toISOString();
        this.endDate = new Date(new Date().setDate(new Date().getDate() + 30)).toISOString();
        // this.logs.insertlog("All Reservations","Menu Page","Clicked menu option",`User selected All Reservations options from Menu `,this.userJson.UserId);
    }
    AllreservationPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.getFacilitiesUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetFacilitiesUserIsAdmin';
            _this.deleteAppointmentUrl = _this.appUrl + '/WS/IdeaElanService.svc/DeleteAppointment';
            _this.getReservationUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetReservationRequest';
            _this.getUserReservationUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetUserReservations';
            _this.getUpdateReservationUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetSampleSubmissionMilestoneDetails';
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
        });
        this.storage.get('pin').then(function (val) {
            _this.pin = val;
        });
        this.storage.get('roleType').then(function (val) {
            _this.roletype = val;
            if (val == "user" || val == "labAdmin") {
                _this.userType = true;
                _this.reservationTitle = "My Reservation";
            }
            else if (val == "super" || val == "admin" || val == "providerAdmin") {
                _this.userType = false;
                _this.reservationTitle = "All Reservation";
            }
            else {
            }
        });
    };
    AllreservationPage.prototype.buttonRequest = function () {
        this.logs.insertlog("Reservation Request", "All Reservation", "Go button", "User selected the dates and checked all reservations list ", this.userJson.UserId);
        if (this.userType) {
            this.sendUserReservationRequest("initial");
        }
        else {
            this.sendReservationRequest(this.facilityId, "");
        }
    };
    AllreservationPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('spinnerReservation').then(function (val) {
            _this.spinnerIndex = Number(val);
        });
        this.storage.get('userDetails').then(function (val2) {
            if (_this.userType) {
                _this.sendUserReservationRequest("initial");
            }
            else {
                _this.sendFacilitiesRequest();
            }
        });
    };
    AllreservationPage.prototype.sendFacilitiesRequest = function () {
        var _this = this;
        this.http.post(this.getFacilitiesUrl, {
            userid: this.userJson.UserId,
            usertoken: this.userJson.UserToken,
        })
            .subscribe(function (data) {
            //RESPONSE
            _this.emptyDropdown = false;
            _this.selectOption = false;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userFacilitiesJson = resJSON;
            console.log(resJSON);
            _this.facilityId = resJSON[_this.spinnerIndex].GroupId;
            _this.sendReservationRequest(_this.facilityId, "");
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            _this.selectOption = true;
            _this.emptyDropdown = true;
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
            }
        });
    };
    AllreservationPage.prototype.actionSheetMethod = function (facilityAccess) {
        var _this = this;
        console.log("this.roletype", this.roletype);
        if (this.roletype == "user" || this.roletype == "providerAdmin") {
            console.log("if1");
            if (this.roletype == "user") {
                console.log("if2");
                if (this.userJson.UserId != facilityAccess.UserId) {
                    console.log("if3");
                    this.showdetail(facilityAccess);
                    return;
                }
            }
            if (this.roletype == "providerAdmin") {
                if (this.userJson.UserId == facilityAccess.UserId) {
                    this.showdetail(facilityAccess);
                    return;
                }
            }
            //&& facilityAccess.Status!="Elapsed"
            if (facilityAccess.Status != "Rejected") {
                var actionSheetR = this.actionctrl.create({
                    title: 'Select Option : ' + facilityAccess.ResourceName,
                    cssClass: 'myPage',
                    buttons: [
                        {
                            text: "Edit Appointment",
                            role: 'destructive',
                            cssClass: 'myActionSheetBtnStyle',
                            handler: function () {
                                _this.logs.insertlog("Edit Appointment", "All Reservation", "Action Sheet", "User selected the edit appointment option for Appointment id " + facilityAccess.AppointmentId + " ", _this.userJson.UserId);
                                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__appointments_appointments__["a" /* AppointmentsPage */], {
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
                                var confirm = _this.alertCtrl.create({
                                    title: "Cancel Appointment",
                                    message: 'Do you want to cancel the Appointment ?',
                                    buttons: [
                                        {
                                            text: 'Yes',
                                            handler: function () {
                                                _this.logs.insertlog("Cancel Appointment", "All Reservation", "Action Sheet", "User selected the edit appointment option for Appointment id " + facilityAccess.AppointmentId + " ", _this.userJson.UserId);
                                                //changes by Abey Abraham
                                                _this.appid = facilityAccess.AppointmentId;
                                                _this.sdate = facilityAccess.strStartTime;
                                                _this.edate = facilityAccess.strEndTime;
                                                _this.resourscename = facilityAccess.ResourceName;
                                                _this.resid = facilityAccess.ResourceId;
                                                _this.CancelAppointmentRequest(facilityAccess.AppointmentId);
                                            }
                                        },
                                        {
                                            text: 'No',
                                            handler: function () {
                                            }
                                        }
                                    ]
                                });
                                confirm.present();
                            }
                        },
                        {
                            text: "Chat",
                            role: 'destructive',
                            cssClass: 'myActionSheetBtnStyle',
                            handler: function () {
                                if (_this.roletype == "user") {
                                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__message_message__["a" /* MessagePage */], { "LabId": "" + facilityAccess.LabId, "instrumentid": "" + facilityAccess.ResourceId, "id": "user", "AppointmentId": "" + facilityAccess.AppointmentId, "source": "" + facilityAccess.ResourceName, "chatType": "Reservations" });
                                }
                                else if (_this.roletype == "providerAdmin") {
                                    _this.navCtrl.push('ChatContentPage', { "role": "" + _this.roletype, "userid": "" + facilityAccess.UserId, "adminid": "" + _this.userJson.UserId, "instrumentid": "" + facilityAccess.ResourceId, "senderName": facilityAccess.LastName + " " + facilityAccess.FirstName, "pin": "" + _this.pin, "source": "" + facilityAccess.ResourceName, "chatType": "Reservations", "AppointmentId": "" + facilityAccess.AppointmentId });
                                    //this.navCtrl.push(MessagePage, {"LabId":`${facilityAccess.LabId}`,"instrumentid":`${facilityAccess.ResourceId}`,"id":"providerAdmin","AppointmentId":`${facilityAccess.AppointmentId}`,"source":`${facilityAccess.ResourceName}`,"chatType":`Reservations`});
                                }
                            }
                        }
                    ]
                });
                actionSheetR.present();
            }
        }
        else {
            console.log("if4");
            this.showdetail(facilityAccess);
        }
    };
    AllreservationPage.prototype.showdetail = function (facilityAccess) {
        var _this = this;
        if (facilityAccess.Status != "Rejected" && facilityAccess.Status != "Elapsed") {
            var actionSheetR = this.actionctrl.create({
                title: 'Select Option : ' + facilityAccess.ResourceName,
                cssClass: 'myPage',
                buttons: [
                    {
                        text: "Edit Appointment",
                        role: 'destructive',
                        cssClass: 'myActionSheetBtnStyle',
                        handler: function () {
                            _this.logs.insertlog("Edit Appointment", "All Reservation", "Action Sheet", "User selected the edit appointment option for Appointment id " + facilityAccess.AppointmentId + " ", _this.userJson.UserId);
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__appointments_appointments__["a" /* AppointmentsPage */], {
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
                            var confirm = _this.alertCtrl.create({
                                title: "Cancel Appointment",
                                message: 'Do you want to cancel the Appointment ?',
                                buttons: [
                                    {
                                        text: 'Yes',
                                        handler: function () {
                                            _this.logs.insertlog("Cancel Appointment", "All Reservation", "Action Sheet", "User selected the edit appointment option for Appointment id " + facilityAccess.AppointmentId + " ", _this.userJson.UserId);
                                            //changes by Abey Abraham
                                            _this.appid = facilityAccess.AppointmentId;
                                            _this.sdate = facilityAccess.strStartTime;
                                            _this.edate = facilityAccess.strEndTime;
                                            _this.resourscename = facilityAccess.ResourceName;
                                            _this.resid = facilityAccess.ResourceId;
                                            _this.CancelAppointmentRequest(facilityAccess.AppointmentId);
                                        }
                                    },
                                    {
                                        text: 'No',
                                        handler: function () {
                                        }
                                    }
                                ]
                            });
                            confirm.present();
                        }
                    },
                ]
            });
            actionSheetR.present();
        }
        return;
    };
    //Cancel Appointment 
    AllreservationPage.prototype.CancelAppointmentRequest = function (eventid) {
        var _this = this;
        this.http.post(this.deleteAppointmentUrl, {
            apptid: eventid,
            user: this.userJson.EmailAddress
        })
            .subscribe(function (data) {
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.notification.getUserDeviceDetails("resource", _this.resid, "UCA", "Appointment from " + _this.sdate + " to " + _this.edate + " for " + _this.resourscename + " has been cancelled", "Appointment Cancelled");
            if (resJSON == "Success") {
                if (_this.userType) {
                    _this.sendUserReservationRequest("cancel");
                }
                else {
                    _this.sendReservationRequest(_this.facilityId, "cancel");
                }
            }
            //    this.getUserDeviceDetails("Appointment Cancelled","Appointment has been cancelled","UCA")
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
        });
    };
    AllreservationPage.prototype.sendReservationRequest = function (faclility, status) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        this.http.post(this.getReservationUrl, {
            userid: "",
            usertoken: "",
            facilityid: faclility,
            starttime: this.startDate,
            endtime: this.endDate
        })
            .subscribe(function (data) {
            //RESPONSE
            _this.facStatus = true;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userReservtionJson = resJSON;
            console.log("details", _this.userReservtionJson);
            _this.appid = resJSON[0].AppointmentId;
            _this.sdate = resJSON[0].strStartTime;
            _this.edate = resJSON[0].strEndTime;
            _this.resourscename = resJSON[0].ResourceName;
            _this.resid = resJSON[0].ResourceId;
            loader.dismiss();
            if (status.match("cancel")) {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Message',
                    subTitle: 'Appointment cancelled Successfully',
                    buttons: ['Dismiss']
                });
                alert_1.present();
            }
            // loader.dismiss();
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
    AllreservationPage.prototype.sendUserReservationRequest = function (text) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        this.http.post(this.getUserReservationUrl, {
            userid: this.userJson.UserId,
            starttime: this.startDate,
            endtime: this.endDate
        })
            .subscribe(function (data) {
            //RESPONSE
            _this.facStatus = true;
            _this.selectOption = false;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userReservtionJson = resJSON;
            console.log(resJSON);
            loader.dismiss();
            if (text.match("cancel")) {
                var alert_2 = _this.alertCtrl.create({
                    title: 'Message',
                    subTitle: 'Appointment cancelled Successfully',
                    buttons: ['Dismiss']
                });
                alert_2.present();
            }
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            _this.selectOption = true;
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            _this.facStatus = false;
            if (resErrJSON.status == 400) {
            }
        });
    };
    AllreservationPage.prototype.updateChange = function () {
        this.facilityId;
        this.sendReservationRequest(this.facilityId, "");
        this.spinnerIndex = 0;
        for (var i = 0; i < this.userFacilitiesJson.length; i++) {
            this.storage.set('spinnerReservation', this.spinnerIndex);
            this.spinnerIndex++;
            if (this.facilityId == this.userFacilitiesJson[i].GroupId) {
                break;
            }
        }
    };
    AllreservationPage.prototype.startdatetime = function (event, data) {
        if (this.startDate > this.endDate) {
            this.startDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();
            this.message.showMessage('Alert', "Start date cannot be after End Date.");
            return false;
        }
    };
    AllreservationPage.prototype.enddatetime = function (event) {
        this.startDate = __WEBPACK_IMPORTED_MODULE_4_moment__(this.startDate).toISOString(true);
        this.endDate = __WEBPACK_IMPORTED_MODULE_4_moment__(this.endDate).toISOString(true);
        if (!__WEBPACK_IMPORTED_MODULE_4_moment__(this.endDate).isAfter(this.startDate)) {
            this.endDate = new Date(new Date().setDate(new Date().getDate() + 30)).toISOString();
            this.message.showMessage('Alert', "Selected date cannot be before to start date.");
        }
        //this.endDate = moment(this.navParams.get("endDate")).toISOString(true);
    };
    AllreservationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-allreservation',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\allreservation\allreservation.html"*/'\n\n<ion-header>\n\n  <ion-navbar hideBackButton text-center>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>{{reservationTitle}}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n    <ion-row [class.hide]="userType" class="rowalign" >\n\n        <ion-col >\n\n           <p class="dropdown">Facility</p>\n\n      </ion-col>\n\n      <ion-col class="colalign">\n\n         <ion-select [(ngModel)]="facilityId" placeholder=\'Facility\' multiple="false" (ionChange)="updateChange()"  [disabled]="selectOption">\n\n            <ion-option *ngIf="emptyDropdown" selected>No Records Found</ion-option>  \n\n             <ion-option *ngFor="let facility of userFacilitiesJson; let i = index;" selected="{{(i==0)}}" value="{{facility.GroupId}}">{{facility.GroupName}}</ion-option>\n\n             </ion-select>\n\n       </ion-col>  \n\n    </ion-row>\n\n    \n\n    <hr [class.hide]="userType">\n\n   \n\n     <ion-grid>\n\n\n\n    <ion-row class="ion-align-items-center">\n\n      <ion-col>\n\n     \n\n      </ion-col>\n\n      <ion-col>\n\n        <div>\n\n          <ion-label>   \n\n            <button ion-button id="pistartbutton" >\n\n                <ion-datetime picker date [(ngModel)]="startDate" max="2099" min="1990" (ionChange)="startdatetime($event)"></ion-datetime>\n\n              <ion-icon name=\'calendar\'></ion-icon> <br>  <br><label class="btninlabel">Start Date</label>\n\n              </button>\n\n           </ion-label>\n\n        </div>\n\n        <div class="date_times">{{startDate| date: "MM-dd-yyyy"}}</div>\n\n      </ion-col>\n\n      <ion-col>\n\n        <div>\n\n          <ion-label>   \n\n            <button ion-button id="piendbutton" >\n\n                <ion-datetime picker date [(ngModel)]="endDate" (ionChange)="enddatetime($event)" max="2099" min="1990"></ion-datetime>\n\n\n\n              <ion-icon name=\'calendar\'></ion-icon> <br>  <br><label class="btninlabel">End Date &nbsp; &nbsp;</label></button>\n\n       \n\n          </ion-label>\n\n        </div>\n\n        <div class="date_timee">{{endDate   | date: "MM-dd-yyyy"}}</div>\n\n      </ion-col>\n\n      <ion-col>\n\n      \n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n    <div text-center ><button ion-button (click)="buttonRequest()" class="dateButton">Go</button></div>  \n\n    <ion-card-content class="cardalign" *ngIf=\'!facStatus\'>No Records Found</ion-card-content>\n\n      \n\n  <div *ngIf=\'facStatus\'>\n\n  <ion-card *ngFor="let reservationAccess of userReservtionJson; let i = index;" [ngSwitch]=reservationAccess.Status (click)=\'actionSheetMethod(reservationAccess)\'>\n\n  <div class="cardheading">{{reservationAccess.ResourceName}}</div>\n\n  <div class="cardsubheading">User : {{reservationAccess.UserFullName}}</div>\n\n  <div class="cardcontainertext">\n\n    <span class="cardlefttext">Lab : {{reservationAccess.LabName}}</span>\n\n     <span class="cardrighttext">{{reservationAccess.SessionType}}</span>\n\n    </div>\n\n  <div class="cardsubtext" [class.hide]="!userType" *ngIf="reservationAccess.GroupType!=\'P\'">Account Code : {{reservationAccess.AccountCode}}</div>\n\n  <div class="cardsubtext" [class.hide]="!userType" *ngIf="reservationAccess.GroupType==\'P\'">PO Number : {{reservationAccess.AccountCode}}</div>\n\n  <div *ngSwitchCase="\'Approved\'" class="cardcontainertext">\n\n    <span class="cardstatus" >Status : </span>\n\n    <span class="cardstatusgreen"><ion-icon name="checkmark-circle" class="text"></ion-icon> {{reservationAccess.Status}}\n\n    </span>\n\n  </div>\n\n  <div *ngSwitchCase="\'Waitlisted\'" class="cardcontainertext"><span class="cardstatus" >Status : </span><span class="cardstatusgreen"><ion-icon name="checkmark-circle" class="text"></ion-icon> {{reservationAccess.Status}}</span></div>\n\n  <div *ngSwitchCase="\'Rejected\'" class="cardcontainertext"><span class="cardstatus" >Status : </span><span class="cardstatusred"> <ion-icon name="close-circle" class="text"></ion-icon> {{reservationAccess.Status}}</span></div>\n\n  <div *ngSwitchCase="\'Pending\'" class="cardcontainertext"><span class="cardstatus" >Status : </span><span class="cardstatusred"><ion-icon name="close-circle" class="text"></ion-icon> {{reservationAccess.Status}}</span></div>\n\n  <div *ngSwitchCase="\'Upcoming\'" class="cardcontainertext"><span class="cardstatus" >Status : </span><span class="cardstatusgreen"><ion-icon name="checkmark-circle" class="text"></ion-icon> {{reservationAccess.Status}}</span></div>\n\n  <div *ngSwitchCase="\'Elapsed\'" class="cardcontainertext"><span class="cardstatus" >Status : </span><span class="cardstatusred"><ion-icon name="close-circle" class="text"></ion-icon> {{reservationAccess.Status}}</span></div>\n\n  <div class="cardcontainertext">\n\n    <span class="cardlefttime"> <ion-icon name="time" class="text"></ion-icon> {{reservationAccess.strStartTime}}</span> \n\n    <span class="cardrighttime"><ion-icon name="time" class="text"></ion-icon> {{reservationAccess.strEndTime}}</span>\n\n  </div>\n\n  </ion-card>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\allreservation\allreservation.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__providers_message_message__["a" /* MessageProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_activitylogs_activitylogs__["a" /* ActivitylogsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5__providers_notification_notification__["a" /* NotificationProvider */]])
    ], AllreservationPage);
    return AllreservationPage;
}());

//# sourceMappingURL=allreservation.js.map

/***/ }),

/***/ 538:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_fcm_fcm__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_activitylogs_activitylogs__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/* Modified by Abey Abraham */







var NotificationPage = /** @class */ (function () {
    function NotificationPage(logs, navCtrl, loading, navParams, storage, fcm, http) {
        this.logs = logs;
        this.navCtrl = navCtrl;
        this.loading = loading;
        this.navParams = navParams;
        this.storage = storage;
        this.http = http;
        this.notifytog = true;
    }
    NotificationPage.prototype.ionViewDidLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.storage.get('appLink').then(function (val) {
                    _this.appUrl = val;
                    _this.insertUpdateNotificationAppUrl = _this.appUrl + '/WS/IdeaElanService.svc/InsertUpdateNotificationsMobileApp';
                    _this.getUserDeviceDetailsUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetUserDeviceDetails';
                    _this.getNotificationUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetMobielAppNotifications/All,';
                });
                this.storage.get('userDetails').then(function (val1) {
                    _this.userJson = val1;
                });
                this.storage.get('roleType').then(function (val) {
                    if (val == "user" || val == "labAdmin") {
                        _this.userType = true;
                    }
                    else if (val == "super" || val == "admin" || val == "providerAdmin") {
                        _this.userType = false;
                    }
                    else {
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    NotificationPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.get('userDetails').then(function (val1) {
            _this.getMobileAppNotification();
        });
    };
    NotificationPage.prototype.getMobileAppNotification = function () {
        var _this = this;
        var notification = this.getNotificationUrl + this.userJson.UserToken + "," + this.userJson.UserId;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . ."
        });
        loader.present();
        //SEDNING REQUEST
        this.http.get(notification)
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.notificationJson = resJSON;
            loader.dismiss();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
        });
    };
    NotificationPage.prototype.updateNotificationApp = function (usernotificationid, notificationid, notificationvalue, isactive) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading. . . "
        });
        loader.present();
        this.http.post(this.insertUpdateNotificationAppUrl, {
            usernotificationid: usernotificationid,
            notificationid: notificationid,
            notificationvalue: notificationvalue,
            isactive: isactive,
            usertoken: this.userJson.UserToken,
            userid: this.userJson.UserId
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.UpdateNotificationJson = resJSON;
            _this.logs.insertlog("Notification Dashboard ", "Notifications", "changed status of notification  ", "User changed status of notification through toggle button  ", _this.userJson.UserId);
            loader.dismiss();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
        });
    };
    NotificationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-notification',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\notification\notification.html"*/'<!--\n\n  Generated template for the NotificationPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar hideBackButton text-center>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Notifications</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <p   style="font-size: 2rem" class="dropdown">User</p>\n\n    <ion-list *ngFor="let notification of notificationJson" [ngSwitch]=notification.NotificationType >\n\n  \n\n  \n\n          <ion-row  class="bottomRow" *ngSwitchCase="\'U\'">\n\n            <ion-item no-lines>\n\n            <ion-label ><p class="don">{{notification.NotificationText}}</p></ion-label>\n\n              <ion-toggle  class="handle" [(ngModel)]="notification.UserIsActive" (ionChange)="updateNotificationApp(notification.UserNotificationId,notification.NotificationId,notification.NotificationValue,notification.UserIsActive)"></ion-toggle>\n\n            </ion-item></ion-row>\n\n    </ion-list>\n\n   \n\n   \n\n        <ion-list  class="list-md" *ngIf=\'!userType\'>\n\n            <p  style="font-size: 2rem" class="dropdown">Facility Admin</p>\n\n            <ion-row *ngFor="let notification of notificationJson" [ngSwitch]=notification.NotificationType>\n\n              <ion-item no-lines *ngSwitchCase="\'A\'">\n\n                <ion-label> <p class="don">{{notification.NotificationText}}</p> </ion-label>\n\n                   <ion-toggle [(ngModel)]="notification.UserIsActive" (ionChange)="updateNotificationApp(notification.UserNotificationId,notification.NotificationId,notification.NotificationValue,notification.UserIsActive)"></ion-toggle>\n\n                  </ion-item> \n\n                </ion-row> \n\n              </ion-list>\n\n   \n\n  </ion-content>>\n\n'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\notification\notification.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__providers_activitylogs_activitylogs__["a" /* ActivitylogsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2__providers_fcm_fcm__["a" /* FcmProvider */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */]])
    ], NotificationPage);
    return NotificationPage;
}());

//# sourceMappingURL=notification.js.map

/***/ }),

/***/ 539:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NaviPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__password_password__ = __webpack_require__(540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__signin_signin__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__schedular_schedular__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__actual_usage_actual_usage__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_notification_notification__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_forms__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_message_message__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_activitylogs_activitylogs__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_instrumentstechissue_instrumentstechissue__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_fingerprint_aio__ = __webpack_require__(133);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/***
 * Created By Sumit Rajpal
 */

















var NaviPage = /** @class */ (function () {
    function NaviPage(platform, faio, logs, message, navCtrl, navParams, storage, loading, http, actionctrl, formBuilder, notification) {
        this.platform = platform;
        this.faio = faio;
        this.logs = logs;
        this.message = message;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.loading = loading;
        this.http = http;
        this.actionctrl = actionctrl;
        this.formBuilder = formBuilder;
        this.notification = notification;
        this.page = "1";
        this.result = [];
        this.as_role = 'destructive';
        this.as_option = 'Select Options';
        this.as_report = 'Report an Issue';
        this.as_rules = 'Rules and Regulations';
        this.as_usage = 'Start Actual Usage';
        this.as_allissue = 'View All Issues';
        this.regexp = new RegExp('(0/91)?[7-9][0-9]{9}'); //as per indian number 
        this.authCheckbox = false;
        this.hidAuthVar = true;
    }
    NaviPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.pageSelected = 1;
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.updateDetailsUrl = _this.appUrl + '/WS/IdeaElanService.svc/InsertUpdateUser';
            _this.getCountry = _this.appUrl + '/WS/IdeaElanService.svc/GetAllCountries';
            _this.getInstrumentUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetResourcesNonIOT';
            _this.getFacilityUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetAllFacilities';
            _this.getLabUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetUserLabs';
            _this.favouriteUrl = _this.appUrl + '/WS/IdeaElanService.svc/InsertUserFavorite';
            _this.getUserDetailsUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetUserDetails';
            _this.updateInstrumentUrl = _this.appUrl + '/WS/IdeaElanService.svc/InsertResourcePermission';
            if (_this.appUrl.includes('/NMI')) {
                _this.clientType = 'nmi';
            }
            else if (_this.appUrl.includes('/uq')) {
                _this.clientType = 'uq';
            }
            else if (_this.appUrl.includes('/caltech')) {
                _this.clientType = 'caltech';
            }
            _this.storage.set('clientType', _this.clientType);
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
        });
        // console.log("userdetails", this.userJson );
        this.emptyString = true;
        this.noInstruments = false;
    };
    NaviPage.prototype.ionViewDidEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loadauth();
                        return [4 /*yield*/, this.storage.get('FToken').then(function (val1) {
                                _this.IsToken = val1;
                            })];
                    case 1:
                        _a.sent();
                        this.storage.get('userDetails').then(function (val1) {
                            _this.userJson = val1;
                            if (_this.userJson.UserId == "" || _this.userJson.UserId == null) {
                                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__signin_signin__["a" /* SigninPage */]);
                            }
                            else {
                                _this.selectedTab(_this.pageSelected);
                            }
                        }).catch(function (err) { return Object(__WEBPACK_IMPORTED_MODULE_8_rxjs__["of"])(err); });
                        if (this.IsToken != null) {
                            this.authCheckbox = this.IsToken;
                            //alert(`token:${this.IsToken}`);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    NaviPage.prototype.selectedTab = function (ind) {
        this.slider.slideTo(ind);
    };
    NaviPage.prototype.moveButton = function ($event) {
        var _this = this;
        this.page = $event._snapIndex.toString();
        switch (this.page) {
            case '0':
                this.pageSelected = 0;
                this.favoriteItem = "Remove From Favorite";
                this.sendInstrumentRequest("true", "");
                break;
            case '1':
                this.pageSelected = 1;
                //  this.userInstrumentJson=[];
                this.searchText = "";
                this.favoriteItem = "Mark as Favorite";
                this.sendInstrumentRequest("false", "");
                //  }
                break;
            case '2':
                this.pageSelected = 2;
                var loader_1 = this.loading.create({
                    spinner: "crescent",
                    content: "Updating . . ."
                });
                loader_1.present().then(function () {
                    return _this.sendUserDetailsRequest();
                }).then(function () {
                    return _this.sendCountryRequest();
                }).then(function () {
                    return _this.sendFacilityRequest();
                }).then(function () {
                    return _this.sendLabRequest();
                }).then(function () { loader_1.dismiss(); });
                break;
            default:
        }
    };
    NaviPage.prototype.actionSheetMethod = function (actionJson) {
        var _this = this;
        if (actionJson.FavoriteId == undefined) {
            this.favoriteItem = "Mark as Favorite";
        }
        else {
            this.favoriteItem = "Remove From Favorite";
        }
        if (actionJson.UsageType === "A" && actionJson.Status === "Approved") {
            var actionSheet = this.actionctrl.create({
                cssClass: 'myPage',
                title: this.as_option + " : " + actionJson.ResourceName,
                buttons: [
                    {
                        text: this.favoriteItem,
                        role: this.as_role,
                        cssClass: 'myActionSheetBtnStyle',
                        handler: function () {
                            /* Modified by Abey Abraham */
                            if (_this.favoriteItem == "Remove From Favorite") {
                                _this.logs.insertlog("Favourites", "navi", "Option Button Click and selection of mark as favourite", "User clicked option button in instruments part of navi page and selected Remove from mark as favorites ", _this.userJson.UserId);
                                _this.sendFavoriteRequest(actionJson.FavoriteId, actionJson.ResourceId);
                            }
                            else if (_this.favoriteItem == "Mark as Favorite") {
                                _this.logs.insertlog("Instruments", "navi", "Option Button Click and selection of mark as favourite", "User clicked option button in instruments part of navi page and selected mark as favorites ", _this.userJson.UserId);
                                _this.sendFavoriteRequest(actionJson.ResourceId, actionJson.ResourceId);
                            }
                        }
                    },
                    {
                        text: this.as_report,
                        role: this.as_role,
                        cssClass: 'myActionSheetBtnStyle',
                        handler: function () {
                            _this.logs.insertlog("Instruments", "navi", "Option Button Click and selection of Report an issue", "User clicked option button in instruments part of navi page and selected Report an issue", _this.userJson.UserId);
                            _this.navCtrl.push("ReportPage", {
                                "resourceId": actionJson.ResourceId, "user": _this.userJson.UserId, "fname": _this.userJson.FirstName,
                                "lname": _this.userJson.LastName, "name": _this.userJson.LastName,
                                "instrument": actionJson.ResourceName, "pageType": "report"
                            });
                        }
                    },
                    {
                        text: this.as_allissue,
                        role: this.as_role,
                        cssClass: 'myActionSheetBtnStyle',
                        handler: function () {
                            _this.logs.insertlog("Instruments", "navi", "Option Button Click and selection of View all issue", "User clicked option button in instruments part of navi page and selected View all issue", _this.userJson.UserId);
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_13__pages_instrumentstechissue_instrumentstechissue__["a" /* InstrumentstechissuePage */], {
                                "resourceId": actionJson.ResourceId
                            });
                        }
                    },
                    {
                        text: this.as_usage,
                        role: this.as_role,
                        cssClass: 'myActionSheetBtnStyle',
                        handler: function () {
                            _this.logs.insertlog("Instruments", "navi", "Option Button Click and selection of Start Actual Usage", "User clicked option button in instruments part of navi page and selected Start Actual Usage", _this.userJson.UserId);
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__actual_usage_actual_usage__["a" /* ActualUsagePage */], {
                                "resourceId": actionJson.ResourceId,
                                "user": _this.userJson.UserId,
                                "labId": actionJson.GroupId,
                                'FacilityName': actionJson.GroupName,
                            });
                        }
                    },
                    {
                        text: this.as_rules,
                        role: this.as_role,
                        cssClass: 'myActionSheetBtnStyle',
                        handler: function () {
                            _this.logs.insertlog("Instruments", "navi", "Option Button Click and selection of Rules and Regulations", "User clicked option button in instruments part of navi page and selected Rules and Regulations", _this.userJson.UserId);
                            _this.navCtrl.push('RegulationPage', { "resourceId": actionJson.ResourceId });
                        }
                    }
                ]
            });
            actionSheet.present();
        }
        else {
            var actionSheet = this.actionctrl.create({
                title: this.as_option,
                cssClass: 'myPage',
                buttons: [
                    {
                        text: this.favoriteItem,
                        role: this.as_role,
                        cssClass: 'myActionSheetBtnStyle',
                        handler: function () {
                            if (_this.favoriteItem == "Remove From Favorite") {
                                _this.sendFavoriteRequest(actionJson.FavoriteId, actionJson.ResourceId);
                            }
                            else if (_this.favoriteItem == "Mark as Favorite") {
                                _this.sendFavoriteRequest(actionJson.ResourceId, actionJson.ResourceId);
                            }
                            else {
                            }
                        }
                    },
                    {
                        text: this.as_report,
                        role: this.as_role,
                        cssClass: 'myActionSheetBtnStyle',
                        handler: function () {
                            _this.navCtrl.push('ReportPage', {
                                "resourceId": actionJson.ResourceId, "user": _this.userJson.UserId, "fname": _this.userJson.FirstName,
                                "lname": _this.userJson.LastName, "name": _this.userJson.LastName,
                                "instrument": actionJson.ResourceName, "pageType": "report"
                            });
                        }
                    },
                    {
                        text: this.as_allissue,
                        role: this.as_role,
                        cssClass: 'myActionSheetBtnStyle',
                        handler: function () {
                            _this.logs.insertlog("Instruments", "navi", "Option Button Click and selection of View all issue", "User clicked option button in instruments part of navi page and selected View all issue", _this.userJson.UserId);
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_13__pages_instrumentstechissue_instrumentstechissue__["a" /* InstrumentstechissuePage */], {
                                "resourceId": actionJson.ResourceId
                            });
                        }
                    },
                    {
                        text: this.as_rules,
                        role: this.as_role,
                        cssClass: 'myActionSheetBtnStyle',
                        handler: function () {
                            _this.navCtrl.push('RegulationPage', { "resourceId": actionJson.ResourceId });
                        }
                    }
                ]
            });
            actionSheet.present();
        }
    };
    NaviPage.prototype.updateInstrument = function (instrument) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Updating . . ."
        });
        this.http.post(this.updateInstrumentUrl, {
            permissionid: "0",
            facilityid: instrument.GroupId,
            userid: this.userJson.UserId,
            resourceid: instrument.ResourceId,
            user: this.userJson.EmailAddress,
            isapproved: "2"
        })
            .subscribe(function (data) {
            _this.notification.getUserDeviceDetails("resource", instrument.ResourceId, "IAR", _this.userJson.FirstName + " " + _this.userJson.LastName + " requested access for " + instrument.ResourceName, "Instrument Access Request");
            _this.sendInstrumentRequest("false", "");
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            //   (error);
        });
    };
    NaviPage.prototype.sendFavoriteRequest = function (favoriteId, resourceId) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Updating . . ."
        });
        //SEDNING UPDATE REQUEST
        this.http.post(this.favouriteUrl, {
            favoriteid: favoriteId,
            userid: this.userJson.UserId,
            resourceid: resourceId,
            user: ""
        })
            .subscribe(function (data) {
            //RESPONSE
            if (_this.pageSelected == 0) {
                _this.sendInstrumentRequest("true", "");
            }
            else if (_this.pageSelected == 1) {
                _this.sendInstrumentRequest("false", "");
            }
            if (_this.favoriteItem == "Remove From Favorite") {
                _this.message.showMessage('Message', 'Instrument successfully removed from favorites');
            }
            else if (_this.favoriteItem == "Mark as Favorite") {
                _this.message.showMessage('Message', 'Instrument successfully marked as favorites');
            }
            else {
            }
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            //   (error);
        });
    };
    /*************************************************** */
    NaviPage.prototype.sendUpdateRequest = function () {
        var _this = this;
        if (this.userPhone != "") {
        }
        if (this.firstName == "" || this.lastName == "") {
            this.message.showMessage('Message', 'Please Enter all the required fields.');
            return false;
        }
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Updating . . ."
        });
        //loader.present();
        //SEDNING UPDATE REQUEST
        this.http.post(this.updateDetailsUrl, {
            firstname: this.firstName,
            lastname: this.lastName,
            emailaddress: this.userEmail,
            userid: this.userJson.UserId,
            password: "",
            address: this.userAddress,
            city: this.userCity,
            state: this.userState,
            zip: this.userZip,
            country: this.userCountry,
            phone: this.userPhone,
            syncreservation: this.userCheckbox
        })
            .subscribe(function (data) {
            //RESPONSE
            //  (data);
            _this.logs.insertlog("Profile", "navi", "Update button click", "User  updated the profile details by clicking update button", _this.userJson.UserId);
            if (data.includes("success")) {
                _this.message.showMessage('Message', 'Updated Successfully');
            }
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            // loader.dismiss();
            //   (error);
        });
    };
    //Sending country Request
    NaviPage.prototype.sendCountryRequest = function () {
        var _this = this;
        var countryName = this.userJson.CountryCode;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        //  loader.present();
        this.http.post(this.getCountry, {})
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.countryJson = resJSON;
            if (_this.userJson.CountryCode != (undefined || null || '')) { }
            _this.userCountry = String(_this.userJson.CountryCode).trim();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            //  (error);
        });
    };
    NaviPage.prototype.sendInstrumentRequest = function (favorite, value) {
        var _this = this;
        if (value = true) {
            var loader = this.loading.create({
                spinner: "crescent",
                content: "Loading . . . ",
            });
            loader.present();
        }
        (this.getInstrumentUrl);
        this.http.post(this.getInstrumentUrl, {
            userid: this.userJson.UserId,
            beaconid: "",
            usertoken: this.userJson.UserToken,
            fav: favorite,
            resourceid: "0"
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.emptyString = false;
            _this.noInstruments = false;
            //   this.isSearchResult=false;
            if (favorite == 'true') {
                _this.favInstrumentJson = resJSON;
            }
            else if (favorite == 'false') {
                _this.userInstrumentJson = resJSON;
                console.log("instrumentjson", resJSON);
                console.log("userdetails", _this.userJson);
            }
            //used for searchbar filtering json objects.
            _this.instrumentJson = resJSON;
            if (value = true) {
                loader.dismiss();
            }
            //client check for nmi for appointments
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            _this.emptyString = true;
            _this.noInstruments = true;
            //   (error);
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            loader.dismiss();
            if (resErrJSON.status == 400) {
                _this.emptyString = true;
                _this.checkStatus = "400";
            }
        });
    };
    /*******************************/
    //Sending Facility Request
    NaviPage.prototype.sendFacilityRequest = function () {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        //  loader.present();
        this.http.post(this.getFacilityUrl, {
            userid: this.userJson.UserId,
            usertoken: this.userJson.UserToken,
        })
            .subscribe(function (data) {
            //RESPONSE
            //    (data);
            _this.facilityStatus = true;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userFacilityJson = resJSON;
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            _this.facilityStatus = false;
        });
    };
    /*******************************/
    //Sending Lab Request
    NaviPage.prototype.sendLabRequest = function () {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        //   loader.present();
        this.http.post(this.getLabUrl, {
            userid: this.userJson.UserId,
            usertoken: this.userJson.UserToken,
        })
            .subscribe(function (data) {
            //RESPONSE
            //     (data);
            _this.labStatus = true;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userLabJson = resJSON;
            //   ('Lab', resJSON);
            console.log("userlab", _this.userLabJson);
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            //  (error);
            _this.labStatus = false;
        });
    };
    //GET USER DETAILS METHOD
    NaviPage.prototype.sendUserDetailsRequest = function () {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        // loader.present();
        //SEDNING REQUEST
        this.http.post(this.getUserDetailsUrl, {
            email: this.userJson.EmailAddress
        })
            .subscribe(function (data) {
            //RESPONSE
            (data);
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userDetailsJson = resJSON;
            _this.getJsonDetails();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            //    (error);
        });
    };
    //getting json request and seeting to the fields
    NaviPage.prototype.getJsonDetails = function () {
        this.firstName = this.userDetailsJson.FirstName;
        this.userEmail = this.userDetailsJson.EmailAddress;
        this.lastName = this.userDetailsJson.LastName;
        this.userPhone = this.userDetailsJson.Phone;
        this.userAddress = this.userDetailsJson.Address1;
        this.userCity = this.userDetailsJson.City;
        this.userState = this.userDetailsJson.State;
        this.userZip = this.userDetailsJson.PostalCode;
        if (this.userDetailsJson.SyncReservations == "1") {
            this.userCheckbox = false;
        }
        else {
            this.userCheckbox = true;
        }
    };
    NaviPage.prototype.changePassword = function () {
        this.logs.insertlog("Profile", "navi", "Change Password button click", "User  clicked change password button in profile part of navi page ", this.userJson.UserId);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__password_password__["a" /* PasswordPage */], { "useremail": this.userEmail });
    };
    NaviPage.prototype.updateChange = function () {
        this.userCheckbox;
        this.userCountry;
    };
    NaviPage.prototype.authupdateChange = function () {
        if (this.authCheckbox == true) {
            if (this.hidAuthVar = false) {
                this.message.showMessage('Message', " " + this.varloadauth + " added successfully  ");
            }
            this.storage.set('FToken', true);
        }
        else {
            this.storage.set('FToken', false);
        }
    };
    NaviPage.prototype.changeScheduler = function (pagetype, instrument) {
        var _this = this;
        if (this.clientType === 'nmi') {
            var user = instrument.Contacts.split(",")("EmailSplit", user);
            var responsible_user = user.filter(function (i) { return i === _this.userJson.EmailAddress; });
            if (responsible_user.length > 0) {
                var isContactMatch = true;
            }
            else {
                isContactMatch = false;
            }
        }
        this.logs.insertlog("favourites", "navi", "Schedule Button Click ", "User clicked schedule button in favourites part of navi page ", this.userJson.UserId);
        this.storage.set('SchedularFav', pagetype);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__schedular_schedular__["a" /* SchedularPage */], {
            "resourceId": instrument.ResourceId, "labId": instrument.GroupId, 'projectId': this.userJson.DefaultProject, 'instrumentName': instrument.ResourceName, 'isContactMatch': isContactMatch, 'FacilityName': instrument.GroupName, 'PageSelected': this.pageSelected
        });
    };
    NaviPage.prototype.getItems = function (searchbar) {
        var _this = this;
        var q = this.searchText;
        if (q == null || q == "") {
            this.isSearchResult = false;
            this.sendInstrumentRequest("false", true);
            return true;
        }
        this.userInstrumentJson = this.instrumentJson.filter(function (v) {
            if (v.ResourceName && q) {
                if (v.ResourceName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                    //  this.isSearchResult = false
                    return true;
                }
                else if (v.ResourceName.toLowerCase().indexOf(q.toLowerCase()) < -1) {
                    // this.isSearchResult = true
                    _this.userInstrumentJson = [];
                }
                return false;
            }
            //   ()
        });
    };
    NaviPage.prototype.doRefresh = function (refresher) {
        this.sendInstrumentRequest("false", "");
        setTimeout(function () {
            refresher.complete();
        }, 2000);
    };
    NaviPage.prototype.loadauth = function () {
        return __awaiter(this, void 0, void 0, function () {
            var available, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.platform.ready()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.faio.isAvailable()];
                    case 2:
                        available = _a.sent();
                        if (available == "finger") {
                            this.hidAuthVar = false;
                            this.varloadauth = "Fingerprint Authentication ";
                        }
                        else if (available == "face") {
                            this.hidAuthVar = false;
                            this.varloadauth = "Face Id Authentication ";
                        }
                        else {
                            this.hidAuthVar = true;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('slider'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Slides */])
    ], NaviPage.prototype, "slider", void 0);
    NaviPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-navi',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\navi\navi.html"*/'<ion-header>\n\n  <ion-navbar hideBackButton>\n\n\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n\n\n    <ion-title>IdeaElan</ion-title>\n\n  </ion-navbar>\n\n\n\n  <ion-segment [(ngModel)]="page">\n\n    <ion-segment-button value="0" (click)="selectedTab(0)">\n\n      Favorites\n\n    </ion-segment-button>\n\n    <ion-segment-button value="1" (click)="selectedTab(1)">\n\n      Instruments\n\n    </ion-segment-button>\n\n    <ion-segment-button value="2" (click)="selectedTab(2)">\n\n      Profile\n\n    </ion-segment-button>\n\n  </ion-segment>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content overflow-scroll="false" #container>\n\n\n\n  <ion-slides class="forgot" #slider (ionSlideWillChange)="moveButton($event)">\n\n    <ion-slide>\n\n\n\n      <ion-card-content *ngIf=\'noInstruments\'>\n\n        <h3>No Instruments Displayed</h3>\n\n        <p class="noinstrument"><b> You can add instrument on this page by going to the instrument and marking desired\n\n            instrument as favorite.</b></p>\n\n\n\n        <p class="noinstrument">Note : You will be approved by the facility Admin before you can view or use an\n\n          instrument you can view and request access a facility under the Facilities in the Side Menu.</p>\n\n      </ion-card-content>\n\n\n\n      <ion-card *ngFor="let instrument1 of favInstrumentJson" [class.hide]=\'emptyString\'>\n\n\n\n        <ion-card-content>\n\n          <ion-row>\n\n            <ion-col col-4>\n\n              <img src="{{instrument1.ResourceImage}}" class=".cardimg" onerror="this.style.display=\'none\'">\n\n            </ion-col>\n\n            <ion-col col-6>\n\n              <b>{{instrument1.ResourceName}}</b>\n\n              <p class="cardcontents">{{instrument1.GroupName}}</p>\n\n              <p class="cardcontents">{{instrument1.SpecialInstruction}}</p>\n\n            </ion-col>\n\n          </ion-row>\n\n          <div class="title">\n\n\n\n            <span class="b2">\n\n\n\n              <button ion-button *ngIf="instrument1.Status==(\'Approved\')"\n\n                (click)="changeScheduler( \'favorite\' ,instrument1)">Schedule</button>\n\n            </span>\n\n            <span class="b1">\n\n              <button ion-button (click)=\'actionSheetMethod(instrument1)\'>Option</button>\n\n            </span>\n\n          </div>\n\n\n\n        </ion-card-content>\n\n        <ion-card-content *ngIf=\'checkStatus===400\'>\n\n          <h3>No Records Found</h3>\n\n        </ion-card-content>\n\n      </ion-card>\n\n\n\n    </ion-slide>\n\n\n\n    <ion-slide>\n\n      <!-- <ion-refresher (ionRefresh)="doRefresh($event)">\n\n              <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull to refresh" refreshingSpinner="circles"\n\n                refreshingText="Refreshing...">\n\n              </ion-refresher-content>\n\n            </ion-refresher>-->\n\n      <ion-searchbar (ionInput)="getItems()" [(ngModel)]="searchText" debounce=450></ion-searchbar>\n\n      <div *ngIf=\'isSearchResult\' style="text-align: center"><b>No Results Found</b> </div>\n\n\n\n\n\n\n\n      <ion-card-content *ngIf=\'noInstruments\'>\n\n        <h3>No Instruments Displayed</h3>\n\n        <p class="noinstrument">Note : You will be approved by the facility Admin before you can view or use an\n\n          instrument you can view and request access a facility under the Facilities in the Side Menu.</p>\n\n      </ion-card-content>\n\n      <ion-card *ngFor="let instrument of userInstrumentJson; let i = index;" [ngSwitch]=instrument.Status\n\n        [class.hide]=\'emptyString\'>\n\n        <ion-card-content>\n\n          <ion-row>\n\n            <ion-col col-4>\n\n\n\n              <img src="{{instrument.ResourceImage}}" onerror="this.style.display=\'none\'">\n\n            </ion-col>\n\n            <ion-col col-6>\n\n             <b>{{instrument.ResourceName}}</b>\n\n              <p class="cardcontents">{{instrument.GroupName}}</p>\n\n              <p class="cardcontents">{{instrument.SpecialInstruction}}</p>\n\n              <div *ngSwitchCase="\'Approved\'" class="cardcontents"><span class="approved">\n\n                  {{instrument.Status}}</span></div>\n\n              <div *ngSwitchCase="\'Rejected\'" class="cardcontents"><span class="rejected">\n\n                  {{instrument.Status}}</span></div>\n\n              <div *ngSwitchCase="\'Pending\'" class="cardcontents"><span class="rejected">\n\n                  {{instrument.Status}}</span></div>\n\n              <div *ngSwitchCase="\'Request Access\'" class="cardcontents"><span>\n\n                  {{instrument.Status}}</span></div>\n\n            </ion-col>\n\n          </ion-row>\n\n          <div class="title">\n\n            <span class="b2">\n\n              <!--Modified by Anto Rupak for Schedular-->\n\n              <button ion-button *ngIf="instrument.Status==(\'Approved\')"\n\n                (click)="changeScheduler( \'Instrument\', instrument)">Schedule</button>\n\n              <button ion-button *ngIf="instrument.Status==(\'Request Access\' || \'Rejected\')"\n\n                (click)="updateInstrument(instrument)">Request Access</button>\n\n              <button ion-button *ngIf="instrument.Status==(\'Rejected\')" (click)="updateInstrument(instrument)">Request\n\n                Access</button>\n\n\n\n            </span>\n\n            <span class="b1">\n\n              <button ion-button (click)=\'actionSheetMethod(instrument)\'\n\n                *ngIf="instrument.Status==(\'Approved\')">Option</button>\n\n            </span>\n\n          </div>\n\n\n\n        </ion-card-content>\n\n      </ion-card>\n\n\n\n    </ion-slide>\n\n    <ion-slide>\n\n\n\n      <ion-list>\n\n\n\n\n\n        <div class="input-icon-wrap">\n\n          <span class="input-icon">\n\n            <ion-icon name="person"></ion-icon>\n\n          </span>\n\n          <input type="text" class="input-with-icon" placeholder="First Name" [(ngModel)]="firstName"\n\n            id="user_password">\n\n        </div>\n\n\n\n\n\n\n\n\n\n\n\n        <div class="input-icon-wrap">\n\n          <span class="input-icon">\n\n            <ion-icon name="person"></ion-icon>\n\n          </span>\n\n          <input type="text" class="input-with-icon" placeholder="lastName" [(ngModel)]="lastName" id="user_password">\n\n        </div>\n\n\n\n\n\n\n\n        <div class="input-icon-wrap">\n\n          <span class="input-icon">\n\n            <ion-icon name="mail"></ion-icon>\n\n          </span>\n\n          <input type="email" class="input-with-icon" placeholder="User Email" disabled="true" [(ngModel)]="userEmail"\n\n            id="user_password">\n\n        </div>\n\n\n\n\n\n        <div class="input-icon-wrap">\n\n          <span class="input-icon">\n\n            <ion-icon name="call"></ion-icon>\n\n          </span>\n\n          <input type="number" class="input-with-icon" placeholder="Phone" [(ngModel)]="userPhone" id="user_password">\n\n        </div>\n\n\n\n\n\n        <div class="input-icon-wrap">\n\n          <span class="input-icon">\n\n            <ion-icon name="pin"></ion-icon>\n\n          </span>\n\n          <input type="text" class="input-with-icon" placeholder="Address" [(ngModel)]="userAddress" id="user_password">\n\n        </div>\n\n\n\n\n\n        <div class="input-icon-wrap">\n\n          <span class="input-icon">\n\n            <ion-icon name="pin"></ion-icon>\n\n          </span>\n\n          <input type="text" class="input-with-icon" placeholder="City" [(ngModel)]="userCity" id="user_password">\n\n        </div>\n\n\n\n\n\n        <div class="input-icon-wrap">\n\n          <span class="input-icon">\n\n            <ion-icon name="pin"></ion-icon>\n\n          </span>\n\n          <input type="text" class="input-with-icon" placeholder="State" [(ngModel)]="userState" id="user_password">\n\n        </div>\n\n\n\n\n\n\n\n        <div class="input-icon-wrap">\n\n          <span class="input-icon">\n\n            <ion-icon name="pin"></ion-icon>\n\n          </span>\n\n          <input type="text" class="input-with-icon" placeholder="Zip" [(ngModel)]="userZip" id="user_password">\n\n        </div>\n\n\n\n\n\n\n\n        <div class="input-icon-wrap">\n\n          <span class="input-icon">\n\n            <ion-icon name="pin"></ion-icon>\n\n          </span>\n\n          <ion-select [(ngModel)]="userCountry" placeholder=\'Country\' multiple="false" (ionChange)="updateChange()">\n\n            <ion-option *ngFor="let country of countryJson" value="{{country.IsoCode}}">{{country.CountryName}}\n\n            </ion-option>\n\n          </ion-select>\n\n        </div>\n\n\n\n\n\n\n\n        <ion-item>\n\n          <ion-checkbox [(ngModel)]="userCheckbox" color="dark" checked="false" (ionChange)="updateChange()">\n\n          </ion-checkbox>\n\n          <ion-label>Sync reservation with phone Calender</ion-label>\n\n        </ion-item>\n\n\n\n        <ion-item [hidden]=hidAuthVar>\n\n          <ion-label>{{varloadauth}}</ion-label>\n\n          <ion-toggle [(ngModel)]="authCheckbox" (ionChange)="authupdateChange()"></ion-toggle>\n\n        </ion-item>\n\n\n\n        <ion-row>\n\n          <ion-col col-6>\n\n            <button ion-button fullscreen color="default" class="my-width" (click)=\'sendUpdateRequest()\'>\n\n              <b>Update</b>\n\n            </button>\n\n          </ion-col>\n\n\n\n          <ion-col col-6>\n\n            <button ion-button color="default" class="my-width" (click)=\'changePassword()\'>\n\n              <b>Change Password</b>\n\n            </button>\n\n          </ion-col>\n\n        </ion-row>\n\n\n\n      </ion-list>\n\n     \n\n\n\n\n\n      <p class="cardslayout">My Facilities</p>\n\n      <ion-card-content *ngIf=\'!facilityStatus\'>No Records Found</ion-card-content>\n\n      <div *ngFor="let facility of userFacilityJson" [ngSwitch]=facility.Status>\n\n        <div *ngIf="facility.Status!=\'Request Access\'">\n\n          <ion-item>\n\n            <ion-row>\n\n              <ion-col col-7>\n\n                {{facility.GroupName}}\n\n              </ion-col>\n\n              <ion-col col-5>\n\n                <ion-badge *ngSwitchCase="\'Waiting for approval\'" item-end style="background-color:#fec547;">Waiting for\n\n                  Approval</ion-badge>\n\n                <ion-badge *ngSwitchCase="\'Approved\'" item-end style="background-color:#3AB052;margin-left: 35px;">\n\n                  {{facility.Status}}</ion-badge>\n\n                <ion-badge *ngSwitchCase="\'Rejected\'" item-end style="background-color:#F35C49; margin-left: 35px;">\n\n                  {{facility.Status}}</ion-badge>\n\n              </ion-col>\n\n            </ion-row>\n\n          </ion-item>\n\n        </div>\n\n      </div>\n\n\n\n      <p class="cardslayout">My Labs</p>\n\n      <ion-card-content *ngIf=\'!labStatus\'>No Records Found</ion-card-content>\n\n      <div *ngFor="let lab of userLabJson" [ngSwitch]=lab.Status>\n\n        <ion-item>\n\n          <ion-row>\n\n            <ion-col col-7>\n\n              {{lab.GroupName}}\n\n            </ion-col>\n\n            <ion-col col-5>\n\n              <ion-badge *ngSwitchCase="\'Pending\'" item-end style="background-color:#fec547;margin-left: 35px;">{{lab.Status}}</ion-badge>\n\n              <ion-badge *ngSwitchCase="\'Active\'" item-end style="background-color:#3AB052;margin-left: 35px;">\n\n                {{lab.Status}}</ion-badge>\n\n\n\n            </ion-col>\n\n          </ion-row>\n\n\n\n\n\n        </ion-item>\n\n      </div>\n\n    </ion-slide>\n\n  </ion-slides>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\navi\navi.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_14__ionic_native_fingerprint_aio__["a" /* FingerprintAIO */], __WEBPACK_IMPORTED_MODULE_12__providers_activitylogs_activitylogs__["a" /* ActivitylogsProvider */], __WEBPACK_IMPORTED_MODULE_11__providers_message_message__["a" /* MessageProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_10__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_9__providers_notification_notification__["a" /* NotificationProvider */]])
    ], NaviPage);
    return NaviPage;
}());

//# sourceMappingURL=navi.js.map

/***/ }),

/***/ 540:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/* Modified by Abey Abraham */






/**
 * Generated class for the PasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PasswordPage = /** @class */ (function () {
    function PasswordPage(navCtrl, navParams, storage, http, alertCtrl, loading) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loading = loading;
        /* Modified by Abey Abraham */
        this.regexp = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,10}$');
    }
    PasswordPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.userEmail = this.navParams.get('useremail');
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.updateDetailsUrl = _this.appUrl + '/WS/IdeaElanService.svc/ResetPassword';
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
        });
        this.emptyString = false;
    };
    PasswordPage.prototype.sendUpdateRequest = function () {
        var _this = this;
        /* Modified by Abey Abraham */
        if (this.password == null || this.cpassword == null) {
            this.alert("Please Enter all the required fields.");
            return false;
        }
        if (this.regexp.test(this.cpassword) == false) {
            this.alert("Enter a valid password ");
            return false;
        }
        if (this.password != this.cpassword) {
            this.alert(" There should not be mismatch in password");
            return false;
        }
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Updating . . ."
        });
        loader.present();
        //SEDNING UPDATE REQUEST
        this.http.post(this.updateDetailsUrl, {
            username: this.userEmail,
            password: this.password,
        })
            .subscribe(function (data) {
            //RESPONSE
            loader.dismiss();
            _this.alert("Updated Successfully");
            _this.password = "";
            _this.cpassword = "";
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 500) {
                _this.alert(resErrJSON.statusText);
            }
            else if (resErrJSON.status == 400) {
                _this.alert('Internal server error');
            }
            _this.password = "";
            _this.cpassword = "";
        });
    };
    PasswordPage.prototype.alert = function (toastStr) {
        var alert = this.alertCtrl.create({
            title: "Message",
            message: toastStr,
            buttons: ['Ok']
        });
        alert.present();
    };
    PasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-password',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\password\password.html"*/'<!--\n\n  Generated template for the PasswordPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n\n\n<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"\n\n  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">\n\n<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"\n\n  integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>\n\n<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"\n\n  integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>\n\n<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"\n\n  integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>\n\n\n\n<ion-header>\n\n\n\n  <ion-navbar >\n\n    <ion-title>Change Password</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <div class="container">\n\n    <div class="input-group input-group-lg" style="margin-top: 1em">\n\n      <div class="input-group-prepend">\n\n        <span class="input-group-text" id="inputGroup-sizing-lg">\n\n            <ion-icon name="lock"></ion-icon>\n\n        </span>\n\n      </div>\n\n      <input type="password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"\n\n        placeholder="Enter new password*" [(ngModel)]="password">\n\n       \n\n    </div>\n\n    <div class="input-group input-group-lg" style="margin-top: 1em">\n\n      <div class="input-group-prepend">\n\n        <span class="input-group-text" id="inputGroup-sizing-lg">\n\n            <ion-icon name="lock"></ion-icon>\n\n        </span>\n\n      </div>\n\n      <input type="password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"\n\n        placeholder="Confirm Password*" [(ngModel)]="cpassword">\n\n    </div><br>\n\n    <ion-row center>\n\n      <ion-col text-center>\n\n        <button ion-button full (click)=\'sendUpdateRequest()\'>Update</button>\n\n      </ion-col>\n\n    </ion-row>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\password\password.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */]])
    ], PasswordPage);
    return PasswordPage;
}());

//# sourceMappingURL=password.js.map

/***/ }),

/***/ 541:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboarddetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_message_message__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_activitylogs_activitylogs__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__report_report__ = __webpack_require__(542);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_streaming_media__ = __webpack_require__(476);
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











var DashboarddetailPage = /** @class */ (function () {
    function DashboarddetailPage(streamingMedia, logs, messages, navCtrl, toastCtrl, navParams, storage, loading, http, alertCtrl) {
        this.streamingMedia = streamingMedia;
        this.logs = logs;
        this.messages = messages;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.loading = loading;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.msbapTitle = 'Audio Title';
        this.msbapAudioUrl = '';
        this.msbapDisplayTitle = false;
        this.msbapDisplayVolumeControls = true;
        this.bottomHide = true;
    }
    DashboarddetailPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.getDashboardDetailUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetTicketDetailsByTicketId';
            _this.getDashboardDetailUpdateUrl = _this.appUrl + '/WS/IdeaElanService.svc/UpdateTicketStatus';
            _this.ticketDetailsUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetTicketDetailsByTicketId';
            _this.dashboardJson = _this.navParams.get("dashboardTicketDetail");
            _this.userId = _this.navParams.get("userId");
            _this.issueType = _this.dashboardJson.IssueType;
        });
        this.storage.get('roleType').then(function (val) {
            if (val == "user" || val == "labAdmin") {
                _this.userType = true;
                _this.bottomHide = true;
            }
            else if (val == "super" || val == "admin" || val == "providerAdmin") {
                _this.userType = false;
                _this.bottomHide = false;
            }
            else {
            }
        });
        this.audioPlay = false;
    };
    DashboarddetailPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
            _this.dashboardDetailRequest();
        });
        this.storage.get('userDetails').then(function (val1) {
        });
        if (this.userType) {
            if (this.userId != this.dashboardJson.UserId) {
                this.bottomHide = true;
            }
            else {
                this.bottomHide = false;
            }
        }
    };
    DashboarddetailPage.prototype.updateRequest = function () {
        this.dashboardDetailUpdate();
    };
    DashboarddetailPage.prototype.dashboardDetailRequest = function () {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        this.http.post(this.getDashboardDetailUrl, {
            ticketid: this.dashboardJson.TicketId,
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.dashboardDetailJson = resJSON;
            _this.issue = _this.dashboardDetailJson.TicketNumber;
            _this.subject = _this.dashboardDetailJson.Subject;
            _this.desc = _this.dashboardDetailJson.Description;
            _this.inst = _this.dashboardDetailJson.SubCategory;
            _this.cdate = _this.dashboardDetailJson.strCreatedDate;
            _this.cby = _this.dashboardDetailJson.UserName;
            // zeiss modification - Anto : 23-07-2019
            _this.ZeissTicketId = _this.dashboardDetailJson.ZeissTicketId;
            _this.ZeissTicketSubmitDate = _this.dashboardDetailJson.ZeissTicketSubmitDate;
            _this.ZeissSymptomText = _this.dashboardDetailJson.ZeissSymptomText;
            _this.ZeissTicketDescription = _this.dashboardDetailJson.ZeissTicketDescription;
            _this.ZeissTicketStatus = _this.dashboardDetailJson.ZeissTicketStatus;
            if (_this.dashboardJson.IsZeiss) {
                _this.isZeiss = true;
            }
            else {
                _this.isZeiss = false;
            }
            if (_this.ZeissTicketId != "") {
                _this.showZeissTicketDetails = true;
                //  this.isZeiss = false
            }
            else {
                _this.showZeissTicketDetails = false;
            }
            _this.s3AudioPlay();
            loader.dismiss();
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
    DashboarddetailPage.prototype.dashboardDetailUpdate = function () {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        this.http.post(this.getDashboardDetailUpdateUrl, {
            ticketid: this.dashboardJson.TicketId,
            status: this.cstatus,
            userid: this.userJson.UserId,
            message: this.message
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            _this.logs.insertlog("Issue Details ", "Dashboard Details Page (Issue Details Page)", "clicked update button", "User clicked update button in the Issue Details Page   ", _this.userJson.UserId);
            loader.dismiss();
            _this.messages.showMessagePop('Message', 'Updated Successfully');
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
    DashboarddetailPage.prototype.s3AudioPlay = function () {
        var _this = this;
        this.http.post(this.ticketDetailsUrl, {
            ticketid: this.dashboardJson.TicketId,
        })
            .subscribe(function (data) {
            //RESPONSE
            var resData = JSON.stringify(data);
            var resJson = JSON.parse(resData);
            if (String(resJson.Filename).toLowerCase().indexOf('https://ieinfinity-uploads.s3.amazonaws.com') >= 0) {
                _this.audioPlay = true;
                _this.audioPlayLink = resJson.Filename;
            }
            else {
                _this.audioPlay = false;
            }
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            var resErr = JSON.stringify(error);
        });
    };
    DashboarddetailPage.prototype.playAudio = function () {
        var options = {
            successCallback: function () { },
            errorCallback: function (e) { },
            orientation: 'portrait',
            shouldAutoClose: false,
            controls: true
        };
        this.streamingMedia.playAudio(this.audioPlayLink, options);
    };
    DashboarddetailPage.prototype.updateChange = function () {
        this.cstatus;
        this.selectStatus = true;
    };
    DashboarddetailPage.prototype.zeissRequest = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__report_report__["a" /* ReportPage */], { "pageType": "zeissTicket", "ticketDetails": this.dashboardJson, "ticketJson": this.dashboardDetailJson });
    };
    DashboarddetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-dashboarddetail',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\dashboarddetail\dashboarddetail.html"*/'<ion-header hideBackButton="true">\n\n\n\n  <ion-navbar>\n\n    <button ion-button icon-only menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title ion-align=\'center\'>View Issue</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n  <ion-row>\n\n    <ion-col col-4><b>Issue # </b></ion-col>\n\n    <ion-col col-6>{{issue}}</ion-col>\n\n  </ion-row>\n\n  <hr>\n\n  <ion-row>\n\n    <ion-col col-4><b>Issue Type </b></ion-col>\n\n    <ion-col col-6>{{issueType}}</ion-col>\n\n  </ion-row>\n\n  <hr>\n\n  <ion-row>\n\n    <ion-col col-4><b>Subject </b></ion-col>\n\n    <ion-col col-6>{{subject}}</ion-col>\n\n  </ion-row>\n\n  <hr>\n\n  <ion-row>\n\n    <ion-col col-4><b>Description </b></ion-col>\n\n    <ion-col col-6 [innerHTML]=\'desc\'>{{desc}}</ion-col>\n\n  </ion-row>\n\n  <hr>\n\n  <ion-row>\n\n    <ion-col col-4><b>Intrument </b></ion-col>\n\n    <ion-col col-6>{{inst}}</ion-col>\n\n  </ion-row>\n\n  <hr>\n\n  <ion-row>\n\n    <ion-col col-4><b>Created Date </b></ion-col>\n\n    <ion-col col-6>{{cdate | date: "MM-dd-yyyy"}}</ion-col>\n\n  </ion-row>\n\n  <hr>\n\n  <ion-row>\n\n    <ion-col col-4><b>Created By </b></ion-col>\n\n    <ion-col col-6>{{cby}}</ion-col>\n\n  </ion-row>\n\n  <hr>\n\n  <div [hidden]="this.bottomHide">\n\n    <ion-row style="align-items: center">\n\n      <ion-col col-4>\n\n        <p class="dropdown">Change Status</p>\n\n      </ion-col>\n\n      <ion-col col-6>\n\n        <ion-select [(ngModel)]="cstatus" placeholder=\'Select Status\' multiple="false" (ionChange)="updateChange()">\n\n\n\n          <ion-option *ngIf=\'!userType\'>In Progress</ion-option>\n\n          <ion-option>Closed</ion-option>\n\n        </ion-select>\n\n      </ion-col>\n\n    </ion-row>\n\n    <hr>\n\n    <button [class.hide]="!audioPLay" ion-button icon-only (click)=\'playAudio()\'>\n\n        <ion-icon name="play"></ion-icon>\n\n      </button> \n\n    <ion-item>\n\n      <ion-textarea [(ngModel)]="message" placeholder="Message"></ion-textarea>\n\n    </ion-item>\n\n    \n\n    <br />\n\n    <div *ngIf="showZeissTicketDetails">\n\n      <ion-item>\n\n        <ion-row> <b>Zeiss Ticket Details</b></ion-row>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-row>\n\n          <ion-col col-4><b>Ticket-ID </b></ion-col>\n\n          <ion-col col-6>{{ZeissTicketId}}</ion-col>\n\n        </ion-row>\n\n\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-row>\n\n          <ion-col col-4><b>Date </b></ion-col>\n\n          <ion-col col-6>{{ZeissTicketSubmitDate}}</ion-col>\n\n        </ion-row>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-row>\n\n          <ion-col col-4><b>Issue Type </b></ion-col>\n\n          <ion-col col-6>{{ZeissSymptomText}}</ion-col>\n\n        </ion-row>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-row>\n\n          <ion-col col-4><b>Description </b></ion-col>\n\n          <ion-col col-6>{{ZeissTicketDescription}}</ion-col>\n\n        </ion-row>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-row>\n\n          <ion-col col-4><b>Status</b></ion-col>\n\n          <ion-col col-6>{{ZeissTicketStatus}}</ion-col>\n\n        </ion-row>\n\n      </ion-item>\n\n    </div>\n\n    <div text-center><button ion-button (click)=\'updateRequest()\' block>Update</button></div>\n\n    <div text-center *ngIf="isZeiss"><button ion-button block style="background-color: green"  *ngIf="!showZeissTicketDetails"\n\n        (click)=\'zeissRequest()\'>Create Zeiss Ticket </button></div>\n\n  </div>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\dashboarddetail\dashboarddetail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__ionic_native_streaming_media__["a" /* StreamingMedia */], __WEBPACK_IMPORTED_MODULE_5__providers_activitylogs_activitylogs__["a" /* ActivitylogsProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_message_message__["a" /* MessageProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], DashboarddetailPage);
    return DashboarddetailPage;
}());

//# sourceMappingURL=dashboarddetail.js.map

/***/ }),

/***/ 542:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_aws_sdk_dist_aws_sdk__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_aws_sdk_dist_aws_sdk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_aws_sdk_dist_aws_sdk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_notification_notification__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_media__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_transfer__ = __webpack_require__(475);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_message_message__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_android_permissions__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_easytimer_js__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_easytimer_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_easytimer_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_jquery__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};















var AWS = window.AWS;
var timer = new __WEBPACK_IMPORTED_MODULE_12_easytimer_js___default.a();
var ReportPage = /** @class */ (function () {
    function ReportPage(media, file, permission, transfer, actionSheetCtrl, camera, navCtrl, notification, navParams, platform, storage, loading, http, message, alertCtrl) {
        this.media = media;
        this.file = file;
        this.permission = permission;
        this.transfer = transfer;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.navCtrl = navCtrl;
        this.notification = notification;
        this.navParams = navParams;
        this.platform = platform;
        this.storage = storage;
        this.loading = loading;
        this.http = http;
        this.message = message;
        this.alertCtrl = alertCtrl;
        this.recording = false;
        this.audioList = [];
        this.audioReady = false;
        this.toogleAudio = true;
        this.uploadImageButton = true;
        this.timerValue = '00:00:00';
        this.ico = true;
        this.selectedImage = false;
        this.url = " ";
    }
    ReportPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.ImageUrl = _this.appUrl + '/WS/IdeaElanService.svc/SaveFile';
            _this.reportUrl = _this.appUrl + '/WS/IdeaElanService.svc/ReportIssue';
            _this.getUserDeviceDetailsUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetUserDeviceDetails';
            _this.sendPushNotificationUrl = _this.appUrl + '/WS/IdeaElanService.svc/SendPushMessageToTokens';
            _this.zeissUrl = _this.appUrl + '/WS/IdeaElanService.svc/CreateZeissServiceTicket';
            _this.zeissImageUrl = _this.appUrl + '/WS/IdeaElanService.svc/CreateZeissServiceTicketWithAttachment';
            _this.resourceId = _this.navParams.get('resourceId');
            _this.ticketDetails = _this.navParams.get('ticketDetails');
            _this.ticketJson = _this.navParams.get('ticketJson');
            _this.user = _this.navParams.get('user');
            _this.name = _this.navParams.get('name');
            _this.fname = _this.navParams.get('fname');
            _this.lname = _this.navParams.get('lname');
            _this.pageType = _this.navParams.get('pageType');
            if (_this.pageType == "report") {
                _this.pageType = "Report Issue";
            }
            else if (_this.pageType == "zeissTicket") {
                _this.pageType = "Create Ticket";
            }
            _this.instrument = _this.navParams.get('instrument');
            _this.issueTypeValue = "0";
        });
        // item.userId = AWS.config.credentials.identityId;
        //item.created = (new Date().getTime() / 1000);
    };
    ReportPage.prototype.permissionConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.platform.is('android')) return [3 /*break*/, 3];
                        this.permission.requestPermissions([this.permission.PERMISSION.RECORD_AUDIO, this.permission.PERMISSION.WRITE_EXTERNAL_STORAGE]);
                        return [4 /*yield*/, this.permission.checkPermission(this.permission.PERMISSION.RECORD_AUDIO).then(function (result) {
                                if (result.hasPermission) {
                                    _this.audioPermission = true;
                                }
                                else {
                                    _this.audioPermission = false;
                                }
                            }, function (err) {
                                _this.permission.requestPermission(_this.permission.PERMISSION.RECORD_AUDIO);
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.permission.checkPermission(this.permission.PERMISSION.WRITE_EXTERNAL_STORAGE).then(function (result) {
                                if (result.hasPermission) {
                                    _this.storagePermission = true;
                                }
                                else {
                                    _this.storagePermission = false;
                                }
                            }, function (err) {
                                return _this.permission.requestPermission(_this.permission.PERMISSION.WRITE_EXTERNAL_STORAGE);
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReportPage.prototype.ionViewDidEnter = function () {
        AWS.config.accessKeyId = 'AKIAJJKRPJ22Z6FG5CXA';
        AWS.config.secretAccessKey = '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';
        this.bucket = new AWS.S3({
            accessKeyId: 'AKIAJJKRPJ22Z6FG5CXA',
            secretAccessKey: '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',
        });
        if (this.platform.is('android')) {
            this.permissionConfig();
        }
    };
    ReportPage.prototype.startRecord = function () {
        var _this = this;
        this.startTimer();
        this.url = '';
        if (this.platform.is('ios')) {
            this.fileName = 'record' + new Date().getDate() + new Date().getMonth() +
                new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.m4a';
            /* this.filePath = this.file.documentsDirectory+ this.fileName;
             console.log("filepath write",this.file.documentsDirectory);
             this.audio = this.media.create(this.filePath);*/
            this.file.createFile(this.file.tempDirectory, this.fileName, true).then(function () {
                _this.audio = _this.media.create(_this.file.tempDirectory.replace(/^file:\/\//, '') + _this.fileName);
                _this.audio.startRecord();
            });
        }
        else if (this.platform.is('android')) {
            this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.m4a';
            this.filePath = this.file.externalRootDirectory.replace(/file:\/\//g, '') + 'Download/' + this.fileName;
            this.audio = this.media.create(this.filePath);
            this.audio.startRecord();
        }
        this.recording = true;
    };
    ReportPage.prototype.stopRecord = function () {
        return __awaiter(this, void 0, void 0, function () {
            var path;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.endTimer();
                        this.audio.stopRecord();
                        if (!this.platform.is('ios')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.file.readAsArrayBuffer(this.file.tempDirectory, this.fileName).then(function (audio) {
                                console.log("audio");
                                _this.sendAudioRequest(audio);
                            }).catch(function (err) {
                                console.log(err);
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!this.platform.is('android')) return [3 /*break*/, 4];
                        path = this.file.externalRootDirectory + 'Download/';
                        return [4 /*yield*/, this.file.readAsArrayBuffer(path, this.fileName).then(function (audio) {
                                _this.sendAudioRequest(audio);
                                _this.audio.release();
                            }).catch(function (err) {
                                console.log(err);
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ReportPage.prototype.recordButton = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.permissionConfig()];
                    case 1:
                        _a.sent();
                        if (this.platform.is('ios')) {
                            this.startRecord();
                        }
                        else if (this.platform.is('android')) {
                            if (this.storagePermission && this.audioPermission) {
                                this.startRecord();
                            }
                            else {
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ReportPage.prototype.sendAudioRequest = function (fileInput) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        var file = fileInput;
        var params = {
            Bucket: 'ieinfinity-uploads',
            Key: 'appaudio/' + this.fileName,
            Body: file,
            ACL: 'public-read',
            ContentType: 'audio/m4a'
        };
        var options = { partSize: 10 * 1024 * 1024, queueSize: 1 };
        this.bucket.upload(params, options).on('httpUploadProgress', function (evt) {
        }).send(function (err, data) {
            if (err) {
                loader.dismiss();
                _this.awsUrlLocation = '';
                _this.recording = false;
                return false;
            }
            var awsResponse = JSON.parse(JSON.stringify(data));
            loader.dismiss();
            _this.awsUrlLocation = awsResponse.Location;
            _this.flname = _this.fileName;
            _this.audioReady = true;
            _this.recording = false;
            return true;
        });
    };
    ReportPage.prototype.sendReportIssue = function () {
        if (this.subject == "" || this.subject == null || this.description == "" || this.description == null) {
            this.message.showMessage("Alert", "Field cannot be empty !");
        }
        else {
            if (this.selectedImage == true) {
                this.sendRequest(this.flname);
            }
            else {
                if (this.audioReady && !this.recording) {
                    this.flname = this.fileName;
                    this.sendRequest(this.awsUrlLocation);
                }
                else if (this.recording) {
                    this.message.showMessage('Alert', 'Stop the recording');
                }
                else {
                    this.sendRequest('');
                }
            }
        }
    };
    //REQUEST METHOD
    ReportPage.prototype.sendRequest = function (fileParam) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Reporting Issue"
        });
        loader.present();
        this.http.post(this.reportUrl, {
            issuetype: this.issueTypeValue,
            resourceid: this.resourceId,
            subject: this.subject.trim(),
            desc: this.description.trim(),
            user: this.user,
            status: "Open",
            ticketid: "0",
            name: this.fname,
            instrument: this.ResourceName,
            filename: fileParam
        })
            .subscribe(function (data) {
            / Modified by Abey Abraham /;
            if (_this.ImageFile != null) {
                _this.tId = data;
                var fileTransfer = _this.transfer.create();
                var options1 = {
                    fileKey: 'file',
                    fileName: "" + _this.flname,
                    chunkedMode: false,
                    mimeType: "multipart/form-data",
                    params: { 'id': _this.tId, 'type': 'issue' }
                };
                fileTransfer.upload(_this.ImageFile, "" + _this.ImageUrl, options1)
                    .then(function (data) {
                    loader.dismiss();
                    _this.message.showMessagePop("Message", "Issue Reported Successfully");
                    _this.subject = "";
                    _this.description = "";
                    _this.ico = true;
                    _this.url = "";
                }, function (err) {
                    loader.dismiss();
                    _this.subject = "";
                    _this.description = "";
                    _this.ImageFile = "";
                    _this.url = "";
                    _this.ico = true;
                });
            }
            else {
                loader.dismiss();
                _this.message.showMessagePop("Message", "Issue Reported Successfully");
                _this.subject = "";
                _this.description = "";
                _this.ImageFile = "";
                _this.url = "";
            }
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.notification.getUserDeviceDetails("resource", _this.resourceId, "TIC", "New issue reported by " + _this.lname + " " + _this.fname + "   for " + _this.instrument, "New Issue");
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            _this.message.showMessagePop("Message", "Issue Not Reported !!");
        });
    };
    ReportPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        // Create options for the Camera Dialog
        var options = {
            quality: 15,
            sourceType: sourceType,
        };
        if (sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
            this.camera.getPicture(options).then(function (imageData) {
                _this.ImageFile = imageData;
                _this.url = _this.ImageFile;
                var filename = _this.url.substring(_this.url.lastIndexOf('/') + 1);
                _this.url = filename;
                _this.selectedImage = true;
                _this.ico = false;
                _this.flname = new Date().getTime();
                _this.flname = _this.flname + ".jpg";
            });
        }
        else {
            this.camera.getPicture(options).then(function (imageData) {
                _this.ImageFile = imageData;
                _this.url = _this.ImageFile;
                var filename = _this.url.substring(_this.url.lastIndexOf('/') + 1);
                _this.url = filename;
                _this.selectedImage = true;
                _this.ico = false;
                _this.flname = new Date().getTime();
                _this.flname = _this.flname + ".jpg";
            });
        }
    };
    ReportPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Load from Library',
                    handler: function () {
                        _this.timerValue = '00:00:00';
                        _this.toogleAudio = true;
                        _this.flname = '';
                        _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Use Camera',
                    handler: function () {
                        _this.timerValue = '00:00:00';
                        _this.toogleAudio = true;
                        _this.flname = '';
                        _this.takePicture(_this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Record Audio',
                    handler: function () {
                        _this.flname = '';
                        _this.selectedImage = false;
                        _this.toogleAudio = false;
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    ReportPage.prototype.createZesissServiceRequest = function () {
        var _this = this;
        if (this.selectedImage == true) {
            //  this.flname = new Date().getTime();
            // this.flname = this.flname + ".jpg"
        }
        else {
            this.flname = " ";
        }
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Updating . . ."
        });
        loader.present();
        if (this.ImageFile != null) {
            var fileTransfer = this.transfer.create();
            var params = {
                'symptomcode': this.issueTypeValue,
                'description': this.description.trim(),
                'ticketid': this.ticketDetails.TicketId,
                'resourceid': this.ticketJson.ResourceId,
                'userid': this.ticketDetails.UserId
            };
            var options1 = {
                fileKey: 'file',
                fileName: "" + this.flname,
                chunkedMode: false,
                mimeType: "multipart/form-data",
                httpMethod: "POST",
                params: params
            };
            fileTransfer.upload(this.ImageFile, "" + this.zeissImageUrl, options1)
                .then(function (data) {
                loader.dismiss();
                _this.message.showMessagePop("Message", data.response);
                _this.ico = true;
            }, function (err) {
                loader.dismiss();
                //  this.subject = "";
                _this.message.showMessage("Message", "Error processing request.");
            });
        }
        else {
            this.http.post(this.zeissUrl, {
                symptomcode: this.issueTypeValue,
                description: this.description.trim(),
                ticketid: this.ticketDetails.TicketId,
                resourceid: this.ticketJson.ResourceId,
                userid: this.ticketDetails.UserId
                //ticketid: 0,
            })
                .subscribe(function (data) {
                //RESPONSE
                var resSTR = JSON.stringify(data);
                var resJSON = JSON.parse(resSTR);
                loader.dismiss();
            }, //ERROR HANDLING
            function (//ERROR HANDLING
            error) {
                loader.dismiss();
                var resErr = JSON.stringify(error);
                var resErrJSON = JSON.parse(resErr);
            });
        }
    };
    ReportPage.prototype.startTimer = function () {
        timer.reset();
        __WEBPACK_IMPORTED_MODULE_13_jquery__('#chronoExample .stopButton').click(function (e) {
        });
        timer.addEventListener('secondsUpdated', function () {
            __WEBPACK_IMPORTED_MODULE_13_jquery__('#chronoExample .timer').html(timer.getTimeValues().toString());
        });
        timer.addEventListener('started', function () {
            __WEBPACK_IMPORTED_MODULE_13_jquery__('#chronoExample .timer').html(timer.getTimeValues().toString());
        });
        timer.addEventListener('reset', function () {
            __WEBPACK_IMPORTED_MODULE_13_jquery__('#chronoExample .timer').html(timer.getTimeValues().toString());
        });
        timer.start();
    };
    ReportPage.prototype.endTimer = function () {
        timer.stop();
    };
    ReportPage.prototype.onBackButton = function () {
        this.navCtrl.pop();
    };
    ReportPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'page-report',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\report\report.html"*/'<ion-header>\n\n\n\n  <ion-navbar text-center >\n\n    <ion-toolbar style="background-color:white">\n\n   <!--<ion-buttons start>\n\n        <button (click)="onBackButton()" royal>\n\n          <ion-icon name="arrow-round-back" style=\'zoom:1;color: #0096ff\'></ion-icon>\n\n        </button>\n\n\n\n      </ion-buttons>-->\n\n      \n\n      <ion-title>{{pageType}}</ion-title> \n\n    </ion-toolbar>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding [ngSwitch]=pageType>\n\n  <div *ngSwitchCase="\'Report Issue\'">\n\n    <ion-list>\n\n      <p>Subject*</p>\n\n      <ion-item>\n\n        <ion-input type="text" placeholder=\'Enter Subject here\' [(ngModel)]="subject" style=" margin: 1%;">\n\n        </ion-input>\n\n      </ion-item>\n\n\n\n      <p>Description*</p>\n\n      <ion-item>\n\n        <ion-textarea [(ngModel)]="description" name="note" autocomplete="on" maxLength="500"\n\n          placeholder=\'Enter Description here\' autocorrect="on" style=" margin: 1%;"></ion-textarea>\n\n      </ion-item>\n\n      <p>Issue Type</p>\n\n      <ion-item>\n\n\n\n        <ion-label></ion-label>\n\n        <ion-select [(ngModel)]="issueTypeValue" multiple="false" style=" border: 1px solid #000000; margin: 1%">\n\n          <ion-option value="0" selected>Minor</ion-option>\n\n          <ion-option value="1">Critical</ion-option>\n\n        </ion-select>\n\n      </ion-item>\n\n  \n\n      <ion-row >\n\n          <ion-col col-9>\n\n              <button ion-button class="butn" [disabled]="recording" fill="outline" (click)=\'presentActionSheet()\' >Add Files\n\n                </button>\n\n              {{flname}}\n\n          </ion-col>\n\n        <ion-col col-3>  <div [class.hide]="toogleAudio"><button [class.hide]="recording" ion-button icon-only (click)=\'recordButton()\'>\n\n          <ion-icon name="mic"></ion-icon>\n\n        </button> <button [class.hide]="!recording" ion-button icon-only style="background-color: red;" (click)=\'stopRecord()\'>\n\n            <ion-icon name="mic"></ion-icon>\n\n          </button></div>\n\n          <div [class.hide]="toogleAudio" id="chronoExample">\n\n            <div class="timer" [class.hide]="!recording">{{timerValue}}</div>\n\n          </div>\n\n           </ion-col>\n\n         \n\n        </ion-row>\n\n      <ion-row center>\n\n        <ion-col text-center>\n\n          <button ion-button  [disabled]="recording" (click)=\'sendReportIssue()\'>Submit</button>\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n    </ion-list>\n\n  </div>\n\n  <div *ngSwitchCase="\'Create Ticket\'">\n\n    <p>Technical Issue Type</p>\n\n    <ion-item>\n\n\n\n      <ion-label></ion-label>\n\n      <ion-select [(ngModel)]="issueTypeValue" placeholder=\'Issue Type\' multiple="false"\n\n        style=" border: 1px solid #000000; margin: 1%">\n\n        <ion-option value="ZS1000    110" selected>The device suffered physical damage</ion-option>\n\n        <ion-option value="ZS1000    130">The device is not powering up</ion-option>\n\n        <ion-option value="ZS1000    140">The device is displaying an error message</ion-option>\n\n        <ion-option value="ZS1000    150">The device is not working as expected</ion-option>\n\n        <ion-option value="ZS1000    160">The device is returning insufficient results</ion-option>\n\n        <ion-option value="ZS1000    270">I have a question about the usage of the device</ion-option>\n\n        <ion-option value="ZS1000    850">I require assistance for installation/relocation</ion-option>\n\n        <ion-option value="ZS1000    999">Something else</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n    <p>Description*</p>\n\n    <ion-item>\n\n      <ion-textarea [(ngModel)]="description" name="note" autocomplete="on" maxLength="500"\n\n        placeholder=\'Enter Description here\' autocorrect="on" style=" margin: 1%;"></ion-textarea>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-col>\n\n        <button ion-button fill="outline" (click)=\'presentActionSheet()\' style="background-color: green">Select image\n\n        </button>\n\n        <span [hidden]=ico>{{flname}}</span>\n\n      </ion-col>\n\n\n\n    </ion-item>\n\n    <ion-row center>\n\n      <ion-col text-center>\n\n        <button ion-button (click)=\'createZesissServiceRequest()\'>Submit</button>\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\report\report.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__ionic_native_media__["a" /* Media */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_android_permissions__["a" /* AndroidPermissions */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_5__providers_notification_notification__["a" /* NotificationProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_10__providers_message_message__["a" /* MessageProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */]])
    ], ReportPage);
    return ReportPage;
}());

//# sourceMappingURL=report.js.map

/***/ }),

/***/ 543:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacilitiesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_notification_notification__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_activitylogs_activitylogs__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









//Created by Anto Rupak
var FacilitiesPage = /** @class */ (function () {
    function FacilitiesPage(logs, navCtrl, toastCtrl, navParams, storage, loading, http, alertCtrl, notification) {
        this.logs = logs;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.loading = loading;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.notification = notification;
    }
    FacilitiesPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.getFacilitiesUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetAllFacilities';
            _this.getFacilitiesAccessUrl = _this.appUrl + '/WS/IdeaElanService.svc/InsertFacilityAccessRequest';
            _this.getUserDeviceDetailsUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetUserDeviceDetails';
            _this.sendPushNotificationUrl = _this.appUrl + '/WS/IdeaElanService.svc/SendPushMessageToTokens';
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
        });
    };
    FacilitiesPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
            if (_this.userJson.UserId == "" || _this.userJson.UserId == null) {
            }
            else {
                _this.sendFacilitiesRequest();
                _this.logs.insertlog("Facilities", "Menu Page", "Facilities Menu ", "User clicked Facilities part in the menu page", _this.userJson.UserId);
            }
        });
    };
    FacilitiesPage.prototype.sendFacilitiesRequest = function () {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        this.http.post(this.getFacilitiesUrl, {
            userid: this.userJson.UserId,
            usertoken: this.userJson.UserToken,
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userFacilitiesJson = resJSON;
            _this.facilityJson = resJSON;
            loader.dismiss();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
        });
    };
    FacilitiesPage.prototype.actionSheetMethod = function (actionJson) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Request Access',
            message: 'Are you sure you want to request access to &nbsp' + actionJson.GroupName + " " + 'facility',
            buttons: [
                {
                    text: 'OK',
                    role: 'destructive',
                    handler: function () {
                        _this.updateFacilityRequest(actionJson.GroupId);
                        _this.facilityname = actionJson.GroupName;
                        _this.groupid = actionJson.GroupId;
                        _this.notification.getUserDeviceDetails("facilityadmin", actionJson.GroupId, "FAR", _this.userJson.LastName + " " + _this.userJson.FirstName + " requested access for  " + _this.facilityname, "Facility Access Request");
                        _this.logs.insertlog("Facilities", "Facilities Page", "Facilities Page ", "User clicked Request Access for " + actionJson.GroupId + "in the Facilities Page", _this.userJson.UserId);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'destructive',
                    handler: function () {
                    }
                },
            ]
        });
        alert.present();
    };
    //TOAST METHOD
    FacilitiesPage.prototype.toast = function (toastStr) {
        var toast = this.toastCtrl.create({
            message: toastStr,
            duration: 2000
        });
        toast.present();
    };
    FacilitiesPage.prototype.updateFacilityRequest = function (labId) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        this.http.post(this.getFacilitiesAccessUrl, {
            userid: this.userJson.UserId,
            facilityid: labId,
            user: this.userJson.LastName,
            isactive: "-1"
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.FacilityUpdateJson = resJSON;
            //this.getUserDeviceDetails(labId);
            if (resJSON == "Success") {
            }
            loader.dismiss();
            _this.sendFacilitiesRequest();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
        });
    };
    FacilitiesPage.prototype.doRefresh = function (refresher) {
        this.searchText = "";
        this.sendFacilitiesRequest();
        setTimeout(function () {
            refresher.complete();
        }, 2000);
    };
    FacilitiesPage.prototype.getItems = function (searchbar) {
        var val = searchbar.target.value;
        var q = this.searchText;
        if (!q) {
            this.sendFacilitiesRequest();
            return true;
        }
        this.userFacilitiesJson = this.facilityJson.filter(function (v) {
            if (v.GroupName && q) {
                if (v.GroupName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                    return true;
                }
                return false;
            }
        });
    };
    FacilitiesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-facilities',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\facilities\facilities.html"*/'<!--Created by Anto Rupak-->\n\n<ion-header>\n\n  <ion-navbar hideBackButton text-center>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Facilities</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-searchbar (ionInput)="getItems($event)" [(ngModel)]="searchText"></ion-searchbar>\n\n  <!--Refresher added by Anto Rupak-->\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull to refresh" refreshingSpinner="circles"\n\n      refreshingText="Refreshing...">\n\n    </ion-refresher-content>\n\n  </ion-refresher>\n\n\n\n  <ion-card *ngFor="let facility of userFacilitiesJson" [ngSwitch]=facility.Status>\n\n\n\n    \n\n      <ion-card-content>\n\n          <ion-row>\n\n              <ion-col col-7>\n\n                  <h2>{{facility.GroupName}}</h2>\n\n                 \n\n                </ion-col>\n\n               \n\n                  <p *ngSwitchCase="\'Request Access\'">\n\n                    <button ion-button (click)=\'actionSheetMethod(facility)\' outline item-right style="    background-color: white;"> Request Access &nbsp;</button>\n\n                  </p>\n\n                  <p *ngSwitchCase="\'Waiting for approval\'">\n\n               \n\n                    <ion-badge item-end style="background-color:#fec547;">Waiting for Approval</ion-badge>\n\n                  </p>\n\n                  <p *ngSwitchCase="\'Approved\'">\n\n                    <ion-badge item-end style="background-color:#3AB052;margin-left: 35px;">{{facility.Status}}</ion-badge>\n\n                  </p>\n\n                  <p *ngSwitchCase="\'Rejected\'">\n\n                      <ion-badge item-end style="background-color:#F35C49; margin-left: 35px;">{{facility.Status}}</ion-badge>\n\n                  </p>\n\n           \n\n          </ion-row>\n\n          <ion-row>\n\n            <ion-col>\n\n                {{facility.Information}}\n\n            </ion-col>\n\n             \n\n          </ion-row>\n\n      </ion-card-content>\n\n    \n\n    </ion-card>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\facilities\facilities.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__providers_activitylogs_activitylogs__["a" /* ActivitylogsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__providers_notification_notification__["a" /* NotificationProvider */]])
    ], FacilitiesPage);
    return FacilitiesPage;
}());

//# sourceMappingURL=facilities.js.map

/***/ }),

/***/ 544:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__menu_menu__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_activitylogs_activitylogs__ = __webpack_require__(18);
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
 * Generated class for the LabsPage page Anto Rupak.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// Created by Anto Rupak
var LabsPage = /** @class */ (function () {
    function LabsPage(logs, navCtrl, navParams, storage, http, loading, actionctrl, alertCtrl) {
        this.logs = logs;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.http = http;
        this.loading = loading;
        this.actionctrl = actionctrl;
        this.alertCtrl = alertCtrl;
    }
    LabsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.getLabUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetAllLabs';
            _this.getLabAccessUrl = _this.appUrl + '/WS/IdeaElanService.svc/InsertLabAccessRequest';
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
        });
    };
    LabsPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
            if (_this.userJson.UserId != "" || _this.userJson.UserId != null) {
                _this.sendLabRequest();
                _this.logs.insertlog("Labs", "Menu Page", "Labs Menu ", "User clicked Labs part in the menu page", _this.userJson.UserId);
            }
            else {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__menu_menu__["a" /* MenuPage */]);
            }
        });
    };
    LabsPage.prototype.ionViewCanLeave = function () {
        this.navCtrl.popToRoot();
    };
    LabsPage.prototype.sendLabRequest = function () {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        this.http.post(this.getLabUrl, {
            userid: this.userJson.UserId,
            usertoken: this.userJson.UserToken,
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userLabJson = resJSON;
            // search bar to find objects
            _this.labJson = resJSON;
            loader.dismiss();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
        });
    };
    LabsPage.prototype.alertRequest = function (actionJson) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Request Access',
            message: 'Are you sure you want to request access.',
            buttons: [
                {
                    text: 'OK',
                    role: 'destructive',
                    handler: function () {
                        _this.updateLabRequest(actionJson.GroupId);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'destructive',
                    handler: function () {
                    }
                },
            ]
        });
        alert.present();
    };
    LabsPage.prototype.updateLabRequest = function (labId) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        this.http.post(this.getLabAccessUrl, {
            userid: this.userJson.UserId,
            labid: labId,
            user: this.userJson.LastName,
            isactive: "-1"
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userLabUpdateJson = resJSON;
            loader.dismiss();
            _this.logs.insertlog("Labs Request  ", "Labs Page ", "use requested access for lab " + labId + "   ", "use requested access for lab " + labId + "  by clicking on the lab which is listed in the labs page  ", _this.userJson.UserId);
            if (resJSON == "Success") {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Lab Access',
                    message: 'Access Requested Successfully',
                    buttons: ['Dismiss']
                });
                alert_1.present();
            }
            else if (resJSON == "-1") {
                var alert_2 = _this.alertCtrl.create({
                    title: 'Lab Access',
                    message: 'Already Requested',
                    buttons: ['Dismiss']
                });
                alert_2.present();
            }
            //   this.sendLabRequest();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
        });
    };
    LabsPage.prototype.doRefresh = function (refresher) {
        this.searchText = "";
        this.sendLabRequest();
        setTimeout(function () {
            refresher.complete();
        }, 2000);
    };
    LabsPage.prototype.getItems = function (searchbar) {
        var q = this.searchText;
        if (!q) {
            this.sendLabRequest();
            return true;
        }
        this.userLabJson = this.labJson.filter(function (v) {
            if (v.GroupName && q) {
                if (v.GroupName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                    return true;
                }
                return false;
            }
        });
    };
    LabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-labs',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\labs\labs.html"*/'<!--Module worked by Anto Rupak-->\n\n<ion-header>\n\n  <ion-navbar hideBackButton text-center>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Labs</ion-title>\n\n\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n<ion-content>\n\n  <ion-searchbar (ionInput)="getItems($event)" [(ngModel)]="searchText"></ion-searchbar>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull to refresh" refreshingSpinner="circles"\n\n      refreshingText="Refreshing...">\n\n    </ion-refresher-content>\n\n  </ion-refresher>\n\n\n\n\n\n  <ion-list>\n\n    <ion-item  *ngFor="let lab of userLabJson" (click)=\'alertRequest(lab)\'>\n\n        <h2> {{lab.GroupName}} </h2>\n\n    </ion-item>\n\n    \n\n  </ion-list>\n\n  <!-- <ion-card *ngFor="let lab of userLabJson" [ngSwitch]=lab.Status>\n\n      <ion-card-content>\n\n        <ion-item>\n\n          {{lab.GroupName}}\n\n          <p></p>\n\n          <div *ngSwitchCase="\'Request Access\'">\n\n            <button ion-button (click)=\'alertRequest(lab)\'>Request Access</button>\n\n          </div>\n\n          <div *ngSwitchCase="\'Pending\'">\n\n            Waiting for Approval\n\n          </div>\n\n          <div *ngSwitchCase="\'Approved\'">\n\n            {{lab.Status}}\n\n          </div>\n\n        </ion-item>\n\n      </ion-card-content>\n\n    </ion-card>-->\n\n</ion-content>'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\labs\labs.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__providers_activitylogs_activitylogs__["a" /* ActivitylogsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], LabsPage);
    return LabsPage;
}());

//# sourceMappingURL=labs.js.map

/***/ }),

/***/ 545:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InboxPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_notification_notification__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__sampledetail_sampledetail__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_activitylogs_activitylogs__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__message_message__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var InboxPage = /** @class */ (function () {
    function InboxPage(logs, navCtrl, toastCtrl, navParams, storage, loading, http, platform, alertCtrl, actionctrl, notification, datePipe) {
        this.logs = logs;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.loading = loading;
        this.http = http;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.actionctrl = actionctrl;
        this.notification = notification;
        this.datePipe = datePipe;
        this.page = "0";
        this.event = { startDate: "", endDate: "" };
        this.sample_event = { startDate: "", endDate: "" };
        this.supplies_event = { startDate: "", endDate: "" };
        this.result = [];
        //this.event.startDate = new Date().toISOString();
        this.event.startDate = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString();
        this.event.endDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();
        this.sample_event.startDate = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString();
        this.sample_event.endDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();
        this.supplies_event.startDate = __WEBPACK_IMPORTED_MODULE_9_moment__(new Date(new Date().setDate(new Date().getDate() - 30)).toISOString()).format('YYYY-MM-DD');
        this.supplies_event.endDate = __WEBPACK_IMPORTED_MODULE_9_moment__(new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()).format('YYYY-MM-DD');
        console.log(this.supplies_event.endDate);
    }
    InboxPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.pageSelected = 0;
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.getFacilitiesUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetFacilitiesUserIsAdmin';
            _this.getFacilitiesAccessUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetFacilityAccessRequest';
            _this.updateFacilitiesUrl = _this.appUrl + '/WS/IdeaElanService.svc/UpdateProviderRequestStatus';
            _this.getInstrumentAccessUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetInstrumentAccessRequest';
            _this.insertInstrumentUrl = _this.appUrl + '/WS/IdeaElanService.svc/InsertResourcePermission';
            _this.getReservationRequestUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetReservationRequest';
            _this.updateAppointmentStatusUrl = _this.appUrl + '/WS/IdeaElanService.svc/UpdateAppointmentStatusByApptId';
            _this.getUserDeviceDetailsUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetUserDeviceDetails';
            _this.sendPushNotificationUrl = _this.appUrl + '/WS/IdeaElanService.svc/SendPushMessageToTokens';
            _this.sampleRequestUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetWorkOrdersByProviderIdByDateRange';
            _this.suppliedRequestUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetOrderByProviderIdAndDates';
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
        });
        this.storage.get('roleType').then(function (role) {
            _this.roleType = role;
        });
        this.storage.get('pin').then(function (val) {
            _this.pin = val;
        });
    };
    InboxPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.get('spinnerInbox').then(function (val) {
            _this.spinnerIndex = Number(val);
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
            if (_this.userJson.UserId == "" || _this.userJson.UserId == null) {
            }
            else {
                _this.sendFacilitiesRequest();
            }
        });
    };
    InboxPage.prototype.selectedTab = function (ind) {
        this.slider.slideTo(ind);
    };
    InboxPage.prototype.moveButton = function ($event) {
        this.page = $event._snapIndex.toString();
        switch (this.page) {
            case '0':
                this.pageSelected = 0;
                break;
            case '1':
                this.pageSelected = 1;
                break;
            case '2':
                this.pageSelected = 2;
                break;
            default:
        }
    };
    InboxPage.prototype.sendSampleRequestsButton = function () {
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . ",
            duration: 3000
        });
        loader.present();
        this.sendSampleRequest();
        loader.dismiss();
    };
    InboxPage.prototype.sendFacilityRequestsButton = function () {
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . ",
            duration: 3000
        });
        loader.present();
        this.sendFacilitiesRequest();
        loader.dismiss();
    };
    InboxPage.prototype.sendFacilitiesRequest = function () {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . ",
            duration: 3000
        });
        loader.present();
        this.http.post(this.getFacilitiesUrl, {
            userid: this.userJson.UserId,
            usertoken: this.userJson.UserToken,
        })
            .subscribe(function (data) {
            //RESPONSE
            _this.emptyDropdown = false;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userFacilitiesJson = resJSON;
            _this.facilityid = resJSON[_this.spinnerIndex].GroupId;
            _this.GroupName = resJSON[_this.spinnerIndex].GroupName;
            _this.sendFacilityAccessRequest(_this.facilityid);
            _this.sendInstrumentRequest(_this.facilityid);
            _this.sendSampleRequest();
            _this.sendReservationRequest(_this.facilityid);
            _this.suppliesRequest();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            _this.emptyDropdown = true;
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
            }
        });
    };
    InboxPage.prototype.sendFacilityAccessRequest = function (groupId) {
        var _this = this;
        this.http.post(this.getFacilitiesAccessUrl, {
            userid: this.userJson.UserId,
            facilityid: groupId,
            usertoken: this.userJson.UserToken,
            isactive: "1"
        })
            .subscribe(function (data) {
            //RESPONSE
            _this.facStatus = true;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userFacilitiesAccessJson = resJSON;
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
                _this.checkStatus = "400";
                _this.facStatus = false;
                // this.toast(resErrJSON.statusText);
            }
        });
    };
    InboxPage.prototype.actionSheetMethod = function (actionJson) {
        var _this = this;
        var actionSheet = this.actionctrl.create({
            title: 'Select Option',
            cssClass: 'myPage',
            buttons: [
                {
                    text: 'Approve',
                    role: 'destructive',
                    cssClass: 'myActionSheetBtnStyle',
                    handler: function () {
                        _this.updateFacilityRequest(actionJson.UserId, _this.facilityid, "1");
                        _this.notification.getUserDeviceDetails("user", actionJson.UserId, "FARS", "Request to access " + _this.GroupName + " has been approved", "Facility Access Request");
                    }
                },
                {
                    text: 'Reject',
                    role: 'destructive',
                    cssClass: 'myActionSheetBtnStyle',
                    handler: function () {
                        _this.updateFacilityRequest(actionJson.UserId, _this.facilityid, "0");
                        _this.notification.getUserDeviceDetails("user", actionJson.UserId, "FARS", "Request to access " + _this.GroupName + " has been rejected", "Facility Access Request");
                    }
                },
            ]
        });
        actionSheet.present();
    };
    InboxPage.prototype.updateFacilityRequest = function (userid, groupId, isactive) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        //  loader.present();
        this.http.post(this.updateFacilitiesUrl, {
            userid: userid,
            facilityid: groupId,
            user: this.userJson.EmailAddress,
            status: isactive
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.FacilityUpdateJson = resJSON;
            // this.notification.getUserDeviceDetails("user",this.userJson.UserId,"FARS","Facility Access has been requested","Facility Access Request");
            // loader.dismiss();
            _this.sendFacilityAccessRequest(_this.facilityid);
            var alert = _this.alertCtrl.create({
                title: 'Message',
                subTitle: 'Status Updated Successfully!',
                buttons: ['OK']
            });
            alert.present();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
        });
    };
    InboxPage.prototype.sendInstrumentRequest = function (groupId) {
        var _this = this;
        this.http.post(this.getInstrumentAccessUrl, {
            userid: this.userJson.UserId,
            facilityid: groupId,
            usertoken: this.userJson.UserToken,
            resourceid: "0"
        })
            .subscribe(function (data) {
            //RESPONSE
            _this.instStatus = true;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userInstrumentJson = resJSON;
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
                _this.checkStatus = "400";
                _this.instStatus = false;
                //this.toast(resErrJSON.statusText);
            }
        });
    };
    InboxPage.prototype.alertRequest = function (actionJson) {
        var _this = this;
        var actionSheet = this.actionctrl.create({
            title: 'Select Option',
            cssClass: 'myPage',
            buttons: [
                {
                    text: 'Approve',
                    role: 'destructive',
                    cssClass: 'myActionSheetBtnStyle',
                    handler: function () {
                        _this.updateInstrumentRequest(actionJson.PermissionId, actionJson.GroupId, "1", actionJson.ResourceId);
                        _this.notification.getUserDeviceDetails("user", actionJson.UserId, "IARS", "Access for " + actionJson.ResourceName + " has been approved", "Instrument Access Request");
                    }
                },
                {
                    text: 'Reject',
                    role: 'destructive',
                    cssClass: 'myActionSheetBtnStyle',
                    handler: function () {
                        _this.updateInstrumentRequest(actionJson.PermissionId, actionJson.GroupId, "3", actionJson.ResourceId);
                        _this.notification.getUserDeviceDetails("user", actionJson.UserId, "IARS", "Access for " + actionJson.ResourceName + " has been rejected", "Instrument Access Request");
                    }
                },
            ]
        });
        actionSheet.present();
    };
    InboxPage.prototype.updateInstrumentRequest = function (permissionid, groupId, isapproved, resourceid) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        // loader.present();
        this.http.post(this.insertInstrumentUrl, {
            permissionid: permissionid,
            userid: this.userJson.UserId,
            facilityid: groupId,
            user: this.userJson.LastName,
            isapproved: isapproved,
            resourceid: resourceid
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.InstrumentUpdateJson = resJSON;
            _this.sendInstrumentRequest(_this.facilityid);
            var alert = _this.alertCtrl.create({
                title: 'Message',
                subTitle: 'Status Updated Successfully!',
                buttons: ['OK']
            });
            alert.present();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
        });
    };
    InboxPage.prototype.toast = function (toastStr) {
        var alert = this.alertCtrl.create({
            title: 'Alert',
            message: toastStr,
            buttons: ['Ok']
        });
        alert.present();
    };
    InboxPage.prototype.updateChange = function () {
        this.facilityid;
        this.suppliesRequest();
        this.sendFacilityAccessRequest(this.facilityid);
        this.sendInstrumentRequest(this.facilityid);
        this.sendSampleRequest();
        this.sendReservationRequest(this.facilityid);
        this.notify = this.facility;
        this.spinnerIndex = 0;
        for (var i = 0; i < this.userFacilitiesJson.length; i++) {
            this.storage.set('spinnerInbox', this.spinnerIndex);
            if (this.facilityid == this.userFacilitiesJson[i].GroupId) {
                break;
            }
            this.spinnerIndex++;
        }
    };
    InboxPage.prototype.sendReservationRequest = function (groupId) {
        var _this = this;
        this.http.post(this.getReservationRequestUrl, {
            userid: this.userJson.UserId,
            facilityid: groupId,
            usertoken: this.userJson.UserToken,
            starttime: this.event.startDate,
            endtime: this.event.endDate
        })
            .subscribe(function (data) {
            //RESPONSE
            _this.reservStatus = true;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.ReservationRequestJson = resJSON;
            _this.resourceName = resJSON[0].ResourceName;
            _this.apptid = resJSON[0].AppointmentId;
            _this.adate = resJSON[0].strStartTime;
            _this.bdate = resJSON[0].strEndTime;
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
                _this.checkStatus = "400";
                _this.reservStatus = false;
            }
        });
    };
    InboxPage.prototype.reservationRequest = function (actionJson) {
        var _this = this;
        var resErr = JSON.stringify(actionJson);
        var resErrJSON = JSON.parse(resErr);
        if (resErrJSON.Status == "Pending") {
            var actionSheet = this.actionctrl.create({
                title: 'Select Option : ',
                cssClass: 'myPage',
                buttons: [
                    {
                        text: 'Approve',
                        role: 'destructive',
                        cssClass: 'myActionSheetBtnStyle',
                        handler: function () {
                            _this.updateAppointmentStatus(actionJson.AppointmentId, "true");
                            //  this.notification.getUserDeviceDetails("appt",this.apptid,"TRS",`Your appointment request from ${this.adate} to ${this.bdate} for ${this.resourceName} has been approved`,"Appointment approval");
                        }
                    },
                    {
                        text: 'Reject',
                        role: 'destructive',
                        cssClass: 'myActionSheetBtnStyle',
                        handler: function () {
                            _this.updateAppointmentStatus(actionJson.AppointmentId, "false");
                            // this.notification.getUserDeviceDetails("appt",this.apptid,"TRS",`Your appointment request from ${this.adate} to ${this.bdate} for ${this.resourceName} has been rejected`,"Appointment approval");
                        }
                    },
                ]
            });
            actionSheet.present();
        }
        else if (resErrJSON.Status == "Approved") {
            var actionSheet = this.actionctrl.create({
                title: 'Select Option : ',
                cssClass: 'myPage',
                buttons: [
                    {
                        text: 'Reject',
                        role: 'destructive',
                        cssClass: 'myActionSheetBtnStyle',
                        handler: function () {
                            _this.updateAppointmentStatus(actionJson.AppointmentId, "false");
                            //  this.notification.getUserDeviceDetails("appt",this.apptid,"TRS",`Your appointment request from ${this.adate} to ${this.bdate} for ${this.resourceName} has been rejected`,"Appointment approval");
                        }
                    },
                ]
            });
            actionSheet.present();
        }
        else if (resErrJSON.Status == "Rejected") {
            var actionSheet = this.actionctrl.create({
                title: 'Select Option : ',
                cssClass: 'myPage',
                buttons: [
                    {
                        text: 'Approve',
                        role: 'destructive',
                        cssClass: 'myActionSheetBtnStyle',
                        handler: function () {
                            _this.updateAppointmentStatus(actionJson.AppointmentId, "true");
                        }
                    },
                ]
            });
            actionSheet.present();
        }
    };
    InboxPage.prototype.sampleDetail = function (sampleJson) {
        /*
        let actionSheet = this.actionctrl.create({
          title: 'Select Options',
          cssClass: 'myPage',
          buttons: [
            {
              //updated by Abey Abraham
              text: 'Update Milestone',
              role: 'destructive',
              cssClass: 'myActionSheetBtnStyle',
              handler: () => {
               
              }
            },
            {
              text: 'Chat',
              role: 'destructive',
              cssClass: 'myActionSheetBtnStyle',
              handler: () => {
              
              }
            },
          ]
        })
        actionSheet.present();
    */
        var _this = this;
        if (this.roleType == "user" || this.roleType == "providerAdmin" || this.roleType == "super" || this.roleType == "labAdmin" || this.roleType == " admin") {
            if (this.roleType == "user" || this.roleType == "labAdmin") {
                if (this.userJson.UserId != sampleJson.UserId) {
                    this.showdetails(sampleJson);
                    return;
                }
            }
            if (this.roleType == "super" || this.roleType == "providerAdmin" || this.roleType == " admin") {
                if (this.userJson.UserId == sampleJson.UserId) {
                    this.showdetails(sampleJson);
                    return;
                }
            }
            var actionSheet = this.actionctrl.create({
                title: 'Select Options',
                cssClass: 'myPage',
                buttons: [
                    {
                        //updated by Abey Abraham
                        text: 'Chat',
                        role: 'destructive',
                        cssClass: 'myActionSheetBtnStyle',
                        handler: function () {
                            //  this.logs.insertlog("View Issues ", "Facility Dashboard Page", "click event of card content", "User clicked the issues displayed in cards for viewing details  ", this.userJson.UserId);
                            //this.navCtrl.push('DashboarddetailPage', { "dashboardTicketDetail": instrument ,"userId":this.userJson.UserId});
                            if (_this.roleType == "user" || _this.roleType == "labAdmin") {
                                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__message_message__["a" /* MessagePage */], { "WorkOrderId": "" + sampleJson.WorkOrderId, "id": "user", "ProviderId": "" + sampleJson.ProviderId, "source": " " + sampleJson.RollNumber, "chatType": "SampleSubmission" });
                            }
                            else if (_this.roleType == "super" || _this.roleType == "providerAdmin" || _this.roleType == " admin") {
                                _this.navCtrl.push('ChatContentPage', { "WorkOrderId": "" + sampleJson.WorkOrderId, "ProviderId": "" + sampleJson.ProviderId, "role": "" + _this.roleType, "userid": "" + sampleJson.UserId, "adminid": "" + _this.userJson.UserId, "senderName": _this.userJson.LastName + " " + _this.userJson.FirstName, "pin": "" + _this.pin, "source": " " + sampleJson.RollNumber, "chatType": "SampleSubmission" });
                                // this.navCtrl.push(MessagePage, {"WorkOrderId":`${sampleJson.WorkOrderId}`,"id":"providerAdmin","ProviderId":`${sampleJson.ProviderId}`,"source":` ${sampleJson.RollNumber}`,"chatType":`SampleSubmission`});
                            }
                        }
                    },
                    {
                        text: 'Details',
                        role: 'destructive',
                        cssClass: 'myActionSheetBtnStyle',
                        handler: function () {
                            _this.sampleJson = sampleJson;
                            _this.statusJson = _this.sampleJson.WorkOrderStatus;
                            if (_this.statusJson.toLowerCase().indexOf("approved by pi") >= 0 || _this.statusJson.toLowerCase().indexOf("approved by user") >= 0 || _this.statusJson.toLowerCase().indexOf("in progress") >= 0) {
                                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__sampledetail_sampledetail__["a" /* SampledetailPage */], { "sampleJson": sampleJson, "showValue": "true" });
                            }
                            else {
                                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__sampledetail_sampledetail__["a" /* SampledetailPage */], { "sampleJson": sampleJson, "showValue": "false" });
                            }
                        }
                    },
                ]
            });
            actionSheet.present();
        }
        else {
            this.showdetails(sampleJson);
        }
    };
    InboxPage.prototype.showdetails = function (sampleJson) {
        var _this = this;
        var actionSheet = this.actionctrl.create({
            title: 'Select Options',
            cssClass: 'myPage',
            buttons: [
                {
                    text: 'Details',
                    role: 'destructive',
                    cssClass: 'myActionSheetBtnStyle',
                    handler: function () {
                        console.log("here");
                        _this.sampleJson = sampleJson;
                        _this.statusJson = _this.sampleJson.WorkOrderStatus;
                        if (_this.statusJson.toLowerCase().indexOf("approved by pi") >= 0 || _this.statusJson.toLowerCase().indexOf("approved by user") >= 0 || _this.statusJson.toLowerCase().indexOf("in progress") >= 0) {
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__sampledetail_sampledetail__["a" /* SampledetailPage */], { "sampleJson": sampleJson, "showValue": "true" });
                        }
                        else {
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__sampledetail_sampledetail__["a" /* SampledetailPage */], { "sampleJson": sampleJson, "showValue": "false" });
                        }
                    }
                },
            ]
        });
        actionSheet.present();
        return;
    };
    InboxPage.prototype.updateAppointmentStatus = function (AppointmentId, isapproved) {
        var _this = this;
        this.http.post(this.updateAppointmentStatusUrl, {
            apptid: AppointmentId,
            user: this.userJson.EmailAddress,
            isapproved: isapproved
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.AppointmentStatusUpdateJson = resJSON;
            //  this.notification.getUserDeviceDetails("appt",this.apptid,"TRS",`Your appointment request from ${this.adate} to ${this.bdate} for ${this.resourceName} has been approved`,"Appointment approval");
            _this.sendReservationRequest(_this.facilityid);
            var alert = _this.alertCtrl.create({
                title: 'Message',
                subTitle: 'Status Updated Successfully!',
                buttons: ['OK']
            });
            alert.present();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
            }
        });
    };
    InboxPage.prototype.sendSampleRequest = function () {
        var _this = this;
        this.http.post(this.sampleRequestUrl, {
            facilityid: this.facilityid,
            starttime: this.sample_event.startDate,
            endtime: this.sample_event.endDate,
            usertoken: this.userJson.UserToken,
            loggedinuser: this.userJson.UserId
        })
            .subscribe(function (data) {
            //RESPONSE
            _this.sampleStatus = true;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.sampleRequestJson = resJSON;
            console.log(_this.sampleRequestJson);
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            _this.sampleStatus = false;
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
        });
    };
    InboxPage.prototype.suppliesRequest = function () {
        var _this = this;
        this.http.get(this.suppliedRequestUrl + ("/" + this.facilityid + ",0," + this.supplies_event.startDate + "," + this.supplies_event.endDate))
            .subscribe(function (data) {
            //RESPONSE
            _this.suppliesValue = true;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.suppliesJson = resJSON;
            console.log(resJSON);
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            var resErr = JSON.stringify(error);
            _this.suppliesValue = false;
        });
    };
    InboxPage.prototype.suppliesDetail = function (data) {
        var _this = this;
        if (this.roleType == "user" || this.roleType == "providerAdmin" || this.roleType == "super" || this.roleType == "labAdmin" || this.roleType == " admin") {
            if (this.roleType == "user" || this.roleType == "labAdmin") {
                if (this.userJson.UserId != data.UserId) {
                    this.showdetail(data);
                    return;
                }
            }
            if (this.roleType == "super" || this.roleType == "providerAdmin" || this.roleType == " admin") {
                if (this.userJson.UserId == data.UserId) {
                    console.log("same");
                    this.showdetail(data);
                    return;
                }
            }
            var actionSheet = this.actionctrl.create({
                title: 'Select Options',
                cssClass: 'myPage',
                buttons: [
                    {
                        //updated by Abey Abraham
                        text: 'Chat',
                        role: 'destructive',
                        cssClass: 'myActionSheetBtnStyle',
                        handler: function () {
                            //  this.logs.insertlog("View Issues ", "Facility Dashboard Page", "click event of card content", "User clicked the issues displayed in cards for viewing details  ", this.userJson.UserId);
                            //this.navCtrl.push('DashboarddetailPage', { "dashboardTicketDetail": instrument ,"userId":this.userJson.UserId});
                            console.log("y oy o", data.OrderId, data.ProviderId, data.OrderNumber);
                            if (_this.roleType == "user" || _this.roleType == "labAdmin") {
                                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__message_message__["a" /* MessagePage */], { "OrderId": "" + data.OrderId, "id": "user", "ProviderId": "" + data.ProviderId, "source": "Order Number : " + data.OrderNumber, "chatType": "SuppliesOrder" });
                            }
                            else if (_this.roleType == "super" || _this.roleType == "providerAdmin" || _this.roleType == " admin") {
                                _this.navCtrl.push('ChatContentPage', { "OrderId": "" + data.OrderId, "ProviderId": "" + data.ProviderId, "role": "" + _this.roleType, "userid": "" + data.UserId, "adminid": "" + _this.userJson.UserId, "senderName": _this.userJson.LastName + " " + _this.userJson.FirstName, "pin": "" + _this.pin, "source": "Order Number : " + data.OrderNumber, "chatType": "SuppliesOrder" });
                                // this.navCtrl.push(MessagePage, {"OrderId":`${data.OrderId}`,"id":"providerAdmin","ProviderId":`${data.ProviderId}`,"source":`Order Number : ${data.OrderNumber}`,"chatType":`SuppliesOrder`});
                            }
                        }
                    },
                    {
                        text: 'Details',
                        role: 'destructive',
                        cssClass: 'myActionSheetBtnStyle',
                        handler: function () {
                            _this.navCtrl.push("SuppliesDetailPage", {
                                "orderid": data.OrderId,
                            });
                        }
                    },
                ]
            });
            actionSheet.present();
        }
        else {
            this.showdetail(data);
        }
    };
    InboxPage.prototype.showdetail = function (data) {
        var _this = this;
        var actionSheet = this.actionctrl.create({
            title: 'Select Options',
            cssClass: 'myPage',
            buttons: [
                {
                    text: 'Details',
                    role: 'destructive',
                    cssClass: 'myActionSheetBtnStyle',
                    handler: function () {
                        _this.navCtrl.push("SuppliesDetailPage", {
                            "orderid": data.OrderId,
                        });
                    }
                },
            ]
        });
        actionSheet.present();
        return;
    };
    InboxPage.prototype.startdatetime = function (event, data) {
        if (this.event.startDate > this.event.endDate) {
            this.event.startDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();
            this.showAlert("Start date cannot be after End Date.");
            return false;
        }
        else if (this.sample_event.startDate > this.sample_event.endDate) {
            this.showAlert("Start date cannot be after End Date.");
            return false;
        }
    };
    InboxPage.prototype.enddatetime = function (event, data) {
        var chkDate;
        if (data == "sample") {
            this.sample_event.endDate = __WEBPACK_IMPORTED_MODULE_9_moment__(this.sample_event.endDate).toISOString(true);
            this.sample_event.startDate = __WEBPACK_IMPORTED_MODULE_9_moment__(this.sample_event.startDate).toISOString(true);
            chkDate = __WEBPACK_IMPORTED_MODULE_9_moment__(this.sample_event.endDate).isAfter(this.sample_event.startDate);
        }
        else {
            this.event.startDate = __WEBPACK_IMPORTED_MODULE_9_moment__(this.event.startDate).toISOString(true);
            this.event.endDate = __WEBPACK_IMPORTED_MODULE_9_moment__(this.event.endDate).toISOString(true);
            chkDate = __WEBPACK_IMPORTED_MODULE_9_moment__(this.event.endDate).isAfter(this.event.startDate);
        }
        if (!chkDate) {
            if (data == "sample") {
                this.sample_event.endDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();
            }
            else {
                this.event.endDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();
            }
            this.showAlert("Selected date cannot be before to start date.");
        }
        //this.endDate = moment(this.navParams.get("endDate")).toISOString(true);
    };
    InboxPage.prototype.showAlert = function (eventdata) {
        var alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: eventdata,
            buttons: ['Ok']
        });
        alert.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('slider'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Slides */])
    ], InboxPage.prototype, "slider", void 0);
    InboxPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-inbox',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\inbox\inbox.html"*/'<ion-header>\n\n  <ion-navbar hideBackButton text-center>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Inbox</ion-title>\n\n  </ion-navbar>\n\n  <ion-row [class.hide]="userType" >\n\n      <ion-col>\n\n        <p class="drop">Facility</p>\n\n      </ion-col>\n\n      <ion-col >\n\n        <ion-select *ngIf=\'emptyDropdown\' [(ngModel)]="facilityid" disable="true" placeholder=\'No Records Found\'\n\n          multiple="false" (ionChange)="updateChange()">\n\n        </ion-select>\n\n        <ion-select *ngIf=\'!emptyDropdown\' [(ngModel)]="facilityid" placeholder=\'Facility\' multiple="false"\n\n          (ionChange)="updateChange()">\n\n          <ion-option *ngIf=\'emptyDropdown\' selected>No Records Found</ion-option>\n\n          <ion-option *ngFor="let facility of userFacilitiesJson; let i = index;" selected="{{(i==0)}}"\n\n            [navPush]="InboxPage" [navParams]="facility" value="{{facility.GroupId}}">{{facility.GroupName}}</ion-option>\n\n        </ion-select>\n\n      </ion-col>\n\n    </ion-row>\n\n  <hr>\n\n<ion-segment [(ngModel)]="page">\n\n  <ion-segment-button value="0" (click)="selectedTab(0)">\n\n    Access Request\n\n  </ion-segment-button>\n\n  <ion-segment-button value="1" (click)="selectedTab(1)">\n\n    Service Request\n\n  </ion-segment-button>\n\n  <ion-segment-button value="2" (click)="selectedTab(2)">\n\n    Supplies\n\n  </ion-segment-button>\n\n</ion-segment>\n\n</ion-header>\n\n<ion-content overflow-scroll="false" #container >\n\n  <ion-slides class="forgot" #slider (ionSlideWillChange)="moveButton($event)">\n\n    <ion-slide>\n\n \n\n         \n\n          \n\n          <!--\n\n            grid\n\n          -->\n\n          <ion-grid>\n\n              <ion-row class="ion-align-items-center">\n\n                <ion-col>\n\n               \n\n                </ion-col>\n\n                <ion-col>\n\n                  <div>\n\n                    <ion-label>   \n\n                      <button ion-button id="pistartbutton" >\n\n                          <ion-datetime picker date [(ngModel)]="event.startDate" max="2099" min="1990"\n\n                          (ionChange)="startdatetime($event)"></ion-datetime>\n\n                        <ion-icon name=\'calendar\'></ion-icon> <br>  <br><label class="btninlabel">Start Date</label>\n\n                        </button>\n\n                     </ion-label>\n\n                  </div>\n\n                  <div class="date_times">{{event.startDate | date: "MM-dd-yyyy"}}</div>\n\n                </ion-col>\n\n                <ion-col>\n\n                  <div>\n\n                    <ion-label>   \n\n                      <button ion-button id="piendbutton" >\n\n                          <ion-datetime picker date [(ngModel)]="event.endDate" (ionChange)="enddatetime($event)" max="2099" min="1990"></ion-datetime>\n\n                        <ion-icon name=\'calendar\'></ion-icon> <br>  <br><label class="btninlabel">End Date &nbsp; &nbsp;</label></button>\n\n                    </ion-label>\n\n                  </div>\n\n                  <div class="date_timee">{{event.endDate | date: "MM-dd-yyyy"}}</div>\n\n                </ion-col>\n\n                <ion-col>\n\n                \n\n                </ion-col>\n\n              </ion-row>\n\n            </ion-grid>\n\n          <!--Mofified by anto to change date-picker-->\n\n          <div text-center><button ion-button (click)="sendFacilityRequestsButton()"  class="dateButton">Go</button></div>\n\n          <p class="dropdown">Reservation Request</p>\n\n          <ion-card-content *ngIf=\'!reservStatus\'>No Records Found</ion-card-content>\n\n  <div *ngIf=\'reservStatus\'>\n\n\n\n  \n\n          <ion-card *ngFor="let reservation of ReservationRequestJson" (click)=\'reservationRequest(reservation)\' [ngSwitch]=reservation.Status>\n\n              <div class="cardheading">{{reservation.ResourceName}}</div>\n\n              <div class="cardsubheading">User : {{reservation.UserFullName}}</div>\n\n              <div class="cardcontainertext">\n\n                <span class="cardlefttext">Lab : {{reservation.LabName}}</span>\n\n                 <span class="cardrighttext">{{reservation.SessionType}}</span>\n\n                </div>\n\n             <div class="cardsubtext" [class.hide]="!userType" *ngIf="reservation.GroupType!=\'P\'">Account Code : {{reservation.AccountCode}}</div>\n\n              <div class="cardsubtext" [class.hide]="!userType" *ngIf="reservation.GroupType==\'P\'">PO Number : {{reservation.AccountCode}}</div>\n\n              <div *ngSwitchCase="\'Approved\'" class="cardcontainertext">\n\n                <span class="cardstatus" >Status : </span>\n\n                <span class="cardstatusgreen"><ion-icon name="checkmark-circle" class="text"></ion-icon> {{reservation.Status}}\n\n                </span>\n\n              </div>\n\n              <div *ngSwitchCase="\'Waitlisted\'" class="cardcontainertext"><span class="cardstatus" >Status : </span><span class="cardstatusgreen"><ion-icon name="checkmark-circle" class="text"></ion-icon> {{reservation.Status}}</span></div>\n\n              <div *ngSwitchCase="\'Rejected\'" class="cardcontainertext"><span class="cardstatus" >Status : </span><span class="cardstatusred"> <ion-icon name="close-circle" class="text"></ion-icon> {{reservation.Status}}</span></div>\n\n              <div *ngSwitchCase="\'Pending\'" class="cardcontainertext"><span class="cardstatus" >Status : </span><span class="cardstatusred"><ion-icon name="close-circle" class="text"></ion-icon> {{reservation.Status}}</span></div>\n\n              <div *ngSwitchCase="\'Upcoming\'" class="cardcontainertext"><span class="cardstatus" >Status : </span><span class="cardstatusgreen"><ion-icon name="checkmark-circle" class="text"></ion-icon> {{reservation.Status}}</span></div>\n\n              <div *ngSwitchCase="\'Elapsed\'" class="cardcontainertext"><span class="cardstatus" >Status : </span><span class="cardstatusred"><ion-icon name="close-circle" class="text"></ion-icon> {{reservation.Status}}</span></div>\n\n              <div class="cardcontainertext">\n\n                <span class="cardlefttime"> <ion-icon name="time" class="text"></ion-icon> {{reservation.strStartTime}}</span> \n\n                <span class="cardrighttime"><ion-icon name="time" class="text"></ion-icon> {{reservation.strEndTime}}</span>\n\n              </div>\n\n              </ion-card>\n\n            </div>\n\n          <br>\n\n          <p class="dropdown">Facility Access Request</p>\n\n          <ion-card-content *ngIf=\'!facStatus\'>No Records Found</ion-card-content>\n\n         <div *ngIf=\'facStatus\'>\n\n              <ion-card  *ngFor="let facilityAccess of userFacilitiesAccessJson; let i = index;"  (click)=\'actionSheetMethod(facilityAccess)\' >\n\n              <div class="cardsubheading">{{facilityAccess.UserName}}</div>\n\n              <div class="cardsubtext"> Lab : {{facilityAccess.Lab}}</div>\n\n              <div class="cardsubtext"> Institution : {{facilityAccess.Institution}}</div>\n\n              <div class="cardsubtext">Date : {{facilityAccess.CreatedDate}}</div>\n\n              </ion-card>\n\n        </div>\n\n   \n\n          <br>\n\n          <p class="dropdown">Instrument Access Request</p>\n\n          <ion-card-content *ngIf=\'!instStatus\'>No Records Found</ion-card-content>\n\n            <div *ngIf=\'instStatus\'>\n\n              <ion-card *ngFor="let instrument of userInstrumentJson" (click)=\'alertRequest(instrument)\'>\n\n              <div class="cardsubheading">{{instrument.ResourceName}}</div>\n\n              <div class="cardsubtext"> {{instrument.UserName}}</div>\n\n              <div class="cardsubtext"> {{instrument.strCreatedDate}}</div>\n\n              </ion-card>\n\n        </div>\n\n      </ion-slide>\n\n\n\n      <ion-slide>\n\n\n\n         \n\n          <ion-grid>\n\n\n\n              <ion-row class="ion-align-items-center">\n\n                <ion-col>\n\n               \n\n                </ion-col>\n\n                <ion-col>\n\n                  <div>\n\n                    <ion-label>   \n\n                      <button ion-button id="pistartbutton" >\n\n                          <ion-datetime picker date [(ngModel)]="sample_event.startDate" max="2099" min="1990"\n\n                          (ionChange)="startdatetime($event, \'sample\')"></ion-datetime>\n\n                        <ion-icon name=\'calendar\'></ion-icon> <br>  <br><label class="btninlabel">Start Date</label>\n\n                        </button>\n\n                     </ion-label>\n\n                  </div>\n\n                  <div class="date_times">{{sample_event.startDate | date: "MM-dd-yyyy"}}</div>\n\n                </ion-col>\n\n                <ion-col>\n\n                  <div>\n\n                    <ion-label>   \n\n                      <button ion-button id="piendbutton" >\n\n                          <ion-datetime picker date [(ngModel)]="sample_event.endDate" (ionChange)="enddatetime($event, \'sample\')" max="2099" min="1990"></ion-datetime>\n\n                        <ion-icon name=\'calendar\'></ion-icon> <br>  <br><label class="btninlabel">End Date &nbsp; &nbsp;</label></button>\n\n                    </ion-label>\n\n                  </div>\n\n                  <div class="date_timee">{{sample_event.endDate  | date: "MM-dd-yyyy"}}</div>\n\n                </ion-col>\n\n                <ion-col>\n\n                \n\n                </ion-col>\n\n              </ion-row>\n\n            </ion-grid>\n\n          <div text-center><button ion-button (click)="sendSampleRequestsButton()"  class="dateButton">Go</button></div>\n\n          <p class="dropdown">Sample Submission/Service Request</p>\n\n          <ion-card-content *ngIf=\'!sampleStatus\'>No Records Found</ion-card-content>\n\n          <div *ngIf=\'sampleStatus\'>\n\n    \n\n            <ion-card *ngFor="let sampleAccess of sampleRequestJson; let i = index;"  [ngSwitch]=sampleAccess.WorkOrderStatus.trim() (click)="sampleDetail(sampleAccess)">\n\n                <div class="cardheading">{{sampleAccess.RollNumber}}</div>\n\n                <div class="cardsubheading">Template : {{sampleAccess.TemplateName}}</div>  \n\n                <div class="cardsubtext" >User : {{sampleAccess.UserFullName}}</div>\n\n                <div class="cardsubtext" >Lab : {{sampleAccess.LabName}}</div>    \n\n                <div class="cardsubtext" >PI : {{sampleAccess.PIName}}</div>  \n\n                <div *ngIf="sampleAccess.WorkOrderStatus.trim()!=\'Approval Process (Cancel)\'" class="cardcontainertext">\n\n                    <span class="cardstatus" >Status :           \n\n                    </span>\n\n                    <span class="cardstatusgreen"><ion-icon name="checkmark-circle" class="text"></ion-icon> {{sampleAccess.WorkOrderStatus}}\n\n                    </span>\n\n                  </div>\n\n                <div *ngIf="sampleAccess.WorkOrderStatus.trim()==\'Approval Process (Cancel)\'" class="cardcontainertext">\n\n                  <span class="cardstatus" >Status : </span>\n\n                  <span class="cardstatusred"> <ion-icon name="close-circle" class="text"></ion-icon> {{sampleAccess.WorkOrderStatus}}\n\n                  </span>\n\n                </div>\n\n                <div class="cardsubtext" >Date : {{sampleAccess.strCreatedDate}}</div> \n\n                </ion-card>\n\n          </div>\n\n          \n\n        </ion-slide>\n\n\n\n        <ion-slide>\n\n          \n\n \n\n \n\n  <ion-grid>\n\n\n\n      <ion-row class="ion-align-items-center">\n\n        <ion-col>\n\n       \n\n        </ion-col>\n\n        <ion-col>\n\n          <div>\n\n            <ion-label>   \n\n              <button ion-button id="pistartbutton" >\n\n                  <ion-datetime picker date [(ngModel)]="supplies_event.startDate" max="2099" min="1990"\n\n                  (ionChange)="startdatetime($event, \'sample\')"></ion-datetime>\n\n                <ion-icon name=\'calendar\'></ion-icon> <br>  <br><label class="btninlabel">Start Date</label>\n\n                </button>\n\n             </ion-label>\n\n          </div>\n\n          <div class="date_times">{{supplies_event.startDate | date: "MM-dd-yyyy"}}</div>\n\n        </ion-col>\n\n        <ion-col>\n\n          <div>\n\n            <ion-label>   \n\n              <button ion-button id="piendbutton" >\n\n                  <ion-datetime picker date [(ngModel)]="supplies_event.endDate" (ionChange)="enddatetime($event, \'sample\')" max="2099" min="1990"></ion-datetime>\n\n  \n\n                <ion-icon name=\'calendar\'></ion-icon> <br>  <br><label class="btninlabel">End Date &nbsp; &nbsp;</label></button>\n\n         \n\n            </ion-label>\n\n          </div>\n\n          <div class="date_timee">{{supplies_event.endDate   | date: "MM-dd-yyyy"}}</div>\n\n        </ion-col>\n\n        <ion-col>\n\n        \n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  <div text-center><button ion-button (click)="suppliesRequest()"  class="dateButton">Go</button></div>\n\n  <ion-card-content *ngIf=\'!suppliesValue\'>No Records Found</ion-card-content>\n\n  <div *ngIf=\'suppliesValue\'>\n\n    <ion-card *ngFor="let supplies of suppliesJson; let i = index;"   [ngSwitch]=supplies.Status   (click)="suppliesDetail(supplies)">\n\n        <div class="cardheading">Order Number : {{supplies.OrderNumber}}</div>\n\n        <div class="cardsubheading">Lab Name : {{supplies.GroupName}}</div>  \n\n        <div class="cardsubtext" >User : {{supplies.UserFullName}}</div>\n\n        <div class="cardsubtext" >Date : {{supplies.CreatedDate}}</div>      \n\n        <div class="cardsubtext"  *ngIf="!supplies.TotalAmount">Total Amount: 0.00 {{supplies.Currencycode}}</div>\n\n        <div class="cardsubtext"  *ngIf="supplies.TotalAmount">Total Amount: {{supplies.TotalAmount | number:\'1.2-2\'}}  {{supplies.Currencycode}}</div>\n\n        <div *ngSwitchCase="\'Created\'" class="cardcontainertext">\n\n          <span class="cardstatus" > Status : </span>\n\n          <span class="cardstatusgreen"><ion-icon name="checkmark-circle" class="text"></ion-icon> {{supplies.Status}}\n\n          </span>\n\n        </div>\n\n        <div *ngSwitchCase="\'Approved\'" class="cardcontainertext">\n\n          <span class="cardstatus" > Status :           \n\n          </span>\n\n          <span class="cardstatusgreen"><ion-icon name="checkmark-circle" class="text"></ion-icon> {{supplies.Status}}\n\n          </span>\n\n        </div>\n\n        <div *ngSwitchCase="\'Completed\'" class="cardcontainertext">\n\n            <span class="cardstatus" > Status :           \n\n            </span>\n\n            <span class="cardstatusgreen"><ion-icon name="checkmark-circle" class="text"></ion-icon> {{supplies.Status}}\n\n            </span>\n\n          </div>\n\n        <div *ngSwitchCase="\'Cancelled\'" class="cardcontainertext">\n\n          <span class="cardstatus" > Status : </span>\n\n          <span class="cardstatusred"> <ion-icon name="close-circle" class="text"></ion-icon> {{supplies.Status}}\n\n          </span>\n\n        </div>\n\n        </ion-card>\n\n  </div>\n\n          </ion-slide>\n\n      </ion-slides>\n\n  \n\n\n\n  \n\n</ion-content>'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\inbox\inbox.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__providers_activitylogs_activitylogs__["a" /* ActivitylogsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_notification_notification__["a" /* NotificationProvider */], __WEBPACK_IMPORTED_MODULE_4__angular_common__["d" /* DatePipe */]])
    ], InboxPage);
    return InboxPage;
}());

//# sourceMappingURL=inbox.js.map

/***/ }),

/***/ 546:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScannerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_viewcage_viewcage__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_message_message__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_activitylogs_activitylogs__ = __webpack_require__(18);
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
 * Generated class for the ScannerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ScannerPage = /** @class */ (function () {
    function ScannerPage(logs, message, navCtrl, navParams, storage, loading, http, barcodeScanner) {
        this.logs = logs;
        this.message = message;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.loading = loading;
        this.http = http;
        this.barcodeScanner = barcodeScanner;
        //this.barcodeValue='C111-1160';
    }
    ScannerPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.status = false;
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.barcodeUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetExtendedFieldValuesByBarcode/';
        });
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
        });
    };
    ScannerPage.prototype.startScanner = function () {
        var _this = this;
        this.status = false;
        this.barcodeScanner.scan().then(function (barcodeData) {
            var barcodeCapture = JSON.stringify(barcodeData);
            var barcodeJsonOutput = JSON.parse(barcodeCapture);
            if (barcodeJsonOutput.text == null || barcodeJsonOutput.text == "") {
            }
            else {
                _this.barcodeValue = barcodeJsonOutput.text;
                _this.sendBarcodeRequest(barcodeJsonOutput.text);
            }
        }).catch(function (err) {
        });
    };
    ScannerPage.prototype.sendBarcodeRequest = function (barcodeP) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Loading . . . "
        });
        loader.present();
        this.http.get(this.barcodeUrl + barcodeP + ',' + this.userJson.UserId)
            .subscribe(function (data) {
            _this.formattedJson(data);
            /* Modified by Abey Abraham */
            if (barcodeP.toLowerCase().includes('instid')) {
                _this.status = true;
            }
            else {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_viewcage_viewcage__["a" /* ViewcagePage */], { bdata: _this.barcodeValue });
            }
            loader.dismiss();
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            _this.status = false;
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            _this.message.showMessage('Message', 'Barcode Not Found');
            //  this.barcode=resErr;
            if (resErrJSON.status == 400) {
            }
        });
    };
    ScannerPage.prototype.formattedJson = function (data) {
        var formattedJson = [];
        for (var i = 0; i < data.length; i++) {
            this.fieldValue = String(data[i].FieldValue).split('-');
            this.FieldValue = this.fieldValue[0];
            formattedJson.push({ 'FieldValue': this.FieldValue, 'FieldName': data[i].FieldName });
        }
        var jsonOutput = JSON.stringify(formattedJson);
        this.barcodeSplittedJson = JSON.parse(jsonOutput);
    };
    ScannerPage.prototype.test = function () {
        //this.navCtrl.push(ViewcagePage,{bdata: this.barcodeValue});
        this.sendBarcodeRequest(this.barcodeValue);
    };
    ScannerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-scanner',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\scanner\scanner.html"*/'<!--\n\n  Generated template for the ScannerPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar hideBackButton>\n\n\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n\n\n    <ion-title>Scanner</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  &nbsp;\n\n \n\n  <button ion-button full (click)=\'startScanner()\'>Scan</button>\n\n\n\n  <div *ngIf=\'status\'>\n\n  <ion-card >\n\n    <ion-card-content *ngFor="let barcode of barcodeSplittedJson">\n\n    <b>{{barcode.FieldName}} &nbsp; &nbsp; &nbsp; {{barcode.FieldValue}}</b>\n\n     </ion-card-content>\n\n   </ion-card>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\scanner\scanner.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__providers_activitylogs_activitylogs__["a" /* ActivitylogsProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_message_message__["a" /* MessageProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__["a" /* BarcodeScanner */]])
    ], ScannerPage);
    return ScannerPage;
}());

//# sourceMappingURL=scanner.js.map

/***/ }),

/***/ 547:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllchatsPage; });
/* unused harmony export snapshotToArray */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Firebase__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_Firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_fire_database__ = __webpack_require__(478);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(7);
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







/**
* Generated class for the AllchatsPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
var AllchatsPage = /** @class */ (function () {
    function AllchatsPage(loading, http, navCtrl, navParams, storage, firebase) {
        this.loading = loading;
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.firebase = firebase;
        this.uniqueId1 = [];
        this.uniqueId2 = [];
        //messagelast: any;
        /*
        
        
          async unreadMessageCount(news,i ,pin, id1, id2, type, adminId, userId) {
            this.getMessages(news,i ,pin, id1, id2, type, adminId, userId);
        
        
            
        console.log("unreadcount");
            let user = this.curr_user_Json.UserId
            let countlocal = 0;
            let counteach=0;
            let unread;
            this.firebase.list(pin + `/chatrooms/` + type + `/` + id1 + `/` + id2 + `/` + adminId + `/` + userId + `/chats`).snapshotChanges().subscribe
            //let dbCon = await firebase.database().ref(pin + `/chatrooms/` + type + `/` + id1 + `/` + id2 + `/` + adminId + `/` + userId + `/chats`);
        
           // await dbCon.on("value", async function (snapshot)
            
           (async snapshot=>
            {
        
              snapshot.forEach(function (child) {
              counteach ++;
              console.log("child count",counteach);
                unread=child.payload.val();
         
                console.log("child and unread ", child.payload.val(),unread);
               if (unread.user != user && unread.status == "unread") {
                 console.log ( "condition ",unread.user,user,unread.status,"unread");
                 countlocal++;
        
                 console.log("count local innner", countlocal);
               
                 //this.adminListJson1[i]['unReadMessage']=countlocal;
               }
               console.log("count local outer 1 ", countlocal);
             // news[i][`messageCount`] = countlocal;
               //console.log("c local",countlocal);
               // this.test(this.adminListJson1,i,countlocal);
             });
             console.log("count local outer 2 ", countlocal);
            })
            console.log("clocal",countlocal);
            console.log("news",news[i],news)
        //news[i][`messageCount`] = countlocal;
            //console.log("unread count ", countlocal);
            //return countlocal
        
            
          }
        */
        this.messages = [];
    }
    AllchatsPage.prototype.ionViewDidEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.userchatList = [];
                        return [4 /*yield*/, this.storage.get('roleType').then(function (val) {
                                _this.roletype = val;
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.storage.get('appLink').then(function (val) {
                                _this.appUrl = val;
                                _this.getUserDetails = _this.appUrl + '/WS/IdeaElanService.svc/GetAdminByEntity';
                            })];
                    case 2:
                        _a.sent();
                        this.storage.get('pin').then(function (val) {
                            _this.pin = val;
                        });
                        return [4 /*yield*/, this.storage.get('userDetails').then(function (val1) {
                                _this.curr_user_Json = val1;
                                if (_this.roletype == "user" || _this.roletype == "labAdmin") {
                                    _this.forUser();
                                }
                                else if (_this.roletype == "super" || _this.roletype == "providerAdmin" || _this.roletype == " admin") {
                                    _this.forAdminTest();
                                }
                            })];
                    case 3:
                        _a.sent();
                        console.log('ionViewDidLoad AllchatsPage');
                        return [2 /*return*/];
                }
            });
        });
    };
    AllchatsPage.prototype.generalChatPage = function () {
        this.navCtrl.push('GeneralChatPage');
    };
    AllchatsPage.prototype.forAdmin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnArr, news, userList, user, usersRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnArr = [];
                        news = [];
                        user = this.curr_user_Json.UserId;
                        console.log("uid", this.curr_user_Json.UserId);
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_2_Firebase__["database"]().ref(this.pin + "/chatrooms/")];
                    case 1:
                        usersRef = _a.sent();
                        usersRef.orderByValue().once("value", function (parentsnapshot) {
                            //console.log(snapshot.val());
                            parentsnapshot.forEach(function (snapshot) {
                                snapshot.forEach(function (data) {
                                    console.log("l2", data.key);
                                    data.forEach(function (datanew) {
                                        console.log("l1", datanew.key);
                                        datanew.forEach(function (admin) {
                                            console.log("pid " + datanew.key + " ");
                                            admin.forEach(function (datanewnew) {
                                                console.log("pid " + admin.key + " " + user);
                                                if (admin.key == "" + user) {
                                                    datanewnew.forEach(function (snap) {
                                                        // if(snap.key!="adminid" )
                                                        //{
                                                        console.log("snap " + snap.key);
                                                        if (snap.key == "chats")
                                                            returnArr.push(snap.ref.toString());
                                                        // }
                                                    });
                                                }
                                            });
                                        });
                                    });
                                });
                            });
                            // console
                            console.log("final", returnArr);
                            var arrVal = returnArr.map(function (item) {
                                var splitVal = item.split('/');
                                news.push({ "pin": "" + splitVal[3], "chatrooms": 'chatrooms', "type": "" + splitVal[5], "id1": "" + splitVal[6], "id2": "" + splitVal[7], "adminid": "" + splitVal[8], "userid": "" + splitVal[9] });
                                console.log(splitVal, "Splitvalnew");
                                console.log("news", news);
                            });
                            var resSTR = JSON.stringify(news);
                            var resJSON = JSON.parse(resSTR);
                            userList = resJSON;
                            console.log("news", resJSON);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    AllchatsPage.prototype.forAdminTest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loader, returnArr, news, userList, user, usersRef;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loader = this.loading.create({
                            spinner: "crescent",
                            content: "Loading . . . "
                        });
                        loader.present();
                        returnArr = [];
                        news = [];
                        console.log("uid", this.curr_user_Json.UserId);
                        user = this.curr_user_Json.UserId;
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_2_Firebase__["database"]().ref(this.pin + "/chatrooms/")];
                    case 1:
                        usersRef = _a.sent();
                        usersRef.orderByValue().once("value", function (parentsnapshot) {
                            parentsnapshot.forEach(function (snapshot) {
                                snapshot.forEach(function (data) {
                                    console.log("l2", data.key);
                                    data.forEach(function (datanew) {
                                        console.log("l1", datanew.key);
                                        datanew.forEach(function (admin) {
                                            console.log("pid " + datanew.key + " ");
                                            admin.forEach(function (datanewnew) {
                                                console.log("pid " + admin.key + " " + user);
                                                if (admin.key == "" + user) {
                                                    datanewnew.forEach(function (snap) {
                                                        // if(snap.key!="adminid" )
                                                        //{
                                                        console.log("snap " + snap.key);
                                                        if (snap.key == "chats")
                                                            returnArr.push(snap.ref.toString());
                                                        // }
                                                    });
                                                }
                                            });
                                        });
                                    });
                                });
                            });
                            // console
                            console.log("final", returnArr);
                            var arrVal = returnArr.map(function (item) {
                                var splitVal = item.split('/');
                                news.push({ "pin": "" + splitVal[3], "chatrooms": 'chatrooms', "type": "" + splitVal[5], "id1": "" + splitVal[6], "id2": "" + splitVal[7], "adminid": "" + splitVal[8], "userid": "" + splitVal[9] });
                                console.log(splitVal, "Splitvalnew");
                                console.log("news", news);
                            });
                            var resSTR = JSON.stringify(news);
                            var resJSON = JSON.parse(resSTR);
                            userList = resJSON;
                            console.log("news", resJSON);
                        }).then(function (val) { return __awaiter(_this, void 0, void 0, function () {
                            var i;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.userchatList = userList;
                                        this.duplicatesearchlist = this.userchatList;
                                        if (!(userList != null)) return [3 /*break*/, 5];
                                        i = 0;
                                        _a.label = 1;
                                    case 1:
                                        if (!(i < userList.length)) return [3 /*break*/, 4];
                                        console.log("i", i);
                                        // console.log("must check ",userList[i].pin);
                                        return [4 /*yield*/, this.lastMessage(news, i, userList[i].pin, userList[i].id1, userList[i].id2, userList[i].type, userList[i].adminid, userList[i].userid)
                                            //console.log("message", message)
                                            // news.push( {message})
                                            //  news[i][`message`] = message;
                                        ];
                                    case 2:
                                        // console.log("must check ",userList[i].pin);
                                        _a.sent();
                                        //console.log("message", message)
                                        // news.push( {message})
                                        //  news[i][`message`] = message;
                                        console.log(news[i]);
                                        _a.label = 3;
                                    case 3:
                                        i += 1;
                                        return [3 /*break*/, 1];
                                    case 4:
                                        this.userchatList = news;
                                        this.duplicatesearchlist = this.userchatList;
                                        _a.label = 5;
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); }).then(function (val) { return __awaiter(_this, void 0, void 0, function () {
                            var i;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.userchatList = userList;
                                        this.duplicatesearchlist = this.userchatList;
                                        if (!(userList != null)) return [3 /*break*/, 5];
                                        i = 0;
                                        _a.label = 1;
                                    case 1:
                                        if (!(i < userList.length)) return [3 /*break*/, 4];
                                        console.log("i", i);
                                        // console.log("must check ",userList[i].pin);
                                        return [4 /*yield*/, this.unreadMessageCount(news, i, userList[i].pin, userList[i].id1, userList[i].id2, userList[i].type, userList[i].adminid, userList[i].userid)
                                            //  console.log("message count", messagecount)
                                            // news.push( {message})
                                            //news[i][`messageCount`] = messagecount;
                                            //console.log(news[i])
                                        ];
                                    case 2:
                                        // console.log("must check ",userList[i].pin);
                                        _a.sent();
                                        _a.label = 3;
                                    case 3:
                                        i += 1;
                                        return [3 /*break*/, 1];
                                    case 4:
                                        this.userchatList = news;
                                        this.duplicatesearchlist = this.userchatList;
                                        _a.label = 5;
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); }).then(function (val) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(userList != null)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.loadUserDetails(userList, 5)];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2:
                                        loader.dismiss();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    AllchatsPage.prototype.forUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loader, returnArr, news, userList, user, usersRef;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loader = this.loading.create({
                            spinner: "crescent",
                            content: "Loading . . . "
                        });
                        loader.present();
                        returnArr = [];
                        news = [];
                        console.log("uid", this.curr_user_Json.UserId);
                        user = this.curr_user_Json.UserId;
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_2_Firebase__["database"]().ref("54345/chatrooms/")];
                    case 1:
                        usersRef = _a.sent();
                        usersRef.orderByChild('adminid').once("value", function (parentsnapshot) {
                            //console.log(snapshot.val());
                            //usersRef.orderByKey().once("value", function (parentsnapshot) {
                            parentsnapshot.forEach(function (snapshot) {
                                console.log('snapshot', snapshot);
                                snapshot.forEach(function (data) {
                                    console.log("yo ", data);
                                    data.forEach(function (datanew) {
                                        console.log("yo yo ", datanew);
                                        datanew.forEach(function (datanewnew) {
                                            console.log("yo yo ", datanewnew);
                                            datanewnew.forEach(function (snap) {
                                                // if(snap.key!="adminid" )
                                                //{
                                                console.log(" final " + snap.key);
                                                if (snap.key == "" + user) {
                                                    console.log("test url", snap.ref.toString());
                                                    console.log(snap.key);
                                                    if (snap.key != "DeviceToken")
                                                        if (snap.key != "EmailAddress")
                                                            if (snap.key != "UserImage")
                                                                if (snap.key != "adminid")
                                                                    returnArr.push(snap.ref.toString());
                                                }
                                                // }
                                            });
                                        });
                                    });
                                });
                            });
                            // console
                            console.log("final", returnArr);
                            var arrVal = returnArr.map(function (item) {
                                var splitVal = item.split('/');
                                news.push({ "pin": "" + splitVal[3], "chatrooms": 'chatrooms', "type": "" + splitVal[5], "id1": "" + splitVal[6], "id2": "" + splitVal[7], "adminid": "" + splitVal[8], "userid": "" + splitVal[9] });
                                console.log(splitVal, "Splitvalnew");
                                console.log("news", news);
                            });
                            var resSTR = JSON.stringify(news);
                            var resJSON = JSON.parse(resSTR);
                            userList = resJSON;
                            console.log("news", resJSON);
                            //this.userchatList = news
                            // console.log(this.userchatList, "Splitvalold")
                        }).then(function (val) { return __awaiter(_this, void 0, void 0, function () {
                            var i;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.userchatList = userList;
                                        this.duplicatesearchlist = this.userchatList;
                                        if (!(userList != null)) return [3 /*break*/, 5];
                                        i = 0;
                                        _a.label = 1;
                                    case 1:
                                        if (!(i < userList.length)) return [3 /*break*/, 4];
                                        console.log("i", i);
                                        // console.log("must check ",userList[i].pin);
                                        return [4 /*yield*/, this.lastMessage(news, i, userList[i].pin, userList[i].id1, userList[i].id2, userList[i].type, userList[i].adminid, userList[i].userid)
                                            // console.log("message", message)
                                            // news.push( {message})
                                            // news[i][`message`] = message;
                                        ];
                                    case 2:
                                        // console.log("must check ",userList[i].pin);
                                        _a.sent();
                                        // console.log("message", message)
                                        // news.push( {message})
                                        // news[i][`message`] = message;
                                        console.log(news[i]);
                                        _a.label = 3;
                                    case 3:
                                        i += 1;
                                        return [3 /*break*/, 1];
                                    case 4:
                                        this.userchatList = news;
                                        this.duplicatesearchlist = this.userchatList;
                                        _a.label = 5;
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); }).then(function (val) { return __awaiter(_this, void 0, void 0, function () {
                            var i;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.userchatList = userList;
                                        this.duplicatesearchlist = this.userchatList;
                                        if (!(userList != null)) return [3 /*break*/, 5];
                                        i = 0;
                                        _a.label = 1;
                                    case 1:
                                        if (!(i < userList.length)) return [3 /*break*/, 4];
                                        console.log("i", i);
                                        // console.log("must check ",userList[i].pin);
                                        //let messagecount = await this.unreadMessageCount(userList[i].pin, userList[i].id1, userList[i].id2, userList[i].type, userList[i].adminid, userList[i].userid)
                                        // console.log("message count", messagecount)
                                        // news.push( {message})
                                        // news[i][`messageCount`] = messagecount;
                                        //console.log(news[i])
                                        console.log("before  unread count");
                                        return [4 /*yield*/, this.unreadMessageCount(news, i, userList[i].pin, userList[i].id1, userList[i].id2, userList[i].type, userList[i].adminid, userList[i].userid)];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3:
                                        i += 1;
                                        return [3 /*break*/, 1];
                                    case 4:
                                        this.userchatList = news;
                                        this.duplicatesearchlist = this.userchatList;
                                        _a.label = 5;
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); }).then(function (val) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(userList != null)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.loadUserDetails(userList, 5)];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2:
                                        loader.dismiss();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    AllchatsPage.prototype.loadUserDetails = function (instid, num) {
        return __awaiter(this, void 0, void 0, function () {
            var userIdToPaSS, _loop_1, this_1, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _loop_1 = function (i) {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (this_1.roletype == "user" || this_1.roletype == "labAdmin") {
                                            userIdToPaSS = instid[i].adminid;
                                        }
                                        else if (this_1.roletype == "super" || this_1.roletype == "providerAdmin" || this_1.roletype == " admin") {
                                            userIdToPaSS = instid[i].userid;
                                        }
                                        return [4 /*yield*/, this_1.http.get(this_1.getUserDetails + ("/" + userIdToPaSS + "," + num + "," + this_1.curr_user_Json.UserId + "," + this_1.curr_user_Json.UserToken))
                                                .subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
                                                var resSTR, resJSON;
                                                return __generator(this, function (_a) {
                                                    resSTR = JSON.stringify(data);
                                                    resJSON = JSON.parse(resSTR);
                                                    console.log("user id details ", resJSON);
                                                    this.userChatJson = resJSON;
                                                    //this.userChatJson=this.userChatJson;
                                                    this.senderName = this.userChatJson[0].LastName + " " + this.userChatJson[0].FirstName;
                                                    this.UserImage = "" + this.userChatJson[0].UserImage;
                                                    console.log("sendername ", this.senderName);
                                                    this.userchatList[i]["senderName"] = this.senderName;
                                                    this.userchatList[i]["UserImage"] = this.UserImage;
                                                    console.log("after sender name", this.userchatList[i]);
                                                    return [2 /*return*/];
                                                });
                                            }); }, //ERROR HANDLING
                                            function (//ERROR HANDLING
                                            error) {
                                                var resErr = JSON.stringify(error);
                                                // this.suppliesValue = false;
                                            })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < instid.length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(i)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i += 1;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllchatsPage.prototype.fetchChatdetail = function (Chat) {
        console.log(Chat);
    };
    AllchatsPage.prototype.unreadMessageCount = function (news, j, pin, id1, id2, type, adminId, userId) {
        var _this = this;
        var user = this.curr_user_Json.UserId;
        console.log(pin + "/chatrooms/" + type + "/" + id1 + "/" + id2 + "/" + adminId + "/" + userId + "/chats");
        this.firebase.list(pin + "/chatrooms/" + type + "/" + id1 + "/" + id2 + "/" + adminId + "/" + userId + "/chats").snapshotChanges().subscribe(function (snap) {
            _this.messages = snap.map(function (item) {
                return __assign({ $key: item.key }, item.payload.val());
            });
            _this.messageCount = 0;
            for (var i = 0; i < _this.messages.length; i++) {
                if ((_this.messages[i]['status'] == 'unread') && (_this.messages[i]['user'] != user)) {
                    console.log("test", _this.messages[i]['status'], "read", _this.messages[i]['user'], user);
                    _this.messageCount++;
                }
            }
            console.log(_this.messages.length);
            console.log("actual messagecount ", _this.messageCount);
            news[j]["messageCount"] = _this.messageCount;
        });
    };
    AllchatsPage.prototype.lastMessage = function (news, i, pin, id1, id2, type, adminId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var lastmsg, count;
            var _this = this;
            return __generator(this, function (_a) {
                this.firebase.list(pin + "/chatrooms/" + type + "/" + id1 + "/" + id2 + "/" + adminId + "/" + userId + "/chats").snapshotChanges().subscribe(function (snap) {
                    _this.messages = snap.map(function (item) {
                        return __assign({ $key: item.key }, item.payload.val());
                    });
                    count = _this.messages.length;
                    console.log("count ", count, _this.messages[_this.messages.length - 1]["message"]);
                    if (_this.messages[_this.messages.length - 1]["type"] == "message") {
                        news[i]["message"] = _this.messages[_this.messages.length - 1]["message"];
                    }
                    else if (_this.messages[_this.messages.length - 1]["type"] == "image")
                        news[i]["message"] = "Image";
                    //return this.messages[this.messages.length-1]["message"];
                });
                return [2 /*return*/];
            });
        });
    };
    AllchatsPage.prototype.fetchChatdetails = function (chatlist) {
        // console.log(chatlist)
        console.log("role", this.roletype);
        if (chatlist.type == "TechnicalIssues") {
            if (this.roletype == "super" || this.roletype == "providerAdmin" || this.roletype == " admin") {
                this.navCtrl.push('ChatContentPage', { "role": "" + this.roletype, "userid": "" + chatlist.userid, "adminid": "" + this.curr_user_Json.UserId, "instrumentid": "" + chatlist.id2, "ticketid": "" + chatlist.id1, "senderName": chatlist.senderName + " ", "pin": "" + this.pin, "source": "Technical Issues", "chatType": "TechnicalIssues" });
            }
            else {
                this.navCtrl.push('ChatContentPage', { "id": "user", "role": "" + this.roletype, "userid": "" + this.curr_user_Json.UserId, "adminid": "" + chatlist.adminid, "instrumentid": "" + chatlist.id2, "ticketid": "" + chatlist.id1, "senderName": chatlist.senderName + " ", "pin": "" + this.pin, "source": "Technical Issues", "chatType": "TechnicalIssues" });
            }
        }
        else if (chatlist.type == "SampleSubmission") {
            if (this.roletype == "super" || this.roletype == "providerAdmin" || this.roletype == " admin") {
                this.navCtrl.push('ChatContentPage', { "role": "" + this.roletype, "userid": "" + chatlist.userid, "adminid": "" + this.curr_user_Json.UserId, "ProviderId": "" + chatlist.id2, "WorkOrderId": "" + chatlist.id1, "senderName": chatlist.senderName + " ", "pin": "" + this.pin, "source": "Sample Submission", "chatType": "SampleSubmission" });
            }
            else {
                // this.navCtrl.push('ChatContentPage', {"WorkOrderId":`${this.WorkOrderId}`,"OrderId":`${this.OrderId}`,"ProviderId":`${this.ProviderId}`,"role":`${this.roletype}`,"adminid":`${adminid.UserId}`,"instrumentid":`${this.instid}`,"curuser":`${this.userJson.UserId}`,"ticketid":`${this.ticketId}`,"senderName":`${adminid.LastName} ${adminid.FirstName}`,"pin":`${this.pin}`,"source":`${this.source}`,"chatType":`${this.chatType}`,"AppointmentId":`${this.AppointmentId}`})
                this.navCtrl.push('ChatContentPage', { "role": "" + this.roletype, "userid": "" + this.curr_user_Json.UserId, "adminid": "" + chatlist.adminid, "ProviderId": "" + chatlist.id2, "WorkOrderId": "" + chatlist.id1, "senderName": chatlist.senderName + " ", "pin": "" + this.pin, "source": "Sample Submission", "chatType": "SampleSubmission" });
            }
        }
        else if (chatlist.type == "SuppliesOrder") {
            if (this.roletype == "super" || this.roletype == "providerAdmin" || this.roletype == " admin") {
                this.navCtrl.push('ChatContentPage', { "role": "" + this.roletype, "userid": "" + chatlist.userid, "adminid": "" + this.curr_user_Json.UserId, "ProviderId": "" + chatlist.id2, "OrderId": "" + chatlist.id1, "senderName": chatlist.senderName + " ", "pin": "" + this.pin, "source": "Supplies Order", "chatType": "SuppliesOrder" });
            }
            else {
                this.navCtrl.push('ChatContentPage', { "role": "" + this.roletype, "userid": "" + this.curr_user_Json.UserId, "adminid": "" + chatlist.adminid, "ProviderId": "" + chatlist.id2, "OrderId": "" + chatlist.id1, "senderName": chatlist.senderName + " ", "pin": "" + this.pin, "source": "Supplies Order", "chatType": "SuppliesOrder" });
            }
        }
        else if (chatlist.type == "Reservations") {
            if (this.roletype == "super" || this.roletype == "providerAdmin" || this.roletype == " admin") {
                this.navCtrl.push('ChatContentPage', { "role": "" + this.roletype, "userid": "" + chatlist.userid, "adminid": "" + this.curr_user_Json.UserId, "instrumentid": "" + chatlist.id2, "AppointmentId": "" + chatlist.id1, "senderName": chatlist.senderName + " ", "pin": "" + this.pin, "source": "Reservations", "chatType": "Reservations" });
            }
            else {
                this.navCtrl.push('ChatContentPage', { "role": "" + this.roletype, "userid": "" + this.curr_user_Json.UserId, "adminid": "" + chatlist.adminid, "instrumentid": "" + chatlist.id2, "AppointmentId": "" + chatlist.id1, "senderName": chatlist.senderName + " ", "pin": "" + this.pin, "source": "Reservations", "chatType": "Reservations" });
            }
        }
    };
    AllchatsPage.prototype.getItems = function (searchbar) {
        var q = this.searchText;
        var searchList = this.userchatList;
        console.log(this.userchatList);
        if (q == null || q == "") {
            //  this.isSearchResult = false
            this.userchatList = this.duplicatesearchlist;
            return true;
        }
        this.userchatList = this.duplicatesearchlist.filter(function (v) {
            if (v.senderName && q) {
                if (v.senderName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                    //  this.isSearchResult = false
                    return true;
                }
                else if (v.senderName.toLowerCase().indexOf(q.toLowerCase()) < -1) {
                    // this.isSearchResult = true
                    //  this.userInstrumentJson = []
                }
                return false;
            }
            //   ()
        });
    };
    var _a, _b, _c, _d, _e, _f;
    AllchatsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-allchats',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\allchats\allchats.html"*/'<!--\n\nGenerated template for the AllchatPage page.\n\n\n\nSee http://ionicframework.com/docs/components/#navigation for more info on\n\nIonic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar hideBackButton>\n\n\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n\n\n    <ion-title> All Chats </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n<ion-searchbar animated showCancelButton="always" (ionInput)="getItems()" [(ngModel)]="searchText"> <ion-icon name="options"></ion-icon></ion-searchbar>\n\n<!-- *ngFor="let adminlist of adminListJson1; let i = index;" -->\n\n\n\n<!-- *ngFor="let userlist of users; let i = index;"-->\n\n<ion-list >\n\n<ion-card-content >\n\n<!-- *ngIf=\'!testtrue\' -->\n\n<ion-item *ngFor="let chatList of userchatList" (click)="fetchChatdetails(chatList)">\n\n<ion-avatar item-start>\n\n <img src="{{chatList.UserImage}}">\n\n\n\n</ion-avatar>\n\n<h2>{{chatList.senderName}}</h2>\n\n<!-- *ngIf="userlist.unReadMessage > 0" color="primary" style="float:right" -->\n\n<h3>{{chatList.message}}<ion-badge *ngIf="chatList.messageCount > 0" color="primary" style="float:right">{{chatList.messageCount}}</ion-badge></h3>\n\n</ion-item>\n\n\n\n</ion-card-content>\n\n</ion-list>\n\n\n\n\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\allchats\allchats.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]) === "function" ? _c : Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]) === "function" ? _d : Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]) === "function" ? _e : Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__angular_fire_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_fire_database__["a" /* AngularFireDatabase */]) === "function" ? _f : Object])
    ], AllchatsPage);
    return AllchatsPage;
}());

var snapshotToArray = function (snapshot) {
    var returnArr = [];
    snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        // item.key = childSnapshot.key;
        if (item.type == "image") {
            item.message = 'Image';
        }
        console.log("item", item);
        // console.log("key",item.key());
        returnArr.push(item);
    });
    return returnArr;
};
//# sourceMappingURL=allchats.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dashboard_dashboard__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__p_iinbox_p_iinbox__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lab_dashboard_lab_dashboard__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__allsupplies_allsupplies__ = __webpack_require__(536);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__allreservation_allreservation__ = __webpack_require__(537);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__notification_notification__ = __webpack_require__(538);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__signin_signin__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__samplesubmission_samplesubmission__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__navi_navi__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__activitydashboard_activitydashboard__ = __webpack_require__(535);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__facilities_facilities__ = __webpack_require__(543);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__labs_labs__ = __webpack_require__(544);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__inbox_inbox__ = __webpack_require__(545);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__scanner_scanner__ = __webpack_require__(546);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__supplies_supplies__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__message_message__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__allchats_allchats__ = __webpack_require__(547);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_activitylogs_activitylogs__ = __webpack_require__(18);
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
 *
 */






















var MenuPage = /** @class */ (function () {
    function MenuPage(logs, navCtrl, navParams, storage, alertCtrl) {
        this.logs = logs;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.isInboxTrue = false;
    }
    MenuPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.page = this.navParams.get('page');
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
        });
        this.storage.get('FToken').then(function (val) {
            _this.IsFtoken = val;
        });
        /*
        this.storage.get('userLogout').then((val) => {
          this.userLogout = val;
        });
    
        */
        this.storage.get('roleType').then(function (role) {
            _this.roleType = role;
            if (_this.page == undefined || _this.page == "" || _this.page == null) {
                if (_this.roleType == "user") {
                    _this.pageType = "NaviPage";
                }
                else if (_this.roleType == "super") {
                    _this.pageType = "ActivitydashboardPage";
                }
                else if (_this.roleType == "admin") {
                    _this.pageType = "ActivitydashboardPage";
                }
                else if (_this.roleType == 'labAdmin') {
                    _this.pageType = "NaviPage";
                }
                else if (_this.roleType == 'providerAdmin') {
                    _this.pageType = "ActivitydashboardPage";
                }
            }
            else if (_this.page === "NaviPage") {
                _this.pageType = "NaviPage";
            }
            else if (_this.page === "AllSupplies") {
                _this.pageType = "AllsuppliesPage";
            }
        });
        //Index modified according to the page - Anto Rupak
        this.storage.get('roleType').then(function (val) {
            if (_this.roleType == null) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__signin_signin__["a" /* SigninPage */]).then(function () {
                    var startIndex = _this.navCtrl.getActive().index - 1;
                    _this.navCtrl.remove(startIndex, 1);
                });
            }
            _this.storage.get('userDetails').then(function (val1) {
                _this.userJson = val1;
            });
            _this.roleType = val;
            console.log("userdetails", _this.userJson);
            console.log("roletype", _this.roleType);
            //Modification of the pages -Sumit Rajpal 
            if (_this.roleType === "user") {
                _this.rootPage = _this.pageType;
                _this.pages = [{ title: 'Instruments', pageName: 'NaviPage', icon: 'assets/icon/facilities-wt.png', index: 0 },
                    { title: 'Facilities', pageName: 'FacilitiesPage', icon: 'assets/icon/Instruments-wt.png', index: 2 },
                    { title: 'Labs', pageName: 'LabsPage', icon: 'assets/icon/lab-wt.png', index: 3 },
                    { title: 'Chats', pageName: 'AllchatsPage', icon: 'assets/icon/notification.png', index: 16 },
                    { title: 'Supplies', pageName: 'SuppliesPage', icon: 'assets/icon/sample-sub-req.png', index: 13 },
                    { title: 'Sample Submission', pageName: 'SamplesubmissionPage', icon: 'assets/icon/sample-sub-req.png', index: 12 },
                    { title: 'My Reservations', pageName: 'AllreservationPage', icon: 'assets/icon/my-reserv-wt.png', index: 7 },
                    { title: 'My Supplies', pageName: 'AllsuppliesPage', icon: 'assets/icon/my-reserv-wt.png', index: 14 },
                    { title: 'My Dashboard', pageName: 'DashboardPage', icon: 'assets/icon/my-dashboard.png', index: 5 },
                    //   { title: 'Notification', pageName: 'NotificationPage', icon: 'assets/icon/notification.png', index: 10 },
                    { title: 'Scanner', pageName: 'ScannerPage', icon: 'assets/icon/scan.png', index: 6 },
                ];
            }
            else if (_this.roleType === "super") {
                _this.rootPage = _this.pageType;
                _this.pages = [
                    { title: 'Activity Dashboard', pageName: 'ActivitydashboardPage', icon: 'assets/icon/activitty-dashboard.png', index: 1 },
                    { title: 'Instruments', pageName: 'NaviPage', icon: 'assets/icon/Instruments-wt.png', index: 0 },
                    { title: 'Facilities', pageName: 'FacilitiesPage', icon: 'assets/icon/facilities-wt.png', index: 2 },
                    { title: 'Labs', pageName: 'LabsPage', icon: 'assets/icon/lab-wt.png', index: 3 },
                    { title: 'Chats', pageName: 'AllchatsPage', icon: 'assets/icon/notification.png', index: 16 },
                    { title: 'Inbox', pageName: 'InboxPage', icon: 'assets/icon/access-request-wt.png', index: 4 },
                    { title: 'All Reservations', pageName: 'AllreservationPage', icon: 'assets/icon/my-reserv-wt.png', index: 7 },
                    { title: 'My Supplies', pageName: 'AllsuppliesPage', icon: 'assets/icon/my-reserv-wt.png', index: 14 },
                    { title: 'Facility Dashboard', pageName: 'DashboardPage', icon: 'assets/icon/facility-dashboard.png', index: 5 },
                    //  { title: 'Lab Dashboard', pageName: 'LabDashboardPage', icon: 'assets/icon/dashboard-wt.png', index: 9 },
                    { title: 'Scanner', pageName: 'ScannerPage', icon: 'assets/icon/scan.png', index: 6 },
                ];
            }
            else if (_this.roleType === "admin") {
                _this.rootPage = _this.pageType;
                _this.pages = [
                    { title: 'Activity Dashboard', pageName: 'ActivitydashboardPage', icon: 'assets/icon/activitty-dashboard.png', index: 1 },
                    { title: 'Instruments', pageName: 'NaviPage', icon: 'assets/icon/Instruments-wt.png', index: 0 },
                    { title: 'Facilities', pageName: 'FacilitiesPage', icon: 'assets/icon/facilities-wt.png', index: 2 },
                    { title: 'Labs', pageName: 'LabsPage', icon: 'assets/icon/lab-wt.png', index: 3 },
                    { title: 'Chats', pageName: 'AllchatsPage', icon: 'assets/icon/notification.png', index: 16 },
                    { title: 'Inbox', pageName: 'InboxPage', icon: 'assets/icon/access-request-wt.png', index: 4 },
                    { title: 'All Reservations', pageName: 'AllreservationPage', icon: 'assets/icon/my-reserv-wt.png', index: 7 },
                    { title: 'Supplies', pageName: 'SuppliesPage', icon: 'assets/icon/sample-sub-req.png', index: 13 },
                    { title: 'My Supplies', pageName: 'AllsuppliesPage', icon: 'assets/icon/my-reserv-wt.png', index: 14 },
                    { title: 'Facility Dashboard', pageName: 'DashboardPage', icon: 'assets/icon/facility-dashboard.png', index: 5 },
                    // { title: 'Notification', pageName: 'NotificationPage', icon: 'assets/icon/notification.png', index: 10 },
                    { title: 'Scanner', pageName: 'ScannerPage', icon: 'assets/icon/scan.png', index: 6 },
                ];
            }
            else if (_this.roleType === "labAdmin") {
                _this.rootPage = _this.pageType;
                _this.pages = [
                    //  { title: 'Activity Dashboard', pageName: 'ActivitydashboardPage', icon: 'assets/icon/activitty-dashboard.png', index: 1 },
                    { title: 'Instruments', pageName: 'NaviPage', icon: 'assets/icon/Instruments-wt.png', index: 0 },
                    { title: 'Facilities', pageName: 'FacilitiesPage', icon: 'assets/icon/facilities-wt.png', index: 2 },
                    { title: 'Labs', pageName: 'LabsPage', icon: 'assets/icon/lab-wt.png', index: 3 },
                    { title: 'Chats', pageName: 'AllchatsPage', icon: 'assets/icon/notification.png', index: 16 },
                    { title: 'Supplies', pageName: 'SuppliesPage', icon: 'assets/icon/sample-sub-req.png', index: 13 },
                    { title: 'Sample Submission', pageName: 'SamplesubmissionPage', icon: 'assets/icon/sample-sub-req.png', index: 12 },
                    //  { title: 'Inbox', pageName: 'InboxPage', icon: 'assets/icon/access-request-wt.png', index: 4 },
                    { title: 'PI Inbox', pageName: 'PIinboxPage', icon: 'assets/icon/access-request-wt.png', index: 8 },
                    { title: 'Lab Dashboard', pageName: 'LabDashboardPage', icon: 'assets/icon/dashboard-wt.png', index: 9 },
                    { title: 'My Reservations', pageName: 'AllreservationPage', icon: 'assets/icon/my-reserv-wt.png', index: 7 },
                    { title: 'My Supplies', pageName: 'AllsuppliesPage', icon: 'assets/icon/my-reserv-wt.png', index: 14 },
                    { title: 'My Dashboard', pageName: 'DashboardPage', icon: 'assets/icon/my-dashboard.png', index: 5 },
                    //  { title: 'Facility Dashboard', pageName: 'DashboardPage', icon: 'assets/icon/facility-dashboard.png', index: 5 },
                    //  { title: 'Notification', pageName: 'NotificationPage', icon: 'assets/icon/notification.png', index: 10 },
                    { title: 'Scanner', pageName: 'ScannerPage', icon: 'assets/icon/scan.png', index: 6 },
                ];
            }
            else if (_this.roleType === "providerAdmin") {
                _this.rootPage = _this.pageType;
                _this.pages = [
                    { title: 'Activity Dashboard', pageName: 'ActivitydashboardPage', icon: 'assets/icon/activitty-dashboard.png', index: 1 },
                    { title: 'Instruments', pageName: 'NaviPage', icon: 'assets/icon/Instruments-wt.png', index: 0 },
                    { title: 'Facilities', pageName: 'FacilitiesPage', icon: 'assets/icon/facilities-wt.png', index: 2 },
                    { title: 'Labs', pageName: 'LabsPage', icon: 'assets/icon/lab-wt.png', index: 3 },
                    { title: 'Chats', pageName: 'AllchatsPage', icon: 'assets/icon/notification.png', index: 16 },
                    { title: 'Supplies', pageName: 'SuppliesPage', icon: 'assets/icon/sample-sub-req.png', index: 13 },
                    { title: 'Inbox', pageName: 'InboxPage', icon: 'assets/icon/access-request-wt.png', index: 4 },
                    { title: 'All Reservations', pageName: 'AllreservationPage', icon: 'assets/icon/my-reserv-wt.png', index: 7 },
                    { title: 'My Supplies', pageName: 'AllsuppliesPage', icon: 'assets/icon/my-reserv-wt.png', index: 14 },
                    { title: 'Facility Dashboard', pageName: 'DashboardPage', icon: 'assets/icon/facility-dashboard.png', index: 5 },
                    //    { title: 'PI Inbox', pageName: 'PIinboxPage', icon: 'assets/icon/access-request-wt.png', index: 8 },
                    //    { title: 'My Dashboard', pageName: 'DashboardPage', icon: 'assets/icon/my-dashboard.png', index: 5 },
                    //    { title: 'Sample Submission', pageName: 'SamplesubmissionPage', icon: 'assets/icon/my-dashboard.png', index: 12 },
                    //    { title: 'Lab Dashboard', pageName: 'LabDashboardPage', icon: 'assets/icon/dashboard-wt.png', index: 9 },
                    //    { title: 'Notification', pageName: 'NotificationPage', icon: 'assets/icon/notification.png', index: 10 },
                    { title: 'Scanner', pageName: 'ScannerPage', icon: 'assets/icon/scan.png', index: 6 },
                ];
            }
        });
    };
    MenuPage.prototype.ngOnInit = function () {
    };
    MenuPage.prototype.onViewDidEnter = function () {
        var _this = this;
        this.storage.get('userDetails').then(function (val1) {
            _this.userJson = val1;
        });
        console.log("userdetails", this.userJson);
    };
    // Modified by Anto Rupak & Sumit Rajpal
    MenuPage.prototype.openPage = function (page) {
        var params = {};
        if (page.index) {
            params = { pageIndex: page.index };
        }
        var view = this.nav.getActive();
        //Modified by Anto Rupak & Sumit Rajpal
        switch (page.index) {
            case 0:
                {
                    if (view.instance instanceof __WEBPACK_IMPORTED_MODULE_11__navi_navi__["a" /* NaviPage */]) {
                    }
                    else {
                        this.nav.setRoot("NaviPage");
                    }
                }
                break;
            case 1:
                {
                    if (view.instance instanceof __WEBPACK_IMPORTED_MODULE_12__activitydashboard_activitydashboard__["a" /* ActivitydashboardPage */]) {
                    }
                    else {
                        this.storage.set('spinnerIndex', "0");
                        this.nav.setRoot("ActivitydashboardPage");
                    }
                }
                break;
            case 2:
                {
                    if (view.instance instanceof __WEBPACK_IMPORTED_MODULE_13__facilities_facilities__["a" /* FacilitiesPage */]) {
                    }
                    else
                        this.nav.setRoot("FacilitiesPage");
                }
                break;
            case 3:
                {
                    if (view.instance instanceof __WEBPACK_IMPORTED_MODULE_14__labs_labs__["a" /* LabsPage */]) {
                    }
                    else {
                        this.nav.setRoot("LabsPage");
                    }
                }
                break;
            case 4:
                {
                    this.isInboxTrue = true;
                    if (view.instance instanceof __WEBPACK_IMPORTED_MODULE_15__inbox_inbox__["a" /* InboxPage */]) {
                    }
                    else {
                        this.storage.set('spinnerInbox', "0");
                        this.nav.setRoot(page.pageName);
                    }
                }
                break;
            case 5:
                {
                    if (view.instance instanceof __WEBPACK_IMPORTED_MODULE_3__dashboard_dashboard__["a" /* DashboardPage */]) {
                    }
                    else {
                        this.storage.set('spinnerDashboard', "0");
                        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__dashboard_dashboard__["a" /* DashboardPage */]);
                    }
                }
                break;
            case 6:
                {
                    if (view.instance instanceof __WEBPACK_IMPORTED_MODULE_16__scanner_scanner__["a" /* ScannerPage */]) {
                    }
                    else {
                        this.nav.setRoot(page.pageName);
                    }
                }
                break;
            case 7:
                {
                    if (view.instance instanceof __WEBPACK_IMPORTED_MODULE_7__allreservation_allreservation__["a" /* AllreservationPage */]) {
                    }
                    else {
                        this.storage.set('spinnerReservation', "0");
                        this.nav.setRoot(page.pageName);
                    }
                }
                break;
            case 8:
                {
                    if (view.instance instanceof __WEBPACK_IMPORTED_MODULE_4__p_iinbox_p_iinbox__["a" /* PIinboxPage */]) {
                    }
                    else {
                        this.storage.set('spinnerPiInbox', "0");
                        this.nav.setRoot(page.pageName);
                    }
                }
                break;
            case 9:
                {
                    if (view.instance instanceof __WEBPACK_IMPORTED_MODULE_5__lab_dashboard_lab_dashboard__["a" /* LabDashboardPage */]) {
                    }
                    else {
                        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__lab_dashboard_lab_dashboard__["a" /* LabDashboardPage */]);
                    }
                }
                break;
            case 10:
                {
                    if (view.instance instanceof __WEBPACK_IMPORTED_MODULE_8__notification_notification__["a" /* NotificationPage */]) {
                    }
                    else {
                        this.nav.setRoot('NotificationPage');
                    }
                }
                break;
            case 11:
                {
                    //  this.presentConfirm();
                }
                break;
            case 12:
                {
                    if (view.instance instanceof __WEBPACK_IMPORTED_MODULE_10__samplesubmission_samplesubmission__["a" /* SamplesubmissionPage */]) {
                    }
                    else {
                        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_10__samplesubmission_samplesubmission__["a" /* SamplesubmissionPage */]);
                    }
                }
                break;
            case 13:
                {
                    if (view.instance instanceof __WEBPACK_IMPORTED_MODULE_17__supplies_supplies__["a" /* SuppliesPage */]) {
                    }
                    else {
                        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_17__supplies_supplies__["a" /* SuppliesPage */]);
                    }
                }
                break;
            case 14:
                {
                    if (view.instance instanceof __WEBPACK_IMPORTED_MODULE_6__allsupplies_allsupplies__["a" /* AllsuppliesPage */]) {
                    }
                    else {
                        this.nav.setRoot('AllsuppliesPage');
                    }
                }
                break;
            case 15:
                {
                    if (view.instance instanceof __WEBPACK_IMPORTED_MODULE_18__message_message__["a" /* MessagePage */]) {
                    }
                    else {
                        this.nav.setRoot('MessagePage');
                    }
                }
                break;
            case 16: {
                if (view.instance instanceof __WEBPACK_IMPORTED_MODULE_19__allchats_allchats__["a" /* AllchatsPage */]) {
                }
                else {
                    this.nav.setRoot('AllchatsPage');
                }
            }
        }
    };
    /*//Modified by Anto Rupak & Sumit Rajpal
    presentConfirm() {
      //Modified by Anto Rupak
      this.storage.get('InsitutionName').then((val) => {
        this.InsitutionName = val;
      });
      this.storage.get('InternalDomain').then((val) => {
        this.internalDomain = val;
      });
      this.storage.get('IsSSOEnabled').then((val) => {
        this.IsSSOEnabled = val;
      });
      this.storage.get('clientImage').then((val) => {
        this.clientDetails = val;
      });
      let alert = this.alertCtrl.create({
        title: 'Logout',
        message: 'Are you sure you want to Logout ?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
  
            }
          },
          {
            text: 'Yes',
            handler: () => {
              this.logs.insertlog("Logout", "Menu Page", "User clicked log out button   ", "User clicked log out option in the menu and clicked  yes for loging out  ", this.userJson.UserId);
              this.logoutUser();
  
            }
          }
        ]
      });
      alert.present();
    }*/
    MenuPage.prototype.isActive = function (page) {
        if (this.nav.getActive().name === page.pageName) {
            return false;
        }
    };
    //Modified by Anto Rupak
    MenuPage.prototype.logoutUser = function () {
        //this.storage.clear();
        var _this = this;
        this.storage.set('userLogout', true);
        if (this.IsFtoken == false && this.userLogout == true) {
            this.storage.clear();
        }
        this.storage.set('clientImage', this.clientDetails);
        this.storage.set('InsitutionName', this.InsitutionName);
        this.storage.set('InternalDomain', this.internalDomain);
        this.storage.set('IsSSOEnabled', this.IsSSOEnabled);
        this.storage.set('appLink', this.appUrl).then(function () {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__signin_signin__["a" /* SigninPage */]).then(function () {
                var startIndex = _this.navCtrl.getActive().index - 1;
                _this.navCtrl.remove(startIndex, 1);
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */])
    ], MenuPage.prototype, "nav", void 0);
    MenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-menu',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\menu\menu.html"*/'<ion-menu [content]="content">\n\n  <ion-header>\n\n    <ion-navbar hideBackButton menuClose>\n\n      <ion-title text-center>\n\n        Idea Elan\n\n      </ion-title>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  <ion-content>\n\n    <!--Modified by Anto Rupak-->\n\n\n\n    <ion-item tappable menuClose *ngFor="let p of pages" (tap)="openPage(p)" class="menustyle">\n\n      <ion-row class="menuDesign">\n\n        <img src="{{p.icon}}">\n\n        <span style="margin-top: 1rem;margin-left: .5em;">{{p.title}}</span>\n\n      </ion-row>\n\n    </ion-item>\n\n\n\n  </ion-content>\n\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content swipeBackEnable="true">\n\n</ion-nav>'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\menu\menu.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_20__providers_activitylogs_activitylogs__["a" /* ActivitylogsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], MenuPage);
    return MenuPage;
}());

//# sourceMappingURL=menu.js.map

/***/ }),

/***/ 550:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(664);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 63:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SigninPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__menu_menu__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_device__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__instrument_search_instrument_search__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__reset_password_reset_password__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__signup_signup__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pin_pin__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_fcm_fcm__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_forms__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_activitylogs_activitylogs__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_message_message__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_fingerprint_aio___ = __webpack_require__(133);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * Created By Sumit Rajpal
 */



















var SigninPage = /** @class */ (function () {
    function SigninPage(faio, platform, message, navCtrl, fcm, navParams, storage, loading, http, toastCtrl, device, alertCtrl, formBuilder, logs) {
        this.faio = faio;
        this.platform = platform;
        this.message = message;
        this.navCtrl = navCtrl;
        this.fcm = fcm;
        this.navParams = navParams;
        this.storage = storage;
        this.loading = loading;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.device = device;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.logs = logs;
        this.result = [];
        this.isOtp = false;
        this.hid = true;
        this.btn_cont = "";
        this.platform.registerBackButtonAction(function () {
        });
        storage.ready().then(function () {
        });
    }
    SigninPage_1 = SigninPage;
    SigninPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.fullUrl = _this.appUrl + '/WS/IdeaElanService.svc/ValidateLogin';
            _this.getDetails = _this.appUrl + '/WS/IdeaElanService.svc/GetUserDetails';
            _this.registerDevice = _this.appUrl + '/WS/IdeaElanService.svc/RegisterDevice';
            _this.notificationUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetMobileAppNotifications';
            _this.sendEmailUrl = _this.appUrl + '/WS/IdeaElanService.svc/SendEmail';
        });
        //Modified by Anto Rupak
        this.isLoginAll = true;
        this.isPhoneNumber = false;
        this.regexpem = new RegExp('^[a-zA-Z_0-9._%+-]+@[a-zA-Z_0-9.-]+\\.[a-zA-Z_0-9]{2,4}$');
        this.storage.get("clientImage").then(function (details) {
            if (details == null || details == undefined || details == "") {
                _this.ImageUrl = "assets/imgs/splash.png";
            }
            else {
                _this.ImageUrl = details;
            }
        });
        this.storage.get("InsitutionName").then(function (name) {
            if (name == null) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__pin_pin__["a" /* PinPage */]);
            }
            else {
                _this.insitutionName = name;
            }
        });
        this.storage.get('appLink').then(function (val) {
            _this.appUrl = val;
            _this.fullUrl = _this.appUrl + '/WS/IdeaElanService.svc/ValidateLogin';
            _this.getDetails = _this.appUrl + '/WS/IdeaElanService.svc/GetUserDetails';
            _this.registerDevice = _this.appUrl + '/WS/IdeaElanService.svc/RegisterDevice';
            _this.notificationUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetMobileAppNotifications';
            _this.sendEmailUrl = _this.appUrl + '/WS/IdeaElanService.svc/SendEmail';
            if (_this.appUrl.includes('/NMI')) {
                _this.clientType = 'nmi';
            }
            else if (_this.appUrl.includes('/uq')) {
                _this.clientType = 'uq';
            }
            else if (_this.appUrl.includes('/caltech')) {
                _this.clientType = 'caltech';
            }
            _this.storage.set('clientType', _this.clientType);
        });
        this.storage.get('InternalDomain').then(function (val) {
            _this.internalDomain = val;
        });
        this.storage.get('IsSSOEnabled').then(function (val) {
            _this.IsSSOEnabled = val;
        });
        this.deviceModel = this.device.model;
        this.devicePlatform = this.device.platform;
        this.deviceSerial = this.device.serial;
        this.deviceId = this.device.uuid;
        this.deviceVersion = this.device.version;
        this.pagetypeval = this.navParams.get('pagename');
        this.searchval = this.navParams.get('searchval');
        this.storage.get("userLogout").then(function (name) {
            _this.userLogout = name;
        });
        //alert(`logout:${this.userLogout}`);
        this.storage.get("FToken").then(function (name) {
            _this.FToken = name;
        });
        // alert(`token:${this.FToken}`);
        if (this.FToken == false || this.FToken == null) {
            this.hid = true;
            //alert("true");
        }
        else {
            this.hid = false;
            //alert("false");
        }
        this.btn_disp_avail();
    };
    SigninPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.get("userLogout").then(function (name) {
            _this.userLogout = name;
        });
        //alert(`logout:${this.userLogout}`);
        this.storage.get("FToken").then(function (name) {
            _this.FToken = name;
        });
        // alert(`token:${this.FToken}`);
        if (this.FToken == false || this.FToken == null) {
            this.hid = true;
            //alert("true");
        }
        else {
            this.hid = false;
            //alert("false");
        }
    };
    SigninPage.prototype.postData = function () {
        if (this.isOtp) {
            if (this.otp == null || this.username == null || this.otp == "" || this.username == "") {
                this.message.showMessage('Alert', 'Please Enter the OTP');
            }
            else {
                this.sendOtp();
            }
        }
        else {
            if (this.password == null || this.username == null || this.password == "" || this.username == "") {
                this.message.showMessage('Alert', 'Enter the Credentials');
            }
            else {
                this.sendRequest(this.username, this.password);
            }
        }
    };
    SigninPage.prototype.authpostData = function () {
        if (this.userLogout == true && this.FToken == true) {
            this.showFingerPrintDialog();
        }
    };
    //REQUEST METHOD
    SigninPage.prototype.sendRequest = function (m_username, m_password) {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Signing In"
        });
        // loader.present();
        //SEDNING REQUEST
        this.http.post(this.fullUrl, {
            username: m_username,
            password: m_password
        })
            .subscribe(function (data) {
            //RESPONSE
            loader.dismiss();
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userResponseJson = resJSON;
            _this.roleType = resJSON.UserRole;
            _this.phoneNumber = resJSON.Phone;
            if (_this.isOtp) {
                _this.phoneEmailOtpRequest();
            }
            else {
                _this.sendToNaviPage();
            }
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            if (resErrJSON.status == 400) {
                if (_this.isOtp) {
                    _this.message.showMessage('Alert', 'Please check the username');
                }
                else {
                    _this.message.showMessage('Alert', 'Error Processing Request ');
                }
            }
        });
    };
    SigninPage.prototype.phoneEmailOtpRequest = function () {
        this.randomNumber = String(100000 + Math.floor(Math.random() * 999999));
        this.storage.set('otp', this.randomNumber);
        console.log("otp", this.randomNumber);
        if (this.phoneNumber.toLowerCase().includes('ext')) {
            this.sendEmailRequest(this.username, "mail");
        }
        else {
            this.phoneNumber = this.phoneNumber.replace(/[^0-9]/g, '');
            if (this.phoneNumber.length > 11) {
                this.sendingOtpRequest();
            }
            else {
                this.isLoginAll = false;
                this.isPhoneNumber = true;
            }
        }
    };
    SigninPage.prototype.sendingOtpRequest = function () {
        var _this = this;
        this.otpMessage = "Enter the code " + this.randomNumber + " where prompted in the IE Infinity mobile app";
        this.phoneMessage = 'Verification Code has been sent to your registered email address : &nbsp; <b>' + this.username + '</b> and phone : <b>' + this.phoneNumber + '</b>. Please enter the verification code to login';
        var smsurl = "https://platform.clickatell.com/messages/http/send?apiKey=IimV6RBFR2eit558aiGF7g==&to=" + this.phoneNumber + "&content=" + this.otpMessage;
        this.http.get(smsurl)
            .subscribe(function (data) {
            var resjSON = JSON.stringify(data);
            var result = JSON.parse(resjSON);
            if (result.messages[0].accepted) {
                _this.sendEmailRequest(_this.username, 'phone');
            }
            else {
                _this.sendEmailRequest(_this.username, 'mail');
            }
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            var resErr = JSON.stringify(error);
            var resErrJSON = JSON.parse(resErr);
            //  this.barcode=resErr;
            if (resErrJSON.status == 400) {
            }
        });
    };
    SigninPage.prototype.sendToNaviPage = function () {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Signing In"
        });
        this.storage.set('devicetoken', this.tok);
        this.userId = this.userResponseJson.UserId;
        this.userToken = this.userResponseJson.UserToken;
        this.storage.set('userLogout', false);
        if (!this.userResponseJson.hasOwnProperty('UserRole')) {
            this.storage.set('roleType', "user");
            loader.present().then(function () {
                return _this.sendRegisterDeviceRequest();
            }).then(function () {
                return _this.sendDetailsRequest();
            }).then(function () { loader.dismiss(); });
        }
        else {
            this.storage.set('userRole', this.userResponseJson.UserRole);
            if (this.roleType.includes("Super Admin")) {
                this.storage.set('roleType', "super");
            }
            else if (this.roleType.includes("Institution Admin")) {
                this.storage.set('roleType', "admin");
            }
            else if (this.roleType.includes("Provider Admin")) {
                this.storage.set('roleType', "providerAdmin");
            }
            else if (this.roleType.includes("Group Admin")) {
                this.storage.set('roleType', "labAdmin");
            }
            else {
                this.storage.set('roleType', "user");
            }
            var externalUser = this.userResponseJson.UserRole.includes("External User");
            this.storage.set('userType', externalUser);
            loader.present().then(function () {
                return _this.sendRegisterDeviceRequest();
            }).then(function () {
                return _this.sendDetailsRequest();
            }).then(function () { loader.dismiss(); });
        }
    };
    SigninPage.prototype.sendOtp = function () {
        var _this = this;
        this.storage.get("otp").then(function (confirmOtp) {
            if (confirmOtp == _this.otp) {
                _this.sendToNaviPage();
            }
            else {
                _this.message.showMessage('Alert', 'Please the Enter the Valid OTP ! ');
            }
        });
    };
    SigninPage.prototype.changeIsLogin = function () {
        this.otp = '';
        this.updatePhoneNumber = null;
        this.isLoginAll = true;
        this.isPhoneNumber = false;
        if (this.isOtp) {
            this.isOtp = true;
        }
        else {
            this.isOtp = false;
        }
    };
    SigninPage.prototype.sendEmailRequest = function (username, type) {
        var _this = this;
        this.emailSubject = "IE Infinity Verification Code";
        this.emailMessage = 'Verification Code has been sent to your registered email address <b>' + this.username + '</b>. Please enter the verification code to login';
        this.otpMessage = "Enter this code where prompted in the IE Infinity mobile app <br/><br/><h3>" + this.randomNumber + "</h3>";
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Sending OTP . . ."
        });
        loader.present();
        //SEDNING REQUEST
        this.http.post(this.sendEmailUrl, {
            emailaddress: username,
            emailmessage: this.otpMessage,
            emailsubject: this.emailSubject
        })
            .subscribe(function (data) {
            loader.dismiss();
            _this.isLoginAll = true;
            _this.isPhoneNumber = false;
            if (type == 'mail') {
                _this.message.showMessage('Message', _this.emailMessage);
            }
            else {
                _this.message.showMessage('Message', _this.phoneMessage);
            }
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            loader.dismiss();
        });
    };
    SigninPage.prototype.updatePhoneButton = function () {
        if (this.updatePhoneNumber != null) {
            if (String(this.updatePhoneNumber).length < 11 || String(this.updatePhoneNumber).includes('.')) {
                this.message.showMessage('Alert', 'Enter the valid Phone Number');
            }
            else {
                this.sendPhoneUpdateRequest();
            }
        }
        else {
            this.message.showMessage('Message', 'Please Enter the Phone Number ');
        }
    };
    SigninPage.prototype.sendPhoneUpdateRequest = function () {
        var _this = this;
        this.updatePhoneRequestButton = [
            {
                text: 'OK',
                handler: function () {
                    _this.sendRequest(_this.username, "");
                }
            }
        ];
        this.updatePhoneNumberUrl = this.appUrl + '/WS/IdeaElanService.svc/UpdateUserPhone';
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Updating Phone Number . . ."
        });
        loader.present();
        //SEDNING REQUEST
        this.http.post(this.updatePhoneNumberUrl, {
            email: this.username,
            phone: this.updatePhoneNumber
        })
            .subscribe(function (data) {
            _this.isLoginAll = true;
            _this.isPhoneNumber = false;
            loader.dismiss();
            _this.updatePhoneNumber = null;
            _this.message.showMessageButton("Message", "Phone number has been updated", _this.updatePhoneRequestButton);
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            _this.isLoginAll = true;
            _this.isOtp = false;
            _this.isPhoneNumber = false;
            loader.dismiss();
            _this.updatePhoneNumber = null;
        });
    };
    //GET USER DETAILS METHOD
    SigninPage.prototype.sendDetailsRequest = function () {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Getting User Details"
        });
        // loader.present();
        //SEDNING REQUEST
        this.http.post(this.getDetails, {
            email: this.username
        })
            .subscribe(function (data) {
            //RESPONSE
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userDetailsJson = resJSON;
            console.log("user details after post method ", resJSON);
            _this.storage.set('userDetails', _this.userDetailsJson);
            // loader.dismiss();
            //this.navCtrl.push(MenuPage);
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__menu_menu__["a" /* MenuPage */])
                .then(function () {
                var startIndex = _this.navCtrl.getActive().index - 1;
                _this.navCtrl.remove(startIndex, 1);
            });
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
            //   loader.dismiss();
        });
    };
    //REGISTER DEVICE METHOD
    SigninPage.prototype.sendRegisterDeviceRequest = function () {
        var _this = this;
        var loader = this.loading.create({
            spinner: "crescent",
            content: "Registering Device"
        });
        this.fcm.getToken().then(function (token) {
            _this.tok = token;
            _this.http.post(_this.registerDevice, {
                userid: _this.userId,
                deviceid: _this.deviceId,
                devicetoken: _this.tok,
                devicename: _this.devicePlatform,
                devicemodel: _this.deviceModel,
                deviceversion: _this.deviceVersion,
                usertoken: _this.userToken
            })
                .subscribe(function (data) {
                //RESPONSE
                var resSTR = JSON.stringify(data);
                var resJSON = JSON.parse(resSTR);
                _this.storage.set('userDeviceResponse', resJSON.RegisterDeviceResult);
                //  loader.dismiss(); 
            }, //ERROR HANDLING
            function (//ERROR HANDLING
            error) {
                loader.dismiss();
            });
        });
    };
    //Modifed by Anto Rupak
    SigninPage.prototype.searchInstrument = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__instrument_search_instrument_search__["a" /* InstrumentSearchPage */]);
    };
    //Modifed by Anto Rupak
    SigninPage.prototype.resetPassword = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__reset_password_reset_password__["a" /* ResetPasswordPage */]);
    };
    //Modifed by Anto Rupak
    SigninPage.prototype.signup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__signup_signup__["a" /* SignupPage */]);
    };
    SigninPage.prototype.emailChange = function () {
        if (this.regexpem.test(this.username) == false || this.username == null || this.username == '') {
            this.isOtp = false;
            this.message.showMessage('Alert', "Enter a valid email address ");
            return false;
        }
        else {
            if (this.username.toLowerCase().indexOf(this.internalDomain) > 0 && this.IsSSOEnabled == "true") {
                this.isOtp = true;
                this.otp = '';
                this.sendRequest(this.username, "");
            }
            else {
                this.isOtp = false;
            }
        }
    };
    //Created by Abey Abraham
    SigninPage.prototype.showFingerPrintDialog = function () {
        return __awaiter(this, void 0, void 0, function () {
            var available, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.platform.ready()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.faio.isAvailable()];
                    case 2:
                        available = _a.sent();
                        if (available == "finger" || available == "face") {
                            this.faio.show({
                                clientId: 'IdeaElan',
                                clientSecret: 'IdeaElan',
                                disableBackup: false,
                                localizedFallbackTitle: 'Use Pin',
                                localizedReason: 'Please Authenticate' //Only for iOS
                            }).then(function (result) {
                                //alert(`${result}`);
                                _this.storage.set('userLogout', false);
                                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__menu_menu__["a" /* MenuPage */]).then(function () {
                                    var startIndex = _this.navCtrl.getActive().index - 1;
                                    _this.navCtrl.remove(startIndex, 1);
                                });
                            }).catch(function (error) {
                                //Fingerprint/Face was not successfully verified
                                if (error.message == "minimum SDK version 23 required") {
                                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__menu_menu__["a" /* MenuPage */]).then(function () {
                                        var startIndex = _this.navCtrl.getActive().index - 1;
                                        _this.navCtrl.remove(startIndex, 1);
                                    });
                                }
                                // alert(" error not verified");
                                _this.navCtrl.push(SigninPage_1);
                            });
                        }
                        else {
                            this.storage.set('userLogout', false);
                            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__menu_menu__["a" /* MenuPage */]).then(function () {
                                var startIndex = _this.navCtrl.getActive().index - 1;
                                _this.navCtrl.remove(startIndex, 1);
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        if (e_1.message === "Cancelled") {
                            this.navCtrl.push(SigninPage_1);
                        }
                        if (e_1.message === "minimum SDK version 23 required") {
                            this.storage.set('userLogout', false);
                            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__menu_menu__["a" /* MenuPage */]).then(function () {
                                var startIndex = _this.navCtrl.getActive().index - 1;
                                _this.navCtrl.remove(startIndex, 1);
                            });
                        }
                        this.storage.set('userLogout', false);
                        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__menu_menu__["a" /* MenuPage */]).then(function () {
                            var startIndex = _this.navCtrl.getActive().index - 1;
                            _this.navCtrl.remove(startIndex, 1);
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SigninPage.prototype.btn_disp_avail = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fin_available, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.platform.ready()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.faio.isAvailable()];
                    case 2:
                        fin_available = _a.sent();
                        if (fin_available == "finger") {
                            this.btn_cont = "Login with finger print";
                        }
                        if (fin_available == "face") {
                            this.btn_cont = "Login with Face ID";
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    var SigninPage_1;
    SigninPage = SigninPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'page-signin',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\signin\signin.html"*/'<!--Modified by Anto Rupak using bootstarp-->\n\n\n\n\n\n<!--UI modified by Anto Rupak using Bootstarp-->\n\n<ion-content padding #container>\n\n  <!--Changes done for Insitution Name by Anto Rupak-->\n\n  <ion-row>\n\n    <ion-col>\n\n      <img src="assets/imgs/splash.png" alt="couldn\'t load">\n\n    </ion-col>\n\n    <ion-col style="text-align: center;">\n\n      <span>\n\n        Welcome to\n\n      </span>\n\n      <span class="headname">\n\n        {{insitutionName}}\n\n      </span>\n\n    </ion-col>\n\n    <ion-col>\n\n\n\n    </ion-col>\n\n\n\n  </ion-row>\n\n\n\n\n\n  <ion-list>\n\n    <div id="over">\n\n        <img src="{{ImageUrl}}"  alt="No Image">\n\n    </div>\n\n\n\n  </ion-list>\n\n\n\n  <div *ngIf=\'isLoginAll\'>\n\n    <!-- Content here -->\n\n\n\n    <div class="input-icon-wrap" style="margin-top: 1em">\n\n      <span class="input-icon">\n\n        <ion-icon name="mail"></ion-icon>\n\n      </span>\n\n      <input type="email" class="input-with-icon" placeholder="Email ID" [(ngModel)]="username" id="user_email"\n\n        autocomplete="new-password" (change)="emailChange()">\n\n    </div>\n\n    <div class="input-icon-wrap" style="margin-top: 1em" *ngIf=\'!isOtp\'>\n\n      <span class="input-icon">\n\n        <ion-icon name="lock"></ion-icon>\n\n      </span>\n\n      <input type="password" class="input-with-icon" autocomplete="new-password" placeholder="Password"\n\n        [(ngModel)]="password" id="user_password" (keyup.enter)="postData()">\n\n    </div>\n\n    <div class="input-icon-wrap" style="margin-top: 1em" *ngIf=\'isOtp\'>\n\n      <span class="input-icon">\n\n        <ion-icon name="lock"></ion-icon>\n\n      </span>\n\n      <input type="number" class="input-with-icon" placeholder="OTP" [(ngModel)]="otp" (keyup.enter)="postData()">\n\n    </div>\n\n    <!--Modified by Anto Rupak-->\n\n    <span>\n\n      <p class="forgot" ion-align=\'left\' (click)=\'phoneEmailOtpRequest()\' *ngIf=\'isOtp\'>Resend OTP</p>\n\n    </span>\n\n    <span>\n\n      <p class="forgot" ion-align=\'right\' (click)=\'resetPassword()\' *ngIf=\'!isOtp\'>Forgot password ?</p>\n\n    </span>\n\n\n\n    <ion-row center>\n\n      <ion-col text-center>\n\n        <button ion-button full (click)="postData()">Sign In</button><br />\n\n        <button [hidden]=hid ion-button full (click)="authpostData()"> {{this.btn_cont}}</button><br />\n\n      <!--   <button [hidden]=hid ion-button full (click)="authpostData()">Finger Print</button><br />\n\n       Modified by Anto Rupak for Signup-->\n\n        New User? <span style="text-decoration:underline; color:#1976D2" (click)=\'signup()\'> Sign Up</span><br />\n\n\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n\n\n    <ion-row center>\n\n      <ion-col text-center>\n\n\n\n        <span class="name" style="text-decoration:underline; color:#1976D2" (click)=\'searchInstrument()\'>Instrument\n\n          Search</span>\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n  </div>\n\n  <div *ngIf=\'isPhoneNumber\'>\n\n\n\n    <div class="input-icon-wrap" style="margin-top: 1em">\n\n      <span class="input-icon">\n\n        <ion-icon name="call"></ion-icon>\n\n      </span>\n\n      <input type="number" class="input-with-icon" placeholder="Enter Correct Phone Number"\n\n        [(ngModel)]="updatePhoneNumber">\n\n    </div>\n\n\n\n    <ion-row center>\n\n      <ion-col text-center>\n\n        <button ion-button full (click)="updatePhoneButton()">Update Phone</button><br />\n\n        <span class="name" style="text-decoration:underline; color:#1976D2" (click)=\'changeIsLogin()\'>SignIn</span>\n\n      </ion-col>\n\n\n\n    </ion-row>\n\n\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\signin\signin.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_14__ionic_native_fingerprint_aio___["a" /* FingerprintAIO */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_13__providers_message_message__["a" /* MessageProvider */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_10__providers_fcm_fcm__["a" /* FcmProvider */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["p" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_11__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_12__providers_activitylogs_activitylogs__["a" /* ActivitylogsProvider */]])
    ], SigninPage);
    return SigninPage;
}());

//# sourceMappingURL=signin.js.map

/***/ }),

/***/ 664:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar_ngx__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(805);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_signin_signin__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_menu_menu__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_dashboard_dashboard__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_common__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_device__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_date_picker__ = __webpack_require__(809);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ng2_charts_ng2_charts__ = __webpack_require__(810);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ng2_charts_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_ng2_charts_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_schedular_schedular__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_actual_usage_actual_usage__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_actualusagecounter_actualusagecounter__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_instrument_search_instrument_search__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_barcode_scanner__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_network__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__angular_platform_browser_animations__ = __webpack_require__(813);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_lab_dashboard_lab_dashboard__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_inboxview_inboxview__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_firebase__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__providers_fcm_fcm__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_angularfire2__ = __webpack_require__(815);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_angularfire2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_26_angularfire2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__providers_notification_notification__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_ng_lazyload_image__ = __webpack_require__(549);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_ionic_image_loader__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_calendar__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_sampledetail_sampledetail__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_viewcage_viewcage__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_samplesubmission_samplesubmission__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__components_components_module__ = __webpack_require__(816);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__providers_message_message__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__providers_nertworkrequest_nertworkrequest__ = __webpack_require__(473);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ionic_native_camera__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__ionic_native_file_transfer__ = __webpack_require__(475);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__ionic_native_file__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__providers_activitylogs_activitylogs__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_appointments_appointments__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__pages_viewanimal_viewanimal__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pages_instrumentstechissue_instrumentstechissue__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__ionic_native_android_permissions__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__pages_modal_modal__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__pages_sign_in_modal_sign_in_modal__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__pages_location_modal_location_modal__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__ionic_native_media__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__ionic_native_keyboard_ngx__ = __webpack_require__(533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__providers_requesturls_requesturls__ = __webpack_require__(819);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__ionic_native_fingerprint_aio__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__pages_supplies_supplies__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__providers_appointment_appointment__ = __webpack_require__(477);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__pages_supplies_order_supplies_order__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__ionic_native_streaming_media__ = __webpack_require__(476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__providers_dynamo_db_dynamo_db__ = __webpack_require__(820);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__angular_fire_storage__ = __webpack_require__(548);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__angular_fire_database__ = __webpack_require__(478);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












































//import {ChatContentPage} from '../pages/chat-content/chat-content';

















//import { IonicImageLoader } from 'ionic-image-loader';
/*
Firebase Credentials of Idea Elan


const firebase = {
  apiKey: "AIzaSyDcCJQXZMegdIGttq6uMb_toCoL_UYMGFM",//AIzaSyAlZZcVAO86qE9FFdL2XYjVShv5Txtwr7Y
  authDomain: "ie-infinity.firebaseapp.com",//ideaelan-f26b1.firebaseapp.com
  databaseURL: "https://ie-infinity.firebaseio.com  ",
  //https://ie-infinity-test.firebaseio.com   https://ideaelan-f26b1.firebaseio.com
  projectId: "https://ie-infinity", //ideaelan-f26b1
  storageBucket: "ie-infinity.appspot.com",//ideaelan-f26b1.appspot.com
  messagingSenderId: "77566553849"//1056936825594
}


*/
//Firebase Credentials of Abey Abraham - personal console
var firebase = {
    apiKey: "AIzaSyCRDymxcDEMORc4U1TjW5_SKiB22G45buM",
    authDomain: "sopaa-b37c1.firebaseapp.com",
    databaseURL: "https://sopaa-b37c1.firebaseio.com",
    projectId: "sopaa-b37c1",
    storageBucket: "sopaa-b37c1.appspot.com",
    messagingSenderId: "500138839182"
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_45__pages_modal_modal__["a" /* ModalPage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_location_modal_location_modal__["a" /* LocationModalPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_signin_signin__["a" /* SigninPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_menu_menu__["a" /* MenuPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_dashboard_dashboard__["a" /* DashboardPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_schedular_schedular__["a" /* SchedularPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_actual_usage_actual_usage__["a" /* ActualUsagePage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_actualusagecounter_actualusagecounter__["a" /* ActualusagecounterPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_instrument_search_instrument_search__["a" /* InstrumentSearchPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_lab_dashboard_lab_dashboard__["a" /* LabDashboardPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_inboxview_inboxview__["a" /* InboxviewPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_sampledetail_sampledetail__["a" /* SampledetailPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_samplesubmission_samplesubmission__["a" /* SamplesubmissionPage */],
                __WEBPACK_IMPORTED_MODULE_41__pages_appointments_appointments__["a" /* AppointmentsPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_viewcage_viewcage__["a" /* ViewcagePage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_viewanimal_viewanimal__["a" /* ViewanimalPage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_sign_in_modal_sign_in_modal__["a" /* SignInModalPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_instrumentstechissue_instrumentstechissue__["a" /* InstrumentstechissuePage */],
                __WEBPACK_IMPORTED_MODULE_52__pages_supplies_supplies__["a" /* SuppliesPage */],
                __WEBPACK_IMPORTED_MODULE_54__pages_supplies_order_supplies_order__["a" /* SuppliesOrderPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_21__angular_platform_browser_animations__["b" /* NoopAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_21__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_58__angular_fire_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_29_ionic_image_loader__["b" /* IonicImageLoader */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], { scrollPadding: false, preloadModules: true, autocomplete: 'off',
                    menuType: 'push',
                    platforms: {
                        android: {
                            menuType: 'reveal',
                        }
                    } }, {
                    links: [
                        { loadChildren: '../pages/activitydashboard/activitydashboard.module#ActivitydashboardPageModule', name: 'ActivitydashboardPage', segment: 'activitydashboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/actualusagecounter/actualusagecounter.module#ActualusagecounterPageModule', name: 'ActualusagecounterPage', segment: 'actualusagecounter', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/allsupplies/allsupplies.module#AllsuppliesPageModule', name: 'AllsuppliesPage', segment: 'allsupplies', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/dashboarddetail/dashboarddetail.module#DashboarddetailPageModule', name: 'DashboarddetailPage', segment: 'dashboarddetail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/decription-modal/decription-modal.module#DecriptionModalPageModule', name: 'DecriptionModalPage', segment: 'decription-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/facilities/facilities.module#FacilitiesPageModule', name: 'FacilitiesPage', segment: 'facilities', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/general-chat/general-chat.module#GeneralChatPageModule', name: 'GeneralChatPage', segment: 'general-chat', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/inboxsuppliesdetails/inboxsuppliesdetails.module#InboxsuppliesdetailsPageModule', name: 'InboxsuppliesdetailsPage', segment: 'inboxsuppliesdetails', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/inboxview/inboxview.module#InboxviewPageModule', name: 'InboxviewPage', segment: 'inboxview', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/instrumentstechissue/instrumentstechissue.module#InstrumentstechissuePageModule', name: 'InstrumentstechissuePage', segment: 'instrumentstechissue', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/labs/labs.module#LabsPageModule', name: 'LabsPage', segment: 'labs', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/location-modal/location-modal.module#LocationModalPageModule', name: 'LocationModalPage', segment: 'location-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/modal/modal.module#ModalPageModule', name: 'ModalPage', segment: 'modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/notification/notification.module#NotificationPageModule', name: 'NotificationPage', segment: 'notification', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/pin/pin.module#PinPageModule', name: 'PinPage', segment: 'pin', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/regulation/regulation.module#RegulationPageModule', name: 'RegulationPage', segment: 'regulation', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/password/password.module#PasswordPageModule', name: 'PasswordPage', segment: 'password', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/reset-password/reset-password.module#ResetPasswordPageModule', name: 'ResetPasswordPage', segment: 'reset-password', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/samplesubmission/samplesubmission.module#SamplesubmissionPageModule', name: 'SamplesubmissionPage', segment: 'samplesubmission', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/scanner/scanner.module#ScannerPageModule', name: 'ScannerPage', segment: 'scanner', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/signup/signup.module#SignupPageModule', name: 'SignupPage', segment: 'signup', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/supplies-detail/supplies-detail.module#SuppliesDetailPageModule', name: 'SuppliesDetailPage', segment: 'supplies-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/viewanimal/viewanimal.module#ViewanimalPageModule', name: 'ViewanimalPage', segment: 'viewanimal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/lab-dashboard/lab-dashboard.module#LabDashboardPageModule', name: 'LabDashboardPage', segment: 'lab-dashboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/sampledetail/sampledetail.module#SampledetailPageModule', name: 'SampledetailPage', segment: 'sampledetail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/sign-in-modal/sign-in-modal.module#SignInModalPageModule', name: 'SignInModalPage', segment: 'sign-in-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/viewcage/viewcage.module#ViewcagePageModule', name: 'ViewcagePage', segment: 'viewcage', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/actual-usage/actual-usage.module#ActualUsagePageModule', name: 'ActualUsagePage', segment: 'actual-usage', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/allchats/allchats.module#AllchatsPageModule', name: 'AllchatsPage', segment: 'allchats', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/allreservation/allreservation.module#AllreservationPageModule', name: 'AllreservationPage', segment: 'allreservation', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/chat-content/chat-content.module#ChatContentPageModule', name: 'ChatContentPage', segment: 'chat-content', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/dashboard/dashboard.module#DashboardPageModule', name: 'DashboardPage', segment: 'dashboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/instrument-search/instrument-search.module#InstrumentSearchPageModule', name: 'InstrumentSearchPage', segment: 'instrument-search', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/menu/menu.module#MenuPageModule', name: 'MenuPage', segment: 'menu', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/message/message.module#MessagePageModule', name: 'MessagePage', segment: 'message', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/p-iinbox/p-iinbox.module#PIinboxPageModule', name: 'PIinboxPage', segment: 'p-iinbox', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/report/report.module#ReportPageModule', name: 'ReportPage', segment: 'report', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/signin/signin.module#SigninPageModule', name: 'SigninPage', segment: 'signin', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/supplies-order/supplies-order.module#SuppliesOrderPageModule', name: 'SuppliesOrderPage', segment: 'supplies-order', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/supplies/supplies.module#SuppliesPageModule', name: 'SuppliesPage', segment: 'supplies', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/activitydetails/activitydetails.module#ActivitydetailsPageModule', name: 'ActivitydetailsPage', segment: 'activitydetails', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/inbox/inbox.module#InboxPageModule', name: 'InboxPage', segment: 'inbox', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/navi/navi.module#NaviPageModule', name: 'NaviPage', segment: 'navi', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/appointments/appointments.module#AppointmentsPageModule', name: 'AppointmentsPage', segment: 'appointments', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_9__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_11__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_14_ng2_charts_ng2_charts__["ChartsModule"],
                __WEBPACK_IMPORTED_MODULE_10__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_26_angularfire2__["AngularFireModule"].initializeApp(firebase),
                __WEBPACK_IMPORTED_MODULE_34__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_28_ng_lazyload_image__["a" /* LazyLoadImageModule */].forRoot({
                    preset: __WEBPACK_IMPORTED_MODULE_28_ng_lazyload_image__["b" /* intersectionObserverPreset */]
                }),
                __WEBPACK_IMPORTED_MODULE_29_ionic_image_loader__["b" /* IonicImageLoader */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_46__pages_sign_in_modal_sign_in_modal__["a" /* SignInModalPage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_location_modal_location_modal__["a" /* LocationModalPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_modal_modal__["a" /* ModalPage */],
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_dashboard_dashboard__["a" /* DashboardPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_signin_signin__["a" /* SigninPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_menu_menu__["a" /* MenuPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_schedular_schedular__["a" /* SchedularPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_actual_usage_actual_usage__["a" /* ActualUsagePage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_actualusagecounter_actualusagecounter__["a" /* ActualusagecounterPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_instrument_search_instrument_search__["a" /* InstrumentSearchPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_lab_dashboard_lab_dashboard__["a" /* LabDashboardPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_inboxview_inboxview__["a" /* InboxviewPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_sampledetail_sampledetail__["a" /* SampledetailPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_samplesubmission_samplesubmission__["a" /* SamplesubmissionPage */],
                __WEBPACK_IMPORTED_MODULE_41__pages_appointments_appointments__["a" /* AppointmentsPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_viewcage_viewcage__["a" /* ViewcagePage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_viewanimal_viewanimal__["a" /* ViewanimalPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_instrumentstechissue_instrumentstechissue__["a" /* InstrumentstechissuePage */],
                __WEBPACK_IMPORTED_MODULE_52__pages_supplies_supplies__["a" /* SuppliesPage */],
                __WEBPACK_IMPORTED_MODULE_54__pages_supplies_order_supplies_order__["a" /* SuppliesOrderPage */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_11__angular_common__["d" /* DatePipe */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar_ngx__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_device__["a" /* Device */],
                __WEBPACK_IMPORTED_MODULE_39__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
                __WEBPACK_IMPORTED_MODULE_48__ionic_native_media__["a" /* Media */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_date_picker__["a" /* DatePicker */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_firebase__["a" /* Firebase */],
                __WEBPACK_IMPORTED_MODULE_25__providers_fcm_fcm__["a" /* FcmProvider */],
                __WEBPACK_IMPORTED_MODULE_51__ionic_native_fingerprint_aio__["a" /* FingerprintAIO */],
                __WEBPACK_IMPORTED_MODULE_57__angular_fire_storage__["a" /* AngularFireStorage */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_25__providers_fcm_fcm__["a" /* FcmProvider */],
                __WEBPACK_IMPORTED_MODULE_55__ionic_native_streaming_media__["a" /* StreamingMedia */],
                __WEBPACK_IMPORTED_MODULE_27__providers_notification_notification__["a" /* NotificationProvider */],
                __WEBPACK_IMPORTED_MODULE_30__ionic_native_calendar__["a" /* Calendar */],
                __WEBPACK_IMPORTED_MODULE_37__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_35__providers_message_message__["a" /* MessageProvider */],
                __WEBPACK_IMPORTED_MODULE_36__providers_nertworkrequest_nertworkrequest__["a" /* NertworkrequestProvider */],
                __WEBPACK_IMPORTED_MODULE_38__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_40__providers_activitylogs_activitylogs__["a" /* ActivitylogsProvider */],
                __WEBPACK_IMPORTED_MODULE_56__providers_dynamo_db_dynamo_db__["a" /* DynamoDbProvider */],
                __WEBPACK_IMPORTED_MODULE_49__ionic_native_keyboard_ngx__["a" /* Keyboard */],
                __WEBPACK_IMPORTED_MODULE_50__providers_requesturls_requesturls__["a" /* RequesturlsProvider */],
                __WEBPACK_IMPORTED_MODULE_44__ionic_native_android_permissions__["a" /* AndroidPermissions */],
                __WEBPACK_IMPORTED_MODULE_41__pages_appointments_appointments__["a" /* AppointmentsPage */],
                __WEBPACK_IMPORTED_MODULE_53__providers_appointment_appointment__["a" /* AppointmentProvider */],
                __WEBPACK_IMPORTED_MODULE_56__providers_dynamo_db_dynamo_db__["a" /* DynamoDbProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagePage; });
/* unused harmony export snapshotToArray */
/* unused harmony export snapshotToArrayNew */
/* unused harmony export snapshotToArrayCount */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_Firebase__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_Firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_Firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_fcm_fcm__ = __webpack_require__(97);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;






/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MessagePage = /** @class */ (function () {
    function MessagePage(navCtrl, fcm, navParams, http, storage) {
        this.navCtrl = navCtrl;
        this.fcm = fcm;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.users = [];
    }
    MessagePage.prototype.ionViewDidEnter = function () {
        //this.roletype == "super"||this.roletype == "providerAdmin"||this.roletype == " admin"
        //labAdmin
        if ((this.navParams.get("id") != "user") && (this.navParams.get("id") != "labAdmin")) {
            this.testtrue = false;
            this.loadUserList(this.userJson.UserId);
        }
        else {
            if (this.chatType == "SuppliesOrder") {
                this.loadAdminList(this.OrderId, 8);
            }
            else if (this.chatType == "SampleSubmission") {
                this.loadAdminList(this.WorkOrderId, 2);
            }
            else {
                this.loadAdminList(this.instid, 1);
            }
            this.testtrue = true;
        }
    };
    MessagePage.prototype.ionViewDidLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.gettoken();
                        this.storage.get('appLink').then(function (val) {
                            _this.appUrl = val;
                            _this.getAdminDetailsByEntityUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetAdminByEntity';
                        });
                        this.storage.get('pin').then(function (val) {
                            _this.pin = val;
                        });
                        return [4 /*yield*/, this.storage.get('userDetails').then(function (val1) {
                                _this.userJson = val1;
                            })];
                    case 1:
                        _a.sent();
                        this.storage.get('roleType').then(function (val) {
                            _this.roletype = val;
                        });
                        this.instid = this.navParams.get("instrumentid");
                        this.ticketId = this.navParams.get("ticketid");
                        this.source = this.navParams.get("source");
                        this.chatType = this.navParams.get("chatType");
                        this.OrderId = this.navParams.get("OrderId");
                        this.ProviderId = this.navParams.get("ProviderId");
                        this.AppointmentId = this.navParams.get("AppointmentId");
                        this.LabId = this.navParams.get("LabId");
                        this.WorkOrderId = this.navParams.get("WorkOrderId");
                        console.log("ticket id , instid from chat content page ", this.ticketId, this.instid);
                        console.log("pin id loaded", this.pin);
                        console.log("typeofchat", this.chatType);
                        console.log("appointment id ", this.AppointmentId);
                        console.log("workorderid", this.WorkOrderId);
                        this.testnew();
                        if (this.navParams.get("id") != "user" || this.navParams.get("id") != "labAdmin") {
                            this.testtrue = false;
                            this.loadUserList(this.userJson.UserId);
                        }
                        else {
                            if (this.chatType == "SuppliesOrder") {
                                this.loadAdminList(this.OrderId, 8);
                            }
                            else if (this.chatType == "SampleSubmission") {
                                this.loadAdminList(this.WorkOrderId, 2);
                            }
                            else {
                                this.loadAdminList(this.instid, 1);
                            }
                            this.testtrue = true;
                        }
                        console.log('ionViewDidLoad MessagePage');
                        console.log("instid", this.instid);
                        this.idDetails = "";
                        this.idVal = "";
                        if (this.chatType == "TechnicalIssues") {
                            this.idDetails = "ticketid";
                            this.idVal = this.ticketId;
                            this.idValParam = this.instid;
                        }
                        else if (this.chatType == "Reservations") {
                            this.idDetails = "appointmentId";
                            this.idVal = this.AppointmentId;
                            this.idValParam = this.instid;
                        }
                        else if (this.chatType == "SuppliesOrder") {
                            this.idDetails = "orderId";
                            this.idVal = this.OrderId;
                            this.idValParam = this.ProviderId;
                        }
                        else if (this.chatType == "SampleSubmission") {
                            this.idDetails = "WorkOrderId";
                            this.idVal = this.WorkOrderId;
                            this.idValParam = this.ProviderId;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MessagePage.prototype.detail = function (adminid) {
        console.log(adminid, 'admin');
        console.log(this.pin, 'pin send');
        console.log("appointment id sending", this.AppointmentId);
        console.log("orderid sending", this.OrderId);
        console.log("provider id sending", this.ProviderId);
        if (this.roletype == "super" || this.roletype == "providerAdmin" || this.roletype == " admin") {
            this.navCtrl.push('ChatContentPage', { "WorkOrderId": "" + this.WorkOrderId, "OrderId": "" + this.OrderId, "ProviderId": "" + this.ProviderId, "role": "" + this.roletype, "userid": "" + adminid.userid, "adminid": "" + this.userJson.UserId, "instrumentid": "" + this.instid, "ticketid": "" + this.ticketId, "senderName": adminid.LastName + " " + adminid.FirstName, "pin": "" + this.pin, "source": "" + this.source, "chatType": "" + this.chatType, "AppointmentId": "" + this.AppointmentId });
        }
        else {
            this.adduserid(adminid);
            this.navCtrl.push('ChatContentPage', { "WorkOrderId": "" + this.WorkOrderId, "OrderId": "" + this.OrderId, "ProviderId": "" + this.ProviderId, "role": "" + this.roletype, "adminid": "" + adminid.UserId, "instrumentid": "" + this.instid, "curuser": "" + this.userJson.UserId, "ticketid": "" + this.ticketId, "senderName": adminid.LastName + " " + adminid.FirstName, "pin": "" + this.pin, "source": "" + this.source, "chatType": "" + this.chatType, "AppointmentId": "" + this.AppointmentId });
        }
    };
    MessagePage.prototype.adduserid = function (adminid) {
        return __awaiter(this, void 0, void 0, function () {
            var ref;
            var _this = this;
            return __generator(this, function (_a) {
                console.log("1. " + this.pin + "/chatrooms/" + this.chatType + "/" + this.idVal + "/" + this.idValParam + "/" + adminid.UserId + "/ ");
                ref = __WEBPACK_IMPORTED_MODULE_4_Firebase__["database"]().ref(this.pin + "/chatrooms/" + this.chatType + "/" + this.idVal + "/" + this.idValParam + "/" + adminid.UserId + "/");
                ref.child("" + this.userJson.UserId).update({
                    userid: "" + this.userJson.UserId,
                    // DeviceToken:`${this.userJson.DeviceToken}`, will be added once we get ideaelan firebase console 
                    DeviceToken: "" + this.tok,
                    FirstName: "" + this.userJson.FirstName,
                    LastName: "" + this.userJson.LastName,
                    UserName: "" + this.userJson.UserName,
                    UserImage: "" + this.userJson.UserImage,
                    EmailAddress: "" + this.userJson.EmailAddress
                }).then(function () {
                    console.log("2." + _this.pin + "/chatrooms/" + _this.chatType + "/" + _this.idVal + "/" + _this.idValParam + "/ ");
                    var refnew = __WEBPACK_IMPORTED_MODULE_4_Firebase__["database"]().ref(_this.pin + "/chatrooms/" + _this.chatType + "/" + _this.idVal + "/" + _this.idValParam + "/");
                    refnew.child("" + adminid.UserId).update({
                        adminid: "" + adminid.UserId,
                        // DeviceToken:`${adminid.DeviceToken}`, will be added once we get ideaelan firebase console 
                        DeviceToken: "" + _this.tok,
                        EmailAddress: "" + adminid.EmailAddress,
                        UserImage: "" + adminid.UserImage
                    });
                })
                    .then(function () {
                    if (_this.chatType == "SuppliesOrder" || _this.chatType == "SampleSubmission") {
                        console.log("3." + _this.pin + "/chatrooms/" + _this.chatType + "/" + _this.idVal + "/");
                        var refnew = __WEBPACK_IMPORTED_MODULE_4_Firebase__["database"]().ref(_this.pin + "/chatrooms/" + _this.chatType + "/" + _this.idVal + "/");
                        refnew.child("" + _this.idValParam).update({
                            providerid: "" + _this.idValParam,
                        });
                    }
                    else {
                        console.log("3." + _this.pin + "/chatrooms/" + _this.chatType + "/" + _this.idVal + "/");
                        var refnew = __WEBPACK_IMPORTED_MODULE_4_Firebase__["database"]().ref(_this.pin + "/chatrooms/" + _this.chatType + "/" + _this.idVal + "/");
                        refnew.child("" + _this.idValParam).update({
                            instrumentid: "" + _this.idValParam,
                        });
                    }
                }).then(function () {
                    if (_this.chatType == "TechnicalIssues") {
                        console.log("4." + _this.pin + "/chatrooms/" + _this.chatType + "/" + _this.idVal + "/");
                        var refnew = __WEBPACK_IMPORTED_MODULE_4_Firebase__["database"]().ref(_this.pin + "/chatrooms/" + _this.chatType + "/");
                        refnew.child("" + _this.idVal).update({
                            ticketId: "" + _this.idVal,
                        });
                    }
                    else if (_this.chatType == "Reservations") {
                        console.log("5." + _this.pin + "/chatrooms/" + _this.chatType + "/");
                        var refnew = __WEBPACK_IMPORTED_MODULE_4_Firebase__["database"]().ref(_this.pin + "/chatrooms/" + _this.chatType + "/");
                        refnew.child("" + _this.idVal).update({
                            appointmentId: "" + _this.idVal,
                        });
                    }
                    else if (_this.chatType == "SuppliesOrder") {
                        console.log("6." + _this.pin + "/chatrooms/" + _this.chatType + "/");
                        var refnew = __WEBPACK_IMPORTED_MODULE_4_Firebase__["database"]().ref(_this.pin + "/chatrooms/" + _this.chatType + "/");
                        refnew.child("" + _this.idVal).update({
                            orderId: "" + _this.idVal,
                        });
                    }
                    else if (_this.chatType == "SampleSubmission") {
                        console.log("6." + _this.pin + "/chatrooms/" + _this.chatType + "/");
                        var refnew = __WEBPACK_IMPORTED_MODULE_4_Firebase__["database"]().ref(_this.pin + "/chatrooms/" + _this.chatType + "/");
                        refnew.child("" + _this.idVal).update({
                            WorkOrderId: "" + _this.idVal,
                        });
                    }
                });
                return [2 /*return*/, 0];
            });
        });
    };
    MessagePage.prototype.loadAdminList = function (instid, num) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.http.get(this.getAdminDetailsByEntityUrl + ("/" + instid + "," + num + "," + this.userJson.UserId + "," + this.userJson.UserToken))
                    .subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
                    var resSTR, resJSON, i;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                resSTR = JSON.stringify(data);
                                resJSON = JSON.parse(resSTR);
                                console.log("admindetails", resJSON);
                                this.adminListJson = resJSON;
                                this.adminListJson1 = this.adminListJson;
                                console.log("adminlist1", this.adminListJson1);
                                if (!(this.adminListJson1 != null)) return [3 /*break*/, 8];
                                i = 0;
                                console.log(this.adminListJson1.length);
                                i = 0;
                                _a.label = 1;
                            case 1:
                                if (!(i < this.adminListJson1.length)) return [3 /*break*/, 7];
                                console.log(" get last node");
                                return [4 /*yield*/, this.getlastnode(this.idValParam, this.adminListJson1[i].UserId, i)];
                            case 2:
                                _a.sent();
                                console.log("chat type ", this.chatType);
                                if (!(this.chatType == "SuppliesOrder" || this.chatType == "SampleSubmission")) return [3 /*break*/, 4];
                                return [4 /*yield*/, this.adminListUnreadMessageCount(this.idValParam, this.adminListJson1[i].UserId, i)];
                            case 3:
                                _a.sent();
                                return [3 /*break*/, 6];
                            case 4:
                                console.log("admin count called");
                                return [4 /*yield*/, this.adminListUnreadMessageCount(this.instid, this.adminListJson1[i].UserId, i)];
                            case 5:
                                _a.sent();
                                _a.label = 6;
                            case 6:
                                i++;
                                return [3 /*break*/, 1];
                            case 7:
                                console.log("adminlist1", this.adminListJson1);
                                _a.label = 8;
                            case 8: return [2 /*return*/];
                        }
                    });
                }); }, //ERROR HANDLING
                function (//ERROR HANDLING
                error) {
                    var resErr = JSON.stringify(error);
                    // this.suppliesValue = false;
                });
                return [2 /*return*/];
            });
        });
    };
    MessagePage.prototype.getlastnode = function (instid, adminid, i) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("6." + this.pin + "/chatrooms/" + this.chatType + "/" + this.idVal + "/" + instid + "/" + adminid + "/" + this.userJson.UserId + "/chats ");
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_4_Firebase__["database"]().ref(this.pin + "/chatrooms/" + this.chatType + "/" + this.idVal + "/" + instid + "/" + adminid + "/" + this.userJson.UserId + "/chats").orderByKey().limitToLast(1).on('value', function (resp) {
                                _this.messagelast = [];
                                _this.messagelast = snapshotToArray(resp);
                                if (_this.messagelast[0] != null) {
                                    _this.adminListUnreadMessageCount(instid, adminid, i);
                                    _this.adminListJson1[i]['message'] = _this.messagelast[0]["message"];
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MessagePage.prototype.adminListUnreadMessageCount = function (instid, adminid, i) {
        return __awaiter(this, void 0, void 0, function () {
            var user, countlocal, idDetails, idVal, idValParam, dbCon;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = this.userJson.UserId;
                        countlocal = 0;
                        this.count = 0;
                        idDetails = "";
                        idVal = "";
                        idValParam = "";
                        if (this.chatType == "TechnicalIssues") {
                            idDetails = "ticketid";
                            idVal = this.ticketId;
                            idValParam = this.instid;
                        }
                        else if (this.chatType == "Reservations") {
                            idDetails = "appointmentId";
                            idVal = this.AppointmentId;
                            idValParam = this.instid;
                        }
                        else if (this.chatType == "SuppliesOrder") {
                            idDetails = "orderId";
                            idVal = this.OrderId;
                            idValParam = this.ProviderId;
                        }
                        else if (this.chatType == "SampleSubmission") {
                            idDetails = "WorkOrderId";
                            idVal = this.WorkOrderId;
                            idValParam = this.ProviderId;
                        }
                        console.log("admin unread count " + this.pin + "/chatrooms/" + this.chatType + "/" + this.idVal + "/" + instid + "/" + adminid + "/" + this.userJson.UserId + "/chats");
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_4_Firebase__["database"]().ref(this.pin + "/chatrooms/" + this.chatType + "/" + this.idVal + "/" + instid + "/" + adminid + "/" + this.userJson.UserId + "/chats")];
                    case 1:
                        dbCon = _a.sent();
                        console.log("what got ", this.adminListJson1[i]['unReadMessage']);
                        return [4 /*yield*/, dbCon.once("value", function (snapshot) {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: 
                                            // this.adminListJson1[i]['unReadMessage']=snapshotToArrayCount(resp);
                                            // console.log("what got " ,snapshotToArrayCount(resp));
                                            return [4 /*yield*/, snapshot.forEach(function (child) {
                                                    if (child.val().user != user && child.val().status == "unread") {
                                                        countlocal++;
                                                        console.log(" count added");
                                                        console.log("c local in", countlocal);
                                                        //this.adminListJson1[i]['unReadMessage']=countlocal;
                                                    }
                                                    console.log("c local", countlocal);
                                                    // this.test(this.adminListJson1,i,countlocal);
                                                })];
                                            case 1:
                                                // this.adminListJson1[i]['unReadMessage']=snapshotToArrayCount(resp);
                                                // console.log("what got " ,snapshotToArrayCount(resp));
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            })];
                    case 2:
                        _a.sent();
                        console.log(" count ", countlocal);
                        this.adminListJson1[i]['unReadMessage'] = countlocal;
                        return [2 /*return*/];
                }
            });
        });
    };
    MessagePage.prototype.test = function (adminListJson, i, c) {
        this.adminListJson1[i]['unReadMessage'] = c;
    };
    MessagePage.prototype.usersListUnreadMessageCount = function (instid, adminid, i, userid) {
        return __awaiter(this, void 0, void 0, function () {
            var user, countlocal, idDetails, idVal, idValParam, dbCon;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = this.userJson.UserId;
                        countlocal = 0;
                        this.count = 0;
                        idDetails = "";
                        idVal = "";
                        idValParam = "";
                        if (this.chatType == "TechnicalIssues") {
                            idDetails = "ticketid";
                            idVal = this.ticketId;
                            idValParam = this.instid;
                        }
                        else if (this.chatType == "Reservations") {
                            idDetails = "appointmentId";
                            idVal = this.AppointmentId;
                            idValParam = this.instid;
                        }
                        else if (this.chatType == "SuppliesOrder") {
                            idDetails = "orderId";
                            idVal = this.OrderId;
                            idValParam = this.ProviderId;
                        }
                        else if (this.chatType == "SampleSubmission") {
                            idDetails = "WorkOrderId";
                            idVal = this.WorkOrderId;
                            idValParam = this.ProviderId;
                        }
                        console.log("user unread count " + this.pin + "/chatrooms/" + this.chatType + "/" + idVal + "/" + instid + "/" + adminid + "/" + userid + "/chats");
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_4_Firebase__["database"]().ref(this.pin + "/chatrooms/" + this.chatType + "/" + idVal + "/" + instid + "/" + adminid + "/" + userid + "/chats")];
                    case 1:
                        dbCon = _a.sent();
                        return [4 /*yield*/, dbCon.once("value", function (snapshot) {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                countlocal = 0;
                                                return [4 /*yield*/, snapshot.forEach(function (child) {
                                                        if (child.val().user != user && child.val().status == "unread") {
                                                            countlocal++;
                                                        }
                                                    })];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            })];
                    case 2:
                        _a.sent();
                        this.users[i]['unReadMessage'] = countlocal;
                        return [2 /*return*/];
                }
            });
        });
    };
    MessagePage.prototype.getlastNodeforUserMessages = function (instid, adminid, i, userid) {
        return __awaiter(this, void 0, void 0, function () {
            var idDetails, idVal, idValParam;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idDetails = "";
                        idVal = "";
                        idValParam = "";
                        if (this.chatType == "TechnicalIssues") {
                            idDetails = "ticketid";
                            idVal = this.ticketId;
                            idValParam = this.instid;
                        }
                        else if (this.chatType == "Reservations") {
                            idDetails = "appointmentId";
                            idVal = this.AppointmentId;
                            idValParam = this.instid;
                        }
                        else if (this.chatType == "SuppliesOrder") {
                            idDetails = "orderId";
                            idVal = this.OrderId;
                            idValParam = this.ProviderId;
                        }
                        else if (this.chatType == "SampleSubmission") {
                            idDetails = "WorkOrderId";
                            idVal = this.WorkOrderId;
                            idValParam = this.ProviderId;
                        }
                        console.log(this.pin + "/chatrooms/" + this.chatType + "/" + idVal + "/" + instid + "/" + adminid + "/" + userid + "/chats");
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_4_Firebase__["database"]().ref(this.pin + "/chatrooms/" + this.chatType + "/" + idVal + "/" + instid + "/" + adminid + "/" + userid + "/chats").orderByKey().limitToLast(1).on('value', function (resp) {
                                _this.messagelast = [];
                                _this.messagelast = snapshotToArrayNew(resp);
                                console.log("messagelast", _this.messagelast);
                                if (_this.messagelast[0] != null) {
                                    _this.users[i]["newmessage"] = _this.messagelast[0]["message"];
                                }
                                //return this.messagelast[0]["message"];
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MessagePage.prototype.loadUserList = function (uid) {
        var _this = this;
        var idDetails = "";
        var idVal = "";
        var idValParam = "";
        if (this.chatType == "TechnicalIssues") {
            idDetails = "ticketid";
            idVal = this.ticketId;
            idValParam = this.instid;
        }
        else if (this.chatType == "Reservations") {
            idDetails = "appointmentId";
            idVal = this.AppointmentId;
            idValParam = this.instid;
        }
        else if (this.chatType == "SuppliesOrder") {
            idDetails = "orderId";
            idVal = this.OrderId;
            idValParam = this.ProviderId;
        }
        else if (this.chatType == "SampleSubmission") {
            idDetails = "WorkOrderId";
            idVal = this.WorkOrderId;
            idValParam = this.ProviderId;
        }
        //732/chats
        console.log(this.pin + "/chatrooms/" + this.chatType + "/" + idVal + "/" + this.idValParam + "/" + uid + "/");
        __WEBPACK_IMPORTED_MODULE_4_Firebase__["database"]().ref(this.pin + "/chatrooms/" + this.chatType + "/" + idVal + "/" + this.idValParam + "/" + uid + "/").on('value', function (resp) {
            _this.users = [];
            _this.users = snapshotToArray(resp);
            _this.users.splice(-4, 4);
            console.log("userslist", _this.users);
            var i = 0;
            for (i = 0; i < _this.users.length; i++) {
                _this.getlastNodeforUserMessages(_this.idValParam, uid, i, _this.users[i].userid);
            }
            for (i = 0; i < _this.users.length; i++) {
                _this.usersListUnreadMessageCount(_this.idValParam, uid, i, _this.users[i].userid);
            }
            //console.log("userid userid[0].userid",this.users[0].userid)
            // console.log("users.userid",this.users.userid)
        });
        console.log("users", this.users);
    };
    MessagePage.prototype.gettoken = function () {
        var _this = this;
        this.fcm.getToken().then(function (token) {
            _this.tok = token;
        });
    };
    MessagePage.prototype.getItems = function (searchbar) {
        var _this = this;
        var q = this.searchText;
        if (q == null || q == "") {
            this.isSearchResult = false;
            //this.sendInstrumentRequest("false", true)
            return true;
        }
        this.chatMessageJson = this.users.filter(function (v) {
            if (v.ResourceName && q) {
                if (v.ResourceName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                    //  this.isSearchResult = false
                    return true;
                }
                else if (v.ResourceName.toLowerCase().indexOf(q.toLowerCase()) < -1) {
                    // this.isSearchResult = true
                    _this.chatMessageJson = [];
                }
                return false;
            }
            //   ()
        });
    };
    MessagePage.prototype.testnew = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ref;
            return __generator(this, function (_a) {
                ref = __WEBPACK_IMPORTED_MODULE_4_Firebase__["database"]().ref('54345/chatrooms/SuppliesOrder/');
                ref.once('value').then(function (snapshot) {
                    console.log("length 1 ", snapshot.numChildren());
                    // console.log("length 1 ",snapshot.length());
                    snapshot.forEach(function (data) {
                        console.log("key", data.key);
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    MessagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-message',template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\message\message.html"*/' \n\n<ion-header>\n\n        <ion-navbar>\n\n    <ion-title>Messaging</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list *ngFor="let adminlist of adminListJson1; let i = index;">\n\n    <ion-card-content *ngIf=\'adminlist\'>\n\n      \n\n        <ion-item   *ngIf=\'testtrue\' (click)="detail(adminlist)">\n\n         <ion-avatar item-start>\n\n           <img src="{{adminlist.UserImage}}">\n\n         </ion-avatar>\n\n         <h2>{{adminlist.LastName}} {{adminlist.FirstName}}</h2>\n\n         <h3>{{adminlist.message}}<ion-badge *ngIf="adminlist.unReadMessage > 0" color="primary" style="float:right">{{adminlist.unReadMessage}} </ion-badge></h3>\n\n        \n\n       </ion-item>\n\n    \n\n    </ion-card-content>\n\n  </ion-list>\n\n  <ion-list *ngFor="let userlist of users; let i = index;">\n\n      <ion-card-content >\n\n        \n\n          <ion-item *ngIf=\'!testtrue\'   (click)="detail(userlist)">\n\n           <ion-avatar item-start>\n\n             <img src="{{userlist.UserImage}}">\n\n           </ion-avatar>\n\n           <h2>{{userlist.LastName}} {{userlist.FirstName}}</h2>\n\n           <h3>{{userlist.newmessage}} <ion-badge *ngIf="userlist.unReadMessage > 0" color="primary" style="float:right">{{userlist.unReadMessage}} </ion-badge></h3>\n\n          \n\n         </ion-item>\n\n \n\n      </ion-card-content>\n\n    </ion-list>\n\n \n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\pages\message\message.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_5__providers_fcm_fcm__["a" /* FcmProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], MessagePage);
    return MessagePage;
}());

var snapshotToArray = function (snapshot) {
    var returnArr = [];
    snapshot.forEach(function (childSnapshot) {
        // console.log("length 1 ",childSnapshot.length());
        // console.log("length 2 ",childSnapshot.length;
        var item = childSnapshot.val();
        if (item.type == "image") {
            item.message = "Image";
        }
        // item.key = childSnapshot.key;
        returnArr.push(item);
    });
    return returnArr;
};
var snapshotToArrayNew = function (snapshot) {
    var returnArr = [];
    snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        // item.key = childSnapshot.key;
        console.log("item", item);
        console.log("key", item.key());
        if (item.type == "image") {
            item.message = "Image";
        }
        returnArr.push(item);
    });
    return returnArr;
};
var snapshotToArrayCount = function (snapshot) {
    var returnArr = [];
    var countlocal;
    var user = _this.userJson.UserId;
    snapshot.forEach(function (child) {
        if (child.val().user != user && child.val().status == "unread") {
            countlocal++;
            console.log(" csnap  ount added");
            console.log("csnap  local in", countlocal);
            //this.adminListJson1[i]['unReadMessage']=countlocal;
        }
        console.log("csnap  local", countlocal);
    });
};
//# sourceMappingURL=message.js.map

/***/ }),

/***/ 688:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 324,
	"./af.js": 324,
	"./ar": 325,
	"./ar-dz": 326,
	"./ar-dz.js": 326,
	"./ar-kw": 327,
	"./ar-kw.js": 327,
	"./ar-ly": 328,
	"./ar-ly.js": 328,
	"./ar-ma": 329,
	"./ar-ma.js": 329,
	"./ar-sa": 330,
	"./ar-sa.js": 330,
	"./ar-tn": 331,
	"./ar-tn.js": 331,
	"./ar.js": 325,
	"./az": 332,
	"./az.js": 332,
	"./be": 333,
	"./be.js": 333,
	"./bg": 334,
	"./bg.js": 334,
	"./bm": 335,
	"./bm.js": 335,
	"./bn": 336,
	"./bn.js": 336,
	"./bo": 337,
	"./bo.js": 337,
	"./br": 338,
	"./br.js": 338,
	"./bs": 339,
	"./bs.js": 339,
	"./ca": 340,
	"./ca.js": 340,
	"./cs": 341,
	"./cs.js": 341,
	"./cv": 342,
	"./cv.js": 342,
	"./cy": 343,
	"./cy.js": 343,
	"./da": 344,
	"./da.js": 344,
	"./de": 345,
	"./de-at": 346,
	"./de-at.js": 346,
	"./de-ch": 347,
	"./de-ch.js": 347,
	"./de.js": 345,
	"./dv": 348,
	"./dv.js": 348,
	"./el": 349,
	"./el.js": 349,
	"./en-SG": 350,
	"./en-SG.js": 350,
	"./en-au": 351,
	"./en-au.js": 351,
	"./en-ca": 352,
	"./en-ca.js": 352,
	"./en-gb": 353,
	"./en-gb.js": 353,
	"./en-ie": 354,
	"./en-ie.js": 354,
	"./en-il": 355,
	"./en-il.js": 355,
	"./en-nz": 356,
	"./en-nz.js": 356,
	"./eo": 357,
	"./eo.js": 357,
	"./es": 358,
	"./es-do": 359,
	"./es-do.js": 359,
	"./es-us": 360,
	"./es-us.js": 360,
	"./es.js": 358,
	"./et": 361,
	"./et.js": 361,
	"./eu": 362,
	"./eu.js": 362,
	"./fa": 363,
	"./fa.js": 363,
	"./fi": 364,
	"./fi.js": 364,
	"./fo": 365,
	"./fo.js": 365,
	"./fr": 366,
	"./fr-ca": 367,
	"./fr-ca.js": 367,
	"./fr-ch": 368,
	"./fr-ch.js": 368,
	"./fr.js": 366,
	"./fy": 369,
	"./fy.js": 369,
	"./ga": 370,
	"./ga.js": 370,
	"./gd": 371,
	"./gd.js": 371,
	"./gl": 372,
	"./gl.js": 372,
	"./gom-latn": 373,
	"./gom-latn.js": 373,
	"./gu": 374,
	"./gu.js": 374,
	"./he": 375,
	"./he.js": 375,
	"./hi": 376,
	"./hi.js": 376,
	"./hr": 377,
	"./hr.js": 377,
	"./hu": 378,
	"./hu.js": 378,
	"./hy-am": 379,
	"./hy-am.js": 379,
	"./id": 380,
	"./id.js": 380,
	"./is": 381,
	"./is.js": 381,
	"./it": 382,
	"./it-ch": 383,
	"./it-ch.js": 383,
	"./it.js": 382,
	"./ja": 384,
	"./ja.js": 384,
	"./jv": 385,
	"./jv.js": 385,
	"./ka": 386,
	"./ka.js": 386,
	"./kk": 387,
	"./kk.js": 387,
	"./km": 388,
	"./km.js": 388,
	"./kn": 389,
	"./kn.js": 389,
	"./ko": 390,
	"./ko.js": 390,
	"./ku": 391,
	"./ku.js": 391,
	"./ky": 392,
	"./ky.js": 392,
	"./lb": 393,
	"./lb.js": 393,
	"./lo": 394,
	"./lo.js": 394,
	"./lt": 395,
	"./lt.js": 395,
	"./lv": 396,
	"./lv.js": 396,
	"./me": 397,
	"./me.js": 397,
	"./mi": 398,
	"./mi.js": 398,
	"./mk": 399,
	"./mk.js": 399,
	"./ml": 400,
	"./ml.js": 400,
	"./mn": 401,
	"./mn.js": 401,
	"./mr": 402,
	"./mr.js": 402,
	"./ms": 403,
	"./ms-my": 404,
	"./ms-my.js": 404,
	"./ms.js": 403,
	"./mt": 405,
	"./mt.js": 405,
	"./my": 406,
	"./my.js": 406,
	"./nb": 407,
	"./nb.js": 407,
	"./ne": 408,
	"./ne.js": 408,
	"./nl": 409,
	"./nl-be": 410,
	"./nl-be.js": 410,
	"./nl.js": 409,
	"./nn": 411,
	"./nn.js": 411,
	"./pa-in": 412,
	"./pa-in.js": 412,
	"./pl": 413,
	"./pl.js": 413,
	"./pt": 414,
	"./pt-br": 415,
	"./pt-br.js": 415,
	"./pt.js": 414,
	"./ro": 416,
	"./ro.js": 416,
	"./ru": 417,
	"./ru.js": 417,
	"./sd": 418,
	"./sd.js": 418,
	"./se": 419,
	"./se.js": 419,
	"./si": 420,
	"./si.js": 420,
	"./sk": 421,
	"./sk.js": 421,
	"./sl": 422,
	"./sl.js": 422,
	"./sq": 423,
	"./sq.js": 423,
	"./sr": 424,
	"./sr-cyrl": 425,
	"./sr-cyrl.js": 425,
	"./sr.js": 424,
	"./ss": 426,
	"./ss.js": 426,
	"./sv": 427,
	"./sv.js": 427,
	"./sw": 428,
	"./sw.js": 428,
	"./ta": 429,
	"./ta.js": 429,
	"./te": 430,
	"./te.js": 430,
	"./tet": 431,
	"./tet.js": 431,
	"./tg": 432,
	"./tg.js": 432,
	"./th": 433,
	"./th.js": 433,
	"./tl-ph": 434,
	"./tl-ph.js": 434,
	"./tlh": 435,
	"./tlh.js": 435,
	"./tr": 436,
	"./tr.js": 436,
	"./tzl": 437,
	"./tzl.js": 437,
	"./tzm": 438,
	"./tzm-latn": 439,
	"./tzm-latn.js": 439,
	"./tzm.js": 438,
	"./ug-cn": 440,
	"./ug-cn.js": 440,
	"./uk": 441,
	"./uk.js": 441,
	"./ur": 442,
	"./ur.js": 442,
	"./uz": 443,
	"./uz-latn": 444,
	"./uz-latn.js": 444,
	"./uz.js": 443,
	"./vi": 445,
	"./vi.js": 445,
	"./x-pseudo": 446,
	"./x-pseudo.js": 446,
	"./yo": 447,
	"./yo.js": 447,
	"./zh-cn": 448,
	"./zh-cn.js": 448,
	"./zh-hk": 449,
	"./zh-hk.js": 449,
	"./zh-tw": 450,
	"./zh-tw.js": 450
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 688;

/***/ }),

/***/ 805:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar_ngx__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_home_home__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_keyboard_ngx__ = __webpack_require__(533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase__ = __webpack_require__(808);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_image_loader__ = __webpack_require__(227);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var config = {
    apiKey: "AIzaSyCRDymxcDEMORc4U1TjW5_SKiB22G45buM",
    authDomain: "sopaa-b37c1.firebaseapp.com",
    databaseURL: "https://sopaa-b37c1.firebaseio.com",
    projectId: "sopaa-b37c1",
    storageBucket: "sopaa-b37c1.appspot.com",
    messagingSenderId: "500138839182"
};
var MyApp = /** @class */ (function () {
    function MyApp(zone, splashScreen, imageLoaderConfig, keyboard, platform, statusBar, toastCtrl, app, network, alertCtrl) {
        var _this = this;
        this.zone = zone;
        this.splashScreen = splashScreen;
        this.imageLoaderConfig = imageLoaderConfig;
        this.keyboard = keyboard;
        this.platform = platform;
        this.statusBar = statusBar;
        this.toastCtrl = toastCtrl;
        this.app = app;
        this.network = network;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_3__pages_home_home__["a" /* HomePage */];
        this.showSplash = true;
        this.counter = 0;
        this.isOffline = false;
        this.showOffline = true;
        this.checkConnection();
        this.checkDisconnection();
        platform.ready().then(function () {
            //this.hideSplashScreen(); 
            statusBar.styleDefault();
            setTimeout(function () {
                splashScreen.hide();
            }, 8000);
            //this.imageLoaderConfig.enableDebugMode();
            //this.imageLoaderConfig.enableFallbackAsPlaceholder(true);
            //  this.imageLoaderConfig.enableSpinner(false);
            //this.imageLoaderConfig.setFallbackUrl('assets/imgs/chatImage.gif'); 
            _this.imageLoaderConfig.enableSpinner(true);
            _this.imageLoaderConfig.setFallbackUrl('assets/imgs/chatImage.gif');
            platform.registerBackButtonAction(function () {
                if (_this.counter == 0) {
                    _this.counter++;
                    setTimeout(function () { _this.counter = 0; }, 2000);
                }
                else {
                    platform.exitApp();
                }
            }, 0);
        });
    }
    MyApp.prototype.hideSplashScreen = function () {
        var _this = this;
        setTimeout(function () {
            _this.splashScreen.hide();
        }, 5000);
    };
    MyApp.prototype.checkDisconnection = function () {
        var _this = this;
        var disconnectSubscription = this.network.onDisconnect().subscribe(function () {
            _this.zone.run(function () {
                _this.isOffline = true;
                _this.showOffline = false;
            });
            _this.checkConnection();
            disconnectSubscription.unsubscribe();
        });
    };
    MyApp.prototype.checkConnection = function () {
        var _this = this;
        var connectSubscription = this.network.onConnect().subscribe(function () {
            _this.checkDisconnection();
            _this.zone.run(function () {
                _this.isOffline = false;
                _this.showOffline = true;
            });
            connectSubscription.unsubscribe();
        });
        __WEBPACK_IMPORTED_MODULE_7_firebase__["initializeApp"](config);
    };
    MyApp.prototype.initializeApp = function () {
    };
    MyApp.prototype.isConnected = function () {
        var conntype = this.network.type;
        return conntype && conntype !== 'unknown' && conntype !== 'none';
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\app\app.html"*/'\n\n<offline [hidden]=showOffline></offline>\n\n\n\n<ion-nav [root]="rootPage" [hidden]="isOffline "></ion-nav>\n\n'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_8_ionic_image_loader__["a" /* ImageLoaderConfig */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_keyboard_ngx__["a" /* Keyboard */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar_ngx__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 816:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pin_pin__ = __webpack_require__(817);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__offline_offline__ = __webpack_require__(818);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [__WEBPACK_IMPORTED_MODULE_2__pin_pin__["a" /* PinComponent */], __WEBPACK_IMPORTED_MODULE_3__offline_offline__["a" /* OfflineComponent */]],
            imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__pin_pin__["a" /* PinComponent */], __WEBPACK_IMPORTED_MODULE_3__offline_offline__["a" /* OfflineComponent */]]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 817:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PinComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
 * Generated class for the PinComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var PinComponent = /** @class */ (function () {
    function PinComponent() {
        this.pagetitle = "Enter Pin";
        this.pin = "";
        this.change = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.text = 'Hello World';
    }
    PinComponent.prototype.emitEvent = function () {
        this.change.emit(this.pin);
    };
    PinComponent.prototype.handleInput = function (pin) {
        if (pin === "clear") {
            this.pin = "";
            return;
        }
        if (this.pin.length === 5) {
            return;
        }
        this.pin += pin;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], PinComponent.prototype, "pagetitle", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], PinComponent.prototype, "change", void 0);
    PinComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "custom-pin",template:/*ion-inline-start:"C:\Users\Admin\Desktop\Chat App Abey\src\components\pin\pin.html"*/'<ion-content padding>\n\n  <h6 text-center margin-vertical>{{ pagetitle }}</h6>\n\n  <div text-center large margin-vertical>\n\n    <ion-icon [name]="pin.length>0 ? \'radio-button-on\' : \'radio-button-off\'"></ion-icon> &nbsp;\n\n    <ion-icon [name]="pin.length>1 ? \'radio-button-on\' : \'radio-button-off\'"></ion-icon> &nbsp;\n\n    <ion-icon [name]="pin.length>2 ? \'radio-button-on\' : \'radio-button-off\'"></ion-icon> &nbsp;\n\n    <ion-icon [name]="pin.length>3 ? \'radio-button-on\' : \'radio-button-off\'"></ion-icon> &nbsp;\n\n    <ion-icon [name]="pin.length>4 ? \'radio-button-on\' : \'radio-button-off\'"></ion-icon> &nbsp;\n\n  </div>\n\n\n\n  <div>\n\n    <ion-grid text-center>\n\n      <ion-row>\n\n        <ion-col>\n\n          <button ion-button round large outline (click)="handleInput(\'1\')">1</button>\n\n        </ion-col>\n\n        <ion-col>\n\n          <button ion-button round large outline (click)="handleInput(\'2\')">2</button>\n\n        </ion-col>\n\n        <ion-col>\n\n          <button ion-button round large outline (click)="handleInput(\'3\')">3</button>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col>\n\n          <button ion-button round large outline (click)="handleInput(\'4\')">4</button>\n\n        </ion-col>\n\n        <ion-col>\n\n          <button ion-button round large outline (click)="handleInput(\'5\')">5</button>\n\n        </ion-col>\n\n        <ion-col>\n\n          <button ion-button round large outline (click)="handleInput(\'6\')">6</button>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col>\n\n          <button ion-button round large outline (click)="handleInput(\'7\')">7</button>\n\n        </ion-col>\n\n        <ion-col>\n\n          <button ion-button round large outline (click)="handleInput(\'8\')">8</button>\n\n        </ion-col>\n\n        <ion-col>\n\n          <button ion-button round large outline (click)="handleInput(\'9\')">9</button>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col>\n\n\n\n        </ion-col>\n\n        <ion-col>\n\n          <button ion-button round large outline (click)="handleInput(\'0\')">0</button>\n\n        </ion-col>\n\n        <ion-col>\n\n\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col>\n\n          <button ion-button clear large no-padding (click)="handleInput(\'clear\')">Clear</button>\n\n        </ion-col>\n\n        <ion-col>\n\n\n\n        </ion-col>\n\n        <ion-col>\n\n          <button ion-button clear large (click)="emitEvent()">OK</button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Admin\Desktop\Chat App Abey\src\components\pin\pin.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], PinComponent);
    return PinComponent;
}());

//# sourceMappingURL=pin.js.map

/***/ }),

/***/ 818:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OfflineComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/* Created by Abey Abraham */
//import { AppConst } from './../../providers/strings';

/**
 * Generated class for the OfflineComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var OfflineComponent = /** @class */ (function () {
    function OfflineComponent() {
        this.offline = "assets/icon/ie.png";
    }
    OfflineComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'offline',
            template: "  <ion-content padding class=\"login\">\n                <ion-list style=\"text-align:center\">\n                <img class=\"ionImage\" [src]=\"offline\">\n                <hr>\n                \n                <h3>WHOOPS!</h3>\n                <h5>Slow or no internet connection.</h5>\n                <h5>Please check your internet setting.</h5>\n                </ion-list>\n              \n              </ion-content>"
        }),
        __metadata("design:paramtypes", [])
    ], OfflineComponent);
    return OfflineComponent;
}());

//# sourceMappingURL=offline.js.map

/***/ }),

/***/ 819:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequesturlsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the RequesturlsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var RequesturlsProvider = /** @class */ (function () {
    function RequesturlsProvider(http) {
        this.http = http;
    }
    RequesturlsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], RequesturlsProvider);
    return RequesturlsProvider;
}());

//# sourceMappingURL=requesturls.js.map

/***/ }),

/***/ 820:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DynamoDbProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the DynamoDbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DynamoDbProvider = /** @class */ (function () {
    function DynamoDbProvider(http) {
        this.http = http;
        console.log('Hello DynamoDbProvider Provider');
        this.documentClient = new AWS.DynamoDbProvider.DocumentClient();
    }
    DynamoDbProvider.prototype.getDocumentClient = function () {
        return this.documentClient;
    };
    DynamoDbProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], DynamoDbProvider);
    return DynamoDbProvider;
}());

//# sourceMappingURL=dynamo-db.js.map

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FcmProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_firebase__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//import { HttpClient } from '@angular/common/http';



//import { AngularFirestore } from 'angularfire2/firestore';

/*
  Generated class for the FcmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var FcmProvider = /** @class */ (function () {
    function FcmProvider(firebaseNative, 
    //public afs: AngularFirestore,
    platform, alertCtrl) {
        this.firebaseNative = firebaseNative;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
    }
    FcmProvider.prototype.getToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.platform.is('android')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.firebaseNative.getToken()];
                    case 1:
                        token = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!this.platform.is('ios')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.firebaseNative.getToken()];
                    case 3:
                        token = _a.sent();
                        return [4 /*yield*/, this.firebaseNative.grantPermission()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, token];
                }
            });
        });
    };
    FcmProvider.prototype.onTokenRefresh = function () {
        var token;
        if (this.platform.is('android')) {
            token = this.firebaseNative.onTokenRefresh();
        }
        if (this.platform.is('ios')) {
            token = this.firebaseNative.onTokenRefresh();
            this.firebaseNative.grantPermission();
        }
        return token;
    };
    FcmProvider.prototype.listenToNotifications = function () {
        return this.firebaseNative.onNotificationOpen();
    };
    FcmProvider.prototype.alert = function (toastStr) {
        var alert = this.alertCtrl.create({
            title: 'Alert',
            message: toastStr,
            buttons: ['OK']
        });
        alert.present();
    };
    FcmProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_firebase__["a" /* Firebase */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */]])
    ], FcmProvider);
    return FcmProvider;
}());

//# sourceMappingURL=fcm.js.map

/***/ })

},[550]);
//# sourceMappingURL=main.js.map