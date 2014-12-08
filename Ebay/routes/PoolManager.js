var ejs= require('ejs');
var mysql = require('mysql');
var p = new PoolManager(10);
function getConnection(){
	
	var connection = mysql.createConnection({
	    host     : 'localhost',
	    user     : 'root',
	    password : 'Welcome1',
	    port : 3306,
	    database : 'ebay',

	});
	
	
	return connection;
}

function PoolManager(num_conns)
{
    this.availablePool = [];
    for(var j=0; j < num_conns; ++j)
        this.availablePool.push(getConnection()); // new client
    this.last = 0;
}

PoolManager.prototype.get = function ()
{
    var client = this.availablePool[this.last];
    console.log("Got connection! :" +client);
    this.last++;
    if (this.last == this.availablePool.length) // increment
       this.last = 0;
    return client;
}


function fetchData(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	var localConnection = p.get();
	//var connection=getConnection();
	
	 
	p.get().query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			callback(err, rows);
		}
	});
}

function saveData(callback, sqlQuery) {

	console.log("\nSQL Query::" + sqlQuery);

	

	p.get().query(sqlQuery, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
		} else { // return err or result
			callback(err, results);
		}
	});
	console.log("\nConnection closed..");
	
}

function insertData(callBack, data, table) {
	console.log("Inside insert data")
	//var connection = getConnection();
	p.get().query('INSERT INTO ' + table + ' SET ?', data, function(err,rows, fields) {
		// Neat!
		if (err) {
			console.log("ERROR: " + err.message);
		} else { // return err or result
			callBack(err, rows);
		}
	});
	console.log("\nConnection closed..");
	//connection.end();
}


exports.fetchData=fetchData;
exports.insertData=insertData;
exports.saveData=saveData;
exports.getConnection=getConnection;