import sendRequest from "../untils/request";
import {setPathQuery} from "../untils/common"
const baseUrl='/public/info'

//查询资讯
export const getAllInfo=async (params)=>{
    const url=setPathQuery(baseUrl,params)
    return await sendRequest(url,"GET")
}
//查询资讯
export const getInfomation=async (id)=>{
    return await sendRequest(`${baseUrl}/${id}`,"GET");
}