var express=require('express');
var bodyParser=require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app=express();



app.use(express.static('public'));


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get("/login.html", function(req,res){
   res.sendFile(__dirname+'/login.html')
   
})

var url = 'mongodb://localhost:27017';
var db;
var student;


MongoClient.connect(url, {useUnifiedTopology: true},function(error,client){
   db=client.db('security')//creating a database here
});


app.get('/allData', function(req,res){
   db.usernames.renameCollection("users");   

  db.collection('usernames').find({}).toArray(function(error,result){      
       if(error)
       throw error;
       res.json(result)
   });

});


app.get('/query', function(req,res){

   var filters =(req.query.username);
   console.log(req.query.username)

   db.collection('usernames').find({username:filters}).toArray(function(error,result){   
      
         if(error)
         throw error;
         res.json(result)
     });
  
  });

 

  
app.post('/addNew', function(req,res){
   console.log(req.body.username)
         db.collection('users').findOne({ username: req.body.username}, function(err, user) {
            console.log('User found');
            // In case the user not found   
            if(err) {
            console.log('THIS IS ERROR RESPONSE')
            res.json(err)
            } 
            if (user && user.password === req.body.password){
            console.log('User and password is correct')
            res.sendFile(__dirname+'/tweeter.html');
            } else {
            console.log("Credentials wrong");
            res.json({data: "Login invalid"});
            }              
      });
     
});


app.post('/tweerterData', function(req,res){
   db.collection('savetweets').insert(req.body, function(error,result){
       if(error)
       throw error;
       res.json(result);   
   });

});



app.listen(3000);
