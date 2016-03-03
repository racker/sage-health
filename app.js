var express = require('express'),
  app,
  bodyParser = require('body-parser'),
  router = express.Router(),
  request = require('request'),
  path = require('path'),
  appConfig = require('./config/settings.json'),
  timeout = require('connect-timeout');

app = express();
app.set('view engine', 'jade');
app.use(timeout('5s'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'static')));
app.set('port', appConfig.app.port || 3000);

app.get('/', function (req, res) {
  var reqOptions, auth, healthConfig;
  healthConfig = appConfig.ri_health_check;

  auth = "Basic " +
    new Buffer(healthConfig.username + ":"
      + healthConfig.password).toString("base64");

  reqOptions = {
    url: healthConfig.url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: auth
    }
  };

  request(reqOptions, function (error, response, body) {
      var title = 'Rackspace Intelligence Health';
      if (!error && response.statusCode == 200) {
        res.render('index', {
          title: title,
          status: body
        });
      } else {
        res.render('error', {
          title: title,
          status: {
            statusCode: response.statusCode,
            body: body,
            error: error
          }
        });
      }
  });
});

app.listen(appConfig.app.port, function () {
  console.log('Health app listening on port ', appConfig.app.port, '!');
});