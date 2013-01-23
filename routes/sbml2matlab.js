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

exports.saveSbml = function (req, res) {
    var fs = require('fs');

            console.log(util.inspect(req));
    
};

exports.translate = function (req, res) {
    var exec = require('child_process').exec,
        child,
        querystring = require('querystring'),
        url = require('url'),
        fs = require('fs'),
        util = require('util'),
        sbml; // request processing
    var command = "cd sbml2matlab/install/ && ./sbml2matlab -input tmp.sbml";
    var options = {
        //cwd: 'server/sbml2matlab/install/',
        timeout: 10
    };

    console.log(req);

    fs.writeFile("./sbml2matlab/install/tmp.sbml", req.body.sbml, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("The file was saved!");
        }
    });
    //exports.saveSbml(req, res);
    console.log(command);

    

//    child = exec(command, options, function (error, stdout, stderr) {

    child = exec(command, function (error, stdout, stderr) {

        //child = exec('pwd', function (error, stdout, stderr) {
        res.send(stdout + stderr);
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        fs.unlink('./sbml2matlab/install/tmp.sbml', function (err){
            if (err) throw err;
        })

    });
};