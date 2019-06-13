<template>
    <div>
        <el-alert
                class="info-con"
                :title="bull.title"
                type="error"
        >
            <div>
                <p v-for="(item,index) in bull.list" :key="index">{{index+1}}.{{item}}</p>
            </div>
        </el-alert>

        <el-form label-width="auto" ref="taskForm" :rules="taskRules" :model="taskForm">
            <el-alert title="注意：带红色*是必填项！" type="info" class="info-title"></el-alert>
            <div>
                <div>

                    <el-divider content-position="center">第一步：填写商品信息</el-divider>
                    <el-form-item label="商品名称" prop="name">
                        <el-input v-model="taskForm.name" type="name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品链接" prop="link">
                        <el-input v-model="taskForm.link" type="link"></el-input>
                    </el-form-item>
                    <el-form-item label="商品主图" prop="pic">
                        <el-upload
                                action="/src/assets"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                    <el-alert title="上传“商品主图”，确保与搜索页面展示的图片一致。" type="error" class="info-title"></el-alert>

                    <el-form-item label="单品实际成交价格">
                        <el-row type="flex" justify="center" align="midle" :gutter="20">
                            <el-col :span="5"><el-input></el-input></el-col>
                            <el-col :span="2"><span>{{$store.state.mtext}}</span></el-col>
                            <el-col>用户拍下时的付款价格，如不同等级买号看到商品价格不同，取最大值</el-col>

                        </el-row>
                    </el-form-item>

                    <el-form-item label="每单拍">
                        <el-row type="flex" justify="center" align="midle" :gutter="20">
                            <el-col :span="5"><el-input></el-input></el-col>
                            <el-col :span="2"><span>{{$store.state.mtext}}</span></el-col>
                            <el-col>每单总金额 {{$store.state.mtext}} <span class="info-text">【不含运费】</span></el-col>

                        </el-row>
                    </el-form-item>
                    <el-form-item label="手机搜索页面展示价格">
                        <el-row type="flex" justify="center" align="midle" :gutter="20">
                            <el-col :span="5"><el-input></el-input></el-col>
                            <el-col :span="2"><span>{{$store.state.mtext}}</span></el-col>
                            <el-col><span class="info-text">务必亲自在手机端搜索，确认价格准确</span></el-col>

                        </el-row>
                    </el-form-item>
                    <el-form-item label="商品是否包邮">
                        <el-radio-group v-model="taskForm.postage" class="tr-ul">
                            <div class="tr-li">
                                <el-radio :label="1" class="w-sp">
                                    商品不包邮 <span class="ws-name">商家每单额外支出10元作为运费押金，任务完成后剩余运费押金将全部退还给商家</span>
                                </el-radio>
                            </div>
                            <div class="tr-li">
                                <el-radio :label="2" class="w-sp">
                                    商品包邮
                                </el-radio>
                            </div>
                        </el-radio-group>

                    </el-form-item>
                </div>
                <div>
                    <el-divider content-position="center">第二步：设置如何找到商品</el-divider>
                    <el-form-item label="价格区间">
                        <el-row type="flex" justify="center" align="middle" :gutter="20">
                            <el-col :span="14"><el-row type="flex" align="middle"><el-input></el-input><i class="el-icon-minus"></i><el-input></el-input></el-row> </el-col>
                            <el-col :span="2"><span>{{$store.state.mtext}}</span></el-col>
                            <el-col><span class="info-text">务必亲自在手机端搜索，确认价格准确</span></el-col>

                        </el-row>
                    </el-form-item>
                    <el-form-item label="商品所在地">
                        <el-select v-model="cityvalue" placeholder="请选择">
                            <el-option
                                    v-for="item in cityoptions"
                                    :key="item.value"
                                    :label="item.text"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="订单留言">
                        <el-row type="flex" justify="center" align="middle" :gutter="20">
                            <el-col :span="10"><el-input></el-input></el-col>
                            <el-col >
                                <el-row type="flex" align="middle">

                                    <el-popover
                                            placement="top-start"
                                            title="订单留言"
                                            width="200"
                                            trigger="click"
                                            content="如非必须建议不指定订单备注留言！因淘宝现在人工审核申诉订单时，会排查买家的订单留言内容及发货方式 是否匹配，出于安全性考虑，大家尽量通过订单号和买号来区分推广订单。">
                                        <el-button type="text" slot="reference" icon="el-icon-info" class="info-btn"></el-button>
                                    </el-popover><span class="info-text">用户拍下商品所需要填写的买家留言；出于安全考虑不建议大批量使用</span>
                                </el-row>
                            </el-col>

                        </el-row>
                    </el-form-item>
                </div>

                <div>
                    <el-divider content-position="center">第三步：选择任务类型和单数</el-divider>

                    <el-row>
                        <div>选择添加推广任务类型</div>
                        <div>


                            <el-card class="box-card b-c-box">
                                <div slot="header">
                                    <el-row type="flex" align="middle">
                                        <el-checkbox v-model="common">普通好评任务 ( 默认为5星无评价内容，如需评价请备注，但不可规定评价内容 )</el-checkbox>

                                    </el-row>
                                </div>
                                <div v-if="common">
                                    <div v-for="(item,index) in commonArr" class="c-item">
                                        <div style="text-align:right;" v-if="index>=1">
                                            <i class="el-icon-close c-i-close" @click="cClose('commonArr',index)"></i>
                                        </div>

                                        <el-row :gutter="20" type="flex" align="middle">
                                            <el-col>
                                                <p>下单关键词{{index+1}}</p>
                                                <el-input v-model="item.keyword" ></el-input>
                                            </el-col>

                                            <el-col>
                                                <p>货币关键词{{index+1}}</p>
                                                <el-input v-model="item.currency" ></el-input>
                                            </el-col>
                                            <el-col>
                                                <p>添加垫付{{index+1}}</p>
                                                <el-input v-model.number="item.payment" min="1"></el-input>
                                            </el-col>
                                        </el-row>
                                        <el-divider></el-divider>
                                    </div>
                                    <div>
                                        <el-button type="text" @click="cAdd('commonArr',3)">+增加下单关键词</el-button>
                                    </div>
                                </div>
                            </el-card>
                            <el-card class="box-card b-c-box">
                                <div slot="header">
                                    <el-row type="flex" align="middle">
                                        <el-checkbox v-model="character">指定文字好评任务 (文字好评任务佣金 +  <span class="danger-text">3金/单</span> )</el-checkbox>
                                        <el-popover
                                                placement="top-start"
                                                title="指定文字好评任务"
                                                width="200"
                                                trigger="click"
                                                content="选择此服务将有助于提升评价质量，请填写完整的文字评价内容，为了使评价更接近于用户的真实评价，避免多个评价内容重复相同，因此每个文字好评任务对应一条文字好评内容；一个关键词一次性最多可添加5条文字好评任务">
                                            <el-button type="text" slot="reference" icon="el-icon-info" class="info-btn"></el-button>
                                        </el-popover>
                                    </el-row>
                                </div>
                                <div v-if="character">
                                    <div v-for="(item,index) in characterArr" class="c-item">
                                        <div style="text-align:right;" v-if="index>=1">
                                            <i class="el-icon-close c-i-close" @click="cClose('characterArr',index)"></i>
                                        </div>

                                        <el-row :gutter="20" type="flex" align="middle">
                                            <el-col>
                                                <p>搜索关键词{{index+1}}</p>
                                                <el-input v-model="item.keyword" ></el-input>
                                            </el-col>
                                            <el-col>
                                                <p>货币关键词{{index+1}}</p>
                                                <el-input v-model="item.currency" ></el-input>
                                            </el-col>
                                            <el-col>
                                                <p>添加垫付{{index+1}}</p>
                                                <el-select v-model="item.payment" placeholder="请选择">
                                                    <el-option
                                                            v-for="child in 5"
                                                            :key="child"
                                                            :label="child"
                                                            :value="child">
                                                    </el-option>
                                                </el-select>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col>
                                                <p>文字好评内容</p>
                                                <el-input
                                                        type="textarea"
                                                        :rows="4"
                                                        v-model="item.textarea" maxlength="999" placeholder="可填写完整的评价内容，最多999字">
                                                </el-input>
                                            </el-col>
                                        </el-row>
                                        <el-divider></el-divider>
                                    </div>
                                    <div>
                                        <el-button type="text" @click="cAdd('characterArr',3,'character')">+增加下单关键词</el-button>
                                    </div>
                                </div>
                            </el-card>

                            <el-card class="box-card b-c-box">
                                <div slot="header">
                                    <el-row type="flex" align="middle">
                                        <el-checkbox v-model="picture">指定图片好评任务 (指定好评关键字任务佣金 +  <span class="danger-text">5金/单</span> )</el-checkbox>
                                        <el-popover
                                                placement="top-start"
                                                title="指定好评图片任务"
                                                width="200"
                                                trigger="click"
                                                content="此服务是通过商家提供“买家秀图片”给做任务的用户，用户确认好评的时候，将把这张买家秀图片一起提交。以达到优化评价，提高转化率的目的。注意：买家秀图片最少一张最多三张，图片商品规格必须与输入的商品规格一致，以避免乌龙~">
                                            <el-button type="text" slot="reference" icon="el-icon-info" class="info-btn"></el-button>
                                        </el-popover>
                                    </el-row>
                                </div>
                                <div v-if="picture">
                                    <div v-for="(item,index) in pictureArr" class="c-item">
                                        <div style="text-align:right;" v-if="index>=1">
                                            <i class="el-icon-close c-i-close" @click="cClose('pictureArr',index)"></i>
                                        </div>

                                        <el-row :gutter="20" type="flex" align="middle">
                                            <el-col>
                                                <p>搜索关键词{{index+1}}</p>
                                                <el-input v-model="item.keyword" ></el-input>
                                            </el-col>
                                            <el-col>
                                                <p>货币关键词{{index+1}}</p>
                                                <el-input v-model="item.currency" ></el-input>
                                            </el-col>
                                            <el-col>
                                                <p>添加垫付{{index+1}}</p>
                                                <el-select v-model="item.payment" placeholder="请选择">
                                                    <el-option
                                                            v-for="child in 5"
                                                            :key="child"
                                                            :label="child"
                                                            :value="child">
                                                    </el-option>
                                                </el-select>
                                            </el-col>
                                        </el-row>

                                        <el-row>
                                            <el-col>
                                                <p>选择图片</p>
                                                <div>
                                                    <el-upload
                                                            class="upload-demo"
                                                            action="https://jsonplaceholder.typicode.com/posts/"
                                                            :on-preview="picPreview"
                                                            :on-remove="picRemove"
                                                            :on-change="picChange"
                                                            :file-list="item.fileList"
                                                            list-type="picture" >
                                                        <el-button size="small" type="primary">点击上传</el-button>
                                                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                                    </el-upload>
                                                </div>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col>
                                                <p>评价要求</p>
                                                <el-input
                                                        type="textarea"
                                                        :rows="4"
                                                        v-model="item.textarea"  placeholder="商家可自定义填写评价的文字要求">
                                                </el-input>
                                            </el-col>
                                        </el-row>
                                        <el-divider></el-divider>
                                    </div>
                                    <div>
                                        <el-button type="text" @click="cAdd('pictureArr',3,'picture')">+增加下单关键词</el-button>
                                    </div>
                                </div>
                            </el-card>
                            <el-card class="box-card b-c-box">
                                <div slot="header">
                                    <el-row type="flex" align="middle">
                                        <el-checkbox v-model="video">指定视频好评任务(指定好评关键字任务佣金 +  <span class="danger-text">5金/单</span> )</el-checkbox>
                                        <el-popover
                                                placement="top-start"
                                                title="指定好评视频任务"
                                                width="200"
                                                trigger="click"
                                                content="此服务是通过商家提供“买家秀视频”给做任务的用户，用户确认好评的时候，将把这张买家秀视频一起提交。以达到优化评价，提高转化率的目的。注意：买家秀视频只能上传一张，视频商品规格必须与输入的商品规格一致，以避免乌龙~">
                                            <el-button type="text" slot="reference" icon="el-icon-info" class="info-btn"></el-button>
                                        </el-popover>
                                    </el-row>
                                </div>
                                <div v-if="video">
                                    <div v-for="(item,index) in videoArr" class="c-item">
                                        <div style="text-align:right;" v-if="index>=1">
                                            <i class="el-icon-close c-i-close" @click="cClose('pictureArr',index)"></i>
                                        </div>

                                        <el-row :gutter="20" type="flex" align="middle">
                                            <el-col>
                                                <p>搜索关键词{{index+1}}</p>
                                                <el-input v-model="item.keyword" ></el-input>
                                            </el-col>
                                            <el-col>
                                                <p>货币关键词{{index+1}}</p>
                                                <el-input v-model="item.currency" ></el-input>
                                            </el-col>
                                            <el-col>
                                                <p>添加垫付{{index+1}}</p>
                                                <el-select v-model="item.payment" placeholder="请选择">
                                                    <el-option
                                                            v-for="child in 5"
                                                            :key="child"
                                                            :label="child"
                                                            :value="child">
                                                    </el-option>
                                                </el-select>
                                            </el-col>
                                        </el-row>

                                        <el-row>
                                            <el-col>
                                                <p>选择视频</p>
                                                <div>
                                                    <el-upload
                                                            class="upload-demo"
                                                            action="https://jsonplaceholder.typicode.com/posts/"
                                                            :on-preview="picPreview"
                                                            :on-remove="picRemove"
                                                            :on-change="picChange"
                                                            :file-list="item.fileList"
                                                            list-type="picture" accept="video/*">
                                                        <el-button size="small" type="primary">点击上传</el-button>

                                                    </el-upload>
                                                </div>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col>
                                                <p>评价要求</p>
                                                <el-input
                                                        type="textarea"
                                                        :rows="4"
                                                        v-model="item.textarea"  placeholder="商家可自定义填写评价的文字要求">
                                                </el-input>
                                            </el-col>
                                        </el-row>
                                        <el-divider></el-divider>
                                    </div>
                                    <div>
                                        <el-button type="text" @click="cAdd('pictureArr',3,'picture')">+增加下单关键词</el-button>
                                    </div>
                                </div>
                            </el-card>


                        </div>
                    </el-row>
                    <el-row>
                        <p>新版发布时间设置</p>
                        <div>
                            <el-row type="flex" align="middle" class="b-c-box" :gutter="20">
                                <el-col>

                                    <el-row type="flex" align="middle">
                                        开始时间
                                        <div class="i-padding">
                                            <el-input></el-input>
                                        </div>

                                    </el-row>
                                </el-col>
                                <el-col>

                                    <el-row type="flex" align="middle">
                                        每隔
                                        <div class="i-padding">
                                            <el-input></el-input>
                                        </div>

                                        分钟放出1单
                                    </el-row>
                                </el-col>
                                <el-col>

                                    <el-row type="flex" align="middle">
                                        共放
                                        <div class="i-padding">
                                            <el-input></el-input>
                                        </div>

                                        单
                                    </el-row>
                                </el-col>
                            </el-row>
                        </div>
                    </el-row>

                </div>
                <div>
                    <el-divider content-position="center">第四步：选择增值服务</el-divider>
                    <div>
                        <div>

                            <el-row type="flex" align="middle" class="b-c-box">
                                <el-checkbox v-model="istop">任务置顶<span class="danger-text">( +3金/单 )</span></el-checkbox>

                            </el-row>
                            <div>
                                <el-row type="flex" align="middle"  class="b-c-box">

                                    <div>加赏任务佣金：</div>


                                    <el-row type="flex" align="middle">
                                        <span>每单加赏</span>

                                        <div class="i-padding">
                                            <el-input></el-input>
                                        </div>

                                        <span>金</span>
                                    </el-row>


                                    <el-row type="flex" align="middle">
                                        (<span class="success-text">加赏金额越高，越优先展示给用户</span>，<span class="info-text">任务没人接或接不完时，建议加赏提升用户积极性，优先接手你的任务</span>)
                                    </el-row>

                                </el-row>

                                <el-row type="flex" align="middle" class="b-c-box">
                                    <span>空包服务（<span class="danger-text">{{courierP[courier]||0.00}}</span>{{$store.state.mtext}}）/个</span>
                                    <el-row type="flex" align="middle">
                                        <span>包裹重量</span>

                                        <div class="i-padding">
                                            <el-input></el-input>
                                        </div>
                                        <span>公斤</span>
                                    </el-row>
                                    <el-row type="flex" align="middle">
                                        <span>快递：</span>
                                        <el-select v-model="courier" placeholder="请选择">
                                            <el-option
                                                    v-for="(citem) in courierO"
                                                    :key="citem.value"
                                                    :label="citem.label"
                                                    :value="citem.value">
                                            </el-option>
                                        </el-select>
                                    </el-row>

                                </el-row>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <el-divider content-position="center">第五步：商家附加要求</el-divider>
                    <div>
                        <p>
                            备注说明
                        </p>
                        <div>
                            <el-input
                                    type="textarea"
                                    :rows="4"
                                    v-model="remark" placeholder="重要！如果对用户有特别的要求，请在备注里注明，用户在做任务时会看到，最多不能超过300字(任务备注只是商家要求，我们只能做到传达给用户但不会强制用户按要求执行)">
                            </el-input>
                        </div>
                    </div>
                </div>
                <div>
                    <el-row type="flex" align="middle" justify="center" :gutter="30" class="b-c-box">

                        <el-button type="primary" @click="taskSub('taskForm',-1)">上一步</el-button>
                        <el-button type="primary" @click="taskSub('taskForm',1)">下一步</el-button>
                    </el-row>
                </div>
            </div>


        </el-form>
    </div>
