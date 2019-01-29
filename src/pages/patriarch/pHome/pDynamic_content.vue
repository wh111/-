<!----------------------------------
****--@name     pDynamic_content
****--@role     ${*}
****--@date     2018/5/2
****--@author   zzh
----------------------------------->
<!----------------------------------
****--@name     pDynamic
****--@role     ${*}
****--@date     2018/5/2
****--@author   zzh
----------------------------------->
<template>
    <div class="pDynamic_content">
        <header-title>
            <slot>学习动态</slot>
        </header-title>
        <div class="stance"></div>
        <div class="hello_img">
            <img :src="getStaticPath(info.icon)" onerror="this.src='../../../../sasmobile/img/03.jpg'" alt="">
            <div>{{info.name}}</div>
            <div class="school">
                <!--<span style="width: 50%;text-align: right;display: inline-block;float: left;height: 0.12rem">{{info.school || '暂无'}} </span>-->
                <span class="middle" >
                               |
                         <span class="left" style="">{{info.school || '暂无'}}</span>
                         <span class="right" style="">{{info.grade | grade(self)}}</span>
                     </span>
                <!--<span style="width: 50%;display: inline-block;float: left;text-align: left">{{info.grade | grade(self)}}</span>-->
            </div>

        </div>
        <div  ref="scroller"></div>
        <scroller lock-x :height="top" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom">
            <div >
                <div style="height: 0rem;overflow: hidden;visibility: hidden">{{totalCount}}</div>
                <!--{{totalCount}}-->
                <div v-for="(item,index) in newsList" :key="index" v-if="totalCount">
                    <div class="homework">
                        <div>{{item[0].num}}</div>
                    </div>
                    <flexbox wrap="wrap" :gutter="0" class="pDynamic_content">
                        <flexbox-item :span="12" v-for="(item1,index1) in item" :key="index1">
                            <span></span>
                            <span>{{item1.content.split('*')[1]}}&nbsp; </span>
                            <span> {{item1.content.split('*')[2]}}</span>
                        </flexbox-item>
                    </flexbox>
                </div>
                <div style="height: 0.7rem"></div>
            </div>

        </scroller>
    </div>
</template>
<script>
  import HeaderTitle from '../header'
  import { Scroller,  LoadMore } from 'vux'
  import api from './api'
  export default {
    data () {
      return {
        top:'0',
        self:this,
        onFetching: false,
        totalCount:0,
        newsList:{},
        newsListTemp:[],
        num:1,
        data: [
          {name: '昨天'},
          {name: '今天'},
          {name: '明天'}
        ],
        temp:false,

      }
    },
    mounted () {
//      this.$nextTick(()=>{
//        this.top = -this.$refs.scroller.offsetTop + ''
//        console.log(this.top)
//      })
       setTimeout(()=>{
//        console.log(this.$refs.scroller.offsetTop)
         this.top = -this.$refs.scroller.offsetTop + ''
       },1000)

    },
    methods: {
      onScrollBottom () {
        if (this.onFetching) {
          console.log(this.num*10<this.totalCount)
          if(this.num*10<this.totalCount){
            if(this.temp) {
              this.num++;
              this.temp=false
              this.queryStudentNews ()
            }
          }else {

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
        this.info = this.$store.state.loginInfo
        this.queryStudentNews()
      },
      queryStudentNews () {
        this.ajax({
          ajaxSuccess: (data, res) => {
            this.temp=true;
            this.newsListTemp=this.newsListTemp.concat(res.data.dataList)
            console.log(this.newsListTemp,res.data.dataList)
            if ( this.newsListTemp) {

              this.newsListTemp.reduce((obj, item, index) => {
                let month = this.conductDate(item.createTime, 'yyyy年MM月dd日')
                item.num = month
                return obj

              }, {})
            }
            let datalist = {}
            this.newsListTemp.map(item => {
              if (datalist[item.num]) {
                datalist[item.num].push(item)
              } else {
                datalist[item.num] = [item]
              }
            })
            this.newsList=datalist;
            this.totalCount = data.totalCount;
          },
          url: api.queryStudentNews.path,
          method: api.queryStudentNews.method,
          params: {
            studentId: this.info.id,
            curPage: this.num,
            pageSize: 10
          },

        })
      },
    },
    created () {
      this.init()
    },
    components: {
      HeaderTitle,Scroller,  LoadMore
    }
  }
</script>
<style lang="scss">
    @import '../../../pcss/patriarch/pDynamic_content';
    @import '../../../pcss/patriarch/home';
</style>
