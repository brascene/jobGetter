const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');

const app = express();

app.use(function(req, res) {
    res.send({
        msg: 'Web socket example'
    });
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws, req) {
    const location = url.parse(req.url, true);
    ws.on('message', function incoming(message) {
        console.log('received %s', message);
    });

    ws.send('Hello');
    
    for (let i = 0; i < 10; i += 1) {
        setTimeout(function() {
            ws.send(`You are receiving messages through web socket, num. ${i}`);        
        }, i * 2000)
    }
});

wss.on('open', function open() {
    console.log('Connected');
    ws.send(Date.now());
});

wss.on('message', function incoming(data) {
    console.log(`Roundtrip time: ${Date.now() - data} ms`);
    setTimeout(function timeout() {
        ws.send(Date.now());
    }, 1000);
});

server.listen(4000, function listening() {
    console.log('Listening on %d', server.address().port);
})
