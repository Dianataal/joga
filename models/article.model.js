//import database connection
const con = require('../utils/db');

//constructor
const Article = (article) => {
    this.name = article.name
    this.slug = article.slug
    this.image = article.image
    this.body = article.body
    this.published = article.published
    this.author_id = article.author_id
}

//get all articles
Article.getAll = (result) => {
    let query = "SELECT * FROM article";
    let articles = []
    con.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        articles = res
        console.log("articles: ", articles)
        result(null, articles);
    })

};

//get article by slug
Article.getBySlug = (slug, result) => {
    let query = `SELECT article.name as title, article.slug, article.image, article.body, article.published, author.name AS name
                 FROM article
                          LEFT JOIN author
                                    ON article.author_id = author.id
                 WHERE article.slug = "${slug}"`
    let article
    con.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found article: ", res[0]);
            result(null, res[0]);
        }
    })

}

Article.getByAuthor = (author, result) => {
    let query = `SELECT article.name as title, article.image, article.slug, author.name as name
                 FROM article
                          INNER JOIN author
                                     ON article.author_id=author.id
                 WHERE article.author_id = (SELECT id FROM author WHERE name = "${author}")`
    con.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found articles", res);
            result(null, res);
        }
    })

}

//get new article
Article.createNew = (newArticle, result) => {
    let query = `INSERT INTO article (name, slug, image, body, published, author_id) VALUES
        ("${newArticle.name}", "${newArticle.slug}", "${newArticle.image}", "${newArticle.body}", "${newArticle.published}", ${newArticle.author_id})`
    con.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created article: ",
            {id: res.insertId, ...newArticle});
        result(null, {id: res.insertId, ...newArticle});
    })
};

//show new article
Article.showArticle = (articleId, result) => {
    let articleQuery = `SELECT * FROM article WHERE id = "${articleId}"`
    let authorQuery = `SELECT * FROM author`
    let article
    let authors = []

    con.query(articleQuery, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }
        article = res
        console.log('article: ', article)

        con.query(authorQuery, (err, res) => {
            if (err) {
                console.log('error: ', err)
                result(err, null)
                return
            }
            authors = res
            console.log('authors: ', authors)
            result(null, article, authors)
        })
    })
}

Article.editArticle = (articleId, editedArticle, result) => {
    let query = `UPDATE article SET name = "${editedArticle.name}", slug = "${editedArticle.slug}", image = "${editedArticle.image}", body = "${editedArticle.body}", author_id = "${editedArticle.author_id}" WHERE id = ${articleId}`

    con.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }
        console.log('edited article: ', {id: res.insertId, ...editedArticle})
        result(null, {id: res.insertId, ...editedArticle})
    })
}

Article.deleteArticle = (articleId, result) => {
    let query = `DELETE FROM article WHERE id = "${articleId}"`

    con.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }
        console.log('deleted article: ', {id: res.insertId})
        result(null, {id: res.insertId})
    })
}


//export
module.exports = Article;