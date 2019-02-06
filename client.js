const net = require("net");
// Create a socket (client) that connects to the server
var socket = new net.Socket();
socket.connect(2552, "localhost", function () {
    console.log("Client: Connected to server");
});

var sendMessage=function(msg){
    return new Promise(function(resolve,reject){
        socket.write(msg);
        socket.on("data",function(data){
        data=data.toString('utf8')
        resolve(data);
    
    
    })
    
    })
    
}
var receiveMessage=function(){
    return new Promise(function(resolve,reject){
        socket.on("data",function(data){
            resolve(data.toString('utf8'));
                    })
    })
        
        
    
    
}
var getTimestamp=function(){
    return Date.now();
}

module.exports={sendMessage,receiveMessage,getTimestamp};