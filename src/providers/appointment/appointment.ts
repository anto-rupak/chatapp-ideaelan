import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
/*
  Generated class for the AppointmentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppointmentProvider {
  appUrl: string;
  getLabUrl: string;
  getResourceUrl: string;
  getAccountUrl: string;
  getProjectUrl: string;
  getSessionUrl: string;
  getAdminUrl: string;
  getTagsUrl: string;
  updateAppointmentUrl: string;
  getAppointmentUrl: string;
  getUserDeviceDetailsUrl: string;
  user_Json: any;

  constructor(public http: HttpClient,public storage: Storage) {

    this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.getLabUrl = this.appUrl + '/WS/IdeaElanService.svc/GetLabs';
      this.getResourceUrl = this.appUrl + '/WS/IdeaElanService.svc/GetAllUserBasedOnResourceId';
      this.getAccountUrl = this.appUrl + '/WS/IdeaElanService.svc/GetAccountCodes';
      this.getProjectUrl = this.appUrl + '/WS/IdeaElanService.svc/GetProjects';
      this.getSessionUrl = this.appUrl + '/WS/IdeaElanService.svc/GetSessionType';
      this.getAdminUrl = this.appUrl + '/WS/IdeaElanService.svc/GetAdmins';
      this.updateAppointmentUrl = this.appUrl + '/WS/IdeaElanService.svc/InsertUpdateAppointment';
      this.getAppointmentUrl = this.appUrl + '/WS/IdeaElanService.svc/GetAllReservations';
      this.getUserDeviceDetailsUrl = this.appUrl + '/WS/IdeaElanService.svc/GetUserDeviceDetails';
      this.getTagsUrl = this.appUrl + '/WS/IdeaElanService.svc/GetApplicationTags/';
    });
    this.storage.get('userDetails').then((val1) => {
      this.user_Json = val1;
    });
  }

    
  
    getResourceRequest(resource_Id) {
    this.http.post(this.getResourceUrl, {
      resourceid: resource_Id,
    }).subscribe(
      (data: any) => {
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);

     return resJSON
      //  this.user_Json = resJSON;
      },//ERROR HANDLING
      error => {
 
      }
    );
  }
}

