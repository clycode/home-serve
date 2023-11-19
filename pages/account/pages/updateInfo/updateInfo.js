import { updateAccountInfo,getAccountInfo } from "../../../../api/account";

// pages/account/pages/updateInfo/updateInfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nickName:'',
        fileList:[],
        userInfo:{},
        loading:false
    },

    afterRead(event) {
        const { file } = event.detail
        const that=this;
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        wx.uploadFile({
          url: 'http://localhost:3000/public/upload', // 仅为示例，非真实的接口地址
          filePath: file.url,
          name: 'file',
          success(res) {
              console.log(this)
            // 上传完成需要更新 fileList
            const { fileList = [] } = that.data;
            const data=JSON.parse(res.data)
            fileList.push({ ...file, 
                url: data.data.filename,
                name:'用户头像'
            } );
            that.setData({ fileList});
          },
        });
      },
      onDelete(index){
          this.setData({fileList:[]})
       
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
       wx.getStorage({
           key:'userInfo'
       }).then(({data})=>{
           this.setData({
               fileList:[{
                   name:'用户头像',
                   url:data.avatar,
               }],
               nickName:data.nickName,
               userInfo:data
           })
       })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    onSubmit(){
        const data={
            avatar:this.data.fileList.length===0?userInfo.avatar:this.data.fileList[0].url,
            nickName:this.data.nickName || userInfo.nickName
        }
        updateAccountInfo(data).then((res)=>{
            this.setData({
                loading:true
            })
            wx.showToast({
                title: '保存成功',
              })
              getAccountInfo().then((res)=>{
                const data=res.data;
                wx.setStorageSync('userInfo', data)
                setTimeout(()=>{
                        wx.reLaunch({
                          url: '/pages/account/account?type=reload',
                        })
                  },600)
            })
             

        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})