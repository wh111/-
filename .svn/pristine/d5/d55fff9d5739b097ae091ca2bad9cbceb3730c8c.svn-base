<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2018/4/26
****--@author   zzh
----------------------------------->
<template>
    <div class="myErrors">
        <header-title>
            <slot>
              <template v-if="$route.query.type=='wrong'"> 我的错题</template>
                <template v-else-if="type=='enjoy'">我的收藏 </template>
                <template v-else>我的笔记</template>
            </slot>
        </header-title>
        <div class="stance"></div>
        <div class="myErrors_header">
            <p class="message" style="margin-top: 0.3rem" v-if="!subjectList.length">暂无数据</p>
            <flexbox v-for="(item,index) in subjectList" :key="index" @click.native="open('mistakes',type,item.subject)">
                <flexbox-item :span="6" style="font-weight: bold">{{item.subject|subject}}</flexbox-item>
                <div style="display: flex;align-items: center">
                    <span style="color: #1b1b1b">{{item.num}} </span>
                    <x-icon type="ios-arrow-forward" size="0.3rem"></x-icon>
                </div>
            </flexbox>
        </div>
    </div>
</template>
<script>
/* 当前组件必要引入 */
import HeaderTitle from '../header'
import api from './api'
// 当前组件引入全局的util
let Util = null
export default {
  data () {
    return {
      num: 1,
      type: this.$route.query.type,
      subjectList: []
    }
  },
  methods: {
    // 初始化请求列表数据
    init () {
      //        this.subjectList=this.$store.state.envs.gradeMap[this.$store.state.loginInfo.grade];
      //        this.subjectList.map((item)=>{
      //          this.getmyWrongList(item.code)
      //
      //        })
      this.questionsWrongNum()
    },
    questionsWrongNum () {
      let path = ''
      if (this.type == 'wrong') {
        path = api.myWrongListNum.path
      } else if (this.type == 'enjoy') {
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
          this.subjectList = data.dataList
        }
      }
      this.ajax(options)
    },
    getmyWrongList (value) {
      let options = {
        url: api.myWrongList.path,
        params: {
          subject: value,
          curPage: this.num,
          pageSize: 10
        },
        /**
           * 服务端返回的状态码检查,默认状态码检查前执行
           * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
           * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
           */
        ajaxSuccess: (data, res) => {
          this.subjectList.map((item) => {
            if (item.code == value) {
              item.num = data.totalCount
            }
          })
        }
      }
      this.ajax(options)
    },
    open (type, works, object) {
      this.$router.push({name: type, query: {type: works, subject: object}})
    }
  },
  created () {
    this.init()
  },
  mounted () {
  },
  components: {HeaderTitle}
}
</script>
<style lang="scss">
    @import '../../../css/child/myErrors';
</style>
