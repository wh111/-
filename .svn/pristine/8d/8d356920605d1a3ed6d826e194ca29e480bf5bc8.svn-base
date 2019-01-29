<!----------------------------------
****--@name     addImg
****--@role     ${*}
****--@date     2018/5/8
****--@author   zzh
----------------------------------->
<template>
    <div class="addImg">
      <div id="ddd">
        <div id="img-group">
          <div class="img-item" v-for="(item,index) in imgArr" :key="index">
            <img :src="item.src" alt="">
          </div>
        </div>
        <div class="add-pic" @click="addPic()" v-show="picFlag">
          <x-button type="primary">+上传图片</x-button>
          <input name="files" id="uploaderInput" type="file" accept="image/*" multiple/>
        </div>
      </div>
    </div>
</template>
<script>
/* 当前组件必要引入 */

// 当前组件引入全局的util
let Util = null
export default {
  data () {
    return {
      imgArr: [],
      picFlag: true
    }
  },
  methods: {
    // 初始化请求列表数据
    init () {

    },
    goBack () {
      history.go(-1)
    },
    addPic () {
      let vm = this
      let input = $('#uploaderInput')
      input.unbind('change').on('change', function (e) {
        let files = input[0].files
        if (files.length === 6) vm.picFlag = false
        for (let i = 0; i < files.length; i++) {
          let reader = new FileReader()
          reader.readAsDataURL(files[i])
          reader.onload = function () {
            if (vm.imgArr.length < 6) {
              vm.imgArr.push({src: this.result})
            }
            if (vm.imgArr.length === 6) vm.picFlag = false
            if (vm.imgArr.length > 6) {
              Toast({
                message: '您最多上传六张站点图片',
                position: 'bottom',
                duration: 2000
              })
              vm.picFlag = false
            }
          }
        }
      })
    }
  },
  created () {
    this.init()
  },
  mounted () {
  },
  components: {}
}
</script>
<style lang="scss">
  .hide {
    display: none;
  }

  .img-item {
    width: 100%;
    height: 100%;
    float: left;
  }
  .img-item img {
    width: 100%;
    height: 100%;
    margin-bottom: 0.1rem;
  }
  .add-pic {
    position: relative;
    text-align: center;
    box-sizing: border-box;
  }

  .add-pic input {
    position: absolute;
    height: 0.2rem;
    top: 0.08rem;
    left: 0;
    width: 100%;
    opacity: 0;
  }
</style>
