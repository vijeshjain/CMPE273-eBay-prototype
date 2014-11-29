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
	//console.log("Query is:" + getUser);
	//var subCategories = [];
	var count = 0;
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			try {
				console.log(results);
				if (results!=null&&results.length > 0) {
					for (var i = 0; i < results.length; i++) {
						var	getUser1 = "select *  from sub_category where categoryid = " + results[i].categoryId + " limit 5";
						console.log(results[i].name);
						mysql.fetchData(function(err, result) {
							if (err) {
								throw err;
							} else {
								if (result.length > 0 ) {
									console.log("In If*************************************");
									/*					console.log("Category Name :::::"+results[i].name);*/
									for (var j=0;j<result.length;j++){
										console.log("Sub Category:-"+result[j].name+ result[j].categoryId);

									}
									subCategories.push(result);
											//subCategories=result;
										}
										else{
											console.log("In Else--------------------------------");
											
										}
										temp = JSON.parse(JSON.stringify(subCategories));

									}},getUser1);
					}	
					console.log("Category:-"+ category);
					console.log("Again*************************************");
					console.log("Sub Category:-"+temp[0].name+ temp[0].categoryId)
					
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
				res.render('addCategoryForm', {

					category : category,
					subCategories : temp,
				});

			}

		}
	}, getUser);
}

function subCategoryForm(req, res) {

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
				res.render('subCategoryForm', {

					category : category,
					subCategories : temp,
				});

			}

		}
	}, getUser);

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
		homePage(req, res);

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
				res.render('listCategories', {

					category : category,
					subCategories : temp,
				});

			}

		}
	}, getUser);

}

function listSubCategories(req, res) {

	var getUser = "select * from category";	
	console.log("Query is:" + getUser);
	var subCategories = [];
	var count = 0;
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			try {
				if (results!=null&&results.length > 0) {
					for (var i = 0; i < results.length; i++) {
						var	getUser1 = "select *  from sub_category where categoryid = " + results[i].categoryId + " limit 5;";

						mysql.fetchData(function(err, result) {
							if (err) {
								throw err;
							} else {
								if (result.length > 0 ) {
									subCategories.push(result);
								}
								temp = JSON.parse(JSON.stringify(subCategories));

							}},getUser1);
					}	
					category = results;

					res.render('listSubCategories', {
						
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
function getSubCategoryForCategory(req,res)
{
	var getQuery="select *  from sub_category where categoryid = " + req.param("cid"); 	
	
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			var finalObj={
				subCategories:results

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

function getProductsForSubCategory(req,res)
{
	var getQuery="select *  from product where subCategoryId = " + req.param("cid"); 	
	
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			var finalObj={
				Products:results

			}
			ejs.renderFile('./views/ProductListView.ejs', finalObj,
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

function loadSubCategories(req, res) {
	
	var type=req.param("catName");
	
	console.log("Type"+type);
	res.render('subCategories', {
		
		category : category,
		subCategories : temp,
		type:type
		
	});
	


}

// tanvi



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



function addProductForm(req, res) {

	var getUser = "select * from category ;";
	console.log("Query is:" + getUser);
	
	var getSubCat = "select * from sub_category;";
	console.log("Query is:" + getSubCat);
	

	mysql.fetchData(function(err, ans) {
		if (err) {
			throw err;
		} else {
			

			if (ans.length > 0 ) {
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
					//subcat : sub,
				});


			}

		}
	}, getUser);
	
	
}



function addProduct(req, res) {

	
	var subCategory = req.param("subCategory");
	var productPrice = req.param("productPrice");
	var productName = req.param("productName");
	var catName = req.param("category");
	var productDesc = req.param("productDesc");
	var productType = req.param("productType");
	var itemCondition = req.param("itemCondition");
	var quantity = req.param("quantity");
	
	var itemConditionId ;
	var productTypeId;
	
	if (productType == "Selling")
		productTypeId = 1;
	else
		productTypeId = 2;
	
	
	if (itemCondition == "New")
		itemConditionId = 1;
	else
		itemConditionId = 2;
	
	console.log("sub category :" + subCategory);

	console.log("New Sub Category :" + subCategory);

	var query = "insert into product(name,basePrice,productType,itemCondition , description , subCategoryId , sellerId , quantity , isDeleted ) values('"
		+ productName + "'," + productPrice + "," + productTypeId + "," + itemConditionId   + ",'" + productDesc +"'," + subCategory  +", 5 , "+ quantity+ ",0 );";
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





function deleteProduct(req, res) {

	var deleteProduct = req.param("deleteProduct");


	var query = "update product set isDeleted = 1 where name = '"+deleteProduct+"';";
	console.log("Query is:" + query);

	mysql.saveData(function(err, results) {
		if (err) {

			throw err;
		} else {
			homePage(req, res);

		}

	}, query);

}

exports.deleteProductForm = deleteProductForm;
exports.deleteProduct = deleteProduct;
exports.addProduct = addProduct;
exports.addProductForm = addProductForm;

// -- tanvi --




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
exports.getSubCategoryForCategory=getSubCategoryForCategory;
exports.getProductsForSubCategory=getProductsForSubCategory;
