var express= require('express');
var app=express();

var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }));




var db;

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://anurag:anurag123@cluster-dbparents-ksrro.mongodb.net/?retryWrites=true&w=majority';                                                         //  giving url address which is used in line 13 mongoclint.connect..url

MongoClient.connect(url,{useUnifiedTopology: true}, function(err,client){                      // use unfied trop true is for  deprecaed warning
    if(err)
    throw err;
    db=client.db('signin');                                                                    // client is from err client function 
 
});


app.get('/getallData',function(req,res){
    db.collection("users").find({}).toArray(function(err,result){                                // use to array function in find(all data) like this
        if(err)
        throw err;
        res.json(result);
    });
});


app.use(express.static('public'));

app.post('/addData', function(req,res){
    db.collection('users').findOne({username:req.body.username}, function(err,match){
        console.log(match)
        if(err)
        throw err;
        if(match && match.username==req.body.username){
            res.send("Username already exist, please login with your Password")

        }else{

            db.collection('users').insertOne(req.body,function(err,result){
                if(err)
                throw err;
                res.json({success:"user created, Now you can login with user-id and Password"});  
            })
        }
    });

});

app.post('/auth', function(req,res){
    var flag=false
    db.collection('users').findOne({ username:req.body.username},function(err,user){
        if(err)
        throw err;
        if(user && user.password==req.body.password ){
            flag=true;
            
        }
        if(flag){

            req.session.loggedin=true;
            
            res.redirect('/')
        }else{
            res.send("invalid login, please check credentials")
        }
    });
});


app.get('/', function(req,res){
    if(req.session.loggedin){
        console.log(__dirname)
        res.sendFile(__dirname + '/public/ram.html')
        
    }else{
        
        res.redirect('/signin.html')
    }
    
});

app.get('/logout', function(req,res){
    req.session.destroy()
    res.redirect('/')
});



app.listen(process.env.PORT ||3000);