import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function App() {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    const handleUserChange = (event) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        axios.get('http://localhost:5000/api/check-username', { params: { username, password } })
            .then(response => {
                setLoginStatus(response.data.exists ? 'Login successful!' : 'Invalid username or password.');
            })
            .catch(error => {
                console.error('There was an error checking the username and password!', error);
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

            <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={handleUserChange}
                    placeholder="Enter username"
                />
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter password"
                />
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register an account</Link>
            </p>
            {loginStatus && (
                <p>{loginStatus}</p>
            )}
        </div>
    );
}

export default App;
