var express=require('express');
var app=express();

app.use(express.static('public'));

var session=require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));


app.use(function (req, res, next) {
    if (!req.session.views) {
      req.session.views = {}
    }
   
    // get the url pathname
    var pathname=req.originalUrl;
   
    // count the views
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
   
    next()
  })
  

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded());

var user=require('./user.json');
var tweets=require('./tweets.json');


app.post('/auth',function(req,res){
    console.log(req.body.password)
    console.log(req.body.username)

    var flag=false;
    for(i=0;i<user.length;i++){
       if(user[i].username==req.body.username && user[i].password==req.body.password){
           flag=true;
           break;
       }
    }
    if(flag){
        res.sendfile(__dirname+'/form.html')
    }else{
        res.redirect('/')
    }
    
});
app.post('/tweetit', function(req,res){
    tweets.push(req.body);
    res.json({success:"your tweet was posted successfully"});
});

app.get('/seetweets',function(req,res){
    res.send(tweets);
})







app.listen(3000);

