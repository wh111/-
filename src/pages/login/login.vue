<!--
****--@file     login.vue
****--@date     2018/04/23 9:29
****--@author   zyc
****--@describe  登录
-->
<template>
  <div class="helloWord">
    <div v-show="!wechating" style="position: fixed">
      <div>
        <ul class="hello_header">
          <li>
            <x-icon type="ios-arrow-back" size="0.3rem"></x-icon>
            <div @click="step=1">返回</div>
            <div>关闭</div>
          </li>
          <li>绑定身份及账号</li>
          <li>
            <div></div>
            <div></div>
            <div></div>
          </li>
        </ul>
      </div>
      <div class="hello_content">

        <div class="backGround" v-if="step==1">
          <h1>请选择您的角色:</h1>
          <!--<img src="../../assets/image/login_03.jpg"/>-->
          <div class="identify" style="left: 0" @click="selectRole('STUDENT')">
            <img style="margin-left: 0.25rem" class="person" src="../../assets/image/students.png"/>
            <p style="margin-left: 0.25rem">我是学生</p>
          </div>
          <div class="identify" style="left: 33%" @click="selectRole('TEACHER')">
            <img class="person" src="../../assets/image/teacher.png"/>
            <p>我是老师</p>
          </div>
          <div class="identify" style="right: 0" @click="selectRole('GUARDIAN')">
            <img style="margin-right: 0.25rem" class="person" src="../../assets/image/parents.png"/>
            <p style="margin-right: 0.25rem">我是家长</p>
          </div>
          <h2 style="">角色选择后不可更改</h2>
        </div>
        <div class="backGround" v-if="step==2">
          <!--<img src="../../assets/image/login_05.jpg"/>-->
          <h3>请输入已有的平台账号进行登录</h3>
          <div class="hiddenItem" style="top: 1.465rem;">
            <input class="inputItem" v-model="form.username" placeholder="账号" type="text"/>
          </div>
          <div class="hiddenItem" style="top: 2.115rem;">
            <input style="height: 0.54rem" class="inputItem" placeholder="密码" v-model="form.password"
                   type="password"/>
          </div>
          <div class="hiddenItem" style="top: 2.82rem;text-align: left;">
            <check-icon :value.sync="bindWeChat" type="plain" v-if="!weChatLoginError"> 是否与微信绑定</check-icon>
          </div>
          <div class="hiddenItem login" :style="{top:step==2?'3.7rem' :'3.2rem'}" @click="login">
            登录
          </div>
          <div class="hiddenItem" style="top:3.35rem;right: 0;text-align: left" v-if="currRole=='GUARDIAN'">
          <span @click="step=3">注册账号</span>
          </div>

        </div>
        <div v-if="step==3">
          <img style="margin-top: 0" src="../../assets/image/register_03.jpg"/>
          <div class="hiddenItem" style="top: 1.77rem;height: 0.52rem">
            <input class="inputItem" style="height: 0.52rem" v-model="form.mobile" placeholder="手机号"
                   type="text"/>
          </div>
          <div class="hiddenItem" style="top: 2.45rem;height: 0.52rem;">
            <input class="inputItem" style="height: 0.52rem;width:1.9rem" v-model="form.code" placeholder="验证码"
                   type="text"/>
            <button class="sendKey" v-if="!sendKeySuccess" @click="getPassTel" style="">获取验证码</button>
            <button class="sendKey" v-else>
              已发送<span style="color:#fd7416;padding-left:0.05rem">{{timesend}}</span>s
            </button>
          </div>
          <div class="hiddenItem" style="top: 3.15rem;">
            <input style="height: 0.54rem" class="inputItem" placeholder="密码" v-model="form.password"
                   type="password"/>
          </div>
          <div class="hiddenItem login" style="top:3.85rem" @click="register">
            注册
          </div>
        </div>
      </div>
    </div>
    <!--<alert v-model="show" @on-hide="onHide">{{message}}</alert>-->
    <!--<div v-transfer-dom>-->
      <!--<loading :show="showLoad" :text="loadText"></loading>-->
    <!--</div>-->
  </div>
</template>

