var express= require('express');
var app= express();
var students=require('./student')
var admin=require('./admin')


app.get('/attainu', function(req,res){
    res.send("<h1>This is the home page</h1><a href='/attainu/allAdmin'>admin</a>&nbsp<a href='/attainu/allStudents'>Student</a>")


});

app.use('/attainu', students);
app.use('/attainu', admin);
app.listen(3000)