import React, { useEffect, useState, useContext } from 'react'
import Edit from '../Componants/Edit'
import Add from '../Componants/Add'
import { GetuserprojectsApi, removeprojectAPI } from '../services/AllApi'
import { addresponsCeontext, editresponsecontext } from '../Contexts/Contextapi'



function View() {
  const { editResponse, setEditResponse } = useContext(editresponsecontext)
  const { addresponse, setaddresponse } = useContext(addresponsCeontext)


  // state to hols all user projects

  const [userprojects, setuserprojects] = useState([])

  useEffect(() => {
    getuserprojects()
  }, [addresponse, editResponse])
  console.log(userprojects);


  const getuserprojects = async () => {
    console.log("inside getuserprojects");
    const token = sessionStorage.getItem("token")
    const reqHeader = { "Authorization": `Bearer ${token}` }

    try {
      const result = await GetuserprojectsApi(reqHeader)
      console.log(result);
      if (result.status == 200) {
        setuserprojects(result.data)
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  // delete projects

  const handledeleteproject = async (projectid) => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      //Api call
      const result = await removeprojectAPI(projectid,reqHeader)
      if (result.status == 200) {
        getuserprojects()
      }
      else {
        console.log(result);
      }
    }
  }


  return (
    <div className='border p-3 rounded'>
      <div className="d-flex justify-content-between w-100 ">
        <h3>All Projects</h3>
        <div><Add /></div>
      </div>
      {userprojects?.length > 0 ?
        userprojects?.map(projects => (<div className="d-flex justify-content-between border p-2 rounded mt-2">
          <h3>{projects.tittle}</h3>
          <div className="icons d-flex">
            <div > <Edit project={projects} /></div>
            <a className='btn' href={projects?.github} target='_blank'><i class="fa-brands fa-github"></i></a>
            <button onClick={() => handledeleteproject(projects?._id)} className='btn'> <i class="fa-solid fa-trash text-danger"></i> </button>
          </div>
        </div>))

        :
        <div>Nothing to display....</div>
      }

    </div>
  )
}

export default View