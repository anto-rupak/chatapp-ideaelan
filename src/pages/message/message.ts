import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'Firebase';
import { FcmProvider } from '../../providers/fcm/fcm';
/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
  users=[];
  tok:any;
  appUrl:any
instid:any;
testtrue:any;
roletype:any;
userJson :any;
adminListJson:any;
adminListJson1:any;
getAdminDetailsByEntityUrl:string;
messagelast:any
unreadMessage:any;
count:any;
ticketId:any;
pin:any;
source:any;
searchText:any;
isSearchResult:any;
chatMessageJson :any
chatType:any;
AppointmentId:any;
LabId:any;
idDetails:any;
idVal:any;
idValParam:any;
OrderId:any;
ProviderId:any;
WorkOrderId:any;
  constructor(public navCtrl: NavController, public fcm: FcmProvider, public navParams: NavParams, public http: HttpClient,public storage: Storage) {

  }
 ionViewDidEnter()
{
  //this.roletype == "super"||this.roletype == "providerAdmin"||this.roletype == " admin"
  //labAdmin
  if((this.navParams.get("id")!="user") && (this.navParams.get("id")!="labAdmin"))
  {
    this.testtrue=false;
    this.loadUserList(this.userJson.UserId);
  }
  else{
    if(this.chatType=="SuppliesOrder") {
      this.loadAdminList( this.OrderId,8);
    }else if(this.chatType=="SampleSubmission")
    {
      this.loadAdminList(this.WorkOrderId,2);
    }
    else
    {
      this.loadAdminList(this.instid,1);
    }
    this.testtrue=true;
  }
}
  async ionViewDidLoad() {
    this.gettoken();
    this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.getAdminDetailsByEntityUrl = this.appUrl + '/WS/IdeaElanService.svc/GetAdminByEntity';

    });
    this.storage.get('pin').then((val) => {
      this.pin = val;
      

    });
    await this.storage.get('userDetails').then((val1) => {
      this.userJson = val1;

    });
    this.storage.get('roleType').then((val) => {
      this.roletype=val;
           
          });
          this.instid= this.navParams.get("instrumentid");
          this.ticketId=this.navParams.get("ticketid");
          this.source=this.navParams.get("source");
          this.chatType=this.navParams.get("chatType");
          this.OrderId=this.navParams.get("OrderId");
          this.ProviderId=this.navParams.get("ProviderId");
          this.AppointmentId= this.navParams.get("AppointmentId");
          this.LabId=this.navParams.get("LabId");
          this.WorkOrderId=this.navParams.get("WorkOrderId");
          console.log("ticket id , instid from chat content page ", this.ticketId,this.instid);
          console.log("pin id loaded",this.pin);
          console.log("typeofchat",this.chatType);
          console.log("appointment id ", this.AppointmentId);
          console.log("workorderid",this.WorkOrderId);
          this.testnew();
    if(this.navParams.get("id")!="user"||this.navParams.get("id")!="labAdmin")
    {
      this.testtrue=false;
      this.loadUserList(this.userJson.UserId);
    }
    else{
      if(this.chatType=="SuppliesOrder") {
        this.loadAdminList( this.OrderId,8);
      }else if(this.chatType=="SampleSubmission")
      {
        this.loadAdminList(this.WorkOrderId,2);
       
      }
      else
      {
        this.loadAdminList(this.instid,1);
      }
      
      this.testtrue=true;
    }
    console.log('ionViewDidLoad MessagePage');
   
   console.log("instid",this.instid)
   this.idDetails="";
  this.idVal=""
    if(this.chatType=="TechnicalIssues")
    {
      this.idDetails="ticketid"
       this.idVal=this.ticketId
       this.idValParam=this.instid
    }
    else if(this.chatType=="Reservations")
    {
      this.idDetails="appointmentId"
       this.idVal=this.AppointmentId;
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
  }
  detail(adminid){
    console.log(adminid,'admin');
    console.log(this.pin,'pin send')
    console.log("appointment id sending",this.AppointmentId);
    console.log("orderid sending",this.OrderId);
    console.log("provider id sending",this.ProviderId);
    if(this.roletype == "super"||this.roletype == "providerAdmin"||this.roletype == " admin"){
      
      this.navCtrl.push('ChatContentPage', {"WorkOrderId":`${this.WorkOrderId}`,"OrderId":`${this.OrderId}`,"ProviderId":`${this.ProviderId}`,"role":`${this.roletype}`,"userid":`${adminid.userid}`,"adminid":`${this.userJson.UserId}`,"instrumentid":`${this.instid}`,"ticketid":`${this.ticketId}`,"senderName":`${adminid.LastName} ${adminid.FirstName}`,"pin":`${this.pin}`,"source":`${this.source}`,"chatType":`${this.chatType}`,"AppointmentId":`${this.AppointmentId}`})
    }else
    {this.adduserid(adminid);
    this.navCtrl.push('ChatContentPage', {"WorkOrderId":`${this.WorkOrderId}`,"OrderId":`${this.OrderId}`,"ProviderId":`${this.ProviderId}`,"role":`${this.roletype}`,"adminid":`${adminid.UserId}`,"instrumentid":`${this.instid}`,"curuser":`${this.userJson.UserId}`,"ticketid":`${this.ticketId}`,"senderName":`${adminid.LastName} ${adminid.FirstName}`,"pin":`${this.pin}`,"source":`${this.source}`,"chatType":`${this.chatType}`,"AppointmentId":`${this.AppointmentId}`})
    }
  }
  async adduserid(adminid)
  {console.log(`1. ${this.pin}/chatrooms/${this.chatType}/${this.idVal}/${this.idValParam}/${adminid.UserId}/ `);
    let ref= firebase.database().ref(`${this.pin}/chatrooms/${this.chatType}/${this.idVal}/${this.idValParam}/${adminid.UserId}/`);
    ref.child(`${this.userJson.UserId}`).update(
      
    {
      userid:`${this.userJson.UserId}`,
     // DeviceToken:`${this.userJson.DeviceToken}`, will be added once we get ideaelan firebase console 
     DeviceToken:`${this.tok}`,
      FirstName:`${this.userJson.FirstName}`,
      LastName:`${this.userJson.LastName}`,
      UserName:`${this.userJson.UserName}`,
      UserImage:`${this.userJson.UserImage}`,
      EmailAddress:`${this.userJson.EmailAddress}`
    }
    
    
    
    ).then(() => {
      console.log(`2.${this.pin}/chatrooms/${this.chatType}/${this.idVal}/${this.idValParam}/ `);
      let refnew= firebase.database().ref(`${this.pin}/chatrooms/${this.chatType}/${this.idVal}/${this.idValParam}/`);
      refnew.child(`${adminid.UserId}`).update({
        adminid:`${adminid.UserId}`,
       // DeviceToken:`${adminid.DeviceToken}`, will be added once we get ideaelan firebase console 
       DeviceToken:`${this.tok}`,
        EmailAddress:`${adminid.EmailAddress}`,
        UserImage:`${adminid.UserImage}`
      })
    })
    .then(() => {

       if(this.chatType=="SuppliesOrder"||this.chatType=="SampleSubmission")
       {
        console.log(`3.${this.pin}/chatrooms/${this.chatType}/${this.idVal}/`)
        let refnew= firebase.database().ref(`${this.pin}/chatrooms/${this.chatType}/${this.idVal}/`);
        refnew.child(`${this.idValParam}`).update({
          providerid:`${this.idValParam}`,
        }) 
       }else{

       

      console.log(`3.${this.pin}/chatrooms/${this.chatType}/${this.idVal}/`)
      let refnew= firebase.database().ref(`${this.pin}/chatrooms/${this.chatType}/${this.idVal}/`);
      refnew.child(`${this.idValParam}`).update({
        instrumentid:`${this.idValParam}`,
      })
       }
    }).then(() => {
      if(this.chatType=="TechnicalIssues")
      { console.log(`4.${this.pin}/chatrooms/${this.chatType}/${this.idVal}/`)
        let refnew= firebase.database().ref(`${this.pin}/chatrooms/${this.chatType}/`);
        refnew.child(`${this.idVal}`).update({
          ticketId:`${this.idVal}`,
        })
      }
      else if (this.chatType=="Reservations")
     { console.log(`5.${this.pin}/chatrooms/${this.chatType}/`);
      let refnew= firebase.database().ref(`${this.pin}/chatrooms/${this.chatType}/`);
      refnew.child(`${this.idVal}`).update({
        appointmentId:`${this.idVal}`,
      })
     }
     else if (this.chatType=="SuppliesOrder")
     { console.log(`6.${this.pin}/chatrooms/${this.chatType}/`);
      let refnew= firebase.database().ref(`${this.pin}/chatrooms/${this.chatType}/`);
      refnew.child(`${this.idVal}`).update({
        orderId:`${this.idVal}`,
      })
     }
     else if (this.chatType=="SampleSubmission")
     { console.log(`6.${this.pin}/chatrooms/${this.chatType}/`);
      let refnew= firebase.database().ref(`${this.pin}/chatrooms/${this.chatType}/`);
      refnew.child(`${this.idVal}`).update({
        WorkOrderId :`${this.idVal}`,
      })
     }
  
    });
    
    return 0;
  }
 async  loadAdminList(instid,num ){
   
    this.http.get(this.getAdminDetailsByEntityUrl+`/${instid},${num},${this.userJson.UserId},${this.userJson.UserToken}`)
      .subscribe(
        async (data: any) => {
          //RESPONSE
      
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          console.log("admindetails",resJSON);
          this.adminListJson=resJSON;
          this.adminListJson1=this.adminListJson;
          console.log("adminlist1",this.adminListJson1);
         // this.suppliesJson = resJSON;
if(this.adminListJson1!=null)
{
  let i =0;
  console.log(this.adminListJson1.length);
  for(i=0;i<this.adminListJson1.length;i++)
  {
  console.log(" get last node");
    await this.getlastnode(this.idValParam,this.adminListJson1[i].UserId,i);
    console.log("chat type ",this.chatType);
    if(this.chatType=="SuppliesOrder"||this.chatType=="SampleSubmission")
  {
    await this.adminListUnreadMessageCount(this.idValParam,this.adminListJson1[i].UserId,i)
  }else
  {
    console.log("admin count called");
    await this.adminListUnreadMessageCount(this.instid,this.adminListJson1[i].UserId,i)
  }
 
  }
  console.log("adminlist1",this.adminListJson1);
  /*
  for(i=0;i<this.adminListJson1.length;i++)
  {
  if(this.chatType=="SuppliesOrder"||"SampleSubmission")
  {
    await this.adminListUnreadMessageCount(this.idValParam,this.adminListJson1[i].UserId,i)
  }else
  {
    console.log("admin count called");
    await this.adminListUnreadMessageCount(this.instid,this.adminListJson1[i].UserId,i)
  }
    
  }
  */
  }


        },//ERROR HANDLING
        error => {
          let resErr = JSON.stringify(error);
          // this.suppliesValue = false;
          
        }
      );
  }
 async getlastnode(instid,adminid,i)
  {
    
 console.log(`6.${this.pin}/chatrooms/${this.chatType}/${this.idVal}/${instid}/${adminid}/${this.userJson.UserId}/chats `);
   await firebase.database().ref(`${this.pin}/chatrooms/${this.chatType}/${this.idVal}/${instid}/${adminid}/${this.userJson.UserId}/chats`).orderByKey().limitToLast(1).on('value', resp => {
      this.messagelast= [];

      this.messagelast= snapshotToArray(resp);

     if(this.messagelast[0]!=null)
     {this.adminListUnreadMessageCount(instid,adminid,i);
      this.adminListJson1[i]['message']=this.messagelast[0]["message"];
     }
     
    });


    




  }
  async adminListUnreadMessageCount(instid,adminid,i)
  {
  let user =this.userJson.UserId;
   let countlocal=0;
   this.count=0;
   let  idDetails="";
   let idVal="";
   let  idValParam="";
   if(this.chatType=="TechnicalIssues")
   {
     idDetails="ticketid"
      idVal=this.ticketId
      idValParam=this.instid
   }
   else if(this.chatType=="Reservations")
   {
     idDetails="appointmentId"
      idVal=this.AppointmentId;
      idValParam=this.instid;
   } 
   else if(this.chatType=="SuppliesOrder") 
   {
     idDetails="orderId"
     idVal=this.OrderId;
     idValParam=this.ProviderId;
   }
   else if(this.chatType=="SampleSubmission") 
   {
     idDetails="WorkOrderId"
     idVal=this.WorkOrderId;
     idValParam=this.ProviderId;
   }
  
   
   console.log(`admin unread count ${this.pin}/chatrooms/${this.chatType}/${this.idVal}/${instid}/${adminid}/${this.userJson.UserId}/chats`);
    let dbCon = await firebase.database().ref(`${this.pin}/chatrooms/${this.chatType}/${this.idVal}/${instid}/${adminid}/${this.userJson.UserId}/chats`);
    console.log("what got " ,this.adminListJson1[i]['unReadMessage']);
    await dbCon.once("value",  async function(snapshot) {
     // this.adminListJson1[i]['unReadMessage']=snapshotToArrayCount(resp);
     
     // console.log("what got " ,snapshotToArrayCount(resp));
      await snapshot.forEach( function(child) {

        if(child.val().user != user && child.val().status=="unread")
        {
          countlocal++;
          console.log(` count added`);
          console.log("c local in",countlocal);

          //this.adminListJson1[i]['unReadMessage']=countlocal;
        }
        console.log("c local",countlocal);
        // this.test(this.adminListJson1,i,countlocal);
      });

    })
  
    console.log(` count `,countlocal);
    this.adminListJson1[i]['unReadMessage']=countlocal;
   
  //console.log("yes");
  }
  test(adminListJson,i,c)
  {
    this.adminListJson1[i]['unReadMessage']=c;
  }
  async usersListUnreadMessageCount(instid,adminid,i,userid)
  {
  let user =this.userJson.UserId;
   let countlocal=0;
   this.count=0;
  
   let  idDetails="";
   let idVal="";
   let  idValParam="";
   if(this.chatType=="TechnicalIssues")
   {
     idDetails="ticketid"
      idVal=this.ticketId
      idValParam=this.instid
   }
   else if(this.chatType=="Reservations")
   {
     idDetails="appointmentId"
      idVal=this.AppointmentId;
      idValParam=this.instid;
   } 
   else if(this.chatType=="SuppliesOrder") 
   {
     idDetails="orderId"
     idVal=this.OrderId;
     idValParam=this.ProviderId;
   }
   else if(this.chatType=="SampleSubmission") 
   {
     idDetails="WorkOrderId"
     idVal=this.WorkOrderId;
     idValParam=this.ProviderId;
   }
  
     console.log(`user unread count ${this.pin}/chatrooms/${this.chatType}/${idVal}/${instid}/${adminid}/${userid}/chats`)
    let dbCon = await firebase.database().ref(`${this.pin}/chatrooms/${this.chatType}/${idVal}/${instid}/${adminid}/${userid}/chats`);

    await dbCon.once("value", async function(snapshot) {
      countlocal=0;
      await snapshot.forEach(function(child) {

        if(child.val().user != user && child.val().status=="unread")
        {
          countlocal++;
        }

      });

    })
 
    this.users[i]['unReadMessage']=countlocal;
  }
  async getlastNodeforUserMessages(instid,adminid,i,userid)
  {
//console.log(`chatrooms/${instid}/${adminid}/${userid}/chats`);
let  idDetails="";
let idVal="";
let  idValParam="";
if(this.chatType=="TechnicalIssues")
{
  idDetails="ticketid"
   idVal=this.ticketId
   idValParam=this.instid
}
else if(this.chatType=="Reservations")
{
  idDetails="appointmentId"
   idVal=this.AppointmentId;
   idValParam=this.instid;
} 
else if(this.chatType=="SuppliesOrder") 
{
  idDetails="orderId"
  idVal=this.OrderId;
  idValParam=this.ProviderId;
}
else if(this.chatType=="SampleSubmission") 
{
  idDetails="WorkOrderId"
  idVal=this.WorkOrderId;
  idValParam=this.ProviderId;
}

     console.log(`${this.pin}/chatrooms/${this.chatType}/${idVal}/${instid}/${adminid}/${userid}/chats`);
   await firebase.database().ref(`${this.pin}/chatrooms/${this.chatType}/${idVal}/${instid}/${adminid}/${userid}/chats`).orderByKey().limitToLast(1).on('value', resp => {
      this.messagelast= [];

      this.messagelast= snapshotToArrayNew(resp);
      console.log("messagelast",this.messagelast);

if(this.messagelast[0]!=null)
{
  this.users[i]["newmessage"]=this.messagelast[0]["message"];
}
   
     //return this.messagelast[0]["message"];
    });








  }
  

  loadUserList(uid){
    let  idDetails="";
    let idVal="";
    let  idValParam="";
    if(this.chatType=="TechnicalIssues")
    {
      idDetails="ticketid"
       idVal=this.ticketId
       idValParam=this.instid
    }
    else if(this.chatType=="Reservations")
    {
      idDetails="appointmentId"
       idVal=this.AppointmentId;
       idValParam=this.instid;
    } 
    else if(this.chatType=="SuppliesOrder") 
    {
      idDetails="orderId"
      idVal=this.OrderId;
      idValParam=this.ProviderId;
    }
    else if(this.chatType=="SampleSubmission") 
    {
      idDetails="WorkOrderId"
      idVal=this.WorkOrderId;
      idValParam=this.ProviderId;
    }
   
    //732/chats
    console.log(`${this.pin}/chatrooms/${this.chatType}/${idVal}/${this.idValParam}/${uid}/`)
    firebase.database().ref(`${this.pin}/chatrooms/${this.chatType}/${idVal}/${this.idValParam}/${uid}/`).on('value', resp => {
      this.users = [];
      this.users= snapshotToArray(resp);
      this.users.splice(-4,4);
      console.log("userslist",this.users);
      

let i =0;


      for(i=0;i<this.users.length;i++)
      {
        this.getlastNodeforUserMessages(this.idValParam,uid,i,this.users[i].userid)
      }
      for(i=0;i<this.users.length;i++)
      {
      this.usersListUnreadMessageCount(this.idValParam,uid,i,this.users[i].userid);
      }
      //console.log("userid userid[0].userid",this.users[0].userid)
     // console.log("users.userid",this.users.userid)
     
    });
    console.log("users",this.users);
  }
  gettoken()
  {
    this.fcm.getToken().then(token => {
   
      this.tok = token;
     
     
   
    });
  }
  
  getItems(searchbar) {
    var q = this.searchText;


    if (q == null || q == "") {
      this.isSearchResult = false

      //this.sendInstrumentRequest("false", true)

      return true;
    }

    this.chatMessageJson = this.users.filter((v) => {
      if (v.ResourceName && q) {
        if (v.ResourceName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          //  this.isSearchResult = false
          return true;
        } else if (v.ResourceName.toLowerCase().indexOf(q.toLowerCase()) < -1) {
          // this.isSearchResult = true
          this.chatMessageJson  = []
        }


        return false;
      }

      //   ()
    });


  }
 async  testnew()
  {/*
    console.log("test new for keys  ")
    await firebase.database().ref(`54543/chatrooms/TechnicalIssues/`).on('value', resp => {
      this.messagelast= [];

      this.messagelast= snapshotToArrayNew(resp);
      console.log("messagelast",this.messagelast);
      //return this.messagelast[0]["message"];
    });

*/
var ref = firebase.database().ref('54345/chatrooms/SuppliesOrder/');
ref.once('value').then((snapshot)=>{
  console.log("length 1 ",snapshot.numChildren());
 // console.log("length 1 ",snapshot.length());
  snapshot.forEach(function(data) {
    console.log("key",data.key)
 });
});  
  }
}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
   // console.log("length 1 ",childSnapshot.length());
   // console.log("length 2 ",childSnapshot.length;
   
      let item = childSnapshot.val();
      if(item.type=="image")
     {
       item.message="Image";
     }
     // item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};
export const snapshotToArrayNew = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
     // item.key = childSnapshot.key;
     console.log("item",item);
     console.log("key",item.key());
     if(item.type=="image")
     {
       item.message="Image";
     }
      returnArr.push(item);
  });

  return returnArr;
};
export const snapshotToArrayCount = snapshot => {
  let returnArr = [];
 var countlocal
 let user = this.userJson.UserId;
   snapshot.forEach(function(child) {

    if(child.val().user != user && child.val().status=="unread")
    {
      countlocal++;
      console.log(` csnap  ount added`);
      console.log("csnap  local in",countlocal);
      //this.adminListJson1[i]['unReadMessage']=countlocal;
    }
    console.log("csnap  local",countlocal);

  });
};