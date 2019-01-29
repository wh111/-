<template>
    <div class="pQuestion" style="position: relative">
        <header-title>
            <slot>题库</slot>
        </header-title>
        <div class="stance"></div>
        <div class="header">
            <span>为您推荐</span>
            <span>根据您的孩子的学习情况，推荐以下题库</span>
        </div>
        <div class="contents">
            <div class="content" style="border: none" v-for="(item,index) in assessmentList" :key="index"  @click="open(item.id)">
                <section style="width: 100%;text-align: center;height: 0.7rem">
                    <img :src="getStaticPath(item.icon)" style="height: 0.7rem;" onerror="this.src='../../../../sasmobile/img/img66.png'"
                         alt=""/>
                </section>
                <div>{{item.title}}</div>
                <div><span>试卷</span><span>{{item.spec}}{{item.unit | unit }}</span></div>
                <div class="price"><span> 价格：</span><span v-if="item.productTypes == 0"
                                                          class="price">{{item.currentPrice | money}}</span>
                    <span v-else class="price">{{item.currentPrice == null ? '0' : item.currentPrice
                        }}积分</span></div>
            </div>
            <div v-if="!assessmentList.length" style="font-size: 0.12rem">暂无推荐</div>
        </div>
        <div id="searchBar">
            <div class="searchBar">
                <div class="header">
                    <span>选题中心</span>
                </div>
                <!--<div class="pSearch">-->
                <!--<x-input v-model="search"></x-input>-->
                <!--</div>-->
            </div>
        </div>
        <questionbank :studentId="info.id"></questionbank>
    </div>

</template>

<script>
  import HeaderTitle from '../header'
  import SearchView from '../../../pages/student/commonality/search'
  import questionbank from '../../student/questionbank.vue'
  import api from './api'

  export default {
    data () {
      return {
        assessmentList: [],
        type: '',
        flag: false,
        data: [{}, {}],
        titleTop: '',
        show1: false,
        subject: ['全部', '语文', '数学', '英语'],
        subjects: ['科目', '年级', '教材', '类别']
      }
    },
    methods: {
      init () {
        this.info = this.$store.state.loginInfo
        this.assessmentRecommend()
      },
      assessmentRecommend () {
        this.ajax({
          ajaxSuccess: (data, res) => {this.assessmentList = data.dataList},
          url: api.assessmentRecommend.path,
          method: api.assessmentRecommend.method,
          params: {
            studentId: this.info.id,
            curPage: 1,
            pageSize: 6
          },

        })
      },
      open (id) {
        this.$router.push({name: 'questionGradeContent',query:{id:id,studentId:this.info.id}})
      },
      show () {
        this.flag = !this.flag
        if (this.flag === true) {
          $('.screen_content').stop().slideUp(500)
        } else if (this.flag === false) {
          $('.screen_content').stop().slideDown(400)
        }
      },
      debounce (method, delay) {
        let timer = null
        return function () {
          let context = this,
            args = arguments
          clearTimeout(timer)
          timer = setTimeout(function () {
            method.apply(context, args)
          }, delay)
        }
      },
      handleScroll () {
        let tit = document.querySelector('.searchBar')
        // 占位符的位置
        // let rect = tit.getBoundingClientRect();//获得页面中导航条相对于浏览器视窗的位置
        // // console.log(rect)
        // let inser = document.createElement("div");
        // tit.parentNode.replaceChild(inser,tit);
        // inser.appendChild(tit);
        // inser.style.height = rect.height + "px";
        let titleTop = tit.offsetTop
        // 滚动事件
        // 获取当前滚动的距离
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        // 如果滚动距离大于导航条据顶部的距离
        console.log(titleTop)
        if (scrollTop > titleTop) {
          tit.className = 'searchBar isFixed'
          // console.log(scrollTop)
        }
        if (scrollTop < titleTop) {
          tit.className = 'searchBar'
          this.show1 = true
          $('.screen_content').stop().slideUp(500)
        }
      }
    },
    created () {
      this.init()
//		  $('.screen_content').hide()
    },
    mounted () {
//    window.addEventListener('scroll', this.handleScroll)
//    window.onresize = this.debounce(this.handleScroll, 500)
    },
    watch: {},
    destroyed () {
//    window.removeEventListener('scroll', this.handleScroll)
    },
    components: {
      HeaderTitle, SearchView, questionbank
    }
  }
</script>
<style lang="scss">
    @import "../../../pcss/pQuestion";

    .isFixed {
        width: 100%;
        position: fixed;
        /*border: 1px solid #F5F5F5;*/
        top: 0.49rem;
        z-index: 9999;
    }
</style>
