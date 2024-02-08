import React from 'react'

export const TicketsTable = ({processedTickets, page, toggleModal}) => {
  processedTickets = processedTickets.slice(((page-1)*100), (page*100))

  return (
    <table id="ticketTable">
      <tr>
        <th>id</th>
        <th>title</th>
        <th>status</th>
        <th>creation time</th>
        <th>last updated</th>
        <th>view</th>
      </tr>
      {processedTickets.map(ticket => (
        <tr>
          <td>{ticket.id}</td>
          <td>{ticket.subject}</td>
          <td>{ticket.status}</td>
          <td>{ticket.created_at}</td>
          <td>{ticket.updated_at}</td>
          <button id="lookatme" onClick={() => toggleModal(ticket)}>view</button>
        </tr>
      ))}
    </table>
  )
}
