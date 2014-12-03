/**
 * New node file
 */

 var ejs = require("ejs");
 var mysql = require('./mysql');
 var common = require('./common');
 var home = require('./home');


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


exports.getProductDetailsFromName=function(req,res)
{
	
	
var getQ="SELECT p.productId ,p.NAME AS productName ,p.description ,p.productType ,pt.NAME AS productTypeName ,p.subCategoryId ,sc.name as subname,p.itemCondition ,ic.NAME AS itemConditionName ,p.basePrice,p.sellerId ,CONCAT (u.firstName	,' '	,u.lastName) AS sellername ,p.IMAGE,p.quantity,p.isDeleted FROM product p INNER JOIN product_type pt ON p.productType = pt.typeId INNER JOIN item_condition ic ON p.itemCondition = ic.conditionId INNER JOIN user u ON p.sellerId = u.userId INNER JOIN sub_category sc ON p.subCategoryId = sc.subCategoryId WHERE p.NAME ='"+ req.param("product")+"' AND p.isDeleted = 0;";
	//var getQ="select * from product where name ='"+ req.param("product")+"' and isDeleted=0";
	console.log(getQ);
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			var businessObj = results[0];
			var user=req.session.user;
			if(typeof(user)=="undefined")
				{
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
						
						
						businessObj.category=cat ;
						businessObj.subCategories=subCat;
						console.log("***************************mukul");
						console.log(cat);
						ejs.renderFile('./views/productDetails.ejs', businessObj,
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
			else
				{
				businessObj.category=user.category ;
				businessObj.subCategories=user.subCategories;
				ejs.renderFile('./views/productDetails.ejs', businessObj,
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
			
		}
	}, getQ);	
	
};

 exports.listProducts = function(req, res){
	 var subCategoryId = req.param("subCategoryId");
	 var categories = home.category;
	 //var subCategories = [];
	 var subCategories = home.subCategories;
 	var ShowProductQuery = "SELECT p.productId ,p.NAME AS productName ,p.description ,p.productType ,pt.NAME AS productTypeName ,p.subCategoryId ,sc.name as subname,p.itemCondition ,ic.NAME AS itemConditionName ,p.basePrice,p.sellerId ,CONCAT (u.firstName	,' '	,u.lastName) AS sellername ,p.IMAGE,p.quantity,p.isDeleted FROM product p INNER JOIN product_type pt ON p.productType = pt.typeId INNER JOIN item_condition ic ON p.itemCondition = ic.conditionId INNER JOIN user u ON p.sellerId = u.userId INNER JOIN sub_category sc ON p.subCategoryId = sc.subCategoryId WHERE sc.subCategoryId = "+ subCategoryId+ " AND p.isDeleted = 0;";


 	mysql.fetchData(function(err,rows){
 		if(!err)
 		{


 			ejs.renderFile('./views/showProducts.ejs', {rows: rows, category: categories,subCategories:subCategories }, function(err, result)
 			{
 				if(!err)
 				{
 					console.log("In Product.ejs *******");
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
 	},ShowProductQuery);

 };