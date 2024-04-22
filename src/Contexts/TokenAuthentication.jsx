import React, { createContext, useEffect, useState } from 'react'
export const tokenAuthenticationConfig = createContext()

function TokenAuthentication({children}) {
const [isAuthorisation,setIsAuthorisation] = useState(false)

useEffect(()=>{
if(sessionStorage.getItem("token")){
    setIsAuthorisation(true)
}else{
    setIsAuthorisation(false)
}
},[isAuthorisation])
  return (
    <>
<tokenAuthenticationConfig.Provider value={{isAuthorisation,setIsAuthorisation}}>
    {children}
    </tokenAuthenticationConfig.Provider>
    </>
  )
}

export default TokenAuthentication