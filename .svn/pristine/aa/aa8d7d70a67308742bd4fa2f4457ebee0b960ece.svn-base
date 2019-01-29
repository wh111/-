<!----------------------------------
****--@name     theClassOf_name
****--@role     ${*}
****--@date     2018/5/3
****--@author   zzh
----------------------------------->
<template>
    <div class="theClassOf_name">
        <!--<header-title>-->
            <!--<slot>群信息</slot>-->
        <!--</header-title>-->
        <!--<div class="stance"></div>-->
        <search v-if="search"
                @result-click="resultClick"
                @on-change="getResult"
                :results="results"
                v-model="personValue"
                placeholder="输入成员账号"
                auto-scroll-to-top
                style="position: absolute"
                top="0.5rem"
                @on-cancel="onCancel"
                @on-submit="onSubmit"
                ref="search"></search>
        <ul class="tHeader">
            <li>群名称:{{data.title}}</li>
            <li v-if="$route.query.type!='teacher'">创建人<span>{{data.managerName}}</span></li>
            <li >群号<span>{{data.no}}</span></li>
        </ul>
        <div class="tName">
            <span>我的群名片</span><span>{{$store.state.loginInfo.name}}</span>
        </div>
        <div class="tName" style="border: 0; padding: 0.1rem 0.1rem 0.1rem 0.16rem">
            <span>群成员</span>
            <span>
           <span v-if="$route.query.type=='teacher'"><x-button class="btn" @click.native="showConfirm('add')" mini
                                                               style="margin-right: 0.05rem"> 添加</x-button></span>         <span>{{totalCount}}人</span>
          <span @click="open('theClassOf_member')"><x-icon type="ios-arrow-forward" size="0.25rem"></x-icon></span>
        </span>
        </div>
        <div class="tImg" style="position: relative">

            <div class="datalist" v-for="(item,index) in dataList" :key="index">
                <img :src="item.icon||'nw'" onerror="this.src='../../../../sasmobile/img/img777.png'">
                <div style="font-size: 0.12rem;color:rgba(27,27,27,1);">{{item.name}}</div>
            </div>
            <!--<div style="clear: both"></div>-->
        </div>
        <div class="tIntroduce">
            <div>群介绍</div>
            <div style="margin-bottom: 0.1rem">{{data.remark||'暂无'}}</div>
        </div>
        <div class="tInform">群通知</div>
        <div class="tIntroduce">
            <flexbox wrap="wrap" :gutter="0" class="myTeam_footer">
                <div v-if="data.groupsNoticeList==null" style="font-size: 0.12rem">暂无群通知</div>
                <flexbox-item :span="12" v-for="(item,index) in data.groupsNoticeList" :key="item.id"  style=" margin-bottom: 0.1rem;">
                    <div class="title"> {{index + 1}}. {{item.title}} <span v-html="item.content"></span></div>
                    <div class="time">发布时间：{{item.createTime | formatDate('yyyy-MM-dd HH:mm')}}</div>
                </flexbox-item>
                <!--<flexbox-item :span="12">-->
                <!--<div>1、最新作业已经发布请同学们尽快查收</div>-->
                <!--<div>发布时间：2017-03-06</div>-->
                <!--</flexbox-item>-->
            </flexbox>
        </div>
        <div style="text-align: center;margin: 0.1rem 0.15rem;">
            <x-button  class="btn" @click.native="deleteGroup" v-if="$route.query.type=='teacher'">删除群组 </x-button>
        </div>
        <div style="height: 0.1rem"></div>
        <confirm v-model="show"
                 title="提示"
                 @on-confirm="onConfirm">
            <checklist style="max-height: 4rem;overflow: auto" title="请选择"  label-position="left" :options="personList" v-model="selectedPerson"  @on-change="change"></checklist>

        </confirm>
        <confirm v-model="showDelete"
                 title="提示"
                 @on-confirm="sureDelete">
            <p>{{message}}</p>
        </confirm>
        <alert title="提示" v-model="messageShow">{{message}}</alert>
        <!--<x-button class="tOver" type="primary">退出班组</x-button>-->
    </div>
