const con = require('../utils/db');


const getAllArticles = (req, res) =>  {
    let query = "SELECT * FROM article";
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result
        res.render('index', {
            articles: articles
        })
    })
};


const getArticleBySlug = (req, res) => {
    let query = `SELECT *,
    				au.name as author,
					au.id as author_id
					FROM article a,
					     author au
					WHERE slug="${req.params.slug}"
					    and a.author_id = au.id`
    let article
    con.query(query, (err, result) => {
        if (err) throw err;
        article = result
        res.render('article', {
            article: article
        })
    });
};


module.exports = {
    getAllArticles,
    getArticleBySlug
};