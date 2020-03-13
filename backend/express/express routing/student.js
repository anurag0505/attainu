var express= require('express');
var Router=express.Router();
Router.get('/allStudents', function(req,res){
    res.json(['sachin','rakesh','rohit']);

});

module.exports=Router