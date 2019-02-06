const aesjs=require("aes-js");
const base64js = require('base64-js');
const ab2str = require('arraybuffer-to-string');


class AESUtils
{
    constructor(key)
    {
       this.bs=32; 
       this.key=key
       
    }
    encrypt(raw) {
        //Message should be a multiple of 16 bytes
        raw=this.pad(raw);
        console.log("This is called inside encrypt function : "+raw.length)
        // The initialization vector (must be 16 bytes)
        var iv = [ 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,35, 36 ];
        //Convert text to bytes
        var textBytes = aesjs.utils.utf8.toBytes(raw);
        var aesCbc = new aesjs.ModeOfOperation.cbc(this.key, iv);
        //Encrypt the message
        var encryptedBytes = aesCbc.encrypt(textBytes);
        var encryptedBytesBase64 =base64js.fromByteArray(encryptedBytes);
        return encryptedBytesBase64;
        

    }
    decrypt(enc){
        var iv = [ 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,35, 36 ];
        console.log("THIS IS INSIDE DECRYPT :"+enc.length)
        var encryptedBytes=base64js.toByteArray(enc)
        var aesCbc = new aesjs.ModeOfOperation.cbc(this.key, iv);
        //Get the decrypted bytes
        var decryptedBytes = aesCbc.decrypt(encryptedBytes);
        //Convert the decrypted bytes to text
        var uint8 = new Uint8Array(decryptedBytes)
        var decryptedText= ab2str(uint8,'base64')
        return this.unpad(decryptedText);
        
    }
    ord(str){
        return str.charCodeAt(0);
    }
    
    pad(s){
        var fins="";
        var num=this.bs - s.length % this.bs;
        for(var i=0;i<num;i++)
        {
            fins=fins+String.fromCharCode(this.bs - s.length % this.bs);
        }
        return s+fins;
        
    }
    unpad(s){
        return s.substr(0,s.length-this.ord(s.substr(s.length-1)));
    }

}
//var aes=new AESUtils([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16])
//console.log(aes.encrypt("yash2335555sdsfsfsfskfhsfhsfksjfhsdfefussbhsdhvbsfgsdgfbskbksgyssdjfhsdfhsdhfdsdhksjhfkjdshfkjshfkjdshfsdfhdshfjkdshfjkfhsjfhsdjkfhdsjkfbscsbcsdjfhdsbhfskhbcxb"))
//console.log(aes.decrypt("sD+adp+N9aqQlsCArCV3qIToOEqPEAgZIrE6rTey44k="))
module.exports={AESUtils}