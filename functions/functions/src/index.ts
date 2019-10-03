import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
const v2 = admin.initializeApp({
    databaseURL: "https://sopaa-b37c1.firebaseio.com"
  }, 'v2');
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
let name :string;
let message:string;
let user:string;
let token:string;
//let tokennew=`csZJnqo75sI:APA91bE_PU0s0DiALglJ1Iq-q-QQVtgKm3Rxi4s5onnau1wIT0BOO44uiUcqA4f-d7j4PRQQKheOk8DMVEEb9sl299n001IzfCoDwO1TYlA8w4G0F5PEsuzcHtr1M5tRjyfFXtBSgwlU`;
export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
 });
 exports.ideaelanchat = functions.database.instance('sopaa-b37c1').ref('chatrooms/{pushId1}/{pushId2}/{pushId3}/chats/{pushId}').onCreate((change, context) => {
    
   /* 
    console.log("params",context.params);
    console.log("triggered",context.params.pushId);
    console.log("instrument",context.params.pushId1);
    console.log("admin",context.params.pushId2);
    console.log("user",context.params.pushId3);
    */
    let id = context.params.pushId;
    let instrumentid= context.params.pushId1;
    let  adminid = context.params.pushId2;
    let userid = context.params.pushId3
    

    c();
    async function c(){
    await admin.database(v2).ref(`chatrooms/${instrumentid}/${adminid}/${userid}/chats/${id}`).on('value', (snap:any) => {
    user=snap.child('user').val();
    message=snap.child('message').val();
    //   console.log("user value  ",snap.child('user').val());
       console.log("user value  ",user);
     });
     if (user==userid)//have to change here 
     {
         console.log("both are same ");
         await noti1();
     }
   }

async function noti1()
{

console.log(`chatrooms/${instrumentid}/${adminid}/${userid}`);
    await admin.database(v2).ref(`chatrooms/${instrumentid}/${adminid}/${userid}`).on('value', (snap:any) => {
        token=snap.child('DeviceToken').val();
        name=snap.child('UserName').val();
           console.log("user token  ",snap.child('DeviceToken').val());
           console.log("user value  ",token);
           const payloads = {
            notification: {
              title:`${name} : `,
              body: ` ${message}`,
              icon: 'http://dev.ideaelan.com/dev1/Uploads/UserImages/NoImage.png',
              sound: 'default',
              clickAction: 'fcm.ACTION.HELLO',
              // badge: '1'
            },
            data: {
              extra: 'extra_data',
            },
          };
          return  admin.messaging().sendToDevice(token, payloads);
         });
      
}


   /* let regtokenids :any=[]; 
   
    */
  });
  
  /*
  
  exports.testnotification = functions.database.instance('sopaa-b37c1').ref('chatrooms/{pushId1}/{pushId2}/{pushId3}/chats/{pushId}').onWrite((event:any) => {
    //let regtokenids :any=[];
    console.log()
  //  fetchAdminToken();
  //regtokenids=itemslist;
    const payloads = {
        notification: {
            title: 'New Message ',
            body: ` You have new messages `,
            icon: 'http://dev.ideaelan.com/dev1/Uploads/UserImages/NoImage.png',
            sound: 'default',
            clickAction: 'fcm.ACTION.HELLO',
            // badge: '1'
          },
      data: {
        extra: 'extra_data',
      },
    };
  
    return  admin.messaging().sendToDevice(tokennew, payloads);
   
  });
  */