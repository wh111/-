<template>
  <div class="firstChild">
    <header-title>
      <slot>个人中心</slot>
    </header-title>
    <div class="stance"></div>
    <div class="hello_img" style="position: relative">
      <img style="width: 0.7rem;height: 0.7rem" v-if="$store.state.envs" :src="getStaticPath(userInfo.icon)"  onerror="javascript:this.src='../../../../sasmobile/img/03.jpg'" @click="open('personal')" alt="">
      <div style="margin-left: -0.05rem">
        <span style="color: #1b1b1b;">{{userInfo.name}}</span>
        <span style="color: #FFA613;" @click="open('member')" v-if="userInfo.vipStatus === 1">V</span>
        <span v-else style="color: #ccc" @click="open('member')">V</span>
      </div>
      <div>
        <span>我的积分</span>
        <span style="color: #FB4440">{{userInfo.integral||0}}分</span>
      </div>
      <img class="firstChild_news" @click="open('message')" src="../../../sasmobile/img/img0927.png"/>
      <div v-if="messageNum" style="height: 0.03rem;width:0.03rem;background: red;position: absolute;right: 0.26rem;top: 0.26rem;border-radius: 0.03rem"></div>
    </div>
    <div class="hello_dynamic">
      <div @click="open('projectLibrary')">
        <span>{{bookNum}}</span>
        <div>专题库</div>
      </div>
      <div @click="open('myErrors','wrong')">
        <span>{{wrong}}</span>
        <div>我的错题</div>
      </div>
      <div @click="open('myErrors','enjoy')">
        <span>{{enjoy}}</span>
        <div>我的收藏</div>
      </div>
      <div @click="open('myErrors','notes')">
        <span>{{notes}}</span>
        <div>我的笔记</div>
      </div>
    </div>
    <div class="hello_tab">
      <div  @click="open('theClassOf')">
        <div class="Tabs" >我的班组</div>
        <div class="tIcon"> <x-icon type="ios-arrow-forward" size="0.3rem"></x-icon></div>
      </div>
      <div  @click="open('myOrder')">
        <div class="Tabs" >我的订单</div>
        <div class="tIcon"> <x-icon type="ios-arrow-forward" size="0.3rem"></x-icon></div>
      </div>
      <div>
        <div class="Tabs">我的收藏</div>
        <div class="tIcon"> <x-icon type="ios-arrow-forward" size="0.3rem"></x-icon></div>
      </div>
    </div>
    <router-view/>
    <plan></plan>
  </div>
</template>
<script>
import HeaderTitle from './header'
import plan from './plan'
import api from './api'
export default{
  data () {
    return {
      type: 1,
      wrong: 0,
      enjoy: 0,
      notes: 0,
      bookNum: 0,
      messageNum:0
    }
  },
  methods: {
    getmyProductList () {
      let options = {
        url: api.myProductList.path,
        params: {
          title: '',
          textbookVersionId: '',
          subject: '',
          grade: '',
          productTypes: '',
          types: ''
        },
        /**
         * 服务端返回的状态码检查,默认状态码检查前执行
         * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
         * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
         */
        ajaxSuccess: (data, res) => {
          this.bookNum = data.dataList.length || 0
        }
      }
      this.ajax(options)
    },
    open (type, select) {
      this.$router.push({name: type, query: {type: select}})
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
    questionsWrongNum (type) {
      let path = ''
      if (type == 'wrong') {
        path = api.myWrongListNum.path
      } else if (type == 'enjoy') {
        path = api.myquestionsFavoriteNum.path
      } else {
        path = api.questionsNotesNum.path
      }
      let options = {
        url: path,
        /**
         * 服务端返回的状态码检查,默认状态码检查前执行
         * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
         * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
         */
        ajaxSuccess: (data, res) => {
          console.log(data)
          data.dataList.map((item) => {
            this[type] += item.num
          })

          // this.subjectList=data.dataList;
        }
      }
      this.ajax(options)
    }
  },
  created () {
    this.questionsWrongNum('wrong')
    this.questionsWrongNum('enjoy')
    this.questionsWrongNum('notes')
    this.getmyProductList();
    this.getMsgNum();
  },
  computed: {

    userInfo () {
      console.log(this.$store.state)
      return this.$store.state.loginInfo || {}
    }
  },
  components: {HeaderTitle, plan}
}
</script>
<style lang="scss">
  @import '../../css/firstchild';

</style>
