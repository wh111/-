<!----------------------------------
****--@name     tEvaluation
****--@role     ${*}
****--@date     2018/5/10
****--@author   zzh
----------------------------------->
<template>
  <div>
    <p class="message" style="margin-top: 0.3rem" v-if="!data.length">暂无测评</p>

  <scroller lock-x  @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :height="top" :scroll-bottom-offst="200">
  <div class="tBook"  ref="scroller">
    <ul class="tBookHeader" v-for="(item,index) in data" :key="index">
      <li class="tElement">
        <div>{{item.name}}</div>
        <p>布置时间{{item.releaseTime|formatDate('yyyy-MM-dd HH:mm')}} | 上交时间{{item.endTime|formatDate('yyyy-MM-dd HH:mm')}}</p>
      </li>
      <li class="tCorrect">
        <ul  @click="open('tResponses',item)">
          <li class="tCorrectNumber">{{item.markedNums}}</li>
          <li class="tCorrectWord">已批改</li>
        </ul>
        <ul  @click="open('tResponses',item)">
          <li class="tCorrectNumber">{{item.unmarkedNums}}</li>
          <li class="tCorrectWord">未批改</li>
        </ul>
        <ul  @click="open('tResponses',item)">
          <li class="tCorrectNumber">{{item.unfinishedNums}}</li>
          <li class="tCorrectWord">未上交</li>
        </ul>
      </li>
    </ul>
    <!--<div class="tBookAdd" @click="open('tHomework')">+</div>-->
  </div>
  </scroller>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import api from './api'
// 当前组件引入全局的util
// let Util = null
export default {
  data () {
    return {
      num:1,
      data:[],
      top:'0'
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
      window.select='test'
      this.setTableData ()
    },
    setTableData () {

      this.ajax({
        ajaxSuccess: (data,res)=>{this.data=data.dataList;},
          url: api.queryHistoryList.path,
          method: api.queryHistoryList.method,
          params: {
            curPage:this.num,
            pageSize:10,
            name:'',
            releaseTo:this.$route.query.groupsId
          },

      })
    },
    open (type,item) {
      this.$router.push({name: type,query:{id:item.id,title:item.name,type:'test'}})
    }
  },
  created () {
    this.init()
  },
  mounted () {
    this.top=-this.$refs.scroller.offsetTop+''
  },
  components: {}
}
</script>
<style lang="scss">
  @import "../../../tcss/tBook";
</style>
