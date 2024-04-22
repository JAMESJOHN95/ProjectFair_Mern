import axios from "axios";

export const commonApi = async (httpreq,url,reqbody,reqheader)=>{

    const configreq = {
        method : httpreq,
        url,
        data:reqbody,
        headers:reqheader?reqheader:{
            "Content-Type":"application/json"
        }
    }
        return await axios(configreq).then((res)=>{
            return res
        }).catch((err)=>{
            return err
        })
    

}
