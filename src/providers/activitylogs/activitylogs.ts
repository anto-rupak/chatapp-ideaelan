//Done by Abey Abraham
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ActivitylogsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ActivitylogsProvider {
  activityurl:string;
  appUrl: string;
  constructor(public http: HttpClient,public storage: Storage) {
//fetching the link should be done in constructor part of providers , it wont work as adding the same to ionviewdidload()
    this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.activityurl= this.appUrl + '/WS/IdeaElanService.svc/InsertActivityTrail';
   
    });
  }
  ionViewDidLoad() {
    
  }
  insertlog(modulename:any , pagename:any ,action:any,description:any,loggedinuser:any){
 

this.http.post(this.activityurl,
  {
    modulename:modulename ,
    pagename: pagename,
    action:action,
    description:description,
    loggedinuser:loggedinuser
  })
  .subscribe(
    (data: any) => {
  
    },//ERROR HANDLING
    error => {

     
    }

  );
  }
}
