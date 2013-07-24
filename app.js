
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 26001);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/error/:code', function(req, res) {
	var code = req.params.code;
	if (code) {
		var number = parseInt(code, 10);
		if (!isNaN(number)) {
			res.send(number);
		} else {
			res.send(500, 'Please provide a numeric response code.');
		}
	} else {
		res.send(500, 'Unable to parse error code request.');
	}
});

app.get('/up/*', function(req, res) {
	var url = req.params[0];
	console.log(req.params);
	if (url) {
		var correctedUrl = 'http://'+url;
		// console.log(correctedUrl);
		try {
			http.get(correctedUrl, function(nRes) {
				// console.log(nRes);
				res.json({
					code: nRes.statusCode,
					response: {
						headers: nRes.headers
					}
				});
			}).on('error', function(e) {
				res.json(500, {
					code: 500,
					message: 'Domain not found.',
					rawErrors: e
				});
			})
		} catch(e) {
			res.json(500, e);
		}
	} else {
		res.send(500, 'Unable to parse url.')
	}
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
