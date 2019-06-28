<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="c-topic">申诉中心</span>
            </div>
            <div>

                <el-form :inline="true" :model="payplay" class="demo-form-inline">

                    <!--<el-form-item label="申诉种类">-->
                        <!--<el-select v-model="payplay.appeall">-->
                            <!--<el-option  v-for="(item,index) in kinds" :value="item.name" :label="item.name" :key="index"></el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="申诉状态">-->

                        <!--<el-select v-model="payplay.status">-->
                            <!--<el-option v-for="(item,index) in aStatus" :value="item.name"  :label="item.name" :key="index"></el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="任务ID">-->
                        <!--<el-input v-model="payplay.taskid"></el-input>-->
                    <!--</el-form-item>-->


                    <el-form-item>
                        <!--<el-button type="primary" @click="onSubmit">查询</el-button>-->
                        <el-popover
                                placement="top"
                                width="600"
                        >
                            <el-form :model="aform" ref="aform" :rules="arules">
                                <div>
                                    <span class="a-topic">发起申诉</span>
                                </div>
                                <el-form-item label="填写订单编号" prop="son_task_id">

                                    <el-input v-model="aform.son_task_id" placeholder="订单编号" type="son_task_id"></el-input>
                                </el-form-item>

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
                                    <!--<el-button type="danger" icon="el-icon-circle-close">取消退出</el-button>-->
                                </el-row>
                            </el-form>
                            <el-button slot="reference" type="primary" class="ml1">发起申诉</el-button>
                        </el-popover>

                    </el-form-item>
                </el-form>

                <el-table
                        border
                        :data="tableData.data"
                        style="width: 100%"
                        stripe>

                    <el-table-column

                            label="申诉进程">
                        <template slot-scope="scope">
                            {{scope.row.status?'待查看':'已处理'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="atime"
                            label="申诉时间">
                        <template  slot-scope="scope">
                            {{new Date(scope.row.create_at*1000).toLocaleString()}}
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="申诉类型">

                        <template  slot-scope="scope">
                            {{scope.row.type|typefn}}
                        </template>
                    </el-table-column>

                    <el-table-column
                            prop="son_task_id"
                            label="订单id">
                    </el-table-column>

                    <el-table-column
                            prop="user_id"
                            label="被申诉人id">
                    </el-table-column>

                    <el-table-column
                            label="图片1">
                        <template slot-scope="scope">
                            <lw-img :src-data="scope.row.img1"></lw-img>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="图片2">
                        <template slot-scope="scope">
                            <lw-img :src-data="scope.row.img2"></lw-img>
                        </template>
                    </el-table-column>

                    <el-table-column
                            prop="note"
                            label="申诉内容">
                    </el-table-column>
                </el-table>


                <div class="mt-cen" style="text-align:center;">
                    <el-pagination
                            :current-page.sync="tableData.current_page"
                            @current-change="bschange"
                            background
                            layout="prev, pager, next"
                            :total="tableData.last_page*10">
                    </el-pagination>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>

    import ajax from 'axios';

    export default {
        name: "noorder",
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
                aStatus:[
                    {
                        name:'全部'
                    },

                    {
                        name:'处理中'
                    },

                    {
                        name:'已完成'
                    },
                ],
                kinds:[

                    {
                        name:'全部'
                    },
                    {
                        name:'申诉我的'
                    },
                    {
                        name:'我申诉的'
                    }

                ],
                payplay:{taskid:'',status:'',appeall:''},
                tableData: [],


                token:localStorage.getItem('token')||(()=>{this.$route.replace('/login')})()
            }
        },
        filters:{
            typefn:function(value){

                var del='--';
                switch (value){
                    case 1:del='买手未按要求操作';break;
                    case 2:del='买手退款';break;
                    case 3:del='买手给差评';break;
                    case 4:del='金额有误';break;
                    case 5:del='其它';break;
                }
                return del;
            }
        },
        created(){
            ajax.all([this.go_list()]);
        },
        methods:{

            imgSuccess(response, file, fileList){
                    this.aform.imgs=fileList;
            },
            imgRemove(file, fileList){
                    this.aform.imgs=fileList;
            },

            //重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            bschange(ee){
                this.go_list(ee);
            },

            go_list(){
                return this.$api.ports.complainList().then((res)=>{
                    console.log(res,'res');
                    if(res.code){
                        this.tableData=res.data[0];
                    }else{
                        this.$message.error(res.message);
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
                            son_task_id:getR.son_task_id,
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
            }
        }
    }
</script>

<style lang="less" scoped>
.a-topic{
    font-size:1rem;
    color:#000;
    font-weight:bold;
}
.mt-cen{margin:1rem 0;}
.ml1{
    margin-left:1rem;
}
</style>