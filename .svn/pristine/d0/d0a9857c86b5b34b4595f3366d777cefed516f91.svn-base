<template>
  <div id="app" style="height: 100%">
    <div class="weChartBindRes" v-if="!isWX">
      <div class="tips">
        <p>
          <icon type="warn" is-msg></icon>
        </p>
        <p>请在微信中打开</p>
      </div>
    </div>
    <router-view v-else/>
  </div>
</template>
<script>
  export default {
    name: 'App',
    data () {
      return {};
    },
    created () {
      this.init();
    },
    computed: {
      isWX: function () {
        return true
      }
    },
    methods: {
      init () {
        // this.exampleAjax()
      },
      exampleAjax () {
        let options = {
          url: '/user/getUserInfo',
          method: 'get',
          /**
           * 服务端返回的状态码检查,默认状态码检查前执行
           * @param {object} res
           * @param {string | number} code
           */
          beforeCheckCode (res, code) {
            console.log('这是个例子:code检查前', res, code);
          },
          /**
           * 服务端返回的状态码检查,默认状态码检查后执行
           * @param {object} res
           * @param {string | number} code
           */
          afterCheckCode (res, code) {
            console.log('这是个例子:code检查后', res, code);
          },
          /**
           * 服务端返回的状态码检查,自定义状态码检查
           * @param {object} res
           * @param {string | number} code
           */
          checkCode (res, code) {
            console.log('这是个例子:自定义检查', res, code);
          },
          /**
           * 服务端返回的状态码检查,默认状态码检查前执行
           * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
           * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
           */
          ajaxSuccess (data, res) {
            console.log('这是个例子:数据请求成功', res);
          }
        };
        let axiosObj = this.fetch['promise'](options, true);
        let axios = axiosObj['axios'];
        let checkList = axiosObj['checkList'];
        axios.then(res => {
          return checkList['checkStatus'](res, options);
        }).then(res => {
          return checkList['checkCode'](res, options);
        }).then(res => {
          if (typeof options.ajaxSuccess === 'function') {
            options.ajaxSuccess(res.data, res);
          }
        });
        // this.ajax(options)
      }
    },
    watch: {},
    mounted () {
      window.onpopstate = () => {
        if (!this.$store.state.allowBack) {    //    这个allowBack 是存在vuex里面的变量
          history.go(1);
        }
      };
    }
  };
</script>
<style lang="scss">
  .weChartBindRes {
    .tips {
      text-align: center;
      padding-top: 36px;
    }
    p {
      margin-top: 10px
    }
  }
  .btnWarn {
    text-align: center;
    color: #222;
    font-size: 0.12rem;
    height: 0.2rem;
    line-height: 0.3rem;
  }

  .vux-x-icon-ios-arrow-forward {
    fill: #DBDBDB !important;
    font-size: 0.16rem !important;
  }

  .stance {
    height: 0 !important;
  }

  #app {
    .weui-cell_access .weui-cell__ft:after {
      height: 8px !important;
      width: 8px !important;
      height: 0.09rem !important;
      width: 0.09rem !important;
      right: 0.09rem;
      border-color: #dbdbdb !important;
    }
    .weui-cell_select .weui-cell__bd:after {
      height: 8px !important;
      width: 8px !important;
      height: 0.09rem !important;
      width: 0.09rem !important;
      border-color: #dbdbdb !important;
    }
  }

</style>
