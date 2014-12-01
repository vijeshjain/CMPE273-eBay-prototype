/**
 * New node file
 */
var sub;
var ejs = require("ejs");
var mysql = require('./mysql.js');

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
	mysql
			.fetchData(
					function(err, results) {
						if (err) {
							throw err;
						} else {
							try {
								console.log(results);
								if (results != null && results.length > 0) {
									for ( var i = 0; i < results.length; i++) {
										var getUser1 = "select *  from sub_category where categoryid = "
												+ results[i].categoryId
												+ " limit 5";
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
																	for ( var j = 0; j < result.length; j++) {
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
					}, getUser);

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

	res.render('addCategoryForm', {

		category : category,
		subCategories : temp,
	});
}

function subCategoryForm(req, res) {

	res.render('subCategoryForm', {

		category : category,
		subCategories : temp,
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

	var query = "insert into category(name,isdeleted) values('" + newCategory
			+ "','0')";
	console.log("Query is:" + query);

	mysql.saveData(function(err, results) {
		if (err) {

			throw err;
		} else {
			// homePage(req, res);
			res.redirect('/listCategories');
		}

	}, query);

}

function addSubCategory(req, res) {

	var newSubCategory = req.param("subcategoryName");
	var categoryid = req.param("category");
	console.log("Category :" + categoryid);

	console.log("New Sub Category :" + newSubCategory);

	var query = "insert into sub_category(name,categoryid,isdeleted) values('"
			+ newSubCategory + "','" + categoryid + "','0')";
	console.log("Query is:" + query);

	mysql.saveData(function(err, results) {
		if (err) {

			throw err;
		} else {

			category = results;
			homePage(req, res);

		}
	}, query);

}

function listCategories(req, res) {

	res.render('listCategories', {

		category : category,
		subCategories : temp,
	});

}

function listSubCategories(req, res) {

	res.render('listSubCategories', {

		category : category,
		subCategories : temp

	});
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

	console.log("Type" + type);
	res.render('subCategories', {

		category : category,
		subCategories : temp,
		type : type

	});

}

function renderCategoryAndSubCategory(req, res) {

	var getQuery = "Select  c.categoryId,c.name,c.image,c.isDeleted,s.subCategoryId,s.name subName,s.image subImage,s.isDeleted,s.categoryId from category c JOIN sub_category s on c.categoryId=s.categoryId where c.isDeleted=0 and s.isDeleted=0 order by c.categoryId asc;";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {

			var cat = new Array();
			var subCat = new Array();
			var currentCategory = results[0];
			var subCategory = null;
			for ( var count = 0; count < results.length; count++) {

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
				//else {
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
				//}

			}
			
			category=cat;
			temp=subCat;
			var resultObj = {
				category : cat,
				subCategories : subCat
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
	}, getQuery);
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
 * category : category, subCategories : temp, });
 *  }
 *  } }, getUser);
 *  }
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
				res.render('addProductForm', {

					category : category,
					subCategories : temp,
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
 * category = results; homePage(req, res);
 *  } }, query);
 *  }
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
 * throw err; } else { homePage(req, res);
 *  }
 *  }, query);
 *  }
 */
function listProducts(req, res) {

	var category_new = null;

	var getUser = "select c.categoryid,c.name cat_name,c.image cat_image,s.name subcat_name,s.subCategoryId, p.productId,p.name prod_name from category c,sub_category s,product p where c.categoryId=s.categoryId  and s.subCategoryId=p.subCategoryId ";
	console.log("Query is:" + getUser);

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results.length > 0) {
				for ( var i = 0; i < results.length; i++) {
					console.log("Row-----:" + results[i].prod_name);
				}

				category_new = results;
				res.render('listProducts', {
					category_new : category_new,
					category : category,
					subCategories : temp

				});

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

	var getUser = "select * from category";
	console.log("Query is:" + getUser);

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results.length > 0) {
				for ( var i = 0; i < results.length; i++) {
					console.log(results[i].name);
				}

				category = results;
				res.render('deleteProduct', {

					category : category,
					subCategories : temp,
				});

			}

		}
	}, getUser);

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
			+ ", 5 , " + quantity + ",0 );";
	console.log("Query is:" + query);

	mysql.saveData(function(err, results) {
		if (err) {

			throw err;
		} else {

			// category = results;
			// res.redirect()--redirect to display product page
			homePage(req, res);

		}
	}, query);

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

	res.render('updateSubCategoryForm', {

		category : category,
		subCategories : temp
	});
}

function updateSubCategory(req, res) {

	var newSubCategory = req.param("newSubCategoryName");
	var subCategoryId = req.param("sub-category");
	console.log("SubCategoryId :" + subCategoryId);

	console.log("New SubCategory Name: " + newSubCategory);

	var query = "Update sub_category set name = '" + newSubCategory
			+ "' where subCategoryId = " + subCategoryId;
	console.log("Query is:" + query);

	mysql.saveData(function(err, results) {
		if (err) {

			throw err;
		} else {

			// category = results;
			homePage(req, res);

		}
	}, query);

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

	res.render('deleteSubCategoryForm', {

		category : category,
		subCategories : temp
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

	res.render('updateProductForm', {

		category : category,
		subCategories : temp
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

			// category = results;
			// res.redirect()--redirect to display product page
			homePage(req, res);

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
	 * category : category, subCategories : temp });
	 *  }
	 *  } }, getUser);
	 */

	res.render('updateCategoryForm', {

		category : category,
		subCategories : temp
	});
}

function updateCategory(req, res) {

	var newCategory = req.param("newCategoryName");
	var categoryId = req.param("categoryId");
	console.log("CategoryId :" + categoryId);

	console.log("New Category Name: " + newCategory);

	var query = "Update category set name = '" + newCategory
			+ "' where categoryId = " + categoryId;
	console.log("Query is:" + query);

	mysql.saveData(function(err, results) {
		if (err) {

			throw err;
		} else {

			category = results;
			homePage(req, res);

		}
	}, query);

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
	 * category : category, subCategories : temp });
	 *  }
	 *  } }, getUser);
	 */

	res.render('deleteCategoryForm', {

		category : category,
		subCategories : temp
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

					category = results;
					homePage(req, res);

				}
			}, dependentQuery);
		}
	}, query);
}

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
