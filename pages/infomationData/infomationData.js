import { getInfomation } from "../../api/infomation"
import dayjs from "dayjs";
// pages/infomationData/infomationData.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        infoData:'',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        getInfomation('3').then((res)=>{
            if(res.data){
            this.setData({infoData:{
                ...res.data,
                createTime:dayjs(res.data.createTime).format("YYYY-MM-DD hh:mm:ss")
            }})
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