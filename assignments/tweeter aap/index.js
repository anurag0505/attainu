var express=require('express');
var app = express();

var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded())

app.use(express.static('public'))


var tweets = [
    {
        "name": "digitizer",
        "tweet": "This is a cool piece of information."
    },
    {
        "name": "M0SH",
        "tweet": "@digitizer I agree."
    }
]

app.get('/', function(req,res){
    
    res.send(tweets);

});

app.get('/formPage',function(req,res){
    res.sendfile(__dirname+'/index.html');
});



app.post('/tweeter', function(req,res){
    console.log(req.body)
    tweets.push(req.body)
    res.json({success:"your tweet has been posted successfully"})

})



app.listen(3000);