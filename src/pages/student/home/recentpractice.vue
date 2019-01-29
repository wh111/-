<!----------------------------------
****--@name     最近练习列表页面
****--@role     学生
****--@date     2018/4/24
****--@author   zzh
----------------------------------->
<template>
    <div class="recentPractice">
        <header-title>
            <slot>最近练习</slot>
        </header-title>
        <div class="stance"></div>
        <div ref="scroller">
        <scroller   lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200" v-if="data.length">

            <div class="content" v-for="(item,index) in data" :key="index">
                <div class="first"  @click="open(item.id)">
                <div class="img">
                    <img onerror="javascript:this.src='../../../../sasmobile/img/1_07.jpg'" :src="item.icon" />
                </div>
                <div class="homePage_book">
                    <div>{{item.title}}</div>
                    <div><span>已购买</span></div>
                    <div><span>试卷：</span><span>{{item.spec}}{{item.unit | unit }} </span></div>
                    <section class="contentShop">
                        {{item.content}}</section>
                </div>
                </div>
            </div>
                <load-more tip="加载更多" :show-loading="false" v-if="this.num*10<this.totalCount"></load-more>

        </scroller>
        </div>
        <flexbox v-if="data.length==0" orient="vertical" :gutter="10">
            <flexbox-item>
                <div class="text-center" style="margin-top: 0.3rem">好久没有学习了!</div>
            </flexbox-item>
        </flexbox>
    </div>
</template>
<script>
  /* 当前组件必要引入 */
  import api from './api.js'
  import { Scroller } from 'vux'
  import HeaderTitle from '../header'
  // 当前组件引入全局的util
  export default {
    data () {
      return {
        data: [],
        onFetching:false,
        num:1,
        temp:false,
        totalCount:0,
        top:'0'
      }
    },
    methods: {
      // 初始化请求列表数据
      onScrollBottom(){
        if (this.onFetching) {
          if (this.num * 10 < this.totalCount) {
            if (this.temp) {
              this.temp=false
              this.num++;
              this.getMyCurrentStudyProductList()
            }
          } else {

          }

        } else {
          this.onFetching = true
          setTimeout(() => {
            this.$nextTick(() => {
              this.$refs.scrollerBottom.reset()
            })
            this.onFetching = false
          }, 2000)
        }
      },
      init () {
        this.getMyCurrentStudyProductList()
      },
      open (id) {
        this.$router.push({name: 'recentPractice_content',query:{id:id}})
      },
      // 获取最近练习的题库
      getMyCurrentStudyProductList () {
        let options = {
          url: api.myCurrentStudyProductList.path,
          params: {
            curPage: this.num,
            pageSize: 10
          },
          /**
           * 服务端返回的状态码检查,默认状态码检查前执行
           * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
           * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
           */
          ajaxSuccess: (data, res) => {
            this.data = this.data.concat(data['dataList'])
            this.totalCount = data.totalCount
            this.data.map((item)=>{
              item.icon= this.getStaticPath(item.icon)
            })
          }
        }
        this.ajax(options)
      },

    },
    created () {
      this.init()
    },
    mounted () {
      this.top=-this.$refs.scroller.offsetTop+''
    },
    components: {HeaderTitle, Scroller}
  }
</script>
<style lang="scss">
    @import '../../../css/home/recentpractice';
</style>
