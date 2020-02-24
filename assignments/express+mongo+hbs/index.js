
var express=require('express');
var app=express();

var hbs=require('hbs')
app.set('view engine', 'hbs');

var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
MongoClient.connect(url, function(err, client) {
    if(err)
    throw err;
   
    db = client.db('security');
});

var db;
app.use(express.static(__dirname + '/public'));

app.get('/getStudent', function(req,res){
    var filter=req.query
    console.log(filter)

    db.collection('student').find({hometown:filter.hometown}).toArray(function(err,result){
       if(err)
       throw err;
       res.json(result)
   });
});

app.get('/', function(req,res){
    res.render('home.hbs',{
        title:"homePage",
        style:"home.css",
        script:"home.js"

    });
    
});


app.post('/addusers',function(req,res){
    db.collection('student').insert(req.body,function(err,result){
       if(err)
       throw err;
        
        res.json(result);

    });

});


app.listen(3000);