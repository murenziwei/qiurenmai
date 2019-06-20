<template>
    <div class="paydetail">
        <el-card>
            <div slot="header" class="header">
                <span class="b-t">
                    用户垫付详情 (新版手机淘宝任务 普通好评 )
                </span>
                <div class="b-right">
                    <el-breadcrumb separator-class="el-icon-reading">
                        <el-breadcrumb-item>订单编号：212121</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>

            </div>
            <div>
                <div class="pd-list">
                    <div class="p-l-frame">
                        <div class="">
                            <p class="plf-topic">用户信息</p>
                        </div>
                        <el-table
                                :data="userInfo"
                                border
                                style="width: 100%">
                            <el-table-column

                                    label="ID">
                                <template slot-scope="scope">
                                    <span>{{scope.row.id}}</span>

                                    <el-popover
                                            placement="bottom"
                                            title="添加黑名单"
                                            width="400"
                                            trigger="click"
                                            >
                                        <el-form>
                                            <el-form-item label="原因">

                                                <el-input
                                                        type="textarea"
                                                        :rows="5"
                                                        placeholder="请简单描述拉黑原因，非必填，最多800字"
                                                        v-model="textarea"  max="800">
                                                </el-input>
                                            </el-form-item>
                                            <el-row class="mt1" type="flex" align="middle" justify="space-around">
                                                <el-button ><i class="el-icon-circle-check"></i>确认提交</el-button>
                                            </el-row>
                                        </el-form>
                                        <el-button slot="reference" type="text">拉黑</el-button>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="用户名">
                            </el-table-column>
                            <el-table-column
                                    prop="tb"
                                    label="淘宝买号">
                            </el-table-column>
                            <el-table-column
                                    prop="terminal"
                                    label="下单终端">
                            </el-table-column>
                            <el-table-column
                                    prop="phone"
                                    label="用户手机">

                                <template slot-scope="scope">
                                    <span>{{scope.row.phone}}</span>

                                    <el-popover
                                            placement="bottom"
                                            title="查看用户联系方式"
                                            width="400"
                                            trigger="click"
                                    >

                                        <p>
                                            完整手机号：<el-link type="danger" :underline="false" >{{scope.row.phone}}</el-link>
                                        </p>
                                        <p>
                                            买手ID：<el-link :underline="false" >{{scope.row.id}}</el-link>
                                        </p>
                                        <p>
                                            <el-link type="danger">如无法取得联系，申诉用户并申请平台介入，工作人员会处理</el-link>
                                        </p>
                                        <el-button slot="reference" type="text">查看完整号码</el-button>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="用户QQ号">
                                <template slot-scope="scope">
                                    <span>{{scope.row.qq}}</span>

                                    <el-popover
                                            placement="left"
                                            title="查看用户联系方式"
                                            width="400"
                                            trigger="click"
                                    >
                                        <p>
                                            完整qq号：<el-link type="danger" :underline="false" >{{scope.row.qq}}</el-link>
                                        </p>
                                        <p>
                                            买手ID：<el-link :underline="false" >{{scope.row.id}}</el-link>
                                        </p>
                                        <p>
                                            <el-link type="danger">如无法取得联系，申诉用户并申请平台介入，工作人员会处理</el-link>
                                        </p>
                                        <el-button slot="reference" type="text">查看完整QQ</el-button>
                                    </el-popover>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="pd-list">
                    <div class="p-l-frame">
                        <div class="">
                            <el-button class="f-r" type="text" @click="controlfn">
                                {{tstatus?'编辑':'保存'}}
                            </el-button>
                            <p class="plf-topic">备注</p>
                        </div>
                        <div>
                            <el-input
                                    type="textarea"
                                    :rows="5"
                                    placeholder="请输入内容"
                                    v-model="textarea" :disabled="tstatus">
                            </el-input>
                        </div>
                    </div>
                </div>

                <div class="pd-list">
                    <div class="p-l-frame">

                        <div>
                            <div class="f-r">

                                <el-popover
                                        placement="left"
                                        title="查看用户联系方式"
                                        width="400"
                                        trigger="click"
                                        v-model="appealStatus"
                                >
                                    <el-form>

                                        <el-link type="danger" class="mt1" :underline="false">
                                            强烈建议您申诉前尽量先自行电话(<el-button type="text"><span v-text="getphone"></span></el-button>)联系用户解决做任务中出现的问题
                                        </el-link>
                                        <el-row class="mt1" type="flex" align="middle" justify="space-around">
                                            <el-button type="error">依然申诉</el-button>
                                            <el-button type="success" @click="appealfn">取消申诉</el-button>
                                        </el-row>
                                    </el-form>
                                    <el-button slot="reference" type="success">发起申诉</el-button>
                                </el-popover>
                            </div>
                            <p class="plf-topic">操作进展</p>
                        </div>
                        <div>
                            <table style="width:100%;text-align:center;">
                                <thead>
                                  <tr>
                                      <th>
                                          任务步骤
                                      </th>
                                      <th>
                                          操作者
                                      </th>
                                      <th>
                                          操作时间
                                      </th>
                                      <th>内容</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                      <td>
                                         商家返款
                                      </td>
                                      <td>
                                          用户
                                      </td>
                                      <td>
                                          <el-row type="flex" align="middle" justify="center">
                                              2019-06-10 14:55:30 <i class="el-icon-success"></i>
                                          </el-row>
                                      </td>
                                      <td>
                                          <div>
                                              <p>
                                                  需返金额：96.00元
                                              </p>
                                              <p>
                                                  实返金额：96.00元
                                              </p>
                                              <p>
                                                  返款模式： 平台系统返款
                                              </p>
                                          </div>
                                      </td>
                                  </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
        <div>
            <end></end>
        </div>
    </div>
</template>

<script>
    import end from '../components/end'
    export default {
        name: "paydetail",
        data(){
            return {
                appealStatus:false,
                getphone:'获取用户电话',
                tstatus:true,
                textarea:'',
                userInfo:[
                    {
                        id:'28392832',
                        name:'木人子韦',
                        tb:'47892788282',
                        phone:'1008611***',
                        qq:'110***'
                    }
                ]
            }
        },
        methods:{
            appealfn(){
                this.appealStatus=!this.appealStatus;
            },
            controlfn(){
                this.tstatus=!this.tstatus;
            }
        },
        components:{
            end
        }
    }
</script>

<style lang="less" scoped>
.font1-2{
    font-size:1.2rem;
}
.mt1{
    margin:1rem 0;
}
.plf-topic{
    text-align:left;
    font-size:1.1rem;
    font-weight:bold;
}
.f-r{
    float:right;
}
.header{
    display:flex;
    align-items:center;
    justify-content:space-between;
}
.b-t{
    font-size:1.5rem;
    font-weight:bold;

}
.b-right{
    text-align:right;
}
</style>