/**
 * New node file
 */

var ejs = require("ejs");
var mysql = require('./mysql');
var common = require('./common');


exports.getProductJSONList=function(req,res)
{
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