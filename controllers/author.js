const con = require('../utils/db');


const getAuthorArticles = (req, res) =>  {
    console.log(req.params)
    let query = `SELECT * FROM article WHERE author_id="${req.params.id}"`
    let articles
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result
        console.log(articles)
        query = `SELECT * FROM author WHERE id="${req.params.id}"`
        let author
        con.query(query, (err, result) => {
            if (err) throw err;
            author = result
            console.log(author)
            res.render('author', {
                author: author,
                articles: articles
            })
        })
    })
};


module.exports = {getAuthorArticles};