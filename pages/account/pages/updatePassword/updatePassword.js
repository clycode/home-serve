import { updateAccountPassword } from "../../../../api/account";

// pages/account/pages/updatePassword/updatePassword.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        oldPassword:'',
        password:'',
        comfirmPassword:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    onSubmit(){
        const {comfirmPassword,password,oldPassword}=this.data;
        let tips='';
        if(!comfirmPassword || comfirmPassword!==password ){
            tips='确认密码有误'
        }
        if(!password){
            tips='密码不能为空'
        }
        if(!oldPassword){
            tips='旧密码不能为空'
        }
        if(tips){
            wx.showToast({
              title: tips,
              icon:'error'
            })
            return
        }
        updateAccountPassword({
            oldPassword,
            password,
        }).then((res)=>{
            wx.showToast({
              title: '修改成功!',
            })
            wx.clearStorage()
            setTimeout(()=>{
                wx.reLaunch({
                  url: '/pages/login/login',
                })
            },800)
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