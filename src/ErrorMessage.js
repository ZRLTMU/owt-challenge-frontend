import React from 'react'
import "./ErrorMessage.css"

/* displays the error message */
export default function ErrorMessage({errorMessage, clearError}) {

    /* clears the error message when requested */
    function handleErrorButtonClick(e) {
        clearError()
    }

    /* when the errorMessage component returns the error message elements */
    if(errorMessage){
        return (
            <div className='errorDiv'>
                <p className="errorMessage">{errorMessage}</p>
                <button className="errorButton" onClick={handleErrorButtonClick} >X</button>
            </div>
          )
    }
}
