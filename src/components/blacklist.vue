<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="c-topic">黑名单</span>
            </div>
            <div>

                <el-form :inline="true" :model="payplay" class="demo-form-inline">

                    <el-form-item label="用户ID">
                        <el-input v-model="payplay.userid"></el-input>
                    </el-form-item>


                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>

                <el-table
                        border
                        :data="tableData.data"
                        style="width: 100%"
                        stripe>

                    <el-table-column
                            prop="create_at"
                            label="拉黑时间">
                    </el-table-column>
                    <el-table-column
                            prop="id"
                            label="用户id">
                    </el-table-column>
                    <el-table-column
                            prop="reason"
                            label="拉黑原因">
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary">拉黑</el-button>
                            <el-button size="mini" type="primary">删除</el-button>
                        </template>
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
                payplay:{userid:''},
                tableData: []
            }
        },
        created(){
            ajax.all([this.go_list()]);
        },
        methods:{
            bschange(ee){
                this.go_list(ee);
            },

            go_list(){
                return this.$api.ports.Mblacklist().then((res)=>{
                    console.log(res,'res');
                    if(res.code){
                        this.tableData=res.data[0];
                    }else{
                        this.$message.error(res.message);
                    }
                })
            },
            onSubmit(){}
        }
    }
</script>

<style lang="less" scoped>
.mt-cen{margin:1rem 0;}
</style>