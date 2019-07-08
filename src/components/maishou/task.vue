<template>
    <div class="notice">

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="c-topic">任务列表</span>
            </div>
            <div class="n-content">
                <h3>所有买手都要注意在接受任务必须严格控制好以下两点：</h3>
                <p>1、请买手遵守平台规则，按照任务步骤中的提示完成任务，不得违规操作；如有违反，我们有权 利对买手进行处罚</p>
                <p>2、接受任务后，请2个小时内完成任务，超过时间则取消任务扣除一个虚拟币（考虑清楚后再接）</p>
            </div>
        </el-card>


        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="c-topic">第一步：选择任务类型</span>
            </div>
            <div class="n-content">
                <div>
                    <el-radio-group v-model="radio1">
                        <el-radio-button v-for="(tv,ti) in typelist" :key="ti" :label="ti">{{tv}}</el-radio-button>
                    </el-radio-group>
                </div>
                <div class="margin-top">
                    <h3>请选择平台类型</h3>
                    <el-radio-group v-model="radio2">
                        <el-radio-button  v-for="(av,ai) in appList" :key="ai" :label="av.ind">{{av.name}}</el-radio-button>
                    </el-radio-group>
                </div>
                <div class="margin-top">
                    <h3>请选择任务类型</h3>
                    <el-radio-group v-model="radio3">

                        <el-radio-button label="1" v-for="(tv) in taskList[radio1]" :label="tv.label" v-if="tv.type==radio2">
                            {{tv.name}}
                        </el-radio-button>
                    </el-radio-group>
                </div>
            </div>
        </el-card>


        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="c-topic">第二步：请选择账号</span>
            </div>
            <div class="n-content">
                <div>
                    <el-radio-group v-model="bank1">
                        <el-radio v-for="(sval,sind) in shopData" :key="sind" :label="sval.wang_id" v-if="sval.platform_type==radio2">
                            {{sval.wang_id}}
                        </el-radio>
                    </el-radio-group>

                    <div class="addAccount">
                        <el-link type="primary" :underline="false" :href="'#/maishou/account/binding'">

                            <i class="el-icon-plus"></i>
                            添加账号
                        </el-link>
                    </div>
                </div>
            </div>
        </el-card>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="c-topic">第三步：请选择任务</span>
            </div>
            <div>

                <el-table class="mt1" border :data="dataTable.data" style="width:100%;">
                    <el-table-column label="总任务ID" prop="id" width="200"></el-table-column>
                    <el-table-column label="任务总数" prop="task_num" width="200"></el-table-column>
                    <el-table-column label="商家" prop="shop_wang_id" width="200"></el-table-column>
                    <el-table-column label="购买件数" prop="goods_count" width="200"></el-table-column>
                    <el-table-column label="买手需垫付资金" prop="every_cash_pledge" width="200"></el-table-column>
                    <el-table-column label="佣金" prop="real_commission" width="200"></el-table-column>
                    <el-table-column label="已完成（%）" prop="take_rate" width="200"></el-table-column>

                    <el-table-column label="修改" prop="set" width="100" fixed="right">
                        <template slot-scope="scope">
                            <el-row >
                                <el-link type="danger" :underline="false" v-if="scope.row.status">已接受</el-link>
                                <el-button type="text" @click="acceptTask(scope.row.id,scope.row.status)" v-else>接受任务</el-button>
                            </el-row>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="mt-cen" style="text-align:center;">
                    <el-pagination
                            small
                            :current-page.sync="dataTable.current_page"
                            @current-change="bschange"
                            background
                            layout="prev, pager, next"
                            :total="dataTable.last_page*10">
                    </el-pagination>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import ajax from 'axios';
    export default {
        name: "notice",
        data() {
            return {
                bank1:'',

                dataTable:[],

                typelist:[
                    '垫付任务','预览任务'
                ],
                appList:[
                    {
                        name:'淘宝',
                        ind:1
                    },
                    {
                        name:'拼多多',
                        ind:3
                    }
                ],
                //1淘宝任务2淘口令任务3预售任务4拼多多任务5浏览任务
                taskList:[
                    [
                        {
                            name:'淘宝任务',
                            label:1,
                            type:1
                        },
                        {
                            name:'淘口令任务',
                            label:2,
                            type:1
                        },
                        {
                            name:'预售任务',
                            label:3,
                            type:1
                        },
                        {
                            name:'拼多多',
                            label:4,
                            type:3
                        },
                    ],
                    [
                        {
                            name:'预览任务',
                            label:5,
                            type:1
                        }
                    ]

                ],

                shopData:[],
                count: 10,
                loading: false,
                arr: [
                    {name: 'first', val: []},
                    {name: 'first', val: []},
                ],
                dialogVisible: false,
                radio: 3,
                radio1: 0,
                radio2: 1,
                radio3: '淘宝任务',
            }
        },
        created(){
            ajax.all([this.go_shops(),this.go_data({})]);
        },
        computed: {
            noMore() {
                return this.count >= 20
            }
        },
        methods: {
            bschange(page){
                this.go_data({
                    platform_type:this.radio2||'',
                    task_type:this.radio3||'',
                    page
                });
            },
            acceptTask(id){
                console.log(this.bank1,'radio3');
                if(this.bank1){

                    this.$confirm('再次确认是否接受？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$api.ports.takeTask({id,wang_id:this.bank1}).then((res)=>{
                            console.log(res,'成功了？');
                            if(res.code){
                                this.$notify.success('接收成功');
                                setTimeout(()=>{
                                    this.$router.replate('/maishou/unfinished');
                                },1000)
                                // this.go_shops();
                            }else{
                                this.$notify.error({
                                    title: '错误',
                                    message: res.message
                                });
                            }

                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消接受'
                        });
                    });
                }else{
                    this.$notify.error("请你选择账号");
                }
            },
            go_data(obj){

                return this.$api.ports.filtTask(obj).then((res)=>{
                    console.log(res,'shuju');
                    if(res.code){

                        this.dataTable=res.data[0];
                    }else{
                        this.$notify.error({
                            title: '错误',
                            message: res.message
                        });
                    }

                })
            },

            go_shops(){
                return this.$api.ports.buyNoList().then((res)=>{
                    console.log(res,'buyNoList');
                    if(res.code){

                        var clearArr=res.data.filter((v,i)=>{
                            if(v.status==1){
                                return true;
                            }
                        });
                        console.log(clearArr,'ca');

                        this.shopData=clearArr;
                    }else{
                        this.$notify.error({
                            title: '错误',
                            message: res.message
                        });
                    }

                })
            },
            load() {
                if (!this.noMore) {

                    this.loading = true
                    setTimeout(() => {
                        this.count += 2
                        this.loading = false
                    }, 2000)
                }
            },
            open() {
                this.$confirm('一个刷手一个淘宝账号一星期只能接4单。拼多多\n' +
                    '\n' +
                    '一个账号一星期可以接5单，浏览任务不限，是否\n' +
                    '\n' +
                    '接受此单？', '是否接受此单', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                }).catch(() => {

                });
            }
        },
        watch:{
            "radio1":function(){
               this.radio3=-1;
            },
            "radio2":function(to){
                this.bank1=-1;
                this.radio3=-1;
                var obj={
                    platform_type:to||'',
                    task_type:this.radio3||''
                }
                this.go_data(obj);
            },

            "radio3":function(to){
                var obj={
                    platform_type:this.radio2||'',
                    task_type:to||''
                }
                this.go_data(obj);
            }
        }
    }
</script>

<style lang="less" scoped>

    .margin-top {
        margin-top: 30px;
    }

    .box-card {
        margin-bottom: 2rem;
    }

    .loading-lw {
        text-align: center;

    }

    .addAccount{
        margin-top: 10px;
        line-height: 30px;
        color: #409EFF;
        cursor: pointer;
    }

    .list {
        list-style: none;
        overflow-y: scroll;
        margin: 0;
        padding: 0;
    }

    .clearfix {
        text-align: left;
        .c-topic {
            font-size: 1.5rem;
            color: #000;
            font-weight: bold;
            opacity: .8;
        }
    }

    .n-content {
        p {
            padding: 5px 0;
        }
    }

    .color {
        color: red;
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