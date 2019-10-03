/*
Done by Abey Abraham
*/
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MessageProvider } from '../../providers/message/message';
import { ViewanimalPage } from '../../pages/viewanimal/viewanimal';
import { AlertController, ModalController } from 'ionic-angular';
import { LocationModalPage } from '../location-modal/location-modal'
/**
 * Generated class for the ViewcagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewcage',
  templateUrl: 'viewcage.html',
})
export class ViewcagePage {
  userList: any; //For getting the list of user (From cage details json)
  adminList: any; //For getting the list of admin (From cage details json)
  icon1: any;//variable used to hide features based on scenarios
  icon2: any;//variable used to hide features based on scenarios
  icon3: any;//variable used to hide features based on scenarios
  icon4: any;//variable used to hide features based on scenarios
  barCodeValSub: any;// variable used to store sub value of barcode id.
  barCodeVal: any;//variable used to store  value of barcode id.
  anData: any;//fetching location data
  indexs: any;
  building: any;//storing building name details
  room: any;//storing room name details
  rack: any;//storing rack name details
  side: any;//storing side name details
  row: any;//storing row name details
  coloumn: any;//storing coloumn name details
  cstatus: any;//dropdown status variable
  cageName: any;//storing cage name value
  species: any;//storing species value
  user: any;//user value
  location: any;
  actDate: any;
  admin: any;
  faciltiy: any;
  contact: any;
  phone: any;
  nOfAnimals: any;//to store number of animals
  animalsList: any;//to store animals list
  message: String;//to store the message ie Notes
  userJson: any;//logged in user details 
  appUrl: any;
  getCageUrl: any;
  barcodeUrl: any;
  updateCageUrl: any;
  roleType: any;
  arr:any;
  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public messages: MessageProvider, public http: HttpClient, public loading: LoadingController, public storage: Storage, public navParams: NavParams, public alertCtrl: AlertController, ) {
    /*
    Initially Setting all the previleges to open 
    */
    this.icon1 = false;
    this.icon2 = false;
    this.icon3 = false;
    this.icon4 = false;
  }

  ionViewDidLoad() {
    this.barCodeVal = this.navParams.get('bdata');
    this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.getCageUrl = this.appUrl + '/WS/IdeaElanService.svc/GetFacilitiesUserIsAdmin';
      this.updateCageUrl = this.appUrl + '/WS/IdeaElanService.svc/InsertUpdateCage';
      this.barcodeUrl = this.appUrl + `/WS/IdeaElanService.svc/GetExtendedFieldValuesByBarcode/${this.barCodeVal}`;//C111-1144
    });
    this.storage.get('userDetails').then((val1) => {
      this.userJson = val1;
    });
    this.barCodeValSub = this.barCodeVal.split('-');
    this.storage.get('roleType').then((role) => {
      this.roleType = role;
    });
  }

  ionViewDidEnter() {
    this.storage.get('userDetails').then((val1) => {
      this.userJson = val1;
    });
    this.loadCageList();
  }

  loadCageList() {

    var notification = this.getCageUrl;
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . ."
    });
    loader.present();

    //SEDNING REQUEST
    this.http.get(this.barcodeUrl + "," + this.userJson.UserId)
      .subscribe(
        (data: any) => {
          //RESPONSE
      
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          if(resJSON[0].FieldValue==null || resJSON[0].FieldName!='Cage Name')
          {
            this.messages.showMessage("Message", "Invalid Barcode");
           this.navCtrl.pop()
          }
    if(resJSON[0].FieldValue!=null && resJSON[0].FieldName=='Cage Name')
          {
          this.cageName = resJSON[0].FieldValue;
          this.species = resJSON[1].FieldValue;

          if (this.userJson.FirstName != null && this.userJson.LastName != null) {
            this.user = this.userJson.LastName + " " + this.userJson.FirstName;
          }
          else {
            if (this.userJson.EmailAddress != null) {
              this.user = this.userJson.EmailAddress
            } 
            else {
              this.user = "";
            }

          }
          this.adminList = resJSON[11].FieldValue;
          this.userList = resJSON[12].FieldValue;
          if (this.roleType == "user" || this.roleType == "labAdmin") {
            if (this.adminList.includes(`${this.user}`) || this.userList.includes(`${this.user}`)) {

            }
            else {


              this.icon1 = true;
              this.icon2 = true;
              this.icon3 = true;
              this.icon4 = true;
              
            }

          }
          this.location = resJSON[2].FieldValue;
          this.actDate = resJSON[3].FieldValue;
          this.admin = resJSON[4].FieldValue;
          this.faciltiy = resJSON[5].FieldValue;
          this.contact = resJSON[6].FieldValue;
          this.phone = resJSON[7].FieldValue;
          this.nOfAnimals = resJSON[8].FieldValue;
          this.animalsList = resJSON[9].FieldValue;
          this.message = resJSON[10].FieldValue;
         
          this.message = this.message.replace(/<[^>]*>/g, '');
          this.message = this.message.replace("&nbsp;", "");
          
          this.cstatus = resJSON[13].FieldValue;

          if (this.cstatus == 'Discarded') {
            this.icon1 = true;
            this.icon2 = true;
            this.icon3 = true;
            this.icon4 = true;
          }
          loader.dismiss();

let i=0,c=0,p=0;
for( i=0;i<this.location.length;i++)
{
if(this.location[i]==':')
{
  c++;
}
}

if (this.location != "") {
  this.indexs = this.location.split(',');
  if (this.location.includes('Building')) {
    this.building = this.indexs[p].split(":", -1);
    p++;
  }
  else {
    this.building = ['', ''];
  }
  if (this.location.includes('Room')) {
    this.room = this.indexs[p].split(":");
    p++
  }
  else {
    this.room = ['', ''];
  }
  if (this.location.includes('Rack')) {
    this.rack = this.indexs[p].split(":");
    p++
  }
  else {
    this.rack = ['', ''];

  }

  if (this.location.includes('Side')) {
    this.side = this.indexs[p].split(":");
    p++;
  }
  else {

    this.side = ['', ''];
  }

  if (this.location.includes('Row')) {
    this.row = this.indexs[p].split(":");
    p++;
  }
  else {
    this.row = ['', ''];
  }
  if (this.location.includes('Column')) {
    this.coloumn = this.indexs[p].split(":");
    p++
  }
  else {
    this.coloumn = ['', ''];
  }


          } else {

            this.building = ['', ''];
            this.room = ['', ''];
            this.rack = ['', ''];
            this.side = ['', ''];
            this.row = ['', ''];
            this.coloumn = ['', ''];

          }

       }
        
      else{
        loader.dismiss();
        this.icon1=true;
        this.icon2=true;
        this.icon3=true;
        this.icon4=true;
     this.cageName="";
     this.species="";
     if (this.userJson.FirstName != null && this.userJson.LastName != null) {
      this.user = this.userJson.LastName + " " + this.userJson.FirstName;
    }
    else {
      if (this.userJson.EmailAddress != null) {
        this.user = this.userJson.EmailAddress
      } 
      else {
        this.user = "";
      }

      }
      this.location="";
      this.admin="";
      this.faciltiy="";
      this.contact="";
      this.phone="";
      this.nOfAnimals="";
      this.animalsList="";
      this.message=""
    
      }
      
      
      },//ERROR HANDLING
        error => {

          loader.dismiss();
          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);
        }
      
      );
        
  }
  updateRequest() {
    this.http.post(this.updateCageUrl, {
      cageid: `${this.barCodeValSub[1]}`,
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
      .subscribe(
        (data: any) => {
          //RESPONSE

          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.messages.showMessage("Message", "Updated Successfully");
          this.ionViewDidEnter()
        },//ERROR HANDLING
        error => {

          this.messages.showMessage("Message", "Not Updated, Please try again later.");
        }
      );
  }

  animalPage() {


    this.navCtrl.push(ViewanimalPage, { data: this.animalsList, bdata: this.barCodeValSub[1], bfull: this.barCodeVal });

  }
  async locationClicked() {
    var ModalPage = await this.modalCtrl.create(LocationModalPage, { building: `${this.building[1]}`, room: `${this.room[1]}`, rack: `${this.rack[1]}`, side: `${this.side[1]}`, row: `${this.row[1]}`, coloumn: `${this.coloumn[1]}` },
      {
        cssClass: 'page-loc'
      }



    );
    ModalPage.present();
    ModalPage.onDidDismiss(data => { //this method is called when 
      this.anData = data;
      if (this.anData != null) {
        this.http.post(this.updateCageUrl, {
          cageid: `${this.barCodeValSub[1]}`,
          status: this.cstatus,
          notes: this.message,
          createdby: this.userJson.LastName + " " + this.userJson.FirstName,
          //createdby:this.userJson.UserId,

          building: `${data.Building}`,
          room: data.Room,
          rack: data.Rack,
          side: data.Side,
          row: data.Row,
          column: data.Coloumn

        })
          .subscribe(
            (data: any) => {


              let resSTR = JSON.stringify(data);
              let resJSON = JSON.parse(resSTR);
              this.ionViewDidEnter()
              this.messages.showMessage("Message", "Updated Successfully");
            },//ERROR HANDLING
            error => {

              this.messages.showMessage("Message", " Not Updated , Please try again later.");

            }
          );



      }
    });
  }

}
