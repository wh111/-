<template>
  <div class="pHerquestion_content">
    <header-title>
      <slot>五年高考三年模拟</slot>
    </header-title>
    <div class="stance"></div>
    <div class="header">
    	<div v-for="index in 6" :key="index">
    		<ul>
	    		<li>第五单元简单的几何图形测验考核</li>
	    		<li>共100题</li>
	    	</ul>
	    	<input type="button" value="查看" @click="open"/>
    	</div>
    </div>
  </div>
</template>
<script>
import HeaderTitle from '../header'
export default{
  data () {
    return {
    }
  },
  methods: {
    open () {
      this.$router.push({name: 'pExamine'})
    }
  },
  created () {
  },
  components: {
    HeaderTitle
  }
}
</script>
<style lang="scss">
  @import '../../../pcss/patriarch/pHerquestion_content';
</style>
