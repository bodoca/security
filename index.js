var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/security', { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    {
        extended: true
    }    
));

var routes = require('./user-routes.js')(app);

var server = app.listen(8000, function() {
    console.log('Server running at http://127.0.0.1:8000');
});