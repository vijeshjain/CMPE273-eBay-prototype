var redis = require('redis');
var client = redis.createClient(6379, 'localhost');
var Constants = require('./constants');


var RedisCache = function () {};

RedisCache.cachedSqlQueries	= [Constants.SELECT_CATEGORY_QUERY];

client.on("error", function (err) {
    console.log("Error connecting REDIS Cache Server " + err);
});


RedisCache.getCachedSqlQueries = function() {
	return RedisCache.cachedSqlQueries;
};


/**
 * Caching Categories and SubCategories into REDIS database
 */
RedisCache.cacheCategories = function(categories) {
	console.log("Caching Categories & Subcategories");
	client.set(Constants.SELECT_CATEGORY_QUERY, JSON.stringify(categories));
};


/**
 * Getting Categories and SubCategories from REDIS database
 */
RedisCache.getCachedCategories = function(callback) {
	console.log("Getting Caching Categories");
	RedisCache.getCachedDetails(Constants.SELECT_CATEGORY_QUERY, callback);
};


/**
 * To fetch cached details mapped by provided key
 */
RedisCache.getCachedDetails = function(key, callback) {
	console.log("Fetching cached details for --> " + key);
	client.get(key, function (err, reply){
		callback(err, JSON.parse(reply));
	});
};

module.exports = RedisCache;