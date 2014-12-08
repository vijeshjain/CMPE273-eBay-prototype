/**
 * New node file
 */
 var sub;
 var ejs = require("ejs");

 //var mysql = require('./mysql.js');
 var mysql = require('./PoolManager.js');
 var common = require('./common');
 

var mysql1 = require("./mysqlcontroller");
var Constants = require('./constants');
var Redis = require("./redis-cache");



 var category = null;
 var subcategory = null;
 var items = null;
 var categoryId = null;
 var temp = null;
 var subCategories = [];

 function homePage(req, res) {
 	var getUser = "select * from category order by categoryid asc";
	// console.log("Query is:" + getUser);
	// var subCategories = [];
	var count = 0;
	

	mysql1.executeQuery(Constants.SELECT_CATEGORY_QUERY,
					function(err, results) {
						if (err) {
							throw err;
						} else {
							try {
								console.log(results);
								if (results != null && results.length > 0) {
									for (var i = 0; i < results.length; i++) {
										var getUser1 = "select *  from sub_category where categoryid = "
												+ results[i].categoryId
												;
										console.log(results[i].name);
										mysql
												.fetchData(
														function(err, result) {
															if (err) {
																throw err;
															} else {
																if (result.length > 0) {
																	console
																			.log("In If*************************************");
																	/*
																	 * console.log("Category
																	 * Name
																	 * :::::"+results[i].name);
							*/
							for (var j = 0; j < result.length; j++) {
								console
								.log("Sub Category:-"
									+ result[j].name
									+ result[j].categoryId);

							}
							subCategories
							.push(result);
																	// subCategories=result;
																} else {
																	console
																	.log("In Else--------------------------------");

																}
																temp = JSON
																.parse(JSON
																	.stringify(subCategories));

															}
														}, getUser1);
						}
						console.log("Category:-" + category);
						console
						.log("Again*************************************");
						console.log("Sub Category:-" + temp[0].name
							+ temp[0].categoryId)

						category = results;

						res.render('homePage', {

							category : category,
							subCategories : temp,
						});

					}
				} catch (e) {

					console.log(e);
				}

			}
		});

}

