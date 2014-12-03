var ejs = require("ejs");
var mysql = require('./mysql');
var common = require('./common');
var home = require('./home');
var shoppingCart=require('./shoppingCart');
/*
 * GET users listing.
 */


 exports.list = function(req, res) {
 	res.send("respond with a resource");
 };

 function updateCurrentDateInLoggedInUser(username) {
 	var currentDate = common.FormatDate(new Date(), "%Y-%m-%d %H:%M:%S", false);
 	var updateTime = "Update user SET lastLogin='" + currentDate
 	+ "' where username='" + username + "'";

 	mysql.fetchData(function(err, results) {
 		if (err) {
 			throw err;
 		} else {
 			console.log("last login time updated for the user.");
 		}

 	}, updateTime);
 }

exports.signin = function(req, res) {
 	
 	if (typeof (req.param("password")) === "undefined"|| typeof (req.param("username")) === "undefined") {
 		var message = "Invalid username or password";
 	ejs.renderFile('./views/invalidLogin.ejs', {message: message},function(err, result) {
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
 var getUser = "select * from user where username='" + req.param("username")
 + "'" + " and password='" + req.param("password") + "'";

	// check using the database operations if it is correct
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results.length > 0) {
				console.log("valid Login");
				var loggedInUser = results[0];
				// on login success update the last login time as current time
				updateCurrentDateInLoggedInUser(req.param("username"));
				loggedInUser.lastlogin = common.FormatDate(
					loggedInUser.lastLogin, "%Y-%m-%d %H:%M:%S", false);
				// set the session object
				req.session.user = loggedInUser;
				// render the home page
				var getQuery = "Select  c.categoryId,c.name,c.image,c.isDeleted,s.subCategoryId,s.name subName,s.image subImage,s.isDeleted,s.categoryId from category c JOIN sub_category s on c.categoryId=s.categoryId where c.isDeleted=0 order by c.categoryId asc;";
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
						loggedInUser.category = cat;
						loggedInUser.subCategories=subCat;
						req.session.user = loggedInUser;
						
						ejs.renderFile('./views/homePage.ejs', loggedInUser, function(err,
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

			} else {
				
				console.log("Invalid Login");
				var message = "Invalid username or password";
				ejs.renderFile('./views/invalidLogin.ejs', {message: message}, function(
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
		}
	}, getUser);

}

exports.register = function(req, res) {
	var data;
	var responseString;
	var Fname = req.param("fname");
	if (Fname === null || typeof (Fname) === 'undefined') {
		data = {
			errorCode : 101,
			message : "First name requried for sucessful registration"
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var Lname = req.param("lname");
	if (Lname === null || typeof (Lname) === 'undefined') {
		data = {
			errorCode : 101,
			message : "Last name requried for sucessful registration"
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var Email = req.param("username");
	if (Email === null || typeof (Email) === 'undefined') {
		data = {
			errorCode : 101,
			message : "Email requried for sucessful registration"
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var Password = req.param("password");
	if (Password === null || typeof (Password) === 'undefined') {
		data = {
			errorCode : 101,
			message : "Password requried for sucessful registration"
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var confirmPassword = req.param("Confirmpassword");
	if (confirmPassword === null || typeof (confirmPassword) === 'undefined') {
		data = {
			errorCode : 101,
			message : "Confirm password requried for sucessful registration"
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	if (confirmPassword !== Password) {
		data = {
			errorCode : 101,
			message : "Confirm password and password do not match. Try again."
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var addr = req.param("address");
	var city = req.param("city");
	var zipcode = req.param("zip");
	var state = req.param("state");
	var sellerProp = 1;
	var buyerProp = 0;
	var isSeller = req.param("userType_seller");
	var isBuyer = req.param("userType_buyer");
	if (isSeller === "on" && isBuyer === "on") {
		sellerProp = 1;
		buyerProp = 1;
	} else if (isSeller === "on") {
		sellerProp = 1;
		buyerProp = 0;
	} else if (isBuyer === "on") {
		sellerProp = 0;
		buyerProp = 1;
	}
	var memberId = "";
	var todaysDate = common.FormatDate(new Date(), "%Y-%m-%d %H:%M:%S", true);
	var newUserData = {
		firstName : Fname,
		lastName : Lname,
		userName : Email,
		password : Password,
		lastLogin : todaysDate,
		isDeleted : 0,
		city : city,
		address : addr,
		zipCode : zipcode,
		state : state,
		membershipId : memberId,
		isUserSeller : sellerProp,
		isUserBuyer : buyerProp

	};
	// check if the username is already in use
	var selectQ = "select * from user where userName='" + Email + "'"+" and isDeleted=0";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results.length > 0) {
				// if we get an entry then send the error
				data = {
					errorCode : 101,
					message : "Please choose a unique username."
				};
				responseString = JSON.stringify(data);
				res.send(responseString);
			} else {
				// else register the new user 
				mysql.insertData(function(err, results) {
					if (err) {
						throw err;
					} else {
						data = {
							errorCode : 100,
							message : "You have successfuly registered to eBay. Please proceed to login.",
								  url : "http://localhost:3000/signin"
						
						};
						responseString = JSON.stringify(data);
						res.send(responseString);
					}

				}, newUserData, "user");
			}
		}
	}, selectQ);

};

exports.logout=function(req,res){
	req.session.destroy();
	res.redirect("/");
	
}

exports.displayusers = function(req, res){

	var ShowUserQuery = "select * from user where isDeleted=0;";

	mysql.fetchData(function(err,rows){
		if(!err)
		{
			var categories = home.category;

			ejs.renderFile('./views/viewusers.ejs', {rows: rows, category: categories }, function(err, result)
			{
				if(!err)
				{
					res.end(result);
				}
				else
				{
					res.end('An error occurred');
					console.log(err);
				}
			});
		}
		else
		{
			res.end('An error occurred');
			console.log(err);
		}
	},ShowUserQuery);

};

exports.deleteUser = function(req,res)
{

	var deleteUserQuery = "update user set isDeleted=1 where userId = "+req.param("uid")+";";

	mysql.fetchData(function(err,rows) {
		if (!err) {
			res.end(rows);
            //displayusers(req, res);
            res.redirect('/users');
        }

        else {

        	res.end('An error occurred');
        	console.log(err);
        }}, deleteUserQuery);


}

exports.editUser = function(req,res)
{
	
	var viewUserProfile = "select * from user where userId="+req.param("uid")+";";
	
	mysql.fetchData(function(err,rows) {
		if (!err) {
			
			console.log(JSON.stringify(rows));

			ejs.renderFile('./views/editProfile.ejs', { userData: rows}, function(err, result) {

				if (!err) {
					res.end(result);
				}

				else {
					res.end('An error occurred');
					console.log(err);
				}
			});
		}

		else {

			res.end('An error occurred');
			console.log(err);
		}}, viewUserProfile);
	

}

exports.editAndSaveUser = function(req,res)
{

	var editAndSaveQuery = "update user set firstName ='"+req.param("fname")+"',lastName ='"+req.param("lname")+"',userName ='"+req.param("lname")+"',membershipId ='"+req.param("membershipId")+"',address ='"+req.param("address")+"',city ='"+req.param("city")+"',zipCode ='"+req.param("zip")+"',isUserBuyer = 0 ,isUserSeller = 1 where userId="+req.param("uid")+";";
	mysql.fetchData(function(err,rows) {
		if (!err) {
			res.end(rows);

			res.redirect('/users');

		}

		else {

			res.end('An error occurred');
			console.log(err);
		}}, editAndSaveQuery);


}

exports.getUserFromFirstName=function(req,res)
{
	var getQ="select *from user where firstName like'"+ req.param("searchword")+"%' or lastName like'"+req.param("searchword")+"%' and isDeleted=0";
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
			ejs.renderFile('./views/searchResultForuser.ejs', businessObj,
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

}

exports.getUserProfileDetails=function(req,res)
{
	var id=req.param("userId");
	if(id!=null&& id!=undefined)
	{
		var getQ="select *from user where userId="+ id;
		mysql.fetchData(function(err, results) {
			if (err) {
				throw err;
			} else {
				var user=results[0];
				ejs.renderFile('./views/userProfileDetails.ejs', user,
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
	}

}

