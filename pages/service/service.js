// pages/service/service.js
import Toast from '@vant/weapp/toast/toast';
import {isLogin} from "../../untils/common";
import { checkAccountCollected, createCollect, removeCollected } from '../../api/collect';
import {getServiceInfo} from "../../api/service"
import { createOrder } from '../../api/order';
import {serviceList} from "../../constant/info"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        serviceData:{
            title:'服务详情',
            imagesUrl:[],
            desc:'',
        },
        collected:false,
        serviceList
    },
    handleCollect(){
        
        if(isLogin()){
        const {serviceData,collected}=this.data;
        if(collected){
            removeCollected(serviceData.id).then(()=>{
                this.setData({collected:false})
            })
        }else{
        createCollect(serviceData.id).then(()=>{
            this.setData({collected:true})
        })
    }
    }else{
        wx.reLaunch({
          url: '/pages/login/login',
        })
    }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const {id}=options;
        if(!id){
            Toast.fail("参数异常");
            setTimeout(()=>{
                wx.switchTab({
                  url: '/pages/category/category',
                })
            },500)
            return
        }
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner',
        });
        getServiceInfo(id).then((res)=>{
            if(!res.data){
                Toast.fail("该服务不存在");
                setTimeout(()=>{
                    wx.switchTab({
                      url: '/pages/category/category',
                    })
                },500)
            }
            if(res.data.imagesUrl){
                try{
                    res.data.imagesUrl=JSON.parse(res.data.imagesUrl);
                }catch(err){

                }
            }
            const serviceData=res.data;
            this.setData({
                serviceData
            })
            if(isLogin()){
                //发起请求
                checkAccountCollected(serviceData.id).then((res)=>{
                    this.setData({collected:res.data.collected})
                })
            }


        }).finally(()=>{
            Toast.clear()
        })

    },
    handleReservation(){},
    handlePay(){
        const id=this.data.serviceData.id;
        createOrder(id).then((res)=>{
            
            wx.navigateTo({
          url: `/pages/checkOrder/checkOrder?orderId=${res.data}`,
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