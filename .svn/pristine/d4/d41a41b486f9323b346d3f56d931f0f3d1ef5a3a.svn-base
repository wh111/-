<template>
  <div class="myTeam">
    <header-title>
      <slot>群信息</slot>
    </header-title>
    <div class="stance"></div>

    <flexbox wrap="wrap" :gutter=0 class="myTeam_header">
      <flexbox-item :span="12">群名称:{{data.title}}</flexbox-item>
      <flexbox-item :span="12">
        <span>创建人</span><span>{{data.managerName}}</span>
      </flexbox-item>
      <flexbox-item :span="12">
        <span>群&emsp;号</span><span>{{data.no}}</span>
      </flexbox-item>
    </flexbox>
    <flexbox wrap="wrap" :gutter=0 class="myTeam_header">
      <flexbox-item :span="12">群介绍</flexbox-item>
      <flexbox-item :span="12">
        <div>{{data.remark}}</div>
        <div></div>
      </flexbox-item>
    </flexbox>
    <div class="myTeam_group">群通知</div>
    <flexbox wrap="wrap" :gutter="0" class="myTeam_footer">
      <div v-if="data.groupsNoticeList==null" class="message">暂无群通知</div>
      <flexbox-item :span="12" v-for="(item,index) in data.groupsNoticeList" :key="item.id">
        <div class="title"> {{index + 1}}：{{item.title}} <span v-html="item.content"></span></div>
        <div>发布时间：{{item.createTime | formatDate('yyyy-MM-dd HH:mm')}}</div>
      </flexbox-item>
      <!--<flexbox-item :span="12">-->
        <!--<div>1、最新作业已经发布请同学们尽快查收</div>-->
        <!--<div>发布时间：2017-03-06</div>-->
      <!--</flexbox-item>-->
    </flexbox>
    <div class="myTeam_button">
      <button type="primary"  @click="open">申请加群</button>
    </div>
    <!--<div v-transfer-dom>-->
      <!--<confirm v-model="show"-->
               <!--@on-cancel="onCancel"-->
               <!--@on-confirm="onConfirm"-->
               <!--@on-show="onShow"-->
               <!--class="ccc">-->
        <!--<div id="myTeam_inp" style="text-align:center;">-->
          <!--<div style="-->
<!--font-size:0.18rem;-->
<!--color:rgba(27,27,27,1);margin-bottom: 10px;-->
<!--">请输入姓名</div>-->
          <!--<div style="margin-bottom: 10px;-->
<!--font-size:0.15rem;-->
<!--color:rgba(149,149,149,1);-->
<!--">请使用真是姓名，以便教师审核。</div>-->
          <!--<input type="text" style="height: 0.4rem;width: 255px;border: 1px solid #D4D4D4;"/>-->
        <!--</div>-->
      <!--</confirm>-->
    <!--</div>-->
    <alert v-model="show" title="提示"> 已经成功发出申请！</alert>
  </div>
</template>

<script>
import HeaderTitle from '../header'
import api from './api'
export default {
  data () {
    return {
      show: false,
      data: { groupsNoticeList: []}
    }
  },
  methods: {
    open () {
      this.joinGroup()
    },
    joinGroup () {
      let options = {
        url: api.joinGroup.path,
        method: api.joinGroup.method,
        params: {
          id: this.data.id
        },
        /**
         * 服务端返回的状态码检查,默认状态码检查前执行
         * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
         * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
         */
        ajaxSuccess: (data, res) => {
          this.show = true
        }

      }
      this.ajax(options)
    },
    shows () {
      this.$router.push({name: 'theClassOf'})
    },
    onCancel () {
      console.log('on cancel')
    },
    onConfirm (msg) {
      console.log('on confirm')
      if (msg) {
        alert(msg)
      }
      this.shows()
    },
    onHide () {
      console.log('on hide')
    },
    onShow () {
      console.log('on show')
    },
    getGroups () {
      let options = {
        url: api.getByNo.path,
        params: {
          no: this.$route.query.no
        },
        /**
         * 服务端返回的状态码检查,默认状态码检查前执行
         * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
         * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
         */
        ajaxSuccess: (data, res) => {
          this.data = data
        }
      }
      this.ajax(options)
    }
  },
  created () {
    this.getGroups()
  },
  components: {HeaderTitle}
}
</script>
<style lang="scss">
  @import '../../../css/child/myTeam';
  .ccc{
    .weui-dialog{
      border-radius: 20px;
    }
    .weui-mask{
      background: rgba(0, 0, 0, 0.2);
    }
  }
</style>
