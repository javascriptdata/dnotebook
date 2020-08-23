var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Danfo Notebooks | Interactive Notebook Interface for JavaScript Developers' });
});

/* GET home page. */
router.get('/getting-started', function(req, res, next) {
  res.render('getting-started', { title: 'Getting Started with Danfo Notebooks | Interactive Notebook Interface for JavaScript Developers' });
});

/* GET home page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Danfo Notebooks | Interactive Notebook Interface for JavaScript Developers' });
});
module.exports = router;
