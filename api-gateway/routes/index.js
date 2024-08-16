var express = require('express');
var router = express.Router();

/* 
GET home page. 
*/
router.get('/health', function(req, res, next) {
  res.status(200);
  res.json({ "message": 'Up',  "timestamp" : Date.now()});
});


module.exports = router;
