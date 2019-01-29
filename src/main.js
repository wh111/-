// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import store from './vuex/store';
import App from './App';
import router from './router';
import Util from './libs/util';
import Filters from './libs/filters';
import $ from 'jquery';
import { WechatPlugin } from 'vux';

window.jQuery = $;
window.$ = $;
import './tools/rem';
import {
  Alert,
  Group,
  XSwitch,
  Cell,
  Toast,
  AlertModule,
  TransferDomDirective,
  XProgress,
  Box,
  Flexbox,
  FlexboxItem,
  Checklist,
  WechatEmotion,
  XCircle,
  Grid,
  GridItem,
  Confirm,
  XButton,
  Scroller,
  Icon,
  Selector,
  XInput,
  Datetime,
  Step,
  StepItem,
  XHr,
  Swiper,
  SwiperItem,
  Actionsheet
} from 'vux';

Vue.component('actionsheet', Actionsheet);
Vue.component('swiper', Swiper);
Vue.component('swiper-item', SwiperItem);
Vue.component('x-hr', XHr);
Vue.component('step', Step);
Vue.component('step-item', StepItem);
Vue.component('datetime', Datetime);
Vue.component('x-input', XInput);
Vue.component('selector', Selector);
Vue.component('icon', Icon);
Vue.component('scroller', Scroller);
Vue.component('x-button', XButton);
Vue.component('confirm', Confirm);
Vue.component('grid', Grid);
Vue.component('grid-item', GridItem);
Vue.component('x-circle', XCircle);
Vue.component('emotion', WechatEmotion);
Vue.component('checklist', Checklist);
Vue.component('alert', Alert);
Vue.component('group', Group);
Vue.component('cell', Cell);
Vue.component('xSwitch', XSwitch);
Vue.component('alertModule', AlertModule);
Vue.component('transferDomDirective', TransferDomDirective);
Vue.component('box', Box);
Vue.component('xProgress', XProgress);
Vue.component('flexbox', Flexbox);
Vue.component('toast', Toast);
Vue.component('flexbox-item', FlexboxItem);
Vue.directive('transferDom', TransferDomDirective);
Vue.use(require('vue-wechat-title'));
Vue.config.productionTip = false;
Filters(Vue);
Vue.use(Util);
Vue.use(WechatPlugin);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
