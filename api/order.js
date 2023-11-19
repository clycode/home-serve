import sendRequest from "../untils/request";
import {setPathQuery} from "../untils/common"
const preUrl='/buyer/order'
//创建订单
export const createOrder=async (serviceId)=>{
    return await sendRequest(preUrl,"Post",{
        data:{
            serviceId
        }
    })
}
//确认订单
export const comfirmOrder=async (data)=>{
    const {orderId}=data;
    return await sendRequest(`${preUrl}/comfirm/${orderId}`,"POST",{data})
}
//支付单
export const payOrder=async (orderId)=>{
    return await sendRequest(`${preUrl}/pay/${orderId}`,"POST")
}
//取消订单
export const cancelOrder=async (returnReason)=>{
    const {orderId}=returnReason;
    return await sendRequest(`${preUrl}/cancel/${orderId}`,"PUT",{
        data:{
            returnReason
        }
    })
}
//完成订单
export const finishOrder=async (orderId)=>{
    return await sendRequest(`${preUrl}/finish/${orderId}`,"PUT")
}
//查询所有的订单
export const getAllOrder=async (parmas)=>{
    const url=setPathQuery(preUrl,parmas);
    return await sendRequest(url,"GET")
}
//查询订单信息
export const getOrderInfo=async (orderId)=>{
    return await sendRequest(`${preUrl}/${orderId}`)
}