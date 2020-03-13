var express=require('express');
var app=express();
var bodyParser=require('body-parser');

var studentDB= [{
    "name": "anjali",
    "title": "pandey",
    "gender": "female"
}, {
    "name": "anurag",
    "title": "mishra",
    "gender": "male"
    

}, {
    "name": "ajay",
    "title": "tewari",
    "gender": "male"


}]




app.get('/', function(req,res){
    res.send("welcome");
    
    

    console.log(req);

});

app.get('/getStudent', function(req,res){
    res.send(studentDB);

});

/*app.get('/studentByName', function(req,res){
    console.log(req);
    var searchStudent=null;

    
    
    for(i=0; i<studentDB.length; i++){
       
        console.log(req.query);
        console.log(studentDB[i].name);
       
        if(studentDB[i].name==req.query.identity){
            searchStudent=studentDB[i];

        }
        

    }

    if(searchStudent==null){
        res.json({error:"student does not exist in the data base"});
    }else{
        res.json(searchStudent);
    }

});*/

app.get('/studentByName',function(req,res){
    console.log(req.query);
    searchStudent=null;
    for(i=0;i<studentDB.length;i++){
        if(req.query.name==studentDB[i].name){
            searchStudent=studentDB[i];
        }
        

    }
    if(searchStudent==null){
        res.json({error:"student not found in the data base"});
    }else{
        res.json(searchStudent);
    }


});
app.get('/studentByName/:gender', function(req,res){
    console.log(req.params)
    res.json(studentDB)

})

/*app.post('/addStudents',function(req,res){
    studentDB.push({
        "name": "mohan",
        "title": "das",
        "gender": "male"

    });
    res.json({success:"new student was added successfully"});
})*/

app.get('/newStudentForm', function(req,res){
        res.sendFile(__dirname+'/form.html');

});

app.use('/addStudent', bodyParser.urlencoded());



app.post('/addStudent',function(req,res){
    console.log(req.body)
    
    studentDB.push(req.body);///get request may data access kerne k liye query/param. post request may data accesss kerne k liye body k ander
    res.json({success:req.body.name+" is added"});  
});











app.listen(3000);