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
  getUserInfo (username, jwt = undefined) {
    let cmd = '/users/' + username
    if (jwt !== undefined) {
      return ajax(cmd, 'get', {
        params: {
          detailed: true
        },
        headers: {
          Authorization: 'Jwt ' + jwt
        }
      })
    }
    return ajax(cmd, 'get')
  },
  changeUserInfo (username, data, jwt) {
    let cmd = '/users/' + username
    return ajax(cmd, 'put', {
      data: data,
      headers: {
        Authorization: 'Jwt ' + jwt
      }
    })
  },
  getRanklist (params) {
    return ajax('/users/ranklist', 'get', {
      params
    })
  },
  getProblemList (params, jwt) {
    return ajax('/problems', 'get', {
      params: params,
      headers: {
        Authorization: 'Jwt ' + jwt
      }
    })
  },
  getProblemDetail (id, jwt) {
    let cmd = '/problems/' + id
    return ajax(cmd, 'get', {
      params: {
         id: id
      },
      headers: {
        Authorization: 'Jwt ' + jwt
      }
    })
  },
  createProblem (data, jwt) {
    return ajax('/problems', 'post', {
      data: data,
      headers: {
        Authorization: 'Jwt ' + jwt
      }
    })
  },
  editProblemDetail (id, data, jwt) {
    let cmd = '/problems/' + id
    return ajax(cmd, 'put', {
      data: data,
      headers: {
        Authorization: 'Jwt ' + jwt
      }
    })
  },
  addIntoPublicProblemList (data, jwt) {
    return ajax('/archive', 'post', {
      data: data,
      headers: {
        Authorization: 'Jwt ' + jwt
      }
    })
  },
  deleteFromPublicProblemList (data, jwt) {
    return ajax('/archive', 'delete', {
      data: data,
      headers: {
        Authorization: 'Jwt ' + jwt
      }
    })
  },
  getPublicProblemList (params) {
    return ajax('/archive', 'get', {
      params
    })
  },
  getPublicProblemDetail (id) {
    let cmd = '/archive/' + id
    return ajax(cmd, 'get')
  },
}

function ajax (url, method, options) {
  if (options !== undefined) {
    var {params = {}, data = {}, headers = {}} = options
  } else {
    params = data = headers = {}
  }
  return new Promise((resolve, reject) => {
    axios({
      url,
      method,
      params,
      headers,
      data
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err.response.data)
    })
  })
}