function signin(req, res) {

	ejs.renderFile('./views/signin.ejs', function(err, result) {
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

function addCategoryForm(req, res) {
	var user=req.session.user;
	
	res.render('addCategoryForm', {

		category : category,
		subCategories : temp,
		firstName:user.firstName, lastLogin:user.lastLogin,
		userId:user.userId
	});
}

function subCategoryForm(req, res) {
	var user=req.session.user;
	res.render('subCategoryForm', {


		category : category,
		subCategories : temp,
		firstName:user.firstName, lastLogin:user.lastLogin,
		userId:user.userId
	});

}

function signup(req, res) {

	ejs.renderFile('./views/signup.ejs', function(err, result) {
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

function addCategory(req, res) {

	var newCategory = req.param("categoryName");
	console.log("New Category :" + newCategory);

	if (newCategory === null || typeof (newCategory) === 'undefined') {
		data = {
			errorCode : 400,
			message : "Category name required"
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}

	var selectCategory = "select * from category where name='" + newCategory
	+ "'" + " and isDeleted=0";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results.length > 0) {
				// if we get an entry then send the error
				data = {
					errorCode : 401,
					message : "Please choose a uniqueCategory."
				};
				console.log("Already there:");
				responseString = JSON.stringify(data);
				res.send(responseString);
			} else {
				var query = "insert into category(name,isdeleted) values('"
					+ newCategory + "','0')";
	console.log("Query is:" + query);

	mysql.saveData(function(err, results) {
		if (err) {

						throw err;
					} else {
						mysql1.executeSQL(Constants.SELECT_CATEGORY_QUERY, function(err, result) {
//							console.log(result);
							Redis.cacheCategories(result,temp,category);
							
							data = {
	                                 errorCode : 100,
	                                 message : "Category added successfully",
	                                 url : "http://localhost:3000/renderHome"
	                         };
	                         responseString = JSON.stringify(data);
	                         res.send(responseString);
						});
					}

				}, query);
			}
		}
	}, selectCategory);

}

function addSubCategory(req, res) {

	var newSubCategory = req.param("subcategoryName");
	var categoryid = req.param("category");
	console.log("Category :" + categoryid);

	console.log("New Sub Category :" + newSubCategory);

	var newCategory = req.param("categoryName");
	console.log("New Category :" + newCategory);

	if (newSubCategory === null || typeof (newSubCategory) === 'undefined') {
		data = {
			errorCode : 400,
			message : "SubCategory name required"
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}

	var selectCategory = "select * from sub_category where name='"
	+ newSubCategory + "'" + " and isDeleted=0";
	mysql
	.fetchData(
		function(err, results) {
			if (err) {
				throw err;
			} else {
				if (results.length > 0) {
								// if we get an entry then send the error
								data = {
									errorCode : 401,
									message : "Please choose a unique SubCategory."
								};
								console.log("Already there:");
								responseString = JSON.stringify(data);
								res.send(responseString);
							} else {
								var query = "insert into sub_category(name,categoryid,isdeleted) values('"
									+ newSubCategory
									+ "','"
									+ categoryid
									+ "','0')";
	console.log("Query is:" + query);

	mysql.saveData(function(err, results) {
		if (err) {

			throw err;
		} else {

										mysql1.executeSQL(Constants.SELECT_CATEGORY_QUERY, function(err, result) {
//											console.log(result);
											Redis.cacheCategories(result,temp,category);
											
											data = {
					                                 errorCode : 100,
					                                 message : "Sub Category updated successfully",
					                                 url : "http://localhost:3000/renderHome"
					                         };
					                         responseString = JSON.stringify(data);
					                         res.send(responseString);
										});

		}
	}, query);
}
}
}, selectCategory);

}

function listCategories(req, res) {
	var user=req.session.user;
	if(typeof(user)=="undefined")
	{
		res.render('listCategories', {

			category : category,
			subCategories : temp,
			firstName:"", 
			lastLogin:"",
			userId:0
		});

	}
	else
	{
		res.render('listCategories', {

			category : category,
			subCategories : temp,
			firstName:user.firstName, 
			lastLogin:user.lastLogin,
			userId:user.userId
		});

	}
	
}

function listSubCategories(req, res) {
	var user=req.session.user;
	if(typeof(user)=="undefined")
		{
		res.render('listSubCategories', {

			category : category,
			subCategories : temp,
			firstName:"", lastLogin:"",
			userId:0

		});

		}
	else
		{
		res.render('listSubCategories', {

			category : category,
			subCategories : temp,
			firstName:user.firstName, lastLogin:user.lastLogin,
			userId:user.userId

		});

		}
	}
function getSubCategoryForCategory(req, res) {
	var getQuery = "select *  from sub_category where categoryid = "
	+ req.param("cid");

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			var finalObj = {
				subCategories : results

			}
			ejs.renderFile('./views/subCategoryListView.ejs', finalObj,
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
	}, getQuery);

}

function getProductsForSubCategory(req, res) {
	var getQuery = "select *  from product where subCategoryId = "
	+ req.param("cid");

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			var finalObj = {
				Products : results

			}
			ejs.renderFile('./views/ProductListView.ejs', finalObj, function(
				err, result) {
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
	}, getQuery);

}

function loadSubCategories(req, res) {

	var type = req.param("catName");
	var user=req.session.user;
	if(typeof(user)=="undefined")
	{
		console.log("Type" + type);
		res.render('subCategories', {

			category : category,
			subCategories : temp,
			type : type,
			firstName:"",
			userId:0

		});

	}
	else
	{
		console.log("Type" + type);
		res.render('subCategories', {

			category : category,
			subCategories : temp,
			type : type,
			firstName:user.firstName, lastLogin:user.lastLogin,
			userId:user.userId

		});

		
	}
	
}

function renderCategoryAndSubCategory(req, res) {

	//var getQuery = "Select  c.categoryId,c.name,c.image,c.isDeleted,s.subCategoryId,s.name subName,s.image subImage,s.isDeleted,s.categoryId from category c JOIN sub_category s on c.categoryId=s.categoryId where c.isDeleted=0 and s.isDeleted=0  order by c.categoryId asc;";
	mysql1.executeQuery(Constants.SELECT_CATEGORY_QUERY,function(err, results) {
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

			category = cat;
			temp = subCat;
			var resultObj = {
				category : cat,
				subCategories : subCat,
				firstName:"",
				userId:0
			};
			ejs.renderFile('./views/homePage.ejs', resultObj, function(err,
				result) {
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
	});
}

// tanvi

/*
 * function deleteProductForm(req, res) {
 * 
 * var getUser = "select * from category"; console.log("Query is:" + getUser);
 * 
 * mysql.fetchData(function(err, results) { if (err) { throw err; } else { if
 * (results.length > 0) { for ( var i = 0; i < results.length; i++) {
 * console.log(results[i].name); }
 * 
 * category = results; res.render('deleteProduct', {
 * 
 * category : category, subCategories : temp, }); } } }, getUser); }
*/

function addProductForm(req, res) {

	var getUser = "select * from category ;";
	console.log("Query is:" + getUser);

	var getSubCat = "select * from sub_category;";
	console.log("Query is:" + getSubCat);

	mysql.fetchData(function(err, ans) {
		if (err) {
			throw err;
		} else {

			if (ans.length > 0) {
				subCategories.push(ans);
			}
			temp = JSON.parse(JSON.stringify(subCategories));

		}

	}, getSubCat);

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results.length > 0) {

				category = results;
				var user=req.session.user;
				res.render('addProductForm', {

					category : category,
					subCategories : temp,
					firstName:user.firstName, lastLogin:user.lastLogin,
					userId:user.userId
				// subcat : sub,
			});

			}

		}
	}, getUser);

}

/*
 * function addProduct(req, res) {
 * 
 * 
 * var subCategory = req.param("subCategory"); var productPrice =
 * req.param("productPrice"); var productName = req.param("productName"); var
 * catName = req.param("category"); var productDesc = req.param("productDesc");
 * var productType = req.param("productType"); var itemCondition =
 * req.param("itemCondition"); var quantity = req.param("quantity");
 * 
 * var itemConditionId ; var productTypeId;
 * 
 * if (productType == "Selling") productTypeId = 1; else productTypeId = 2;
 * 
 * 
 * if (itemCondition == "New") itemConditionId = 1; else itemConditionId = 2;
 * 
 * console.log("sub category :" + subCategory);
 * 
 * console.log("New Sub Category :" + subCategory);
 * 
 * var query = "insert into product(name,basePrice,productType,itemCondition ,
 * description , subCategoryId , sellerId , quantity , isDeleted ) values('" +
 * productName + "'," + productPrice + "," + productTypeId + "," +
 * itemConditionId + ",'" + productDesc +"'," + subCategory +", 5 , "+ quantity+
 * ",0 );"; console.log("Query is:" + query);
 * 
 * mysql.saveData(function(err, results) { if (err) {
 * 
 * throw err; } else {
 * 
 * category = results; homePage(req, res); } }, query); }
*/

/*
 * function deleteProduct(req, res) {
 * 
 * var deleteProduct = req.param("deleteProduct");
 * 
 * 
 * var query = "update product set isDeleted = 1 where name =
 * '"+deleteProduct+"';"; console.log("Query is:" + query);
 * 
 * mysql.saveData(function(err, results) { if (err) {
 * 
 * throw err; } else { homePage(req, res); } }, query); }
*/
function listProducts(req, res) {

	var category_new = null;

	var getUser = "select c.categoryid,c.name cat_name,c.image cat_image,s.name subcat_name,s.subCategoryId, p.productId,p.name prod_name,p.productType  from category c,sub_category s,product p where c.categoryId=s.categoryId  and s.subCategoryId=p.subCategoryId ";
	console.log("Query is:" + getUser);

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results.length > 0) {
				for (var i = 0; i < results.length; i++) {
					console.log("Row-----:" + results[i].prod_name);
				}

				category_new = results;
				var user=req.session.user;
				if(typeof(user)=="undefined")
				{
					res.render('listProducts', {
						category_new : category_new,
						category : category,
						subCategories : temp,
						firstName:"",
						userId:0

					});

				}
				else{
					res.render('listProducts', {
						category_new : category_new,
						category : category,
						subCategories : temp,
						firstName:user.firstName, lastLogin:user.lastLogin,
						userId:user.userId

					});

					
				}				
			}

		}
	}, getUser);

}

