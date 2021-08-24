const express = require("express");

const PORT = 3000;
const app = express();

app.listen(PORT);

app.use(express.static(__dirname + '/public'));
app.get("/", (req, res) => {
    res.sendFile("./views/index.html", { root: __dirname });
    console.log(PORT);
});


app.use((req, res) => {
    res.status(404).sendFile("./views/404.html", { root: __dirname });
});
