import sendRequest from "../untils/request";
import {setPathQuery} from "../untils/common"
//获取关于我们
export const getAbout=async ()=>{
   const url= setPathQuery('/public/shopConfig',{type:'aboutus'});
   return await sendRequest(url,"GET")
}
