var express= require('express');
var app = express();
var bodyParser = require('body-parser')

var studentDB=[]




app.get(('/'), function (req,res) {
    res.send("welcome everything is working fine")

});

app.get('/getStudent', function(req,res){
    res.send(studentDB);

});

app.get(('/formPage'), function(req,res){

    res.sendFile(__dirname+('/post.html'))

});

app.use(('/addNewStudent'), bodyParser.urlencoded());





app.post(('/addNewStudent'), function (req,res) {
    studentDB.push(req.body);
    res.json({success:"student added succesfully"})
   

});






app.listen(3000);