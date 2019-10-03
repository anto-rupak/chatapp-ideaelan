import { Component , ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams , Content} from 'ionic-angular';
import * as firebase from 'Firebase';
import { Storage } from '@ionic/storage';
import { Camera,CameraOptions} from '@ionic-native/camera';
import {  AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { ImageLoaderConfig } from 'ionic-image-loader';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the ChatContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-content',
  templateUrl: 'chat-content.html',
})
export class ChatContentPage {
  @ViewChild('content') content: Content;
  //@ViewChild(Content) content: Content;
  imageContent:any
  myPhotosRef :any;
  data = { type:'', nickname:'', message:'' };
  chats = [];
  roomkey:string;
  nickname:string;
  roomname:string;
  offStatus:boolean = false;
  adminid:any;
  instid:any;
  userid:any;
  useridFrom:any;
  role:any;
  chat=[]
  questions=[]
  answer:any=[];
  userJson :any;
  curuser:any;
  myphoto:any
  myphotourl:any
  image:any;
  uri:any;
  updateduri:any;
  url:any;
  ticketId:any;
  appUrl:any;
  pins:any;
  senderName:any;
  source:any;
  chatType:any;
  AppointmentIdGot:any;
  idDetails:any;
  idVal:any;
idValParam:any;
OrderId:any;
ProviderId:any;
WorkOrderId:any;
getUserDetails:any;
userChatDetailsJson:any;
userEmail:any;
userChatJson:any;
getFacilitiesTechnicalIssueUrl:any;
filteredJson:any;
userFacilitiesTechnicalIssuesJson :any;
  constructor( public http: HttpClient,public navCtrl: NavController, public navParams: NavParams ,public storage: Storage, public storageimage: AngularFireStorage,
    public camera:Camera) {
    
      this.myPhotosRef = firebase.storage().ref('/Photos/');
  }
  async ionViewDidLeave()
  {
    //this.roletype == "super"||this.roletype == "providerAdmin"||this.roletype == " admin"
  //labAdmin
    if(this.role=="providerAdmin"||this.role=="admin"||this.role=="super")
{
  let user=this.userJson.UserId;
  console.log("user",user);
  console.log(` cc 1 when leave    ${this.pins}/chatrooms/${this.chatType}/${this.idVal}/${this.instid}/${this.adminid}/${this.useridFrom}/chats`);
let dbCon = await firebase.database().ref(`${this.pins}/chatrooms/${this.chatType}/${this.idVal}/${this.instid}/${this.adminid}/${this.useridFrom}/chats`);
dbCon.once("value", function(snapshot) {
  console.log("snapshot",snapshot);
  snapshot.forEach(function(child) {
    //console.log("snap",child.val().user);
    console.log("child and user",child.val().user,user)
    if(child.val().user != user)
    child.ref.update({
      status:'read'
    });
  });
})
}else if (this.role=="user" ||this.role=="labAdmin")
{let user=this.userJson.UserId;
  console.log(`cc3 when leaved ${this.pins}/chatrooms/${this.chatType}/${this.idVal}/${this.instid}/${this.adminid}/${this.userJson.UserId}/chats`)
  let dbCon = await firebase.database().ref(`${this.pins}/chatrooms/${this.chatType}/${this.idVal}/${this.instid}/${this.adminid}/${this.userJson.UserId}/chats`);
  dbCon.once("value", function(snapshot) {
    //console.log("snapshot",snapshot);
    snapshot.forEach(function(child) {
      //console.log("snap",child.val().user);
     // console.log("child and user",child.val().user,user)
      if(child.val().user != user)
      child.ref.update({
        status:'read'
      });
    });
  })
}
  }
  async ionViewDidLoad() {
   await this.storage.get('userDetails').then((val1) => {
      this.userJson = val1;

    });
    
    await this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.getUserDetails = this.appUrl + '/WS/IdeaElanService.svc/GetAdminByEntity';
      this.getFacilitiesTechnicalIssueUrl = this.appUrl + '/WS/IdeaElanService.svc/GetTechnicalIssues';
    });
    console.log("userjson",this.userJson.UserId);
    this.adminid= this.navParams.get("adminid");
    this.instid=this.navParams.get("instrumentid");
    this.useridFrom=this.navParams.get("userid");
    this.pins=this.navParams.get("pin");
    this.role=this.navParams.get("role");
    this.ticketId=this.navParams.get("ticketid");
    this.senderName=this.navParams.get("senderName");
    this.source=this.navParams.get("source");
    this.chatType=this.navParams.get("chatType")
    this.OrderId=this.navParams.get("OrderId");
    this.ProviderId=this.navParams.get("ProviderId");
    this.WorkOrderId=this.navParams.get("WorkOrderId");
    console.log("userid ",this.useridFrom);
    //this.userEmail=this.navParams.get("userEmail");
    if(this.useridFrom!=null)
    {
      if(this.role=="providerAdmin"||this.role=="admin"||this.role=="super")
      {
        this.loadUserDetails(this.useridFrom,5);
      }
    }
    console.log("ticket id , instid from chat content page ", this.ticketId,this.instid);
    console.log("admin",this.adminid);
    console.log("instrumentid",this.instid);
    console.log("typeofchat",this.chatType);
    console.log("ORDER ID", this.OrderId);
    console.log("provider id ", this.ProviderId);
   
    this.AppointmentIdGot= this.navParams.get("AppointmentId");
    this.roomkey = this.navParams.get("key") as string;
    this.nickname = this.userJson.UserId;
    this.roomname= this.instid;
    console.log("roomname",this.roomname);
    this.data.type = 'message';
    this.data.nickname = this.userJson.UserId;
    this.data.message = '';
    setTimeout(() => { this.content.scrollToBottom(); }, 200);
    console.log("appointment id chat content page", this.AppointmentIdGot);


    this.idDetails="";
    this.idVal=""
    if(this.chatType=="TechnicalIssues")
    {
      this.idDetails="ticketid"
       this.idVal=this.ticketId
       this.idValParam=this.instid

this.getAllIssues();



    }
    else if(this.chatType=="Reservations")
    {
      this.idDetails="appointmentId"
       this.idVal=this.AppointmentIdGot;
       this.idValParam=this.instid;
    } 
    else if(this.chatType=="SuppliesOrder") 
    {
      this.idDetails="orderId"
      this.idVal=this.OrderId;
      this.idValParam=this.ProviderId;
    }

    else if(this.chatType=="SampleSubmission")
    {
      this.idDetails="WorkOrderId"
      this.idVal=this.WorkOrderId;
      this.idValParam=this.ProviderId;
    }


