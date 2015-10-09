var fs = require('fs');
var http = require('http');
var https = require('https');
//var privateKey = fs.readFileSync(__dirname + '/cert/privateKey.pem').toString();
//var certificate = fs.readFileSync(__dirname + '/cert/certificate.pem').toString();
//var credentials = {key: privateKey, cert: certificate};

var express = require('express');
var mongoProxy = require('./lib/mongo-proxy');
var config = require('./config.js');
var passport = require('passport');
var security = require('./lib/security');
var xsrf = require('./lib/xsrf');
var protectJSON = require('./lib/protectJSON');
require('express-namespace');

var app = express();
