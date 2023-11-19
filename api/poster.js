import sendRequest from "../untils/request";
import {setPathQuery} from "../untils/common"
const baseUrl='/public/poster'

//查询所有的广告
export const getAllPoster=async ()=>{
    const url=setPathQuery(baseUrl,{status:'1',size:5,page:1})
    return await sendRequest(url,"GET")
}
//查询广告详情
export const getPoster=async (id)=>{
    return await sendRequest(`${baseUrl}/${id}`,"GET");
}