if(this.role=="providerAdmin"||this.role=="admin"||this.role=="super")
{
  let user=this.userJson.UserId;
  console.log("user",user);
  console.log(` cc 1 ${this.pins}/chatrooms/${this.chatType}/${this.idVal}/${this.idValParam}/${this.adminid}/${this.useridFrom}/chats`);
let dbCon = await firebase.database().ref(`${this.pins}/chatrooms/${this.chatType}/${this.idVal}/${this.idValParam}/${this.adminid}/${this.useridFrom}/chats`);
dbCon.once("value", function(snapshot) {
  console.log("snapshot",snapshot);
  snapshot.forEach(function(child) {
    //console.log("snap",child.val().user);
    console.log("child and user",child.val().user,user)
    if(child.val().user != user)
    child.ref.update({
      status:'read'
    });
  });
}).then(async () => {
     console.log(`cc 2 ${this.pins}/chatrooms/${this.chatType}/${this.idVal}/${this.idValParam}/${this.adminid}/${this.useridFrom}/chats`)
    await firebase.database().ref(`${this.pins}/chatrooms/${this.chatType}/${this.idVal}/${this.idValParam}/${this.adminid}/${this.useridFrom}/chats`).on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      console.log("chats123456",this.chats);
      setTimeout(() => {
        if(this.offStatus === false) {
         // this.content.scrollToBottom(300);
        }
      }, 1000);
    });



    });



  }
  else if( this.role=="user"||this.role=="labAdmin")
  {
    /*
    let idDetails="";
    let idVal=""
      if(this.chatType=="TechnicalIssues")
      {
        idDetails="ticketid"
         idVal=this.ticketId
      }
      else if(this.chatType=="Reservations")
      {
        idDetails="appointmentId"
         idVal=this.AppointmentIdGot
      }

*/


    let user=this.userJson.UserId;
   // console.log("user",user);
  //  console.log(`${this.pins}/chatrooms/TechnicalIssues/${this.ticketId}/${this.instid}/${this.adminid}/${this.userJson.UserId}/chats`);
  console.log(`cc3 ${this.pins}/chatrooms/${this.chatType}/${this.idVal}/${this.idValParam}/${this.adminid}/${this.userJson.UserId}/chats`)
  let dbCon = await firebase.database().ref(`${this.pins}/chatrooms/${this.chatType}/${this.idVal}/${this.idValParam}/${this.adminid}/${this.userJson.UserId}/chats`);
  dbCon.once("value", function(snapshot) {
    //console.log("snapshot",snapshot);
    snapshot.forEach(function(child) {
      //console.log("snap",child.val().user);
     // console.log("child and user",child.val().user,user)
      if(child.val().user != user)
      child.ref.update({
        status:'read'
      });
    });
  }).then(async () => {
       console.log(`cc4 ${this.pins}/chatrooms/${this.chatType}/${this.idVal}/${this.idValParam}/${this.adminid}/${this.userJson.UserId}/chats`)
    await firebase.database().ref(`${this.pins}/chatrooms/${this.chatType}/${this.idVal}/${this.idValParam}/${this.adminid}/${this.userJson.UserId}/chats`).on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      //console.log("chats123456 user",this.chats);
      setTimeout(() => {
        if(this.offStatus === false) {
        }
      
      }, 1000);
    });
  
  
      });
    this.loadAdminImage();
    
  }
}
getAllIssues()
{

console.log("ticket id",this.ticketId);
  this.http.post(this.getFacilitiesTechnicalIssueUrl, {
    userid: this.userJson.UserId,
    usertoken: this.userJson.UserToken,
   paramname: `UserId`,
    paramvalue:this.userJson.UserId
  })
    .subscribe(
      (data: any) => {
        //RESPONSE

        let filteredJson;
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
        this.userFacilitiesTechnicalIssuesJson = resJSON;
        console.log("test",this.userFacilitiesTechnicalIssuesJson);
        if(this.userFacilitiesTechnicalIssuesJson != null){
          this.filteredJson = this.userFacilitiesTechnicalIssuesJson.filter(i => i.TicketId == this.ticketId);
          console.log("test",this.filteredJson);
        }

        for(let i=0;i<this.userFacilitiesTechnicalIssuesJson.length;i++)
        {
            if(this.userFacilitiesTechnicalIssuesJson[i][`TicketId`]==this.ticketId)
            {
              this.filteredJson=this.userFacilitiesTechnicalIssuesJson[i];
   this.filteredJson = JSON.parse(JSON.stringify(this.filteredJson));
              console.log("demo",this.filteredJson.Description)
            }
        }
        // 

        //loader.dismiss();

console.log("filteredjson",this.filteredJson);

      },//ERROR HANDLING
      error => {

       
      }
    );












}
  async sendMessage() {
    /*
    let idDetails="";
    let idVal=""
      if(this.chatType=="TechnicalIssues")
      {
        idDetails="ticketid"
         idVal=this.ticketId
      }
      else if(this.chatType=="Reservations")
      {
        idDetails="appointmentId"
         idVal=this.AppointmentIdGot
         console.log(`appointment , idval`,this.AppointmentIdGot,idVal);
      }
*/

    if (this.data.message.replace(/\s/g, '').length) {
      console.log('string only contains whitespace (ie. spaces, tabs or line breaks)');
    
    if(this.role=="providerAdmin"||this.role=="admin"||this.role=="super")
    {
      console.log(` cc5 ${this.pins}/chatrooms/${this.chatType}/${this.idVal}/${this.idValParam}/${this.adminid}/${this.useridFrom}/chats`);
      let newData = await firebase.database().ref(`${this.pins}/chatrooms/${this.chatType}/${this.idVal}/${this.idValParam}/${this.adminid}/${this.useridFrom}/chats`).push();
      newData.set({
        type:this.data.type,
        user:this.data.nickname,
        message:this.data.message,
        sendDate:Date(),
        status:'unread'
      });
      this.data.message = '';
      }
      else if( this.role=="user"||this.role=="labAdmin")
      {
        
   console.log(` cc 6${this.pins}/chatrooms/${this.chatType}/${this.idVal}/${this.idValParam}/${this.adminid}/${this.userJson.UserId}/chats`)
    let newData =  firebase.database().ref(`${this.pins}/chatrooms/${this.chatType}/${this.idVal}/${this.idValParam}/${this.adminid}/${this.userJson.UserId}/chats`).push();
    newData.set({
      type:this.data.type,
      user:this.data.nickname,
      message:this.data.message,
      sendDate:Date(),
      status:'unread'
    });
   
    this.data.message = '';
      }
    }
   // this.data.message = '';
   setTimeout(()=>{this.content.scrollToBottom();},200); 
  }
  async sendMessages(updateduri) {
    /*
    let idDetails="";
    let idVal=""
      if(this.chatType=="TechnicalIssues")
      {
        idDetails="ticketid"
         idVal=this.ticketId
      }
      else if(this.chatType=="Reservations")
      {
        idDetails="appointmentId"
         idVal=this.AppointmentIdGot
      }
*/
//alert(`${updateduri}`)
    console.log("adminid",this.adminid);
    console.log("userid",this.userid);
        if(this.role=="providerAdmin"||this.role=="admin"||this.role=="super")
        {
          console.log(` cc 7${this.pins}/chatrooms/${this.chatType}/${this.idVal}/${this.idValParam}/${this.adminid}/${this.useridFrom}/chats`);
          let newData = await firebase.database().ref(`${this.pins}/chatrooms/${this.chatType}/${this.idVal}/${this.idValParam}/${this.adminid}/${this.useridFrom}/chats`).push();
          newData.set({
            type:'image',
            user:this.data.nickname,
            message:updateduri,
            sendDate:Date(),
            status:'unread'
          });
          this.data.message = '';
          }
          else if( this.role=="user"||this.role=="labAdmin")
          {
            
       console.log(` cc 8${this.pins}/chatrooms/${this.chatType}/${this.idVal}/${this.idValParam}/${this.adminid}/${this.userJson.UserId}/chats`)
        let newData =  firebase.database().ref(`${this.pins}/chatrooms/${this.chatType}/${this.idVal}/${this.idValParam}/${this.adminid}/${this.userJson.UserId}/chats`).push();
        newData.set({
          type:'image',
          user:this.data.nickname,
          message:updateduri,
          sendDate:Date(),
          status:'unread'
        });
       
        this.data.message = '';
          }
    
       // this.data.message = '';
      }
 async adduserid()
{ 
  
  /*
  let idDetails="";
let idVal=""
  if(this.chatType=="TechnicalIssues")
  {
    idDetails="ticketid"
     idVal=this.ticketId
  }
  else if(this.chatType=="Reservations")
  {
    idDetails="appointmentId"
     idVal=this.AppointmentIdGot
  }
  */
console.log(` cc 9${this.pins}/chatrooms/${this.chatType}/${this.idVal}/${this.idValParam}/${this.adminid}/`);
  let ref= firebase.database().ref(`${this.pins}/chatrooms/${this.chatType}/${this.idVal}/${this.idValParam}/${this.adminid}/`);
  ref.child(`${this.curuser}`).set({
    userid:`${this.curuser}`
  }); 
  return 0;
}
async loadAdminImage()
{
  /*
  let idDetails="";
  let idVal=""
    if(this.chatType=="TechnicalIssues")
    {
      idDetails="ticketid"
       idVal=this.ticketId
    }
    else if(this.chatType=="Reservations")
    {
      idDetails="appointmentId"
       idVal=this.AppointmentIdGot
    }
    */
console.log(`cc 10 ${this.pins}/chatrooms/${this.chatType}/${this.idVal}/${this.idValParam}/${this.adminid}`)
 // console.log(`chatrooms/${this.instid}/${this.adminid}`);
  await firebase.database().ref(`${this.pins}/chatrooms/${this.chatType}/${this.idVal}/${this.idValParam}/${this.adminid}`).on('value', resp => {
    this.imageContent = [];
    this.imageContent = snapshotToArrayNew(resp);
   console.log( "imagecontent",this.imageContent);
  });
}

  exitChat() {
    this.offStatus = true;

   this.navCtrl.pop();
  }

 
 
  async uploadHandler() {
  
    const base64 = await this.changeimage();
    this.createUploadTask(base64);
   
   }
   async changeimage()
   {
     const options: CameraOptions = {
       quality: 100,
       destinationType: this.camera.DestinationType.DATA_URL,
       encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
       sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
       saveToPhotoAlbum:false
     }
  
     return await this.camera.getPicture(options)
  }
    
  createUploadTask(file: string): void {


      this.image = 'data:image/jpg;base64,' + file;
      this.uri=this.image;
      let picture = `chats_ideaelan/images/${this.userJson.UserId}/${Math.floor(Date.now() / 1000)}`;
      this.storageimage.ref(picture).putString(this.image, 'data_url').then(()=>{
      this.storageimage.ref(picture).getDownloadURL().subscribe(url =>
      {
        const Url =url;
        this.url=Url;
        this.sendMessages(this.url);
      })
      
    })
  
    
}


async  loadUserDetails(instid,num ){
   
  await this.http.get(this.getUserDetails+`/${instid},${num},${this.userJson.UserId},${this.userJson.UserToken}`)
    .subscribe(
      async (data: any) => {
        //RESPONSE
    
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
        console.log("user id details ",resJSON);
        this.userChatJson=resJSON;
        //this.userChatJson=this.userChatJson;
        this.senderName=`${this.userChatJson[0].LastName} ${this.userChatJson[0].FirstName}`;
        console.log("sendername ",this.senderName);
       // console.log("adminlist1",this.userChatJson);
       // this.suppliesJson = resJSON;



      },//ERROR HANDLING
      error => {
        let resErr = JSON.stringify(error);
        // this.suppliesValue = false;
        
      }
    );
}






}
export const snapshotToArray = snapshot => {
  let returnArr = [];
  snapshot.forEach(childSnapshot => {

      let item = childSnapshot.val();
     // $key:item.key
     console.log(item);
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};

export const snapshotToArrayNew = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      returnArr.push(item);
  });

  return returnArr;
};
