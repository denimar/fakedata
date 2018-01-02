let express = require('express');
let app = express();
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

let server = app.listen(8080, function () {
  let port = server.address().port;
  console.log('Example app listening on port ' + port + '!');
});
