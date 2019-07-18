var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connecting Mongo database to Mongoose
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI,{ useNewUrlParser: true, useCreateIndex: true });

// Routes
// A GET route
app.get("/scrape", function(req, res) {

    // Scraping data from bon appetit and putting it in to 'results'
    let results = axios.get("https://www.bonappetit.com/recipes").then(function (response) {
      var $ = cheerio.load(response.data);
      var results = [];
      $("li").each(function (i, element) {
        var title = $(element).find("h1").text();
        var description = $(element).find("p").text();
        var link = "https://www.bonappetit.com/" + $(this).find("a").attr("href");
        var image = $(this).find("img").attr("srcset");
        if (title != "") {
          results.push({
            title: title,
            description: description,
            link: link,
            image: image
          });
        }
      });

        // Create a new Article using the `results` object built from scraping
        db.Article.create(results)
          .then(function(dbArticle) {
            // View the added result in the console
            res.send(dbArticle);
          }).then(function(dbArticle) {
            return true;
          })
          .catch(function(err) {
            console.log(err);
            return false;
          });
      });
  
      // Send a message to the client
     // res.send(results);
    });


  

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {

  db.Article.find({})
  .then(function(dbArticle) {
    // If we were able to successfully find Articles, send them back to the client
    res.json(dbArticle);
  })
  .catch(function(err) {
    // If an error occurred, send it to the client
    res.json(err);
  });
});

// Route for getting all Articles from the db
app.get("/articles/saved", function(req, res) {

  db.Article.find({saved:true})
  .then(function(dbArticle) {
    // If we were able to successfully find Articles, send them back to the client
    res.json(dbArticle);
    // console.log(dbArticle);
  })
  .catch(function(err) {
    // If an error occurred, send it to the client
    res.json(err);
  });
});

// Route for getting all Articles from the db
app.get("/articles/clear", function(req, res) {

  db.Article.deleteMany({})
  .then(function(dbArticle) {
    // If we were able to successfully find Articles, send them back to the client
    res.json(dbArticle);
    // console.log(dbArticle);
  })
  .catch(function(err) {
    // If an error occurred, send it to the client
    res.json(err);
  });
});


// Route for saving a recipe
app.get("/articles/:id", function(req, res) {

  db.Article.update({_id:req.params.id},{$set: {saved:true}})
  .then(function(dbArticle) {
    // If we were able to successfully find Articles, send them back to the client
    res.json(dbArticle);
    // console.log(dbArticle);
  })
  .catch(function(err) {
    // If an error occurred, send it to the client
    res.json(err);
  });
});

// Route for saving a recipe
app.get("/articles/unsave/:id", function(req, res) {

  db.Article.update({_id:req.params.id},{$set: {saved:false}})
  .then(function(dbArticle) {
    // If we were able to successfully find Articles, send them back to the client
    res.json(dbArticle);
    // console.log(dbArticle);
  })
  .catch(function(err) {
    // If an error occurred, send it to the client
    res.json(err);
  });
});


// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function(req, res) {
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on localhost:" + PORT);
});
