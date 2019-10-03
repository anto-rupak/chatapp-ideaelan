import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
declare var AWS: any;

/*
  Generated class for the DynamoDbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DynamoDbProvider {
  private documentClient: any;
  constructor(public http: HttpClient) {
    console.log('Hello DynamoDbProvider Provider');
    this.documentClient = new AWS.DynamoDbProvider.DocumentClient();
  }

  getDocumentClient() {
    return this.documentClient;
  }
}
