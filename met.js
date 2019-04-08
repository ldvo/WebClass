const request = require('request')

function searchRequest(queryString, callback) {
  const metSearchUrl =
      'https://collectionapi.metmuseum.org/public/collection/v1/search?q=' +
      queryString;
  request(metSearchUrl, {json: true}, (err, res) => {
    if (err) {
      callback('Error: Cannot connect to MET server', undefined);
      return;
    }
    if (res.body.total === 0) {
      callback('Error: Search returned no results', undefined);
      return;
    }
    callback(undefined, res.body.objectIDs[0]);
  });
}

function objectRequest(objectId, callback) {
  const metObjectUrl =
      'https://collectionapi.metmuseum.org/public/collection/v1/objects/' +
      objectId;
  request(metObjectUrl, {json: true}, (err, res) => {
    if (err) {
      callback('Error: Cannot connect to MET server', undefined);
      return;
    }
    if (res.statusCode === 404) {
      callback('Error: Object ID not found', undefined);
      return;
    }
    callback(undefined, {
      artist: res.body.constituents[0].name,
      title: res.body.title,
      year: res.body.objectEndDate,
      technique: res.body.medium,
      metUrl: res.body.objectURL
    })
  })
}

module.exports = {searchRequest: searchRequest, objectRequest: objectRequest}