</template>

<script>
    import {provs_data} from 'lwarea';
    export default {
        name: "Tbpreview",
        data(){
            return {
                //备注内容
                remark:'',

                courier:'',
                courierP:['3.60','3.60'],
                // 快递方式
                courierO:[
                    {
                        label:'申通快递',
                        value:'0'
                    },
                    {
                        label:'韵达淘宝快递',
                        value:'1'
                    }
                ],
                // 任务置顶
                istop:false,

                common:true,
                commonArr:[
                    {
                        keyword:'',
                        payment:1,
                        currency:''
                    }
                ],
                character:false,
                characterArr:[
                    {
                        keyword:'',
                        payment:'',
                        textarea:'',
                        currency:''
                    }
                ],

                picture:false,
                pictureArr:[
                    {
                        keyword:'',
                        payment:'',
                        textarea:'',
                        currency:'',
                        fileList:[]
                    }
                ],
                video:false,
                videoArr:[
                    {
                        keyword:'',
                        payment:'',
                        textarea:'',
                        currency:'',
                        fileList:[]
                    }
                ],
                cityoptions: provs_data,
                cityvalue: '',
                // 商品主图
                dialogImageUrl: '',
                dialogVisible: false,
                taskForm:{
                    name:'',
                    link:'',
                    postage:-1
                },
                taskRules:{
                    name: [
                        { required: true, message: '请输入商品名称', trigger: 'blur' }
                    ],

                    link: [
                        { required: true, message: '注意：选择的店铺名核对准确，不要填错链接', trigger: 'blur' }
                    ],
                    postage: [
                        { required: true, message: '请选择是否包邮', trigger: 'blur' }
                    ]
                },

                chooseP:1,
                chooseS:-1,
                taskR:1,
                trC:1,
                trCT:1,
                bull:{
                    title:'所有商家都要注意在销量110推广务必严格控制好以下几点：',
                    list:['物流一定要有真实物流记录，一定要有全程重量并且重量跟真实商品一致！一定不要网上买那些小快递的，便宜的空包（稽查系统在不断升级，有些以前没出事不代表现在或以后没事）；目前可以选用平台提供的空包（不要信当地快递网点手动输入的重量，当地网点无法控制包裹在中转站和到达点的重量统计）',
                        '推广比例一定不要过高，最高最高不能超过40%',
                        '移动端搜索转化率务必不要过高，保持在行业平均转化率的1.5倍左右最佳',
                        '推广期间请务必关掉商品淘客佣金，推广过程有诸多不确定因素可能导致产生佣金可能造成您的损失。'
                    ]
                },
                stepS:1,
                steparr:[
                    {
                        val:'选择任务类型'
                    },
                    {
                        val:'填写任务信息'
                    },
                    {
                        val:'支付'
                    },
                    {
                        val:'发布成功'
                    }
                ]
            }
        },

        methods:{
            picChange(file,fileList){
                if(file){

                    var le=fileList.length,valO={
                        name:file.name,
                        url:file.url
                    },max=3;
                    if(le<max){

                        if(le){
                            if(fileList[le-1].name!=file.name){

                                fileList.push(valO);
                            }

                        }else{
                            fileList.push(valO);
                        }
                    }else{
                        this.$alert('最多只能添加'+max+'张', '提示', {
                            confirmButtonText: '确定',
                            callback:()=>{}
                        });
                    }
                }
            },
            picRemove(file,fileList){
                console.log('remove',file,fileList);
            },
            picPreview(file,fileList){
                console.log('picPreview');
            },
            cAdd(arrn,arrc,keyc){
                var arr=this[arrn];
                if(arr){
                    if(arr.length<arrc){
                        switch (keyc) {
                            case 'video':arr.push({
                                keyword:'',
                                payment:1,
                                textarea:'',
                                currency:'',
                                fileList:[]
                            })
                            ;break;
                            case 'picture':arr.push({
                                keyword:'',
                                payment:1,
                                textarea:'',
                                currency:'',
                                fileList:[]
                            })
                            ;break;
                            case 'character':arr.push({
                                keyword:'',
                                payment:1,
                                textarea:'',
                                currency:''
                            })
                            ;break;
                            default:arr.push({
                                keyword:'',
                                payment:1,
                                currency:''
                            });
                        }

                    }else{
                        this.$alert('最多只能添加'+arrc+'条', '提示', {
                            confirmButtonText: '确定',
                            callback:()=>{}
                        });
                    }
                }
            },
            cClose(arrn,arri){
                var arr=this[arrn];
                if(arr){
                    this.$confirm('此操作将删除该选项, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'error'
                    }).then(() => {
                        arr.splice(arri,1);
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            },
            //商品主图
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            taskSub(form){
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.$message.success('验证成功，进入下一步')


                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            submitForm(n,t){
                this.nextfn(t);
            },
            nextfn(t){
                this.stepS+=t;

            }
        },
        watch:{
            stepS:function(to){
                if(to==2){
                    this.$message.info({duration:0,showClose:true,message:'任务期间请关闭淘宝客、村淘、分享有赏等淘客活动，若因淘客引起的佣金支出由商家自己承担'});
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .i-padding{margin:0 .5rem;}
    .bcb-span{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;}
    .success-text{color:#5bc0de;}
    .c-i-close{
        transition:color .3s;
        will-change:color;
        &:hover{color:#5bc0de;}

    }

    .b-c-box{
        margin:1rem 0;;
    }

    .info-title{
        margin:1rem 0;
    }
    .ws-name{
        margin:0 .5rem;
    }
    .info-text{
        color:#909399;
    }
    .danger-text{
        color:#d9534f;
    }
    .info-btn{
        font-size:1.5rem;
    }
    .w-sp{
        white-space:normal;
    }
    .tr-li{
        margin:1rem 0;
    }
    .step-form,.step-content{
        list-style:none;
        margin:1rem 0;
        padding:0;
    }
</style>