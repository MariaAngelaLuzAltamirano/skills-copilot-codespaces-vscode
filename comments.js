// Create web server application
const express = require('express');
const path = require('path');
const app = express();

// Use the body-parser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Use the express.static middleware
app.use(express.static('public'));

// Use the express.json middleware
app.use(express.json());

// Use the express.urlencoded middleware
app.use(express.urlencoded({ extended: true }));

// Connect to the database
const db = require('./db');

// Read all comments
app.get('/comments', (req, res) => {
    db.query('SELECT * FROM comments', (err, rows) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.json(rows);
    });
});

// Read a comment
app.get('/comments/:id', (req, res) => {
    db.query('SELECT * FROM comments WHERE id=?', [req.params.id], (err, rows) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.json(rows);
    });
});

// Create a comment
app.post('/comments', (req, res) => {
    db.query('INSERT INTO comments (name, comment) VALUES (?, ?)', [req.body.name, req.body.comment], (err, result) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.json({ id: result.insertId });
    });
});

// Update a comment
app.put('/comments/:id', (req, res) => {
    db.query('UPDATE comments SET name=?, comment=? WHERE id=?', [req.body.name, req.body.comment, req.params.id], (err, result) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.sendStatus(200);
    });
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
    db.query('DELETE FROM comments WHERE id=?', [req.params.id], (err, result) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.sendStatus(200);
    });
});

// Start web server
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});