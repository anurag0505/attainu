var express=require('express');
var MongoClient = require('mongodb').MongoClient;
var bodyParser=require('body-parser');


var app=express();

var url = 'mongodb://localhost:27017';
var db;
MongoClient.connect(url, {useUnifiedTopology: true},function(error,client){
    db=client.db('school')
});
app.use(bodyParser.json());

app.get('/getAllStudents', function(req,res){
   db.collection('school').find({}).toArray(function(error,result){
       if(error)
       throw error;
       res.json(result)
   })

});

app.post('/addStudent', function(req,res){
    db.collection('school').insertOne(req.body, function(error,result){
        if(error)
        throw error;
        res.json(result);   
    });
    
});

app.post('/addManyStudent', function(req,res){
    db.collection('school').insertMany(req.body, function(error,result){
        if(error)
        throw error;
        res.json(result);   
    });
    
})

app.put('/modifyStudent', function(req,res){
    db.collection('school').updateOne({name:req.body.name},{$set:{hometown:req.body.hometown}}, function(error,result){
        if(error)
        throw error;
        res.json(result);   
    });
    
});

app.put('/modifyWithId', function(req,res){
    db.collection('school').updateOne({_id: require('mongodb').ObjectID(req.body.id)},{$set:{hometown:req.body.hometown}}, function(error,result){
        if(error)
        throw error;
        res.json(result);   
    });
    
});

app.delete('/deleteStudent', function(req,res){
    db.collection('school').deleteOne({name:req.body.name}, function(error,result){
        if(error)
        throw error;
        res.json(result);   
    });
    
})




app.listen(3000);