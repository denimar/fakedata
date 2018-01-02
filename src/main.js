var express = require('express');
var app = express();
const fs = require('fs');
const jsonsRoutesStr = fs.readFileSync('./src/jsons-routes.json');
const jsonsRoutes = JSON.parse(jsonsRoutesStr);

// for (let i = 0 ; i < jsonsRoutes.length ; i++) {
//   let jsonRoute = jsonsRoutes[i];
//   app.get(jsonRoute.route, function (req, res) {
//     let rawdata = fs.readFileSync('./data/' + jsonRoute.json);
//     let student = JSON.parse(rawdata);
//     res.send(student);
//   });
// }
app.use(express.static('./public'));

app.get('/', function(req, res) {
  res.set('content-type', 'text/html')
  res.send('testes aqui');
});


var server = app.listen(process.env.PORT || 5000, function () {
  var port = server.address().port;
  console.log("Express is working on port " + port);
});
