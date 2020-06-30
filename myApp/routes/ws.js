var express = require('express');
var router = express.Router();

var pty = require("pty.js");

router.ws("/", function(ws, req) {

    // console.log(ws);
    // console.log("socket from client")
    // ws.on('message', function (msg) {
    // 	ws.send('back from node');
    // });
    // var filename = req.session.filename;
    //console.log(filename);
    console.log('cndid : ' + JSON.stringify(req.session.cntid.substr(0, 4)));

    var shell = pty.spawn('docker', ['exec', '-it', '-w', '/data', req.session.cntid, '/bin/bash'], {
        name: 'xterm-color',

        cwd: process.env.PWD,
        env: process.env
    });
    //For all shell data send it to the websocket
    shell.on('data', function(data) {
        ws.send(data);
    });
    // For all websocket data send it to the shell
    ws.on('message', function(msg) {
        shell.write(msg);
    });






    // // console.log('cndid : ' + JSON.stringify(req.session.cntid.substr(0, 4)));



    // var shell = pty.spawn(['/bin/bash'], {
    //     name: 'xterm-color',

    //     cwd: process.env.PWD,
    //     env: process.env
    // });
    // // For all shell data send it to the websocket
    // shell.on('data', function(data) {
    //     ws.send(data);
    // });
    // // For all websocket data send it to the shell
    // ws.on('message', function(msg) {
    //     shell.write(msg);
    // });



});

module.exports = router;