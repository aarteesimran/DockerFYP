var template = require('../public/template.json');
var express = require('express');
var router = express.Router();
//var user = require('./user');
var ids = require('short-id');
const fs = require('fs');
var app = express();
//var ws = require("./routes/ws.js");
const path = require('path');
var pty = require("pty.js");
//const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
//const dbConnection = require('./database');
const { body, validationResult } = require('express-validator');
const session = require('express-session');
/* GET home page. */
ids.configure({
    length: 6, // The length of the id strings to generate
    algorithm: 'sha1', // The hashing algoritm to use in generating keys
    salt: Math.random // A salt value or function
});


var fPath = '/home/uk/files/';



function generateDocker(instance, name) {
    //console.log(template['']);
    //console.log("sjdjsdjhsj" + instance)
    var { spawn, exec } = require('child_process');
    const ls = spawn("docker", ['run', '-itd', '-v', fPath + ':/data', '--hostname', `${name}-${instance}`, '--name', name, instance, '/bin/bash']);
    ls.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
        //req.session.cntid = name;


        // res.send(name);
    });

}

function openproject(prjcode) {

    console.log("Baba ji ka dullooo " + prjcode)
    var { spawn, exec } = require('child_process');
    const ls = spawn("docker", ['exec', '-it', '-w', '/data', `${prjcode}`, '/bin/bash']);
    ls.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
        //req.session.cntid = name;
        // res.send(name);
    });
}

function createProject(instance, name) {

    var { spawn, exec } = require('child_process');

    console.log(`mkdir -p /home/uk/files/${name} && cd /home/uk/files/${name} && cp /home/uk/files/init/${template['template'][Number(instance)-1]}/* /home/uk/files/${name}`)

    // mkdir -p /home/uk/files/K53G7W41 && cd /home/uk/files/K53G7W41 && cp /home/uk/files/main.java .
    var exec = exec(`mkdir -p /home/uk/files/${name} && cd /home/uk/files/${name} && cp /home/uk/files/init/${template['template'][Number(instance)-1]}/* /home/uk/files/${name}`);
    fPath = `/home/uk/files/${name}`;

    //console.log(`exec : ${JSON.stringify(exec)}`);
}

router.get('/', function(req, res, next) {
    var title = 'Dockerized Cloud IDE';
    var message = '';
    res.render('login', {
        title: title,
        message: message
    });
});
router.get('/login', function(req, res, next) {
    var title = 'Dockerized Cloud IDE';
    var message = '';
    res.render('login', {
        title: title,
        message: message
    });
});



router.get('/process', async(req, res, next) => {
    var name = ids.generate();
    //console.log("User ID" + JSON.stringify(req.session.user.userid));
    var sql = "INSERT INTO usrprj (title, tempid, prjcode, userid, shared) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, ["", req.query.instance, name, req.session.user.userid, 0],
        function(err, rows, fields) { if (err) throw err; });

    var tempname = template['template'][Number(req.query.instance) - 1];
    req.session.instance = tempname;
    //console.log(`instance ${tempname}`);

    // console.log("abcd " + template[tempname].command);
    req.session.command = template[tempname].command;

    await createProject(req.query.instance, name);
    await generateDocker(template[req.session.instance].instance, name);
    req.session.cntid = name;

    //res.locals.command = req.session.command;
    res.redirect('/ide');
});

// router.get('/home', function(req, res, next) {

//     // await generateDocker();
//     // req.session.cntid = name;
//     res.render('home', { title: 'Dockerized Cloud IDE' });

// });
router.get('/home', function(req, res, next) {

    db.query('SELECT * from usrprj WHERE userid=? and shared = 0; SELECT * from usrprj WHERE userid=? and shared = 1', [req.session.user.userid, req.session.user.userid], function(err, results) {
        if (err) throw err;

        // `results` is an array with one element for every statement in the query:
        //console.log(results[0]); // [{1: 1}]
        //console.log(results[1]); // [{2: 2}]
        req.session.usrprj = results[0].prjcode;
        //console.log(req.session.usrprj)
        res.render('home', {
            title: 'Dockerized Cloud IDE',
            projects: results[0],
            shared: results[1],
            //filename: req.query.filename
        });

    });


    // await generateDocker();
    // req.session.cntid = name;
    // res.render('home', { title: 'Dockerized Cloud IDE' });

});
router.get('/openproject', async(req, res, next) => {

    //    console.log("UsrProj " + req.session.usrprj);
    // console.log("prj code: " + req.session.user.prjcode);
    db.query('SELECT * from usrprj WHERE userid=? and prjcode=?;', [req.session.user.userid, req.session.userprj],
        function(err, results) {
            if (err) throw err;
            // console.log("result usrprj  wali " + results);
            openproject(results);
            res.redirect('/ide');
        });
});
router.get('/ide', async(req, res, next) => {

    //console.log("saved session", req.session.instance);
    /// console.log("Command", req.session.command);
    // await generateDocker();
    // req.session.cntid = name;
    res.render('index', {
        filename: req.query.filename,
        dockerName: req.session.cntid
    });
});

// router.get('/Tab', function (req, res, next) {
//     res.render('Tab', { title: 'Tab Menu' });
// });



router.get('/saveAndRunFile', function(req, res, next) {

    var filePath = fPath + req.query.filename;
    console.log(filePath);
    // console.log("File Saved Successfully !!!");
    var savedData = req.query.fileData;
    console.log(savedData);
    fs.writeFile(filePath, savedData, 'utf8', function(err) {
        if (err) return console.log(err);
        console.log('File Saved Successfully !!!');
    });
    res.send(req.session.command);
});

router.get('/fileOpen', function(req, res, next) {
    filePath = fPath + req.query.filename;
    console.log(filePath);
    fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        res.send(data);
    });
    //res.send(data);
});

router.get('/explorer', async(req, res, next) => {
    var files = traverseDir(fPath + "/", []);
    //console.log(files);
    console.log(JSON.stringify(files, null, 2));
    //req.files=files;


    //req.session.filename = filename;
    res.send(files);
});




router.get('/saveFilePublic', function(req, res, next) {

    var filePath = fPath + req.query.filename;
    console.log(filePath);
    // console.log("File Saved Successfully !!!");
    var savedData = req.query.fileData;
    console.log(savedData);

    var sql = "INSERT INTO usrprj WHERE userid=" + req.session.user.userid + " and tempid=" + req.query.instance + " and prjcode=" + req.session.userprj + " ( shared ) VALUES (?)";
    db.query(sql, [1],
        function(err, rows, fields) {
            if (err) throw err;
        });
    console.log("Public hogaya");

    fs.writeFile(filePath, savedData, 'utf8', function(err) {
        if (err) return console.log(err);
        console.log('File Saved Successfully !!!');
    });
    res.send(savedData);
});


router.get('/saveFile', function(req, res, next) {

    var filePath = fPath + req.query.filename;
    console.log(filePath);
    // console.log("File Saved Successfully !!!");
    var savedData = req.query.fileData;
    console.log(savedData);
    fs.writeFile(filePath, savedData, 'utf8', function(err) {
        if (err) return console.log(err);
        console.log('File Saved Successfully !!!');
    });
    res.send(savedData);
});


function traverseDir(dir, files) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            var arr = [];
            files.push({ name: file, content: arr })
            traverseDir(fullPath, arr);
        } else {
            files.push({ name: file })
        }
    });
    return files;

}

module.exports = router;