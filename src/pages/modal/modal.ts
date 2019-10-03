/*
    Done By Abey Abraham
*/
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePipe } from '@angular/common'; //DatePipe is used for changing the date format which is being fetched from DatePicker
import { ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MessageProvider } from '../../providers/message/message';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
  
  
})
export class ModalPage {
  icon1:any;
  roleType:any;//variable to store the roletype of the user eg admin , user etc
  cDate:any;//variable to store current date
  bStrain:any;// variable  to make bstrain hidden for users
  userJson:any;//variable to stor user details
  count:any;
  birthDate:string; //Variable to store the Birthdate of Animal 
  name: string; //Variable to store Animal Name
  tag: string; //Variable to store etag
  sex: string; //Variable to store sex of Animal
  bstrain:string ;//Variabel to stor Backstrain
  myDate: String ;
  names:any;
  constructor(public storage: Storage,public datepipe :DatePipe ,public message:MessageProvider, public navCtrl: NavController, public navParams: NavParams,public view : ViewController) {
  this.sex="Unknown";
  this.cDate= new Date().toISOString();
  this.birthDate=this.cDate//setting birthdate to current date
  this.count=0;
  this.bStrain=false;
  }
  


 ionViewDidLoad() {
    this.names=this.navParams.get('data')
    this.storage.get('roleType').then((val1) => {
      this.userJson = val1;
   
      if (this.userJson== "user"||this.userJson=="labAdmin")//If the roletype is user or labadmin , it is being disabled 
       {
        this.bStrain=true;
       }
    });
  
  }

returnParticipant()// This method is called when the save button is clicked 
 {
 
   /*
   code to check whether the name already exists or not
   */

   let i = 0 ;
   for (i=0;i<this.names.length;i++)
   {
     if( this.name==this.names[i].name)
     {  
      this.count=1;
      break;
     }
   }
  
  if(this.count==1)
  {
    this.message.showMessage("Alert","Animal Name Already Exists !!");
    this.count=0;
  }
  
  else
  if(this.name==null||(/^\s+$/.test(this.name)==true))//if the name is null or simple empty space , it is not allowed
  {
  

    this.message.showMessage("Alert","Enter Animal Name");
  }
  else 
  if(this.sex==null)//this field cannot be null
  {
    this.message.showMessage("Alert","Enter sex of Animal");
  }
  else
 
  if(this.birthDate==null)//birthdate also cannot be null
  {
    this.message.showMessage("Alert","Enter Birthdate");
  }
else{

  if(this.bStrain==null)
  {
this.bStrain='';
  }
  else
  if(this.tag==null)
  {
this.tag='';
  }




    let participant = {
      name: this.name,
      tag: this.tag,
      sex: this.sex,
      bStrain: this.bstrain,
      dob: this.datepipe.transform( this.birthDate, 'MM-dd-yyyy')
                      };
    this.view.dismiss(participant); //dissmiss() helps to close the view and pass the parameter values to ViewAnimalPage
  }
}
  close()// This method is called when the user clicks cancel , it is done to close the modal 
  {
    this.view.dismiss();
  }
}
