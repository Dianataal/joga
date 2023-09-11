const express = require('express')
const app = express()

const path = require('path')
const hbs = require('express-handlebars');
app.set('views', path.join(_dirname, 'views'));
app.set('view-engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname+ '/views/layouts/',
}))

const mysql = require('mysql')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))


let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "mysql"
})

con.connect(function(err) {
    if (err) throw (err);
    console.log("Connected to mysql db");
})

app.listen(3000, () => {
    console.log('App is started at localhost:3000');
})