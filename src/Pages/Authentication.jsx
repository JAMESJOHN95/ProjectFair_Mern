import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginimg from '../assets/login.jpg'
import { FloatingLabel, Form, Toast } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginApi, registerApi } from '../services/AllApi';
import { tokenAuthenticationConfig } from '../Contexts/TokenAuthentication';


function Authentication({ insideregister }) {
  const {isAuthorisation,setIsAuthorisation} = useContext(tokenAuthenticationConfig)
  const navigate = useNavigate()

  const [userinputs, setuserinputs] = useState({ username: "", email: "", password: "" })

  // register

  const handleregister = async (e) => {
    e.preventDefault()
    if (userinputs.username && userinputs.email && userinputs.password) {
      // Api call
      try {
        const result = await registerApi(userinputs)
        console.log(result);
        if (result.status == 200) {
          toast.success(`Welcome ${result.data.username}..... Please Login to explore more`)
          setuserinputs({ username: "", email: "", password: "" })
          setTimeout(() => {
            navigate('/login')
          }, 2000);
        }
        else {
          toast.error(result.response.data)
          setTimeout(() => {
            setuserinputs({ username: "", email: "", password: "" })
          }, 2000);
        }
      }
      catch(err) {
        console.log(err);
      }
    }
    else {
      toast.info("Please Fill The Form Completely")
    }

  }

  console.log(userinputs);

// login--------------------------------------------------------------------------------------

const  handlelogin = async(e)=>{
e.preventDefault()
if(userinputs.email && userinputs.password)
{
  try{
    const result = await loginApi(userinputs)
    if(result.status == 200){
      sessionStorage.setItem("existinguser" ,JSON.stringify(result.data.existinguser))
      sessionStorage.setItem("token",(result.data.token))
      setIsAuthorisation(true)
      toast.success(`Welcome ${result.data.existinguser.username}`)
      setuserinputs({email:"",password:""})
      setTimeout(() => {
        navigate('/')
      }, 2000);
    }
  }catch(err){
    console.log(err);

  }
}
else{
  toast.error("Fill the form completely")
}
}

  return (
    <>
      <div style={{ height: '100vh', width: '100%' }} className='d-flex justify-content-center align-items-center '>
        <div className="containe w-75 mb-3">
          <Link to={'/'} style={{ textDecoration: 'none' }}><i class="fa-solid fa-left-long me-1 ms-3"></i> Back To Home</Link>
          <div className="card shadow p-5">
            <div className="row">
              <div className="col-lg-6  p-3">
                <img width={'400px'} src={loginimg} alt="" />
              </div>
              <div className="col-lg-6 p-2">
                <h1>Project Fair</h1>
                
                <h3>Sign {insideregister ? "up" : " in"} to your Account</h3>

                <form action="">

                  {insideregister ?
                    <div>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Username"
                        className="mb-3"
                      >
                        <Form.Control value={userinputs.username} onChange={e => setuserinputs({ ...userinputs, username: e.target.value })} type="text" placeholder="Username" />
                      </FloatingLabel>

                      <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                      >
                        <Form.Control value={userinputs.email} onChange={e => setuserinputs({ ...userinputs, email: e.target.value })} type="email" placeholder="name@example.com" />
                      </FloatingLabel>
                      <FloatingLabel controlId="floatingPassword" label="Password">

                        <Form.Control value={userinputs.password} onChange={e => setuserinputs({ ...userinputs, password: e.target.value })} type="password" placeholder="Password" />
                      </FloatingLabel>
                    </div>
                    :
                    <div>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                      >
                        <Form.Control value={userinputs.email} onChange={e => setuserinputs({ ...userinputs, email: e.target.value })} type="email" placeholder="name@example.com" />
                      </FloatingLabel>
                      <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control value={userinputs.password} onChange={e => setuserinputs({ ...userinputs, password: e.target.value })} type="password" placeholder="Password" />
                      </FloatingLabel>
                    </div>}

                  {insideregister ?
                    <div className='mt-3'><button onClick={handleregister} className='btn btn-primatry'>Register</button>
                      <p>Already have an account ? <Link to={'/login'} >Login</Link></p>
                    </div>
                    :
                    <div className='mt-3'><button className='btn btn-primatry' onClick={handlelogin}>Login</button>
                      <p>Already have an account ? <Link to={'/register'}>Register Now</Link></p>

                    </div>}


                </form>
              </div>
            </div>
          </div>
        </div>


      </div>
      < ToastContainer position='top-center' theme='colored' autoClose={'1500'} />
    </>
  )
}

export default Authentication