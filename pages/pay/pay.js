// pages/pay/pay.js
import { getOrderInfo, payOrder } from "../../api/order";
import {appName} from "../../constant/app";
import Toast from '@vant/weapp/toast/toast';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        appName,
        orderId:'',
        totalPrice:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if(options.orderId){
            getOrderInfo(options.orderId).then((res)=>{
                    this.setData({
                        orderId:options.orderId,
                        totalPrice:res.data.totalPrice
                    })
            }).finally(()=>{
                Toast.clear();
            })
            Toast.clear();
        }
    },
    onPay(){
        const {orderId}=this.data;
        wx.showToast({
          title: '支付中',
          icon:'loading',
        })
        payOrder(orderId).then(()=>{
            wx.showToast({
                title:'支付成功',
                icon:'success'
            })
            setTimeout(()=>{
                wx.switchTab({
                    url: '/pages/order/order',
                  })
            },1000)
          
        }).finally(()=>{
            Toast.clear();
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