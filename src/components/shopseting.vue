<template>
    <div>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="c-topic">基本信息</span>
            </div>
            <div>
                <el-row type="flex" justify="space-between">
                    <p>13825000114</p>
                    <p>
                        注册时间：2019-06-15 11：11：11
                    </p>
                </el-row>
                <div>
                    <el-tag type="danger">免</el-tag><span class="ml1">免审商家</span>
                </div>
                <div>
                    <p>
                        <el-link type="primary">ID：1008611</el-link>
                    </p>
                </div>
                <div>
                    <p class="ss-title">
                        联系方式
                    </p>
                    <div>
                        QQ：2309485575
                    </div>
                </div>
            </div>
            <el-divider></el-divider>
            <div>
                <el-row>
                    <el-col>
                        <span class="ss-title">绑定店铺</span>
                        <el-popover
                                placement="top"
                                width="800"
                                >
                            <el-form>
                                <el-form-item label="请选择平台">

                                    <el-select placeholder="请选择" v-model="shopform.type">
                                        <el-option
                                                v-for="item in typeFilters"
                                                :key="item.value"
                                                :label="item.text"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item label="店铺名称">
                                    <el-row>
                                        <div>
                                            <el-input></el-input>
                                        </div>
                                        <el-link type="info">(务必跟手机端宝贝页显示的店铺名一致)</el-link>
                                    </el-row>
                                </el-form-item>

                                <el-form-item label="店铺首页网址">

                                    <div>
                                        <el-input></el-input>
                                    </div>
                                    <el-link type="info">(店铺地址绑定后无法修改,拼多多平台可分享店铺到微信复制链接)</el-link>
                                </el-form-item>

                                <el-form-item label="店铺主旺旺ID">
                                    <el-row>
                                        <div>
                                            <el-input></el-input>
                                        </div>
                                        <el-link type="info">(店铺主旺旺ID绑定后无法修改)</el-link>
                                    </el-row>
                                </el-form-item>
                                <el-form-item label="发货地">

                                    <el-select v-model="shopform.pdata" placeholder="请选择省" class="ml1">
                                        <el-option v-for="(item,index) in provs_data" :key="item.value"
                                                    :label="item.text"
                                                    :value="item.value"></el-option>
                                    </el-select>

                                    <el-select v-model="shopform.cdata" placeholder="请选择市" class="ml1">
                                        <el-option v-for="(item,index) in citys_data[shopform.pdata]" :key="item.value"
                                                   :label="item.text"
                                                   :value="item.value"></el-option>
                                    </el-select>

                                    <el-select v-model="shopform.ddata" placeholder="请选择区" class="ml1">
                                        <el-option v-for="(item,index) in dists_data[shopform.cdata]" :key="item.value"
                                                   :label="item.text"
                                                   :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="街道地址">

                                    <el-input></el-input>
                                </el-form-item>

                                <el-form-item label="发货电话">

                                    <div>
                                        <el-input></el-input>
                                    </div>
                                    <el-link type="info">(若无法选择请按Ctrl+F5键强制刷新页面，或者选用Chrome浏览器重试)</el-link>
                                </el-form-item>
                                <el-divider></el-divider>
                                <el-row>
                                    <el-button type="success" icon="el-icon-circle-check">确认提交</el-button>
                                    <el-button type="danger" icon="el-icon-circle-close">取消退出</el-button>
                                </el-row>
                            </el-form>
                            <el-button slot="reference" type="text" class="ml1">+增加绑定店铺</el-button>
                        </el-popover>
                    </el-col>
                    <el-col>
                        <el-link type="info">温馨提示 :店铺请填写自己店铺首页地址，不可绑定其他卖家的地址，否则会被处罚</el-link>
                    </el-col>
                </el-row>
                <el-table class="mt1" border ref="filterTable" :data="shopData" style="width:100%;">
                    <el-table-column label="全部" prop="type" :filters="typeFilters" :filter-method="filterType"></el-table-column>
                    <el-table-column label="店铺名称" prop="shopname"></el-table-column>
                    <el-table-column label="旺旺名称" prop="wwname"></el-table-column>
                    <el-table-column label="店铺地址" prop="link">
                        <template slot-scope="scope">
                            <el-row>
                                <el-tooltip :content="scope.row.link" placement="top">
                                    <el-button size="mini" v-clipboard:copy="scope.row.link" v-clipboard:success="copySuccess"
                                               v-clipboard:error="copyError">复制店铺地址</el-button>
                                </el-tooltip>
                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column label="发货信息">
                        <template slot-scope="scope">
                            <el-row>
                                {{scope.row.pdata}}-{{scope.row.cdata}}-{{scope.row.ddata}}
                            </el-row>
                        </template>
                    </el-table-column>

                    <el-table-column label="接单间隔设置" prop="interval">
                        <template slot-scope="scope">
                            <el-row>
                                <el-link type="primary">{{scope.row.interval}}天</el-link>

                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column label="审核状态" prop="status"></el-table-column>

                    <el-table-column label="修改" prop="set">
                        <template slot-scope="scope">
                            <el-row>

                                <el-popover
                                        placement="left"
                                        width="800"
                                >
                                    <el-form>
                                        <el-form-item label="请选择平台">

                                            <el-select placeholder="请选择" v-model="shopform.type">
                                                <el-option
                                                        v-for="item in typeFilters"
                                                        :key="item.value"
                                                        :label="item.text"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>

                                        <el-form-item label="店铺名称">
                                            <el-row>
                                                <div>
                                                    <el-input></el-input>
                                                </div>
                                                <el-link type="info">(务必跟手机端宝贝页显示的店铺名一致)</el-link>
                                            </el-row>
                                        </el-form-item>

                                        <el-form-item label="店铺首页网址">

                                            <div>
                                                <el-input></el-input>
                                            </div>
                                            <el-link type="info">(店铺地址绑定后无法修改,拼多多平台可分享店铺到微信复制链接)</el-link>
                                        </el-form-item>

                                        <el-form-item label="店铺主旺旺ID">
                                            <el-row>
                                                <div>
                                                    <el-input></el-input>
                                                </div>
                                                <el-link type="info">(店铺主旺旺ID绑定后无法修改)</el-link>
                                            </el-row>
                                        </el-form-item>
                                        <el-form-item label="发货地">

                                            <el-select v-model="shopform.pdata" placeholder="请选择省" class="ml1">
                                                <el-option v-for="(item,index) in provs_data" :key="item.value"
                                                           :label="item.text"
                                                           :value="item.value"></el-option>
                                            </el-select>

                                            <el-select v-model="shopform.cdata" placeholder="请选择市" class="ml1">
                                                <el-option v-for="(item,index) in citys_data[shopform.pdata]" :key="item.value"
                                                           :label="item.text"
                                                           :value="item.value"></el-option>
                                            </el-select>

                                            <el-select v-model="shopform.ddata" placeholder="请选择区" class="ml1">
                                                <el-option v-for="(item,index) in dists_data[shopform.cdata]" :key="item.value"
                                                           :label="item.text"
                                                           :value="item.value"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="街道地址">

                                            <el-input></el-input>
                                        </el-form-item>

                                        <el-form-item label="发货电话">

                                            <div>
                                                <el-input></el-input>
                                            </div>
                                            <el-link type="info">(若无法选择请按Ctrl+F5键强制刷新页面，或者选用Chrome浏览器重试)</el-link>
                                        </el-form-item>
                                        <el-divider></el-divider>
                                        <el-row>
                                            <el-button type="success" icon="el-icon-circle-check">确认提交</el-button>
                                            <el-button type="danger" icon="el-icon-circle-close">取消退出</el-button>
                                        </el-row>
                                    </el-form>
                                    <el-button slot="reference" type="primary" size="mini" class="ml1">修改</el-button>
                                </el-popover>
                            </el-row>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {provs_data, citys_data, dists_data} from 'lwarea';
    export default {
        name: "shopseting",
        data(){
            return {
                provs_data, citys_data, dists_data,
                shopform:{
                    type:'',
                    shopname:'',
                    wwname:'',
                    link:'',
                    pdata:'',
                    cdata:'',
                    ddata:'',
                    interval:'',
                    status:'',
                    set:''
                },
                visible:false,
                typeFilters:[
                    {
                        text:'淘宝',
                        value:'淘宝'
                    },

                    {
                        text:'拼多多',
                        value:'拼多多'
                    }
                ],
                shopData:[
                    {
                        type:'淘宝',
                        shopname:'小仙女也分',
                        wwname:'pdd212323232',
                        link:'www.baidu.com',
                        pdata:'江苏省',
                        cdata:'泰州市',
                        ddata:'海陵区',
                        shipper:'江苏省-泰州市-海陵区',
                        interval:33,
                        status:'已通过',
                        set:''
                    },
                    {
                        type:'拼多多',
                        shopname:'小仙女也分',
                        wwname:'pdd212323232',
                        link:'www.baidu.com',
                        shipper:'江苏省-泰州市-海陵区',
                        interval:33,
                        status:'已通过',
                        set:''
                    }
                ],
                shopInd:-1
            }
        },
        created(){
            this.$notify.info({title:'消息',duration:0,showClose:true,message:'任务期间请务必保持店铺名与淘宝平台一致，勿随意修改店铺名称，否则用户提交不了任务就会去退款！'});
        },
        methods:{
            copy(ev){

            },
            copySuccess(){
                this.$message.success('复制成功');
            },

            copyError(){
                this.$message.error('复制失败');
            },

            changeInter(count){
                this.shopInd=count;
            },
            filterType(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            }
        },
        watch:{
            "shopform.pdata"(to){
                this.shopform.cdata='';
                this.shopform.ddata='';
            },
            "shopform.cdata"(to){
                this.shopform.ddata='';
            }
        }
    }
</script>

<style lang="less" scoped>
    .ss-title{
        font-weight:bold;
    }
    .ml1{
        margin:0 1rem;
    }
    .mt1{
        margin:1rem 0;
    }
</style>