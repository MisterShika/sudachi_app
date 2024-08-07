import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [usernameExists, setUsernameExists] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    const handleInputChange = (event) => {
        setUsername(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        axios.get('http://localhost:5000/api/check-username', { params: { username } })
            .then(response => {
                setUsernameExists(response.data.exists);
            })
            .catch(error => {
                console.error('There was an error checking the username!', error);
            });
    };

    return (
        <div className="App">
            <h1>Users</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>

            <h2>Check if Username Exists</h2>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={handleInputChange}
                    placeholder="Enter username"
                />
                <button type="submit">Check</button>
            </form>

            {usernameExists !== null && (
                <p>{usernameExists ? 'Username exists!' : 'Username does not exist.'}</p>
            )}
        </div>
    );
}

export default App;
