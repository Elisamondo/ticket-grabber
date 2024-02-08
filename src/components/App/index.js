import React, { useState, useEffect } from 'react'
import './style.scss'
import zafClient from '../../zafClient'
import DateForm from '../DateForm'
import Footer from '../Footer'
import { TicketsTable } from '../ticketsTable'
import { Modal } from './DetailedViewModal/DetailedViewModal'
import { PageNav } from '../PageNav'

const App = () => {


  //INIT
  //length1 Key named so to differentiate from array property 'length'
  let [processedTickets, setProcessedTickets] = useState({
    next_page: null,
    end_of_stream: null,
    page1: null,
  })
  let [page, setPage] = useState(1)
  let [detailedViewData, setDetailedViewData] = useState()
  let [results, setResults] = useState(false)
  let [modal, setModal] = useState(false)
  let [length1, setLength1] = useState(0)
  const [dateInput, setDateInput] = useState(0)

  React.useEffect(async () => {
    zafClient.invoke('resize', { height: '75px' })
  }, [])

  useEffect(() => {
    if (processedTickets.page1){
      setLength1(Math.ceil(processedTickets.page1.length / 100))
    }
  }), [processedTickets.page1]

  //Calls and processes tickets from time requested by user
  async function retrieveTickets(request){
    console.log("ping")
    let ticketsObject
    if (!results){
      ticketsObject = await zafClient.request(
        `https://d3v-devappamondo.zendesk.com/api/v2/incremental/tickets?start_time=${request}`)
    }
    else{
      ticketsObject = await zafClient.request(request)
    }

    console.log(ticketsObject)
    const hold = () => setProcessedTickets(() => ({
      ...processedTickets,
      page1: ticketsObject.tickets,
      end_of_stream: ticketsObject.end_of_stream,
    }))
    hold()
    console.log(processedTickets)
    //get tickets

    console.log(`length at retrieve tickets start: ${length1}`)

    if(!processedTickets.end_of_stream){
      processedTickets.next_page=ticketsObject.next_page
    }


    console.log(`length after length set: ${length1}`)
    //Display Results Page + Nav
    if(!results){
      console.log(`results: ${results}`)
      setResults(!results)
    }
    console.log(`results: ${results}`)
  }

  //Detailed View modal controller
  function toggleModal(ticket){
    if (ticket){
      setModal(true)
      setDetailedViewData(ticket)
    }
    else{
      setModal(false)
    }
    console.log(`ticket: ${JSON.stringify(detailedViewData)}`)
  }



  return (
    <div className="App">
      <DateForm dateInput={dateInput} setDateInput={setDateInput} retrieveTickets={retrieveTickets} />
      {modal && <Modal ticket={detailedViewData} toggleModal={toggleModal}/>}
      {results && <PageNav retrieveTickets={retrieveTickets} page={page} setPage={setPage} processedTickets={processedTickets} length1={length1}/>}
      {results && <TicketsTable processedTickets={processedTickets.page1} page={page} toggleModal={toggleModal}/>}
      <Footer/>
    </div>
  )
}

export default App
