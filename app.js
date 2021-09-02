const express = require("express");
const request = require("request");

const PORT = 3000;

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

    request(url, {json: false}, (err, response, body) => {
        if (err) {
            res.render("doesnotexist");
            return;
        }

        if (response.statusCode === 200) {
            var message = `Good news, everyone! ${url} sent back a ${response.statusCode} status code`;
            var sub = "That means it works.";
        } else if (response.statusCode === 404) {
            var message = `Good news, everyone! ${url} sent back a ${response.statusCode} status code`;
            var sub = "That means the website is up, but the page you are looking for does not exist."
        } else if (response.statusCode === 500) {
            var message = `Good news, everyone! ${url} sent back a ${response.statusCode} status code`;
            var sub = "That means the server we sent a request to is having problems.";
        } else if (response.statusCode === 502) {
            var message = `Good news, everyone! ${url} sent back a ${response.statusCode} status code`;
            var sub = "That means you a bad request was sent to the server.";
        }

        res.render("status", { message: message, sub: sub });
    });

});

app.use((req, res) => {
    res.status(404).render("404");
});
