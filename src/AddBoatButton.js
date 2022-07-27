import React from 'react'
import "./AddBoatButton.css"

/* creates the AddBoatButton */
export default function AddBoatButton({handleAddBoat, toggle}) {

    function handleAddBoatClick() {
        handleAddBoat(true)
    }
    /* checks if AddBoatButton is needed */
    if(toggle){
        return (
            <button className="addBoatButton" onClick={handleAddBoatClick}>+</button>
        )
    }
}
