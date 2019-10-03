import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { MenuPage } from '../menu/menu';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  checkUrl: string;
  userJson: any;
  roleType: string;
  avail:any;
  userLogout:any;
  FToken:any;
  constructor(private platform :Platform, private faio: FingerprintAIO,public navCtrl: NavController, public loading: LoadingController,
    public storage: Storage) {


      this.storage.get('userLogout').then((val1) => {
        this.userLogout = val1;
        if(this.userLogout==true){
          this.navCtrl.push(SigninPage).then(() => {
            const startIndex = this.navCtrl.getActive().index - 1;
            this.navCtrl.remove(startIndex, 1);
          });
        }
       
      });
      
     this.storage.get("FToken").then((name) => {
      this.FToken=name;
    });
      this.storage.get('userDetails').then((val1) => {

        this.userJson = val1;
       
      });
    this.storage.get('userRole').then((val) => {
      this.roleType = val

    })
    //Modified by Anto Rupak
    this.storage.get('appLink').then((val1) => {
      this.checkUrl = val1;
      //Modified by Abey Abraham
      if (this.checkUrl == null || this.checkUrl == ""){
        this.navCtrl.push('PinPage');
      } else if(this.roleType == null ){
        this.navCtrl.push(SigninPage).then(() => {
          const startIndex = this.navCtrl.getActive().index - 1;
          this.navCtrl.remove(startIndex, 1);
        });
      }  else if (this.roleType != null || this.roleType != "") 
      {


if( this.userLogout==true){

  this.navCtrl.push(SigninPage).then(() => {
    const startIndex = this.navCtrl.getActive().index - 1;
    this.navCtrl.remove(startIndex, 1);
  });
}else{



  this.navCtrl.push(MenuPage).then(() => {
    const startIndex = this.navCtrl.getActive().index - 1;
   this.navCtrl.remove(startIndex, 1);
  });
}




  }

   //ending



  

    });



  }





  async showFingerPrintDialog()
  {
    try{
await this.platform.ready();

const available = await this.faio.isAvailable();
if(available=="finger"|| available=="face"){
  this.faio.show({
    clientId: 'IdeaElan',
    clientSecret: 'IdeaElan', //Only necessary for Android
    disableBackup: false, //Only for Android(optional)
    localizedFallbackTitle: 'Use Pin', //Only for iOS
    localizedReason: 'Please Authenticate' //Only for iOS
}).then((result: any) => {
  
 
  this.navCtrl.push(MenuPage).then(() => {
    const startIndex = this.navCtrl.getActive().index - 1;
   this.navCtrl.remove(startIndex, 1);
                                           });
  }

).catch((error: any) => {
  //Fingerprint/Face was not successfully verified


  if(error.message=="minimum SDK version 23 required")
  {
    this.navCtrl.push(MenuPage).then(() => {
      const startIndex = this.navCtrl.getActive().index - 1;
     this.navCtrl.remove(startIndex, 1);
                                             });
  }

  this.platform.exitApp();
 });


}

else{
  this.navCtrl.push(MenuPage).then(() => {
    const startIndex = this.navCtrl.getActive().index - 1;
   this.navCtrl.remove(startIndex, 1);
                                           });
}
    







}
    catch(e)
    {
     
      console.error(e);
      if(e.message ==="Cancelled"){
      //  this.navCtrl.push(SigninPage); 
      this.platform.exitApp();   
       }
 
       if(e.message === "minimum SDK version 23 required")
       {
    
         this.navCtrl.push(MenuPage).then(() => {
           const startIndex = this.navCtrl.getActive().index - 1;
          this.navCtrl.remove(startIndex, 1);
                                                  });
       }
       

       this.navCtrl.push(MenuPage).then(() => {
        const startIndex = this.navCtrl.getActive().index - 1;
       this.navCtrl.remove(startIndex, 1);
                                               });
    }
  }




  
}