// CRUD Operations

function getSubCategoryInJson(req, res) {
	var getQuery = "select *  from sub_category where categoryid = "
	+ req.param("cid");
	console.log(getQuery);
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {

			var responseString = JSON.stringify(results);
			res.send(responseString);

		}
	}, getQuery);

}

function getProductsInJson(req, res) {
	var getQuery = "select *  from product where subCategoryId = "
	+ req.param("cid");
	console.log(getQuery);
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {

			var responseString = JSON.stringify(results);
			res.send(responseString);

		}
	}, getQuery);

}

function deleteProductForm(req, res) {

	var user=req.session.user;
	res.render('deleteProduct', {

		category : category,
		subCategories : temp,
		firstName:user.firstName, lastLogin:user.lastLogin,
		userId:user.userId
	});

}

function addProduct(req, res) {

	var categoryId = req.param("category");
	var subCategoryId = req.param("sub-category");
	var productPrice = req.param("productPrice");
	var productName = req.param("productName");
	var productDesc = req.param("productDesc");
	var productType = req.param("productType");
	var itemCondition = req.param("itemCondition");
	var quantity = req.param("quantity");
	var seller=req.param("seller");
	console.log("ProductName:" + productName);

	console.log("Seller Name: " + seller);

	if (productName === null || typeof (productName) === 'undefined') {
		data = {
			errorCode : 400,
			message : "Product name required"
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}

	var selectCategory = "select * from product where name='" + productName
	+ "'" + " and isDeleted=0";
	mysql
	.fetchData(
		function(err, results) {
			if (err) {
				throw err;
			} else {
				if (results.length > 0) {
								// if we get an entry then send the error
								data = {
									errorCode : 401,
									message : "Please choose a unique Product."
								};
								console.log("Already there:");
								responseString = JSON.stringify(data);
								res.send(responseString);
							} else {
								var itemConditionId;
								var productTypeId;

								if (productType == "Selling")
									productTypeId = 1;
								else
									productTypeId = 2;

								if (itemCondition == "New")
									itemConditionId = 1;
								else
									itemConditionId = 2;

								console.log("sub category :" + subCategoryId);

								var query = "insert into product(name,basePrice,productType,itemCondition , description , subCategoryId , sellerId , quantity , isDeleted ) values('"
									+ productName
									+ "',"
									+ productPrice
									+ ","
									+ productTypeId
									+ ","
									+ itemConditionId
									+ ",'"
									+ productDesc
									+ "',"
									+ subCategoryId
									+ ","+ "(select userid from ebay.user where firstName='"+seller+"')" + ", "
									+ quantity + ",0 );";
console.log("Query is:" + query);

mysql.saveData(function(err, results) {
	if (err) {

		throw err;
	} else {

		//var obj=results[0];
		var currentDate = common.FormatDate(new Date(), "%Y-%m-%d %H:%M:%S", false);
		if(productTypeId ==2){
			
			var insertObj={
					
					productId:results.insertId,
					userId:req.session.user.userId,
					bidStart:currentDate,
					bidEnd:currentDate
					
			};
			mysql.insertData(function(err,results) {
				if (err) {
					throw err;
				} else {
					data = {
							errorCode : 100,
							message : "Product Added successfully",
							url : "http://localhost:3000/listProducts"
						};
						responseString = JSON.stringify(data);
						res.send(responseString);
				}

			},insertObj,"bidding");
			
			
		}		
		
		
		
		

	}
}, query);
}
}
}, selectCategory);

}

function deleteProduct(req, res) {

	var deleteProductId = req.param("product");

	var query = "update product set isDeleted = 1 where productId = '"
	+ deleteProductId + "';";
	console.log("Query is:" + query);

	mysql.saveData(function(err, results) {
		if (err) {

			throw err;
		} else {
			homePage(req, res);

		}

	}, query);

}

function updateSubCategoryForm(req, res) {

	/*
	 * var getUser = "select * from category" + appendedQuery;
	 * console.log("Query is:" + getUser);
	 * 
	 * mysql.fetchData(function(err, results) { if (err) { throw err; } else {
	 * if (results.length > 0) { for ( var i = 0; i < results.length; i++) {
	 * console.log(results[i].name); }
	 * 
	 * category = results; res.render('updateCategoryForm', {
	 * 
	 * category : category, subCategories : temp }); } } }, getUser);
*/
var user=req.session.user;
res.render('updateSubCategoryForm', {

	category : category,
	subCategories : temp,
	firstName:user.firstName, lastLogin:user.lastLogin,
	userId:user.userId
});
}

function updateSubCategory(req, res) {
	var data;
	var responseString;
	var newSubCategory = req.param("newSubCategoryName");
	var subCategoryId = req.param("sub-category");
	console.log("SubCategoryId :" + subCategoryId);

	console.log("New SubCategory Name: " + newSubCategory);

	if (newSubCategory === null || typeof (newSubCategory) === 'undefined') {
		data = {
			errorCode : 400,
			message : "SubCategory name required"
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}

	var selectCategory = "select * from sub_category where name='"
	+ newSubCategory + "'" + " and isDeleted=0";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results.length > 0) {
				// if we get an entry then send the error
				data = {
					errorCode : 401,
					message : "Please choose a unique SubCategory."
				};
				console.log("Already there:");
				responseString = JSON.stringify(data);
				res.send(responseString);
			} else {
				var query = "Update sub_category set name = '" + newSubCategory
				+ "' where subCategoryId = " + subCategoryId;
				console.log("Query is:" + query);

				mysql.saveData(function(err, results) {
					if (err) {

						throw err;
					} else {

						mysql1.executeSQL(Constants.SELECT_CATEGORY_QUERY, function(err, result) {
//							console.log(result);
							Redis.cacheCategories(result,temp,category);
							
							data = {
	                                 errorCode : 100,
	                                 message : "Sub Category updated successfully",
	                                 url : "http://localhost:3000/renderHome"
	                         };
	                         responseString = JSON.stringify(data);
	                         res.send(responseString);
						});
					}
				}, query);
			}
		}
	}, selectCategory);

}

