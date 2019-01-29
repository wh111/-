<!----------------------------------
****--@name     tNone
****--@role     ${*}
****--@date     2018/5/7
****--@author   zzh
----------------------------------->
<template>
    <div class="tNone">
      <div class="tAlreadyBox" v-for="(item,index) in data" :key="index">
        <ul class="tAlreadyHeader" style="padding: 0.08rem 0.15rem;">
          <li class="HeaderLeft">
            <div>{{item.studentName}}</div>
            <p> {{item.endTime| formatDate('yyyy-MM-dd HH:mm:ss')}} 上交 | 用时    {{(item.usedTime/60||0).toFixed(0)}}分{{(item.usedTime%60||0)}}秒</p>
          </li>
          <li class="HeaderRight">
            <x-button mini type="primary" @click.native="open('tAppraisal',item,'toCorrect')">去批改</x-button>
          </li>
        </ul>
      </div>
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
      data: []
    }
  },
  methods: {
    // 初始化请求列表数据
    init () {
      if(this.$route.query.type=='homework') {
        this.setTableData();
      }else {

        this.getTest()
      }
    },
    open (type,item,showType) {

      let query=Object.assign(this.$route.query,{studentId:item.studentId,showType:showType})
      this.$router.push({name: 'tAppraisal', query: query})
    },
    setTableData () {
      this.ajax({
        ajaxSuccess: (data, res) => {this.data = data;console.log(this.data)},
        url: api.queryMarkList.path,
        params: {
          workId: this.$route.query.id,
          groupsId: this.$route.query.groupsId,
          isMarked: 0
        }
      })
    },
    getTest(){
      this.ajax({
        ajaxSuccess: (data,res) => {
          res.data.map((item)=>{
            if(!item.isCorrecting&&item.answerStatus){
              this.data.push(item)
            }

          })

        },
        url: '/evaluation/getAnswerAnalysisList',
        method: 'get',
        params: {
          paperId:this.$route.query.id,
        },

      })

    }

  },
  created () {
    this.init()
  },
  mounted () {
  },
  components: {}
}
</script>
<style lang="scss">
  @import "../../../tcss/tNone";
</style>
