import React, { useEffect, useState } from 'react'
import Header from '../Componants/Header'
import Profile from '../Componants/Profile'
import View from '../Componants/View'

function Dashbord() {
// state to hold username

const [displayName,setdisplayName] = useState("")



useEffect(()=>{
  if(sessionStorage.getItem("existinguser")){
    const {username} = JSON.parse(sessionStorage.getItem("existinguser"))
    setdisplayName(username)
  }
})

  return (
    <>
    <Header insideDashbard={true}/>
    <div style={{marginTop:'100px'}} className='container-fluid'>
<h2>Welcome <span className='text-warning'>{displayName}</span></h2>
<div className="row mt-3">
  <div className="col-lg-8">
    <View/>
    </div>
  <div className="col-lg-4">
    <Profile/>
  </div>
</div>



    </div>
    </>
  )
}

export default Dashbord