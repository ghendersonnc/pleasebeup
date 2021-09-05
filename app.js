const express = require("express");
const { head } = require("request");
const request = require("request");

const PORT = process.env.PORT || 5000;

const app = express();

// view engine
app.set("view engine", "ejs");

app.listen(PORT);

// use static files
app.use(express.static(`${__dirname}/public`));

app.get("/", (req, res) => {
    return res.render("index");
});

app.get("/submit", (req, res) => {

    if (!req.query['url'].includes("http")) {
        var url = "https://" + req.query['url'];
    }
    else {
        var url = req.query['url'];

    }

    // Handle request to final url
    request(url, {json: false, timeout: 8000}, (err, response, body) => {

        if (err) {
            var message = `Good news, everyone! There was no response or the request timed out.`;
            var sub = "That means the website probably does not exist, the webserver is down, or the endpoint is blocking the app or app host";
        } else {
            if (response.statusCode === 200) {
                var message = `Good news, everyone! ${url} sent back a ${response.statusCode} status code`;
                var sub = "That means it works and that it is just you with the problem.";
            } else if (response.statusCode === 403) {
                var message = `Good news, everyone! ${url} sent back a ${response.statusCode} status code`;
                var sub = "That means the website is up and working, but the request sent by us was rejected.";
            } else if (response.statusCode === 404) {
                var message = `Good news, everyone! ${url} sent back a ${response.statusCode} status code`;
                var sub = "That means the website is up, but the page you are looking for does not exist."
            } else if (response.statusCode === 500) {
                var message = `Good news, everyone! ${url} sent back a ${response.statusCode} status code`;
                var sub = "That means the server we sent a request to is having problems.";
            } else if (response.statusCode === 502) {
                var message = `Good news, everyone! ${url} sent back a ${response.statusCode} status code`;
                var sub = "That means a bad request was sent to the server.";
            }
        }

        res.render("status", { message: message, sub: sub });
    });

});

app.use((req, res) => {
    res.status(404).render("404");
});
