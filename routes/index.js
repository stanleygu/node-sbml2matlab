
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'sbml2matlab' });
};

exports.about = function(req, res){
  res.render('about', { title: 'sbml2matlab' });
};