// pages/checkOrder/checkOrder.js
import dayjs from "dayjs";
import { comfirmOrder, getOrderInfo } from "../../api/order";
import Toast from '@vant/weapp/toast/toast';
const hourServiceList=[
    {
        field:'选择服务时间',
        type:'day-time',
        dataField:'startTime',
        showField:'startFormatter',
        disabled:false,
    },{
        field:'选择服务时长',
        type:'number-7',
        dataField:'timeTotal',
        showField:'timeFormatter',
        disabled:true,
    },
]
const dayServieList=[
    {
        field:'选择开始时间',
        type:'day',
        dataField:'startTime',
        showField:'startFormatter',
        disabled:false,
    },{
        field:'选择服务天数',
        type:'number-30',
        dataField:'timeTotal',
        showField:'timeFormatter',
        disabled:false,
    },
]
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderId:'',
        addressInfo:'',
        totalPrice:0,
        disabled:true,
        serviceInfo:'',
        serviceData:{
            startTime:'',
            timeTotal:0,
            timeFormatter:'',
            startFormatter:'',
        },
        submitLoading:false,
        minDate:new Date().getTime(),
        maxDate:dayjs().endOf('year').valueOf(),
        type:'hour',
        serviceList:[],
        columns:[],
        activeField:'',
        pickerType:'',
        pickerShow:false,
        remark:'',
        filter(type, options) {
            if(type==='hour'){
                return [8,9,10,11,14,15,16,17,18]
            }
            if (type === 'minute') {
              return [0]
            }
      
            return options;
        },
        
    },
    onClick(e){
        const {dataset}=e.currentTarget;
        if(dataset.disabled)return
        this.setData({
            pickerShow:true,
            pickerType:dataset.type,
            activeField:dataset.datafield
        })
        if(dataset.type.includes('number')){
            const [,data]=dataset.type.split('-')
            this.setData({
                columns:Array.from({length:+data},(_,i)=>i+1)
            })
        }else if(dataset.type==='day-time'){
            const currentTime=dayjs(`${dayjs().format('YYYY-MM-DD')} 18:00`).valueOf()
            if(dayjs().valueOf() > currentTime){
                this.setData({
                    minDate:dayjs().add(1,'d').valueOf(),
                })
            }else{
                this.setData({
                    minDate:dayjs().endOf("h").valueOf()
                })
            }
           
        }
    },
    onChange(e){
        console.log(e);
        console.log('-=-----------aaa')
    },
    onNumberPickerConfirm(e){
        const {activeField,serviceData}=this.data;    
        serviceData[activeField]=  e.detail.value;
        serviceData.timeFormatter=`${e.detail.value} ${this.data.type==='hour'?'小时':'天'}`,
        this.setData({
            pickerShow:false,
            serviceData
        })
    },
    onDatePickerConfirm(e){
        const {serviceData,pickerType}=this.data
        serviceData.startTime=e.detail;
        serviceData.startFormatter=pickerType==='day'? dayjs(e.detail).format("YYYY-MM-DD"):dayjs(e.detail).format("YYYY-MM-DD HH:mm")
        this.setData({
            serviceData,
            pickerShow:false
        })
    
    },
    onCancel(){
        this.setData({pickerShow:false})
    },
    toChooseAddress(){
        wx.setStorage({
            key:'checkOrderData',
            data:this.data,
            success:()=>{
                wx.reLaunch({
                    url: `/pages/account/pages/adress/adress?type=choose`,
                  })
            }
        })
       
    },
    onRemarkChange(e){
        const value=e.detail.value;
        this.setData({
            remark:value
        })
    },
    getCheckOrder(){
        const data=this.data;
        return !!data.addressInfo.addressId && !!data.serviceInfo.id && !!data.serviceData.startTime
    
    },
    onSubmit(){
        this.setData({
            submitLoading:true
        })
        Toast.loading({
            message: '确认中...',
            forbidClick: true,
            loadingType: 'spinner',
          });
        const {orderId,serviceData,remark,type,serviceInfo,addressInfo}=this.data;
        const params={
            orderId,
            remark,
            count:type==='hour'?1:serviceData.timeTotal,
            totalPrice:type==='day'?serviceData.timeTotal * serviceInfo.discountPrice :serviceInfo.discountPrice,
            addressId:addressInfo.id,
            serviceStartTime:serviceData.startTime
        }
        comfirmOrder(params).then(()=>{
           Toast.success("正在前往支付...");
           setTimeout(()=>{
               wx.reLaunch({
                 url: `/pages/pay/pay?orderId=${orderId}`,
               })
           },1000)
        }).finally(()=>{
            this.setData({
                submitLoading:false,
            })
        })
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let checkOrderData=wx.getStorageSync('checkOrderData')
        if(checkOrderData && options.orderId){
            checkOrderData.orderId!==options.orderId;
            checkOrderData=null;
        }
        if(Object.keys(options).length > 0 ){
            if(options.orderId){
                this.setData({
                    orderId:options.orderId
                })
                if(!checkOrderData){
                    getOrderInfo(options.orderId).then((res)=>{
                            const serviceInfo=JSON.parse(res.data.serviceCache);
                            const minServiceTime=serviceInfo.minServiceTime;
                            this.setData({
                                serviceInfo,
                                type:serviceInfo.priceType,
                                serviceList:serviceInfo.priceType==='hour'?hourServiceList.map((item)=>{
                                    if(item.dataField==='timeTotal' && minServiceTime){
                                        console.log(`number-${7 - (+minServiceTime || 0)}`)
                                        return {
                                            ...item,
                                            type:`number-${7 - (+minServiceTime || 0)}`
                                        }
                                    }
                                    return item;
                                }):dayServieList,
                                serviceData:{
                                    timeTotal:minServiceTime || '',
                                    timeFormatter:minServiceTime?`${minServiceTime} ${serviceInfo.priceType==='hour'?'小时':'天'}`:'',
                                }

                            })
                    })
                }
            }
            if(options.city){
                const addressInfo={
                    city:options.city,
                    userName:options.userName,
                    street:options.street,
                    phone:options.phone,
                    id:options.id
                }
                if(checkOrderData){
                    this.setData({
                        ...checkOrderData,
                        addressInfo,
                        remark:checkOrderData.remark
                    })
                }else{
                    this.setData({addressInfo})
                }
               
            }
        }
        if(checkOrderData && !options.city && options.orderId){
                this.setData({...checkOrderData,remark:checkOrderData.remark})
        }
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
        console.log('11111111')
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