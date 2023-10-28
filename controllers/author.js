// import database connection
const Author = require('../models/author.model')


// show author articles
const getAuthorArticle = (req, res) => {
    Author.getName(req.params.id,(err, author, articles) => {
        if (err) {
            res.status(500).send({
                message :err.message || 'Big error go boom'
            })
        } else {
            console.log(author, articles)
            res.render('author', {
                articles: articles,
                author: author
            })
        }
    })
};

// export controller functions
module.exports = {
    getAuthorArticle
};