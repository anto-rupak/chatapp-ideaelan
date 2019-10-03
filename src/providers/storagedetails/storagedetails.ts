import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the StoragedetailsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StoragedetailsProvider {
  appLink:string;
  constructor(public http: HttpClient) {
  
  }
  setAppLink(appStorageLink:string){
    this.appLink = appStorageLink;
  }
  getAppLink(){
    return this.appLink;
  }

}