function deleteSubCategoryForm(req, res) {

	/*
	 * var getUser = "select * from category" + appendedQuery;
	 * console.log("Query is:" + getUser);
	 * 
	 * mysql.fetchData(function(err, results) { if (err) { throw err; } else {
	 * if (results.length > 0) { for ( var i = 0; i < results.length; i++) {
	 * console.log(results[i].name); }
	 * 
	 * category = results; res.render('deleteCategoryForm', {
	 * 
	 * category : category, subCategories : temp }); } } }, getUser);
*/
var user=req.session.user;
res.render('deleteSubCategoryForm', {

	category : category,
	subCategories : temp,
	firstName:user.firstName, lastLogin:user.lastLogin,
	userId:user.userId
});
}

function deleteSubCategory(req, res) {

	var subCategoryId = req.param("sub-category");
	console.log("CategoryId :" + categoryId);

	var query = "Update sub_category set isDeleted = 1 where subCategoryId = "
	+ subCategoryId;

	console.log("Query is:" + query);

	mysql.saveData(function(err, result) {
		if (err) {

			throw err;
		} else {

			// category = results;
			homePage(req, res);

		}
	}, query);

}

function updateProductForm(req, res) {

	/*
	 * var getUser = "select * from category" + appendedQuery;
	 * console.log("Query is:" + getUser);
	 * 
	 * mysql.fetchData(function(err, results) { if (err) { throw err; } else {
	 * if (results.length > 0) { for ( var i = 0; i < results.length; i++) {
	 * console.log(results[i].name); }
	 * 
	 * category = results; res.render('updateCategoryForm', {
	 * 
	 * category : category, subCategories : temp }); } } }, getUser);
*/
var user=req.session.user;
res.render('updateProductForm', {

	category : category,
	subCategories : temp,
	firstName:user.firstName, lastLogin:user.lastLogin,
	userId:user.userId
});
}

