var express=require('express');

var app= express();

app.set('view engine','hbs');

app.use(express.static('public'))

app.get('/',function(req,res){

    var players = [
        { name: "Roger Federer", rank: 1 },
        { name: "Rafel Nadal", rank: 2 },
        { name: "Nalbandian", rank: 12 },
        { name: "Andy Murray", rank: 14 },
        { name: "Andy Roddick", rank: 4 },
        { name: "Pete Sampras", rank: 3 },
        { name: "Rod Laver", rank: 190 },
        { name: "Andre Agassi", rank: 11 },
        { name: "Novak Djokovic", rank: 5 },
        { name: "Arthur Ashe", rank: 8 },
        ];



    res.render('home.hbs',{
       title:"homepage", 
       array:players
    })
})

app.get('/about',function(req,res){
    res.render('about.hbs',{
       title:"about",
       style:'about.css'
       

    })
})

app.listen(3000);