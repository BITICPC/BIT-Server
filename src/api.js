import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$http = axios
axios.defaults.baseURL = '/api'

export default {
  register (data) {
    return ajax('/users', 'post', {
      data
    })
  },
  login (data) {
    return ajax('/auth', 'post', {
      data
    })
  },
  getUserInfo (username = undefined) {
    let cmd = '/users/' + username
    return ajax(cmd, 'get')
  },
  changeUserInfo (username = undefined, data) {
    let cmd = '/users/' + username
    return ajax(cmd, 'put', {
      data
    })
  }
}

function ajax (url, method, options) {
  if (options !== undefined) {
    var {params = {}, data = {}} = options
  } else {
    params = data = {}
  }
  return new Promise((resolve, reject) => {
    axios({
      url,
      method,
      params,
      data
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err.response.data)
    })
  })
}