function updateProduct(req, res) {
	var productId = req.param("product");
	var categoryId = req.param("category");
	var subCategoryId = req.param("sub-category");
	var productPrice = req.param("productPrice");
	var productName = req.param("productName");
	var productDesc = req.param("productDesc");
	var productType = req.param("productType");
	var itemCondition = req.param("itemCondition");
	var quantity = req.param("quantity");

	var itemConditionId;
	var productTypeId;

	if (productType == "Selling")
		productTypeId = 1;
	else
		productTypeId = 2;

	if (itemCondition == "New")
		itemConditionId = 1;
	else
		itemConditionId = 2;

	console.log("sub category :" + subCategoryId);
	var query = "Update product Set name = '" + productName + "', basePrice = "
	+ productPrice + ", productType = " + productTypeId
	+ ", itemCondition = " + itemConditionId + ", description = '"
	+ productDesc + "', quantity = " + quantity + " where productId = "
	+ productId;

	console.log("Query is:" + query);

	mysql.saveData(function(err, results) {
		if (err) {

			throw err;
		} else {

			data = {
				errorCode : 100,
				message : "Product updated successfully",
				url : "http://localhost:3000/listProducts"
			};
			responseString = JSON.stringify(data);
			res.send(responseString);

		}
	}, query);

}

