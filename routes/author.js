const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author');

//use controller function according to the route
router.get('/:author_id', authorController.getAuthorArticle);

//export article router for using in default application file
module.exports = router;