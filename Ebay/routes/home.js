/**
 * New node file
 */
var ejs = require("ejs");
var mysql = require('./mysql');

var category = null;
var items = null;
var categoryId = null;

function homepage(req, res) {

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
				res.render('homepage', {
					category : category,
				
				
				});
			
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
exports.homepage=homepage;
exports.signup=signup;
exports.signin=signin;
