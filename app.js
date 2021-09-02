const express = require("express");
const request = require("request");

const PORT = 3000;

const app = express();


// view engine
app.set("view engine", "ejs");

app.listen(PORT);

// use static files
app.use(express.static(`${__dirname}/public`));

// app.use(express.static(__dirname + '/views'));


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
    console.log(url);
    request(url, {json: false}, (err, response, body) => {
        if (err) {
            res.render("doesnotexist");
            return;
        }

        console.log(response.statusCode);
        res.render("status", { statusCode: response.statusCode, url: url });
    });

});

app.use((req, res) => {
    res.status(404).render("404");
});
