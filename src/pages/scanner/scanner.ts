
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { ViewcagePage } from '../../pages/viewcage/viewcage';
import { MessageProvider } from '../../providers/message/message';
import {  ActivitylogsProvider} from '../../providers/activitylogs/activitylogs';
/**
 * Generated class for the ScannerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scanner',
  templateUrl: 'scanner.html',
})
export class ScannerPage {
  appUrl:string;
  barcodeUrl:string;
  userJson:any;
  barcode:any;
  barcodeJson:any;
  barcodeSplittedJson:any;
  output:string;
  status:boolean;
  barcodeValue:any;
  FieldName:string;
  FieldValue:string;
  fieldValue: string [];
  constructor(public logs : ActivitylogsProvider,public message:MessageProvider,public navCtrl: NavController, public navParams: NavParams,public storage: Storage,
    public loading: LoadingController,public http:HttpClient,private barcodeScanner: BarcodeScanner) {
    //this.barcodeValue='C111-1160';
  }

  ionViewDidLoad() {
    this.status=false;
    this.storage.get('appLink').then((val) =>{
      this.appUrl=val;
       this.barcodeUrl=this.appUrl+'/WS/IdeaElanService.svc/GetExtendedFieldValuesByBarcode/';
     
     });
      this.storage.get('userDetails').then((val1) => {
      this.userJson =val1;
    });
    
   
      
  }
  startScanner(){
    this.status=false;
    this.barcodeScanner.scan().then(barcodeData => {
      let barcodeCapture = JSON.stringify(barcodeData);
      let barcodeJsonOutput = JSON.parse(barcodeCapture);
     if(barcodeJsonOutput.text==null || barcodeJsonOutput.text==""){
     
      }else{
        this.barcodeValue=barcodeJsonOutput.text;
       this.sendBarcodeRequest(barcodeJsonOutput.text);
      }
      
     }).catch(err => {
     });
  }
 

  sendBarcodeRequest(barcodeP:string){
    
    let loader = this.loading.create({
      spinner:"crescent",
      content:"Loading . . . "
    });
    loader.present();
  
    this.http.get(this.barcodeUrl+barcodeP+','+this.userJson.UserId)
    .subscribe(
      (data:any) => {
       this.formattedJson(data); 
       /* Modified by Abey Abraham */
        if(barcodeP.toLowerCase().includes('instid')){
        this.status=true;
        
        
        }else{
          this.navCtrl.push(ViewcagePage,{bdata: this.barcodeValue});
        }
        
         loader.dismiss();
         
        
      },//ERROR HANDLING
      error => {
  
         loader.dismiss();
        
         this.status=false;
         let resErr = JSON.stringify(error);
         let resErrJSON = JSON.parse(resErr);
         this.message.showMessage('Message','Barcode Not Found');
       //  this.barcode=resErr;
         if(resErrJSON.status == 400){
         
         }
       
      }
    );
  }
formattedJson(data){
  let formattedJson = [];
  for(let i=0;i<data.length;i++){
   this.fieldValue = String(data[i].FieldValue).split('-');
  this.FieldValue = this.fieldValue[0];
   formattedJson.push({'FieldValue':this.FieldValue,'FieldName':data[i].FieldName})
  }
  let jsonOutput = JSON.stringify(formattedJson);
  this.barcodeSplittedJson = JSON.parse(jsonOutput);
}
test()
{
  //this.navCtrl.push(ViewcagePage,{bdata: this.barcodeValue});
  this.sendBarcodeRequest(this.barcodeValue)
}

}
