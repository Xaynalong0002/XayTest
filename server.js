let express = require('Express');
let app = express(); //express object

let router = require('./app.js'); 

app.use('/', router);

app.listen(8080);

