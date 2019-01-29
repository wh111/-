<!----------------------------------
****--@name     mistakes
****--@role     ${*}
****--@date     2018/5/3
****--@author   zzh
----------------------------------->
<template>
    <div class="mistakes">
        <header-title>
            <slot>
                <template v-if="type=='wrong'||type=='teaWrong'"> 易错题</template>
                <template v-else-if="type=='enjoy'">我的收藏 </template>
                <template v-else-if="type=='notes'">我的笔记</template>
                <template v-else-if="type=='teaDiff'">难题</template>
            </slot>
        </header-title>
        <div class="stance"></div>

        <scroller lock-x  @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" v-if="questionList.length"
                  :scroll-bottom-offst="200">
            <div>
            <div class="mistakes_content" v-for="(item,index) in questionList" :key="index">
                <div class="mistakes_content_header">
                    <span style="">编号:{{item.no}}</span>
                    <span class="time" style="float: right">{{item.createTime | formatDate('yyyy-MM-dd HH:mm')}}</span>
                </div>
                <ul class="mistakes_content_topic">
                    <div class="mistakes_content_topic_content">
                        {{item.title | delHtmlTag | sliceText(50, '...')}}
                    </div>
                    <li  @click="seeDetail(item)">
                        <div>查看详情</div>
                        <x-icon  type="ios-arrow-forward" size="0.3rem"></x-icon>
                    </li>
                </ul>
            </div>
            <load-more tip="加载更多" :show-loading="false" v-if="this.num*10<this.totalCount"></load-more>
            </div>
        </scroller>
        </div>

</template>
<script>
  /* 当前组件必要引入 */
  import HeaderTitle from '../header'
  import api from './api'
  import { Badge, Group, Cell, Scroller, Divider, Spinner, XButton, LoadMore } from 'vux'
  // 当前组件引入全局的util
  let Util = null
  export default {
    data () {
      return {
        type: this.$route.query.type,
        num: 1,
        totalCount: 0,
        questionList: [],
        knowledgeList: [],
        onFetching: false,
        temp:false,
      }
    },
    methods: {
      // 初始化请求列表数据
      init () {
        this.queryList()
      },
      onScrollBottom () {

        if (this.onFetching) {
          if (this.num * 10 < this.totalCount) {

            if(this.temp){
              this.num++;
              this.temp=false
              this.queryList()
            }

          } else {

          }

        } else {
          this.onFetching = true
          setTimeout(() => {
            this.bottomCount += 10
            this.$nextTick(() => {
              this.$refs.scrollerBottom.reset()
            })
            this.onFetching = false
          }, 2000)
        }
      },
      seeDetail (item) {
        this.$router.push({
          name: 'questionDetail',
          query: {questionId: item.id, types: item.types, type: this.$route.query.type,tQuestionId:item.questionsId}
        })
      },
      queryList () {
        let path = ''
        if (this.type == 'wrong') {
          path = api.myWrongListList.path
        } else if (this.type == 'enjoy') {
          path = api.myquestionsFavoriteList.path
        } else if(this.type=='notes'){
          path = api.questionsNotesList.path
        } else {
          path = api.libraryList.path
        }
        let options = {
          url: path,
          params: this.type=='wrong'||this.type=='enjoy'||this.type=='notes'? {
            subject: this.$route.query.subject,
            curPage: this.num,
            pageSize: 10,
          }:{
            curPage:this.num,
            pageSize:10,
            sortBy:'',
            order:'asc',
            questionsLibraryType:this.type=='teaDiff'?2:1,
          },
          /**
           * 服务端返回的状态码检查,默认状态码检查前执行
           * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
           * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
           */
          ajaxSuccess: (data, res) => {
            this.temp=true;

            this.questionList =this.questionList.concat(data.dataList)
            this.totalCount = data.totalCount
            this.questionList.map(item => {
              let strArr = []
              if (item.knowledgeList instanceof Array) {
                if (item.knowledgeList.length > 0) {
                  item.knowledgeList.map(child => {
                    strArr.push(child.name)
                  })
                }
              }

              this.knowledgeList.push(strArr.join())
            })
          },
        }
        this.ajax(options)
      }

    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {HeaderTitle, Badge, Group, Cell, Scroller, Divider, Spinner, XButton, LoadMore}
  }
</script>
<style lang="scss">
    @import "../../../css/child/mistakes";
</style>
