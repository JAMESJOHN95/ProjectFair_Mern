import { commonApi } from "./CommonApi";
import { serverurl } from "./Serverurl";


export const registerApi = async (reqbody) => {
  return await commonApi("POST", `${serverurl}/register`, reqbody)
}

export const loginApi = async (reqbody) => {
  return await commonApi("POST", `${serverurl}/login`, reqbody)
}


export const addprojectApi = async (reqBody, reqHeader) => {
  return await commonApi("POST", `${serverurl}/add-project`, reqBody, reqHeader)

}

// api for getting all projects

export const GetallprojectsApi = async (searchkey, reqHeader) => {
  return await commonApi("GET", `${serverurl}/all-projects?search=${searchkey}`, "", reqHeader)
}

// Api for User Projects

export const GetuserprojectsApi = async (reqHeader) => {
  return await commonApi("GET", `${serverurl}/user-projects`, "", reqHeader)
}

// Api for Home Projects

export const gethomeprojectsApi = async () => {
  return await commonApi("GET", `${serverurl}/home-projects`, "")
}

// edit project details

export const editprojectAPI = async(projectid,reqBody,reqHeader)=>{
  return await commonApi("PUT",`${serverurl}/edit-projects/${projectid}`,reqBody,reqHeader)
}

// remove projects

export const removeprojectAPI = async(projectid,reqHeader)=>{
  return await commonApi("DELETE",`${serverurl}/delete-project/${projectid}`,{},reqHeader)
}
// update user profile

export const updateUserApi = async(reqBody,reqHeader)=>{
  return await commonApi('PUT',`${serverurl}/edit-user`,reqBody,reqHeader)
}