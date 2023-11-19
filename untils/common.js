//增强路由query参数
export const setPathQuery=(url,obj)=>{
    if(!url)return '/'
    if(!obj || Object.keys(obj).length ===0)return url;
    const keys=Object.keys(obj);
    let newUrl=''
    keys.forEach((k)=>{
        if(obj[k]){
            const data=Array.isArray(obj[k])?obj[k].split(','):obj[k];
            newUrl=newUrl + (newUrl.indexOf('?')!==-1? '&' : '?' )+ `${k}=${data}`
        }
    })
    return url + newUrl;
}

//判断是否登录
export function isLogin(){
    return wx.getStorageSync('userInfo');
}