import React, { useState } from 'react'
import './Login.css';

/* creates a fetch request to server with login credentials */
async function handleLogin(username, password) {
    const url = "/checkLogin"
    const data = {username: username, password: password}
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)
    });
    return response.json()
}

/* create the login page component */
export default function Login({ setToken, setErrorMessage }) {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    
    /* checks if login is valid with a fetch request to the server */
    async function handleSubmit(e) {
        e.preventDefault()
        if(username.length > 0 && password.length > 0){
            const res = await handleLogin(username, password)
            if(res.error){
                setErrorMessage(res.error)
            }
            setToken(res.sessionToken)
        } else {
            setErrorMessage("Please enter a password and/or username!")
        }
    }

    /* returns the login page elements */
    return (
        <div className="loginWrapper">
            <h1 className='loginHeader'>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input className="loginInput" type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input className="loginInput" type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                    <button className='loginButtons' type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}