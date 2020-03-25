var express = require("express");
var app = express();

var request = require("request");

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/results", function(req, res) {
   let query = req.query.search;
   var url = "http://openlibrary.org/api/books?bibkeys=ISBN:" + query + "&jscmd=data&format=json";
   // ISBN: 0201558025
    //   var url = "http://www.omdbapi.com/?apikey=thewdb&s=" + query; 
   console.log(url);
   request(url, function(error, response, dataStream) {
       if(!error && response.statusCode == 200) {
          var data = JSON.parse(dataStream);
          console.dir(data["ISBN:" + query]);
          res.render("results", {data: data["ISBN:"+query]});
       }
   });
   
});

app.get("*", function(req, res) {
    res.render("error");
});

app.listen(process.env.PORT || 3000, function() {
   console.log("server has been started"); 
});