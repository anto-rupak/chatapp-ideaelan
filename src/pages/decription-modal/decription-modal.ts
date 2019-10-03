//Created by Anto rupak

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the DecriptionModalPage page Anto Rupak.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-decription-modal',
  templateUrl: 'decription-modal.html',
})
export class DecriptionModalPage {
  description: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
  }
  closeModal() {
    this.view.dismiss();
  }
  ionViewWillLoad() {
    this.description = this.navParams.get('description')
  }
  ionViewDidEnter() {
    var myDiv1 = document.getElementById("myDiv1");
    myDiv1.innerHTML = this.description;
  }


}
