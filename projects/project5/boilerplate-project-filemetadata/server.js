var express = require('express');
var cors = require('cors');
require('dotenv').config()
var app = express();
//installing mutler package:
const multer = require("multer");
//specifying location for submitting files:
const upload = multer({dest : "myFiles/"});

// for allowing access from other users as well"
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});


// listen for post requests on the following route:
app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next)=>{
  // using multer we are able to acces the info about file which was uploaded!
  res.json({
    "name" : req.file.originalname,
    "type" : req.file.mimetype,
    "size" : req.file.size
    })
  
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
