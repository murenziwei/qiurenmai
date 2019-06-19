<template>
    <div class="orderp">
        <el-card class="box-card">

            <h1 class="info-text h1">
                {{dataarr.name}}
            </h1>
            <el-collapse accordion>
                <el-collapse-item v-for="(item,index) in dataarr.list" :key="index" >
                    <template slot="title">
                        {{item.name}}<i class="header-icon el-icon-info"></i>
                    </template>
                    <div>
                        <div v-html="item.html"></div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "orderP",
        props:['dataarr'],
        data(){
            return {
            }
        }
    }
</script>

<style lang="less" scoped>
    .orderp{
        text-align:left;
    }
    .h1{
        font-size:2rem;

    }
    .info-text{
        color:#909399;
    }

</style>