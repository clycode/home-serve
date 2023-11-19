// index.js
import { getAllInfo } from "../../api/infomation";
import {getAllPoster} from "../../api/poster";
import { getService } from "../../api/service";
import {appName} from "../../constant/app"
import dayjs from "dayjs";
Page({
    data:{
        posterList:[],
        serviceList:[],
        infoList:[],
        appName,
        getTime(){
            return '111'
        },
    },
    toAllLink(){
        wx.switchTab({
          url: '/pages/category/category',
        })
    },
    toLink(e){
        const url=e.currentTarget.dataset.link;
        wx.navigateTo({
          url,
        })
        console.log(e);
    },
   
    async getData(){
        const [poserInfo,serviceInfo,infoData]=await Promise.allSettled([getAllPoster(),getService({page:1,size:7}),getAllInfo({page:1,size:1,})])
        const data={}
        if(poserInfo.status==='fulfilled'){
            Object.assign(data,{ posterList:poserInfo.value.data.list})
        }
        if(serviceInfo.status==='fulfilled'){
            Object.assign(data,{serviceList:serviceInfo.value.data.data})
        }
        if(infoData.status==='fulfilled'){
            const infoList=infoData.value.data.list;
            if(infoList && infoList.length > 0){
                const arr=infoList.map((item)=>{
                    return {
                        ...item,
                        createTime:dayjs(item.createTime).format("YYYY-MM-DD hh:mm:ss")
                    }
                })
                Object.assign(data,{infoList:arr})
            }
            
        }
        this.setData(data)
    },
    onLoad(){
        this.getData()
    }
})
