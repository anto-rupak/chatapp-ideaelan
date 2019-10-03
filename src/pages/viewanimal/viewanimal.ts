/*
    Done By Abey Abraham
*/
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { AlertController, ModalController } from 'ionic-angular';
import { ModalPage } from '../../pages/modal/modal';
import { MessageProvider } from '../../providers/message/message';

@IonicPage()
@Component({
  selector: 'page-viewanimal',
  templateUrl: 'viewanimal.html',
})
export class ViewanimalPage {
  arr:any=[];
  bFull:any;
  roleType:any;
  animalNumber:any;//number of animals
  status:any;//for setting the status of the animal 
  anData: any;   //variable used to store data that is being passed from Modal
  bcodeSub: any;//for getting cage id through barcode-->--cagepage-->here 
  animals: any; //variable used to store the animal names list with comma seperation
  value: any;   //variable used to store data from CagePage
  cstatus: any; //variable for the status of animal
  updateAnimalUrl: any; // variable to store api url for updation and insertion of Animal Details
  appUrl: any; //variable to store application url which is set after loging in into the local storage
  userJson: any; // variable to fetch the details of the current user from the local storage
  ani: any; // variable contains array of animal names
  //animalName:any;
  barcodeUrl: any; // to store url of api for cage details 
  animalsList: any; //variable to store animal list from api 
  constructor(public alertCtrl: AlertController, public messages: MessageProvider,public modalCtrl: ModalController, public navCtrl: NavController, public http: HttpClient, public navParams: NavParams, public storage: Storage) {

  }

  ionViewDidEnter() {
  
    this.storage.get('userDetails').then((val1) => {
      this.userJson = val1;
    });
    this.animalList();
  
  
  }

  ionViewDidLoad() {
    this.bFull= this.navParams.get('bfull');
    this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.updateAnimalUrl = this.appUrl + '/WS/IdeaElanService.svc/InsertUpdateAnimal';
      this.barcodeUrl = this.appUrl + `/WS/IdeaElanService.svc/GetExtendedFieldValuesByBarcode/${this.bFull}`;//C111-1144
    });
    this.storage.get('userDetails').then((val1) => {
      this.userJson = val1;
    });  
    this.bcodeSub = this.navParams.get('bdata');

  }

  async addNewAnimal() //This method is being called when the user clicks "add" icon to add new animals list
  {
    //this.user
    var modalPage = await this.modalCtrl.create(ModalPage,{data:this.arr});
    modalPage.present();
    modalPage.onDidDismiss(data => { //this method is called when 
      this.anData = data;
   
      if (this.anData != null) {
       
        this.http.post(this.updateAnimalUrl, {
          animalid: 0,
          animalname: this.anData.name,
          cageid: `${this.bcodeSub}`,
          sex: this.anData.sex,
          dob: this.anData.dob,
          status: 1,
          notes: '',
          createdby: this.userJson.EmailAddress,
          eartag: this.anData.tag,
          backgroundstrain: this.anData.bStrain,
          userid:this.userJson.UserId
        }).subscribe((data: any) => {
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.animals = this.animals + "," + this.anData.name;
          this.messages.showMessage("Message", "Animal Added Successfully");
          this.ionViewDidLoad()
          this.ionViewDidEnter()
          
        },//ERROR HANDLING
          error => {
            this.animals = this.animals + "," + this.anData.name;
            this.messages.showMessage("Message", "Animal is not added , Please try again later.");
            this.ionViewDidLoad()
            this.ionViewDidEnter()
          }
        );

        this.animals = this.animals + "," + this.anData.name;
      }
    });
  
    this.ionViewDidLoad()
    this.ionViewDidEnter()

  }


  updateAnimalStatus(actionJson: any) {   
    this.http.post(this.updateAnimalUrl, {
     animalid: 1,
      animalname: actionJson.name,
      cageid: `${this.bcodeSub}`,
      status:actionJson.id,

    }).subscribe((data: any) => {
      let resSTR = JSON.stringify(data);
      let resJSON = JSON.parse(resSTR);
      this.arr=null;
      this.ionViewDidLoad()
      this.ionViewDidEnter()
    
    },//ERROR HANDLING
      error => {
        this.arr=null;
        this.ionViewDidLoad()
        this.ionViewDidEnter()
      }
    );


    
  }
  onItemSelect(user: any) {
  }
  animalList() 
  {
    this.http.get(this.barcodeUrl + "," + this.userJson.UserId)
      .subscribe(
        (data: any) => {
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.animalNumber=resJSON[8].FieldValue;
          this.animalsList = resJSON[9].FieldValue;
          this.animals = this.animalsList
        
          let i=0;
          if(this.animalNumber!=0)
          {
            this.ani = this.animals.split(',');
          this.arr=[];
          for(i=0; i<this.ani.length;i++)
          {
          this.arr.push({"name":this.ani[i],"id": 1});
          }
        }
        },//ERROR HANDLING
        error => {
          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);
        }
      );
  }




}
