const friends = require("../data/friends.js");
const path = require("path");



module.exports = function(app) {
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../data/public/home.html"));
      });

    app.get("/survey", function(req, res) {
      res.sendFile(path.join(__dirname, "../data/public/survey.html"));
    });

    // If no matching route is found default to home
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "../data/public/home.html"));
    });
  };
  