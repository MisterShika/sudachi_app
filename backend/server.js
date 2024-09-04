const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Import bcrypt

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // For parsing application/json

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Replace with your MySQL password
    database: 'sudachi_app'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL server.');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, result) => {
      if (err) return res.status(500).send('Server error');
      if (result.length === 0) {
        return res.status(401).json({ message: 'Account doesn\'t exist or incorrect password. Please try again.' });
      }
  
        const user = result[0];
        const validPassword = await bcrypt.compare(password, user.password);
  
        if (!validPassword) {
          return res.status(401).json({ message: 'Account doesn\'t exist or incorrect password. Please try again.' });
        }
        
        const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });
        res.json({ token });
    });
  });

//   // JWT authentication middleware
// const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (!token) return res.status(403).send('Token required');
  
//     jwt.verify(token, 'your-secret-key', (err, user) => {
//       if (err) return res.status(403).send('Invalid token');
//       req.user = user;
//       next();
//     });
//   };
  
//   // Protected route example
//   app.get('/protected', authenticateToken, (req, res) => {
//     res.send('This is a protected route');
//   });


  

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
