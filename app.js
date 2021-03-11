const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');

const indexRouter = require('./routes/index');

var app = express();

// config
app.use('/', indexRouter);
app.use(cors());

// init server
var server = http.createServer(app);
var host = 'localhost' || '0.0.0.0';
var port = server.listen(process.env.PORT || 3000);

app.listen(port, host);