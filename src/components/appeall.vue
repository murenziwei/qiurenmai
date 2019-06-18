<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="c-topic">申诉中心</span>
            </div>
            <div>

                <el-form :inline="true" :model="payplay" class="demo-form-inline">

                    <el-form-item label="申诉种类">
                        <el-select v-model="payplay.appeall">
                            <el-option  v-for="(item,index) in kinds" :value="item.name" :label="item.name" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="申诉状态">

                        <el-select v-model="payplay.status">
                            <el-option v-for="(item,index) in aStatus" :value="item.name"  :label="item.name" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="任务ID">
                        <el-input v-model="payplay.taskid"></el-input>
                    </el-form-item>


                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                        <el-popover
                                placement="top"
                                width="600"
                        >
                            <el-form :model="aform">
                                <div>
                                    <span class="a-topic">发起申诉</span>
                                </div>
                                <el-form-item label="填写订单编号">

                                    <el-input v-model="aform.orderid" placeholder="订单编号"></el-input>
                                </el-form-item>

                                <el-form-item label="选择投诉类型">

                                    <el-select v-model="aform.atype" placeholder="请选择" class="ml1">
                                        <el-option v-for="(item) in atypes" :key="item.text"
                                                   :label="item.text"
                                                   :value="item.text"></el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item label="填写投诉说明">
                                    <el-input
                                            type="textarea"
                                            :rows="5"
                                            placeholder="请输入内容"
                                            v-model="aform.content">
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="添加图片证据">
                                    <div>
                                        <el-upload
                                                action="https://jsonplaceholder.typicode.com/posts/"
                                                list-type="picture-card">
                                            <i class="el-icon-plus"></i>
                                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                        </el-upload>
                                        <el-dialog :visible.sync="dialogVisible">
                                            <img width="100%" :src="dialogImageUrl" alt="" />
                                        </el-dialog>
                                    </div>
                                </el-form-item>
                                <el-divider></el-divider>
                                <el-row style="text-align:right;">
                                    <el-button type="success" icon="el-icon-circle-check">确认提交</el-button>
                                    <el-button type="danger" icon="el-icon-circle-close">取消退出</el-button>
                                </el-row>
                            </el-form>
                            <el-button slot="reference" type="primary" class="ml1">发起申诉</el-button>
                        </el-popover>

                    </el-form-item>
                </el-form>

                <el-table
                        border
                        :data="tableData"
                        style="width: 100%"
                        stripe>

                    <el-table-column
                            prop="aplay"
                            label="申诉进程">
                    </el-table-column>
                    <el-table-column
                            prop="atime"
                            label="申诉时间">
                    </el-table-column>
                    <el-table-column
                            prop="akind"
                            label="申诉种类">
                    </el-table-column>
                    <el-table-column
                            prop="atype"
                            label="申诉类型">
                    </el-table-column>

                    <el-table-column
                            prop="orderid"
                            label="订单id">
                    </el-table-column>

                    <el-table-column
                            prop="isapeople"
                            label="被申诉人id">
                    </el-table-column>

                    <el-table-column
                            prop="pic"
                            label="图片">
                    </el-table-column>

                    <el-table-column
                            prop="content"
                            label="申诉内容">
                    </el-table-column>
                </el-table>

                <div class="mt-cen" style="text-align:center;">
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="100">
                    </el-pagination>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "noorder",
        data(){
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                aform:{
                    orderid:'',
                    atype:'',
                    content:'',

                },
                atypes:[
                    {
                      text:'任务操作问题'

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
                tableData: []
            }
        },
        methods:{
            onSubmit(){}
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