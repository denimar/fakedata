var express = require('express');
var app = express();
const fs = require('fs');
const jsonsRoutesStr = fs.readFileSync('./src/jsons-routes.json');
const jsonsRoutes = JSON.parse(jsonsRoutesStr);

for (let i = 0 ; i < jsonsRoutes.length ; i++) {
  let jsonRoute = jsonsRoutes[i];
  app.get(jsonRoute.route, function (req, res) {
    let rawdata = fs.readFileSync('./data/' + jsonRoute.json);
    let student = JSON.parse(rawdata);
    res.send(student);
  });
}

app.listen(function () {
  console.log('Example app listening!');
});
