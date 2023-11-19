import Dialog from '@vant/weapp/dialog/dialog';
import sendRequest from "../../untils/request";

// pages/account.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:null,
        menuList:[{
            name:'我的收藏',
            src:'/public/account/icon-collect.png',
            link:'/pages/account/pages/collect/collect'
        },{
            name:'我的地址',
            src:'/public/account/iocn-address-account.png',
            link:'/pages/account/pages/adress/adress'
        },{
            name:'我的评论',
            src:'/public/account/icon-comment.png',
            link:'/'
        },{
            name:'修改信息',
            src:'/public/account/icon-edit.png',
            link:'/pages/account/pages/updateInfo/updateInfo'
        },{
            name:'修改密码',
            src:'/public/account/icon-password.png',
            link:'/pages/account/pages/updatePassword/updatePassword'
        },{
            name:'关于我们',
            src:'/public/account/icon-about.png',
            link:'/pages/account/pages/about/about'
        },{
            name:'退出登录',
            src:'/public/account/icon-close.png',
            link:'/pages/login/login'
        }]
    },
    onClick(){
       
    },
    toLink(event){
        const url = event.currentTarget.dataset.link;
        if(url==='/pages/login/login'){
            wx.removeStorageSync('token');
            wx.removeStorageSync('userInfo');
            this.setData({userInfo:null})
            wx.reLaunch({
                url,
              })
            return
        }
        wx.navigateTo({
          url,
        })
    },
    openConfirm(){
        Dialog.confirm({
            title: '提示',
            message: '未设置手机和密码,是否前往设置',
          })
            .then(() => {
              wx.reLaunch({
                url: '/pages/loginInfo/loginInfo',
              })
            })
            .catch(() => {
              // on cancel
              wx.showToast({
                title: '已取消',
              })
            });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const userInfo=wx.getStorageSync('userInfo');
        if(userInfo){
            this.setData({userInfo})
            return
        }
        sendRequest(`/buyer/account`).then((res)=>{
            const data=res.data;
            wx.setStorageSync('userInfo', data)
            this.setData({userInfo:data})
            if(data.isInit){
                this.openConfirm()
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

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