const express = require("express");
const request = require("request");
const PORT = 3000;
const app = express();

app.listen(PORT);
app.use(express.static(`${__dirname}/public`));

app.use(express.static(__dirname + '/views'));

app.get("/", (req, res) => {
    return res.render("./views/index.html", { root: __dirname });
});

app.get("/submit", (req, res) => {
    let url = "https://" + req.query['url'];
    request(url, {json: false}, (err, response, body) => {
        if (err) {
            res.redirect("/down.html");
        }
        else {
            res.redirect("/up.html");
        }
    });
});

app.use((req, res) => {
    res.status(404).sendFile("./views/404.html", { root: __dirname });
});
