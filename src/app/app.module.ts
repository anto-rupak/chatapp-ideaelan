import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { MenuPage } from '../pages/menu/menu';
import { DashboardPage } from '../pages/dashboard/dashboard';
import {HttpClientModule} from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import {CommonModule} from '@angular/common';
import { Device } from '@ionic-native/device';
import { ActionSheetController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import { SchedularPage } from '../pages/schedular/schedular';
import { ActualUsagePage } from '../pages/actual-usage/actual-usage';
import { ActualusagecounterPage } from '../pages/actualusagecounter/actualusagecounter';
import { InstrumentSearchPage } from '../pages/instrument-search/instrument-search';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Network } from '@ionic-native/network';
import { BrowserAnimationsModule , NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LabDashboardPage } from '../pages/lab-dashboard/lab-dashboard';
import { InboxviewPage } from '../pages/inboxview/inboxview';
import { Firebase } from '@ionic-native/firebase';
import { FcmProvider } from '../providers/fcm/fcm';
import { AngularFireModule } from 'angularfire2';
import { NotificationProvider } from '../providers/notification/notification';
import { LazyLoadImageModule,intersectionObserverPreset  } from 'ng-lazyload-image';
import { IonicImageLoader } from 'ionic-image-loader';
import {Calendar} from '@ionic-native/calendar';
import { SampledetailPage } from '../pages/sampledetail/sampledetail';
import { ViewcagePage } from '../pages/viewcage/viewcage';
import { SamplesubmissionPage } from '../pages/samplesubmission/samplesubmission';
import { ComponentsModule } from "../components/components.module";
import { MessageProvider } from '../providers/message/message';
import { NertworkrequestProvider } from '../providers/nertworkrequest/nertworkrequest';
import { Camera} from '@ionic-native/camera';
import { FileTransfer} from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ActivitylogsProvider } from '../providers/activitylogs/activitylogs';
import { AppointmentsPage } from '../pages/appointments/appointments';
import { ViewanimalPage} from '../pages/viewanimal/viewanimal';
//import {ChatContentPage} from '../pages/chat-content/chat-content';
import{InstrumentstechissuePage} from '../pages/instrumentstechissue/instrumentstechissue';
import { DatePipe } from '@angular/common'
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ModalPage} from '../pages/modal/modal';
import {SignInModalPage} from '../pages/sign-in-modal/sign-in-modal'
import {LocationModalPage}from '../pages/location-modal/location-modal'
import { Media} from '@ionic-native/media';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { RequesturlsProvider } from '../providers/requesturls/requesturls';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import {SuppliesPage} from '../pages/supplies/supplies'
import { AppointmentProvider } from '../providers/appointment/appointment';
import {SuppliesOrderPage} from '../pages/supplies-order/supplies-order';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { DynamoDbProvider } from '../providers/dynamo-db/dynamo-db';
import {  AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
//import { IonicImageLoader } from 'ionic-image-loader';


/*
Firebase Credentials of Idea Elan 


const firebase = {
  apiKey: "AIzaSyDcCJQXZMegdIGttq6uMb_toCoL_UYMGFM",//AIzaSyAlZZcVAO86qE9FFdL2XYjVShv5Txtwr7Y
  authDomain: "ie-infinity.firebaseapp.com",//ideaelan-f26b1.firebaseapp.com
  databaseURL: "https://ie-infinity.firebaseio.com  ",
  //https://ie-infinity-test.firebaseio.com   https://ideaelan-f26b1.firebaseio.com
  projectId: "https://ie-infinity", //ideaelan-f26b1
  storageBucket: "ie-infinity.appspot.com",//ideaelan-f26b1.appspot.com
  messagingSenderId: "77566553849"//1056936825594
}


*/

//Firebase Credentials of Abey Abraham - personal console


const firebase = {
  apiKey: "AIzaSyCRDymxcDEMORc4U1TjW5_SKiB22G45buM",
  authDomain: "sopaa-b37c1.firebaseapp.com",
  databaseURL: "https://sopaa-b37c1.firebaseio.com",
  projectId: "sopaa-b37c1",
  storageBucket: "sopaa-b37c1.appspot.com",
  messagingSenderId: "500138839182"
};
@NgModule({
  declarations: [
    MyApp,
    ModalPage,
    LocationModalPage,
    HomePage,
    SigninPage,
    MenuPage,
    DashboardPage,
    SchedularPage,
    ActualUsagePage,
    ActualusagecounterPage,
    InstrumentSearchPage,
    LabDashboardPage,
    InboxviewPage,
    SampledetailPage,
    SamplesubmissionPage,
    AppointmentsPage,
    ViewcagePage,
    ViewanimalPage,
    SignInModalPage,
    InstrumentstechissuePage,
    SuppliesPage,
    SuppliesOrderPage,
   // ChatContentPage
    ],
  imports: [
    NoopAnimationsModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    IonicImageLoader.forRoot(),
    IonicModule.forRoot(MyApp,{ scrollPadding: false ,preloadModules: true, autocomplete: 'off', 
    menuType: 'push',
    platforms: {
      android: {
        menuType: 'reveal',
      }
    }}),
    HttpClientModule,
    CommonModule,
    ChartsModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebase), 
    ComponentsModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    }) ,
    IonicImageLoader
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    SignInModalPage,
    LocationModalPage,
    ModalPage,
    MyApp,
    HomePage,
    DashboardPage,
    SigninPage,
    MenuPage,
    SchedularPage,
    ActualUsagePage,
    ActualusagecounterPage,
    InstrumentSearchPage,
    LabDashboardPage,
    InboxviewPage,
    SampledetailPage,
    SamplesubmissionPage,
    AppointmentsPage,
    ViewcagePage,
    ViewanimalPage,
    InstrumentstechissuePage,
    SuppliesPage,
    SuppliesOrderPage,
   // ChatContentPage
  ],
  providers: [
    DatePipe ,
    StatusBar,
    SplashScreen,
    Device,
    File,
    Network,
    BarcodeScanner,
    Media,
    ActionSheetController,
    DatePicker,
    Firebase,
    FcmProvider,
    FingerprintAIO ,
    AngularFireStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FcmProvider,
    StreamingMedia,
    NotificationProvider,
    Calendar,
    Camera,
    MessageProvider,
    NertworkrequestProvider,
    FileTransfer,
    ActivitylogsProvider,
    DynamoDbProvider,
    Keyboard,
    RequesturlsProvider,
    AndroidPermissions,
    AppointmentsPage,
    AppointmentProvider,
    DynamoDbProvider
  ]
})
export class AppModule {}
