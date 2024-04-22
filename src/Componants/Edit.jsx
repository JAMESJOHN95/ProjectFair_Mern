import React, { useContext, useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import uploadimage from '../assets/UploadImage.png'
import { serverurl } from '../services/Serverurl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editprojectAPI } from '../services/AllApi';
import { editresponsecontext } from '../Contexts/Contextapi';

function Edit({ project }) {
const {editResponse,setEditResponse} = useContext(editresponsecontext)
  const [projectData, setprojectData] = useState({ id: project._id, tittle: project?.tittle, language: project?.language, overview: project?.overview, github: project?.github, website: project?.website, projectimage: "" })

  const [preview, setpreview] = useState("")

  console.log(project);
  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false);
    setprojectData({ id: project._id, tittle: project?.tittle, language: project?.language, overview: project?.overview, github: project?.github, website: project?.website, projectimage: "" })
    setpreview("")
  }
  const handleShow = () => {
    setShow(true);
    setprojectData({ id: project._id, tittle: project?.tittle, language: project?.language, overview: project?.overview, github: project?.github, website: project?.website, projectimage: "" })
  }

  useEffect(() => {

    if (projectData.projectimage) {
      setpreview(URL.createObjectURL
        (projectData.projectimage

        ))
    }
    else {
      setpreview("")
    }
  }, [projectData.projectimage])
  // update project details

  const handleupdate = async () => {
    const { tittle, language, overview, github, website, projectimage } = projectData
    if (!tittle || !language || !overview || !github || !website) {
      toast.warning("pleasefill the form completely   ")
    }
    else {
      const reqBody = new FormData()
      reqBody.append("tittle", tittle)
      reqBody.append("language", language)
      reqBody.append("overview", overview)
      reqBody.append("github", github)
      reqBody.append("website", website)
      preview?reqBody.append("projectimage", projectimage):reqBody.append("projectimage",project.projectimage)
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": preview? "multipart/form-data" : "application/json",
          "Authorization": `Bearer ${token}`
        }
         //api call
    try {
      const result = await editprojectAPI(projectData.id, reqBody, reqHeader)
      console.log(result);
      if (result.status == 200) {
        handleClose()

        // pass response to view componant
        setEditResponse(result)
      }
      else {
        console.log(result.response);
      }
    }
    catch (err) {
      console.log(err);
    }
      }
    }
   
  }

  return (
    <>
      <button onClick={handleShow} className='btn'> <i class="fa-solid fa-pen-to-square"></i></button>
      <Modal size='lg' centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-4">
              <label>
                <input onChange={e => setprojectData({ ...projectData, projectimage: e.target.files[0] })} type="file" style={{ display: 'none' }} />
                <img className='mb-2 text-center' height="150px" width="300px" src={preview ? preview : `${serverurl}/uploads/${project?.projectimage}`} alt="" />
              </label>
            </div>
            <div style={{ lineHeight: '50px' }} className="col-lg-8 ps-4 pe-4">
              <div className='mb-2'>
                <input value={projectData.tittle} onChange={e => setprojectData({ ...projectData, tittle: e.target.value })} type="text" className="form-control" placeholder='Project Details' />

              </div>
              <div className='mb-2'>
                <input value={projectData.language} onChange={e => setprojectData({ ...projectData, language: e.target.value })} type="text" className="form-control" placeholder='Languages Used In Project' />

              </div><div className='mb-2'>
                <input value={projectData.overview} onChange={e => setprojectData({ ...projectData, overview: e.target.value })} type="text" className="form-control" placeholder='Project GitHub Link' />

              </div><div className='mb-2'>
                <input value={projectData.github} onChange={e => setprojectData({ ...projectData, github: e.target.value })} type="text" className="form-control" placeholder='Project Wbsite Link' />

              </div><div className='mb-2'>
                <input value={projectData.website} onChange={e => setprojectData({ ...projectData, website: e.target.value })} type="text" className="form-control" placeholder='Project Overview' />

              </div>

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleupdate} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
      < ToastContainer position='top-center' theme='colored' autoClose={'1500'} />

    </>
  )
}

export default Edit