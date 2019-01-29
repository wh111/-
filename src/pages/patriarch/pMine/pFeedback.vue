<template>
	<div class="pFeedback">
		<header-title>
	      <slot>留言反馈</slot>
	    </header-title>
	    <div class="stance"></div>
	    <!--<div class="header">-->
	    	<!--暂无数据-->
	    <!--</div>-->
	    <x-button type="primary" class="pPrimary" @click.native="open">我要反馈</x-button>
	</div>
</template>

<script>
import HeaderTitle from '../header'
export default{
  data () {
    return {
      type: ''
    }
  },
  methods: {
    open () {
      this.$router.push({name: 'pSubmit'})
    }
  },
  created () {
  },
  components: {HeaderTitle}
}
</script>
<style lang="scss">
	 @import '../../../pcss/pMine/pFeedback';
</style>
