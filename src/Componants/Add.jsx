import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import uploadimage from '../assets/UploadImage.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addprojectApi } from '../services/AllApi';
import { addresponsCeontext } from '../Contexts/Contextapi';


function Add() {
  const {addresponse,setaddresponse} = useContext(addresponsCeontext)
  // state to hold the image url

  const [preview, setpreview] = useState("")

  // state to check image status

  const [imagefilestatus, setimagefilestatus] = useState(false)

  // state to add projects

  const [projectdetails, setprojectdetails] = useState({ tittle: "", language: "", overview: "", github: "", website: "", projectimage: "" })

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setprojectdetails({ tittle: "", language: "", overview: "", github: "", website: "", projectimage: "" })
  }
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (projectdetails.projectimage.type == "image/png" || projectdetails.projectimage.type == "image/jpg" || projectdetails.projectimage.type == "image/jpeg") {
      setimagefilestatus(true)
      setpreview(URL.createObjectURL(projectdetails.projectimage))
    }
    else {
      setpreview(uploadimage)
      setimagefilestatus(false)
      setprojectdetails({ ...projectdetails, projectimage: "" })
    }
  }, [projectdetails.projectimage])

  console.log(projectdetails);

  // function to add project details to db

  const handleupload = async () => {
    const { tittle, language, overview, github, website, projectimage } = projectdetails

    if (!tittle || !language || !overview || !github || !website || !projectimage) {
      toast.warning("Please fill the form completely!!!!!!")


    } else {
      const reqBody = new FormData()
      reqBody.append("tittle", tittle)
      reqBody.append("language", language)
      reqBody.append("overview", overview)
      reqBody.append("github", github)
      reqBody.append("website", website)
      reqBody.append("projectimage", projectimage)

      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        try {
          const result = await addprojectApi(reqBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
            setaddresponse(result)
            handleClose()
          } else {
            toast.warning(result.response.data)
          }
        } catch (err) {
          console.log(err);
        }
      }

    }
  }


  return (
    <>
      <button onClick={handleShow} className='btn'> <i class="fa-solid fa-plus"></i> Add New</button>
      <Modal size='lg' centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-4 mb-2  ">
              <label>
                <input type="file" style={{ display: 'none' }} onChange={e => setprojectdetails({ ...projectdetails, projectimage: e.target.files[0] })} />
                <img height="150px" width="260px" src={preview} alt="" />
              </label>
              {!imagefilestatus && <div className="text-danger mt-1 mb-1">* Upload only files with following type (png , jpg , jpeg)</div>
              }            </div>
            <div style={{ lineHeight: '50px' }} className="col-lg-8 ps-4 pe-4">
              <div className='mb-2'>
                <input type="text" className="form-control" placeholder='Project Title' value={projectdetails.tittle} onChange={(e) => setprojectdetails({ ...projectdetails, tittle: e.target.value })} />

              </div>
              <div className='mb-2'>
                <input type="text" className="form-control" placeholder='Languages Used In Project' value={projectdetails.language} onChange={(e) => setprojectdetails({ ...projectdetails, language: e.target.value })} />

              </div><div className='mb-2'>
                <input type="text" className="form-control" placeholder='Project GitHub Link' value={projectdetails.github} onChange={(e) => setprojectdetails({ ...projectdetails, github: e.target.value })} />

              </div><div className='mb-2'>
                <input type="text" className="form-control" placeholder='Project Wbsite Link' value={projectdetails.website} onChange={(e) => setprojectdetails({ ...projectdetails, website: e.target.value })} />

              </div><div className='mb-2'>
                <input type="text" className="form-control" placeholder='Project Overview' value={projectdetails.overview} onChange={(e) => setprojectdetails({ ...projectdetails, overview: e.target.value })} />

              </div>

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleupload}>Upload</Button>
        </Modal.Footer>
      </Modal>
      < ToastContainer position='top-center' theme='colored' autoClose={'1500'} />
    </>
  )
}

export default Add