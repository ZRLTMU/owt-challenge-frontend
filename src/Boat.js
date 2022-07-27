import React from 'react'
import stockBoat from './img/stockBoat.png'
import "./Boat.css"

/* creates each individual boat entry in BoatList */
export default function Boat({ boat, token, deleteBoat, boatDetails, setErrorMessage }) {

    /* handles the deletion event and creates fetch request to delete the specified ressource */
    async function handleDeleteClick() {
        const url = "/deleteBoat"
        const data = {sessionToken: token, id: boat.id}
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(data)
        });
        response.json().then((res) => {
            if(res.err){
                setErrorMessage(res.err)
                return
            }
            /* deletes the specified boat locally */
            deleteBoat(boat.id - 1)
        })
    }

    /* starts the boatDetails component in edit mode */
    function handleEditClick() {
        boatDetails({mode: "edit", boat: boat})
    }

    /* starts the boatDetails component in view mode */
    function handleImgClick() {
        boatDetails({mode: "view", boat: boat})
    }
    /* returns the boat element */
    return (
        <div className="boatDiv">
            <img className='boatImg' src={stockBoat} alt="stock boat" onClick={handleImgClick}></img>
            <button className="editButton" onClick={handleEditClick}>edit</button>
            <p className='boatName'>{boat.name}</p>
            <button className="deleteButton" onClick={handleDeleteClick}>delete</button>
        </div>
    )
}