function updateCategoryForm(req, res) {

	/*
	 * var getUser = "select * from category" + appendedQuery;
	 * console.log("Query is:" + getUser);
	 * 
	 * mysql.fetchData(function(err, results) { if (err) { throw err; } else {
	 * if (results.length > 0) { for ( var i = 0; i < results.length; i++) {
	 * console.log(results[i].name); }
	 * 
	 * category = results; res.render('updateCategoryForm', {
	 * 
	 * category : category, subCategories : temp }); } } }, getUser);
*/
var user=req.session.user;
res.render('updateCategoryForm', {

	category : category,
	subCategories : temp,
	firstName:user.firstName, lastLogin:user.lastLogin,
	userId:user.userId
});
}

function updateCategory(req, res) {
	var data;
	var responseString;
	var newCategory = req.param("newCategoryName");
	var categoryId = req.param("categoryId");
	console.log("CategoryId :" + categoryId);

	console.log("New Category Name: " + newCategory);

	console.log("New Category :" + newCategory);

	if (newCategory === null || typeof (newCategory) === 'undefined') {
		data = {
			errorCode : 400,
			message : "Category name required"
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}

	var selectCategory = "select * from category where name='" + newCategory
	+ "'" + " and isDeleted=0";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results.length > 0) {
				// if we get an entry then send the error
				data = {
					errorCode : 401,
					message : "Please choose a uniqueCategory."
				};
				console.log("Already there:");
				responseString = JSON.stringify(data);
				res.send(responseString);
			} else {
				var query = "Update category set name = '" + newCategory
				+ "' where categoryId = " + categoryId;
				console.log("Query is:" + query);

				mysql.saveData(function(err, results) {
					if (err) {

						throw err;
					} else {
						
						mysql1.executeSQL(Constants.SELECT_CATEGORY_QUERY, function(err, result) {
//							console.log(result);
							Redis.cacheCategories(result,temp,category);
							
							data = {
	                                 errorCode : 100,
	                                 message : "Category updated successfully",
	                                 url : "http://localhost:3000/renderHome"
	                         };
	                         responseString = JSON.stringify(data);
	                         res.send(responseString);
						});
						 

					}
				}, query);
			}
		}
	}, selectCategory);

}

function deleteCategoryForm(req, res) {

	/*
	 * var getUser = "select * from category" + appendedQuery;
	 * console.log("Query is:" + getUser);
	 * 
	 * mysql.fetchData(function(err, results) { if (err) { throw err; } else {
	 * if (results.length > 0) { for ( var i = 0; i < results.length; i++) {
	 * console.log(results[i].name); }
	 * 
	 * category = results; res.render('deleteCategoryForm', {
	 * 
	 * category : category, subCategories : temp }); } } }, getUser);
*/
var user=req.session.user;
res.render('deleteCategoryForm', {

	category : category,
	subCategories : temp,
	firstName:user.firstName, lastLogin:user.lastLogin,
	userId:user.userId
});
}

function deleteCategory(req, res) {

	var categoryId = req.param("categoryId");
	console.log("CategoryId :" + categoryId);

	var dependentQuery = "Update sub_category set isDeleted = 1 where categoryId = "
	+ categoryId;
	var query = "Update category set isDeleted = 1 where categoryId = "
	+ categoryId;

	console.log("Query is:" + query);

	mysql.saveData(function(err, results) {
		if (err) {

			throw err;
		} else {

			mysql.saveData(function(err, result) {
				if (err) {

					throw err;
				} else {
					data = {
							errorCode : 100,
							message : "Category deleted successfully",
							url : "http://localhost:3000/listCategories"
						};
						responseString = JSON.stringify(data);
						res.send(responseString);
					/*category = results;
					homePage(req, res);*/

				}
			}, dependentQuery);
		}
	}, query);
}

