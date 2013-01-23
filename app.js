
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , upload = require('./routes/upload')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , sbml2matlab = require('./routes/sbml2matlab');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 4000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser({ 
    keepExtensions: true, 
    uploadDir: __dirname + "/public/uploads" 
  }));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


app.get('/', routes.index);
//app.get('/about', routes.about);
app.post('/upload', upload.uploadSbml);
app.get('/users', user.list);
app.post('/sbml2matlab', sbml2matlab.translate)

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
