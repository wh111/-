import Axios from 'axios'
import Config from '../config/config'
import _ from 'lodash'
import Qs from 'qs'
import { Cookie } from '../libs/storage'
import { AlertModule } from 'vux'

Axios.defaults.withCredentials = true

// 发送时
Axios.interceptors.request.use(config => {
  // 开始
  return config
}, err => {
  return Promise.reject(err)
})

// 响应时
Axios.interceptors.response.use(response => response, err => Promise.resolve(err.response))

// 检查状态码
function checkStatus (res) {
  // 状态码检查前
  // 状态码检查中
  if (res.status === 200 || res.status === 304) {
    return res.data
  }
  if (res.status === 404) {
    return {
      code: 404,
      msg: '您访问页面地址不存在!',
      data: res.statusText
    }
  }
  if (res.status === 500) {
    return {
      code: 500,
      msg: '服务器处理错误!',
      data: res.statusText
    }
  }
  return {
    code: 0,
    msg: '其它未知错误信息!',
    data: res.statusText
  }
  // return res
}

// 检查CODE值
function checkCode (res, options) {
  console.log(res,'52')
  // 默认code校验前
  if (typeof options['beforeCheckCode'] === 'function') {
    options['beforeCheckCode'](res['status']['code'], res)
  }
  if (_.isObject(res['status']) && res['status']['code'] !== '0') {
    if (typeof options['checkCode'] === 'function') {
      options['checkCode'](res['status']['code'], res);
    } else {
      let flag = handleErrorCode(res['status'])
      if (!flag) {
        throw new Error(res['status']['msg'])
      }
    }
  }
  // 默认code校验后
  if (typeof options['afterCheckCode'] === 'function') {
    options['afterCheckCode'](res['status']['code'], res)
  }
  return res
}

// 处理code值得默认提示
function handleErrorCode (status) {
  let flag = true
  let code = parseInt(status['code'])
  console.log(code,status)
  let msg = status['msg']
  switch (code) {
    case 4:
      console.log(Cookie.get('LOGIN_TOKEN'))
      if (Cookie.get('LOGIN_TOKEN')) {
        AlertModule.show({
          title: '',
          content: '登录超时!',
          onHide () {
            console.log('跳转登录页面！');
             fetch.vueSelf.$router.push({name: 'login'});
             
          }
        })
      } else {
        console.log(this)
        AlertModule.show({
          title: '',
          content: '非法登录!',
          onHide () {
            console.log(this)
            console.log('跳转登录页面！')
            fetch.vueSelf.$router.push({name: 'login'});
          }
        })
      }
      Cookie.remove('LOGIN_TOKEN')
      break
    
    case 1:
      AlertModule.show({
        title: '',
        content: msg,
        onShow () {
          // console.log('Module: I\'m showing')
        },
        onHide () {
          // console.log('Module: I\'m hiding now')
        }
      })
      break
    case 2:
      AlertModule.show({
        title: '',
        content: msg,
        onShow () {
          // console.log('Module: I\'m showing')
        },
        onHide () {
          // console.log('Module: I\'m hiding now')
        }
      })
      break
    default :
      flag = flag
  }
  return flag
}

// 请求前改变请求头源参数
function setAjaxQuestHeader (key, v) {
  Config.ajaxconfig['headers'][key] = v
}

// 处理ajax请求不进成功
function ajaxError (error) {
  return (error) => {
    console.log(error)
    if (error.response) {
      
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // handleAjaxError(this, error.response.status + '');
      
      // console.log(error.response.status);
      // console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error(error.message)
    }
  }
}

