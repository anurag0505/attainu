var express=require('express');
var app=express();
var session=require('express-session');



app.use(session({
    secret:'used to sign session ID cookie'
}));

app.use(function(req,res,next){
    if(!req.session.views){  // if req.session.views does not exist create req.session.views and create an empty object fot that.
        req.session.views={};
    }
    var path=req.originalUrl;
    req.session.views[path]=(req.session.views[path]||0)+1;//
    next();
});


app.get('/', function(req,res){
    res.send("<h1>This is our HomePage<h4>you are visiting this page for "+req.session.views[req.originalUrl]+" time</h4></h1>")
})

app.get('/news', function(req,res){
    res.send("<h1>This is our news feeds<h4>you are visiting this page for "+req.session.views[req.originalUrl]+"time</h4></h1>")
    
})

app.listen(3000);