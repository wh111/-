<!--
****--@file     weChartBindRes
****--@date     2018/9/13 10:30
****--@author   ZWT
****--@describe 微信绑定结果反馈
-->
<template>
  <div class="weChartBindRes">
    <div class="tips">
      <p>
        <icon :type="show[state].icon" is-msg></icon>
      </p>
      <p>{{ show[state].text }}</p>
    </div>
  </div>
</template>

<script>
  /*当前组件必要引入*/
  //当前组件引入全局的util
  let Util = null;
  export default {
    name: 'weChartBindRes',
    data () {
      return {
        state: 'ing',
        gotoTimer: null,
        show: {
          ing: {
            text: '绑定中，请稍等',
            icon: 'waiting'
          },
          success: {
            text: '绑定成功，稍后自动跳转',
            icon: 'success'
          },
          error: {
            text: '绑定失败，稍后自动跳转',
            icon: 'warn'
          }
        },
        userInfo: null
      };
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util;
        this.userInfo = this.$util.getStaticData('userInfo');
        this.bindWeChat();
      },
      //绑定微信
      bindWeChat () {
        Util.setUrlPrefix('PUBLIC');
        let unionId = this.$util.getStaticData('unionId');
        let opt = {
          method: 'post',
          url: '/wxConnect/wXbound',
          data: {unionId, userId: this.userInfo.id, userType: this.userInfo.userType.toString()},
          ajaxSuccess: res => this.bindWeChatCall(res),
          error: () => this.bindWeChatCall(false)
        };
        this.ajax(opt);
      },

      bindWeChatCall (res) {
        let _this = this;
        this.state = res ? 'success' : 'error';
        if(res){
          this.userInfo.wechat = '0';
          this.$store.commit('setLoginInfo', this.$util._.defaultsDeep({}, this.userInfo));
        }
        this.gotoTimer = setTimeout(function () {
          _this.toHome(_this.userInfo);
        }, 2 * 1000);
      }
    },
    created () {
      this.init();
    },
    beforeDestroy () {
      clearTimeout(this.gotoTimer);
    },
    mounted () {
    },
    components: {}
  };

</script>
