var express= require('express');
var Router=express.Router();
Router.get('/allAdmin', function(req,res){
    res.send("<h4>This is a admin area</h4>");

});

module.exports=Router