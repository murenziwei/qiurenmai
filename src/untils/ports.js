import base from './base';//导入接口域名列表
import axios from './https';//导入http中创建的axios案例

const ports={

    //对接线上测试
    register(obj){
        return axios.post(`${base.url}/login/register`,obj)
    },
    login(obj){
        return axios.post(`${base.url}/login/userLogin`,obj)
    },

    //绑定店铺列表
    bindShopList(){
        return axios.post(`${base.url}/Shop/bindShopList`,{
            access_token:localStorage.getItem('token')
        })
    }
}
export default ports;