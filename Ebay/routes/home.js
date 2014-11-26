/**
 * New node file
 */
var ejs = require("ejs");
var mysql = require('./mysql');

var category = null;
var subcategory = null;
var items = null;
var categoryId = null;
var temp=null;

function homepage(req, res) {

	var getUser = "select * from category";
	var getUser1 = "select *  from sub_category  order by categoryid asc  limit 5	";
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
						console.log(results[i].name);
						getUser1 = "select *  from sub_category where categoryid =" + results[i].categoryId + " limit 5;";
					
					mysql.fetchData(function(err, results) {
						if (err) {
							throw err;
						} else {
							subcategory = results;
							for (var i = 0; i < results.length; i++) {
								//console.log("Sub "+results[i].name);
								
							}
							subCategories.push(results);
							count++;
							for (var i = 0; i < subCategories.length; i++) {
								//console.log("Sub"+results[i].name);
								console.log("Sub "+subCategories[i]);
								result = subCategories[i];
								console.log(JSON.stringify(subCategories));
								for (var j = 0; j < result.length; j++) {
									console.log(result[j].name);
								}
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
				// TODO: handle exception
				console.log(e);
			}

		}
	}, getUser);

}



function signin(req,res) {

	ejs.renderFile('./views/signin.ejs',function(err, result)
			{
	   // render on success
	   if (!err)
	   {
	            res.end(result);
	   }
	   // render or error
	   else
	   {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
}


function addCategoryform(req,res) {

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
				res.render('addCategoryform', {
					
					category : category,
					subCategories : temp,
				});

			
			}

		}
	}, getUser);
}

function subCategoryform(req,res) {

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
				res.render('subcategoryform', {
					
					category : category,
					subCategories : temp,
				});

			
			}

		}
	}, getUser);
	
}

function signup(req,res) {

	ejs.renderFile('./views/signup.ejs',function(err, result) {
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

	var query = "insert into category(name,isdeleted) values('" + newCategory + "','0')";
	console.log("Query is:" + query);

	mysql.saveData(function(err, results) {
		if (err) {

			throw err;
		} else {
			res.render('test', {
				
				
			});

			
			}
			
		
	}, query);
	
	

	
}


function addSubCategory(req, res) {

	var newSubCategory = req.param("subcategoryName");
	var categoryid=req.param("category");
	console.log("Category :" + categoryid);
	
	console.log("New Sub Category :" + newSubCategory);

	var query = "insert into sub_category(name,categoryid,isdeleted) values('" + newSubCategory + "','"+categoryid+"','0')";
	console.log("Query is:" + query);

	mysql.saveData(function(err, results) {
		if (err) {

			throw err;
		} else {
			
			
				category = results;
				res.render('test', {
					
					
				});

			
			
			
		}
	}, query);

	
}

function listcategories(req, res)  {

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
				res.render('listcategories', {
					
					category : category,
					subCategories : temp,
				});

			
			}

		}
	}, getUser);
	
	

}

function listsubcategories(req, res)  {

	var getUser = "select * from category";
	var getUser1 = "select *  from sub_category  order by categoryid asc  limit 5	";
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
						console.log(results[i].name);
						getUser1 = "select *  from sub_category where categoryid =" + results[i].categoryId + " limit 5;";
					
					mysql.fetchData(function(err, results) {
						if (err) {
							throw err;
						} else {
							subcategory = results;
							for (var i = 0; i < results.length; i++) {
								//console.log("Sub "+results[i].name);
								
							}
							subCategories.push(results);
							count++;
							for (var i = 0; i < subCategories.length; i++) {
								//console.log("Sub"+results[i].name);
								console.log("Sub "+subCategories[i]);
								result = subCategories[i];
								console.log(JSON.stringify(subCategories));
								for (var j = 0; j < result.length; j++) {
									console.log(result[j].name);
								}
							}
							temp = JSON.parse(JSON.stringify(subCategories));
							
						}},getUser1);
					}	
					category = results;
					res.render('listsubcategories', {
						
						category : category,
						subCategories : temp,
					});

					
				}
			} catch (e) {
				// TODO: handle exception
				console.log(e);
			}

		}
	}, getUser);
	
	

}


exports.listsubcategories=listsubcategories;
exports.listcategories=listcategories;
exports.addCategory=addCategory;
exports.addCategoryform=addCategoryform;
exports.subCategoryform=subCategoryform;
exports.homepage=homepage;
exports.signup=signup;
exports.signin=signin;
exports.addSubCategory=addSubCategory;

