<!----------------------------------
****--@name     personal
****--@role     ${*}
****--@date     2018/5/2
****--@author   zzh
----------------------------------->
<template>
    <div class="personal">
        <header-title>
            <slot>个人资料</slot>
        </header-title>
        <div class="stance"></div>
        <div class="myErrors_header">
            <flexbox>
                <flexbox-item class="bolder" :span="6">头像</flexbox-item>
                <div style="display: flex;align-items: center">
                    <span style="color: #737373"><img :src="getStaticPath(userInfo.icon)"
                                                      onerror="javascript:this.src='../../../../sasmobile/img/03.jpg'"
                                                      id="personal_img"/></span>
                </div>
                <!--<div style="display: flex;align-items: center">-->
                <!--<span style="color: #737373">{{item.title}}</span>-->
                <!--<x-icon type="ios-arrow-forward" size="0.3rem"></x-icon>-->
                <!--</div>-->
            </flexbox>
            <flexbox  @click.native="show('nickname')" v-if="!$route.query.type">
                <flexbox-item  class="bolder" :span="3">昵称</flexbox-item>

                <div class="widthInner" style="">{{userInfo.nickname}} </div>
                <div  >
                    <x-icon type="ios-arrow-forward" size="0.3rem"></x-icon>
                </div>
            </flexbox>
            <flexbox>
                <flexbox-item  class="bolder" :span="3">真实姓名</flexbox-item>
                <div >{{userInfo.name}} </div>
            </flexbox>
            <div v-if="$route.query.type">
                <flexbox  @click.native="show('textbookVersionList',true)">
                    <flexbox-item  class="bolder" :span="3">教材</flexbox-item>
                    <div  class="widthInner">{{userInfo.textbookVersionList[0].textbookVersionName || ''}} </div>
                    <div>
                        <x-icon type="ios-arrow-forward" size="0.3rem"></x-icon>
                    </div>
                </flexbox>
                <flexbox>
                    <flexbox-item  class="bolder" :span="3">任教学科</flexbox-item>
                    <div>{{userInfo.subject | subject}}</div>
                    <!--<div @click="show('subject',true)">-->
                        <!--<x-icon type="ios-arrow-forward" size="0.3rem"></x-icon>-->
                    <!--</div>-->
                </flexbox>
                <flexbox   @click.native="show('teachCertNo',true)">
                    <flexbox-item  class="bolder" :span="3">资格证编号</flexbox-item>
                    <div class="widthInner">{{userInfo.teachCertNo}}</div>
                    <div >
                        <x-icon type="ios-arrow-forward" size="0.3rem"></x-icon>
                    </div>
                </flexbox>
                <flexbox @click.native="show('types',true)">
                    <flexbox-item  class="bolder" :span="3">资格种类</flexbox-item>
                    <div  class="widthInner">{{userInfo.types | types}} </div>
                    <div  >
                        <x-icon type="ios-arrow-forward" size="0.3rem"></x-icon>
                    </div>
                </flexbox>
                <flexbox  @click.native="show('school')">
                    <flexbox-item  class="bolder" :span="3">毕业学校</flexbox-item>
                    <div class="widthInner">{{userInfo.school}}</div>
                    <div>
                        <x-icon type="ios-arrow-forward" size="0.3rem"></x-icon>
                    </div>
                </flexbox>
            </div>
            <div v-if="!$route.query.type">
                <flexbox @click.native="show('grade')">
                    <flexbox-item  class="bolder" :span="3">年级</flexbox-item>
                    <div class="widthInner">{{userInfo.grade | grade(self)}} </div>
                    <div >
                        <x-icon type="ios-arrow-forward" size="0.3rem"></x-icon>
                    </div>
                </flexbox>
                <flexbox @click.native="show('school')">
                    <flexbox-item  class="bolder" :span="3">学校</flexbox-item>
                    <div class="widthInner">{{userInfo.school}} </div>
                    <div >
                        <x-icon type="ios-arrow-forward" size="0.3rem"></x-icon>
                    </div>
                </flexbox>
                <!--<flexbox>-->
                <!--<flexbox-item :span="6">任教学科</flexbox-item>-->
                <!--<div>{{userInfo.name}} </div>-->
                <!--</flexbox>-->
                <!--<flexbox>-->
                <!--<flexbox-item :span="6">市区</flexbox-item>-->
                <x-address class="address" ref="address" title="地址选择" v-model="addressValue" raw-value @on-hide="change"
                           :list="addressData" value-text-align="right"></x-address>
                <!--<div>{{userInfo.province}}{{userInfo.town}}{{userInfo.county}} </div><div @click="show('area')">  <x-icon type="ios-arrow-forward" size="0.3rem"></x-icon></div>-->
                <!--</flexbox>-->
            </div>
        </div>

        <confirm v-model="showConfirm"
                 title="请输入/选择"
                 @on-confirm="onConfirm">
            <checklist v-if="confirmType=='subject'" title="" :max=1 label-position="left" :options="subjectList"
                       v-model="subject" @on-change="changeSubject"></checklist>
            <x-input v-if="confirmType=='nickname'" min="1" max="15" title="" placeholder="请输入昵称" v-model="nickname"></x-input>
            <checklist v-if="confirmType=='grade'" title="" style="height: 3rem;overflow: auto" :max=1 label-position="left" :options="gradeList"
                       v-model="grade"></checklist>
            <x-input v-if="confirmType=='school'" title="" placeholder="请输入学校" v-model="school"></x-input>
            <checklist v-if="confirmType=='textbookVersionList'" title="" :max=1 label-position="left" :options="textbookVersionList"
                       v-model="textbookVersion"></checklist>
            <!--userInfo.teachCertNo-->
            <x-input v-if="confirmType=='teachCertNo'" title="" placeholder="请输入编号" v-model="teachCertNo"></x-input>
            <checklist v-if="confirmType=='types'" title="" :max=1 label-position="left" :options="typesList"
                       v-model="types"></checklist>
        </confirm>
    </div>
