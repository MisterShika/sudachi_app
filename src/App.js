import React, { useEffect, useState } from 'react';
import Login from './Login';
import './App.css';

function App() {

   // const [isLoggedIn, setIsLoggedIn] = useState(false);
   // const token = localStorage.getItem('authToken');


    return (
        <div className="App">
        <h2>Login</h2>
        <Login />
        </div>
    );
}

export default App;