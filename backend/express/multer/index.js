var express=require('express');
var app=express();
var multer=require('multer');


var upload = multer({ dest: 'uploads/'})
app.use(express.static('uploads'));
 

app.get('/', function(req,res){
    res.sendFile(__dirname+'/form.html')
})


app.post('/picturesUpload', upload.single('pics'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
        console.log(req.file);
        res.send("<img src="+req.file.filename+"></img>")
     //   mongoclint.insertOne({imagepath:req.file.filename})  to use it in mongodb
    
});
    

app.listen(3000);