/**
 * New node file
 */

 var ejs = require("ejs");
 var mysql = require('./PoolManager.js')
 var common = require('./common');
 var home = require('./home');
 

 exports.getProductJSONList = function(req, res) {
 	var getQuery = "select *from product";
 	mysql.fetchData(function(err, results) {
 		if (err) {
 			throw err;
 		} else {
 			console.log(results);
 			var responseString = JSON.stringify(results);
 			res.send(responseString);

 		}
 	}, getQuery);

 };

 exports.getProductFromName = function(req, res) {

 	var getQ = "select * from product where name like '"
 	+ req.param("searchword") + "%' and isDeleted=0";
 	console.log(getQ);
 	mysql.fetchData(function(err, results) {
 		if (err) {
 			throw err;
 		} else {
 			if (results == null || typeof (results) == "undefined"
 				|| results.length == 0) {
 				results = new Array();
 		}
 		var businessObj = {
 			searchResults : results
 		};
 		ejs.renderFile('./views/searchResultForProduct.ejs', businessObj,
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
 }, getQ);

 };

 exports.getProductDetailsFromName = function(req, res) {

 	var getQ ="select * from ebay.product JOIN ebay.user on product.sellerId= user.userId left outer join ebay.product_review on product.productId = product_review.product_id where name='"+req.param("product")+"' limit 1;";		
 	console.log(getQ);
 	mysql
 	.fetchData(
 		function(err, results) {
 			if (err) {
 				throw err;
 			} else {
 				var businessObj = results[0];
 				var user = req.session.user;
 				if (typeof (user) == "undefined") {
 					var getQuery = "Select  c.categoryId,c.name,c.image,c.isDeleted,s.subCategoryId,s.name subName,s.image subImage,s.isDeleted,s.categoryId from category c JOIN sub_category s on c.categoryId=s.categoryId where c.isDeleted=0 order by c.categoryId asc;";
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
 											console
 											.log("sub category array");
 											console
 											.log(subCategory);
 											subCat
 											.push(subCategory);
 										}
 										subCategory = new Array();
 										currentCategory = results[count];
 										var newCat = {
 											categoryId : results[count].categoryId,
 											name : results[count].name,
 											image : results[count].image

 										};
 										cat
 										.push(newCat);
 									}
															// else {
																var newSubCat = {
																	subCategoryId : results[count].subCategoryId,
																	subName : results[count].subName,
																	image : results[count].subImage,

																};
																if (subCategory.length < 6) {
																	subCategory
																	.push(newSubCat);
																}
 								}
														businessObj.category = cat;
														businessObj.subCategories = subCat;
														businessObj.firstName = "";
														businessObj.userId = 0;

														ejs.renderFile('./views/productDetails.ejs',businessObj,
															function(
																err,
																result) {
																			// render
																			// on
																			// success
																			if (!err) {
																				res
																				.end(result);
																			}
																			// render
																			// or
																			// error
																			else {
																				res
																				.end('An error occurred');
																				console
																				.log(err);
																			}
																		});

													}
												}, getQuery);
 						}
 					else {
 							if(businessObj.sellerId==user.userId)
 								{
 									businessObj.isSeller=true;
 								}
 							else
 								{
 									businessObj.isSeller=false;
 								}
								businessObj.category = user.category;
								businessObj.subCategories = user.subCategories;
								businessObj.firstName = user.firstName;
								businessObj.lastLogin = user.lastLogin;
								businessObj.userId = user.userId;
								ejs.renderFile('./views/productDetails.ejs',businessObj, function(err, result) {
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

 			}
 		}, getQ);

};

exports.listAllProducts = function(req, res) {

	var subCatID = req.param("sub-category");

	var getQuery = "Select  c.categoryId,c.name,c.image,c.isDeleted,s.subCategoryId,s.name subName,s.image subImage,s.isDeleted,s.categoryId from category c JOIN sub_category s on c.categoryId=s.categoryId where c.isDeleted=0 order by c.categoryId asc;";
	mysql
	.fetchData(
		function(err, results) {
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
							var ShowProductQuery = "SELECT p.productId ,p.NAME AS productName ,p.description ,p.productType ,pt.NAME AS productTypeName ,p.subCategoryId ,sc.name as subname,p.itemCondition ,ic.NAME AS itemConditionName ,p.basePrice,p.sellerId ,CONCAT (u.firstName	,' '	,u.lastName) AS sellername ,p.IMAGE,p.quantity,p.isDeleted FROM product p INNER JOIN product_type pt ON p.productType = pt.typeId INNER JOIN item_condition ic ON p.itemCondition = ic.conditionId INNER JOIN user u ON p.sellerId = u.userId INNER JOIN sub_category sc ON p.subCategoryId = sc.subCategoryId WHERE  p.isDeleted = 0;";
							var user = req.session.user;
							var fname;
							var uId;

							var lastlogin;
							if (typeof (user) == "undefined") {
								fname = "";
								lastlogin = "";
								uId = 0;
							} else {
								fname = user.firstName;
								lastlogin = user.lastLogin;
								uId = user.userId;
							}
							mysql
							.fetchData(
								function(err, rows) {
									if (!err) {

										ejs
										.renderFile(
											'./views/showProducts.ejs',
											{
												rows : rows,
												category : cat,
												subCategories : subCat,
												firstName : fname,
												lastLogin:lastlogin,
												userId : uId
											},
											function(
												err,
												result) {
												if (!err) {
													console.log("In Product.ejs *******");
													res.end(result);
												} else {
													res.end('An error occurred');
													console.log(err);
												}
											});
									} else {
										res
										.end('An error occurred');
										console.log(err);
									}
								}, ShowProductQuery);

						}
					}, getQuery);

};

