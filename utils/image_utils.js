const fs=require('fs')

var imageToString=function(filename){
    // read binary data
    var binaryImg = fs.readFileSync(filename);
    // convert binary data to base64 encoded string
    return new Buffer(binaryImg).toString('base64');
}
var stringToImage=function(str,filename){
    //Decoding the base64 string and writing the file 
    fs.writeFile(filename,str,'base64',function(err){
        if(err)
        throw err;
    })
    
}
module.exports={imageToString,stringToImage}
