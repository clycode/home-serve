import { finishOrder, getOrderInfo, updateOrder } from "../../api/order";
import {OrderStatus} from "../../constant/order";
import dayjs from "dayjs";
// pages/orderInfo/orderInfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderId:'',
        OrderStatus,
        cancelAbleStatus:['WAIT_PAY','WAIT_SERVICE','WAIT_COMFIRM'],
        //订单数据
        orderInfo:'',
        //地址数据
        addressInfo:'',
        //服务数据
        serviceInfo:'',
        //服务开始时间
        startTime:'',
        //下单时间
        createTime:'',
        //支付时间
        payTime:'-',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if(options.orderId){
        const {orderId}=options;
            this.getData(orderId)
            this.setData({orderId})
    }

    },
    getData(orderId){
        wx.showLoading({
            title: '加载中...',
          })
          getOrderInfo(orderId).then((res)=>{
              const orderInfo=res.data;
              const startTimeDay=dayjs(+orderInfo.serviceStartTime)
              this.setData({
              orderInfo,
                addressInfo:orderInfo.addressCache?JSON.parse(orderInfo.addressCache):'',
                serviceInfo:orderInfo.serviceCache?JSON.parse(orderInfo.serviceCache):'',
                startTime:`${startTimeDay.format("YYYY-MM-DD hh:mm:ss")} (星期${startTimeDay.day() || '天'})`,
                createTime:dayjs(orderInfo.createTime).format("YYYY-MM-DD hh:mm:ss"),
                payTime:orderInfo.payTime?dayjs(orderInfo.payTime).format("YYYY-MM-DD hh:mm:ss"):'-',
              })
          }).finally(()=>{
              wx.hideLoading()
          })
    },
    onPay(){
        wx.navigateTo({
          url: `/pages/pay/pay?orderId=${this.data.orderInfo.orderId}`,
        })
    },
    onComfirm(){
        wx.navigateTo({
            url: `/pages/checkOrder/checkOrder?orderId=${this.data.orderInfo.orderId}`,
          })
    },
    onFinish(){
        console.log(this.data);
        console.log('------------aaaa')
        const {orderId}=this.data;
       finishOrder(this.data.orderId).then(()=>{
           this.getData(orderId)
       })
    },
    onCancel(){
        wx.showModal({
          title: '提示',
          content: '确认取消订单嘛, 取消后无法复原?',
          complete: (res) => {
            if (res.cancel) {
            
            }
        
            if (res.confirm) {
               wx.navigateTo({
                 url: `/pages/orderCancel/orderCancel?orderId=${this.data.orderId}`,
               })
            }
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