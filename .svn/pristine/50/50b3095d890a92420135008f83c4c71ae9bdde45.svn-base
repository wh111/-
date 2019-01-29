<!----------------------------------
****--@name     tGroup
****--@role     ${*}
****--@date     2018/5/7
****--@author   zzh
----------------------------------->
<template>
    <div class="tClass">
        <p class="message" style="margin-top: 0.3rem" v-if="!classGroupList.length">暂无群组</p>
        <flexbox wrap="wrap" justify="space-between" :gutter=0 class="myTeam_header" v-for="(item,index) in classGroupList" :key="index">
            <flexbox-item>
                <div >{{item.title}}</div>
                <div><span>群号</span><span>{{item.no}}</span></div>
            </flexbox-item>
            <div class="right_box" @click="open('tClassContent',item)" style="align-items: center;display: flex;justify-content: right">
                <div>{{item.workPaperCount}}</div>
                <x-icon type="ios-arrow-forward" size="0.3rem"></x-icon>
            </div>
        </flexbox>
        <div class="tClassAdd" @click="add('tClassCreated')">+添加<span v-if="$route.query.type">小组</span><span v-else>班级</span>群</div>
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
        classGroupList:[],
        groupListofSmallList:[],

      }
    },
    methods: {
      // 初始化请求列表数据
      init () {
        this.getGroupList();
        this.getUserInfo()
      },
      //班组群
      getGroupList () {
        this.ajax({
          ajaxSuccess:(data,res) => {
            this.classGroupList = res.data.dataList
          },
          url: api.getGroups.path,
          method: api.getGroups.method,
          params: {
            types:this.$route.query.type||0,
          },

        })
      },
      // 获取用户登录信息
      getUserInfo () {
        let obj = {
          vue: this,
          options: {
            method: api.userInfo.method,
            url: api.userInfo.path
          }
        }
        this.$store.dispatch('getLoginInfoByGet', obj);

      },
      open (type,id) {
        this.$router.push({name: type,query:{groupsId:id.id,name:id.title,no:id.no,type:this.$route.query.type||0}})
      },
      add(type){
        this.$router.push({name: type,query:{type:this.$route.query.type||0}})
      }
    },
    created () {
      this.init()
    },
    mounted () {
    },
    watch:{
      $route (to, from) {
        this.init()
      }

    },
    components: {}
  }
</script>
<style lang="scss">
    @import "../../../tcss/tClass";
</style>
