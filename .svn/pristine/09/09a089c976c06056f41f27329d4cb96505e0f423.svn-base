<!----------------------------------
****--@name     pDynamic
****--@role     ${*}
****--@date     2018/5/2
****--@author   zzh
----------------------------------->
<template>
    <div class="pDynamic">
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
        <div class="homework">
            学习动态
        </div>

        <flexbox wrap="wrap" :gutter="0" class="pDynamic_content"  v-if="newsList.length">
            <flexbox-item :span="12" v-for="(item,index) in newsList" :key="index">
                <span></span>
                <span>{{item.content.split('*')[1]}}&nbsp; </span>
                <span> {{item.content.split('*')[2]}}</span>
            </flexbox-item>
        </flexbox>
        <p class="btn" v-if="newsList.length">
            <button @click="open('pDynamic_content')">查看更多</button>
            <x-icon type="ios-arrow-forward" size="0.25rem"></x-icon>
        </p>
        <p class="btnWarn" v-else>暂无数据</p>
        <div class="backColor"></div>
        <div style="margin: 0 0.15rem">
        <div class="groupsDetailtitle">
            近期成绩
        </div>
        <div id="picOfGrade" style="height: 2.17rem;position: relative;padding: 0 0rem">
            <div class="growthArchives-root-timeborder">
                <button class="seeHistory left" :class="{focus:selectbefore=='queryWorkScoreList'}" @click="selectbefore1('queryWorkScoreList')">
                   作业
                </button>
                <button class="seeHistory right" style="margin-left: -0.06rem" :class="{focus:selectbefore=='queryEvaluationScoreList'}" @click="selectbefore1('queryEvaluationScoreList')">
                   测评
                </button>
            </div>
            <div id="passGrade1" style="height: 2.17rem;width: 3.45rem" ><span class="btnWarn">暂无数据</span></div>
        </div>
        </div>
        <div class="backColor"></div>
        <div style="border-top: 0.16px solid #DEEAE1;margin: 0 0.15rem">
            <div class="groupsDetailtitle">
                班级排名
            </div>
            <div id="picOfGrade1" style="height: 2.17rem;position: relative;padding: 0 0.15rem">
                <div class="growthArchives-root-timeborder">
                    <button class="seeHistory left" :class="{focus:selectRank=='queryWorkGroupList'}" @click="selectbefore2('queryWorkGroupList')">
                        作业
                    </button>
                    <button style="margin-left: -0.06rem" class="seeHistory right" :class="{focus:selectRank=='queryEvaluationGroupList'}" @click="selectbefore2('queryEvaluationGroupList')">
                        测评
                    </button>
                </div>
                <div id="passGradeRank"  style="height: 2.17rem;width: 3.45rem" ><span class="btnWarn">暂无数据</span></div>
            </div>
        </div>
    </div>
