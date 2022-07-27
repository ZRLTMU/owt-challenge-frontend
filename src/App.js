import React, { useState } from 'react';
import Login from "./Login"
import BoatList from "./BoatList"
import AddBoatButton from './AddBoatButton';
import ErrorMessage from "./ErrorMessage"
import './App.css';

function App() {
  const [token, setToken] = useState(getToken())
  const [errorMessage, setErrorMessage] = useState()
  const [addBoat, setAddBoat] = useState()
  const [toggle, setToggle] = useState(true)

  /* gets the stored token from local storage */
  function getToken() {
    const tokenString = localStorage.getItem('token');
    return tokenString
  }
  
  /* saves the token into local storage */
  const saveToken = (userToken) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  /* sets a new error message with useState() */
  const createNewError = (errorMessage) => {
    setErrorMessage(errorMessage)
  }

  /* sets an empty error message, causing it to disappear with useState() */
  const clearError = () => {
    setErrorMessage()
  }

  /* changes the addBoat value depending on whether the addBoat component is needed or not */
  const handleAddBoat = (value) => {
      setAddBoat(value)
  }

  /* sets the toggle whether AddBoatButton should be shown */
  const handleToggle = (value) => {
    setToggle(value)
  }

  /* if there is no token yet --> shows the login */
  if(!token) {
    return (
      <>
        <ErrorMessage errorMessage={errorMessage} clearError={clearError} />
        <Login setToken={saveToken} setErrorMessage={createNewError} />
      </>
    )
  }

  /* when there is a token --> normal page will be shown */
  return (
    <>
      <ErrorMessage errorMessage={errorMessage} clearError={clearError} />
      <BoatList handleAddBoat={handleAddBoat} token={token} setErrorMessage={createNewError} addBoat={addBoat} setToggle = {handleToggle} />
      <AddBoatButton handleAddBoat={handleAddBoat} toggle={toggle} />
    </>
  )
}

export default App;
