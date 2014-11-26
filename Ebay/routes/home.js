/**
 * New node file
 */
var ejs = require("ejs");
var mysql = require('./mysql');

var category = null;
var subcategory = null;
var items = null;
var categoryId = null;
var temp = null;

function homePage(req, res) {
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
							
					res.render('dashboard', {
						
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

exports.listSubCategories = listSubCategories;
exports.listCategories = listCategories;
exports.addCategory = addCategory;
exports.addCategoryForm = addCategoryForm;
exports.subCategoryForm = subCategoryForm;
exports.homePage = homePage;
exports.signup = signup;
exports.signin = signin;
exports.addSubCategory = addSubCategory;
