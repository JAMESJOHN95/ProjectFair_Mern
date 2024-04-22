import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import profile from '../assets/profile.webp'
import { serverurl } from '../services/Serverurl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserApi } from '../services/AllApi';


function Profile() {
  const [preview, setPreview] = useState("")
  const [existingImg, setExistingImg] = useState("")
  const [open, setOpen] = useState(false);
  const [userdetains, setuserdetails] = useState({ username: "", email: "", password: "", github: "", linkedin: "", profileImage: "" })

  useEffect(() => {
    if (sessionStorage.getItem("existinguser")) {
      const existinguserdetails = JSON.parse(sessionStorage.getItem("existinguser"))
      setuserdetails({ ...userdetains, username: existinguserdetails.username, email: existinguserdetails.email, password: existinguserdetails.password, github: existinguserdetails.github, linkedin: existinguserdetails.linkedin })
      setExistingImg(existinguserdetails.profile)
    }

  }, [open])

  useEffect(() => {
    if (userdetains.profileImage) {
      setPreview(URL.createObjectURL(userdetains.profileImage)) // create image url
    }
    else {
      setPreview("")
    }

  }, [userdetains.profileImage])

  const handleuserprofile = async () => {
    const { username, email, password, github, linkedin, profileImage } = userdetains
    if (!github || !linkedin) {
      toast.warning("Please Fill The Form Completely!!!")
    }
    else {
      const reqBody = new FormData()
      reqBody.append("username", username)
      reqBody.append("email", email)
      reqBody.append("password", password)
      reqBody.append("github", github)
      reqBody.append("linkedin", linkedin)
      preview ? reqBody.append("profileImage", profileImage) : reqBody.append("profileImage", existingImg)
      const token = sessionStorage.getItem("token")
      console.log(token);
      if (token) {
        const reqHeader = {
          "Content-Type": preview?"multipart/form-data":"application/json",
          "Authorization": `Baerer ${token}`
        }
        //api call 
        try {
          const result = await updateUserApi(reqBody, reqHeader)
          if (result.status == 200) {
            setOpen(!open)
            sessionStorage.setItem("existinguser", JSON.stringify(result.data))
          }
          else {
            console.log(result);
          }
        } catch (err) {
          console.log(err);
        }
      }

    }
  }

  return (
    <>
      <div className="d-flex justify-content-between p-2 border rounded mt-3">
        <h3>Profile</h3>
        <button onClick={() => setOpen(!open)} className='btn'><i class="fa-solid fa-chevron-down"></i></button>
      </div>
      <Collapse in={open}>
        <div className=' row justify-content-center align-items-center mt-2 shadow p-2'
          id="example-collapse-text">
          <label className='text-center'>
            <input onChange={e => setuserdetails({ ...userdetains, profileImage: e.target.files[0] })} type="file" style={{ display: 'none' }} />

            {existingImg == "" ?
              <img height={'150px'} style={{ width: '200px' }} className='rounded-circle' src={preview ? preview : profile} alt="" />
              :
              <img height={'150px'} style={{ width: '200px' }} className='rounded-circle' src={preview ? preview : `${serverurl}/Uploads/${existingImg}`} alt="" />
            }
          </label>
          <div className='d-flex flex-column text-center'>
            <input value={userdetains.github} onChange={e => setuserdetails({ ...userdetains, github: e.target.value })} className='mt-2 w-100 form-control ' type="text" placeholder='Github Link' />
            <input value={userdetains.linkedin} onChange={e => setuserdetails({ ...userdetains, linkedin: e.target.value })} className='mt-2 w-100 form-control' type="text" placeholder='Linkedin id' />
            <div className='text-center'> <button onClick={handleuserprofile} className='mt-2 w-25 border btn btn-primary '>Update</button></div>
          </div>
        </div>
      </Collapse>
      < ToastContainer position='top-center' theme='colored' autoClose={'1500'} />

    </>
  )
}

export default Profile