const Author = require('../models/author.model.js');

// Function to get all authors and render the author list page
const getAllAuthors = (req, res) => {
    Author.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred retrieving authors data'
            });
        } else {
            console.log(data);
            res.render('authors', {
                authors: data
            });
        }
    });
};

// Function to get author by ID and render the author details page
const getAuthorById = (req, res) => {
    Author.getById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred retrieving author data'
            });
        } else {
            console.log(data);
            res.render('author', {
                author: data
            });
        }
    });
};

module.exports = {
    getAllAuthors,
    getAuthorById
};