<script>
  import api from './api';
  import HeaderTitle from '../header';
  import { CheckIcon, Loading, TransferDomDirective as TransferDom } from 'vux';

  let Util = null;
  export default {
    name: 'Login',
    directives: {
      TransferDom
    },
    data () {
      return {
        sendKeySuccess: false,
        message: '',
        show: false,
        showLoad: true,
        loadText: 'loading',
        radioValue: [],
        title: '',
        currRole: '', // 学生:STUDENT  老师:TEACHER  家长:GUARDIAN
        commonList: ['学生', '家长', '老师'],
        step: 1,
        form: {
          username: '',
          password: '',
          sex: '',
          name: '',
          mobile: '',
          code: ''
        },
        timesend: 60,

        bindWeChat: true,
        weChatLoginError: false,
        wechating: true,
        goto: ''
      };
    },
    created () {
      this.init();
    },
    methods: {
      getPassTel () {

        if (!(/^1[34578]\d{9}$/.test(this.form.mobile))) {
          this.show = true;
          this.message = '请输入正确手机号';

        } else {

          this.ajax({
            ajaxSuccess: (data, res) => {
              var that = this;
              var setInt = window.setInterval(function () {
                that.timesend--;
                if (that.timesend == 0) {
                  window.clearInterval(setInt);

                  that.sendKeySuccess = false;
                  that.timesend = 60;
                }
              }, 1000);
              this.sendKeySuccess = true;
            },

            url: api.sendValidCode.path,
            method: api.sendValidCode.method,
            data: {
              mobile: this.form.mobile,
              types: 10
            }
          });

        }

      },
      onHide () {
        if (this.message == '注册成功') {
          this.step = 2;
        }
      },
      register () {
        let opt = {
          ajaxSuccess: (data, res) => {
            if (res.status.code != '0') {
              this.show = true;
              this.message = res.status.msg;
            } else {
              this.show = true;
              this.message = '注册成功';
            }
          },
          url: '/register',
          method: 'post',
          data: this.form

        };
        this.ajax(opt);
      },
      init () {

        Util = this.$util;
        Util.setUrlPrefix('PUBLIC');
        // this.concurrentAjax()
        let {goto} = this.$route.query;
        this.goto = goto || 'false';
        this.getEnvs();
        if (this.$util.isWeiXin()) {
          this.checkBindWeChat();
        } else {
          this.wechating = false;
          this.gotoInit(goto);
        }
      },
      gotoInit (goto) {
        if (goto) {
          this.$util.setStaticData('goto', goto);
        } else {
          this.$util.delStaticData('goto');
        }
      },
      // 检查是否已经进行微信绑定
      checkBindWeChat () {
        let {code, state} = this.$route.query;
        this.gotoInit(state);
        if (!code) {
          if (state) {
            this.wechartTips('取消微信登录');
          } else {
            this.weChatLogin();
          }
        } else {
          this.getAccessToken(code);
        }
      },
      //把code传给后台
      getAccessToken (code) {
        Util.setUrlPrefix('PUBLIC');
        let opt = {
          method: 'get',
          url: '/wxConnect/oauth',
          params: {code},
          error: () => {
            this.weChatLoginError = true;
            this.wechartTips('微信登录失败');
          },
          ajaxSuccess: unionId => {
            if (unionId) {
              this.getUserInfoByUnionId(unionId);
            } else {
              this.weChatLoginError = true;
              this.wechartTips('微信登录失败');
            }
          }
        };
        this.ajax(opt);
      },
      //通过openId获取登录信息
      getUserInfoByUnionId (unionId) {
        let opt = {
          method: 'post',
          url: '/wxConnect/wXlogin/',
          data: {unionId},
          ajaxSuccess: res => {
            this.showLoad = false;
            if (res instanceof Object) {

              this.toHome(res);
              this.getEnvs();
            } else {
              this.$util.setStaticData('unionId', unionId);
              this.checkBindWeChatCall(res, unionId);
            }
          },
          error: () => this.wechartTips()
        };
        this.ajax(opt);
      },
      wechartTips (msg) {
        this.showLoad = false;
        this.wechating = false;
        if (msg) {
          this.bindWeChat = false;
          this.showMsg(msg);
        }
      },
      // 微信登录
      weChatLogin () {
        let params = {
          appid: 'wx25c6967877bff1ec',
          redirect_uri: encodeURI('http://t.sjs.com.cn/sasmobile/login'),
          response_type: 'code',
          scope: 'snsapi_userinfo',
          state: encodeURI(this.goto) || ''
        };
        let paramsArr = [];
        Object.keys(params).map(key => paramsArr.push(`${key}=${params[key]}`));
        let url = `https://open.weixin.qq.com/connect/oauth2/authorize?${paramsArr.join('&')}#wechat_redirect`;
        window.location.href = url;
      },
      checkBindWeChatCall (res) {
        if (res instanceof Object) {

          if (this.bindWeChat && this.$util.getStaticData('unionId')) {
            this.$util.setStaticData('userInfo', res);
            this.$router.push({name: 'weChartBindRes'});
          } else {
            this.toHome(res);
          }
        } else {
          this.wechartTips();
        }
      },

      showMsg (str) {
        this.show = true;
        this.message = str;
      },
      selectRole (role) {
        this.step = 2;
        this.currRole = role;
        Util.setUrlPrefix(this.currRole);
      },
      // 用户登录调用
      login: function () {
        let data = {};
        if (this.currRole === 'TEACHER') {
          data['mobile'] = this.form['username'];
          data['password'] = this.form['password'];
        } else {
          data = this.form;
        }
        let obj = {
          currRole: this.currRole,
          vue: this,
          options: {
            method: api.login.method,
            url: api.login.path,
            data: data
          }
        };
        this.$store.dispatch('getLoginTokenByPost', obj).then((data, res) => {
//          if (this.currRole === 'GUARDIAN') {
//            this.$router.push({name:'pHome'})
//            return;
//          }
          this.checkBindWeChatCall(data);
//          this.getUserInfo()
        });
      },
      // 获取用户登录信息
      getUserInfo () {
        let opt = '';
        if (this.currRole == 'STUDENT') {
          opt = '/student';
        }
        let obj = {
          vue: this,
          options: {
            method: api.userInfo.method,
            url: opt + api.userInfo.path
          }
        };
        console.log('ppp');
        this.$store.dispatch('getLoginInfoByGet', obj);
      },
      // 获取envs信息
      getEnvs () {

        let opt = {
          url: '/envs',
          /**
           * 服务端返回的状态码检查,默认状态码检查前执行
           * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
           * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
           */
          ajaxSuccess: (data, res) => {
            this.$store.commit('initEnvs', res.data);
          }
        };
        this.ajax(opt);
      }
    },
    computed: {
      userInfo () {
        return this.$store.state.loginInfo || {};
      }
    },
    components: {HeaderTitle, CheckIcon, Loading}
  };
</script>
<style lang="scss">
  @import '../../css/HelloWord';
  @import '../../css/header';
</style>
