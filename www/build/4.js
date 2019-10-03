webpackJsonp([4],{

/***/ 843:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatContentPageModule", function() { return ChatContentPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chat_content__ = __webpack_require__(868);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_image_loader__ = __webpack_require__(227);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



//import { ImageLoaderConfig } from 'ionic-image-loader';

var ChatContentPageModule = /** @class */ (function () {
    function ChatContentPageModule() {
    }
    ChatContentPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__chat_content__["a" /* ChatContentPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__chat_content__["a" /* ChatContentPage */]),
                __WEBPACK_IMPORTED_MODULE_3_ionic_image_loader__["b" /* IonicImageLoader */]
            ],
        })
    ], ChatContentPageModule);
    return ChatContentPageModule;
}());

//# sourceMappingURL=chat-content.module.js.map

/***/ }),

/***/ 868:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatContentPage; });
/* unused harmony export snapshotToArray */
/* unused harmony export snapshotToArrayNew */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Firebase__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_Firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_fire_storage__ = __webpack_require__(548);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(7);
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
 * Generated class for the ChatContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChatContentPage = /** @class */ (function () {
    function ChatContentPage(http, navCtrl, navParams, storage, storageimage, camera) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.storageimage = storageimage;
        this.camera = camera;
        this.data = { type: '', nickname: '', message: '' };
        this.chats = [];
        this.offStatus = false;
        this.chat = [];
        this.questions = [];
        this.answer = [];
        this.myPhotosRef = __WEBPACK_IMPORTED_MODULE_2_Firebase__["storage"]().ref('/Photos/');
    }
    ChatContentPage.prototype.ionViewDidLeave = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user_1, dbCon, user_2, dbCon;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.role == "providerAdmin" || this.role == "admin" || this.role == "super")) return [3 /*break*/, 2];
                        user_1 = this.userJson.UserId;
                        console.log("user", user_1);
                        console.log(" cc 1 when leave    " + this.pins + "/chatrooms/" + this.chatType + "/" + this.idVal + "/" + this.instid + "/" + this.adminid + "/" + this.useridFrom + "/chats");
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_2_Firebase__["database"]().ref(this.pins + "/chatrooms/" + this.chatType + "/" + this.idVal + "/" + this.instid + "/" + this.adminid + "/" + this.useridFrom + "/chats")];
                    case 1:
                        dbCon = _a.sent();
                        dbCon.once("value", function (snapshot) {
                            console.log("snapshot", snapshot);
                            snapshot.forEach(function (child) {
                                //console.log("snap",child.val().user);
                                console.log("child and user", child.val().user, user_1);
                                if (child.val().user != user_1)
                                    child.ref.update({
                                        status: 'read'
                                    });
                            });
                        });
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(this.role == "user" || this.role == "labAdmin")) return [3 /*break*/, 4];
                        user_2 = this.userJson.UserId;
                        console.log("cc3 when leaved " + this.pins + "/chatrooms/" + this.chatType + "/" + this.idVal + "/" + this.instid + "/" + this.adminid + "/" + this.userJson.UserId + "/chats");
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_2_Firebase__["database"]().ref(this.pins + "/chatrooms/" + this.chatType + "/" + this.idVal + "/" + this.instid + "/" + this.adminid + "/" + this.userJson.UserId + "/chats")];
                    case 3:
                        dbCon = _a.sent();
                        dbCon.once("value", function (snapshot) {
                            //console.log("snapshot",snapshot);
                            snapshot.forEach(function (child) {
                                //console.log("snap",child.val().user);
                                // console.log("child and user",child.val().user,user)
                                if (child.val().user != user_2)
                                    child.ref.update({
                                        status: 'read'
                                    });
                            });
                        });
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ChatContentPage.prototype.ionViewDidLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user_3, dbCon, user_4, dbCon;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get('userDetails').then(function (val1) {
                            _this.userJson = val1;
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.storage.get('appLink').then(function (val) {
                                _this.appUrl = val;
                                _this.getUserDetails = _this.appUrl + '/WS/IdeaElanService.svc/GetAdminByEntity';
                                _this.getFacilitiesTechnicalIssueUrl = _this.appUrl + '/WS/IdeaElanService.svc/GetTechnicalIssues';
                            })];
                    case 2:
                        _a.sent();
                        console.log("userjson", this.userJson.UserId);
                        this.adminid = this.navParams.get("adminid");
                        this.instid = this.navParams.get("instrumentid");
                        this.useridFrom = this.navParams.get("userid");
                        this.pins = this.navParams.get("pin");
                        this.role = this.navParams.get("role");
                        this.ticketId = this.navParams.get("ticketid");
                        this.senderName = this.navParams.get("senderName");
                        this.source = this.navParams.get("source");
                        this.chatType = this.navParams.get("chatType");
                        this.OrderId = this.navParams.get("OrderId");
                        this.ProviderId = this.navParams.get("ProviderId");
                        this.WorkOrderId = this.navParams.get("WorkOrderId");
                        console.log("userid ", this.useridFrom);
                        //this.userEmail=this.navParams.get("userEmail");
                        if (this.useridFrom != null) {
                            if (this.role == "providerAdmin" || this.role == "admin" || this.role == "super") {
                                this.loadUserDetails(this.useridFrom, 5);
                            }
                        }
                        console.log("ticket id , instid from chat content page ", this.ticketId, this.instid);
                        console.log("admin", this.adminid);
                        console.log("instrumentid", this.instid);
                        console.log("typeofchat", this.chatType);
                        console.log("ORDER ID", this.OrderId);
                        console.log("provider id ", this.ProviderId);
                        this.AppointmentIdGot = this.navParams.get("AppointmentId");
                        this.roomkey = this.navParams.get("key");
                        this.nickname = this.userJson.UserId;
                        this.roomname = this.instid;
                        console.log("roomname", this.roomname);
                        this.data.type = 'message';
                        this.data.nickname = this.userJson.UserId;
                        this.data.message = '';
                        setTimeout(function () { _this.content.scrollToBottom(); }, 200);
                        console.log("appointment id chat content page", this.AppointmentIdGot);
                        this.idDetails = "";
                        this.idVal = "";
                        if (this.chatType == "TechnicalIssues") {
                            this.idDetails = "ticketid";
                            this.idVal = this.ticketId;
                            this.idValParam = this.instid;
                            this.getAllIssues();
                        }
                        else if (this.chatType == "Reservations") {
                            this.idDetails = "appointmentId";
                            this.idVal = this.AppointmentIdGot;
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
                        if (!(this.role == "providerAdmin" || this.role == "admin" || this.role == "super")) return [3 /*break*/, 4];
                        user_3 = this.userJson.UserId;
                        console.log("user", user_3);
                        console.log(" cc 1 " + this.pins + "/chatrooms/" + this.chatType + "/" + this.idVal + "/" + this.idValParam + "/" + this.adminid + "/" + this.useridFrom + "/chats");
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_2_Firebase__["database"]().ref(this.pins + "/chatrooms/" + this.chatType + "/" + this.idVal + "/" + this.idValParam + "/" + this.adminid + "/" + this.useridFrom + "/chats")];
                    case 3:
                        dbCon = _a.sent();
                        dbCon.once("value", function (snapshot) {
                            console.log("snapshot", snapshot);
                            snapshot.forEach(function (child) {
                                //console.log("snap",child.val().user);
                                console.log("child and user", child.val().user, user_3);
                                if (child.val().user != user_3)
                                    child.ref.update({
                                        status: 'read'
                                    });
                            });
                        }).then(function () { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.log("cc 2 " + this.pins + "/chatrooms/" + this.chatType + "/" + this.idVal + "/" + this.idValParam + "/" + this.adminid + "/" + this.useridFrom + "/chats");
                                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_2_Firebase__["database"]().ref(this.pins + "/chatrooms/" + this.chatType + "/" + this.idVal + "/" + this.idValParam + "/" + this.adminid + "/" + this.useridFrom + "/chats").on('value', function (resp) {
                                                _this.chats = [];
                                                _this.chats = snapshotToArray(resp);
                                                console.log("chats123456", _this.chats);
                                                setTimeout(function () {
                                                    if (_this.offStatus === false) {
                                                        // this.content.scrollToBottom(300);
                                                    }
                                                }, 1000);
                                            })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [3 /*break*/, 6];
                    case 4:
                        if (!(this.role == "user" || this.role == "labAdmin")) return [3 /*break*/, 6];
                        user_4 = this.userJson.UserId;
                        // console.log("user",user);
                        //  console.log(`${this.pins}/chatrooms/TechnicalIssues/${this.ticketId}/${this.instid}/${this.adminid}/${this.userJson.UserId}/chats`);
                        console.log("cc3 " + this.pins + "/chatrooms/" + this.chatType + "/" + this.idVal + "/" + this.idValParam + "/" + this.adminid + "/" + this.userJson.UserId + "/chats");
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_2_Firebase__["database"]().ref(this.pins + "/chatrooms/" + this.chatType + "/" + this.idVal + "/" + this.idValParam + "/" + this.adminid + "/" + this.userJson.UserId + "/chats")];
                    case 5:
                        dbCon = _a.sent();
                        dbCon.once("value", function (snapshot) {
                            //console.log("snapshot",snapshot);
                            snapshot.forEach(function (child) {
                                //console.log("snap",child.val().user);
                                // console.log("child and user",child.val().user,user)
                                if (child.val().user != user_4)
                                    child.ref.update({
                                        status: 'read'
                                    });
                            });
                        }).then(function () { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.log("cc4 " + this.pins + "/chatrooms/" + this.chatType + "/" + this.idVal + "/" + this.idValParam + "/" + this.adminid + "/" + this.userJson.UserId + "/chats");
                                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_2_Firebase__["database"]().ref(this.pins + "/chatrooms/" + this.chatType + "/" + this.idVal + "/" + this.idValParam + "/" + this.adminid + "/" + this.userJson.UserId + "/chats").on('value', function (resp) {
                                                _this.chats = [];
                                                _this.chats = snapshotToArray(resp);
                                                //console.log("chats123456 user",this.chats);
                                                setTimeout(function () {
                                                    if (_this.offStatus === false) {
                                                    }
                                                }, 1000);
                                            })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.loadAdminImage();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ChatContentPage.prototype.getAllIssues = function () {
        var _this = this;
        console.log("ticket id", this.ticketId);
        this.http.post(this.getFacilitiesTechnicalIssueUrl, {
            userid: this.userJson.UserId,
            usertoken: this.userJson.UserToken,
            paramname: "UserId",
            paramvalue: this.userJson.UserId
        })
            .subscribe(function (data) {
            //RESPONSE
            var filteredJson;
            var resSTR = JSON.stringify(data);
            var resJSON = JSON.parse(resSTR);
            _this.userFacilitiesTechnicalIssuesJson = resJSON;
            console.log("test", _this.userFacilitiesTechnicalIssuesJson);
            if (_this.userFacilitiesTechnicalIssuesJson != null) {
                _this.filteredJson = _this.userFacilitiesTechnicalIssuesJson.filter(function (i) { return i.TicketId == _this.ticketId; });
                console.log("test", _this.filteredJson);
            }
            for (var i = 0; i < _this.userFacilitiesTechnicalIssuesJson.length; i++) {
                if (_this.userFacilitiesTechnicalIssuesJson[i]["TicketId"] == _this.ticketId) {
                    _this.filteredJson = _this.userFacilitiesTechnicalIssuesJson[i];
                    _this.filteredJson = JSON.parse(JSON.stringify(_this.filteredJson));
                    console.log("demo", _this.filteredJson.Description);
                }
            }
            // 
            //loader.dismiss();
            console.log("filteredjson", _this.filteredJson);
        }, //ERROR HANDLING
        function (//ERROR HANDLING
        error) {
        });
    };
    ChatContentPage.prototype.sendMessage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newData, newData;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.data.message.replace(/\s/g, '').length) return [3 /*break*/, 3];
                        console.log('string only contains whitespace (ie. spaces, tabs or line breaks)');
                        if (!(this.role == "providerAdmin" || this.role == "admin" || this.role == "super")) return [3 /*break*/, 2];
                        console.log(" cc5 " + this.pins + "/chatrooms/" + this.chatType + "/" + this.idVal + "/" + this.idValParam + "/" + this.adminid + "/" + this.useridFrom + "/chats");
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_2_Firebase__["database"]().ref(this.pins + "/chatrooms/" + this.chatType + "/" + this.idVal + "/" + this.idValParam + "/" + this.adminid + "/" + this.useridFrom + "/chats").push()];
                    case 1:
                        newData = _a.sent();
                        newData.set({
                            type: this.data.type,
                            user: this.data.nickname,
                            message: this.data.message,
                            sendDate: Date(),
                            status: 'unread'
                        });
                        this.data.message = '';
                        return [3 /*break*/, 3];
                    case 2:
                        if (this.role == "user" || this.role == "labAdmin") {
                            console.log(" cc 6" + this.pins + "/chatrooms/" + this.chatType + "/" + this.idVal + "/" + this.idValParam + "/" + this.adminid + "/" + this.userJson.UserId + "/chats");
                            newData = __WEBPACK_IMPORTED_MODULE_2_Firebase__["database"]().ref(this.pins + "/chatrooms/" + this.chatType + "/" + this.idVal + "/" + this.idValParam + "/" + this.adminid + "/" + this.userJson.UserId + "/chats").push();
                            newData.set({
                                type: this.data.type,
                                user: this.data.nickname,
                                message: this.data.message,
                                sendDate: Date(),
                                status: 'unread'
                            });
                            this.data.message = '';
                        }
                        _a.label = 3;
                    case 3:
                        // this.data.message = '';
                        setTimeout(function () { _this.content.scrollToBottom(); }, 200);
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatContentPage.prototype.sendMessages = function (updateduri) {
        return __awaiter(this, void 0, void 0, function () {
            var newData, newData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /*
                        let idDetails="";
                        let idVal=""
                          if(this.chatType=="TechnicalIssues")
                          {
                            idDetails="ticketid"
                             idVal=this.ticketId
                          }
                          else if(this.chatType=="Reservations")
                          {
                            idDetails="appointmentId"
                             idVal=this.AppointmentIdGot
                          }
                    */
                        //alert(`${updateduri}`)
                        console.log("adminid", this.adminid);
                        console.log("userid", this.userid);
                        if (!(this.role == "providerAdmin" || this.role == "admin" || this.role == "super")) return [3 /*break*/, 2];
                        console.log(" cc 7" + this.pins + "/chatrooms/" + this.chatType + "/" + this.idVal + "/" + this.idValParam + "/" + this.adminid + "/" + this.useridFrom + "/chats");
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_2_Firebase__["database"]().ref(this.pins + "/chatrooms/" + this.chatType + "/" + this.idVal + "/" + this.idValParam + "/" + this.adminid + "/" + this.useridFrom + "/chats").push()];
                    case 1:
                        newData = _a.sent();
                        newData.set({
                            type: 'image',
                            user: this.data.nickname,
                            message: updateduri,
                            sendDate: Date(),
                            status: 'unread'
                        });
                        this.data.message = '';
                        return [3 /*break*/, 3];
                    case 2:
                        if (this.role == "user" || this.role == "labAdmin") {
                            console.log(" cc 8" + this.pins + "/chatrooms/" + this.chatType + "/" + this.idVal + "/" + this.idValParam + "/" + this.adminid + "/" + this.userJson.UserId + "/chats");
                            newData = __WEBPACK_IMPORTED_MODULE_2_Firebase__["database"]().ref(this.pins + "/chatrooms/" + this.chatType + "/" + this.idVal + "/" + this.idValParam + "/" + this.adminid + "/" + this.userJson.UserId + "/chats").push();
                            newData.set({
                                type: 'image',
                                user: this.data.nickname,
                                message: updateduri,
                                sendDate: Date(),
                                status: 'unread'
                            });
                            this.data.message = '';
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ChatContentPage.prototype.adduserid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ref;
            return __generator(this, function (_a) {
                /*
                let idDetails="";
              let idVal=""
                if(this.chatType=="TechnicalIssues")
                {
                  idDetails="ticketid"
                   idVal=this.ticketId
                }
                else if(this.chatType=="Reservations")
                {
                  idDetails="appointmentId"
                   idVal=this.AppointmentIdGot
                }
                */
                console.log(" cc 9" + this.pins + "/chatrooms/" + this.chatType + "/" + this.idVal + "/" + this.idValParam + "/" + this.adminid + "/");
                ref = __WEBPACK_IMPORTED_MODULE_2_Firebase__["database"]().ref(this.pins + "/chatrooms/" + this.chatType + "/" + this.idVal + "/" + this.idValParam + "/" + this.adminid + "/");
                ref.child("" + this.curuser).set({
                    userid: "" + this.curuser
                });
                return [2 /*return*/, 0];
            });
        });
    };
    ChatContentPage.prototype.loadAdminImage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /*
                        let idDetails="";
                        let idVal=""
                          if(this.chatType=="TechnicalIssues")
                          {
                            idDetails="ticketid"
                             idVal=this.ticketId
                          }
                          else if(this.chatType=="Reservations")
                          {
                            idDetails="appointmentId"
                             idVal=this.AppointmentIdGot
                          }
                          */
                        console.log("cc 10 " + this.pins + "/chatrooms/" + this.chatType + "/" + this.idVal + "/" + this.idValParam + "/" + this.adminid);
                        // console.log(`chatrooms/${this.instid}/${this.adminid}`);
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_2_Firebase__["database"]().ref(this.pins + "/chatrooms/" + this.chatType + "/" + this.idVal + "/" + this.idValParam + "/" + this.adminid).on('value', function (resp) {
                                _this.imageContent = [];
                                _this.imageContent = snapshotToArrayNew(resp);
                                console.log("imagecontent", _this.imageContent);
                            })];
                    case 1:
                        // console.log(`chatrooms/${this.instid}/${this.adminid}`);
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatContentPage.prototype.exitChat = function () {
        this.offStatus = true;
        this.navCtrl.pop();
    };
    ChatContentPage.prototype.uploadHandler = function () {
        return __awaiter(this, void 0, void 0, function () {
            var base64;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.changeimage()];
                    case 1:
                        base64 = _a.sent();
                        this.createUploadTask(base64);
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatContentPage.prototype.changeimage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {
                            quality: 100,
                            destinationType: this.camera.DestinationType.DATA_URL,
                            encodingType: this.camera.EncodingType.JPEG,
                            mediaType: this.camera.MediaType.PICTURE,
                            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                            saveToPhotoAlbum: false
                        };
                        return [4 /*yield*/, this.camera.getPicture(options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ChatContentPage.prototype.createUploadTask = function (file) {
        var _this = this;
        this.image = 'data:image/jpg;base64,' + file;
        this.uri = this.image;
        var picture = "chats_ideaelan/images/" + this.userJson.UserId + "/" + Math.floor(Date.now() / 1000);
        this.storageimage.ref(picture).putString(this.image, 'data_url').then(function () {
            _this.storageimage.ref(picture).getDownloadURL().subscribe(function (url) {
                var Url = url;
                _this.url = Url;
                _this.sendMessages(_this.url);
            });
        });
    };
    ChatContentPage.prototype.loadUserDetails = function (instid, num) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.getUserDetails + ("/" + instid + "," + num + "," + this.userJson.UserId + "," + this.userJson.UserToken))
                            .subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
                            var resSTR, resJSON;
                            return __generator(this, function (_a) {
                                resSTR = JSON.stringify(data);
                                resJSON = JSON.parse(resSTR);
                                console.log("user id details ", resJSON);
                                this.userChatJson = resJSON;
                                //this.userChatJson=this.userChatJson;
                                this.senderName = this.userChatJson[0].LastName + " " + this.userChatJson[0].FirstName;
                                console.log("sendername ", this.senderName);
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
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('content'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], ChatContentPage.prototype, "content", void 0);
    ChatContentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-chat-content',template:/*ion-inline-start:"F:\abey_new_mobile_app\src\pages\chat-content\chat-content.html"*/'\n<ion-header>\n  <ion-navbar>\n    <ion-title>\n     {{source}}\n    </ion-title>\n   \n  </ion-navbar>\n</ion-header>\n\n<ion-content #content>\n  <ion-list>\n      <div>\n          <ion-card >\n          <div class="cardsubheading">Resource : {{filteredJson?.Source }}</div>\n          <div class="cardsubtext"> Created Date : {{filteredJson?.strCreatedDate }}</div>\n          <div class="cardsubtext"> Status : {{filteredJson?.Status }}</div>\n          </ion-card>\n    </div>\n    <ion-item *ngFor="let chat of chats" no-lines>\n      <div class="chat-status" text-center *ngIf="chat.type===\'join\'||chat.type===\'exit\';else message">\n        <span class="chat-date">{{chat.sendDate | date:\'short\'}}</span>\n        <span class="chat-content-center">{{chat.message}}</span>\n      </div>\n      <ng-template #message>\n        <div class="chat-message" text-right *ngIf="chat.user === nickname  ">\n          <div class="right-bubble" *ngIf="chat.type===\'message\'">\n            <span class="msg-name">Me</span>\n            <span class="msg-date">  {{chat.sendDate | date:\'short\'}}</span>\n            <p text-wrap>{{chat.message}}</p>\n          </div>\n          <div class="right-bubble" *ngIf="chat.type===\'image\'">\n              <!--  <img-loader src="{{chat.message}}" useImg></img-loader></h6> -->\n              <img src="{{chat.message}}">\n            \n          </div>\n        </div>\n        <div class="chat-message" text-left *ngIf="chat.user !== nickname ">\n          <div class="left-bubble" *ngIf=" chat.type===\'message\'">\n            <span class="msg-name"> {{this.senderName}}</span>\n            <span class="msg-date">   {{chat.sendDate | date:\'short\'}}</span>\n            <p text-wrap>{{chat.message}}</p>\n          </div>\n          <div class="left-bubble" *ngIf="chat.type===\'image\'">\n              <!--  <img-loader src="{{chat.message}}" useImg></img-loader> -->\n              <img src="{{chat.message}}">\n            \n          </div>\n        </div>\n      </ng-template>\n    </ion-item>\n  </ion-list>\n</ion-content>\n<ion-footer>\n  <ion-grid>\n    <ion-row>\n      <ion-col col-10>\n        <ion-input type="text" placeholder="Type a message" [(ngModel)]="data.message" name="message"></ion-input>\n      </ion-col>\n      <ion-col col-2 (click)="sendMessage()">\n        <ion-icon name="paper-plane"></ion-icon>\n      </ion-col>\n      <ion-col col-2 (click)="uploadHandler()">\n          <ion-icon name="add"></ion-icon>\n        </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-footer>\n\n<!-- \n<ion-header >\n\n  <ion-navbar>\n    <button ion-button icon-only menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title ion-align=\'center\'>Cary Thomas </ion-title>\n  </ion-navbar>\n\n</ion-header>\n<ion-content >\n \n\n\n      <div class="chats">\n          <div class="chatbox">\n            <div *ngFor="let chat of chat">\n              <div class="message sent" *ngIf="chat.question!=\'\' && chat.question!=null">\n                  <ion-item >\n                      <ion-avatar item-start>\n                        <img src="assets/imgs/4.jpg">\n                      </ion-avatar>\n                      <b >Cary Thomas </b>\n                      <br>\n               \n                  </ion-item>\n                  {{chat.question}}\n                \n              </div>\n              <div class="message received"  *ngIf="chat.answer!=\'\' && chat.answer!=null">\n                  <ion-item >\n                      <ion-avatar item-start>\n                          <img src="assets/imgs/2.png">\n                        </ion-avatar>\n                  <b>Joseph</b>\n                <br>\n                <div>\n                    {{chat.answer}}\n                  </div>\n              </ion-item>\n              <div>\n                  {{chat.answer}}\n                </div>\n              </div>\n            </div>\n          </div>\n          </div>\n</ion-content>\n\n\n<ion-footer>\n    <ion-item>\n    <ion-input [(ngModel)]="question" name="message" placeholder="write a message..."></ion-input>\n    <button ion-button (click)="ask(question)" item-right  color="orange"> <ion-icon  name="send" ></ion-icon></button>\n   \n  </ion-item>\n</ion-footer>\n\n-->'/*ion-inline-end:"F:\abey_new_mobile_app\src\pages\chat-content\chat-content.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__angular_fire_storage__["a" /* AngularFireStorage */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */]])
    ], ChatContentPage);
    return ChatContentPage;
}());

var snapshotToArray = function (snapshot) {
    var returnArr = [];
    snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        // $key:item.key
        console.log(item);
        item.key = childSnapshot.key;
        returnArr.push(item);
    });
    return returnArr;
};
var snapshotToArrayNew = function (snapshot) {
    var returnArr = [];
    snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        returnArr.push(item);
    });
    return returnArr;
};
//# sourceMappingURL=chat-content.js.map

/***/ })

});
//# sourceMappingURL=4.js.map