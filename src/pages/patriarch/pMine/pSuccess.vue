<template>
	<div class="pSuccess">
		<header-title>
	      <slot>结果页</slot>
	    </header-title>
	    <div class="stance"></div>
	    <div class="header">
	    	<icon type="success" is-msg></icon>
	    	<div>操作成功</div>
	    	<p>您的留言提交成功</p>
	    </div>
		<x-button type="primary" class="pPrimary" @click.native="open('pMine')" v-if="$route.query.type!='teacher'">我知道了</x-button>
	    <x-button v-else type="primary" class="pPrimary" @click.native="open('tMine')">我知道了</x-button>
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
    open (type) {
      this.$router.push({name: type})
    }
  },
  created () {
  },
  components: {HeaderTitle}
}
</script>
<style lang="scss">
	 @import '../../../pcss/pMine/pSuccess';
</style>
