<!----------------------------------
****--@name     member
****--@role     ${*}
****--@date     2018/5/2
****--@author   zzh
----------------------------------->
<template>
    <div class="member">
        <header-title>
            <slot>会员</slot>
        </header-title>
        <div class="stance"></div>
        <ul class="member_header">
            <li>会员权益</li>
            <li>开通会员后可免费使用平台所有专题库</li>
        </ul>

        <ul class="member_content" >
            <li :class="formValidate.deadline == item.deadline?'active':''" v-for="item in VipList" :key="item.id" @click="select(item)">
                <div>{{item.currentPrice | money}}</div>
                <div>{{item.remark}}</div>

            </li>
        </ul>
        <div class="manage-button" v-if="vipStatus != 1">
            <x-button type="primary" @click.native="PayToVip('1')">办理会员</x-button>
        </div>
        <div class="manage-button"  v-else>
            <x-button type="primary" @click.native="PayToVip('1')">会员续订</x-button>
        </div>
        <alert v-model="messageShow" title="提示"> 业务办理成功</alert>
    </div>
</template>
<script>
  /* 当前组件必要引入 */
  import HeaderTitle from '../header'
  import api from './api'
  // 当前组件引入全局的util
  let Util = null
  export default {
    data () {
      return {
        messageShow:false,
        vipStatus: 0,
        vipExpireTime: '',
        VipList: [],
        formValidate: {
          payTypes: '1',
          deadline: ''
        },
        totalPrice:''
      }
    },
    methods: {
      // 初始化请求列表数据
      init () {
//        this.$wechat.onMenuShareTimeline({
//          title: 'hello VUX'
//        })
        this.vipStatus = this.$store.state.loginInfo.vipStatus;
        this.getVipList ();
      },
      select(item){
        console.log(item)
        this.totalPrice=item.currentPrice;
        this.formValidate.deadline = item.deadline;
      },
      PayToVip (val) {
        console.log(this.formValidate.deadline )
        this.ajax({
          ajaxSuccess: (data,res) => {
            if(res.status.code == '0') {
              this.pay(data.orderNo)

            }
          },
            url: api.vipPayment.path,
            method: api.vipPayment.method,
            data: this.formValidate
        })
      },
      getUserIp(){
        $cip='unknown';
        if($_SERVER['REMOYE_ADDR']){
          $cip=$_SERVER['REMOYE_ADDR']
        }else if(getenv("REMOYE_ADDR")){
          $cip=getenv('REMOYE_ADDR')
        }
        return $ip
      },
      pay(val){
        Vue.http.get('https://api.mch.weixin.qq.com/pay/unifiedorder', ({data}) => {
          Vue.wechat.config({
            appid:"wx93ea84d052466851",
            mch_id:'1482677762',
            nonce_str:'',
            sign:"",
            body:'会员充值',
            out_trade_no:val,
            total_fee:this.totalPrice,
            spbill_create_ip:this.getUserIp(),
            notify_url:'http://218.241.184.2:9025/stu/pay/wechat/callback',
            trade_type:'MWEB',


          })
        })
      },
      /*
           * 获取vip价格
           * */
      getVipList () {
        this.ajax({
          ajaxSuccess: (data,res) => {
            this.VipList = res.data;
            this.formValidate.deadline=this.VipList[0].deadline
          },
            url: api.vipConfigList.path
        })
      },

    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {HeaderTitle}
  }
</script>
<style lang="scss">
    .member {
        .manage-button{
            padding: 0 0.1rem;
            margin-top: 0.1rem;
        }
        .member_header {
            text-align: center;
            box-sizing: border-box;
            padding: 0.56rem 0 0.85rem 0;
            font-weight: bold;
            > li:nth-of-type(1) {
                font-size: 0.17rem;
                color: rgba(0, 0, 0, 0.8);
                margin-bottom: 0.13rem;
            }
            > li:nth-of-type(2) {
                font-size: 0.12rem;
                color: rgba(98, 98, 98, 0.7);
            }
        }
        .member_content {
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 0 0.15rem;
             li {
                border: 1px solid #11A640;
                border-radius: 0.05rem;
                 line-height: 0.3rem;
                height: 0.66rem;
                text-align: center;
                font-size: 0.15rem;
                color: #11A640;
                font-weight: bold;
                 padding: 0.02rem;
            }
            .active {
                background: #11A640;
                color: #D8EDDD;
            }
        }
    }

</style>
