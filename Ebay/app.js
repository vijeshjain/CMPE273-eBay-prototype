
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  ;
var home = require('./routes/home');
var session = require('express-session');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser());
app.use(express.session({secret: 'Ummmhmmmmm'})); 
app.use(app.router);
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
//app.get('/users', user.list);
app.get('/', home.homePage);
app.get('/signup', home.signup);
app.post('/register', user.register);

app.get('/signin', home.signin);
app.get('/', home.signin);
app.post('/signin', user.signin);
app.post('/addCategory', home.addCategory);
app.post('/addSubCategory', home.addSubCategory);
app.get('/homePage', home.homePage);
app.get('/logout',user.logout);
app.get('/addCategoryForm',home.addCategoryForm);
app.get('/subCategoryForm',home.subCategoryForm);
app.get('/listCategories',home.listCategories);
app.get('/listSubCategories',home.listSubCategories);

app.post('/subCategories',home.loadSubCategories);




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
