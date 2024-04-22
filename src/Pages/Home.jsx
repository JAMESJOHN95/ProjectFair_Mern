import React, {useState,useEffect}from 'react'
import { Link,useNavigate } from 'react-router-dom'
import LandingImg from '../assets/Landingimage.jpg'
import ProjectCard from '../Componants/ProjectCard'
import { Card } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { gethomeprojectsApi } from '../services/AllApi'



function Home() {
  const navigate = useNavigate()
// create a stete to handle the home page after login
const [loginstatus,setloginstatus] = useState(false)

// state for holdimg home projects
const [homeprojects,sethomeprojects] = useState([])
console.log(homeprojects);

const gethomeprojects = async ()=>{
  try{
    const result = await gethomeprojectsApi()
    // console.log(result);
    if(result.status == 200){
      sethomeprojects(result.data)
    }

  }catch(err){
console.log(err);
  }
}

useEffect(()=>{
  gethomeprojects()
  if(sessionStorage.getItem("token")){
    setloginstatus(true)
  }
  else{
    setloginstatus(false)
  }
},[])
const handleprojects =()=>{
  if(loginstatus){
    navigate('/projects')
  }
  else{
    toast.warning("Please login to get full acces to our projects")
  }
}



  return (
    <>
      <div className=' w-100 '>
        <div className="row p-5">
          <div className="col-lg-8 p-5 ">
            <h3><i className="fa-solid fa-hands-holding-child me-4"></i>Project Fair</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio corrupti iure ipsam cupiditate obcaecati, sed labore dicta, placeat laudantium minus velit corporis accusantium facere dolore illo totam, voluptates laboriosam eos?</p>

           {loginstatus?
           <Link to={'/Dashbord'}>
           <button className='p-2 rounded border-0 ' style={{ backgroundColor: '#fb8500' }}>Manage your projects <i className="ms-3 fa-solid fa-right-long"></i></button>
         </Link>:
            <Link to={'/login'}>
              <button className='p-2 rounded border-0 ' style={{ backgroundColor: '#fb8500' }}>Start to Explore <i className="ms-3 fa-solid fa-right-long"></i></button>
            </Link> }   
            
            </div>

          <div className="col-lg-4 p-3 ">
            <img max-height={'100%'} width={'300px'} src={LandingImg} alt="" />
          </div>
        </div>
      </div>


      <div className='text-center mt-4 mb-4'>
        <h1>Explore Our Projects</h1>
        <marquee behavior="" direction="">
          <div className='d-flex mt-5'>
           { homeprojects?.length>0 && 
           homeprojects?.map(project=>( 
           <div className='ms-3' key={project}>
            <ProjectCard displayData={project} />
          </div>))}
          </div>
        </marquee>
      </div>

      <div className='text-center mb-2'><button onClick={handleprojects} className='btn btn-link'>Click Here TO View More Projects</button></div>

      <div>
        <h1 className='text-center' >OUR TESTIMONIALS</h1>
        <div className="d-flex justify-content-evenly align-item-center mt-4 mb-4  p-3 w-100 ">
         <div>
            <Card className='shadow btn' style={{ width: '18rem' }}>
              <div className='text-center'>
                <Card.Img className='mb-2 align-item-center rounded' style={{ height: '90px', width: '90px', }} variant="top" src="https://thumbs.dreamstime.com/b/businessman-avatar-image-beard-hairstyle-male-profile-vector-illustration-178545831.jpg" />
              </div>        <Card.Title className='text-center'>Robert Enrique</Card.Title>
              <Card.Body>
                <div className='d-flex align-item-center mb-2'>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star-half text-warning"></i>
                </div>
                <Card.Text className='text-start'>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
         </div>

       <div>
            <Card className='shadow btn' style={{ width: '18rem' }}>
              <div className='text-center'>
                <Card.Img className='mb-2 align-item-center rounded' style={{ height: '90px', width: '90px', }} variant="top" src="https://thumbs.dreamstime.com/b/businessman-avatar-image-beard-hairstyle-male-profile-vector-illustration-178545831.jpg" />
              </div>        <Card.Title className='text-center'>David Jonathan</Card.Title>
              <Card.Body>
                <div className='d-flex mb-2'>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star-half text-warning"></i>
                </div>
                <Card.Text className='text-start'>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
       </div>


        <div>
            <Card className='shadow btn' style={{ width: '18rem' }}>
              <div className='text-center'>
                <Card.Img className='mb-2 align-item-center rounded' style={{ height: '90px', width: '90px', }} variant="top" src="https://thumbs.dreamstime.com/b/businessman-avatar-image-beard-hairstyle-male-profile-vector-illustration-178545831.jpg" />
              </div>        <Card.Title className='text-center'>Donal Steve</Card.Title>
              <Card.Body>
                <div className='d-flex mb-2'>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star-half text-warning"></i>
                </div>
                <Card.Text className='text-start'>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
        </div>

        </div>
      </div>

      < ToastContainer position='top-center' theme='colored' autoClose={'1500'} />
    </>
  )
}

export default Home