var Fetch = require('whatwg-fetch');
var baseUrl = "http://localhost:3000";

var HTTP = {
  get: function(url) {
    return fetch(baseUrl + url).then(function(response) {
      return response.json();
    });
  },
  post: function(url, data) {
    return fetch(baseUrl + url, {
      headers: {
        'Accept': 'text/plain',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    }).then(function(response) {
      return response;
    });
  },
  delete: function(url) {
    return fetch(baseUrl + url, {
      headers: {
        'Accept': 'text/plain',
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    })
  }
};

module.exports = HTTP;
