///*
// * GET uploads file
// */
//var spawn = require('child_process').spawn,
//    //sbml2matlab = spawn('pwd', ['-lh', '/usr']);
//    sbml2matlab = spawn('pwd'),
//    translation = 'no translation available';
//exports.translate = function (req, res) {
//    sbml2matlab.stdout.on('data', function (data) {
//        translation = 'stdout: ' + data;
//    });
//    sbml2matlab.stderr.on('data', function (data) {
//        translation = 'stderr: ' + data;
//    });
//    sbml2matlab.on('exit', function (code) {
//        translation = 'child process exited with code ' + code;
//    });
//    res.send(translation);
//};

exports.uploadSbml = function (req, res) {
    var fs = require('fs'),
        util = require('util');
    fs.readFile(req.files.file.path, 'utf8', function(err, data) {
      if (err) throw err;
      res.send(data);
      res.end();
    });

};
