import { fetch } from './fetch';
import { formatDate, parseDate } from './date';
import _ from 'lodash';
import config from '../config/config';
// 自定义组件

let util = {};
// 前端路由前缀
util.base = '/sasmobile';
util._ = _;
// 根据不同的登录角色设置请求url的前缀
util.setUrlPrefix = function (prefixKey) {
  fetch.setUrlPrefix(prefixKey);
};

// 请求前改变请求头源参数
util.setAjaxQuestHeader = function (key, v) {
  fetch.setAjaxQuestHeader(key, v);
};
// 试题配置
util.questionConfig = config.question;
util.getFormData = function (...objs) {
  return _.defaultsDeep([], ...objs);
};

/**
 * 设置缓存值
 * @param name
 * @param val
 */
util.setStaticData = function (name, val) {
  localStorage.setItem(name, JSON.stringify(val));
};

/**
 * 获取缓存值
 * @param name
 * @returns {any}
 */
util.getStaticData = function (name) {
  return JSON.parse(localStorage.getItem(name));
};

/**
 * 删除缓存值
 * @param name
 */
util.delStaticData = function (name) {
  localStorage.removeItem(name);
};

// 是否是微信浏览器
util.isWeiXin = function () {
  //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  var ua = window.navigator.userAgent.toLowerCase();
  //通过正则表达式匹配ua中是否含有MicroMessenger字符串
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
};

// 消息提示
let success = util.success = function (mes) {
  console.log('成功消息!');
};
let error = util.error = function (mes) {
  console.log('失败消息!');
};
let info = util.info = function (mes) {
  console.log('普通消息提示!');
};

export const utils = util;

/**
 * 为方便起见，为所有支持的请求方法提供了别名,可以通过该导出口扩展axios已有的别名方法
 *

 axios.request(config)

 axios.get(url[, config])

 axios.delete(url[, config])

 axios.head(url[, config])

 axios.post(url[, data[, config]])

 axios.put(url[, data[, config]])

 axios.patch(url[, data[, config]])

 axios.all(iterable)

 axios.spread(callback)
 执行多个并发请求,例如:

 function getUserAccount() {
      return axios.get('/user/12345');
    }

 function getUserPermissions() {
      return axios.get('/user/12345/permissions');
    }

 axios.all([getUserAccount(), getUserPermissions()])
 .then(axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
  }));
 * 详细参数说明、用法详见libs/fetch.js
 */
export function ajax (options) {
  fetch.sendAjax(options);
}

export default {
  install (Vue) {
    Vue.prototype.$util = util;
    Vue.mixin({
      data () {
        return {
          fetch
          // 数据变量
        };
      },
      created () {
        fetch.vueSelf = this;
      },
      methods: {
        successMess: success,
        errorMess: error,
        showMess: info,
        ajax (options) {
          fetch.sendAjax(options);
        },
        setTitle (title) {
          document.title = title;
          var mobile = navigator.userAgent.toLowerCase();
          if (/iphone|ipad|ipod/.test(mobile)) {
            var iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            // 替换成站标favicon路径或者任意存在的较小的图片即可
            iframe.setAttribute('src', '/favicon.ico');
            var iframeCallback = function () {
              setTimeout(function () {
                iframe.removeEventListener('load', iframeCallback);
                document.body.removeChild(iframe);
              }, 0);
            };
            iframe.addEventListener('load', iframeCallback);
            document.body.appendChild(iframe);
          }
        },
        /*
      * 对表单数据的时间进行转换
      * @params  data    obj|array  需要转换的数据源
      * @parans fn        fun||string  操作的方法或字符串模板，yyyy-mm
      * @parans targer   array  需要操作的对象的名
      * */
        formDate (data, targer, fn) {
          let length = targer.length;
          let that = this;
          let isObject = this.valDataType(data, 'Object');
          if (isObject) {
            for (let i = 0; i < length; i++) {
              if (typeof fn == 'string') {
                data[targer[i]] = this.conductDate(data[targer[i]], fn);
              } else {
                fn = fn || this.yearMonthData || function () {
                };
                data[targer[i]] = fn(data[targer[i]]);
              }
            }
            return data;
          }
          this.$util._.forEach(data, function (value) {
            for (let i = 0; i < length; i++) {
              if (typeof fn == 'string') {
                value[targer[i]] = that.conductDate(value[targer[i]], fn);
              } else {
                fn = fn || that.yearMonthData || function () {
                };
                value[targer[i]] = fn(value[targer[i]]);
              }
            }
          });
          return data;
        },

        /*
        * 将字符串时间转换为时间戳
        * @param date  {String}  例如:201-08-01
        * */
        parseTimestamp (date) {
          let timestamp;
          if (navigator.userAgent.indexOf('Firefox') > 0) {  //解决火狐兼容性问题
            date && (date = date + 'T09:00:00');
            timestamp = date ? Date.parse(date) : new Date().getTime();
          } else {
            timestamp = date ? new Date(date).getTime() : new Date().getTime();
          }
          return timestamp;
        },

        /*//如果传过来的为字符串模板，则使用此函数处理
        * @params    date    obj||string
        * @params    format    string        yyyy-MM-dd HH:mm:ss.SSS
        *
        *
        * */
        parseDate (date, format) {

          return parseDate(date, format);
        },
        conductDate (date, format) {

          // if(typeof date =='string'){
          //   date =  parseDate(date,format)
          // }else {
          date = formatDate(date, format);
          // }
          return date;
        },

        /*
         * 对表单数据的时间进行转换
         * @parans date   string|obj  操作的方法
         * @return 199-02-12格式的时间
         * */
        yearMonthData (date) {
          if (typeof date != 'object') return date;

          let datetime = new Date(date);
          let year = datetime.getFullYear();
          let month = datetime.getMonth() + 1;
          let D = date.getDate() + '';
          if (month < 10) {
            month = '0' + month;
          }
          if (D < 10) {
            D = '0' + D;
          }
          return year + '-' + month + '-' + D;
        },

        /*
         * 对表单数据的时间进行转换
         * @parans date   string|obj  操作的方法
         * @return 19902格式的时间
         * */
        yearMonth (date) {
          if (!date) return '';
          if (typeof date != 'object') {
            if (typeof date == 'number') {
              date = date + '';
              let year = date.substring(0, 4);
              let month = date.substring(date.length - 2, date.length);
              date = year + '-' + month;
            } else {
              date = date.split('-');
              date = date[0] + date[1];
            }
            return date;
          } else {
            let datetime = new Date(date);
            let year = datetime.getFullYear();
            let month = datetime.getMonth() + 1;
            if (month < 10) {
              month = '0' + month;
            }
            return +(year + '' + month);
          }
        },
        /**
         * 获取静态资源访问路径
         * @param path
         * @returns {*|string}
         */
        getStaticPath (path) {
          return path && (this.$store.state.envs.resourceHttp + path) || '';
        },

        toHome(data){
          let goto = this.$util.getStaticData('goto');
          let preFix = this.setUrlPrefix(Number(data.userType));
          this.$util.delStaticData('userInfo');
          this.$util.delStaticData('unionId');
          if (goto && goto != 'false') {
            this.$router.push(goto);
          } else {
            this.$router.push({name: preFix.toLowerCase()})
          }
        },
        setUrlPrefix(userType){
          let userTypes = {
            0:'TEACHER',
            1:'STUDENT',
            2:'GUARDIAN',
          };
          let preFix = userTypes[userType];
          this.$util.setUrlPrefix(preFix);
          return preFix
        },
      }
    });
  }
};
