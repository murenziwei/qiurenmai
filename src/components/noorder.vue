<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="c-topic">待接订单</span>
            </div>
            <div>

                <el-form :inline="true" :model="payplay" class="demo-form-inline">

                    <el-form-item label="任务ID">
                        <el-input v-model="payplay.taskid"></el-input>
                    </el-form-item>


                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>

                <el-table
                        border
                        :data="tableData"
                        style="width: 100%"
                        stripe>

                    <el-table-column
                            prop="taskid"
                            label="任务ID">
                    </el-table-column>
                    <el-table-column
                            prop="keyword"
                            label="搜索关键字">
                    </el-table-column>
                    <el-table-column
                            prop="cash"
                            label="押金">
                    </el-table-column>
                    <el-table-column
                            prop="commission"
                            label="佣金">
                    </el-table-column>

                    <el-table-column
                            prop="good"
                            label="好评类型">
                    </el-table-column>

                    <el-table-column
                            prop="status"
                            label="状态">
                    </el-table-column>
                    <el-table-column
                            label="撤销">
                        <template slot-scope="scope">
                            <el-tag type="success" v-show="scope.row.less">是</el-tag>
                            <el-tag type="error" v-show="!scope.row.less">否</el-tag>
                        </template>
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
                payplay:{taskid:''},
                tableData: [{
                    taskid:'1',
                    keyword:'你妹的',
                    cash:212,
                    commission:2122,
                    good:'非常low',
                    status:'已完成',
                    less:true
                },
                {
                    taskid:'1',
                    keyword:'真么多逻辑',
                    cash:212,
                    commission:2122,
                    good:'非常low',
                    status:'已完成',
                    less:false
                }]
            }
        },
        methods:{
            onSubmit(){}
        }
    }
</script>

<style lang="less" scoped>
.mt-cen{margin:1rem 0;}
</style>