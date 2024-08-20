import React, { useEffect, useState } from 'react';
import Login from './Login';
import './App.css';
import ClearToken from './ClearToken';

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const token = localStorage.getItem('authToken');


    return (
        <div className="App">
        <h2>Login</h2>
        <Login />
        <ClearToken />
        </div>
    );
}

export default App;