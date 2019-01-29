<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2018/4/24
****--@author   zzh
----------------------------------->
<template>
    <div>
    <div class="appraisal_math" v-if="subjectList.length&&this.subjectList[0].subject!=''">
        <scroller lock-y :scrollbar-x=false>
            <div class="box1" :style="{width:(subjectList.length+1)*0.75+ 'rem' }">
                <div>科目： </div>
                <div class="box1-item" @click="change(index,item)" :class="active==index ? 'active' : ''"
                     v-for="(item,index) in subjectList">{{item.subject | subject}}
                </div>
            </div>
        </scroller>
        <div style="height: 0.1rem;background: #E5E5E5"></div>
        <div class="content">
            <flexbox class="content_flexbox content_flexbox_title">
                <flexbox-item :span="4">
                    <div class="flex-demo">{{select.subject | subject}}</div>
                </flexbox-item>
                <flexbox-item :span="4" align="right" @click.native="openTest" style="color: #EF7E5D;margin-right: -0.15rem;">
                    <!--<img @click="open" src="../../../../sasmobile/img/08.jpg"-->
                      <!--<span style="line-height: 0.3rem;top: -0.08rem;position: relative">进入测评</span>                                          &lt;!&ndash;style="width: 0.9rem;height: 0.25rem;" alt="">&ndash;&gt;-->
                    <!--<x-icon type="ios-arrow-forward" size="0.3rem">进入测评</x-icon>-->
                    <img v-if="studyProgress!=0" style="width: 0.9rem;height: 0.25rem" src="../../../assets/image/accessTest.jpg"/>
                </flexbox-item>
            </flexbox>
            <flexbox class="content_flexbox">
                <flexbox-item  :span="3">
                    <div  class="flex-demo flex-demo_item">学习进度：</div>
                </flexbox-item>
                <x-progress class="content_progress" :percent="studyProgress" :show-cancel="false"
                            style="width: 100%;"></x-progress>
                <flexbox-item :span="2" align="right">{{studyProgress}}%</flexbox-item>
            </flexbox>
            <flexbox class="content_flexbox">
                <flexbox-item   :span="3">
                    <div style="" class="flex-demo flex-demo_item">能力值：</div>
                </flexbox-item>
                <x-progress class="content_progress" :percent="percentageAbility" :show-cancel="false"
                            style="width: 100%;"></x-progress>
                <flexbox-item :span="2" align="right">{{percentageAbility}}%</flexbox-item>
            </flexbox>
        </div>
        <div class="aside">
            当前章节掌握情况
        </div>
        <div style="padding: 0 0.15rem">
            <flexbox class="footer" v-for="(item,index) in chapterList" :key="index"  @click.native="accessTest(item)">
                <flexbox-item :span="8" class="fontSize" >
                    <div  class="fontSize">{{item.name}}：{{item.chapterText}}</div>
                </flexbox-item>
                <flexbox-item :span="4" align="right">
                    <div style="display: flex;align-items: center;float: right">
                        <span  class="fontSize"> {{item.level}}%</span>
                        <div class="selfApple fontSize"
                             :class="{
                                            'selfApple4': item.level == 0,
                                            'selfApple3': item.level >= 1 && item.level < 50,
                                            'selfApple2': item.level >= 50 && item.level < 100,
                                            'selfApple1': item.level == 100,
                                         }" style="color: white"> </div>
                        <span><x-icon type="ios-arrow-forward" size="0.3rem"></x-icon></span>
                    </div>
                </flexbox-item>
            </flexbox>
            <flexbox v-if="studyProgress<=0">
                <x-button style="margin:0.15rem 0;background: #11A640" type="primary" @click.native="firstJoin">进入首次测评</x-button>
            </flexbox>
        </div>
    </div>
        <div v-else>
            <p class="message" style="margin-top: 1rem">   请完善个人教材信息后参与测评</p>

        </div>
    </div>
