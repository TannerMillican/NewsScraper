var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app) {

    app.get("/", function(req, res) {

        axios.get("http://www.cbsnews.com/").then(function(response) {

            var $ = cheerio.load(response.data);

            $("article a").each(function(i, element) {

                var result = {};

                result.title = $(this)
                    .children("div")
                    .children("h4")
                    .text();
                result.link = $(this)
                    .attr("href");
                result.summary = $(this)
                    .children("div")
                    .children("p")
                    .text();

            db.Article.create(result)
                .then(function(dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    console.log(err);
                });
            });

        });
    });

    app.get("/articles", function(req, res) {
        
        db.Article.find({})
            .then(function(dbArticle) {
                res.json(dbArticle);
            })
            .catch(function(err) {
                res.json(err);
            });

    });

    app.get("/articles/:id", function(req, res) {

        var noteGetReq = req.params.id;

        db.Article.findOne({ _id: noteGetReq })
            .populate("note")
            .then(function(dbArticle) {
                res.json(dbArticle);
            })
            .catch(function(err) {
                res.json(err);
            });
    });

    app.post("/articles/:id", function(req, res) {
        db.Note.create(req.body)
            .then(function(dbNote) {
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
            })
            .then(function(dbArticle) {
                res.json(dbArticle);
            })
            .catch(function(err) {
                res.json(err);
            });
    });

    app.delete("/articles/notes/delete/:id", function(req, res) {

        console.log(req.params)

        db.Note.remove({_id: req.params.id})
            .then(function(res) {
                console.log(res)
            })
    })

    app.put("/articles/notes/update/:id", function(req, res) {
        console.log(req.params)
        console.log(req.body)

        db.Note.update({_id: req.params.id},{$set: {title: req.body.title, body: req.body.body}})
            .then(function(res) {
                console.log(res)
            })
    })

}