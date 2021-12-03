

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')

// this would store all urls objects:
const urls = [];

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your API for handling post requests:
app.post('/api/shorturl', (req, res) => {
  // let val = req.body.get['url_input']
  const original_url = req.body.url;

  const { length } = urls;
  let short_url = length + 1;

  const found = urls.some(el => el.original_url == original_url);

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

  res.json({
    "original_url": original_url,
    "short_url": short_url
  })

})

// API for handling get requests:


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
