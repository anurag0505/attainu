var express = require('express');
var app = express();
var bodyParser = require('body-parser');


var studentDB=[{
    firstname:"virat",
    lastname:"kholi",
    gender:"male",
},{
    firstname:"rohit",
    lastname:"sharma",
    gender:"male",
},{
    firstname:"mitali",
    lastname:"raj",
    gender:"female",
}];


app.get(('/'), function(req,res){
    res.send("all is well");    

}),

app.get(('/allStudent'), function(req,res){
    res.send(studentDB);

});

app.get(('/formdata'),function(req,res){
    res.sendFile(__dirname+"/form.html");

})
app.get(('/ajaxform'),function(req,res){
    res.sendFile(__dirname+"/ajax.html");
})

app.use(('/addStudent'), bodyParser.urlencoded());

app.post(('/addStudent'),function(req,res){
   console.log(req.body);
   var searchStudent=req.body.firstname;
   var index=-1;

   for(i=0; i<studentDB.length; i=i+1){
       if(studentDB[i].firstname==req.body.firstname){
          // searchStudent=studentDB[i];
           index = i;
           break;
       }
    }
    if(index==-1){
        studentDB.push(req.body);
        res.json({message:"student entry created"})
    }
    else{
        studentDB[index].firstname=req.body.firstname;
        studentDB[index].lastname=req.body.lastname;
        studentDB[index].gender=req.body.gender;
        res.json({message:"student entry modified"});

    }
});






app.listen(3000);