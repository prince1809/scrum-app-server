var url = require('url');
var qs = require('querystring');
var https = require('https');

module.exports = function(basePath, apikey) {
  console.log('Proxying MongoLab at ', basePath, 'with apikey', apikey);

  basePath = url.parse(basePath);

  //Map the request url to the mongolab url
  //@Returns a parsed url object
  var mapUrl = module.exports.mapUrl = function(reqUrlString) {
    var reqUrl = url.parse(reqUrlString, true);

    var newUrl = {
      hostname: basePath.hostname,
      protocol: basePath.protocol
    };
    var query = { apikey: apikey };
    for(var key in reqUrl.query) {
      query[key] = reqUrl.query[key];
    }

    //https request expects path not pathname!
    newUrl.path = basePath.pathname + reqUrl.pathname + '?' + qs.stringify(query);

    return newUrl;
  };

// Map the incoming reqeust to a request to the DB
  var mapRequest = module.exports.mapRequest = function(req) {

      var newReq = mapUrl(req.url);
      newReq.method = req.method;
      newReq.headers = req.headers || {};
      //we neeed to fix up the hostname
      newReq.headers.host = newReq.hostname;
      return newReq;
  };

  var proxy = function(req, res, next) {
    try {
      var options = mapRequest(req);
      //create the request to the DB
      var dbReq = https.request(options, function(dbReq) {
        var data = "";
        res.headers = dbRes.headers;
        dbRes.setEncoding('utf8');
        dbReq.on('data', function(chunk) {
          // Pass back any data from response
          data = data + chunk;
        });

        dbRes.on('end', function() {
          res.header('Content-Type', 'application/json');
          res.statusCode = dbRes.statusCode;
          res.httpVersion = dbRes.httpVersion;
          res.trailors = dbRes.trailors;
          res.send(data);
          res.end();
        });
      });

      //send any data that is passed from the original request
      dbReq.end(JSON.stringify(req.body));
    } catch(error) {
      console.log('ERROR: ', error.stack);
      res.json(error);
      res.end();
    }
  };

  // Attach the mapUrl fn
  proxy.mapUrl = mapUrl;
  proxy.mapRequest = mapRequest;
  return proxy;
};
