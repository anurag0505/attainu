var express=require('express');
var app=express();
var bodyParser=require('body-parser')


var studentDB=[{
    name:"virat",
    title:"kholi",
    gender:"male",
},{
    name:"mayank",
    title:"agarwal",
    gender:"male",
},{
    name:"ranu",
    title:"yadav",
    gender:"female",
}]

app.get('/home', function(req,res){
    res.send(studentDB);

});

/*app.post('/post', function(req,res){
     var newStudent={
        name:"preeti",
        title:"rao",
        gender:"female",
     }
     studentDB.push(newStudent);
     res.json({messsage:"new student is added"});
})*/
app.get('/formPage', function(eq,res){
    res.sendFile(__dirname+'/form.html')
}),

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


app.post('/addStudentWithForm',function(req,res){
    studentDB.push(req.body);
    res.send(req.body.name+" is added")
});
//------------------------------------------------------------------------------------------------

app.post('/modifyStudent',function(req,res){

    var searchStudent=req.body.name;
    var index=-1;
    
    
    for(i=0;i<studentDB.length;i++){

       

        if(studentDB[i].name==searchStudent){
            
            index=1;
            break;
        }
    }
    if(index==-1){
        studentDB.push(req.body)
        res.send(req.body.name+" is added");


    }else{
        studentDB[index].name=req.body.name;
        studentDB[index].title=req.body.title;
        studentDB[index].gender=req.body.gender;
        res.send(req.body.name+" is modified");
    }

});
//----------------------------------------------------------------------------------------------

app.put('/putRequest/:name', function(req,res){
    console.log(req.params)
    console.log(req.body)
    console.log(req.body.params)//this is undefined
    console.log(req.params.name)
    var index=-1;
    for(i=0;i<studentDB.length;i++){
        
        
       if(studentDB[i].name==req.params.name){
        index=i;
       }
        
    }
    if(index== -1){
        
        res.json({success:"student does not exist in the data base"});
    }else{
        console.log(studentDB[index]);
        studentDB[index].title=req.body.title;
        studentDB[index].gender=req.body.gender;
        res.json({success:studentDB[index].name+" is modified"})
    }


});
//--------------------------------------------------------------------------------------------------------------------------

app.delete('/putRequest/:name', function(req,res){
    var index=-1;
    for(i=0;i<studentDB.length;i++){
        if(studentDB[i].name==req.params.name)
        index=i;
    }
    if(index==-1){
        res.json({error:"student not found in the data base"});
    }
    else{
        studentDB.splice(index,1);  
        res.json({success:req.params.name+" is deleted"});
    }
    

})  

 
app.listen(3000);