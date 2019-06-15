<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane>
                <span slot="label"><i class="el-icon-bank-card"></i> 垫付类型任务</span>
                <div>

                    <el-radio-group v-model="payment">
                        <el-radio border v-for="(pitem,pindex) in payarr" :key="pindex" :label="pindex">
                            {{pitem.name}}
                        </el-radio>
                    </el-radio-group>
                    <el-divider></el-divider>
                    <div>
                        <div class="pay-header">
                            {{payarr[payment].text}} (<span class="danger-text">{{payarr[payment].jin}}金={{payarr[payment].yuan}}{{$store.state.mtext}}</span>)
                        </div>
                        <el-table
                                :data="payarr[payment].val"
                                stripe
                                border
                                style="width: 100%" class="mt1">
                            <el-table-column
                                    prop="range"
                                    label="垫付区间"
                                    >
                            </el-table-column>
                            <el-table-column
                                    prop="price"
                                    label="价格"
                                    >
                            </el-table-column>
                        </el-table>
                    </div>
                </div>

            </el-tab-pane>
            <el-tab-pane >
                <span slot="label"><i class="el-icon-s-management"></i> 浏览类型任务</span>
                <div>

                    <el-radio-group v-model="preview">
                        <el-radio border v-for="(pitem,pindex) in previewarr" :key="pindex" :label="pindex">
                            {{pitem.name}}
                        </el-radio>
                    </el-radio-group>
                    <el-divider></el-divider>
                    <div>
                        <div class="pay-header">
                            {{previewarr[preview].text}} (<span class="danger-text">{{previewarr[preview].jin}}金={{previewarr[preview].yuan}}{{$store.state.mtext}}</span>)
                        </div>
                        <el-table
                                :data="previewarr[preview].val"
                                stripe
                                border
                                style="width: 100%" class="mt1">
                            <el-table-column
                                    prop="type"
                                    label="类型"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="price"
                                    label="价格"
                            >
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    export default {
        name: "pricetable",
        data(){
            return {
                payment:0,
                payarr:[
                    {
                        name:'淘宝垫付',
                        text:'淘宝垫付(常规) 阶梯价格',
                        jin:1,
                        yuan:1,
                        val:[
                            {
                                range:'1-100',
                                price:'10金'
                            },

                            {
                                range:'1-1000',
                                price:'10金'
                            },

                            {
                                range:'1-5000',
                                price:'10金'
                            }
                        ]
                    },
                    {
                        name:'拼多多垫付',
                        text:'拼多多垫付(常规) 阶梯价格',
                        jin:1,
                        yuan:1,
                        val:[
                            {
                                range:'1-100',
                                price:'10金'
                            },

                            {
                                range:'1-1000',
                                price:'10金'
                            },

                            {
                                range:'1-5000',
                                price:'10金'
                            }
                        ]
                    }
                ],

                preview:0,
                previewarr:[
                    {
                        name:'淘宝预览',
                        text:'淘宝浏览价格',
                        jin:1,
                        yuan:1,
                        val:[
                            {
                                type:'普通流量',
                                price:'10金'
                            },

                            {
                                type:'加购+1',
                                price:'10金'
                            }
                        ]
                    }

                ]
            }
        }
    }
</script>

<style lang="less" scoped>
    .mt1{
        margin:1rem 0;
    }
    .pay-header{
        padding-left:1rem;
        border-left:3px solid #5bc0de;
        line-height:2rem;
        font-size:1rem;
    }
    .danger-text{
        color:#d9534f;
    }
</style>