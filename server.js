var express = require("express");
var mongoose = require("mongoose");
var path = require("path");

var PORT = 3000;

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.set("views", path.join(__dirname, "public"));
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);

require("./routes/articlesRoutes")(app);
require("./routes/htmlRoutes")(app);


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});