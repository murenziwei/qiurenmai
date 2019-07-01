<template>
    <div class="virtual">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="c-topic">虚拟币提现</span>
            </div>
            <div class="n-content">
                <p>您当前可提现本金：{{detail.ue_jin}}金币</p>
                <p>可提现佣金：{{detail.commission}}金币</p>
            </div>
            <div class="color1">银行卡： 预计48小时到账</div>

            <div class="input-text">
                <p>本金提现金额:</p>
                <p><el-input v-model.number="money" placeholder="请输入金额"></el-input></p>
                <p><el-button @click="moneyfn">申请提现</el-button></p>
            </div>
            <p class="color1">
                本金满10金币方可提现，会员提现免手续费，非会员提现扣取0.1%手续费
            </p>

            <div class="input-text">
                <p>佣金提现金额:</p>
                <p><el-input v-model.number="commission" placeholder="请输入金额"></el-input></p>
                <p><el-button @click="commisfn">申请提现</el-button></p>
            </div>
            <p class="color1">
                佣金满100金币方可提现，会员提现免手续费，非会员提现扣取10%手续费
            </p>
        </el-card>


        <el-card class="box-card">

            <div>

                <div >
                    <el-table
                            :data="task.data"
                            border
                            style="width: 100%">
                        <el-table-column

                                label="申请时间"
                                width="200"
                        >
                            <template slot-scope="scope">
                                {{new Date(scope.row.create_at*1000).toLocaleString()||'**'}}
                            </template>
                        </el-table-column>
                        <el-table-column label="本金" width="200">

                            <template slot-scope="scope">
                                {{scope.row.money||'**'}}
                            </template>
                        </el-table-column>
                        <el-table-column label="状态" width="200">

                            <template slot-scope="scope">
                                <el-link :type="scope.row.status?'success':'danger'">{{scope.row.status?'已提现':'申请已提交'}}</el-link>
                            </template>
                        </el-table-column>
                        <el-table-column label="开户名" width="200">

                            <template slot-scope="scope">
                                {{scope.row.name||'**'}}
                            </template>
                        </el-table-column>
                        <el-table-column label="开户名" width="200">

                            <template slot-scope="scope">
                                {{scope.row.name||'**'}}
                            </template>
                        </el-table-column>
                        <el-table-column label="转账银行" width="200">

                            <template slot-scope="scope">
                                {{scope.row.bank||'**'}}
                            </template>
                        </el-table-column>
                        <el-table-column

                                label="审核时间"
                                width="200"
                        >
                            <template slot-scope="scope">
                                {{new Date(scope.row.check_at*1000).toLocaleString()||'**'}}
                            </template>
                        </el-table-column>
                    </el-table>

                </div>

                <div class="mt-cen" style="text-align:center;">
                    <el-pagination
                            :current-page.sync="task.current_page"
                            @current-change="bschange"
                            background
                            layout="prev, pager, next"
                            :total="task.last_page*10">
                    </el-pagination>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import ajax from 'axios';
    export default {
        name: 'virtual',
        data(){
            return {
                task:{
                    data:[]
                },
                commission:'',
                money:'',
                detail:{},
                input: ''
            }
        },
        created(){
            ajax.all([this.go_data(),this.go_table()]);
        },
        methods:{
            bschange(e){
                this.go_table(e);
            },

            go_table(page){

                return this.$api.ports.withdrawTable(page).then((res)=>{
                    console.log(res,'fesafawefew');
                    if(res.code){
                        this.task=res.data[0];
                    }else{
                        this.$notify.error(res.message);
                    }
                })
            },


            commisfn(){

                var money=this.commission;
                if(Number(money)){
                    if(money<=this.detail.commission){

                        this.$confirm('再次确认是否提现？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {

                            this.$api.ports.withdMommis({money}).then((res)=>{
                                if(res.code){

                                    this.$notify.success('提现成功');
                                    this.go_data();
                                }else{
                                    this.$notify.error(res.message);
                                }
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消提现'
                            });
                        });
                    }else{
                        this.$notify.error("佣金提现超出最大范围！");
                    }
                }else{
                    this.$notify.error('请填写正确的金额格式！');
                }
            },
            moneyfn(){
                var money=this.money;
                if(Number(money)){
                    if(money<=this.detail.ue_jin){

                        this.$confirm('再次确认是否提现？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {

                            this.$api.ports.withdrawPost({bind_bank_id:this.detail.bind_bank_id,money}).then((res)=>{
                                if(res.code){

                                    this.$notify.success('提现成功');
                                    this.go_table();
                                    this.go_data();
                                }else{
                                    this.$notify.error(res.message);
                                }
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消提现'
                            });
                        });
                    }else{
                        this.$notify.error("本金提现超出最大范围！")
                    }
                }else{
                    this.$notify.error('请填写正确的金额格式！');
                }
            },

            go_data(){
                this.$api.ports.withdrawList().then((res)=>{
                    if(res.code){
                        this.detail=res.data[0];
                        console.log(res,'res,罪域');
                    }

                })
            }
        }
    }
</script>

<style scoped lang="less">
    .mt-cen{
        margin:1rem 0;
    }
    .virtual{

    }
    .color1{
        color: #ccc;
        font-size: 14px;
        margin-bottom: 20px;
        line-height: 30px;
    }
    .n-content{
        display: flex;
        line-height: 40px;
        p{
            margin-right: 20px;
        }
    }
    .input-text{
        display: flex;
        align-items: center;
        p{
            margin-right: 20px;
        }
    }
    .nav-list {
        background: #ccc;
        display: flex;
        text-align: center;
        list-style: none;
        li {
            flex: 1;
            padding: 10px 0;
        }
    }

    .nav-list-item {
        display: flex;
        text-align: center;
        list-style: none;
        align-items: center;
        font-size: 14px;
        li {
            flex: 1;
            padding: 10px 0;
        }
    }
</style>