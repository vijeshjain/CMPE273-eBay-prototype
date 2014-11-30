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


exports.getProductFromName=function(req,res)
{

	var getQ="select * from product where name like '"+ req.param("searchword")+"%' and isDeleted=0";
	console.log(getQ);
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if(results==null ||typeof(results)=="undefined"|| results.length==0)
			{
				results=new Array();
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