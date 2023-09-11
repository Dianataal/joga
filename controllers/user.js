
const con = require('../utils/db');


const login = (req, res) =>  {
    let username = req.body.username
    let password = req.body.password
    let query = "SELECT * FROM user where username = ? and password = ?";
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
    				article.name as article_name,
					author.name as author_name
					FROM article
					INNER JOIN author
					ON author.id = article.author_id WHERE slug="${req.params.slug}"`
    let article
    con.query(query, (err, result) => {
        if (err) throw err;
        article = result
        console.log(article)
        res.render('article', {
            article: article
        })
    });
};


module.exports = {
    login,
    getArticleBySlug
};