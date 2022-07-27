import React, { useState } from 'react'
import stockBoat from './img/stockBoat.png'
import "./BoatDetails.css"

/* creates fetch request to save updates of a existing boat */
async function saveBoat(sessionToken, boat){
    const url = "/editBoat"
      const data = {sessionToken: sessionToken, 
        id: boat.id, 
        name: boat.name, 
        description: boat.description
        }
      const response = await fetch(url, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify(data)
      });
      return response.json()
}

/* creates fetch request to add a new boat */
async function addBoat(sessionToken, boat){
    const url = "/addBoat"
      const data = {sessionToken: sessionToken, 
        id: boat.id, 
        name: boat.name, 
        description: boat.description
        }
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify(data)
      });
      return response.json()
}

/* shows the boat details and depending on the mode allows them to be edited */
export default function BoatDetails({boatDetails, setBoatDetails, token, setBoats, boats, setErrorMessage}) {
    const [boatName, setBoatName] = useState(boatDetails.boat.name)
    const [boatDesc, setBoatDesc] = useState(boatDetails.boat.description)

    /* handels the closure of the boat details by saying that no boat details should be shown */
    function handleXClick() {
        setBoatDetails(null)
    }
    
    /* depending on the mode (add or edit) the add or edit function gets called and the local memory changed */
    function handleSaveClick(e) {
        e.preventDefault()
        if(boatName.length > 0 && boatDesc.length > 0){
            const newBoatDetails = {
                id: boatDetails.boat.id,
                name: boatName,
                description: boatDesc
            }
            if(boatDetails.mode == "edit"){
                saveBoat(token, newBoatDetails).then((res) => {
                    if(res.error){
                        setErrorMessage(res.error)
                        return
                    }
                    /* update locally */
                    setBoatDetails()
                    boats[newBoatDetails.id - 1] = newBoatDetails
                    setBoats(boats)
                })
            } else {
                addBoat(token, newBoatDetails).then((res) => {
                    if(res.error){
                        setErrorMessage(res.error)
                        return
                    }
                    /* update locally */
                    setBoatDetails()
                    boats.push(newBoatDetails)
                    setBoats(boats)
                })
            }
        } else {
            setErrorMessage("Fields must not be empty!")
        }
    }
    
    /* returns the elements for the view mode */
    if(boatDetails.mode == "view"){
        return (
            <div className="boatDetailsDiv">
                  <button className="xButton" onClick={handleXClick}>X</button>
                  <img className='boatImg' src={stockBoat} alt="stock boat"></img>
                  <input readOnly type="text" className='boatNameInputRead' value={boatDetails.boat.name } onChange={e => setBoatName(e.target.value)} />
                  <input readOnly type="text" className='boatDescInputRead' value={boatDetails.boat.description} onChange={e => setBoatDesc(e.target.value)} />
              </div>
          )
    }
    /* returns the elements for the edit and add mode */
    return (
        <div className="boatDetailsDiv">
            <button className="xButton" onClick={handleXClick}>X</button>
            <img className='boatImg' src={stockBoat} alt="stock boat"></img>
            <form className="boatForm" onSubmit={handleSaveClick}>
                    <label>
                        <p className="boatFormP" >Boat Name</p>
                        <input type="text" className='boatNameInput' defaultValue={boatDetails.boat.name } onChange={e => setBoatName(e.target.value)} />
                    </label>
                    <label>
                        <p className="boatFormP" >Boat Description</p>
                        <input type="text" className='boatDescInput' defaultValue={boatDetails.boat.description} onChange={e => setBoatDesc(e.target.value)} />
                    </label>
                    <div>
                    <button type="submit" className="saveButton">save</button>
                    </div>
                </form>
        </div>
    )
}
