
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  ,product=require('./routes/products')
  ,shoppingCart=require('./routes/shoppingCart');
  ;
  var Redis = require("./routes/redis-cache");
  var Constants = require('./routes/constants');
  var mysql = require("./routes/mysqlcontroller");
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
//app.get('/', home.homePage);
app.get('/', home.renderCategoryAndSubCategory);
app.get('/signup', home.signup);
app.post('/register', user.register);
app.get('/logout', user.logout);
app.get('/signin', home.signin);
app.post('/signin', user.signin);
app.post('/addCategory', home.addCategory);
app.post('/addSubCategory', home.addSubCategory);
app.get('/homePage', home.homePage);
app.get('/logout',user.logout);
app.get('/addCategoryForm',home.addCategoryForm);
app.get('/subCategoryForm',home.subCategoryForm);
app.get('/listCategories',home.listCategories);
app.get('/listSubCategories',home.listSubCategories);
app.get('/getProductList',product.getProductJSONList);
app.get('/getSubCategory',home.getSubCategoryForCategory);
app.get('/getProductsForSubCategory',home.getProductsForSubCategory);
app.get('/listProducts',home.listProducts);


app.get('/listAllProducts', product.listAllProducts);
app.get('/showProductsBySubCategory', product.showProductsBySubCategory);



app.post('/getUser',user.getUserFromFirstName);
app.post('/getUserProfileDetails',user.getUserProfileDetails);


app.post('/getProduct',product.getProductFromName);

app.get('/users', user.displayusers);
app.get('/editUser/:uid', user.editUser);
app.post('/editAndSaveUser/:uid', user.editAndSaveUser);
app.get('/deleteUser/:uid', user.deleteUser);
app.get('/renderHome', home.renderHome);
app.post('/subCategories',home.loadSubCategories);


// tanvi
app.get('/addProductForm',home.addProductForm);
app.get('/deleteProductForm',home.deleteProductForm);
app.post('/addProduct',home.addProduct);
app.post('/deleteProduct',home.deleteProduct);
// -- tanvi --
app.get('/updateCategoryForm',home.updateCategoryForm);
app.post('/updateCategory', home.updateCategory);

app.get('/deleteCategoryForm',home.deleteCategoryForm);
app.post('/deleteCategory', home.deleteCategory);

app.post('/updateSubCategory', home.updateSubCategory);
app.get('/updateSubCategoryForm', home.updateSubCategoryForm);

app.post('/deleteSubCategory', home.deleteSubCategory);
app.get('/deleteSubCategoryForm',home.deleteSubCategoryForm);

app.post('/updateProduct', home.updateProduct);
app.get('/updateProductForm', home.updateProductForm);
app.get('/getProductsById', home.getProductsById);

app.get('/getSubCategoryInJson', home.getSubCategoryInJson);
app.get('/getProductsInJson', home.getProductsInJson);
app.get('/getProductDetails', product.getProductDetailsFromName);
//app.post('/getProductDetails', product.getProductDetailsFromName);


app.get('/paymentConfirmation',shoppingCart.paymentPage);
app.get('/shoppingCart',shoppingCart.showSoppingCart);
app.get('/addToShoppingCart',shoppingCart.addToShoppingCart);
app.get('/removeFromShoppingCart',shoppingCart.removeFromShoppingCart);
app.get('/bidForProduct',product.placeBid);
app.get('/myProfile/:userId',user.myProfile);

app.post('/submitReview', home.submitReview);
app.get('/WriteReview/:pid', home.WriteReview);
app.get('/endBidding', product.stopBiddingAndSell);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


mysql.executeSQL(Constants.SELECT_CATEGORY_QUERY, function(err, result) {
//	console.log(result);
	Redis.cacheCategories(result);
});