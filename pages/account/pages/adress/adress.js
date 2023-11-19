import { findAllAddress, removeAddress, updateAddress } from "../../../../api/address"
import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';
import { setPathQuery } from "../../../../untils/common";

// pages/account/pages/adress/adress.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
       addressList:[],
       type:''
    },
    getData(){
        Toast.clear();
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
        });
        findAllAddress().then((res)=>{
            this.setData({
                addressList:res.data
            })
        }).finally(()=>{
            Toast.clear();
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
       const {type}=options;
       Toast.clear();
       this.setData({type})
        this.getData()
    },
    onClick(e){
        if(this.data.type!=='choose')return;
        const id=e.currentTarget.dataset.id;
        const column=this.data.addressList.find((item)=>item.id===id)
        wx.reLaunch({
            url: setPathQuery('/pages/checkOrder/checkOrder',column),
          })
        // wx.setStorage({
        //     key:'choose_address',
        //     data:column
        // }).then(()=>{
        //     wx.reLaunch({
        //       url: '/pages/checkOrder/checkOrder',
        //     })
        // })
        
    },
    onAdd(){
        wx.navigateTo({
          url:`/pages/account/pages/addressInfo/addressInfo?type=${this.data.type}`,
        })
    },
    onChange(e){
        const id=e.currentTarget.dataset.id;

        const isDefault=e.detail;
        updateAddress({id,isDefault}).then(()=>{
            Toast.success("设置成功");
            this.getData();
        })

    },
    onDel(e){

Dialog.confirm({
    title: '提示',
    message: '确认删除该地址',
  })
    .then(() => {
        const id=e.currentTarget.dataset.id;
      removeAddress(id).then(()=>{
          Toast.success("删除成功");
          this.getData();
      })
    })
    .catch(() => {
      // on cancel
    });
       
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