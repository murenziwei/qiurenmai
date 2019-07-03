<template>
    <div class="container">
        <component :is="chooseC[type]" :id="id" :status="status"></component>
    </div>
</template>

<script>

    //淘宝预览
    import Preread from './details/Preread';

    //淘宝预售
    import Preyu from './details/Preyu';

    //淘宝精搜
    import Preview from './details/Preview';

    //淘口令
    import Prekou from './details/Prekou';


    //拼多多
    import Pin from './details/Pin';

    export default {
        name: "detail_component",
        props:['id','type','status'],
        data() {
            return {
                chooseC:{
                    "1":'Preview',
                    "2":'Prekou',
                    "3":'Preyu',
                    "4":'Pin',
                    "5":'Preread'
                }
            }
        },
        created(){
            console.log(this.id,this.status,this.type,'id和type');
        },
        components: {
            Pin,
            Preview,
            Prekou,
            Preyu,
            Preread
        },
        methods: {

        }
    }
</script>

<style lang="less" scoped>
    .container {

    }
</style>