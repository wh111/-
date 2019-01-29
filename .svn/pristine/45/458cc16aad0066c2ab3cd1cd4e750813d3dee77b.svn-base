<template>
  <div class="pHerquestion">
    <header-title>
      <slot>TA的题库</slot>
    </header-title>
    <div class="stance"></div>
    <div class="header" v-for="index in 6" :key="index">
    	<div @click="open">
    		<img src="../../../../sasmobile/img/img888.png"/>
	    	<div class="aside">
	    		<div>五年高考</div>
	    		<div>《5年高考3年模拟》是2008年6月首都师范大学出版社、教育科学出版社出版出版的图书。</div>
	    	</div>
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
      	this.$router.push({name: 'pHerquestion_content'})
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
  @import '../../../pcss/patriarch/pHerquestion';
</style>
