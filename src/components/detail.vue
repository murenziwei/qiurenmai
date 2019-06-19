<template>
    <div class="detail">
        <el-card>
            <div slot="header">
                <div class="h-flex">

                    <span class="clearfix">
                        新版手机淘宝任务
                    </span>
                    <el-row type="flex" align="middle" justify="flex-end">
                        <el-breadcrumb separator="|">
                            <el-breadcrumb-item>木人子韦</el-breadcrumb-item>
                            <el-breadcrumb-item>任务编号：11323232</el-breadcrumb-item>
                            <el-breadcrumb-item>2019-06-19 18：00：00</el-breadcrumb-item>
                            <el-breadcrumb-item>状态：已完成</el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-row>
                </div>
            </div>
            <div>
                <div>
                    <el-steps :active="1" simple  finish-status="success" >
                        <el-step title="提交任务等待付款"></el-step>
                        <el-step title="已付款，等候审核"></el-step>
                        <el-step title="任务审核通过，进行中"></el-step>
                        <el-step title="任务全部完成"></el-step>
                    </el-steps>
                </div>
                <el-divider></el-divider>
                <div>
                    <el-breadcrumb separator="|">
                        <el-breadcrumb-item>
                            任务生成订单总数：1单
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            待放出：0 单
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            未接单：0 单
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            未操作：0 单
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            待返款发货：0 单
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            待评价：0 单
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            待确认：0 单
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            已撤销：0 单
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            已完成：1 单
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <el-divider></el-divider>
                <div>
                    <el-tabs type="border-card">
                        <el-tab-pane label="任务详情">
                            <el-table
                                    :data="tableData"
                                    style="width: 100%">
                                <el-table-column type="expand">
                                    <template slot-scope="props">
                                        <el-form label-position="left" inline class="demo-table-expand">
                                            <el-form-item label="商品名称">
                                                <span>{{ props.row.name }}</span>
                                            </el-form-item>
                                            <el-form-item label="所属店铺">
                                                <span>{{ props.row.shop }}</span>
                                            </el-form-item>
                                            <el-form-item label="商品 ID">
                                                <span>{{ props.row.id }}</span>
                                            </el-form-item>
                                            <el-form-item label="店铺 ID">
                                                <span>{{ props.row.shopId }}</span>
                                            </el-form-item>
                                            <el-form-item label="商品分类">
                                                <span>{{ props.row.category }}</span>
                                            </el-form-item>
                                            <el-form-item label="店铺地址">
                                                <span>{{ props.row.address }}</span>
                                            </el-form-item>
                                            <el-form-item label="商品描述">
                                                <span>{{ props.row.desc }}</span>
                                            </el-form-item>
                                        </el-form>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="商品 ID"
                                        prop="id">
                                </el-table-column>
                                <el-table-column
                                        label="商品名称"
                                        prop="name">
                                </el-table-column>
                                <el-table-column
                                        label="描述"
                                        prop="desc">
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
                        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
                        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </el-card>
        <end></end>
    </div>
</template>

<script>
    import end from '../components/end'
    export default {
        name: "detail",
        data(){
            return {
                tableData: [{
                    id: '12987122',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987123',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987125',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987126',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }]
            }
        },
        components:{
            end
        }
    }
</script>

<style lang="less" scoped>
.h-flex{
    display:flex;
    align-items:center;
    justify-content:space-between;
}
.clearfix{
    font-size:1.5rem;
    font-weight: bold;
}
</style>