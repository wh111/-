/******************************************************************************************************
 *
 用于store默认加载的状态模块,该模块主要处理公用信息存储不限于包含:用户信息、公用的全局系统变量等信息
 * 存储登录用户的相关用户信息, 登录状态
 * @module index(状态管理默认加载模块)
 ******************************************************************************************************/
import {Cookie,Local} from '../libs/storage'

/*******************************************************************************
 *  存储使用的  从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态
 *  例如:computed: {
    count () {
      return store.state.count
    }
  }
 *  @module state
 ********************************************************************************/
const state = {
  isLogin: !!Cookie.get('LOGIN_TOKEN'),
  token: Cookie.get('LOGIN_TOKEN'), // 存储token
  loginInfo: Local.get('loginInfo') || {}, // 账户信息
  envs: Local.get('envs'),
  allowBack:true,
}

/*******************************************************************************
 *  更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串
    的事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
 *  例如:
    mutations: {
      increment (state) {
        // 变更状态
        state.count++
      }
    }
 *  @module mutations
 ********************************************************************************/
const mutations = {
  setLoginToken (state, token) {
    state['token'] = token
  },
  setIsLogin (state, isLogin) {
    state['isLogin'] = isLogin
  },
  setLoginInfo (state, loginInfo) {
    state['loginInfo'] = Object.assign(state['loginInfo'], loginInfo);
    Local.set('loginInfo', loginInfo)
  },
  initEnvs: (state, obj = null) => {state.envs = obj; Local.set('envs',obj) },
  updateAppSetting:(state, obj)=>{
    console.log(obj)
  }
}

/*******************************************************************************
 *  Action 类似于 mutation，不同在于：
    1、Action 提交的是 mutation，而不是直接变更状态。
    2、Action 可以包含任意异步操作。
 *  例如:
     state: {
        count: 0
      },
     mutations: {
        increment (state) {
          state.count++
        }
      },
     actions: {
        increment (context) {
          context.commit('increment')
        }
      }
 *  @module actions
 ********************************************************************************/
const actions = {
  /**
   * 获取用户登录的Token
   * @param {object} commit
   * @param {object} obj ajax请求的参数及当前vue实例对象 {vue:'',options:{}}
   */
  getLoginTokenByPost ({ commit }, obj) {
    let options = obj['options']
    let $vue = obj['vue'] // 当前的vue实例对象
//    let gotoRouter = obj.currRole // 登录成功后跳转的路由
    return new Promise((resolve, reject) => {
      options = Object.assign({
        ajaxSuccess (data, res) {
          if (res['status']['code'] === '0') {
            let token = Cookie.get('LOGIN_TOKEN')
            commit('setIsLogin', true)
            commit('setLoginToken', token)
//          $vue.$router.push({name: gotoRouter.toLowerCase()})
          }
          resolve(data, res)
        }
      }, options || {});
      $vue.ajax(options)
    })
  },

  /**
   * 获取用户信息
   * @param {object} commit
   * @param {object} obj ajax请求的参数及当前vue实例对象 {vue:'',options:{}}
   */
  getLoginInfoByGet ({ commit }, obj) {
    let options = obj['options']
    let $vue = obj['vue'] // 当前的vue实例对象
    options = Object.assign({
      ajaxSuccess (data, res) {
        if (res['status']['code'] === '0') {
          Local.set('loginInfo',data);
          console.log(data)
          commit('setLoginInfo', data)
        }
      }
    }, options || {})
    $vue.ajax(options)
  },

  /**
   * 退出登录
   * @param {object} commit
   * @param {object} $vue 当前组件的vue的this对象
   * @param {object} options ajax请求的参数
   */
  loginOut ({ commit }, obj) {
    let options = obj['options']
    let $vue = obj['vue']
    options = Object.assign({
      ajaxSuccess (data, res) {
        Cookie.remove('Token')
        commit('setLoginToken', '')
        commit('setLoginInfo', {})
        commit('setIsLogin', false)
      }
    }, options || {})
    $vue.ajax(options)
  }
}

/*******************************************************************************
 *  Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，
     且只有当它的依赖值发生了改变才会被重新计算。
 * Getter 接受 state 作为其第一个参数：
 *  例如:
     getters: {
        doneTodos: state => {
          return state.todos.filter(todo => todo.done)
        }
     }
 *  @module getters
 ********************************************************************************/
const getters = {

}

export {
  state,
  mutations,
  actions,
  getters
}