</template>
<script>
  /* 当前组件必要引入 */
  import HeaderTitle from '../header'
  import { Search,Checklist, } from 'vux'
  import api from './api'
  // 当前组件引入全局的util
  let Util = null
  export default {
    data () {
      return {
        title:'21',
        data: {title: ''},
        personList:[],
        show: false,
        dataList: [],
        id: '',
        message: '',
        messageShow: false,
        personValue: '',
        results: [],
        confirmType: '',
        search: false,
        showDelete: false,
        totalCount: 0,
        selectedPerson:[],
      }
    },
    methods: {
      // 初始化请求列表数据
      init () {
        if (!this.$route.query.groupsId) {
          this.getGroups()//学生获取群信息
        } else {
          this.id = this.$route.query.groupsId
          this.getTeaGroups()//获取群组详情
          this.groupsNotice()//获取群组通知
          this.requestDetail()
        }
//        this.setTitle('群信息')
      },
      change(){
        console.log(this.selectedPerson);
      },
      getPersonList () {//小组群获取成员
        this.ajax({
          ajaxSuccess: (data,res) => {

            res.data.dataList.map((item)=>{
              item.key=item.id;
              item.value=item.name
            })

            this.personList = res.data.dataList

          },
          url: api.getGradeStudent.path,
          method: api.getGradeStudent.method,
          params: {
            id: this.id,
          },

        })
      },
      deleteGroup () {//删除群组
        this.showDelete = true
        this.message = '确定要删除该群组吗？'
      },
      sureDelete () {
        this.ajax({
          ajaxSuccess: (data, res) => {
            this.$router.push({name: 'tGroup', query: {type: this.$route.query.groupType}})
          },
          url: api.disbanded.path,
          method: api.disbanded.method,
          params: {
            id: this.id
          },
        })
      },
      onConfirm () {

        this.ajax({
          ajaxSuccess: (res,data) => {
//            this.show = false;
            this.requestDetail()
          },

            url: api.addStudents.path,
            method: api.addStudents.method,
            data: {
              ids: this.selectedPerson.toString(),
              id: this.id,
            },

        })

      },
      showConfirm (type) {//查看弹窗
//      this.show=true;
        if (type == 'add' && this.$route.query.groupType == 0) {
          this.search = true
        } else if (type == 'add' && this.$route.query.groupType == 1) {
          this.show = true;
          this.getPersonList ()
        }
        this.confirmType = type

      },
      onCancel () {
        this.search = false
        console.log(1)
      },

      onSubmit () {

      },
      resultClick (item) {
        console.log(item)
        this.joinPerson(item)
      },
      joinPerson (item) {
        this.ajax({
          ajaxSuccess: (data,res) => {

            this.messageShow = true;
            this.message=res.status.code==0? `成功加入 ${item.name}`:res.status.msg;
            this.requestDetail()
          },
          url: api.addStudent.path,
          method: api.addStudent.method,
          data: {
            account: item.account,
            id: this.id,
          },

        })
      },
      getResult () {
        var m = setTimeout(() => {
          clearTimeout(m)
          // this.getClassPeopleList();//模糊搜索班组成员

          this.ajax({
            ajaxSuccess: (data, res) => {
              res.data.dataList.map((item) => {
                item.title = item.account + '(' + item.name + ')'
              })
              //this.restaurants=res.data.dataList
              this.results = res.data.dataList
//            var restaurants = this.restaurants
//            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
//            //  res.data.dataList;
//            cb(results);
            },
            url: api.likeList.path,
            method: api.likeList.method,
            params: {
              like: this.personValue,
            }
          })
//          var restaurants = this.restaurants;
//          var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;

          // 调用 callback 返回建议列表的数据
        }, 300)
      },
      //获取班组成员列表教师
      requestDetail () {
        this.ajax({
          ajaxSuccess: (data, res) => {

            this.dataList = res.data.dataList
            this.totalCount = data.totalCount
            if (res.data.dataList.length > 5) {
              this.dataList = this.dataList.splice(0, 5)
            }
            console.log(this.dataList)
            this.dataList.map((item) => {item.icon = this.getStaticPath(item.icon)})
          },
          url: api.request.path,
          method: api.request.method,
          params: {
            id: this.id//
          },

        })
      },
      getTeaGroups () {
        this.ajax({
          ajaxSuccess: (data, res) => {
            this.data = res.data;
            console.log(this.data,'277')
          },

          url: api.getDetail.path,
          method: api.getDetail.method,
          params: {
            id: this.id
          },

        })
      },
      groupsNotice () {
        this.ajax({
          ajaxSuccess: (data, res) => {
            res.data.dataList.map((item)=>{
              item.content=item.content.replace(/\*/g,'')
            })
            this.data.groupsNoticeList = res.data.dataList
          },

          url: api.message.path,
          method: api.message.method,
          params: {
            id: this.id,
            curPage: 1,
            pageSize: 5
          },

        })
      },
      getListSuccsee (data, res) {
        this.dataList = res.data.dataList
        this.dataList.map((item) => {item.icon = this.getStaticPath(item.icon)})
      },
      open (type) {
        this.$router.push({name: type, query: {id: this.id,type:this.$route.query.type}})
      },
      getGroups () { // 获取群信息
        let options = {
          url: api.groupsList.path,
          params: {
            types: ''
          },
          /**
           * 服务端返回的状态码检查,默认状态码检查前执行
           * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
           * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
           */
          ajaxSuccess: (data, res) => {
            data.map((item) => {
              if (item.no == this.$route.query.no) {
                this.data = item;
                this.data.groupsNoticeList.map((item2)=>{
                  item2.content=item2.content.replace(/\*/g,'')
                })
              }
            })

            // this.data = data;
            this.id = this.data.id
            this.getPeople(this.data.id)
          }
        }
        this.ajax(options)
      },
      getPeople (id) {
        let options = {
          url:this.$route.query.type=='teacher'?api.queryStudents.path:api.studentQueryStudents.path,
          params: {
            id: id
          },
          /**
           * 服务端返回的状态码检查,默认状态码检查前执行
           * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
           * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
           */
          ajaxSuccess: (data, res) => {
            data.map((item) => {
              item.icon = this.getStaticPath(item.icon)
            })
            this.totalCount=data.length;
            this.dataList = data;
            this.dataList.length=5
//            this.totalCount= this.dataList.length
          }
        }
        this.ajax(options)
      }
    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {HeaderTitle, Search,Checklist}
  }
</script>
<style lang="scss">
    @import "../../../css/child/theClassOf_name";
    @import '../../../css/child/allBook';
</style>
