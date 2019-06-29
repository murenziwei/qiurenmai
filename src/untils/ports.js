import base from './base';//导入接口域名列表
import axios from './https';//导入http中创建的axios案例

const ports={
    /*买手端*/

    /*买手vip模块*/

    //购买vip界面
    vipUI(){
        return axios.post(`${base.vip}/vipUI`,{
            access_token:localStorage.getItem('token')
        })
    },
    //购买会员
    buyVip(obj){
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.vip}/buyVip`,obj)
    },
    /*页面*/
    consumerIndex(){
        return axios.post(`${base.member}/consumerIndex`,{
            access_token:localStorage.getItem('token')
        })
    },
    //页面任务
    consumerTask(page){
        var obj=page?{page}:{};
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.member}/consumerTask`,obj)
    },

    //待完成订单页面

    waitTaskList(page){
        var obj=page?{page}:{};
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.member}/waitTaskList`,obj)
    },

    /*账号管理模块*/

    //绑定账号

    bindBugNo(obj){
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.member}/bindBugNo`,obj)
    },

    //绑定账号列表
    buyNoList(){
        return axios.post(`${base.member}/buyNoList`,{
            access_token:localStorage.getItem('token')
        })
    },

    //绑定账号列表
    doEditbuyNo(obj){
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.member}/doEditbuyNo`,obj)
    },

    //删除绑定账号
    doDelBuyNo(obj){
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.member}/doDelBuyNo`,obj)
    },

    //执行修改绑定账号
    editBuyNo(obj){
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.member}/editBuyNo`,obj)
    },

    /*商家端*/
    /*图片上传*/
    imgupload(){

    },

    //对接线上测试
    register(obj){
        return axios.post(`${base.login}/register`,obj)
    },

    /*登录*/
    login(obj){
        return axios.post(`${base.login}/userLogin`,obj)
    },

    /*资金模块*/
    topUpPost(obj){
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.jin}/topUpPost`,obj)
    },
    getMoney(){
        return axios.post(`${base.jin}/getMoney`,{
            access_token:localStorage.getItem('token')
        })
    },

    /*垫付任务管理*/




    //垫付任务详情
    taskInfo(obj){
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.task}/taskInfo`,obj)
    },

    //填写快递单号
    addPostNo(obj){
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.task}/addPostNo`,obj)
    },


    //任务流程详情
    taskFlow(obj){
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.task}/taskFlow`,obj)
    },

    //确认返款
    confRefund(obj){
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.task}/confRefund`,obj)
    },


    //垫付任务详情头部
    taskInfoHead(obj){
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.task}/taskInfoHead`,obj)
    },

    //垫付任务详情费用
    feeInfo(obj){
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.task}/feeInfo`,obj)
    },

    //商家确认完成
    confFinish(obj){
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.task}/feeInfo`,obj)
    },

    //进行中订单
    feeUnderway(obj){
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.task}/feeUnderway`,obj)
    },
    //已完成订单
    feeFinish(obj){
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.task}/feeFinish`,obj)
    },
    //已撤销订单
    recallTask(obj){
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.task}/recallTask`,obj)
    },

    //待接订单
    feeWait(obj){
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.task}/feeWait`,obj)
    },


    //垫付任务管理首页
    taskIndex(page){
        var obj=page?{page}:{};
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.task}/taskIndex`,obj)
    },

    //垫付任务返款管理
    refTaskInfo(page){
        var obj=page?{page}:{};
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.task}/refTaskInfo`,obj)
    },

    //垫付任务返款管理
    postNoInfo(page){
        var obj=page?{page}:{};
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.task}/postNoInfo`,obj)
    },

    //垫付进行中/垫付历史订单
    underwayTask({page,type}){

        var obj=page?{page}:{};
        obj.type=type||1
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.task}/underwayTask`,obj)
    },

    //垫付任务价格表
    payPriceList(obj){

        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.jin}/payPriceList`,obj)
    },


    //垫付任务撤销
    doRecallTask (obj){
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.task}/doRecallTask `,obj)
    },


    /*浏览任务管理*/
    //浏览任务管理首页
    browseIndex(page){
        var obj=page?{page}:{};
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.task}/browseIndex`,obj)
    },
    //浏览任务撤销列表
    recallBrowse(){
        return axios.post(`${base.task}/recallBrowse`,{
            access_token:localStorage.getItem('token')
        })
    },

    //浏览任务撤销
    doRecallBrowse (obj){
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.task}/doRecallBrowse `,obj)
    },

    //浏览任务价格表
    browsePrice(){
        return axios.post(`${base.jin}/browsePrice`,{
            access_token:localStorage.getItem('token')
        })
    },


    /*店铺模块*/

    //绑定店铺列表
    bindShopList(){
        return axios.post(`${base.shop}/bindShopList`,{
            access_token:localStorage.getItem('token')
        })
    },
    //绑定店铺
    bindShop(obj){
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.shop}/bindShop`,obj)
    },
    //修改店铺页面数据
    editShop(obj){
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.shop}/editShop`,obj)
    },
    //执行修改店铺
    doEditShop(obj){
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.shop}/doEditShop`,obj)
    },
    //修改店铺接单间隔
    editInterval(obj){
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.shop}/editInterval`,obj)
    },
    /*分享链接*/
    shareUrl(){
        return axios.post(`${base.shop}/shareUrl`,{
            access_token:localStorage.getItem('token')
        })
    },

    /*商家任务流程*/
    //发布任务选择店铺列表
    shopList(){
        return axios.post(`${base.task}/shopList`,{
            access_token:localStorage.getItem('token')
        })
    },

    //发布任务
    addTask(obj){
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.task}/addTask`,obj)
    },

    //为任务支付
    payTask(obj){
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.task}/payTask`,obj)
    },

    /*申诉模块*/
    //申诉列表
    complainList(){
        return axios.post(`${base.complain}/complainList`,{
            access_token:localStorage.getItem('token')
        })
    },
    addComplain(obj){
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.complain}/addComplain`,obj)
    },

    /*资金流水记录*/
    jinList(page){
        var obj=page?{page}:{};
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.jin}/jinList`,obj)
    },

    //提现佣金
    withdMommis(obj){

        obj.access_token=localStorage.getItem('token');

        return axios.post(`${base.jin}/withdMommis`,obj)
    },


    /*拉黑模块*/
    //黑名单列表
    Mblacklist(page){
        var obj=page?{page}:{};
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.member}/blacklist`,obj)
    },

    //执行拉黑
    doBlack(obj){
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.member}/doBlack`,obj)
    },

    //删除黑名单
    cancelBlack(obj){
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.member}/cancelBlack`,obj)
    }

}
export default ports;