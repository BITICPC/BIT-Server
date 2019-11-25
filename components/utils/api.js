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
    const cmd = '/users/' + username
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
    const cmd = '/users/' + username
    return ajax(cmd, 'put', {
      data,
      headers: {
        Authorization: 'Jwt ' + jwt
      }
    })
  },
  changeUserPassword (username, data, jwt) {
    const cmd = '/users/' + username + '/password'
    return ajax(cmd, 'put', {
      data,
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
      params,
      headers: {
        Authorization: 'Jwt ' + jwt
      }
    })
  },
  getProblemDetail (id, jwt) {
    const cmd = '/problems/' + id
    return ajax(cmd, 'get', {
      params: { id },
      headers: {
        Authorization: 'Jwt ' + jwt
      }
    })
  },
  createProblem (data, jwt) {
    return ajax('/problems', 'post', {
      data,
      headers: {
        Authorization: 'Jwt ' + jwt
      }
    })
  },
  editProblemDetail (id, data, jwt) {
    const cmd = '/problems/' + id
    return ajax(cmd, 'put', {
      data,
      headers: {
        Authorization: 'Jwt ' + jwt
      }
    })
  },
  addIntoPublicProblemList (data, jwt) {
    return ajax('/archive', 'post', {
      data,
      headers: {
        Authorization: 'Jwt ' + jwt
      }
    })
  },
  deleteFromPublicProblemList (data, jwt) {
    return ajax('/archive', 'delete', {
      data,
      headers: {
        Authorization: 'Jwt ' + jwt
      }
    })
  },
  getPublicProblemList (params) {
    return ajax('/archive', 'get', { params })
  },
  getPublicProblemDetail (id) {
    const cmd = '/archive/' + id
    return ajax(cmd, 'get')
  }
}

function ajax (url, method, options) {
  let params = {}
  let data = {}
  let headers = {}
  if (options !== undefined) {
    if (options.params !== undefined) {
      params = options.params
    }
    if (options.data !== undefined) {
      data = options.data
    }
    if (options.headers !== undefined) {
      headers = options.headers
    }
  }
  return new Promise((resolve, reject) => {
    axios({
      url,
      method,
      params,
      headers,
      data
    }).then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(err.response)
    })
  })
}
