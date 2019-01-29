<template>
  <div class="pMine">
    <header-title>
      <slot>个人中心</slot>
    </header-title>
    <div class="stance"></div>
    <div class="hello_img" style="position: relative">
      <img class="firstChild_news" style="position: absolute;right:0.15rem;width:0.3rem" @click="open('message')" src="../../../../sasmobile/img/img0927.png" />
      <img :src="getStaticPath($store.state.loginInfo.icon)" onerror="this.src='../../../sasmobile/img/03.jpg'" style="width: 0.7rem;height: 0.7rem;"/>
      <div v-if="messageNum" style="height: 0.03rem;width:0.03rem;background: red;position: absolute;right: 0.2rem;top: 0.24rem;border-radius: 0.03rem"></div>
      <!--<img src="../../../../sasmobile/img/03.jpg"  alt="">-->
      <div style="margin-left: -0.05rem">
        <span style="color: #4E4E4E;">{{$store.state.loginInfo.name}}</span>
      </div>
    </div>
    <div class="hello_tab">
      <div   @click="open('allBook')">
        <div>我的订单</div>
        <div> <x-icon type="ios-arrow-forward" size="0.3rem"></x-icon></div>
      </div>
      <div>
        <div >我的收藏</div>

        <div > <x-icon type="ios-arrow-forward" size="0.3rem"></x-icon></div>
      </div>
      <div  @click="open('pSubmit')">
        <div >留言反馈</div>
        <div> <x-icon type="ios-arrow-forward" size="0.3rem"></x-icon></div>
      </div>
    </div>
    <router-view/>
    <plan></plan>
  </div>
</template>
<script>
import HeaderTitle from '../header'
import plan from '../../student/plan.vue'
export default{
  data () {
    return {
      type: '',
      messageNum:'',
    }
  },
  methods: {
    open (type) {
      this.$router.push({name: type})
    },
    getMsgNum(){
      let options = {
        url: 'sysMsg/queryBadgeNums',
        params: {
        },
        /**
         * 服务端返回的状态码检查,默认状态码检查前执行
         * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
         * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
         */
        ajaxSuccess: (data, res) => {
          this.messageNum=data;
        }
      }
      this.ajax(options)
    },
  },
  created () {
    this.getMsgNum()
    console.log(this.$store.state)
  },
  components: {HeaderTitle,plan}
}
</script>
<style lang="scss">
  @import '../../../pcss/pMine';
</style>
