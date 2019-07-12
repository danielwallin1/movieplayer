var express = require('express');
const router = require('express').Router();
var graphqlMiddleware = require('./graphql');
var path = require('path');
var port = process.env.PORT || 3000;
var app = express();

app.use('/graphql', graphqlMiddleware());
app.use('/static', express.static('./dist/client/static'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.use((req, res, next) => {
    res.setHeader('Expires', '-1');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, max-age=0, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
});

app.get('/*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/client/index.html'));
});

if (require.main === module) {
  app.listen(port, (error) => {
    if (error) return console.error(error);
    console.log('Running grapqhl server')
  });
}
