import sendRequest from "../untils/request";
import {setPathQuery} from "../untils/common";
const baseUrl='/buyer/review';
//创建评论
export const createReview=async (data)=>{
    return await sendRequest(baseUrl,'POST',{
        data
    })
}
//获取所有评论
export const findAllReview=async (params)=>{
    const url=setPathQuery(baseUrl,params);
    return await sendRequest(url,"GET")
}
//获取评论详情
export const findReviewInfo=async (id)=>{
    return await sendRequest(`${baseUrl}/${id}`);
}
//删除订单
export const delReview=async (id)=>{
    return await sendRequest(`${baseUrl}/${id}`,'DELETE')
}