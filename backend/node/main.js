/*var math = require("./fun");

console.log(math.add(75,5));
console.log(math.sub(450,56));*/


/*var fs = require("fs");

function printFileContent(error, data){
    if(error)
        console.log("some error has happened");
    
    else{
        console.log(data);
    }
}


fs.readFile("./hello.txt","utf-8", printFileContent);*/
 var http = require("http");
 
 http.createServer(function(request,response){
     response.end("hello world");

 }).listen(3000);



