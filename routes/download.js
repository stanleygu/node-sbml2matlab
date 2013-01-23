///*
// * GET sbml2matlab translation
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

exports.downloadM = function (req, res) {
    var fs = require('fs');
    var path = require('path');

    var file = './sbml2matlab/install/output.m';

    var filename = path.basename(file);

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', 'application/octet-stream');

    var filestream = fs.createReadStream(file);
    filestream.pipe(res);
    
};
