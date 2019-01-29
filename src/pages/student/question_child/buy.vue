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
    <template v-if="data && data instanceof Object">
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
      <x-button :show-loading="paying" :text="payError ? '返回订单' : '去支付'" @click.native="submit"
                type="primary" :disabled="!canPay && payError"></x-button>

    </template>
    <div v-transfer-dom>
      <loading :show="loadShowState" :text="loadShowText"></loading>
      <alert v-model="showAlertState" title="操作提示" @on-hide="backList">{{alertMsg}}</alert>
    </div>
  </div>
</template>
<script>
  /* 当前组件必要引入 */
  import HeaderTitle from '../header';
  import { Loading, TransferDomDirective as TransferDom, querystring, Alert, XButton } from 'vux';
  import api from './api';
  // 当前组件引入全局的util
  // let Util = null
  export default {
    data () {
      return {
        appId: 'wx25c6967877bff1ec',
        data: null,
        loading: null,
        loadShowState: true,
        loadShowText: '',
        openId: '',
        urlQuery: null,
        showAlertState: false,
        payError: false,
        paying: false,
        alertMsg: '',
        canPay: false,
        wxConfig: null
//        payInfo: null
      };
    },
    directives: {
      TransferDom
    },
    methods: {
      // 初始化请求列表数据
      init () {
        let {code, state} = this.$route.query;
        if (this.$util.isWeiXin()) {
          if (!code) {
            this.getCode();
          } else {
            this.showLoad(true, '正在获取订单');
            this.urlQuery = querystring.parse(state);
            this.getOpenId(code);
          }
        }
      },
      initWxConfig () {
        let _this = this;
        let url = window.location.href;
        let options = {
          url: api.getJsapiTicket.path,
          method: api.getJsapiTicket.method,
          data: {url},
          jsonString: true,
          ajaxSuccess: data => {
            if (data instanceof Object) {
              console.log('微信配置');
              this.wxConfig = data;
//              this.$wechat.config({
//                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//                appId: this.appId, // 必填，公众号的唯一标识
//                timestamp: data.timestamp, // 必填，生成签名的时间戳
//                nonceStr: data.noncestr, // 必填，生成签名的随机串
//                signature: data.sign,// 必填，签名
//                jsApiList: ['chooseWXPay'], // 必填，需要使用的JS接口列表
//                error: function () {
//                  _this.toPayError('微信支付环境异常');
//                },
//                success: function () {
//                  _this.canPay = true;
//                }
//              });
              this.getOrder();
            } else {
              this.toPayError('微信支付环境异常');
            }
          }
        };
        this.ajax(options);
      },
      getOpenId (code) {
        let options = {
          url: api.getOpenId.path,
          params: {code},
          ajaxSuccess: data => {
            if (!data) {
              this.toPayError('微信认证失败');
            } else {
              this.openId = data;
              this.initWxConfig();
            }
          }
        };
        this.ajax(options);
      },
      getCode () {
        let {host, search, protocol} = window.location;
        let params = {
          appid: this.appId,
          redirect_uri: protocol + '//' + host + '/sasmobile/student/commonality/buy',
          response_type: 'code',
          scope: 'snsapi_base',
          state: search && search.slice(1) || 'none'
        };
        let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?' + querystring.stringify(params) + '#wechat_redirect';
        window.location = url;
      },
      showLoad (show = false, text = '') {
        this.loadShowText = text;
        this.loadShowState = show;
      },
      showAlert (show = false, msg) {
        this.showAlertState = show;
        this.alertMsg = msg;
      },
      getOrder () {
        let options = {
          url: api.getOrder.path,
          params: {id: this.urlQuery.productIds},
          ajaxSuccess: data => {
            data.productList.map(item => item.icon = this.getStaticPath(item.icon));
            this.data = data;
            this.loadShowState = false;
          }
        };
        this.ajax(options);
      },
      submit () {
        if (this.paying) {
          return false;
        }
        if (this.payError) {
          this.backList();
        } else {
          this.paying = true;
          this.toPay();
        }
      },
      toPayError (msg) {
        this.payError = true;
        this.paying = false;
        this.showLoad();
        this.showAlert(true, msg);
      },
      toPay () {
        let {data: {id: orderId}, openId, wxConfig: {noncestr: nonceStr}} = this;
        let options = {
          url: api.pay.path,
          method: api.pay.method,
          data: {orderId, openId, nonceStr},
          ajaxSuccess: data => {
            if (data instanceof Object) {
              this.wxPay(data);
            } else {
              this.toPayError('发起支付失败');
            }
          },
          error: () => this.toPayError('发起支付失败')
        };
        this.ajax(options);
      },
      wxPay (data) {
        let _this = this;
//        alert(JSON.stringify(data));
        let payConfig = {
          'appId': data.appid,     //公众号名称，由商户传入
          'timeStamp': data.timestamp,         //时间戳，自1970年以来的秒数
          'nonceStr': data.nonce_str, //随机串
          'package': data.prepay_id,
          'signType': 'MD5',         //微信签名方式：
          'paySign': data.sign //微信签名
        };
//        alert(JSON.stringify(payConfig));
        WeixinJSBridge.invoke('getBrandWCPayRequest', payConfig,
          function (res) {
//            alert(JSON.stringify(res));
            if (res.err_msg == 'get_brand_wcpay_request:ok') {
              // 支付成功
              _this.payRes('支付成功');
            } else if (res.err_msg == 'get_brand_wcpay_request：cancel') {
              // 支付过程中用户取消
              _this.payRes('支付取消');
            } else {
              // 支付失败
              _this.payRes('支付失败');
            }
          }
        );
//        this.$wechat.chooseWXPay({
//          timeStamp: Math.round(new Date().getTime()/1000), // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
//          nonceStr: data.nonce_str, // 支付签名随机串，不长于 32 位
//          package: 'prepay_id=' + data.prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
//          signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
//          paySign: data.sign, // 支付签名
//          success: function (res) {
//            // 支付成功后的回调函数
//            if (res.errMsg == 'chooseWXPay:ok') {
//              //支付成功
//              _this.payRes('支付成功');
//            } else {
//              _this.payRes('支付失败');
//            }
//          },
//          cancel: function (res) {
//            //支付取消
//            _this.payRes('支付取消');
//          },
//          error: function () {
//            _this.payRes('支付失败');
//          }
//        });
      },
      payRes (msg) {
        this.showLoad(true, msg);
        setTimeout(() => this.backList(), 3000);
      },
      backList () {
        this.$router.push({name: 'allBook'});
      }
    },
    created () {
      this.init();
    },
    mounted () {
    },
    components: {HeaderTitle, Loading, Alert, XButton}
  };
</script>
<style lang="scss">
  @import '../../../css/question_child/buy';
</style>
