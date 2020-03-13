var express=require('express');
var app=express();
var fs= require('fs');

app.get('/',function(req,res){
    var filename=__dirname+'/user.json';
    fs.readFile(filename,'utf-8',function(error,data){
        console.log(filename);
        if(error)
            throw error,
        res.json(JSON.parse(data))
    })
})


app.listen(3000);

