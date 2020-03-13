var express=require('express');
var app=express();

var studentDB=[{
    name:"virat",
    title:"kholi",
    gender:"male",
},{
    name:"mayank",
    title:"agarwal",
    gender:"male",
},{
    name:"ranu",
    title:"yadav",
    gender:"female",
}]

app.set('view engine','hbs')


app.get('/',function(req,res){
    res.render ('home.hbs',{
        title:"home page",
        name:studentDB[0].name

    });

});

app.get('/about',function(req,res){
    res.render('about.hbs',{
        title:"about"

    });

});

app.listen(3000);