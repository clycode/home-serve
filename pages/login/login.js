// pages/login/login.js
import Dialog from '@vant/weapp/dialog/dialog';
import Toast from '@vant/weapp/toast/toast';
import {phoneReg} from "../../regex/index"

import sendRequest from "../../untils/request";
import { phoneTips } from "../../constant/tips";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showOverlay:false,
        phone:'',
        password:'',
        phoneErr:false,
        phoneTips,
    },
    onWeChatLogin(){
        this.setData({showOverlay:true})
        wx.login({
          success: (res) => {
            wx.getUserInfo({
                success:(doc)=>{
                    sendRequest('/public/auth/signUp',"POST",{
                        data:{
                            code:res.code,
                            nickName:doc.userInfo.nickName,
                            avatar:doc.userInfo.avatarUrl
                        }
                    }).then((res)=>{
                            this.onLoginSuccess(res.data)
                    })
                },
                fail:()=>{
                    this.setData({showOverlay:false})
                    Dialog.alert({
                        title: '提示',
                        message: '获取用户信息失败',
                      })
                }
            })
          },
          fail:()=>{
            this.setData({showOverlay:false})
            Dialog.alert({
                title: '提示',
                message: '微信登录失败',
              })
          }
        })
    },
    onPhoneChange(e){
        if(this.data.phone.length>=11){
        this.setData({
            phoneErr:!phoneReg.test(this.data.phone)
        })
    }else{
        this.setData({
            phoneErr:false
        })
    }
    },
    onLogin(){
        const {phone,password}=this.data;
        if(!phone || !password){
            Toast.fail("请输入手机或密码");
            return
        }
        sendRequest("/public/auth/login","POST",{
            data:{
                phone,
                password,
            }
        }).then((res)=>{
            this.onLoginSuccess(res.data)
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const token=wx.getStorageSync('toekn')
        if(token){
            wx.showToast({
              title: '请退出登录',
            })
            wx.navigateBack()
        }
    },
    onLoginSuccess(data){
        wx.setStorage({
            key:'token',
            data
        }).then(()=>{
            this.setData({showOverlay:false})
            wx.showToast({
                title: '登录成功',
              })
            setTimeout(()=>{
                wx.reLaunch({
                  url: '/pages/index/index',
                })
            },500)
        });
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