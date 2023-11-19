import { getAllOrder } from "../../api/order"

// pages/order/order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs:[
            {name:'ALL',title:'全部'},
            {name:'WAIT_PAY',title:'待付款'},
            {name:'PROGRESS',title:'进行中'},
            {name:'FINISH',title:'完成'},
        ],
        orderData:{
            ALL:[],
            WAIT_PAY:[],
            PROGRESS:[],
            FINISH:[]
        },
        pageMap:{
            
        },
        statusTotal:{},

        actice:'ALL'
    },
    onChange(e){
        const {pageMap}=this.data;
        const type=e.detail.name;
        this.setData({actice:type})
        if(!pageMap[type]){
            this.getData(type)
        }
        
    },
    onScroll(){
        console.log(11111)
        this.getData(this.data.actice)
    },
    getData(type="ALL"){
        const {pageMap,orderData,actice,statusTotal}=this.data;
        const params={
            page:pageMap?.[actice]?pageMap?.[actice] + 1:1,
            size:10
        }
        if(type!=='ALL'){
            Object.assign(params,{orderStatus:type})
        }
        getAllOrder(params).then((res)=>{
                const orderList=res.data.data;
                const total=res.data.total;
                if(!statusTotal[type]){
                    statusTotal[type]=total;
                }
                if(orderList && orderList.length>0){
                    pageMap[type]=params.page
                    orderData[type]=[...orderList.map((item)=>{
                        return {
                            ...item,
                            addressCache:item.addressCache?JSON.parse(item.addressCache):'',
                            serviceCache:item.serviceCache?JSON.parse(item.serviceCache):''
                        }
                    }),...(orderData[type] || [])]
                    this.setData({pageMap,orderData,statusTotal})
                }
               
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getData()
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