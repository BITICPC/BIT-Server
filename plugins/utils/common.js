import moment from 'moment'
import AnchorJS from 'anchor-js'

const anchors = new AnchorJS()

const md = require('markdown-it')().use(require('markdown-it-mathjax')())

const codeLang = {
  C: {
    name: 'C',
    aceMode: 'c_cpp',
    token: {
      GNU: 'GCC 8.3.0',
      Clang: 'Clang 9.0.0'
    }
  },
  CPP: {
    name: 'C++',
    aceMode: 'c_cpp',
    token: {
      GNU: 'GCC 8.3.0',
      Clang: 'Clang 9.0.0'
    }
  },
  Java: {
    name: 'Java',
    aceMode: 'java',
    token: {
      JSE: 'Java SE 10.0.2'
    }
  },
  Python: {
    name: 'Python',
    aceMode: 'python',
    token: {
      CPython: 'CPython 3'
    }
  },
  Rust: {
    name: 'Rust',
    aceMode: 'rust',
    token: {
      Rust: 'Cargo 2.0'
    }
  }
}

const verdictStatus = {
  Pending: {
    title: 'Pending',
    class: 'grey--text font-weight-bold'
  },
  Judging: {
    title: 'Running',
    class: 'indigo--text text--lighten-1 font-weight-bold'
  },
  Accepted: {
    title: 'Accepted',
    class: 'green--text font-weight-bold'
  },
  CompilationFailed: {
    title: 'Compilation Error',
    class: 'blue-grey--text font-weight-bold'
  },
  WrongAnswer: {
    title: 'Wrong Answer',
    class: 'red--text text--lighten-1 font-weight-bold'
  },
  RuntimeError: {
    title: 'Runtime Error',
    class: 'yellow--text text--darken-2 font-weight-bold'
  },
  TimeLimitExceeded: {
    title: 'Time Limit Exceeded',
    class: 'orange--text text--darken-1 font-weight-bold'
  },
  MemoryLimitExceeded: {
    title: 'Memory Limit Exceeded',
    class: 'orange--text text--darken-1 font-weight-bold'
  },
  IdlenessLimitExceeded: {
    title: 'Idleness Limit Exceeded',
    class: 'orange--text text--darken-1 font-weight-bold'
  },
  BadSystemCall: {
    title: 'Bad System Call',
    class: 'blue-grey--text font-weight-bold'
  },
  CheckerFailed: {
    title: 'Checker Failed',
    class: 'orange--text text--darken-1 font-weight-bold'
  },
  InteractorFailed: {
    title: 'Interactor Failed',
    class: 'blue-grey--text font-weight-bold'
  },
  JudgeFailed: {
    title: 'Judge Failed',
    class: 'blue-grey--text font-weight-bold'
  }
}

export default {
  md,
  anchors,
  verdictStatus,
  getTimeFormat (time) {
    return moment(time).format('YYYY-MM-DD HH:mm:ss')
  },
  getTimeDifferent (lastTime) {
    const dateLast = moment(lastTime)
    const dateNow = moment(new Date())
    if (dateNow.isSameOrAfter(dateNow)) {
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
    return 'Invalid'
  },
  getLanguageOptions (languages) {
    const options = []
    for (const i in languages) {
      options.push({
        id: languages[i].id,
        title: languages[i].displayName,
        lang: codeLang[languages[i].langId].aceMode,
        token: '使用 ' + codeLang[languages[i].langId].token[languages[i].dialect] + ' 进行编译'
      })
    }
    return options
  },
  mapAceLang (language) {
    if (language.includes('Python')) {
      return 'python'
    } else if (language.includes('C')) {
      return 'c_cpp'
    } else if (language.includes('Java')) {
      return 'java'
    } else if (language.includes('Rust')) {
      return 'rust'
    }
    return 'text'
  }
}
