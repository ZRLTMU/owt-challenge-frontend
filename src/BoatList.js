import React, {useState} from 'react'
import Boat from "./Boat"
import BoatDetails from "./BoatDetails"

/* fetches boats array from server */
async function getBoatArr(sessionToken){
  const url = "/getBoats"
    const data = {sessionToken: sessionToken}
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)
    });
    return response.json()
}

/* wraps all boat components */
export default function BoatList({ handleAddBoat, token, setErrorMessage, addBoat, setToggle }) {
  const [boats, setBoats] = useState([])
  const [boatDetails, setBoatDetails] = useState()
  const newBoat = {mode: "add", boat: {name: "", id: boats.length + 1, description: ""}}

  /* filters out the deleted  boat and updates local memory */
  const deleteBoat = (index) => {
    setBoats((boats) => boats.filter(item => item != boats[index]));
  }

  /* updates local memory */
  const updateBoats = (newBoatArr) => {
    setBoats(newBoatArr)
    setToggle(true)
    handleAddBoat(false)
  }

  /* decides whether BoatDetails component should be shown */
  const viewBoatDetails = (detailsObj) => {
    if(detailsObj === null){
      setToggle(true)
      handleAddBoat(false)
    } else {
      setToggle(false)
    }
    setBoatDetails(detailsObj)
  }

  /* when boats array is empty --> fetches boats from server */
  if(boats.length < 1){
    getBoatArr(token).then((res) => {
      if(res.error){
        setErrorMessage(res.error)
        return
      }
      setBoats(res.data)
    })
  }

  /* starts BoatDetails component in addBoat mode */
  if(addBoat){
    setToggle(false)
    return <BoatDetails setBoatDetails={viewBoatDetails} boatDetails={newBoat} token={token} boats={boats} setBoats={updateBoats} setErrorMessage={setErrorMessage} />
  }

  /* starts BoatDetails component in view or edit mode */
  if(boatDetails){
    return <BoatDetails setBoatDetails={viewBoatDetails} boatDetails={boatDetails} token={token} boats={boats} setBoats={updateBoats} setErrorMessage={setErrorMessage} />
  }

  /* shows the normal boat list view */
  return (
    boats.map(boat => {
      return <Boat key={boat.id} boat={boat} token={token} deleteBoat={deleteBoat} boatDetails={viewBoatDetails} setErrorMessage={setErrorMessage} />
    })
  )
}
