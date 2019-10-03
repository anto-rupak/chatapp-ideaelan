import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable()
export class NertworkrequestProvider {

  constructor(public http: HttpClient) {
  }

  sendRequest(url: string, object: any){
   this.http.post(url,{object}).subscribe(async (data:any)=>{
     return await data;
   });
  }

}
