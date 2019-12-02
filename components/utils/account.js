const usernameRules = [
  v => !!v || '用户名不能为空',
  v => (v && v.length >= 3 && v.length <= 10) || '用户名长度必须大于2个字符且小于11个字符'
]

const passwordRules = [
  v => !!v || '密码不能为空',
  v => (v && v.length >= 6) || '密码长度必须大于5位'
]

const phoneRules = [
  v => !!v || '手机号不能为空',
  v => (v && v.length === 11) || '手机号长度应该为11位'
]

const nicknameRules = [
  v => v.length <= 10 || '用户昵称长度必须小于11个字符'
]

const schoolRules = [
  v => (!v || (v && v.length >= 2 && v.length <= 10)) || '学校名称长度必须大于1个字符且小于11个字符'
]

const studentIdRules = [
  v => (!v || (v && v.length >= 3 && v.length <= 10)) || '学号长度必须必须大于2位且小于11位'
]

const emailRules = [
  v => (!v || (v && /.+@.+\..+/.test(v))) || '邮箱格式不合法'
]

export default {
  usernameRules,
  passwordRules,
  phoneRules,
  nicknameRules,
  schoolRules,
  studentIdRules,
  emailRules
}
