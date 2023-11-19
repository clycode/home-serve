export default function sendRequest(url,method,config={}){
    const ContentTypeMap={
        'json':'application/json',
        'blod':'multipart/form-data',
    }
    const BaseUrl='http://localhost:3000';
    const Timeout=6 * 1000 * 1000;
    const requestType=config?.requestType ?? 'json';
    try{
    config.header = {
        'Authorization': 'Bearer ' + wx.getStorageSync('token') || '',
        'Content-Type':ContentTypeMap[requestType]
      };
    }catch(err){

    }
    return new Promise((resolve,reject)=>{
        wx.request({
            url:BaseUrl + url,
            method,
            timeout: Timeout,
            ...config,
            success: (result) => {
                const {status,message}=result.data;
                if(status!==200){
                    //登录失效 | 用户账号异常
                    if(status===401 || status===403){
                        wx.showModal({
                          title: '提示',
                          content: message,
                          complete: (res) => {
                            if (res.cancel) {
                                setTimeout(()=>{
                                    wx.removeStorageSync('token');
                                    wx.removeStorageSync('userInfo');
                                    wx.reLaunch({
                                      url: '/pages/login/login',
                                    })
                                },500)
                            }
                            if (res.confirm) {
                                setTimeout(()=>{
                                    wx.removeStorageSync('token');
                                    wx.removeStorageSync('userInfo');
                                    wx.reLaunch({
                                      url: '/pages/login/login',
                                    })
                                },500)
                            }
                          }
                        })
                  
                    }else{
                        wx.showToast({
                            title: message,
                            icon:'error'
                        })
                    }
                    reject(result.data)
                }
                resolve(result.data)
            },
            fail: (err) => {
                console.log('1111111')
                reject(err)
            },
            complete: (res) => {
                // resolve(res);
            },
          })
    })
}

