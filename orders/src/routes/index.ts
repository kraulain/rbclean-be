import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/health', function(req, res, next) {
  res.status(418).send({message: "I am a tea pot"})
});

export default router
