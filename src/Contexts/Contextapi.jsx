import React, { createContext, useState } from 'react'
export const addresponsCeontext =createContext()
export const editresponsecontext = createContext()

function Contextapi({children}) {
  const [addresponse,setaddresponse] = useState("")
  const [editResponse,setEditResponse] = useState("")
  return (
    <>
    <addresponsCeontext.Provider value={{addresponse,setaddresponse}}>
      <editresponsecontext.Provider value={{editResponse,setEditResponse}}>
        {children}
        </editresponsecontext.Provider>
      </addresponsCeontext.Provider>
    </>
  )
}

export default Contextapi