<!----------------------------------
****--@name     学生端首页
****--@role     学生
****--@date     2018/4/23
****--@author   zzh
----------------------------------->
<template>
    <div id="homeFirst">
        <div class="back" style=""></div>
        <div>
            <!--<ul class="hello_header">-->
                <!--<li @click="skip">-->
                    <!--<x-icon type="ios-arrow-back" size="0.3rem"></x-icon>-->
                    <!--<div>返回</div>-->
                    <!--<div>关闭</div>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<div>鲁教乐学</div>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<div></div>-->
                    <!--<div></div>-->
                    <!--<div></div>-->
                <!--</li>-->
            <!--</ul>-->
            <header-title>
                <slot>个人中心</slot>
            </header-title>
            <div class="stance"></div>
            <div id="homePage">
                <div class="homePage_head">
                    <div class="headerImg">
                        <div>
                            <img :src="getStaticPath(userInfo.icon)" onerror="this.src='../../../sasmobile/img/03.jpg'" style="width: 0.4rem;height: 0.4rem;"/>
                            <span class="home_name">{{userInfo.name}}</span><span v-if="userInfo.vipStatus === 1"
                                                                                  style="color: #FFA91B">V</span><span
                                style="color: #EAEAEA" v-else>V</span>
                        </div>
                        <div style="text-align: right">
                            <img src="../../../sasmobile/img/08.jpg" style="width: 0.9rem;height: 0.25rem;"
                                 @click="open('recentPractice')"/>
                        </div>
                    </div>
                    <div class="homePage_books">
                        <div class="homePage_book" v-for="(item,index) in studyProductList" :key="index" @click="getRecent(item.id)">
                            <img :src="getStaticPath(item.icon)" onerror="javascript:this.src='../../../../sasmobile/img/1_07.jpg'"/>
                            <div>{{item.title}}</div>
                            <div><span> 价格：</span><span v-if="item.productTypes == 0"
                                                        class="price">{{item.currentPrice | money}}</span>
                                <span v-else class="price">{{item.currentPrice == null ? '0' : item.currentPrice
                                    }}积分</span></div>
                            <div><span>试卷</span><span>{{item.spec}}{{item.unit | unit }}</span></div>
                        </div>
                        <p style="width: 100%" class="text-center" v-if="studyProductList.length==0">
                            好久没有学习了!
                        </p>
                    </div>
                </div>
                <ul class="homePage_center">
                    <li v-for="(item,index) in productTypeListData" :key="index" :class="index%3==2?'last':''"
                        @click="open('questionbank',item.value)">
                        {{item.title}}
                    </li>
                </ul>
                <div class="homePage_head" style="box-sizing: border-box;padding: 0 0.15rem;margin-top: 0.05rem">
                    <div class="headerImg">
                        <div style="margin-bottom: 0.1rem;color: #585858">
                            <h4 style="margin-top: 0.15rem">推荐练习</h4>
                        </div>
                    </div>
                    <div style="display: flex;width: 100%;flex-wrap: wrap">
                        <p class="message" style="margin-top: 0.2rem" v-if="!assessmentRecommendData.length">暂无推荐</p>
                        <div class="homePage_book" v-for="(item,index) in assessmentRecommendData" :key="index"
                             @click="open('questionGradeContent',item.id)">
                            <img :src="getStaticPath(item.icon)" onerror="this.src='../../../sasmobile/img/1_03.jpg'"/>
                            <div class="textShowEllipsis">{{item.title}}</div>
                            <div><span> 价格：</span><span v-if="item.productTypes == 0"
                                                        class="price">{{item.currentPrice | money}}</span>
                                <span v-else class="price">{{item.currentPrice == null ? '0' : item.currentPrice
                                    }}积分</span></div>
                            <div><span>试卷</span><span>{{item.spec}}{{item.unit | unit }}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from './api.js'
import headerTitle from './header.vue'
export default {
  data () {
    return {
      show: true,
      studyProductList: [], // 最近练习
      assessmentRecommendData: [], // 推荐练习
      productTypeListData: [{value: 1, title: '小升初'}, {value: 2, title: '初升高'}, {value: 3, title: '中考'}, {
        value: 4,
        title: '高考'
      }, {value: 5, title: '会考'}, {value: 6, title: '期中'}, {value: 7, title: '期末'}, {
        value: 8,
        title: '初高衔接'
      }, {value: 9, title: '寒暑假'}, {value: 10, title: '同步学练'}, {value: '', title: '全部'}]
    }
  },
  methods: {
    init () {
      this.getUserInfo()
      this.getMyCurrentStudyProductList()
      // this.getTypes()
      this.getAssessmentRecommend();
    },
    getRecent (id) {
      this.$router.push({name: 'recentPractice_content', query: {id: id}})
    },

    // 获取用户登录信息
    getUserInfo () {
      let obj = {
        vue: this,
        options: {
          method: api.userInfo.method,
          url: api.userInfo.path
        }
      }
      this.$store.dispatch('getLoginInfoByGet', obj);

    },

    // 获取最近练习的题库
    getMyCurrentStudyProductList () {
      let options = {
        url: api.myCurrentStudyProductList.path,
        params: {
          curPage: 1,
          pageSize: 3
        },
        /**
           * 服务端返回的状态码检查,默认状态码检查前执行
           * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
           * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
           */
        ajaxSuccess: (data, res) => {
          this.studyProductList = data['dataList']
          this.studyProductList.map((item) => {
            item.icon = this.getStaticPath(item.icon)
          })
        }
      }
      this.ajax(options)
    },

    // 获取类别
    //    getTypes () {
    //      let options = {
    //        baseURL: '/stu',
    //        url: api.stuEnvs.path,
    //        /**
    //         * 服务端返回的状态码检查,默认状态码检查前执行
    //         * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
    //         * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
    //         */
    //        ajaxSuccess: (data, res) => {
    //          this.productTypeListData = data['productTypeList']
    //        }
    //      }
    //      this.ajax(options)
    //    },

    // 获取推荐练习
    getAssessmentRecommend () {
      let options = {
        url: api.assessmentRecommend.path,
        params: {
          curPage: 1,
          pageSize: 6
        },
        /**
           * 服务端返回的状态码检查,默认状态码检查前执行
           * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
           * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
           */
        ajaxSuccess: (data, res) => {
          this.assessmentRecommendData = data['dataList']
          this.assessmentRecommendData.map((item) => {
            item.imgs = '../../../sasmobile/img/1_03.jpg'
          })
        }
      }
      this.ajax(options)
    },
    open (type, params) {
      if (params) {
        this.$router.push({name: type, query: {id: params}})
        return
      }
      this.$router.push({name: type})
    },
    skip () {
      if (isLogin) {  // 判断是否登录
        this.$router.push({name: 'login'})
      }
    }
  },
  created () {
    this.init()
  },
  computed: {
    userInfo () {
      return this.$store.state.loginInfo || {}
    },
    isLogin () {
      return this.$store.state.isLogin || false
    }
  },
  components: {
    headerTitle
  }
}
</script>
<style lang="scss">
    @import '../../css/home';
    @import '../../css/header';
</style>
