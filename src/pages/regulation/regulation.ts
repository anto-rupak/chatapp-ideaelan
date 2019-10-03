import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the RegulationPage page by Anto Rupak.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// Created by Anto Rupak
@IonicPage()
@Component({
  selector: 'page-regulation',
  templateUrl: 'regulation.html',
})
export class RegulationPage {
  resourceId: any;
  appUrl: any;
  rule1: any;
  ruleJson: any;
  getRulesandRegulationsUrl: string;
  statusrules: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public storage: Storage, public loading: LoadingController) {
  }

  ionViewDidLoad() {
    this.resourceId = this.navParams.get('resourceId');
    this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.getRulesandRegulationsUrl = this.appUrl + '/WS/IdeaElanService.svc/GetAllInstrumentRulesToShow/' + this.resourceId;
    });
  }
  ionViewDidEnter() {
    this.getRulesandRegulations();
  }

  getRulesandRegulations() {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Updating . . ."
    });
    loader.present();
    //SEDNING UPDATE REQUEST
    this.http.get(this.getRulesandRegulationsUrl)
      .subscribe(
        (data: any) => {
          //RESPONSE
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.ruleJson = resJSON
          loader.dismiss();
        },//ERROR HANDLING
        error => {
          loader.dismiss();
          let resErr = JSON.stringify(error);
          let resErrJSON = JSON.parse(resErr);
          if (resErrJSON.status == 400) {
            this.statusrules = true
          }
        }
      );
  }

}
