const path = require('path')

var express = require('express');
var app = express();

app.use('/', express.static('public'));

app.get('/', function(req, res) {
    res.redirect(301,'/home.html')
});
app.get('', function(req, res) {
    res.redirect(301,'/books/list')
});


app.listen(3000, function() { console.log("Running Express")});
