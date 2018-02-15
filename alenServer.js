const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const path = require("path");
const public = __dirname + "/public/";

const app = express();

app.get('/getJobsExample', function(req, res) {
    res.sendFile(path.join(public + "jobs.json"));
});

app.get('/getQuestionsExample', function(req, res) {
    let { jobId } = req.query;
    console.log("Job id: ", jobId)
    res.sendFile(path.join(public + `question_${jobId}.json`));
});

app.use('/getJobsExample', express.static(public));
app.use('/getQuestionsExample', express.static(public));

const server = http.createServer(app);

server.listen(4000, function listening() {
    console.log('Listening on %d', server.address().port);
})
