var express=require('express');
var app=express();
var bodyParser=require('body-parser');

var studentDB=[{
    firstname:"shankar",
    lastname:"singh",
    hometown:"kolkata",
},{
    firstname:"indu",
    lastname:"sharma",
    hometown:"howrah",
},{
    firstname:"anil",
    lastname:"kappor",
    hometown:"belur",
}]


app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});
//---------------------------------------------------------------------------------------------------
app.get('/getStudents',function(req,res){
    res.send(studentDB);
    
});






app.post('/addStudent',function(req,res){
    var newStudent={
        firstname:"ajay",
        lastname:"devgan",
        hometown:"mumbai",
    }
    studentDB.push(newStudent);
    
    res.send("new student is added to the data base")
});

//-----------------------------------------------------------------------------------------------------------------
app.use('/modifyRequest',bodyParser.json());
app.use(bodyParser.urlencoded());


app.get('/formPage',function(req,res){
    res.sendFile(__dirname+'/form.html');
});

app.post('/formStudents',function(req,res){
    console.log(req.body)
    studentDB.push(req.body);
    res.send(req.body.firstname+" is added")

});

app.put('/modifyRequest/:firstname', function(req,res){
    var index=-1;
    console.log(req.params)
    console.log(req.body)
    
    console.log(req.params.firstname)

    for(i=0;i<studentDB.length;i++){
        if(studentDB[i].firstname==req.params.firstname){
            index=i;
        }
    }
    if(index==-1){
        res.send("student not found in the database")
    }else{
        
        studentDB[index].lastname=req.body.lastname;
        studentDB[index].hometown=req.body.hometown;
        res.json({success:req.params.firstname+" is modified"});
    }


});

app.delete('/deleteRequest/:firstname',function(req,res){
        var index=-1;
        
        console.log(req.params.firstname);
        for(i=0;i<studentDB.length;i++){
            
            if(studentDB[i].firstname==req.params.firstname){
                console.log(studentDB[i].firstname);
                index=i;
            }

        }

        if(index==-1){
            res.send("student not found in the database")
        }else{
            studentDB.splice(index,1)
            res.json({success:req.params.firstname+" is deleted"});
        }

});







app.listen(3000);