function renderHome(req, res) {
	var user = req.session.user;
	//if (typeof (user) == "undefined") {
		//var getQuery = "Select  c.categoryId,c.name,c.image,c.isDeleted,s.subCategoryId,s.name subName,s.image subImage,s.isDeleted,s.categoryId from category c JOIN sub_category s on c.categoryId=s.categoryId where c.isDeleted=0 order by c.categoryId asc;";
		mysql1.executeQuery(Constants.SELECT_CATEGORY_QUERY,function(err, results) {
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
				var user=req.session.user;
				var name;
				var id;
				var last;
				if(typeof(user)=="undefined")
					{
						name="";
						id=0;
						last="";
					}
				else
					{
					name=user.firstName
					id=user.userId;
					last=user.lastLogin;
					}
				var businessObj = {
					category : cat,
					subCategories : subCat,
					firstName:name,
					userId:id,
					lastLogin:last
				};
				ejs.renderFile('./views/homepage.ejs', businessObj,
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
		});

/*} else {

	ejs.renderFile('./views/homepage.ejs', user, function(err, result) {
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

}*/

}

function getProductsById(req, res) {
	var getQuery = "select *  from product where productId = "
			+ req.param("cid");
	console.log(getQuery);
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {

			var responseString = JSON.stringify(results[0]);
			res.send(responseString);
			console.log("products:-"+responseString);

		}
	}, getQuery);

}
function submitReview(req, res) {


	   var getUser = "insert into product_review (product_id , review , user_id) values ("+req.param("pid")+" , '"+req.param("reviewSubmit")+"',"+req.param("userId")+");";



	   console.log("Query is:" + getUser);

	   mysql.saveData(function(err, results) {
	       if (err) {

	           throw err;
	       } else {
	           data = {
	               errorCode : 100,
	               message : "Review submitted successfully",
	               url : "http://localhost:3000/listAllProducts"
	           };
	           responseString = JSON.stringify(data);
	           res.send(responseString);
	       }

	   }, getUser);
	   
	   

	}

function WriteReview(req, res) {

	var user=req.session.user;
	var pid=req.param("pid");

	res.render('writeReview', {

		category : category,
		subCategories : temp,
		firstName:user.firstName, lastLogin:user.lastLogin,
		userId:user.userId,
		pid: pid

	});


}


exports.renderHome = renderHome;
exports.deleteProductForm = deleteProductForm;
exports.deleteProduct = deleteProduct;
exports.addProduct = addProduct;
exports.addProductForm = addProductForm;
exports.loadSubCategories = loadSubCategories;
exports.listSubCategories = listSubCategories;
exports.listCategories = listCategories;
exports.addCategory = addCategory;
exports.addCategoryForm = addCategoryForm;
exports.subCategoryForm = subCategoryForm;

exports.homePage = homePage;
exports.signup = signup;
exports.signin = signin;
exports.addSubCategory = addSubCategory;
exports.getSubCategoryForCategory = getSubCategoryForCategory;
exports.getProductsForSubCategory = getProductsForSubCategory;
exports.renderCategoryAndSubCategory = renderCategoryAndSubCategory;
exports.listProducts = listProducts;

exports.updateSubCategoryForm = updateSubCategoryForm;
exports.updateSubCategory = updateSubCategory;
exports.deleteSubCategoryForm = deleteSubCategoryForm;
exports.deleteSubCategory = deleteSubCategory;
exports.getSubCategoryInJson = getSubCategoryInJson;
exports.getProductsInJson = getProductsInJson;
exports.updateProductForm = updateProductForm;
exports.updateProduct = updateProduct;
exports.updateCategoryForm = updateCategoryForm;
exports.updateCategory = updateCategory;
exports.deleteCategoryForm = deleteCategoryForm;
exports.deleteCategory = deleteCategory;
exports.getProductsById=getProductsById;
exports.WriteReview = WriteReview;
exports.submitReview = submitReview;
