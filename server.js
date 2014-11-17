var express = require('express'),
    path = require('path'),
    phone = require('./routes/phones');

var app = express();

// Configuration

app.configure(function() {
    app.use(express.logger('dev'));
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

app.configure('production', function() {
    app.use(express.errorHandler());
});


var port = process.env.PORT || 8080;

app.get('/', function(req, res) {
     res.render('index.html');
});

app.get('/phones', phone.findAll);
app.get('/phones/:id', phone.findById);


app.listen(port);