const bcrypt = require('bcrypt');

const password = 'password456'; // Replace with the password you want to hash

bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
        console.error('Error hashing password:', err);
        return;
    }
    console.log('Hashed password:', hash);
});