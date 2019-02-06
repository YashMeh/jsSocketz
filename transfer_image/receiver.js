const AESUtil=require("../utils/aes_utils");
const imageUtil=require("../utils/image_utils");
const client=require("../client");

const sharedKey=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
//Register Device 
console.log("Registering Device");
var time=client.getTimestamp();
var regmsg=`SHARE #pubkey KEY @senz #time ${time} ^dev2 signature\n`;
const imagePathToSave="received.jpg";
var aes=new AESUtil.AESUtils(sharedKey);        
client.sendMessage(regmsg).then(function(registered){
    //console.log(registered);   
    return new Promise(function(resolve,reject){
        resolve(registered);
    })
})
.then(function(mssg){
    console.log("<><><><><><><><><><><><><><<><>");
    console.log(mssg);
    console.log("Ready to receive message ");
    client.receiveMessage().then(function(encImg){
        return new Promise(function(resolve,reject){
            resolve(encImg);
        })
    }).then(function(enc){
        console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
        console.log(enc);
                
    })
})