exports.showProductsBySubCategory = function(req, res) {
	var subCategoryId = req.param("subCategoryId");

	var getQuery = "Select  c.categoryId,c.name,c.image,c.isDeleted,s.subCategoryId,s.name subName,s.image subImage,s.isDeleted,s.categoryId from category c JOIN sub_category s on c.categoryId=s.categoryId where c.isDeleted=0 order by c.categoryId asc;";
	mysql
	.fetchData(
		function(err, results) {
			if (err) {
				throw err;
			} else {

				var cat = new Array();
				var subCat = new Array();
				var currentCategory = results[0];
				var subCategory = null;
				for (var count = 0; count < results.length; count++) {

					if (currentCategory.categoryId != results[count].categoryId	|| count == 0) {
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
							var ShowProductQuery = "SELECT p.productId ,p.NAME AS productName ,p.description ,p.productType ,pt.NAME AS productTypeName ,p.subCategoryId ,sc.name as subname,p.itemCondition ,ic.NAME AS itemConditionName ,p.basePrice,p.sellerId ,CONCAT (u.firstName	,' '	,u.lastName) AS sellername ,p.IMAGE,p.quantity,p.isDeleted FROM product p INNER JOIN product_type pt ON p.productType = pt.typeId INNER JOIN item_condition ic ON p.itemCondition = ic.conditionId INNER JOIN user u ON p.sellerId = u.userId INNER JOIN sub_category sc ON p.subCategoryId = sc.subCategoryId WHERE sc.subCategoryId = "
									+ subCategoryId + " AND p.isDeleted = 0;";
							var user = req.session.user;
							var fname;
							var lastlogin;
							var uId;
							if (typeof (user) == "undefined") {
								fname = "";
								uId = 0;
								lastlogin = "";
							} else {
								fname = user.firstName;
								uId = user.userId;
								lastlogin = user.lastLogin;
							}
							mysql
							.fetchData(
								function(err, rows) {
									if (!err) {

										ejs.renderFile('./views/showProducts.ejs',{	rows : rows,
												category : cat,
												subCategories : subCat,
												firstName : fname,
												lastLogin:lastlogin,
												userId : uId
											},function(err,result) {
												if (!err) {
												console.log("In Product.ejs *******");
													res.end(result);
												} else {
													res.end('An error occurred');
													console	.log(err);
												}
											});
									} else {
										res.end('An error occurred');
										console.log(err);
									}
								}, ShowProductQuery);

						}
					}, getQuery);

};

exports.placeBid = function(req, res) {
	var data;
	var responseString;
	var product = req.param("pid");
	var user = req.session.user;
	if (typeof (user) == "undefined") {
		data = {
			errorCode : 101,
			message : "Please login to place a bid on this product"
		};
		responseString = JSON.stringify(data);
		res.send(responseString);

	} else {
		if (typeof (product) == "undefined") {
			data = {
				errorCode : 101,
				message : "Error occured on the server side.Please try again."
			};
			responseString = JSON.stringify(data);
			res.send(responseString);

		}
		var bidPrice = req.param("bid");
		if (typeof (bidPrice) == "undefined") {
			data = {
				errorCode : 101,
				message : "Error occured on the server side.Please try again."
			};
			responseString = JSON.stringify(data);
			res.send(responseString);

		}
		var update = "Update product SET basePrice=" + bidPrice
				+ " where productId=" + product;
		mysql
				.fetchData(
						function(err, results) {

							if (err) {
								data = {
									errorCode : 101,
									message : "Error occured on the server side.Please try again."
								};
								responseString = JSON.stringify(data);
								res.send(responseString);
							} else {
								var updateBid = "Update bidding SET userId="
										+ user.userId + " where productId="
										+ product;
								mysql.fetchData(function(err, results) {

									if (err) {
										throw err;
									} else {
											
										data = {
											errorCode : 100,
											message : "Your bid was recorded."
										};
										responseString = JSON.stringify(data);
										res.send(responseString);
									}
								}, updateBid);

							}
						}, update);

	}

}

exports.stopBiddingAndSell=function(req,res)
{
	var product=req.param("productId");
	var data;
	var responseString;
	if(typeof(product)=="undefined")
	{
		data = {
			errorCode : 101,
			message : "Error occured on the server side.Please try again."
		};
		responseString = JSON.stringify(data);
		res.send(responseString);

	}
	
	else
		{
			var entry="select *from bidding JOIN user on bidding.userId=user.userId where bidding.productId="+product;
			mysql.fetchData(function(err, results) {

				if (err) {
					throw err;
				} else {
					var required=results[0];
					if(typeof(required)=="undefined")
						{
						data = {
								errorCode : 100,
								message : "There have been no bids on this product yet.",

							};
							responseString = JSON.stringify(data);
							res.send(responseString);
						}
					else
						{
						var cartEntry={
								userId: required.userId,
								productId:product,
								articleQuantity:1
						};
						mysql.insertData(function(err, results) {
							if (err) {
								throw err;
							} else {
								data = {
									errorCode : 100,
									message : "Product sold to the highest bidder.",

								};
								responseString = JSON.stringify(data);
								res.send(responseString);

							}

						}, cartEntry, "shopping_cart");

						}
										
				}
			}, entry);
		
		}
	
}