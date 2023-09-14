// Import the database connection
const con = require('../utils/db');

// Constructor for Author
const Author = (author) => {
    this.name = author.name;
    // Add other properties as needed
};

// Function to get all authors
Author.getAll = (result) => {
    let query = "SELECT * FROM author";
    let authors = [];
    con.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        authors = res;
        console.log("authors: ", authors);
        result(null, authors);
    });
};

// Function to get author by ID
Author.getById = (authorId, result) => {
    let query = `SELECT * FROM author WHERE id = ${authorId}`;
    con.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found author: ", res[0]);
            result(null, res[0]);
        }
    });
};

module.exports = Author;