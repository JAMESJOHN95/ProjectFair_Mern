import React, { useContext } from 'react'
import { Navbar,Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthenticationConfig } from '../Contexts/TokenAuthentication'



function Header({insideDashbard}) {
  const {isAuthorisation,setIsAuthorisation} = useContext(tokenAuthenticationConfig)

const navigate = useNavigate()
  const handlelogout =()=>{
    sessionStorage.clear()
    setIsAuthorisation(false)
    navigate('/')
  }


  return (
    <>
    <Navbar style={{zIndex:'10'}} className="bg-body-tertiary d-flex position-fixed top-0 w-100">
        <Container>
          <Navbar.Brand >
            <Link to={'/'} style={{textDecoration:'none'}}><i className="fa-solid fa-hands-holding-child me-2"></i>Project Fair</Link>
          </Navbar.Brand>
         {insideDashbard && <div className="ms-auto">
            <button onClick={handlelogout} style={{textDecoration:'none'}} className='btn btn-link'> Log Out <i class="fa-solid fa-right-from-bracket"></i></button>
          </div>}
        </Container>
      </Navbar>
    </>
  )
}

export default Header