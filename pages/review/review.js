import { createReview } from "../../api/review";

// pages/review/review.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        content:'',
        rate:'',
        orderId:'',
        serviceId:'',
        loading:false
    },
    onChange(event) {
        this.setData({
          rate: event.detail ,
        });
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            orderId:options.orderId,
            serviceId:+options.serviceId
        })
    },
    onSubmit(){
        this.setData({
            loading:true
        })
        createReview(this.data).then((res)=>{
            wx.showToast({
              title: '评论成功',
            })
            setTimeout(()=>{
                wx.navigateBack()
            },500)
        }).finally(()=>{
            this.setData({
                loading:false
            })
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