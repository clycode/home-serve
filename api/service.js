import sendRequest from "../untils/request";
import {setPathQuery} from "../untils/common"
//获取全部服务
export const getService=async (params)=>{
   const url= setPathQuery('/public/service',{...params,status:'1'});
   return await sendRequest(url,"GET")
}
//获取服务详情
export const getServiceInfo=async (id)=>{
    return await sendRequest(`/public/service/${id}`,"GET");
}
