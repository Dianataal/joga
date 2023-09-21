//application packages
const express = require('express');
const app = express();
const path = require('path');

//add template engine
const hbs = require('express-handlebars');

//setup template engine directory and files extensions
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname:'hbs',
    defaultLayout:'main',
    layoutsDir:__dirname+'/views/layouts'
}))

app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

//import article routers
const articleRoutes = require('./routes/article');

//use article routes
app.use('/', articleRoutes);
app.use('/article', articleRoutes);

const con = require('./utils/db');
con.connect(function(err){
    if(err) throw err;
    console.log('connected to joga_mysql db');
});

// Show author's articles by author_id
app.get('/author/:author_id', (req, res) => {
    const authorId = req.params.author_id;

    // Päring autori nime saamiseks
    const authorQuery = `SELECT name FROM author WHERE id = ${authorId}`;

    con.query(authorQuery, (err, authorResult) => {
        if (err) throw err;

        // Päring autori artiklite saamiseks
        const articlesQuery = `SELECT * FROM article WHERE author_id = ${authorId}`;

        con.query(articlesQuery, (err, articlesResult) => {
            if (err) throw err;

            const authorName = authorResult[0].name;
            const authorArticles = articlesResult;

            // Render 'author' template with author's name and articles
            res.render('author', { authorName, authorArticles });
        });
    });
});
app.listen(3000,() => {
    console.log('app is started at localhost')
});