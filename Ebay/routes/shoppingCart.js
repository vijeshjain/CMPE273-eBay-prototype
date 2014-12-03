/**
 * 
 * New node file
 */
var ejs = require("ejs");
var mysql = require('./mysql.js');
exports.initializeShoppingCart = function(req, res) {
	req.session.shoppingCart = new Array();
}

exports.showSoppingCart = function(req, res) {
	// render the view with the products in it

	var shoppingCart = req.session.shoppingCart;
	if (typeof (shoppingCart) == "undefined") {
		shoppingCart = new Array();
		req.session.shoppingCart = shoppingCart;
	}

	var resultObj = {

		products : shoppingCart
	}
	ejs.renderFile('./views/shoppingCart.ejs', resultObj,
			function(err, result) {
				// render on success
				if (!err) {
					res.end(result);
				}
				// render or error
				else {
					res.end('An error occurred');
					console.log(err);
				}
			});
}

exports.addToShoppingCart = function(req, res) {
	var data;
	var responseString;
	// product id
	var pId = req.param("pid");
	var quantity=req.param("quantity");
	if (typeof (pId) == "undefined") {
		data = {
			errorCode : 101,
			message : "Server error.Please try again."
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}

	// get the details from the database
	var getQuery = "Select *from product where productId=" + pId
			+ " and isDeleted=0";

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			var product = results[0];
			product.quantity=quantity;
			if (typeof (req.session.shoppingCart) == "undefined") {
				req.session.shoppingCart = new Array();
				
			}
			req.session.shoppingCart.push(product);
			// store in session variable
			data = {
				errorCode : 100,
				message : "Product added to your shopping cart."
			};
			responseString = JSON.stringify(data);
			res.send(responseString);
		}
	}, getQuery);

}

exports.removeFromShoppingCart = function(req, res) {
	// get the product id
	var data;
	var responseString;
	// product id
	var pId = req.param("pid");
	if (typeof (pId) == "undefined") {
		data = {
			errorCode : 101,
			message : "Server error.Please try again."
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	// search for that product in the session array object
	var shopCart = req.session.shoppingCart;
	// remove from the session array
	for (var count = 0; count < shopCart.length; count++) {
		var curObj = shopCart[count];
		if (curObj.productId == pId) {
			shopCart.splice(count, 1);

		}
	}
	req.session.shoppingCart = shopCart;
	// //render the shopping cart
	var resultObj = {

		products : shopCart
	}
	ejs.renderFile('./views/shoppingCart.ejs', resultObj,
			function(err, result) {
				// render on success
				if (!err) {
					res.end(result);
				}
				// render or error
				else {
					res.end('An error occurred');
					console.log(err);
				}
			});

}

exports.writeShoppingCartToDatabase = function(req, res) {

}