const successColor='#1296db';
const wranColor='#d81e06'
const infoColor="#666666b0"
export const OrderStatus ={
    //待支付
    'WAIT_PAY':{
        name:'待支付',
        color:successColor,
    },
    //待服务
    'WAIT_SERVICE':{
        name:'待服务',
        color:successColor,
    },
    //待确认
    'WAIT_COMFIRM': {
      name:'待确认',
      color:wranColor,
    },
    //待评价
    'WAIT_EVALUATE':{
        name:'待评价',
        color:successColor,
    },
    "PROGRESS":{
        name:'进行中',
        color:successColor,

    },
    //已完成
    'FINISH' :{
        name:'已完成',
        color:successColor,
    },
    CANCEL:{
        name:'已取消',
        color:infoColor,
    },
    //管理员取消
    'ADMIN_CENCEL':{
        name:'管理员取消',
        color:wranColor,
    },
    //待同意
    'WAIT_AGREE' :{
        name:'待同意',
        color:successColor,
    },
    //取消成功
    'CANCEL_SUCCESS' :{
        name:'取消成功',
        color:successColor,
    },
    //取消失败
    'CANCEL_FAIL':{
        name:'取消失败',
        color:wranColor
    },
  }
  