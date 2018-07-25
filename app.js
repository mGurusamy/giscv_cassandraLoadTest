var express = require('express');
var app = express();
var port = process.env.port || 3000;

var db = require('cassandra-driver');
var client = new db.Client({ contactPoints: ['localhost'] });
client.connect(function (err, result) {
    if (err) {
        console.log('Not able to connect to DB ' + err);
    } else {
        console.log('serverjs connected to cassandra database');
    }

});

var policyRouter = require('./Routes/policyRoutes')(client);

app.use('/api', policyRouter);
app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('App is listening request on portnumber ' + port);
    }
});