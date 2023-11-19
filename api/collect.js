import sendRequest from "../untils/request";
//收藏
export const createCollect=async (serviceId)=>{
   return await sendRequest(`/buyer/collect`,"POST",{data:{serviceId}})
}
//判断用户是否已经收藏
export const checkAccountCollected=async (serviceId)=>{
    return await sendRequest(`/buyer/collect/check/${serviceId}`,"GET")
}
//取消收藏
export const removeCollected=async (serviceId)=>{
    return await sendRequest(`/buyer/collect/${serviceId}`,"DELETE")
}
//查询用户所有的收藏
export const findAllCollected=async ()=>{
    return await sendRequest('/buyer/collect',"GET")
}