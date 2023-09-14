const express = require('express')
const router = express.Router()
const articleController = require('../controllers/author')

router.get('/author/:author_id', articleController.getAuthorById)

module.exports = router