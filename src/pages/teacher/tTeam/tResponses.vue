<!----------------------------------
****--@name     tResponses
****--@role     ${*}
****--@date     2018/5/7
****--@author   zzh
----------------------------------->
<template>
    <div class="tResponses">
        <header-title>{{$route.query.title}}</header-title>
        <div class="stance"></div>
        <ul class="tResponsesHeader">
            <li @click="open('tAlready')" :class="show === 'tAlready' ? 'active' : ''">已批改 ({{numList.markedNums}})</li>
            <li @click="open('tNone')" :class="show === 'tNone' ? 'active' : ''">未批改 ({{numList.unmarkedNums}})</li>
            <li @click="open('tAccomplish')" :class="show === 'tAccomplish' ? 'active' : ''">未完成 ({{numList.unfinishedNums }})</li>
        </ul>
        <router-view/>
    </div>
</template>
<script>
  /* 当前组件必要引入 */
  import HeaderTitle from '../header'
  import api from './api'
  // 当前组件引入全局的util
  // let Util = null
  export default {
    data () {
      return {
        show: 'tAlready',
        numList:{
          markedNums:0,
          unmarkedNums:0,
          unfinishedNums:0
        }
      }
    },
    methods: {
      // 初始化请求列表数据
      init () {
        if(this.$route.query.type=='homework'){
          this.getWorkNum();
        }else {

          this.getTestNum()
        }


       this.show=this.$route.name
       console.log(this.$route)
      },
      open (type) {
        this.$router.push({name: type,query:this.$route.query})
      },
      getTestNum(){
        this.ajax({
          ajaxSuccess: (data,res) => {
            res.data.map((item)=>{
              if(item.isCorrecting){
                this.numList.markedNums++;
              }else {
                if(item.answerStatus){
                  this.numList.unmarkedNums++;
                }else {
                  this.numList.unfinishedNums++;
                }

              }

            })

          },
          url: '/evaluation/getAnswerAnalysisList',
          method: 'get',
          params: {
            paperId:this.$route.query.id,
          },

        })
      },
      getWorkNum () {
        this.ajax({
          ajaxSuccess: (data,res) => {
            this.numList = res.data

          },
          url: '/historyWork/getWork',
          method: 'get',
          params: {
            workId: this.$route.query.id,
          },

        })
      },
    },
    created () {
      this.init()
    },
    mounted () {
    },
    watch: {
      $route (to, from) {
        //				console.log(to.name)
        this.show = to.name;
        console.log(to.name)
      }
    },
    components: {HeaderTitle}
  }
</script>
<style lang="scss">
    @import "../../../tcss/tResponses";
</style>
