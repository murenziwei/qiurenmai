import base from './base';//导入接口域名列表
import axios from './https';//导入http中创建的axios案例

const ports={
    //测试
    test(){
        return axios.get(`${base.url}port/test`)
    }
}
export default ports;