import base from './base';//导入接口域名列表
import axios from './https';//导入http中创建的axios案例

const ports={
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
    Mblacklist(){
        return axios.post(`${base.member}/blacklist`,{
            access_token:localStorage.getItem('token')
        })
    }

}
export default ports;