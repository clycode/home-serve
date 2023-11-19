import sendRequest from "../untils/request";
//新增地址
export const createAddress=async (data)=>{
   return await sendRequest(`/buyer/address`,"POST",{data})
}
//获取全部地址
export const findAllAddress=async ()=>{
    return await sendRequest(`/buyer/address`,"GET")
}
//删除地址
export const removeAddress=async (id)=>{
    return await sendRequest(`/buyer/address/${id}`,"DELETE")
}
//修改地址
export const updateAddress=async (data)=>{
    const {id}=data;
    return await sendRequest(`/buyer/address/${id}`,"PUT",{data})
}
//获取地址详情
export const findOneAddress=async (id)=>{
    return await sendRequest(`/buyer/address/${id}`,"GET")
}