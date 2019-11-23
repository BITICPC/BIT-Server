const usernameRules = [
  v => !!v || '用户名不能为空',
  v => (v && v.length >= 3 && v.length <= 10) || '用户名长度必须大于2个字符且小于10个字符'
]

const passwordRules = [
  v => !!v || '密码不能为空',
  v => (v && v.length >= 6) || '密码长度必须大于5位'
]

const phoneRules = [
  v => !!v || '手机号不能为空',
  v => (v && v.length === 11) || '手机号长度应该为11位'
]

export default {
  usernameRules,
  passwordRules,
  phoneRules
}
