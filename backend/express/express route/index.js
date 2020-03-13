var express=require("express");
var app=express();
var port=3000;


var studentDB= [{
    "name": "anjali",
    "title": "pandey",
    "gender": "female"
}, {
    "name": "anurag",
    "title": "mishra",
    "gender": "male"

}, {
    "name": "ajay",
    "title": "tewari",
    "gender": "male"


}]



app.use(express.static(__dirname+ '/assets'));


app.use(function(req,res,next){
    console.log(req.protocol+'://'+req.hostname+port+req.originalUrl);
    console.log("this is middleware");
    next(); 
    
});



app.get(('/'),function(req,res){
    res.sendFile(__dirname+'/express.html');
    
});

app.get(('/getStudent'),function(req,res){
    res.json(studentDB);
   
});

app.get(('/contact'),function(req,res){
    res.sendFile(__dirname+'/contact.html');
    
});

app.get(('/contact/address'),function(req,res){
    res.sendFile(__dirname+'/address.html');
    
});








app.listen(port);