<template>
    <div class="pSubmit">
        <header-title>
            <slot>留言反馈</slot>
        </header-title>
        <div class="stance"></div>
        <!--<div class="header">-->
        <x-textarea :max="500" :height="200" v-model="word"></x-textarea>
        <!--</div>-->
        <x-button type="primary" class="pPrimary" @click.native="submit">写好了，提交</x-button>
    </div>
</template>

<script>
  import api from './api'
  import HeaderTitle from '../header'
  import { XTextarea } from 'vux'

  export default {
    data () {
      return {
        type: '',
        word: '',
      }
    },
    methods: {
      open () {
        this.$router.push({name: 'pSuccess',query:{type:'teacher'}})
      },
      submit () {
        this.ajax({//
          ajaxSuccess:()=>{this.open()} ,
          // baseURL:'PUBLIC',
          url: api.add.path,
          method: api.add.method,
          data: {
            content: this.word,
            title: ''
          },
        })
      }
    },
    created () {
    },
    components: {HeaderTitle, XTextarea}
  }
</script>
<style lang="scss">
    @import '../../../pcss/pMine/pSubmit';
</style>
