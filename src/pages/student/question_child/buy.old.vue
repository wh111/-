<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2018/4/24
****--@author   zzh
----------------------------------->
<template>
  <div class="buy">
    <header-title>
      <slot>商品详情</slot>
    </header-title>
    <div class="stance"></div>
    <div class="content" v-for="(item,index) in data.productList" :key="index" style="border: 0">
      <div>
        <img onerror="this.src='../../../../sasmobile/img/1_07.jpg'" :src="item.icon"/>
      </div>
      <div class="homePage_book">
        <div class="itemTitle">
          {{item.title}}
        </div>
        <div>
          <span>出版社：{{item.press}} </span>
        </div>
        <div><span>试卷：{{item.spec}}{{item.unit | unit }} </span></div>
        <div><span>订单编号：{{item.no}}</span></div>
        <section class="p">{{item.currentPrice | money}}</section>
      </div>
    </div>
    <input type="submit" @click="toPay" value="去支付"/>
  </div>
</template>
<script>
  /* 当前组件必要引入 */
  import HeaderTitle from '../header';
  import api from './api';
  // 当前组件引入全局的util
  // let Util = null
  export default {
    data () {
      return {
        data: [
          {
            url: '../../../sasmobile/img/1_07.jpg',
            title: '三年高考五年模拟练习',
            price: '价格',
            number: '￥99.00',
            paper: '试卷',
            numbers: '50套',
            content: '马赛就死哦啊少见欧萨破解名称马茶食品安交警'
          }
        ],
        commonList: ['China', 'Japan', 'America'],
        totalPrice: ''
      };
    },
    methods: {
      // 初始化请求列表数据
      init () {
        this.getOrder();
        console.log(this.$store.state);
//      this.ajax({
//        url: 'http://fw.qq.com/ipaddress',
//        ajaxSuccess: function(data){
//          console.log(JSON.stringify(data));
//        },
//      });
      },
      getOrder () {
        let options = {
          url: api.getOrder.path,
          params: {
            id: this.$route.query.productIds

          },
          /**
           * 服务端返回的状态码检查,默认状态码检查前执行
           * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
           * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
           */
          ajaxSuccess: (data, res) => {
            data.productList.map((item) => {
              item.icon = this.getStaticPath(item.icon);
            });
            this.data = data;
            this.totalPrice = data.totalPrice;
          }
        };
        this.ajax(options);
      },
      getGenerateUUID () {//生成随机数(nonce_str)
        let options = {
          url: api.generateUUID.path,
          params: {},
          /**
           * 服务端返回的状态码检查,默认状态码检查前执行
           * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
           * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
           */
          ajaxSuccess: (data, res) => {
            this.getcreateSign(data);
          }
        };
        this.ajax(options);
      },
      getcreateSign (nonce_str) {
        let options = {
          url: api.createSign.path,
          params: {
            appid: 'wx93ea84d052466851',
            body: '商品购买',
            mch_id: '1482677762',
            nonce_str: nonce_str,
            notify_url: 'http://t.sjs.com.cn/stu/pay/wechat/callback',
            out_trade_no: this.$route.query.no,
            spbill_create_ip: 't.sjs.com.cn',
            trade_type: 'JSAPI',
            total_fee: this.totalPrice,
            secretKey: 'E3F6967C3D0F9F028900E241115B9DA5'
          },
          /**
           * 服务端返回的状态码检查,默认状态码检查前执行
           * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
           * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
           */
          ajaxSuccess: (data, res) => {
            this.pay(nonce_str, data);
          }
        };
        this.ajax(options);
      },
      pay (nonce_str, sign) {
        console.log('调用了', nonce_str, sign);
//        let opt = {
//          appid: 'wx93ea84d052466851',
//          body: '众恒志信-缴费',
//          mch_id: '1482677762',
//          sign: sign,
//          nonce_str: nonce_str,
//          notify_url: 'http://t.sjs.com.cn/stu/pay/wechat/callback',
//          out_trade_no: this.$route.query.no,
//          spbill_create_ip: 't.sjs.com.cn',
//          trade_type: 'JSAPI',
//          total_fee: this.totalPrice,
//          secretKey: 'E3F6967C3D0F9F028900E241115B9DA5',
//          scene_info: {
//            'h5_info': //h5支付固定传"h5_info"
//              {
//                'type': 'Wap',  //场景类型
//                'wap_url': 'http://t.sjs.com.cn',//WAP网站URL地址
//                'wap_name': '购买商品'  //WAP 网站名
//              }
//          },
//          success: (res) => {
//            alert(res);
//          },
//          error: (res) => {
//            alert(res);
//          }
//        };
//        console.log(opt);
        this.$wechat.chooseWXPay({
          appid: 'wx93ea84d052466851',
          body: '众恒志信-缴费',
          mch_id: '1482677762',
          sign: sign,
          device_info: 'WEB',
          nonce_str: nonce_str,
          notify_url: 'http://t.sjs.com.cn/stu/pay/wechat/callback',
          out_trade_no: this.$route.query.no,
          spbill_create_ip: 't.sjs.com.cn',
          trade_type: 'JSAPI',
          total_fee: this.totalPrice,
          secretKey: 'E3F6967C3D0F9F028900E241115B9DA5',
          scene_info: {
            'h5_info': //h5支付固定传"h5_info"
              {
                'type': 'Wap',  //场景类型
                'wap_url': 'http://t.sjs.com.cn',//WAP网站URL地址
                'wap_name': '鲁教测评'  //WAP 网站名
              }
          },
          success: (res) => {
            alert(res);
          },
          error: (res) => {
            alert(res);
          }
        });
        // wx.ready
//      let options = {
//        baseURL:'',
//        url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
//        method:'post',
//        data: {
//          appid:"wx93ea84d052466851",
//          body:'商品购买',
//          mch_id:'1482677762',
//          nonce_str:nonce_str,
//          notify_url:'http://218.241.184.2:9025/stu/pay/wechat/callback',
//          out_trade_no:this.$route.query.no,
//          spbill_create_ip: '218.241.184.2',
//          trade_type:'MWEB',
//          total_fee:this.totalPrice,
//          secretKey:'E3F6967C3D0F9F028900E241115B9DA5'
//        },
//        /**
//         * 服务端返回的状态码检查,默认状态码检查前执行
//         * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
//         * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
//         */
//        ajaxSuccess: (data, res) => {
////          this.pay(nonce_str,data)
//        }
//      }
//      this.ajax(options)

//
//      this.$wechat.http.get('https://api.mch.weixin.qq.com/pay/unifiedorder', ({data}) => {
//        this.$wechat.config({
//          appid:"wx93ea84d052466851",
//          mch_id:'1482677762',
//          nonce_str:nonce_str,
//          sign:sign,
//          body:'商品购买',
//          out_trade_no:val,
//          total_fee:this.totalPrice,
//          spbill_create_ip: '218.241.184.2',
//          notify_url:'http://218.241.184.2:9025/stu/pay/wechat/callback',
//          trade_type:'MWEB',
//
//        })
//      })
      },
      change (val, label) {
        console.log('change', val, label);
      },
      toPay () {
        // window.location.href = 'http://192.168.1.11:8080/app/stu/wxPay/getWxOAuthCode?id=1';
        this.getGenerateUUID();
        //this.getGenerateUUID()
      },
      getCreateUrl () {
        let options = {
          url: '/wxPay/createCodeUrl',
          method: 'post',
          data: {
            orderId: this.$route.query.productIds
          },
          /**
           * 服务端返回的状态码检查,默认状态码检查前执行
           * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
           * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
           */
          ajaxSuccess: (data, res) => {
            console.log(res);

          }
        };
        this.ajax(options);
      }

    },
    created () {
      this.init();

    },
    mounted () {
    },
    components: {HeaderTitle}
  };
</script>
<style lang="scss">
  @import '../../../css/question_child/buy';
</style>
