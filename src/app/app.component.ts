import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HomePage } from '../pages/home/home';
import { Network } from '@ionic-native/network'; 
import { App } from 'ionic-angular';
import { ToastController, AlertController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import * as firebase from 'firebase';
import { ImageLoaderConfig } from 'ionic-image-loader';
const config = {
  apiKey: "AIzaSyCRDymxcDEMORc4U1TjW5_SKiB22G45buM",
  authDomain: "sopaa-b37c1.firebaseapp.com",
  databaseURL: "https://sopaa-b37c1.firebaseio.com",
  projectId: "sopaa-b37c1",
  storageBucket: "sopaa-b37c1.appspot.com",
  messagingSenderId: "500138839182"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;
  showSplash = true;
  public counter = 0;
  screenorientation: string;
  isOffline:boolean=false
  showOffline:boolean=true
  constructor(public zone:NgZone,private splashScreen: SplashScreen,  private imageLoaderConfig: ImageLoaderConfig, private keyboard: Keyboard, private platform: Platform, private statusBar: StatusBar, public toastCtrl: ToastController, public app: App, public network: Network, alertCtrl: AlertController,
  ) {
    this.checkConnection();
    this.checkDisconnection();

    platform.ready().then(() => {
      //this.hideSplashScreen(); 
      statusBar.styleDefault();
      setTimeout(() => {
        splashScreen.hide();
      },8000);
      //this.imageLoaderConfig.enableDebugMode();
      //this.imageLoaderConfig.enableFallbackAsPlaceholder(true);
    //  this.imageLoaderConfig.enableSpinner(false);
  //this.imageLoaderConfig.setFallbackUrl('assets/imgs/chatImage.gif'); 
  this.imageLoaderConfig.enableSpinner(true);
  this.imageLoaderConfig.setFallbackUrl('assets/imgs/chatImage.gif');

      


      platform.registerBackButtonAction(() => {
        if (this.counter == 0) {
          this.counter++;

          setTimeout(() => { this.counter = 0 }, 2000)
        } else {

          platform.exitApp();
        }
      }, 0);





    });
   
    }
    hideSplashScreen() {
     
        setTimeout(() => {
          this.splashScreen.hide();
        },5000);
       
      }
        
  checkDisconnection() {
    
    const disconnectSubscription = this.network.onDisconnect().subscribe(() => {

      this.zone.run(() => {
        this.isOffline=true
        this.showOffline=false;
        });
        
      
    this.checkConnection();
    disconnectSubscription.unsubscribe();
    
   
  });
}
checkConnection() {
 const connectSubscription = this.network.onConnect().subscribe(() => {
  
 this.checkDisconnection();
  this.zone.run(() => {
  this.isOffline=false
  this.showOffline=true;
  });
  
 connectSubscription.unsubscribe();
 
 
 
  
 });
 firebase.initializeApp(config);
}
    initializeApp() {

    }
    isConnected(): boolean {
      let conntype = this.network.type;
      return conntype && conntype !== 'unknown' && conntype !== 'none';
  }

  }

