<!----------------------------------
****--@name     tAccomplish
****--@role     ${*}
****--@date     2018/5/7
****--@author   zzh
----------------------------------->
<template>
  <div class="tNone">
    <div class="harryUp" v-for="(item,index) in data" :key="index">

        <div class="item">
          <span>{{item.studentName}}</span>  <x-button mini type="primary" @click.native="sendUrgeWork(item)">催交</x-button>
        </div>
    </div>
    <div style="margin: 0.1rem 0.15rem">
    <x-button v-if="data.length" @click.native="to_work"  type="primary">全部催交</x-button>
    </div>
    <div style="height: 0.1rem"> </div>
    <alert v-model="msgShow" title="提示"> 催交成功</alert>
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
      data: [],
      msgShow:false,

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
    /*
       * 设置表格数据
       * @param isLoading Boolean 是否加载
       */
    setTableData () {
      this.ajax({
        ajaxSuccess: (data,res)=>{this.data=data},
        url: api.queryNoSubmit.path,
        params:{
          workId:this.$route.query.id,
          groupsId:this.$route.query.groupsId,
          isMarked:0
        }
      })
    },
    //催交作业
    sendUrgeWork (row) {
      this.ajax({
        ajaxSuccess: () => {this.msgShow=true },

          url:this.$route.query.type=='homework'?api.urgeWork.path:api.urgeTest.path,
          params: {
            workId: this.$route.query.id,
            papersId:this.$route.query.id,
            StudentId: row.studentId,
          }

      })
    },//催所有人交作业
    to_work () {
      let params={};
      params=this.$route.query.type=='homework'? {
          workId: this.$route.query.id,
          groupsId: this.$route.query.groupsId,
        }: {
        papersId: this.$route.query.id,
        }
      this.ajax({

        ajaxSuccess: () => {this.msgShow=true},

          url: this.$route.query.type=='homework'?api.urgeAllWork.path:api.urgeAllEvaluation.path,
          params:params

      })
    },
    getTest(){
      this.ajax({
        ajaxSuccess: (data,res) => {
          res.data.map((item)=>{
            if(!item.answerStatus){
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
