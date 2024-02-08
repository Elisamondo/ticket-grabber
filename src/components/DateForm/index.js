import React from 'react'

export const DateForm = ({dateInput, setDateInput, retrieveTickets}) => {

  function handleChange(e){
    const unixDate = Math.floor(new Date(e.target.value).getTime() / 1000)
    console.log(unixDate)
    setDateInput(unixDate)
  }

  return (
    <div>
      <h3 id="formTitle">Ticket Download Form</h3>
      <input onChange={(e) => handleChange(e)} id="dateForm" placeholder="Retrieve tickets updated since:" type="datetime-local" />
      <button onClick={() => retrieveTickets(dateInput)}>Grab those Tickets!</button>
      <img hidden id="loadingCircle" src="./spinner.gif" height="24px" width="24px" />
    </div>
  )
}

export default DateForm