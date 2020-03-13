var express=require('express');
var app=express();
var db;

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://anurag:anurag123@cluster-dbparents-ksrro.mongodb.net/?retryWrites=true&w=majority';

MongoClient.connect(url,function(err,client){
    if(err)
    throw err;
    db=client.db('blog');

});

app.get('/testAtlas', function(req,res){
    db.collection('box').find({}).toArray(function(err,result){
        if(err)
        throw err;
        res.json(result)
    })
})

app.listen(3000);   