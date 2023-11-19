// components/orderItem/OrderItem.js
import dayjs from "dayjs";
import {OrderStatus} from "../../constant/order";
Component({

    /**
     * 组件的属性列表
     */
    properties: {
        orderData:{
            type:Object,
            value:{}
        }
    },
    lifetimes:{
        attached(){
            console.log("组件加载了")
            const {orderData}=this.properties;
            if(orderData){
                const {addressCache}=orderData;
                this.setData({
                    createTime:dayjs(orderData.createTime).format("YYYY-MM-DD hh:mm:ss"),
                    serviceData:orderData.serviceCache,
                    addressData:!addressCache?'-':`${addressCache.city}${addressCache.street}`,
                    startTime:dayjs(orderData.startTime).format("YYYY-MM-DD hh:mm:ss"),
                    orderStatus:OrderStatus[orderData.orderStatus]
                })
            }
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        createTime:'',
        startTime:'',
        serviceData:{},
        addressData:{},
        orderStatus:'',
        
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onClick(){
            console.log(this)
            wx.navigateTo({
              url: `/pages/orderInfo/orderInfo?orderId=${this.data.orderData.orderId}`,
            })
        }
    },
    
})