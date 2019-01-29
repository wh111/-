<!----------------------------------
****--@name     tTeam
****--@role     ${*}
****--@date     2018/5/4
****--@author   zzh
----------------------------------->
<template>
  <div class="tTeam">
    <!--<ul class="hello_header">-->
      <!--<li v-if="showClass === 'tClass'" @click="back">-->
        <!--<x-icon type="ios-arrow-back" size="0.3rem"></x-icon>-->
        <!--<div>返回</div><div>关闭</div>-->
      <!--</li>-->
      <!--<li v-if="showClass === 'tGroup'" @click="goBack">-->
        <!--<x-icon type="ios-arrow-back" size="0.3rem"></x-icon>-->
        <!--<div>返回</div><div>关闭</div>-->
      <!--</li>-->
      <!--<li>班组</li>-->
      <!--<li>-->
        <!--<div></div><div></div><div></div>-->
      <!--</li>-->
    <!--</ul>-->
    <header-title>
      <slot>首页</slot>
    </header-title>
    <div class="stance"></div>
    <ul class="tTeamHeader">
      <li style="margin-left: 0.84rem" @click="open('tClass')" :class="showClass === 'tClass' ? 'active' : '' ">只看班级</li>
      <li @click="open('tGroup')" :class="showClass === 'tGroup' ? 'active' : ''">只看小组</li>
    </ul>
    <router-view/>
  </div>
</template>
<script>
  import HeaderTitle from '../header'
export default{

  data () {
    return {
      type: 1,
      showClass: 'tClass'
    }
  },
  methods: {
    open (type) {
      this.showClass=type
      this.$router.push({name: 'tGroup',query:{type:type=='tClass'?0:1 }})
    },
    back () {
//      this.$router.push({name: 'login'})
    },
    goBack () {
//      this.$router.back(-1)
    }

  },
  watch: {
    $route (to, from) {
      // console.log(to.name)
//      this.showClass = to.name
    }
  },
  created () {
  },
  components: {HeaderTitle}
}
</script>
<style lang="scss">
  @import "../../../tcss/tTeam";
  @import "../../../css/header";
</style>