export const fetch = {
  vueSelf:null,
  /**
   * 根据不同的登录角色设置请求url的前缀
   * @param string prefixKey  前缀的key值
   */
  setUrlPrefix (prefixKey) {
    Config.pathPrefix = Config.ajaxBaseURL[prefixKey]
    Config.ajaxconfig.baseURL = Config.urlPrefix + Config.pathPrefix
    Cookie.remove('baseURL')
    Cookie.set('baseURL', Config.ajaxconfig.baseURL)
  },
  
  /**
   * 为方便起见，为所有支持的请求方法提供了别名
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
   *
   * @param (object) options 对应axios原始config参数,用于页面调用传递参数
   */
  _setAxiosParams (options) {
    // console.log(options)
    if (!options) return
    options['method'] = options['method'] || 'get'
    options['params'] = Object.assign({}, options['params'], {mathRand: Math.random() * 100000000000000000})
    let isParseStringJSON = options['jsonString']
    // console.log(isParseStringJSON)
    if (typeof isParseStringJSON !== 'undefined') {
      setAjaxQuestHeader('Content-Type', 'application/json')
    } else {
      setAjaxQuestHeader('Content-Type', 'application/x-www-form-urlencoded')
    }
    
    if (typeof options['data'] !== 'undefined' && !isParseStringJSON) {
      options['data'] = Qs.stringify(options['data'])
    }
    if (isParseStringJSON) {
      options['data'] = JSON.stringify(options['data'])
    }
    
    fetch.setAjaxQuestHeader('Token', Cookie.get('Token'))
    
    let config = Object.assign({}, Config.ajaxconfig, options)
    return config
  },
  
  /**
   * 初始axios并发送请求到服务端
   * @param {object} options
   * @param {boolean|undefined} flag
   * @return {*}
   */
  promise (options, flag) {
    flag = !flag
    let confing = fetch._setAxiosParams(options)
    if (flag) return Axios(confing)
    
    return {'axios': Axios(confing), 'checkList': {'checkStatus': checkStatus, 'checkCode': checkCode}}
  },
  
  all (options, fun) {
    if (!_.isArray(options)) return
    let ajaxArr = []
    _.forEach(options, function (v) {
      ajaxArr.push(fetch.promise(v))
    })
    Axios.all(ajaxArr).then(Axios.spread(function () {
      let paramsArr = Array.from(arguments)
      _.forEach(paramsArr, function (v, index) {
        return checkStatus(v, options[index])
      })
      // fun(...tempArr, paramsArr)
    })).then(res => {
      /* _.forEach(paramsArr, function (v) {
        tempArr.push(v.data)
      }) */
    })
  },
  
  get (options, fun) {
    options = fetch.matching(options, 'get')
    if (!options) return
    fetch.sendAjax(options, fun)
  },
  
  post (options, fun) {
    options = fetch.matching(options, 'post')
    if (!options) return
    fetch.sendAjax(options, fun)
  },
  
  matching (options, method) {
    let params = {}
    if (_.isString(options)) {
      params.url = options
    } else if (_.isObject(options)) {
      params = options
    } else {
      throw new Error('传入的options应该为Object或url字符串!')
    }
    params.method = method
    return params
  },
  
  // 请求前改变请求头源参数
  setAjaxQuestHeader (key, v) {
    Config.ajaxconfig['headers'][key] = v
  },
  
  rules: {
    baseURL: {types: ['String'], mes: 'baseURL类型为string'}, // url的前缀
    method: {types: ['String'], mes: 'method类型为string,支持参数:get || post || put || delete || patch'}, // 请求的方式 get post put delete patch
    url: {types: ['String'], mes: 'url为必传参数,类型为string', require: true}, // 请求的地址
    timeout: {types: ['String', 'Number'], mes: ''}, // 请求超时的时间  默认300000毫秒
    responseType: {types: ['String'], mes: ''}, // 返回的数据类型
    headers: {types: ['Object'], mes: ''}, // 请求头
    params: {types: ['Object'], mes: ''}, // 请求的的地址参数
    data: {types: ['Object'], mes: ''}, // post参数，使用axios.post(url,{},config);如果没有额外的也必须要用一个空对象，否则会报错
    ajaxSuccess: {types: ['Function', 'String'], mes: ''}, // 成功后回调
    beforeCheckStatus: {types: ['Function', 'String'], mes: ''}, // 状态码检查前  目前没有用
    afterCheckStatus: {types: ['Function', 'String'], mes: ''}, // 状态码检查前  目前没有用
    beforeCheckCode: {types: ['Function', 'String'], mes: ''}, // 状态码检查前
    checkCode: {types: ['Function', 'String'], mes: ''}, // 自定义状态码检查
    afterCheckCode: {types: ['Function', 'String'], mes: ''}, // 状态码检查前
    self: {types: ['Object'], mes: ''}// 当前vue的实例
  },
  // 如果存在 self 次验证规则判断是否有使用vue实例里面的方法
  vueRules: {
    ajaxSuccess: true, // 成功后回调
    beforeCheckStatus: true, // 状态码检查前  目前没有用
    afterCheckStatus: true, // 状态码检查前  目前没有用
    beforeCheckCode: true, // 状态码检查前
    checkCode: true, // 自定义状态码检查
    afterCheckCode: true // 状态码检查前
  },
  
  /** 校验传过来的options和fun的合法性，并进行校准
   * @param  {Object|string} options
   * @param {function|undefined} fun  成功后的回调函数
   * @return {Object|blooean|undefined} 如果为object则证明通过，如果返回false或者undefined 则失败
   * */
  checker (options, fun) {
    options = fetch.vueInstanceValidate(fetch.optionsTypeValidate(options, fun))
    _.forEach(options, function (v, key) {
      fetch.validate(v, key)
    })
    return options
  },
  /** vue实例验证 并校准
   * @param  {Object|string} options
   * */
  vueInstanceValidate (options) {
    if (!(options.self && _['isObject'](options.self))) return options
    let vue = options.self
    _.forEach(options, function (v, key) {
      let rule = fetch.vueRules[key]
      if (!rule) return // 判断是否在验证规则里面
      if (_['isString'](v)) return
      if (vue[v]) {
        options[key] = vue[v]
      } else {
        console.warn(`${key}:${v}当前vue实例里面没有此方法`)
      }
    })
    return options
  },
  /** options的类型校验并且合并fun
   * @param  {Object|string} options
   * @param {function|undefined} fun  成功后的回调函数
   * @return {Object}
   * */
  optionsTypeValidate (options, fun) {
    // console.log('optionsTypeValidate', options)
    let params = {}
    if (_.isString(options)) { // 确保传到下面的一定是个object
      params.url = options
    } else if (_.isObject(options)) {
      params = options
    } else {
      throw new Error('当前options为:' + typeof options + ',options应该为{}或url字符串!')
    }
    if (typeof fun === 'function') { // 存在fun则fun的优先级比较高
      params['ajaxSuccess'] = fun
    }
    // console.log('params', params)
    return params
  },
  // 检测合法性
  validate (value, key) {
    let rule = fetch.rules[key]
    if (!rule) return // 判断是否在验证规则里面
    if (!value && rule.require) throw new Error(rule.mes)// 判断是否为空并且必填
    
    let flag = rule.types.reduce((flag, type) => {
      if (flag) return flag// true
      flag = _['is' + type](value)
      return flag
    }, false)
    if (!flag) {
      throw new Error(`${key}的传入类型应为${rule.types.join(',')}`)
    }
  },
  
  /**
   * 实际向后台请求ajax
   * @param  {Object} options
   * @param {function|undefined} fun  成功后的回调函数
   * @return {Promise<any>|null}
   * options参数说明:
   * options={
   *  baseURL: '',  //url的前缀
   *  method: 'get',  //请求的方式 get post put delete patch all
   *  self: vue,  //当前vue的实例
   *  url: '',  //请求的地址
   *  timeout: 300000,  //请求超时的时间  默认300000毫秒
   *  responseType: 'json', //返回的数据类型
   *  headers:{  //请求头
   *    'Content-Type': 'application/x-www-form-urlencoded', // application/json application/x-www-form-urlencoded
        'Token': ''
   *  },
   *  params: {},  //请求的的地址参数
      data: {},  // post参数，使用axios.post(url,{},config);如果没有额外的也必须要用一个空对象，否则会报错
   *  ajaxSuccess:function(res.data, res){},  //成功后回调
   *  beforeCheckStatus:function(res){},  //状态码检查前  目前没有用
   *  afterCheckStatus:function(res){},  //状态码检查前  目前没有用
   *  beforeCheckCode:function(code, res){},  //状态码检查前
   *  checkCode:function(code, res){}, //自定义状态码检查
   *  afterCheckCode:function(code, res){},  //状态码检查前
   * }
   */
  sendAjax (options, fun) {
    // console.log('sendAjax', options)
    options = fetch.checker(options, fun)
    if (!options) return null
    let axios = fetch.promise(options)
    return new Promise((resolve, reject) => {
      try {
        axios.then(res => {
          return checkStatus(res, options)
        }).then(res => {
          return checkCode(res, options)
        }).then(res => {
          if (typeof options.ajaxSuccess === 'function') {
            options.ajaxSuccess(res.data, res)
          }
        }).catch(err => {
          reject(err)
        })
      } catch (e) {
        reject(e)
      }
    })
  }
}
