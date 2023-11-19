import sendRequest from "../untils/request";

const baseUrl='/buyer/account';
//更新用户信息
export const updateAccountInfo=async (data)=>{
   return await sendRequest(baseUrl,"Put",{data});
}

// 更新密码
export const updateAccountPassword=async (data)=>{
   return await sendRequest(`${baseUrl}/password`,'Put',{data})
}
// 获取用户信息
export const getAccountInfo=async ()=>{
    return await  sendRequest(`/buyer/account`);
}