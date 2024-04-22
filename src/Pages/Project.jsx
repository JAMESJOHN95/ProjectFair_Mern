import React, { useEffect, useState } from 'react'
import Header from '../Componants/Header'
import ProjectCard from '../Componants/ProjectCard'
import { GetallprojectsApi } from '../services/AllApi'


function Project() {
  // state for holding all projects

  const [allprojects, setallprojects] = useState([])
  const [searchkey, setsearchkey] = useState("")

  console.log(allprojects);
  useEffect(() => {
    getallprojects()
  }, [searchkey])



  const getallprojects = async () => {
    const token = sessionStorage.getItem("token")
    const reqHeader = { "Authorization": `Bearer ${token}` }
    try {
      const result = await GetallprojectsApi(searchkey,reqHeader)
      console.log(result);
      if (result.status == 200) {
        setallprojects(result.data)
      }
    }
    catch (err) {
      console.log(err);
    }
  }


  return (
    <>
      <Header />
      <div className='container-fluid' style={{ marginTop: '150px' }}>
        <div className='d-flex justify-content-between pe-5 ps-5'>
          <h2>All Projects</h2>
          <div><input onChange={e=>setsearchkey(e.target.value)} type="text" placeholder='Search the projects here...' className='form-control' /></div>
        </div>
        {/*  -----------Display all the projects------------------------- */}
        <div className="row ms-auto me-auto mt-5 w-100 ">
          {allprojects?.length > 0 ?
            allprojects?.map(project => (
              <div key={project} className="col-lg-4 mt-3">
                <ProjectCard displayData={project} />
              </div>
            ))
            :
            <div>Nothing to Display!!!!!</div>
          }
        </div>
      </div>
    </>
  )
}

export default Project