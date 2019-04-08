const path = require('path');
const express = require('express');

const app = express();
const publicDir = path.join(__dirname, 'public');
const port = process.env.PORT || 8080;

app.use(express.static(publicDir));

app.get('/weather', function(req, res) {
  if( !req.query.search ) {
    return res.send({
      error: 'Error: Missing city.',
    })
  }
  return res.send({
    city: req.query.search,
  })
});

app.listen(port, () => {
  console.log('listening on port 3000')
});