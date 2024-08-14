var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/health', function(req, res, next) {
  res.status(200);
  res.json({ "message": 'Up',  "timestamp" : Date.now()});
});

module.exports = router;
