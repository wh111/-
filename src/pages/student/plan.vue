<!----------------------------------
****--@name     plan
****--@role
****--@date     2018/5/8/008
****--@author   zzh
----------------------------------->
<template>
  <div>
    <group>
      <x-switch title="解绑微信" style="color: #000;font-size: 0.15rem" v-model="showUnbindWX"
                v-if="userInfo && userInfo.wechat == '1'"></x-switch>
      <x-switch title="退出" style="color: #000;font-size: 0.15rem" v-model="show"></x-switch>
    </group>
    <div v-transfer-dom>
      <confirm v-model="show"
               title="退出登录"
               @on-cancel="onCancel"
               @on-confirm="logout"
               @on-show="onShow"
               @on-hide="onHide">
        <p style="text-align:center;">确定退出?</p>
      </confirm>
      <confirm v-model="showUnbindWX"
               title="解绑微信"
               @on-cancel="onCancel"
               @on-confirm="unBindWXCall"
               @on-show="onShow"
               @on-hide="onHide">
        <p style="text-align:center;">确定解绑?</p>
      </confirm>
    </div>
    <br>
    <toast v-model="showToast" :text="toastStr"></toast>
  </div>
</template>

<script>
  import api from './api';

  export default {
    data () {
      return {
        show: false,
        showUnbindWX: false,
        showToast: false,
        toastStr: '',
        stulist: [],
        userInfo: {}
      };
    },
    methods: {
      init () {
        this.userInfo = this.$store.state.loginInfo;
      },
      onCancel () {
        console.log('on cancel');
      },
      onConfirm () {
        console.log(this.show);
      },
      unBindWXCall () {
        this.$util.setUrlPrefix('PUBLIC');
        let opt = {
          method: 'post',
          url: '/wxConnect/wXdisbound',
          data: {
            userId: this.userInfo.id, userType: this.userInfo.userType.toString()
          },
          ajaxSuccess: res => {
            this.showToastCall(`解绑${res ? '成功' : '失败'}`);
            if (res) {
              this.userInfo.wechat = '0';
              this.$store.commit('setLoginInfo', this.$util._.defaultsDeep({}, this.userInfo));
            }
          }
        };
        this.ajax(opt);
        this.setUrlPrefix(this.userInfo.userType);
      },
      logout () {
        let obj = {
          vue: this,
          options: {
            method: api.logout.method,
            url: api.logout.path
          }
        };
        this.$store.dispatch('loginOut', obj);
        this.$router.push({name: 'login'});
      },
      onHide () {
        console.log('on hide');
      },
      onShow () {
        console.log('on show');
      },
      showToastCall (msg) {
        this.showToast = true;
        this.toastStr = msg;
      }
    },
    created () {
      this.init();
    },
    mounted () {

    }
  };
</script>