</template>
<script>
  /* 当前组件必要引入 */
  import HeaderTitle from '../header'
  import {
    GroupTitle,
    Group,
    Cell,
    XInput,
    Selector,
    PopupPicker,
    Datetime,
    XNumber,
    ChinaAddressData,
    XAddress,
    XTextarea,
    XSwitch
  } from 'vux'
  import api from './api'
  // 当前组件引入全局的util
  let Util = null
  export default {
    data () {
      return {
        gradeList: [],
        nickname:'',
        school:'',
        teachCertNo:'',
        grade:[],
        addressData: ChinaAddressData,
        self: this,
        showConfirm: false,
        textbookVersion:[],
        data: [],
        userInfo: {nickname: '', icon: '', name: '', grade: '', province: '', town: '', county: '',textbookVersionList:[{textbookVersionName:''}]},
        confirmType: '',
        addressValue: [],
        subjectList: [],
        textbookVersionList: [],
        subject: [],
        typesList:[{value:'小学老师',key:'0'},{value:'初中老师',key:'1'},{value:'大学老师',key:'2'},]
      }
    },
    methods: {
//      changeTextbookVersionList(){
//        this.userInfo.textbookVersionList=this.textbookVersion;
//      },
      changeSubject () {
        this.userInfo.subject = this.subject[0]
//        this.setInfo()
      },
      change (val) {
        this.userInfo.province = this.$refs.address.nameValue.split(' ')[0]
        this.userInfo.town = this.$refs.address.nameValue.split(' ')[1]
        this.userInfo.county = this.$refs.address.nameValue.split(' ')[2]
        this.setInfo()
      },    // 初始化请求列表数据
      init () {
        console.log(this.$store.state)
        this.userInfo = this.$store.state.loginInfo
        this.subjectList = this.$store.state.envs.gradeMap[12]
        this.subjectList.map((item) => {
          item.key = item.code
        })
        this.addressValue = [this.userInfo.province, this.userInfo.town, this.userInfo.county]
        // console.log(this.$store.state)
        this.gradeList = this.$store.state.envs.gradeList
        this.gradeList.map((item) => {
          item.value = item.name
          item.key = item.code
        })
        console.log(this.userInfo,this.$store.state)
        if (this.userInfo.textbookVersionList[0]) {
          this.textbookVersionId = this.userInfo.textbookVersionList[0].textbookVersionId
          this.queryTextbookVersion()
        } else {
          this.userInfo.textbookVersionList = [{textbookVersionId: '', subject: ''}]
        }
      },
      queryTextbookVersion () {//获取教材版本
        this.ajax({
          ajaxSuccess: (data, res) => {
            this.textbookVersionList = res.data.dataList;
            this.textbookVersionList.map((item,index) => {
              item.value = item.name;
              item.textbookVersionName = item.name
              item.key = index+1
            })
            console.log( this.textbookVersionList)
          },
          //baseURL:'PUBLIC',
          url: api.queryTextbookVersion.path,
          method: api.queryTextbookVersion.method,
          params: {
            subject: this.userInfo.subject
          }
        })
      },
      show (type, showConfirm) {
        this.confirmType = type

        if (type == 'nickname' || type == 'school' || type == 'grade') {
          this.showConfirm = true
        }
        if (showConfirm) {
          this.showConfirm = true
        }
      },
      onConfirm () {
        console.log(this.grade)
        if( this.confirmType =='textbookVersionList'){
          this.userInfo.textbookVersionList[0]=this.textbookVersionList[this.textbookVersion-1] ;
        }else if(this.confirmType == 'nickname'){
           this.userInfo.nickname=this.nickname;
        }else if(this.confirmType == 'school'){
          this.userInfo.school=this.school;
        }else if(this.confirmType == 'teachCertNo'){
          this.userInfo.confirmType=this.confirmType;
        }else if(this.confirmType == 'grade'){
          this.userInfo.grade=this.grade[0];
        }
        this.setInfo()
      },
      setInfo () {
        console.log(12)
        this.ajax({
          ajaxSuccess: (data, res) => {
            this.$store.state.loginInfo = this.userInfo
          },
          jsonString: true,
          url: this.$route.query.type ? api.modify2.path : api.modify1.path,
          method: api.modify1.method,
          data: this.userInfo
        })
      },
      changeGrade () {
        this.showConfirm = false
      },

    },
    created () {
      this.init()
    },
    mounted () {

    },
    components: {
      GroupTitle,
      Group,
      Cell,
      XInput,
      Selector,
      PopupPicker,
      Datetime,
      XNumber,
      ChinaAddressData,
      XAddress,
      XTextarea,
      XSwitch,
      HeaderTitle
    }
  }
</script>
<style lang="scss">
    @import '../../../css/child/personal';
</style>
