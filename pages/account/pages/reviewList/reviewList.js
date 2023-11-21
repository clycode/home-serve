import { delReview, findAllReview } from "../../../../api/review"

// pages/reviewList/reviewList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        reviewList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    //TODO:下拉分页
    onLoad() {
        wx.showLoading({
          title: '加载中',
        })
        findAllReview({page:1,size:999}).then((res=>{
            if(res.data.data && res.data.data.length>0){
                console.log(res.data.data.map((item)=>{
                    return {
                        ...item,
                        service:{
                            ...item.service,
                            imagesUrl:item.service.imagesUrl?JSON.parse(item.service.imagesUrl)[0]:''
                        }
                    }
                }))
                this.setData({reviewList:res.data.data.map((item)=>{
                    return {
                        ...item,
                        service:{
                            ...item.service,
                            imagesUrl:item.service.imagesUrl?JSON.parse(item.service.imagesUrl)[0]:''
                        }
                    }
                })})
            }
            this.setData({reviewList:res.data.data})

        })).finally(()=>{
            wx.hideLoading()
        })
    },
    onDel(e){
        const {reviewList}=this.data;
        const id = e.currentTarget.dataset.id;
        wx.showModal({
          title: '提示',
          content: '确认删除该条评价',
          complete: (res) => {
            if (res.cancel) {
              
            }
        
            if (res.confirm) {
                delReview(id).then(()=>{
                    wx.showToast({
                      title: '删除成功',
                    })
                    console.log(reviewList);
                    console.log(id);
                    console.log('--------------aaa')
                    this.setData({
                        reviewList:reviewList.filter((item)=>item.id!==id)
                    })
                })
            }
          }
        })
      
    },
    toLink(e){
        const link = e.currentTarget.dataset.id;
        wx.navigateTo({
          url: `/pages/service/service?id=${link}`,
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