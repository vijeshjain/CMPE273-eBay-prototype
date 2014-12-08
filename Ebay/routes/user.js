var ejs = require("ejs");
var mysql = require('./PoolManager.js');
var common = require('./common');
var home = require('./home');
var shoppingCart = require('./shoppingCart');
/*
 * GET users listing.
 */

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

 	if (typeof (req.param("password")) === "undefined"
 		|| typeof (req.param("username")) === "undefined") {
 		var message = "Invalid username or password";
 	ejs.renderFile('./views/invalidLogin.ejs', {
 		message : message
 	}, function(err, result) {
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
	mysql
	.fetchData(
		function(err, results) {
			if (err) {
				throw err;
			} else {
				if (results.length > 0) {
					console.log("valid Login");
					var loggedInUser = results[0];
								// on login success update the last login time
								// as current time
								updateCurrentDateInLoggedInUser(req
									.param("username"));
								loggedInUser.lastlogin = common.FormatDate(
									loggedInUser.lastLogin,
									"%Y-%m-%d %H:%M:%S", false);
								// set the session object
								req.session.user = loggedInUser;
								// render the home page
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

																if (count + 1 == results.length) {
																	subCat
																	.push(subCategory);
																}
															// }

														}
														loggedInUser.category = cat;
														loggedInUser.subCategories = subCat;
														req.session.user = loggedInUser;
														var selectShoppingCart = "select *from shopping_cart JOIN product on shopping_cart.productId=product.productId where userId="
														+ loggedInUser.userId;
														mysql
														.fetchData(
															function(
																err,
																rows) {
																if (err) {
																	throw err;
																} else {
																	if (rows.length > 0) {
																		var shoppingCart = rows;
																		req.session.shoppingCart = rows;

																	}

																	ejs
																	.renderFile(
																		'./views/homePage.ejs',
																		loggedInUser,
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
															},
															selectShoppingCart);
														/*
														 * ejs.renderFile('./views/homePage.ejs',
														 * loggedInUser,
														 * function(err, result) { //
														 * render on success if
														 * (!err) {
														 * res.end(result); } //
														 * render or error else {
														 * res.end('An error
														 * occurred');
														 * console.log(err); }
														 * });
*/

}
}, getQuery);

} else {

	console.log("Invalid Login");
	var message = "Invalid username or password";
	ejs.renderFile('./views/invalidLogin.ejs', {
		message : message
	}, function(err, result) {
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
	console.log("hello1" + Fname);
	if (Fname === null || typeof (Fname) === 'undefined' || (Fname.search(/^[a-zA-Z]{3,15}$/)== -1)) {
		data = {
			errorCode : 101,
			message : "First name should contain 3 to 15 letters"
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var Lname = req.param("lname");
	console.log("hello2" + Lname);
	if (Lname === null || typeof (Lname) === 'undefined' || (Lname.search(/^[a-zA-Z]{3,15}$/)== -1)) {
		data = {
			errorCode : 101,
			message : "Last name should contain 3 to 15 letters"
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var Email = req.param("username");
	console.log("hello3" +Email);
	if (Email === null || typeof (Email) === 'undefined' || (Email.search(/^.+@[^\.].*\.[a-z]{2,}$/)== -1) ) {
		data = {
			errorCode : 101,
			message : "Email requried for sucessful registration"
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var Password = req.param("password");
	console.log("hello4" +Password);
	if (Password === null || typeof (Password) === 'undefined' || (Password.search(/^.{8,15}$/)== -1)) {
		data = {
			errorCode : 101,
			message : "Password should contain 8 to 15 letters"
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var confirmPassword = req.param("Confirmpassword");
	console.log("hello5" +confirmPassword);
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
	console.log("hello6" +addr);
	var city = req.param("city");
	var zipcode = req.param("zip");
	
	if (zipcode === null || typeof (zipcode) === 'undefined' || (zipcode.search(/(^\d{5}$)|(^\d{5}-\d{4}$)/)== -1)) {
		data = {
			errorCode : 101,
			message : "Zipcode format is invalid"
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	
	var membershipNumber = req.param("membershipNumber");
	
	if (membershipNumber === null || typeof (membershipNumber) === 'undefined' || (membershipNumber.search(/[0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9][0-9][0-9]/)== -1)) {
		data = {
			errorCode : 101,
			message : "Membership number format is invalid"
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	
	
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
		isUserBuyer : buyerProp,
		membershipId:membershipNumber

	};
	// check if the username is already in use
	var selectQ = "select * from user where userName='" + Email + "'"
	+ " and isDeleted=0";
	mysql
	.fetchData(
		function(err, results) {
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
								mysql
								.insertData(
									function(err, results) {
										if (err) {
											throw err;
										} else {
											data = {
												errorCode : 100,
												message : "You have successfuly registered to eBay. Please proceed to login.",
												url : "http://localhost:3000/signin"

											};
											responseString = JSON
											.stringify(data);
											res
											.send(responseString);
										}

									}, newUserData, "user");
							}
						}
					}, selectQ);

};

exports.logout = function(req, res) {

	req.session.destroy();
	res.redirect("/");
}

exports.displayusers = function(req, res) {

	var ShowUserQuery = "select * from user where isDeleted=0;";

	mysql.fetchData(function(err, rows) {
		if (!err) {
			var categories = home.category;
			var user = req.session.user;
			ejs.renderFile('./views/viewusers.ejs', {
				rows : rows,
				category : categories,
				firstName : user.firstName,
				lastLogin : user.lastLogin,
				userId : user.userId
			}, function(err, result) {
				if (!err) {
					res.end(result);
				} else {
					res.end('An error occurred');
					console.log(err);
				}
			});
		} else {
			res.end('An error occurred');
			console.log(err);
		}
	}, ShowUserQuery);

};

exports.deleteUser = function(req, res) {

	var deleteUserQuery = "update user set isDeleted=1 where userId = "
	+ req.param("uid") + ";";

	mysql.fetchData(function(err, rows) {
		if (!err) {
			res.end(rows);
			// displayusers(req, res);
			res.redirect('/users');
		}

		else {

			res.end('An error occurred');
			console.log(err);
		}
	}, deleteUserQuery);

}

exports.editUser = function(req, res) {

	var viewUserProfile = "select * from user where userId=" + req.param("uid")
	+ ";";

	mysql.fetchData(function(err, rows) {
		if (!err) {

			console.log(JSON.stringify(rows));
			var user = req.session.user;
			ejs.renderFile('./views/editProfile.ejs', {
				userData : rows,
				firstName : user.firstName,
				lastLogin : user.lastLogin,
				userId : user.userId
			}, function(err, result) {

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
		}
	}, viewUserProfile);

}

exports.editAndSaveUser = function(req, res) {

	var userId=req.param("uid");
	var user=req.session.user;
	//var currentDate = common.FormatDate(new Date(), "%Y-%m-%d %H:%M:%S", false);
	var userUpdated={
			
			userId:userId,
			firstName:req.param("fname"),
			lastName:req.param("lname"),
			userName:req.param("username"),
			password:user.password,
			city:req.param("city"),
			address:req.param("address"),
			zipCode:req.param("zip"),
			membershipId: req.param("membershipId"),
			isDeleted:0,
			lastLogin:user.lastLogin,
			isUserSeller:user.isUserSeller,
			isUserBuyer:user.isUserBuyer
			
	};

	var editAndSaveQuery = "update user set firstName ='" + req.param("fname")
	+ "',lastName ='" + req.param("lname") + "',userName ='"
	+ req.param("username") + "',membershipId ='"
	+ req.param("membershipId") + "',address ='" + req.param("address")
	+ "',city ='" + req.param("city") + "',zipCode ='"
	+ req.param("zip")
	+ "',isUserBuyer = 0 ,isUserSeller = 1 where userId="
	+ req.param("uid") + ";";
	mysql.fetchData(function(err, rows) {
		if (!err) {
			res.end(rows);

			if(req.param("uid")==5)
			{
				res.redirect('/users');
			}
			else
			{
				req.session.user=userUpdated;
				res.redirect('/myProfile/'+userId);
			}

		}

		else {

			res.end('An error occurred');
			console.log(err);
		}
	}, editAndSaveQuery);

}

exports.getUserFromFirstName = function(req, res) {
	var getQ = "select *from user where firstName like'"
	+ req.param("searchword") + "%' or lastName like'"
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

exports.getUserProfileDetails = function(req, res) {
	var id = req.param("userId");
	if (id != null && id != undefined) {
		var getQ = "select *from user where userId=" + id;
		mysql.fetchData(function(err, results) {
			if (err) {
				throw err;
			} else {
				var user = results[0];
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

exports.myProfile = function(req, res){

	var userId = req.param('userId');

	var userProfileSellerQuery = "select h.historyId, h.productId, h.customerId, h.sellerId, h.quantity, h.price,CONCAT(me.firstName, ' ',me.lastName) as username,me.address, me.city, me.state, me.zipCode, me.membershipId, me.lastLogin, me.isUserSeller, me.isUserBuyer, CONCAT(u.firstName, ' ', u.lastName) as sellername, h.sellingDate, p.name as productName,ic.name as itemConditionName from history h inner join product p ON p.productId = h.productId inner join item_condition ic ON ic.conditionId=(select conditionId from product where productId = h.productId) inner join user u ON u.userId=h.sellerId inner join user me ON me.userId = h.customerId where h.sellerId="+userId+";";
	console.log(userProfileSellerQuery);
	var userProfileQuery = "select h.historyId, h.productId, h.customerId, h.sellerId, h.quantity, h.price,me.userName,CONCAT(me.firstName, ' ',me.lastName) as username,me.address, me.city, me.state, me.zipCode, me.membershipId, me.lastLogin, me.isUserSeller, me.isUserBuyer, CONCAT(u.firstName, ' ', u.lastName) as sellername, h.sellingDate, p.name as productName,ic.name as itemConditionName from history h inner join product p ON p.productId = h.productId inner join item_condition ic ON ic.conditionId=(select conditionId from product where productId = h.productId) inner join user u ON u.userId=h.sellerId inner join user me ON me.userId = h.customerId where h.customerId="+userId+";";
	mysql.fetchData(function(err, purcData) {
		if(!err)
		{
			mysql.fetchData(function(err, sellerData) {
				if(!err)
				{
					var categories = home.category;
					var user=req.session.user;
					//console.log(JSON.stringify(user));

					console.log("\n"+user.lastLogin+"\n");
					console.log("\n"+user.membershipId+"\n");
					res.render('myProfile', {
						sellerData: sellerData, 
						purcData: purcData,
						category: categories,
						firstName : user.firstName,
						lastLogin : user.lastLogin,
						userId : user.userId,
						user: user
					}, function(err, results){

						if(err)
						{
							console.log(err);
							throw err;
						}
						else
						{
							res.end(results);
						}
					});

				}else {

					res.end('An error occurred');
					console.log(err);
				} 
			}, userProfileSellerQuery); 
		}


			//console.log(rows);
			
			else {

				res.end('An error occurred');
				console.log(err);
			}}, userProfileQuery);

};


