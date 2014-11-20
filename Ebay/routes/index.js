
/*
 * GET home page.
 */

var first,last,pwd,email,zp;


exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};