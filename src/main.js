var express = require('express');
var app = express();
var DataUtils = require('./get-data.js');
const fs = require('fs');
const jsonsRoutesStr = fs.readFileSync('./src/jsons-routes.json');
const jsonsRoutes = JSON.parse(jsonsRoutesStr);

for (let i = 0 ; i < jsonsRoutes.length ; i++) {
  let jsonRoute = jsonsRoutes[i];
  app.get(jsonRoute.route, function (req, res) {
    let rawdata = fs.readFileSync('./data/' + jsonRoute.json);
    let jsonData = JSON.parse(rawdata);

    res.set('content-type', 'application/json')
    res.send(DataUtils.getData(jsonData, req));
  });
}
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.send();
});


var server = app.listen(process.env.PORT || 5000, function () {
  var port = server.address().port;
  console.log("Server is working on port " + port);
});
