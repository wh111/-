<!----------------------------------
****--@name     tBook
****--@role     ${*}
****--@date     2018/5/7
****--@author   zzh
----------------------------------->
<template>
    <div>
        <p class="message" style="margin-top: 0.3rem" v-if="!data.length">暂无作业</p>
    <scroller lock-x  @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :height="top" :scroll-bottom-offst="200">
    <div class="tBook" ref="scroller">

        <ul class="tBookHeader" v-for="(item,index) in data" :key="index">
            <li class="tElement">
                <div>{{item.title}}</div>
                <p>布置时间{{item.startTime|formatDate('yyyy-MM-dd HH:mm')}} | 上交时间{{item.submitTime|formatDate('yyyy-MM-dd HH:mm')}}</p>
            </li>
            <li class="tCorrect">
                <ul  @click="open('tAlready','homework',item.id,item.title)">
                    <li class="tCorrectNumber">{{item.markedNums}}</li>
                    <li class="tCorrectWord">已批改</li>
                </ul>
                <ul  @click="open('tNone','homework',item.id,item.title)">
                    <li class="tCorrectNumber">{{item.unmarkedNums}}</li>
                    <li class="tCorrectWord">未批改</li>
                </ul>
                <ul  @click="open('tAccomplish','homework',item.id,item.title)">
                    <li class="tCorrectNumber">{{item.unfinishedNums}}</li>
                    <li class="tCorrectWord">未完成</li>
                </ul>
            </li>
        </ul>
        <!--<div class="tBookAdd" @click="open('tHomework','homework')">+</div>-->
        <load-more tip="加载更多" :show-loading="false" v-if="this.num*10<this.totalCount"></load-more>
    </div>

    </scroller>
    </div>
</template>
<script>
  /* 当前组件必要引入 */
  import api from './api'
  import {LoadMore } from 'vux'
  // 当前组件引入全局的util
  // let Util = null
  export default {
    data () {
      return {
        num:1,
        data:[],
        temp:false,
        totalCount:0,
        top:'0',
      }
    },
    methods: {
      onScrollBottom () {
        if (this.onFetching) {
          if(this.num*10<this.totalCount){
            if(this.temp) {
              this.num++;
              this.temp=false
              this.setTableData ()
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
      // 初始化请求列表数据
      init () {
        window.select='work'
        this.setTableData()
      },
      setTableData () {
        this.ajax({
          ajaxSuccess: (data,res)=>{   this.data= this.data.concat(data['dataList']); this.temp=true;this.totalCount=data.totalCount;},
          url: api.historyWorkList.path,
          method: api.historyWorkList.method,
          params: {
            curPage:this.num,
            pageSize:10,
            name:"",
            groupsId:this.$route.query.groupsId
          },
        })
      },
      open (type,selectType,id,title) {
        this.$router.push({name: type,query:{type:selectType,id:id,title:title,groupsId:this.$route.query.groupsId}})
      },

    },
    created () {
      this.init();

    },
    mounted () {
      this.top=-this.$refs.scroller.offsetTop+''
    },
    components: {LoadMore}
  }
</script>
<style lang="scss">
    @import "../../../tcss/tBook";
</style>
