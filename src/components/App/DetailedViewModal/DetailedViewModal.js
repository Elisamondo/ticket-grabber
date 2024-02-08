import React from 'react'

const Modal = ({ticket, toggleModal}) => {

  const modalDivs= [
    ["Subject:", ticket.subject],["ID:",ticket.id],
    ["Tags:",ticket.tags],["Description:",ticket.description],
    ["Link:",ticket.url],["Status:",ticket.status],
    ["Created:",ticket.created_at],["Updated:",ticket.updated_at],
    ["Priority",ticket.priority],["Recipient:",ticket.recipient],
    ["Due At:", ticket.due_at]]

  for(let i = 0; i < modalDivs.length; i++){
    if(!modalDivs[i][1]){
      modalDivs[i][1]="N/A"
    }
  }

  console.log(modalDivs)
  return (
    <div>
      <button onClick={() => toggleModal()}>X</button>
      {modalDivs.map(modalDiv => (
        <div>
          <h3>{modalDiv[0]}</h3>
          <p>{modalDiv[1]}</p>
        </div>
      ))}
    </div>
  )
}

export {Modal}