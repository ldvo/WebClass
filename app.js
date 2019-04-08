const express = require('express');
const met = require('./met');

const app = express();
const port = process.env.PORT || 3000;

app.get('/students/:id', function(req, res) {
  if (req.params.id !== 'A00818257') {
    return res.send({
      error: 'Error: ID not found.',
    });
  }
  return res.send({
    id: req.params.id,
    fullname: 'Luis Daniel Villarreal Ortega',
    nickname: 'luisvo',
    age: 22
  });
});

app.get('/met', function(req, res) {
  if (!req.query.search) {
    return res.send({
      error: 'Error: Missing search query.',
    });
  }
  met.searchRequest(req.query.search, (error, objectId) => {
    if (error) {
      return res.send({
        error: error,
      })
    }
    met.objectRequest(objectId, (error, response) => {
      if (error) {
        return res.send({
          error: error,
        })
      }
      response = Object.assign({searchTerm: req.query.search}, response);
      return res.send(response);
    })
  });
});

app.get('*', function(req, res) {
  return res.send({
    error: 'Error: Invalid route.',
  });
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});