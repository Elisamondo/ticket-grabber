import React from 'react'

export const PageNav = ({page, setPage, processedTickets, length1}) => {

  function selectPage(){
    let pages = []
    for(let i = 1; i <= length1; i++){
      pages.push(
        <a onClick={() => setPage(i)}>{i}</a>)
    }
    return (
      pages
    )
  }

  function previousPage(){
    if (page != 1){
      setPage(page-1)
    }
  }

  function nextPage(){
    if (page < length1){
      setPage(page+1)
    }
    else{
      console.warn("next Page exception")
      console.log(`page: ${page} length: ${length1} end of stream: ${processedTickets.end_of_stream}`)
    }
  }

  return (
    <div>
      <button onClick={() => previousPage()}>previous page</button>
      {
        selectPage()
      }
      <button onClick={() => nextPage()}>next page</button>
    </div>
  )
}