</template>
<script>
/* 当前组件必要引入 */
// 当前组件引入全局的util

import api from './api'
let Util = null

export default {
  data () {
    return {
      subjectList: [],
      chapterList: [],
      active: '',
      percent2: 30,
      percent3: 20,
      studyProgress: 0,
      percentageAbility: 0,
      data: [],
      select: {
        subject: '',
        textbookVersionId: '',
        grade: this.grade
      }
    }
  },
  methods: {
    // 初始化请求列表数据
    init () {
      console.log(this.$store.state)
//  this.subjectList = this.$store.getters['app/gradeMap'](val)
      this.subjectList = this.$store.state.loginInfo.textbookVersionList
      console.log(this.subjectList.length,this.$store.state.loginInfo.textbookVersionList)
      if(!this.subjectList.length||this.subjectList[0].subject==''){
        return
      }
      this.change(0, this.subjectList[0])
      this.grade = this.$store.state.loginInfo.grade
      this.select.grade = this.$store.state.loginInfo.grade
      console.log(this.$store.state.loginInfo)
    },
    open () {
      this.$router.push({name: 'appraisal_math_open'})
    },
    getFirstAssessmentState () {
      let options = {
        url: api.isFirstAssessment.path,
        params: this.select,
        /**
           * 服务端返回的状态码检查,默认状态码检查前执行
           * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
           * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
           */
        ajaxSuccess: (data, res) => {
          console.log(data)
          if (data) {
            this.getStudentAbility()
          } else {
            this.studyProgress = 0
            this.chapterList = []
            this.percentageAbility = 0
          }
        }
      }
      this.ajax(options)
    },
    openTest () {
      this.$router.push({name: 'choiceEvaluation', params: {grade: this.select.grade, subject: this.select.subject, textbookVersionId: this.select.textbookVersionId, isFirstAssessment: 2,allowBack:false}})
    },
    accessTest (item) {
      this.$router.push({name: 'choiceEvaluation', params: {grade: this.select.grade, subject: this.select.subject, textbookVersionId: this.select.textbookVersionId, isFirstAssessment: 2}, query: {chapterId: item.chapterId,name:item.chapterText,allowBack:false}})
    },
    firstJoin () {
      let options = {
        url: api.addFirstAssessment.path,
        method: api.addFirstAssessment.method,
        params: this.select,
        /**
           * 服务端返回的状态码检查,默认状态码检查前执行
           * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
           * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
           */
        ajaxSuccess: (data, res) => {
          this.$router.push({name: 'choiceEvaluation', params: {grade: this.select.grade, subject: this.select.subject, textbookVersionId: this.select.textbookVersionId, isFirstAssessment: 1,allowBack:false}})
        }
      }
      this.ajax(options)
    },
    change (index, val) {
      this.active = index
      this.select.subject = val.subject
      this.select.textbookVersionId = val.textbookVersionId
      this.getFirstAssessmentState()
      console.log(this.active)
      //      this.$router.push({name: index})
    },
    /*
          * 获取当前学生学习进度/能力值
          * */
    getStudentAbility () {
      this.chapterList = []
      this.ajax({
        ajaxSuccess: (data, res) => {
          if (res.data && res.data instanceof Object) {
            let data = res.data.chapterList
            data.sort((a, b) => a.chapterId > b.chapterId)
            this.chapterList = data
            this.studyProgress = res.data.studyProgress || 0
            this.percentageAbility = res.data.percentageAbility || 0
          } else {
            this.studyProgress = 0
            this.percentageAbility = 0
          }
        },

        url: api.getStudentAbility.path,
        params: {
          grade: this.select.grade,
          subject: this.select.subject
        }

      })
    }

  },
  created () {
    this.init()
  },
  mounted () {

  },
  components: {
  }
}
</script>
<style lang="scss">
    @import '../../../css/appraisal/appraisal_math';
</style>
