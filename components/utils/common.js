import moment from 'moment'

const md = require('markdown-it')().use(require('markdown-it-mathjax')())

export default {
  md,
  getTimeDifferent (lastTime) {
    const dateLast = moment(lastTime)
    const dateNow = moment(new Date())
    if (dateLast.isAfter(dateNow)) {
      return 'Invalid'
    }
    const minutes = dateNow.diff(dateLast, 'minute')
    if (minutes < 1) {
      return '刚刚'
    } else if (minutes < 60) {
      return minutes + ' 分钟前'
    }
    const hours = Math.floor(minutes / 60)
    if (hours < 24) {
      return hours + ' 小时前'
    }
    const days = Math.floor(hours / 24)
    if (days < 30) {
      return days + ' 天前'
    }
    const months = Math.floor(days / 30)
    if (months < 12) {
      return months + ' 个月前'
    }
    const years = Math.floor(months / 12)
    return years + ' 年前'
  }
}
