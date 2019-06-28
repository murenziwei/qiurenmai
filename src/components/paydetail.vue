<template>
    <div class="paydetail">
        <el-card>
            <div slot="header" class="header">
                <span class="b-t">
                    {{userInfo[0].task_type|shoptype}}
                </span>
                <div class="b-right">
                    <el-breadcrumb separator-class="el-icon-reading">
                        <el-breadcrumb-item>订单编号：{{userInfo[0].task_id||'***'}}</el-breadcrumb-item>
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

                                    label="用户ID">
                                <template slot-scope="scope">
                                    <span>{{scope.row.user_id}}</span>

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
                                                        v-model="textarea"  maxlength="800">
                                                </el-input>
                                            </el-form-item>
                                            <el-row class="mt1" type="flex" align="middle" justify="space-around">
                                                <el-button @click="go_db(scope.row.user_id)"><i class="el-icon-circle-check"></i>确认提交</el-button>
                                            </el-row>
                                        </el-form>
                                        <el-button slot="reference" type="text">拉黑</el-button>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="淘宝买号">
                                <template slot-scope="scope">
                                    {{scope.row.wangwang_id||'**'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="ue_account"
                                    label="用户手机">

                                <template slot-scope="scope">
                                    <span>{{scope.row.ue_account|strno}}</span>

                                    <el-popover
                                            placement="bottom"
                                            title="查看用户联系方式"
                                            width="400"
                                            trigger="click"
                                    >

                                        <p>
                                            完整手机号：<el-link type="danger" :underline="false" >{{scope.row.ue_account}}</el-link>
                                        </p>
                                        <p>
                                            买手ID：<el-link :underline="false" >{{scope.row.user_id}}</el-link>
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
                                    <span>{{scope.row.qq_no|strno}}</span>

                                    <el-popover
                                            placement="left"
                                            title="查看用户联系方式"
                                            width="400"
                                            trigger="click"
                                    >
                                        <p>
                                            完整qq号：<el-link type="danger" :underline="false" >{{scope.row.qq_no}}</el-link>
                                        </p>
                                        <p>
                                            买手ID：<el-link :underline="false" >{{scope.row.user_id}}</el-link>
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
                <!--<div class="pd-list">-->
                    <!--<div class="p-l-frame">-->
                        <!--<div class="">-->
                            <!--<el-button class="f-r" type="text" @click="controlfn">-->
                                <!--{{tstatus?'编辑':'保存'}}-->
                            <!--</el-button>-->
                            <!--<p class="plf-topic">备注</p>-->
                        <!--</div>-->
                        <!--<div>-->
                            <!--<el-input-->
                                    <!--type="textarea"-->
                                    <!--:rows="5"-->
                                    <!--placeholder="请输入内容"-->
                                    <!--v-model="textarea" :disabled="tstatus">-->
                            <!--</el-input>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->

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
                                            强烈建议您申诉前尽量先自行电话(<el-link>{{userInfo[0].ue_account}}</el-link><el-button type="text"><span v-text="getphone"></span></el-button>)联系用户解决做任务中出现的问题
                                        </el-link>
                                        <el-row class="mt1" type="flex" align="middle" justify="space-around">
                                            <el-button type="error" @click="popShow">依然申诉</el-button>
                                            <el-button type="success" @click="appealfn">取消申诉</el-button>
                                        </el-row>
                                    </el-form>
                                    <el-button slot="reference" type="success">发起申诉</el-button>
                                </el-popover>
                            </div>
                            <p class="plf-topic">操作进展</p>
                        </div>
                        <div style="padding:1rem 0;">
                            <table class="d-table" >
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
                                         搜索列表
                                      </td>
                                      <td>
                                          用户
                                      </td>
                                      <td>
                                          <el-row type="flex" align="middle" justify="center">
                                              {{userInfo[0].imgs?(userInfo[0].imgs.create_at|times):"**"}} <i class="el-icon-success"></i>
                                          </el-row>
                                      </td>
                                      <td>
                                          <template v-for="(fval) in (userInfo[0].imgs?userInfo[0].imgs.search_img:[])">
                                              <lw-img :src-data="fval"></lw-img>
                                          </template>
                                          <template v-if="!(userInfo[0].imgs?userInfo[0].imgs.search_img.length:false)">没有数据</template>

                                      </td>
                                  </tr>

                                  <tr>
                                      <td>
                                          货比三家
                                      </td>
                                      <td>
                                          用户
                                      </td>
                                      <td>
                                          <el-row type="flex" align="middle" justify="center">
                                              {{userInfo[0].imgs?(userInfo[0].imgs.create_at|times):"**"}} <i class="el-icon-success"></i>
                                          </el-row>
                                      </td>
                                      <td>
                                          <template v-for="(fval) in (userInfo[0].imgs?userInfo[0].imgs.record_img:[])">
                                              <lw-img :src-data="fval"></lw-img>
                                          </template>
                                          <template v-if="!(userInfo[0].imgs?userInfo[0].imgs.record_img.length:false)">没有数据</template>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td>
                                          浏览店铺及目标商品
                                      </td>
                                      <td>
                                          用户
                                      </td>
                                      <td>
                                          <el-row type="flex" align="middle" justify="center">
                                              {{userInfo[0].imgs?(userInfo[0].imgs.create_at|times):"**"}} <i class="el-icon-success"></i>
                                          </el-row>
                                      </td>
                                      <td>
                                          <template v-for="(fval) in (userInfo[0].imgs?userInfo[0].imgs.shopping_trolley_img:[])">
                                              <lw-img :src-data="fval"></lw-img>
                                          </template>
                                          <template v-if="!(userInfo[0].imgs?userInfo[0].imgs.shopping_trolley_img.length:false)">没有数据</template>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td>
                                          收藏和关注截图1
                                      </td>
                                      <td>
                                          用户
                                      </td>
                                      <td>
                                          <el-row type="flex" align="middle" justify="center">
                                              {{userInfo[0].imgs?(userInfo[0].imgs.create_at|times):"**"}} <i class="el-icon-success"></i>
                                          </el-row>
                                      </td>
                                      <td>
                                          <template v-for="(fval) in (userInfo[0].imgs?userInfo[0].imgs.follow_img:[])">
                                              <lw-img :src-data="fval"></lw-img>
                                          </template>
                                          <template v-if="!(userInfo[0].imgs?userInfo[0].imgs.follow_img.length:false)">没有数据</template>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td>
                                          收藏和关注截图2
                                      </td>
                                      <td>
                                          用户
                                      </td>
                                      <td>
                                          <el-row type="flex" align="middle" justify="center">
                                              {{userInfo[0].imgs?(userInfo[0].imgs.create_at|times):"**"}} <i class="el-icon-success"></i>
                                          </el-row>
                                      </td>
                                      <td>
                                          <template v-for="(fval) in (userInfo[0].imgs?userInfo[0].imgs.favorites_img:[])">
                                              <lw-img :src-data="fval"></lw-img>
                                          </template>
                                          <template v-if="!(userInfo[0].imgs?userInfo[0].imgs.favorites_img.length:false)">没有数据</template>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td>
                                          下单和支付截图
                                      </td>
                                      <td>
                                          用户
                                      </td>
                                      <td>
                                          <el-row type="flex" align="middle" justify="center">
                                              {{userInfo[0].imgs?(userInfo[0].imgs.create_at|times):"**"}} <i class="el-icon-success"></i>
                                          </el-row>
                                      </td>
                                      <td>
                                          <template v-for="(fval) in (userInfo[0].imgs?userInfo[0].imgs.order_img:[])">
                                              <lw-img :src-data="fval"></lw-img>
                                          </template>
                                          <template v-if="!(userInfo[0].imgs?userInfo[0].imgs.order_img.length:false)">没有数据</template>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td>
                                          下单和支付截图
                                      </td>
                                      <td>
                                          用户
                                      </td>
                                      <td>
                                          <el-row type="flex" align="middle" justify="center">
                                              {{userInfo[0].imgs?(userInfo[0].imgs.create_at|times):"**"}} <i class="el-icon-success"></i>
                                          </el-row>
                                      </td>
                                      <td>
                                          <template v-for="(fval) in (userInfo[0].imgs?userInfo[0].imgs.order_img:[])">
                                              <lw-img :src-data="fval"></lw-img>
                                          </template>
                                          <p>
                                              用户提交单号：{{userInfo[0].tao_order_no||'**'}}
                                          </p>
                                      </td>
                                  </tr>

                                  <tr>
                                      <td>
                                          商家返款
                                      </td>
                                      <td>
                                          商家
                                      </td>
                                      <td>
                                          <el-row type="flex" align="middle" justify="center">
                                              {{userInfo[0].refund_at?(userInfo[0].refund_at|times):"**"}} <i class="el-icon-success"></i>
                                          </el-row>
                                      </td>
                                      <td>
                                          <p>
                                              需返金额：{{userInfo[0].cash_pledge||'**'}}元
                                          </p>
                                          <p>
                                              实返金额：{{userInfo[0].real_pay||'**'}}元
                                          </p>

                                          <p>
                                              实返模式：平台系统返款
                                          </p>

                                      </td>
                                  </tr>

                                  <tr>
                                      <td>
                                          商家发货
                                      </td>
                                      <td>
                                          商家
                                      </td>
                                      <td>
                                          <el-row type="flex" align="middle" justify="center">
                                              {{userInfo[0].refund_at?(userInfo[0].post_at|times):"**"}} <i class="el-icon-success"></i>
                                          </el-row>
                                      </td>
                                      <td>
                                          <p>
                                              快递单号：{{userInfo[0].post_no||'**'}}元
                                          </p>

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
            <el-dialog :visible.sync="centerDialogVisible"
                       modal
                       close-on-click-modal
                       custom-class="dialog">
                <div>
                    <el-form :model="aform" ref="aform" :rules="arules">

                        <el-form-item label="选择投诉类型"  prop="type">

                            <el-select v-model="aform.type" placeholder="请选择" class="ml1" type="type">
                                <el-option v-for="(item) in atypes" :key="item.text"
                                           :label="item.text"
                                           :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="填写投诉说明" prop="note">
                            <el-input
                                    type="note"
                                    :rows="5"
                                    placeholder="请输入内容"
                                    v-model="aform.note">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="添加图片证据">
                            <div>
                                <el-upload
                                        action="/api/Other/upload"
                                        :data="{access_token:token}"
                                        :on-success="imgSuccess" :on-remove="imgRemove"
                                        list-type="picture-card"
                                        accept="image/*"
                                        :limit="2"
                                >
                                    <i class="el-icon-plus"></i>
                                    <div slot="tip" class="el-upload__tip">最多只能上传2张！</div>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="" />
                                </el-dialog>
                            </div>
                        </el-form-item>
                        <el-divider></el-divider>
                        <el-row style="text-align:right;">
                            <el-button type="success" icon="el-icon-circle-check" @click="onSubmit('aform')">确认提交</el-button>
                        </el-row>
                    </el-form>
                </div>
            </el-dialog>
            <end></end>
        </div>
    </div>
</template>

<script>
    import ajax from 'axios';
    import end from '../components/end'
    export default {
        name: "paydetail",
        props:['id'],
        data(){
            return {

                arules:{
                    son_task_id:[
                        {required:true,message:'请输入订单编号',trigger:'blur'}
                    ],
                    type:[
                        {required:true,message:'请选择投诉类型',trigger:'blur'}
                    ],

                    note:[
                        {required:true,message:'填写投诉说明',trigger:'blur'}
                    ],
                },

                token:localStorage.getItem('token')||(()=>{this.$route.replace('/login')})(),

                dialogImageUrl: '',
                dialogVisible: false,
                aform:{
                    son_task_id:'',
                    type:'',
                    note:'',
                    imgs:[]
                },
                atypes:[
                    {
                        text:'买手未按要求操作',
                        value:1
                    },
                    {
                        text:'买手退款',
                        value:2
                    },
                    {
                        text:'买手给差评',
                        value:3
                    },
                    {
                        text:'金额有误',
                        value:4
                    },
                    {
                        text:'其它',
                        value:5
                    }
                ],

                centerDialogVisible:false,

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
        created(){
            ajax.all([this.go_detail(this.id)]);
        },
        filters:{
            times:function(value){
                return new Date(value*1000).toLocaleString();
            },

            strno:function(value){
                if(typeof value=='string'&&value.length>4){
                    var arr=value.split('');
                    arr.splice(-4);
                    value=arr.join('');
                    value+='***';
                    return value;
                }else{
                    return '***'
                }
            },
            shoptype:function(value){
                var del='**';
                switch (value){
                    case 1:del='淘宝任务';break;
                    case 2:del='淘口令任务';break;
                    case 3:del='预售任务';break;
                    case 4:del='拼多多任务';break;
                    case 5:del='浏览任务';break;
                }
                return del;
            },
            statusfn:function(value){

                var del='--';
                switch (value){
                    case 1:del='未接单';break;
                    case 2:del='待操作';break;
                    case 3:del='待返款发货';break;
                    case 4:del='待评价';break;
                    case 5:del='待确认';break;
                    case 6:del='已完成';break;
                }
                return del;
            },
        },
        methods:{

            imgSuccess(response, file, fileList){
                this.aform.imgs=fileList;
            },
            imgRemove(file, fileList){
                this.aform.imgs=fileList;
            },


            onSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var getR=this.aform,img1='',img2='';

                        if(getR.imgs[0]){

                            img1=getR.imgs[0].response.data[0].filePath
                        }

                        if(getR.imgs[1]){
                            img2=getR.imgs[1].response.data[0].filePath;
                        }

                        var obj={
                            son_task_id:this.userInfo[0].task_id||'',
                            type:getR.type,
                            note:getR.note,
                            img1,
                            img2
                        }

                        this.go_ac(obj);

                    } else {
                        return false;
                    }
                });
            },

            popShow(){
                console.log('你好');
                this.centerDialogVisible=true;
            },
            //拉黑
            go_db(block_id){

                this.$confirm('再次确认是否拉黑？?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var value=this.textarea;
                    this.$api.ports.doBlack({block_id,reason:value||''}).then((res)=>{
                        if(res.code){

                            this.$notify.success('拉黑成功');

                            setTimeout(()=>{

                                this.$router.go(0);
                            },500)
                        }else{
                            this.$notify.error(res.message);
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消拉黑'
                    });
                });
            },
            go_detail(id){
                return this.$api.ports.taskFlow({id}).then((res)=>{
                    console.log(res,'go_detail')
                    if(res.code){
                        this.userInfo=res.data;
                    }else{
                        this.$notify.error(res.message);
                    }
                })
            },

            //执行申诉
            go_ac(obj){

                this.$confirm('此申诉操作将无法撤销, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error'
                }).then(() => {

                    this.$api.ports.addComplain(obj).then((res)=>{
                        if(res.code){
                            this.$notify.success('提交成功')
                            setTimeout(()=>{

                                this.$router.go(0);
                            },500)
                        }else{
                            this.$notify.error(res.message);
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消申诉'
                    });
                });
            },
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
.d-table{

    width:100%;text-align:center;
    line-height:3;
    border-collapse: collapse;
    th,td{
        border:1px dashed #999;
    }
}


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