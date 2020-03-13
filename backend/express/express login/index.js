var express=require('express');
var app=express();

var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded());

var session = require('express-session');

app.use(session({
    secret:"secret",
}));

var user=require('./user.json');

app.use(express.static('public'));;


    



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





/*app.get('/', function(req,res){
    res.send('<h1>this is the '+req.session.views[req.originalUrl] +'time</h1>');
    
});*/

app.get('/profile', function(req,res){
    console.log(req.session)
    if(req.session.loggedin){
        res.send('<h1>this is the '+req.session.views[req.originalUrl] +'time</h1><a href="/logout">logout</a>');

    }else{
        res.redirect('/');
    }
    
    

});

app.post('/auth', function(req,res){
    var flag=false;
    for(i=0;i<user.length;i++){
        if(user[i].username==req.body.username && user[i].password==req.body.password ){
            flag=true;
            break;
        }
    }
    if(flag){
        req.session.loggedin=true;
        res.redirect('/profile');
    }else{
        res.redirect('/');
    }
    

});

app.get('/logout', function(req,res){
    req.session.destroy();
    res.redirect('/');
})







app.listen(3000);
