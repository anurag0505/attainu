const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send("hello looks like something has changed")

})
 
app.listen(3000);



