

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')

// this would store all urls objects:
const urls = [];

// Basic Configuration
const port = process.env.PORT || 3000;

// for accessing data from form:
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});



// API for handling post requests:
app.post('/api/shorturl', (req, res) => {
  // let val = req.body.get['url_input']
  let original_url = req.body.url;

  // check if the input is a valid url or not:
  if(original_url.substr(0, 8) != "https://"){
    res.json({
        "error" : "invalid url"
    })
  }

  // storing the index of the new urls:
  const { length } = urls;
  let short_url = length + 1;

  const found = urls.some(el => el.original_url == original_url);
  
  // the url does not already exist so add it:
  if (!found) {
    urls.push({
      'original_url': original_url,
      "short_url": short_url
    })
  }
  else {
    let indx = urls.findIndex((url) => {
      return url.original_url == original_url
    });
    short_url = urls[indx].short_url;
  }

  // return the final json object:
  res.json({
    "original_url": original_url,
    "short_url": short_url
  })

})

// API for handling get requests:
app.get('/api/shorturl/:id', (req, res)=>{
  // get the url:
  let short_url = req.params.id;
  
  // check if it exists in our array:
  const found = urls.some(url =>{
    return url.short_url == short_url
  });

  if(!found){
    res.json({
      "error" : "No short URL found for the given input"
    })
  }

  // if it does find the index of it inside the complex array:
  const indx = urls.findIndex(url => url.short_url == short_url);

  // redirect it to that url:
  res.redirect( urls[indx].original_url );
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
