/**
 * 处理 localStorage sessionStorage cookie 对应的set get remove方法
 * @module storage
 */
const ls = window.localStorage
const ss = window.sessionStorage

export const Cookie = {

  /**
   * 根据key值获取cookie的值,没有则返回空
   * @param  {string} key
   * @return {string}
   */
  get (key) {
    let arr = document.cookie.split('; ')
    for (let i = 0; i < arr.length; i++) {
      let arr2 = arr[i].trim().split('=')
      if (arr2[0] === key) {
        return arr2[1]
      }
    }
    return ''
  },

  /**
   * 设置存储的cookie
   * @param {string} key
   * @param {string} value
   * @param {string | number} day
   */
  set (key, value, day) {
    let setting = arguments[0]
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
      for (let i in setting) {
        let oDate = new Date()
        oDate.setDate(oDate.getDate() + day)
        document.cookie = i + '=' + setting[i] + ';expires=' + oDate
      }
    } else {
      let oDate = new Date()
      oDate.setDate(oDate.getDate() + day)
      document.cookie = key + '=' + value + ';expires=' + oDate
    }
  },

  /**
   * 根据key删除存储的cookie
   * @param {string} key
   */
  remove (key) {
    let setting = arguments[0]
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Array') {
      setting.forEach(key => {
        this.set(key, 1, -1)
      })
    } else {
      this.set(key, 1, -1)
    }
  }
}

export const Local = {

  /**
   * 根据key值获取localStorage存储的对应值,如果没有该项则返回null
   * @param {string} key
   * @return {*}
   */
  get (key) {
    if (key) return JSON.parse(ls.getItem(key))
    return null
  },

  /**
   * 存储对应的localStorage项目  {key:vaule}
   * @param {string} key
   * @param {string} val
   */
  set (key, val) {
    const setting = arguments[0]
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
      for (const i in setting) {
        ls.setItem(i, JSON.stringify(setting[i]))
      }
    } else {
      ls.setItem(key, JSON.stringify(val))
    }
  },

  /**
   * 根据key值删除localStorage存储的该项
   * @param {string} key
   */
  remove (key) {
    ls.removeItem(key)
  },

  /**
   * 清空所有存储的localStorage所有键值对
   */
  clear () {
    ls.clear()
  }
}

export const Session = {

  /**
   * 根据key值获取session的值,没有则返回空
   * @param  {string} key
   * @return {string||null}
   */
  get (key) {
    if (key) return JSON.parse(ss.getItem(key))
    return null
  },

  /**
   * 存储对应的session {key:value}
   * @param {string} key
   * @param {string} val
   */
  set (key, val) {
    const setting = arguments[0]
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
      for (const i in setting) {
        ss.setItem(i, JSON.stringify(setting[i]))
      }
    } else {
      ss.setItem(key, JSON.stringify(val))
    }
  },

  /**
   * 根据key值删除对应的 session
   * @param {string} key
   */
  remove (key) {
    ss.removeItem(key)
  },

  /**
   * 清空所有存储的session项目
   说明:Session.Clear()就是把Session对象中的所有项目都删除了，Session对象里面啥都没有。但是Session对象还保留 。
        Session.Abandon()就是把当前Session对象删除了，下一次就是新的Session了。
   */
  clear () {
    ss.clear()
  }
}
