// pages/account/pages/addressInfo/addressInfo.js
import { areaList } from '@vant/area-data';
import Toast from '@vant/weapp/toast/toast';
import { createAddress, findOneAddress, updateAddress } from '../../../../api/address.js';
import { phoneTips } from '../../../../constant/tips.js';
import { phoneReg } from '../../../../regex/index';
import { isLogin } from '../../../../untils/common.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        addressId:'',
        type:'',
        areaList,
        pickerShow:false,
        userName:'',
        city:'',
        street:'',
        phone:'',
        isDefault:false,
        loading:false
    },
    onClickInput(){
        this.setData({pickerShow:true})
    },
    onAreaConfirm(e){
        const city=e.detail.values.reduce((pre,item)=>{
            if(!pre.includes(item.name)){
                return pre+item.name;
            }
            return pre
        },'')
        this.setData({city,pickerShow:false})
    },
    onChange(e){
        this.setData({
            isDefault:e.detail
        })
    },
    onSunmit(){
        const {userName,city,street,phone,isDefault,addressId}=this.data;
        let tips=''
        if(!street){
            tips="请输入详细地址"
        }
        if(!city){
            tips="请选择所在地区"
        }
        if(!userName){
            tips="请输入用户名"
        }
        if(!phoneReg.test(phone)){
            tips=phoneTips;
        }
        
        if(tips){
            Toast(tips)
            return;
        }
        const params={
            userName,
            city,
            street,
            phone,
            isDefault
        }
        this.loading=true
        Toast.loading({
            message: '保存...',
            forbidClick: true,
          });
          const api=addressId?updateAddress:createAddress;
          if(addressId){
              Object.assign(params,{id:addressId})
          }
        api(params).then(()=>{
            Toast.success('保存成功');
            setTimeout(()=>{
                wx.reLaunch({
                    url: `/pages/account/pages/adress/adress?type=${this.data.type}`,
                  })
            },1000)
        }).finally(()=>{
            Toast.clear();
        })
        
    },
    onCancel(){
        this.setData({pickerShow:false})
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if(Object.keys(options).length > 0){
            const id=options.id;
            this.setData({type:options.type,addressId:id})
            if(id){
                findOneAddress(id).then((res)=>{
                    console.log(res.data);
                    this.setData(res.data)
                })
            }
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