</template>
<script>
  import HeaderTitle from '../header'
  import api from './api'
  import echarts from 'echarts'
  export default {
    data () {
      return {
        groupList: '',
        list: [],
        info: {},
        self: this,
        newsList: [],
        lineMap:{date:[],score:[]},
        lineMapRank:{date:[],score:[]},
        selectbefore:'queryWorkScoreList',
        selectRank:'queryWorkGroupList'
      }
    },
    mounted () {
      this.queryWorkScoreList();//近期作业成绩
      this.queryWorkGroupList();//近期班级排名
    },
    methods: {
      selectbefore1 (val) {
        this.selectbefore = val
        this.queryWorkScoreList();
      },
      selectbefore2(val){
        this.selectRank = val
        this.queryWorkGroupList();
      },
      init () {
        this.info = this.$store.state.loginInfo
        this.queryStudentNews();//获取动态

      },
      queryWorkGroupList(){//排名
        this.ajax({
          ajaxSuccess: (data, res) => {
            this.lineMapRank={
              date:[],
              score:[]
            }
            if(data.dataList.length){
              data.dataList.map((item)=>{
//                this.lineMapRank.date.push(this.conductDate(item.finishedTime,'MM-dd HH:mm'))
                this.lineMapRank.date.push(this.conductDate(item.finishedTime?item.finishedTime:item.date,'MM-dd HH:mm'))
                this.lineMapRank.score.push(item.ranking)
              })
              this.passGradeRank (this.lineMapRank);
            }

          },
          url: this.selectRank=='queryWorkGroupList'?api.queryWorkGroupList.path: api.queryEvaluationGroupList.path,
          method: api.queryEvaluationScoreList.method,
          params: {
            curPage: '',
            pageSize: '',
            studentId: this.info.id,
          },

        })
      },
      queryWorkScoreList(){
        this.ajax({
          ajaxSuccess: (data, res) => {
            this.lineMap={
              date:[],
              score:[]
            }
            console.log(data.dataList)
            if(data.dataList.length){
              data.dataList.map((item)=>{
                this.lineMap.date.push(this.conductDate(item.finishedTime?item.finishedTime:item.date,'MM-dd HH:mm'))
                this.lineMap.score.push(item.totalScore?item.totalScore:item.score||0)
              })
               this.passGrade (this.lineMap )
            }

          },
          url:this.selectbefore=='queryWorkScoreList'?api.queryWorkScoreList.path:api.queryEvaluationScoreList.path,
          method: api.queryWorkScoreList.method,
          params: {
            curPage: '',
            pageSize: '',
            studentId: this.info.id,
          },

        })
      },
      passGradeRank (data) {
        console.log('lll',data)
        //myProjectprecent-numofquestion
        if(document.getElementById('passGradeRank')) {
          if (this.lineMapRank.date.length > 0) {
            document.getElementById('passGradeRank').style.visibility='visible';

            let aa = echarts.init(document.getElementById('passGradeRank'))
            // let datalist=this.personDetail.workScoreStatistics;
            aa.setOption({
              tooltip: {
                trigger: 'axis',
              },
              toolbox: {
                show: true,
                feature: {},
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: data.date,
              },
              yAxis: {
                type: 'value',
                axisLabel: {
                  formatter: '{value} ',
                },
              },
              series: [
                {
                  name: '名次',
                  type: 'line',
                  data: data.score,
                  markLine: {
                    data: [],
                  },
                  itemStyle : {
                    normal : {
                      color:'#1AAD19',
                      lineStyle:{
                        color:'#1AAD19'
                      }
                    }
                  },
                },
              ],
            })
          }else {
            document.getElementById('passGrade1').style.visibility='hidden';
          }
        }
      },
      passGrade (data) {
         console.log('999')
        if(document.getElementById('passGrade1')) {
          if (this.lineMap.date.length > 0) {
            document.getElementById('passGrade1').style.visibility='visible';
              console.log('oo,data',data,echarts)
            let aa = echarts.init(document.getElementById('passGrade1'))
            // let datalist=this.personDetail.workScoreStatistics;
            aa.setOption({
              tooltip: {
                trigger: 'axis',
              },
              toolbox: {
                show: true,
                feature: {},
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: data.date,
              },
              yAxis: {
                type: 'value',
                axisLabel: {
                  formatter: '{value} ',
                },
              },
              series: [
                {
                  name: '分数',
                  type: 'line',
                  data: data.score,
                  itemStyle : {
                    normal : {
                      color:'#1AAD19',
                      lineStyle:{
                        color:'#1AAD19'
                      }
                    }
                  },
                  markLine: {
                    data: [],
                  },
                },
              ],
            })
          }else {
            document.getElementById('passGrade1').style.visibility='hidden';
          }
        }
      },
      queryStudentNews () {
        this.ajax({
          ajaxSuccess: (data, res) => {
            this.newsList=res.data.dataList
          },
          url: api.queryStudentNews.path,
          method: api.queryStudentNews.method,
          params: {
            studentId: this.info.id,
            curPage: 1,
            pageSize: 4
          },

        })
      },
      // this.ajax({
      //       ajaxSuccess: res => {
      //         this.groupList = res.data.dataList
      //       },
      //       ajaxParams: {
      //         url: api.queryVersionList.path,
      //         method: api.queryVersionList.method,
      //         params: {
      //           types: 0
      //         },
      //       },
      //     })
      open (type) {
        this.$router.push({name: type})
      },


    },
    created () {
      this.init()
      // const self = this;
      // axios.get("http://apiv4.yangkeduo.com/operations?pdduid=0").then(function(data){
      //   self.list = data.data.opt_name
      //   console.log(self.list)
      // })
    },
    components: {
      HeaderTitle
    }
  }
</script>
<style lang="scss">
    @import '../../../pcss/patriarch/pDynamic';
</style>
