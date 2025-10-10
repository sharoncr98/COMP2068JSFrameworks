var express = require('express');
var router = express.Router();

//home page
router.get("/", (req, res) => {
  res.render("home", { title: "Home Page"})
});
//about page
router.get("/about", (req, res) => {
  res.render("about", { title: "About Page"})
});
//projects page
router.get("/projects", (req, res) => {
  res.render("projects", { title: "Projects Page"})
});
//contact page
router.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact Page"})
});




module.exports = router;