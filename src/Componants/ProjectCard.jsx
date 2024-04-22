import React, { useState } from 'react'
import { Card, Modal, Button } from 'react-bootstrap'
import { serverurl } from '../services/Serverurl';


function ProjectCard({displayData}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <Card onClick={handleShow} className='shadow btn' style={{ width: '18rem' }}>
        <Card.Img height='100px' variant="top" src={`${serverurl}/uploads/${displayData?.projectimage}`} />
        <Card.Body>
          <Card.Title>{displayData?.tittle}</Card.Title>
        </Card.Body>
      </Card >


      <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Modal heading

          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6 p-3">
              <img className='img-fluid' src={`${serverurl}/uploads/${displayData?.projectimage}`} alt="" />
            </div>
            <div className="col-lg-6 p-3">
              <h3>Project Title : {displayData?.tittle} </h3>
              <h6>Languages Used : {displayData?.language} </h6>
              <p>{displayData?.overview}</p>

            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <div className="float-start  me-auto">
            <a href={displayData?.github} target='_blank'  className='btn btn secondary'>
            <i class="fa-brands fa-github"></i>
            <a href={displayData?.website} target='_blank'  className='btn btn secondary' >
            <i class="fa-solid fa-link"></i>
            </a>
            
            </a>
          </div>

        </Modal.Footer>
      </Modal>
    </>
  )
}


export default ProjectCard