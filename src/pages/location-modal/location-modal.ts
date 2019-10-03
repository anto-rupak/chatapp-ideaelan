/*
Done by Abey Abraham
*/
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
/**
 * Generated class for the LocationModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location-modal',
  templateUrl: 'location-modal.html',
})
export class LocationModalPage {
  bfromCage:any;//building value from cage page
  roomfromCage:any;//room value from cage page
  rackfromCage:any;//rack value from cage page
  sidefromCage:any;//side value from cage page
  rowfromCage:any;//row value from cage page 
  coloumnfromCage:any;//coloumn value from cage page 
  Building:any;// building value for passing
  Room:any;//room value for passing
  Rack:any;//rack value for passing
  Side:any;//side value for passing
  Row:any;//row value for passing
  Coloumn:any;//coloumn value for passing
  constructor(public view : ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  
    this.bfromCage=this.navParams.get('building');
    this.roomfromCage=this.navParams.get('room');
    this.rackfromCage=this.navParams.get('rack');
    this.sidefromCage=this.navParams.get('side');
    this.rowfromCage=this.navParams.get('row');
    this.coloumnfromCage=this.navParams.get('coloumn');

    this.Building=this.bfromCage;
    this.Room=this.roomfromCage;
    this.Rack= this.rackfromCage;
    this.Side=this.sidefromCage;
    this.Row= this.rowfromCage;
    this.Coloumn= this.coloumnfromCage;
  }

  
returnParticipant()// This method is called when the save button is clicked 
{

  if(this.Building==null){
    this.Building="";
  }
   let participant = {
    Building: this.Building,
    Room: this.Room,
    Rack: this.Rack,
    Side: this.Side,
    Row: this.Row,
    Coloumn :this.Coloumn
                     };
   this.view.dismiss(participant); //dissmiss() helps to close the view and pass the parameter values to ViewAnimalPage
 }

 close()// This method is called when the user clicks cancel , it is done to close the modal 
 {
   this.view.dismiss();
 }
}
