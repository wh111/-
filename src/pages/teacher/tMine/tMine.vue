<!----------------------------------
****--@name     tMine
****--@role     ${*}
****--@date     2018/5/4
****--@author   zzh
----------------------------------->
<template>
    <div class="tMine">
        <header-title>
            <slot>个人中心</slot>
        </header-title>
        <div class="stance"></div>
        <div class="hello_img" style="">
            <img style="width: 0.7rem;height: 0.7rem"  onerror="this.src='../../../../sasmobile/img/03.jpg'" :src="getStaticPath(info.icon)" alt="">
            <div style="margin-left: -0.05rem">
                <span style="color: #4E4E4E;">{{info.name}}</span>
            </div>
            <p style="height: 0.05rem;"></p>
            <!--<img class="firstChild_news" src="../../../../sasmobile/img/img0927.png"/>-->
        </div>
        <div class="hello_dynamic">
            <div @click="openMyquestion('mistakes','teaWrong')">
                <span>{{wrongNum}}</span>
                <div>易错题</div>
            </div>
            <div @click="openMyquestion('mistakes','teaDiff')">
                <span >{{diffNum}}</span>
                <div>难题</div>
            </div>
        </div>
        <div class="hello_tab">
            <div>
                <div class="Tabs" @click="openPersonal('personal')">个人资料</div>
                <div >
                    <x-icon type="ios-arrow-forward" size="0.3rem"></x-icon>
                </div>
            </div>
            <div>
                <div class="Tabs" @click="open('message')">消息</div>
                <div>
                    <x-icon type="ios-arrow-forward" size="0.3rem"></x-icon>
                </div>
            </div>
            <div>
                <div class="Tabs" @click="open('pSubmit')">意见反馈</div>
                <div>
                    <x-icon type="ios-arrow-forward" size="0.3rem"></x-icon>
                </div>
            </div>
        </div>
         <plan></plan>
    </div>
</template>
<script>
  import api from './api'
  import HeaderTitle from '../header'
  import plan from '../../student/plan.vue'
  export default {
    data () {
      return {
        articles: [],
        type: 1,
        info: {
          name: ''
        },
        wrongNum: 0,
        diffNum: 0
      }
    },
    methods: {
      openMyquestion (type, val) {
        this.$router.push({name: type, query: {type: val}})
      },
      change (index) {
        this.type = index
      },
      add (data) {
        this.show = data
      },
      open (type) {
        this.$router.push({name: type})
      },
      getcountWrong () {
        let options = {
          url: api.countWrong.path,
          /**
           * 服务端返回的状态码检查,默认状态码检查前执行
           * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
           * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
           */
          ajaxSuccess: (data, res) => {
            this.wrongNum = data
          }
        }
        this.ajax(options)
      },
      getcountDiff () {
        let options = {
          url: api.countDiff.path,
          /**
           * 服务端返回的状态码检查,默认状态码检查前执行
           * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
           * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
           */
          ajaxSuccess: (data, res) => {
            this.diffNum = data
          }
        }
        this.ajax(options)
      },
      openPersonal (type) {
        this.$router.push({name: type, query: {type: 'teacher'}})
      }
    },
    created () {
      console.log(this.$store.state.loginInfo)
      this.info = this.$store.state.loginInfo
      this.getcountWrong()
      this.getcountDiff()
    },
    components: {HeaderTitle,plan}
  }
</script>
<style lang="scss">
    @import '../../../tcss/tMin';
</style>
