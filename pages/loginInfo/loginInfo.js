
// pages/loginInfo/loginInfo.js
import Toast from '@vant/weapp/toast/toast';
import { phoneTips,passwordTips } from "../../constant/tips";
import { phoneReg } from '../../regex/index';
import  sendRequest from "../../untils/request"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone:'',
        password:'',
        checkPassword:'',
        phoneErr:false,
        passwordErr:false,
        passwordTips,
        phoneTips,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        
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
    onPasswordChange(){
        const {password}=this.data
        this.setData({
            passwordErr:password.length!==0 && (password.length<8 || password.length>16)
        })
    },
    onUpdateUserInfo(){
        const {password,checkPassword,phone}=this.data;
        if(!phone || !password){
            Toast.fail('请检查是否填写手机号或密码');
              return
        }
        if(password!==checkPassword){
            Toast.fail('两次输入的密码不一致');
            return
        }
        Toast.loading({
            message: 'loading...',
            forbidClick: true,
            loadingType: 'spinner',
          });
        sendRequest('/buyer/account/loginInfomation',"PUT",{
            data:{
                phone,
                password
            }
        }).then((res)=>{
            Toast.loading({
                message: '绑定成功',
                forbidClick: true,
                loadingType: 'spinner',
              });
              wx.removeStorage({
                key: 'userInfo',
              }).then(()=>{
                  wx.reLaunch({
                    url: '/pages/account/account',
                  })
              })
        })
        
        
    },
    onShareAppMessage:function(){
        return{}
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