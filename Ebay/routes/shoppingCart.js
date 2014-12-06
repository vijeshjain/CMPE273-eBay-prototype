/**
 * 
 * New node file
 */
var ejs = require("ejs");

var mysql = require('./mysql');
var common = require('./common');
var home = require('./home');

exports.initializeShoppingCart = function(req, res) {
	req.session.shoppingCart = new Array();
}

exports.showSoppingCart = function(req, res) {
	// render the view with the products in it
	var getQuery = "Select  c.categoryId,c.name,c.image,c.isDeleted,s.subCategoryId,s.name subName,s.image subImage,s.isDeleted,s.categoryId from category c JOIN sub_category s on c.categoryId=s.categoryId where c.isDeleted=0 and s.isDeleted=0 order by c.categoryId asc;";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {

			var cat = new Array();
			var subCat = new Array();
			var currentCategory = results[0];
			var subCategory = null;
			for (var count = 0; count < results.length; count++) {

				if (currentCategory.categoryId != results[count].categoryId
						|| count == 0) {
					if (count > 0) {
						console.log("sub category array");
						console.log(subCategory);
						subCat.push(subCategory);
					}
					subCategory = new Array();
					currentCategory = results[count];
					var newCat = {
						categoryId : results[count].categoryId,
						name : results[count].name,
						image : results[count].image

					};
					cat.push(newCat);
				}
				// else {
				var newSubCat = {
					subCategoryId : results[count].subCategoryId,
					subName : results[count].subName,
					image : results[count].subImage,

				};
				if (subCategory.length < 6) {
					subCategory.push(newSubCat);
				}

				if (count + 1 == results.length) {
					subCat.push(subCategory);
				}
				// }

			}
			var shoppingCart = req.session.shoppingCart;
			if (typeof (shoppingCart) == "undefined") {
				shoppingCart = new Array();
				req.session.shoppingCart = shoppingCart;
			}
			var user=req.session.user;
			var addr;
			if(typeof(user)=="undefined")
				{
				addr="";
				}
			else{
				addr=user.address;
			}
			var resultObj = {

				products : shoppingCart,
				category : cat,
				subCategories : subCat,
				address:addr
			};
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
	},getQuery);

						
	
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
	res.redirect("/shoppingCart");

}

exports.writeShoppingCartToDatabase = function(req, res) {

}

exports.paymentPage=function(req,res)
{
	var newParam=req.param("isNew");
	var addr;
	if(newParam==0)
		{
			addr=req.param("address");
		}
	else
		{
		addr="address";
		
		}
	var getQuery = "Select  c.categoryId,c.name,c.image,c.isDeleted,s.subCategoryId,s.name subName,s.image subImage,s.isDeleted,s.categoryId from category c JOIN sub_category s on c.categoryId=s.categoryId where c.isDeleted=0 and s.isDeleted=0 order by c.categoryId asc;";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {

			var cat = new Array();
			var subCat = new Array();
			var currentCategory = results[0];
			var subCategory = null;
			for (var count = 0; count < results.length; count++) {

				if (currentCategory.categoryId != results[count].categoryId
						|| count == 0) {
					if (count > 0) {
						console.log("sub category array");
						console.log(subCategory);
						subCat.push(subCategory);
					}
					subCategory = new Array();
					currentCategory = results[count];
					var newCat = {
						categoryId : results[count].categoryId,
						name : results[count].name,
						image : results[count].image

					};
					cat.push(newCat);
				}
				// else {
				var newSubCat = {
					subCategoryId : results[count].subCategoryId,
					subName : results[count].subName,
					image : results[count].subImage,

				};
				if (subCategory.length < 6) {
					subCategory.push(newSubCat);
				}

				if (count + 1 == results.length) {
					subCat.push(subCategory);
				}
				// }

			}
			var resultObj = {

				category : cat,
				subCategories : subCat,
				address:addr
			};
			ejs.renderFile('./views/payment.ejs', resultObj,
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
	},getQuery);	

}