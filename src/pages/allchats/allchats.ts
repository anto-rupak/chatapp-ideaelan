import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
import { Subject } from 'rxjs';
import { resolve } from 'path';
import { AngularFireAuth } from '@angular/fire/auth';
import { Firebase } from '@ionic-native/firebase';

/**
* Generated class for the AllchatsPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-allchats',
  templateUrl: 'allchats.html',
})
export class AllchatsPage {
  uniqueId1: any = [];
  uniqueId2: any = [];
  userchatList: any;

  id1Length;
  roletype: any
  curr_user_Json: any;
  user;
  arrVal;
  messagelast: any;
  pin:any;
  appUrl:any;
  getUserDetails:any;
  userChatJson:any;
  senderName:any;
  UserImage:any;
  searchText:any;
  duplicatesearchlist:any;
  messageCount:any;
  constructor(public loading: LoadingController,public http: HttpClient,public navCtrl: NavController, public navParams: NavParams, public storage: Storage,public firebase:AngularFireDatabase,) {
  }

  async ionViewDidEnter() {
    this.userchatList = []
    await this.storage.get('roleType').then((val) => {
      this.roletype = val;

    });
    await this.storage.get('appLink').then((val) => {
      this.appUrl = val;
      this.getUserDetails = this.appUrl + '/WS/IdeaElanService.svc/GetAdminByEntity';

    });
    this.storage.get('pin').then((val) => {
      this.pin=val;
             
            });
    await this.storage.get('userDetails').then((val1) => {
      this.curr_user_Json = val1;
      if (this.roletype == "user"||this.roletype=="labAdmin") {

        this.forUser()
      }
      else
      if(this.roletype == "super"||this.roletype == "providerAdmin"||this.roletype == " admin") {
        this.forAdminTest();

      }
    });
    console.log('ionViewDidLoad AllchatsPage');


  }
  async forAdmin() {
    let returnArr = [];
    let news = [];
    var userList;
    let user = this.curr_user_Json.UserId;
    
    console.log("uid", this.curr_user_Json.UserId);
    let usersRef = await firebase.database().ref(`${this.pin}/chatrooms/`);
    usersRef.orderByValue().once("value", function (parentsnapshot) {
      //console.log(snapshot.val());
      parentsnapshot.forEach(function (snapshot) {
        snapshot.forEach(function (data) {
           console.log("l2",data.key);
          data.forEach(function (datanew) {
            console.log("l1",datanew.key);
            datanew.forEach(function (admin) {
              console.log(`pid ${datanew.key} `);
              admin.forEach(function (datanewnew) {
                console.log(`pid ${admin.key} ${user}`);
              if (admin.key == `${user}`) {
                datanewnew.forEach(function (snap) {//if(datanew.key!="DeviceToken") || if(datanew.key!="EmailAddress")|| if(datanew.key!="UserImage")||if(datanew.key!="adminid"))
                  // if(snap.key!="adminid" )
                  //{
                  console.log( `snap ${snap.key}`);
                  if (snap.key == "chats")
                    
                          returnArr.push(snap.ref.toString());

                  // }
                });
              }
            });
            });
          });

        });
      });
      // console
      console.log("final", returnArr);


      var arrVal = returnArr.map(item => {
        var splitVal = item.split('/');
        news.push({ "pin": `${splitVal[3]}`, "chatrooms": 'chatrooms', "type": `${splitVal[5]}`, "id1": `${splitVal[6]}`, "id2": `${splitVal[7]}`, "adminid": `${splitVal[8]}`, "userid": `${splitVal[9]}` })
        console.log(splitVal, "Splitvalnew")
        console.log("news", news);
      })
      let resSTR = JSON.stringify(news);
      let resJSON = JSON.parse(resSTR);
      userList = resJSON
      console.log("news", resJSON);
    })
  }



























  async forAdminTest() {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    loader.present();
    let returnArr = [];
    let news = [];
    var userList;
    console.log("uid", this.curr_user_Json.UserId);
    let user = this.curr_user_Json.UserId;
    let usersRef = await firebase.database().ref(`${this.pin}/chatrooms/`);
    usersRef.orderByValue().once("value", function (parentsnapshot) {
      parentsnapshot.forEach(function (snapshot) {
        snapshot.forEach(function (data) {
           console.log("l2",data.key);
          data.forEach(function (datanew) {
            console.log("l1",datanew.key);
            datanew.forEach(function (admin) {
              console.log(`pid ${datanew.key} `);
              admin.forEach(function (datanewnew) {
                console.log(`pid ${admin.key} ${user}`);
              if (admin.key == `${user}`) {
                datanewnew.forEach(function (snap) {//if(datanew.key!="DeviceToken") || if(datanew.key!="EmailAddress")|| if(datanew.key!="UserImage")||if(datanew.key!="adminid"))
                  // if(snap.key!="adminid" )
                  //{
                  console.log( `snap ${snap.key}`);
                  if (snap.key == "chats")
                    
                          returnArr.push(snap.ref.toString());

                  // }
                });
              }
            });
            });
          });

        });
      });
      // console
      console.log("final", returnArr);


      var arrVal = returnArr.map(item => {
        var splitVal = item.split('/');
        news.push({ "pin": `${splitVal[3]}`, "chatrooms": 'chatrooms', "type": `${splitVal[5]}`, "id1": `${splitVal[6]}`, "id2": `${splitVal[7]}`, "adminid": `${splitVal[8]}`, "userid": `${splitVal[9]}` })
        console.log(splitVal, "Splitvalnew")
        console.log("news", news);
      })
      let resSTR = JSON.stringify(news);
      let resJSON = JSON.parse(resSTR);
      userList = resJSON
      console.log("news", resJSON);
      
    }).then(async (val) => {
      this.userchatList = userList
      this.duplicatesearchlist=this.userchatList;
      if(userList!=null)
      {


      
      for (let i = 0; i < userList.length; i += 1) {
        console.log("i", i);
       // console.log("must check ",userList[i].pin);
        await this.lastMessage(news, i , userList[i].pin, userList[i].id1, userList[i].id2, userList[i].type, userList[i].adminid, userList[i].userid)
        //console.log("message", message)
        // news.push( {message})
      //  news[i][`message`] = message;
        console.log(news[i])
      }
      this.userchatList = news
      this.duplicatesearchlist=this.userchatList;
    }
    }).then(async (val) => {
      this.userchatList = userList
      this.duplicatesearchlist=this.userchatList;
      if(userList!=null)
      {


      
      for (let i = 0; i < userList.length; i += 1) {
        console.log("i", i);
       // console.log("must check ",userList[i].pin);
       await this.unreadMessageCount(news, i ,userList[i].pin, userList[i].id1, userList[i].id2, userList[i].type, userList[i].adminid, userList[i].userid)
      //  console.log("message count", messagecount)
        // news.push( {message})
        //news[i][`messageCount`] = messagecount;
        //console.log(news[i])
      }
      this.userchatList = news
      this.duplicatesearchlist=this.userchatList;
    }
    }).then(async (val) => {

     // loadUserDetails(




      if(userList!=null)
      {
        await this.loadUserDetails( userList,5);

/*
      
      for (let i = 0; i < userList.length; i += 1) {
        
        let senderName = await this.loadUserDetails( userList[i].adminid,5)
        console.log("message count", senderName)
        // news.push( {message})
        news[i][`senderName`] = senderName;
        console.log(news[i])
      }
      this.userchatList = news

      */
    }






    loader.dismiss()
    });

    
  }






















  async forUser() {
    let loader = this.loading.create({
      spinner: "crescent",
      content: "Loading . . . "
    });
    loader.present();
    let returnArr = [];
    let news = [];
    var userList;
    console.log("uid", this.curr_user_Json.UserId);
    let user = this.curr_user_Json.UserId;
    let usersRef = await firebase.database().ref(`54345/chatrooms/`);
  usersRef.orderByChild('adminid').once("value", function (parentsnapshot) {
      //console.log(snapshot.val());
      //usersRef.orderByKey().once("value", function (parentsnapshot) {
      parentsnapshot.forEach(function (snapshot) {
        console.log('snapshot', snapshot)
        snapshot.forEach(function (data) {
          console.log("yo ", data);
          data.forEach(function (datanew) {
            console.log("yo yo ", datanew);
            datanew.forEach(function (datanewnew) {
              console.log("yo yo ", datanewnew);
              datanewnew.forEach(function (snap) {//if(datanew.key!="DeviceToken") || if(datanew.key!="EmailAddress")|| if(datanew.key!="UserImage")||if(datanew.key!="adminid"))
                // if(snap.key!="adminid" )
                //{
                console.log(` final ${snap.key}`);

                if (snap.key == `${user}`) {
                  console.log(`test url`, snap.ref.toString())
                  console.log(snap.key);
                  if (snap.key != "DeviceToken")
                    if (snap.key != "EmailAddress")
                      if (snap.key != "UserImage")
                        if (snap.key != "adminid")
                          returnArr.push(snap.ref.toString());

                }
                // }
              });


            });
          });

        });
      });
      // console
      console.log("final", returnArr);


      var arrVal = returnArr.map(item => {
        var splitVal = item.split('/');
        news.push({ "pin": `${splitVal[3]}`, "chatrooms": 'chatrooms', "type": `${splitVal[5]}`, "id1": `${splitVal[6]}`, "id2": `${splitVal[7]}`, "adminid": `${splitVal[8]}`, "userid": `${splitVal[9]}` })
        console.log(splitVal, "Splitvalnew")
        console.log("news", news);
      })
      let resSTR = JSON.stringify(news);
      let resJSON = JSON.parse(resSTR);
      userList = resJSON
      console.log("news", resJSON);


      //this.userchatList = news
      // console.log(this.userchatList, "Splitvalold")
    }).then(async (val) => {
      this.userchatList = userList
      this.duplicatesearchlist=this.userchatList;
      if(userList!=null)
      {


      
      for (let i = 0; i < userList.length; i += 1) {
        console.log("i", i);
       // console.log("must check ",userList[i].pin);
        await this.lastMessage(news,i ,userList[i].pin, userList[i].id1, userList[i].id2, userList[i].type, userList[i].adminid, userList[i].userid)
       // console.log("message", message)
        // news.push( {message})
       // news[i][`message`] = message;
        console.log(news[i])
      }
      this.userchatList = news
      this.duplicatesearchlist=this.userchatList;
    }
    }).then(async (val) => {
      this.userchatList = userList
      this.duplicatesearchlist=this.userchatList;
      if(userList!=null)
      {


      
      for (let i = 0; i < userList.length; i += 1) {
        console.log("i", i);
       // console.log("must check ",userList[i].pin);
        //let messagecount = await this.unreadMessageCount(userList[i].pin, userList[i].id1, userList[i].id2, userList[i].type, userList[i].adminid, userList[i].userid)
      // console.log("message count", messagecount)
        // news.push( {message})
       // news[i][`messageCount`] = messagecount;
        //console.log(news[i])
        console.log("before  unread count");
       await this.unreadMessageCount(news,i,userList[i].pin, userList[i].id1, userList[i].id2, userList[i].type, userList[i].adminid, userList[i].userid)
      }
      this.userchatList = news
      this.duplicatesearchlist=this.userchatList;
    }
    }).then(async (val) => {

     // loadUserDetails(




      if(userList!=null)
      {
        await this.loadUserDetails( userList,5);

/*
      
      for (let i = 0; i < userList.length; i += 1) {
        
        let senderName = await this.loadUserDetails( userList[i].adminid,5)
        console.log("message count", senderName)
        // news.push( {message})
        news[i][`senderName`] = senderName;
        console.log(news[i])
      }
      this.userchatList = news

      */
    }




    loader.dismiss()



    });

    
  }
  async  loadUserDetails(instid,num ){
    var userIdToPaSS;
    
    for (let i = 0; i < instid.length; i += 1) {
      if(this.roletype=="user"||this.roletype=="labAdmin")
      {
        userIdToPaSS= instid[i].adminid;
      }
      else if (this.roletype == "super"||this.roletype == "providerAdmin"||this.roletype == " admin")
      {
        userIdToPaSS= instid[i].userid;
      }
      
    await this.http.get(this.getUserDetails+`/${userIdToPaSS},${num},${this.curr_user_Json.UserId},${this.curr_user_Json.UserToken}`)
      .subscribe(
        async (data: any) => {
          //RESPONSE
      
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          console.log("user id details ",resJSON);
          this.userChatJson=resJSON;
          //this.userChatJson=this.userChatJson;
           this.senderName=`${this.userChatJson[0].LastName} ${this.userChatJson[0].FirstName}`;
           this.UserImage=`${this.userChatJson[0].UserImage}`
          console.log("sendername ",this.senderName);
          this.userchatList[i][`senderName`] = this.senderName;
          this.userchatList[i][`UserImage`]=this. UserImage
          console.log("after sender name",this.userchatList[i]);
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
  fetchChatdetail(Chat) {
    console.log(Chat)
  }
  //messagelast: any;






























/*


  async unreadMessageCount(news,i ,pin, id1, id2, type, adminId, userId) {
    this.getMessages(news,i ,pin, id1, id2, type, adminId, userId);


    
console.log("unreadcount");
    let user = this.curr_user_Json.UserId
    let countlocal = 0;
    let counteach=0;
    let unread;
    this.firebase.list(pin + `/chatrooms/` + type + `/` + id1 + `/` + id2 + `/` + adminId + `/` + userId + `/chats`).snapshotChanges().subscribe
    //let dbCon = await firebase.database().ref(pin + `/chatrooms/` + type + `/` + id1 + `/` + id2 + `/` + adminId + `/` + userId + `/chats`);

   // await dbCon.on("value", async function (snapshot)
    
   (async snapshot=>
    {

      snapshot.forEach(function (child) {
      counteach ++;
      console.log("child count",counteach);
        unread=child.payload.val();
 
        console.log("child and unread ", child.payload.val(),unread);
       if (unread.user != user && unread.status == "unread") {
         console.log ( "condition ",unread.user,user,unread.status,"unread");
         countlocal++;

         console.log("count local innner", countlocal);
       
         //this.adminListJson1[i]['unReadMessage']=countlocal;
       }
       console.log("count local outer 1 ", countlocal);
     // news[i][`messageCount`] = countlocal;
       //console.log("c local",countlocal);
       // this.test(this.adminListJson1,i,countlocal);
     });
     console.log("count local outer 2 ", countlocal);
    })
    console.log("clocal",countlocal);
    console.log("news",news[i],news)
//news[i][`messageCount`] = countlocal;
    //console.log("unread count ", countlocal);
    //return countlocal

    
  }
*/
  








  messages=[]
  unreadMessageCount(news,j ,pin, id1, id2, type, adminId, userId){
    let user = this.curr_user_Json.UserId
    console.log(pin + `/chatrooms/` + type + `/` + id1 + `/` + id2 + `/` + adminId + `/` + userId + `/chats`);
    this.firebase.list(pin + `/chatrooms/` + type + `/` + id1 + `/` + id2 + `/` + adminId + `/` + userId + `/chats`).snapshotChanges().subscribe(snap=>{
      this.messages=snap.map(item=>{
        return{
          $key:item.key,
          ...item.payload.val()
        }
  
      })
      this.messageCount=0;
      for( let i=0;i<this.messages.length;i++)
        {
  if((this.messages[i]['status']=='unread')&& (this.messages[i]['user']!=user))
  
  {
    console.log("test",this.messages[i]['status'],`read`,this.messages[i]['user'],user);
    this.messageCount++;
  }
  
        }
      
      console.log(this.messages.length)
      console.log("actual messagecount ", this.messageCount);
      news[j][`messageCount`]=this.messageCount
    })
    
  }



  
  async lastMessage(news, i , pin, id1, id2, type, adminId, userId) {
    var lastmsg;
let count
    this.firebase.list(pin + `/chatrooms/` + type + `/` + id1 + `/` + id2 + `/` + adminId + `/` + userId + `/chats`).snapshotChanges().subscribe(snap=>{
      this.messages=snap.map(item=>{
        return{
          $key:item.key,
          ...item.payload.val()
        }
  
      })
      
      count=this.messages.length
      console.log("count ",count,this.messages[this.messages.length-1]["message"]);
      if(this.messages[this.messages.length-1]["type"]=="message")
      {
        news[i]["message"]=this.messages[this.messages.length-1]["message"];
      }
      else if (this.messages[this.messages.length-1]["type"]=="image")
      news[i]["message"]="Image";
      //return this.messages[this.messages.length-1]["message"];
    })
    
    /*
    await firebase.database().ref(pin + `/chatrooms/` + type + `/` + id1 + `/` + id2 + `/` + adminId + `/` + userId + `/chats`).orderByKey().limitToLast(1).once('value', async resp => {
      console.log(pin + `/chatrooms/` + type + `/` + id1 + `/` + id2 + `/` + adminId + `/` + userId + `/chats`)
      //await firebase.database().ref(pin+`/chatrooms/SampleSubmission/3580/540/733/732/chats`).orderByKey().limitToLast(1).on('value', resp => {
      // this.messagelast = [];

      lastmsg = await snapshotToArray(resp);
      if(lastmsg!=null)
      {
        
      }
      
     
    });
    return lastmsg[0]["message"];
    */
  }
















fetchChatdetails(chatlist) {
 // console.log(chatlist)
 console.log("role",this.roletype);
  if (chatlist.type == "TechnicalIssues") {
  if (this.roletype == "super"||this.roletype == "providerAdmin"||this.roletype == " admin") {
  this.navCtrl.push('ChatContentPage', { "role": `${this.roletype}`, "userid": `${chatlist.userid}`, "adminid": `${this.curr_user_Json.UserId}`, "instrumentid": `${chatlist.id2}`, "ticketid": `${chatlist.id1}`,  "senderName": `${chatlist.senderName} `, "pin": `${this.pin}`, "source": `Technical Issues`, "chatType": `TechnicalIssues` })
  }
  else {
  this.navCtrl.push('ChatContentPage', { "id":"user","role": `${this.roletype}`, "userid": `${this.curr_user_Json.UserId}`, "adminid": `${chatlist.adminid}`, "instrumentid": `${chatlist.id2}`, "ticketid": `${chatlist.id1}`, "senderName": `${chatlist.senderName} `, "pin": `${this.pin}`, "source": `Technical Issues`, "chatType": `TechnicalIssues` })
  }
  }
  else if (chatlist.type == "SampleSubmission") {
  if (this.roletype == "super"||this.roletype == "providerAdmin"||this.roletype == " admin") {
  this.navCtrl.push('ChatContentPage', { "role": `${this.roletype}`, "userid": `${chatlist.userid}`, "adminid": `${this.curr_user_Json.UserId}`, "ProviderId": `${chatlist.id2}`, "WorkOrderId": `${chatlist.id1}`,  "senderName": `${chatlist.senderName} `, "pin": `${this.pin}`, "source": `Sample Submission`, "chatType": `SampleSubmission` })
  }
  else {
    // this.navCtrl.push('ChatContentPage', {"WorkOrderId":`${this.WorkOrderId}`,"OrderId":`${this.OrderId}`,"ProviderId":`${this.ProviderId}`,"role":`${this.roletype}`,"adminid":`${adminid.UserId}`,"instrumentid":`${this.instid}`,"curuser":`${this.userJson.UserId}`,"ticketid":`${this.ticketId}`,"senderName":`${adminid.LastName} ${adminid.FirstName}`,"pin":`${this.pin}`,"source":`${this.source}`,"chatType":`${this.chatType}`,"AppointmentId":`${this.AppointmentId}`})
  this.navCtrl.push('ChatContentPage', { "role": `${this.roletype}`, "userid": `${this.curr_user_Json.UserId}`, "adminid": `${chatlist.adminid}`, "ProviderId": `${chatlist.id2}`, "WorkOrderId": `${chatlist.id1}`, "senderName": `${chatlist.senderName} `, "pin": `${this.pin}`, "source": `Sample Submission`, "chatType": `SampleSubmission` })
  }
  }
  else if (chatlist.type == "SuppliesOrder") {
  if (this.roletype == "super"||this.roletype == "providerAdmin"||this.roletype == " admin") {
  this.navCtrl.push('ChatContentPage', { "role": `${this.roletype}`, "userid": `${chatlist.userid}`, "adminid": `${this.curr_user_Json.UserId}`, "ProviderId": `${chatlist.id2}`, "OrderId": `${chatlist.id1}`,  "senderName": `${chatlist.senderName} `, "pin": `${this.pin}`, "source": `Supplies Order`, "chatType": `SuppliesOrder` })
  }
  else {
  this.navCtrl.push('ChatContentPage', { "role": `${this.roletype}`, "userid": `${this.curr_user_Json.UserId}`, "adminid": `${chatlist.adminid}`, "ProviderId": `${chatlist.id2}`, "OrderId": `${chatlist.id1}`,  "senderName": `${chatlist.senderName} `, "pin": `${this.pin}`, "source": `Supplies Order`, "chatType": `SuppliesOrder` })
  }
  }
  else if (chatlist.type == "Reservations") {
  if (this.roletype == "super"||this.roletype == "providerAdmin"||this.roletype == " admin") {
  this.navCtrl.push('ChatContentPage', { "role": `${this.roletype}`, "userid": `${chatlist.userid}`, "adminid": `${this.curr_user_Json.UserId}`, "instrumentid": `${chatlist.id2}`, "AppointmentId": `${chatlist.id1}`,  "senderName": `${chatlist.senderName} `, "pin": `${this.pin}`, "source": `Reservations`, "chatType": `Reservations` })
  }
  else {
  this.navCtrl.push('ChatContentPage', { "role": `${this.roletype}`, "userid": `${this.curr_user_Json.UserId}`, "adminid": `${chatlist.adminid}`, "instrumentid": `${chatlist.id2}`, "AppointmentId": `${chatlist.id1}`,  "senderName": `${chatlist.senderName} `, "pin": `${this.pin}`, "source": `Reservations`, "chatType": `Reservations` })
  }
  }
  
  }
  getItems(searchbar) {
    var q = this.searchText;
    var searchList = this.userchatList
    console.log(this.userchatList)

    if (q == null || q == "") {
      //  this.isSearchResult = false
      this.userchatList = this.duplicatesearchlist
      return true;
    }

    this.userchatList = this.duplicatesearchlist.filter((v) => {
      if (v.senderName && q) {
        if (v.senderName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          //  this.isSearchResult = false
          return true;
        } else if (v.senderName.toLowerCase().indexOf(q.toLowerCase()) < -1) {
          // this.isSearchResult = true
          //  this.userInstrumentJson = []
        }


        return false;
      }

      //   ()
    });


  }
}
export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    // item.key = childSnapshot.key;
    if(item.type=="image")
    {
      item.message='Image';
    }
    console.log("item", item);
    // console.log("key",item.key());
    returnArr.push(item);
  });

  return returnArr;
};
