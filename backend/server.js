const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Import bcrypt

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // For parsing application/json

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Replace with your MySQL password
    database: 'sudachi_app'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL server.');
});

// Define an endpoint to fetch data
app.get('/api/users', (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

app.get('/api/check-username', (req, res) => {
    const { username, password } = req.query;
    connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (results.length > 0) {
                const user = results[0];
                bcrypt.compare(password, user.password, (err, match) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.json({ exists: match });
                    }
                });
            } else {
                res.json({ exists: false });
            }
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
