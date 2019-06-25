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
    login(obj){
        return axios.post(`${base.login}/userLogin`,obj)
    },

    /*资金模块*/
    topUpPost(obj){
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.jin}/topUpPost`,obj)
    },
    /*垫付任务管理*/

    feeInfo(obj){
        obj.access_token=localStorage.getItem('token');
        return axios.post(`${base.task}/feeInfo`,obj)
    },

    /*浏览任务管理*/
    //浏览任务管理首页
    browseIndex(){
        return axios.post(`${base.task}/browseIndex`,{
            access_token:localStorage.getItem('token')
        })
    },
    //浏览任务撤销列表
    recallBrowse(){
        return axios.post(`${base.task}/recallBrowse`,{
            access_token:localStorage.getItem('token')
        })
    },

    //浏览任务价格表
    browsePrice(){
        return axios.post(`${base.jin}/recallBrowse`,{
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

    /*拉黑模块*/
    Mblacklist(){
        return axios.post(`${base.member}/blacklist`,{
            access_token:localStorage.getItem('token')
        })
    }

}
export default ports;