const tags = ['二元可满足性问题', '二分', '位运算', '暴力', '中国剩余定理', '组合数学', '构造', '数据结构', '搜索', '分治', '动态规划', '并查集', '表达式解析', '快速傅里叶变换', '网络流', '博弈', '计算几何', '图匹配', '图论', '贪心', '哈希', '模拟', '交互', '数学', '矩阵', '中途相遇法', '数论', '概率', '时光流', '最短路', '排序', '后缀数据结构', '字符串', '三分', '树', '双指针']

const judgeMode = {
  Standard: '文本比较',
  SpecialJudge: 'Special Judge',
  Interactive: '交互模式'
}

const mapJudgeMode = {
  文本比较: 'Standard',
  'Special Judge': 'SpecialJudge',
  交互模式: 'Interactive'
}

const nameRules = [
  v => !!v || 'Field should not be empty',
  v => (v && v.length >= 1 && v.length <= 30) || 'Field should be at least 1 and no more than 30 characters'
]

const timeRules = [
  v => !!v || 'Field should not be empty',
  v => (v && v >= 500 && v <= 10000) || 'Field should be at least 500 and no more than 10000'
]

const memoryRules = [
  v => !!v || 'Field should not be empty',
  v => (v && v >= 32 && v <= 1024) || 'Field should be at least 32 and no more than 1024'
]

export default {
  tags,
  judgeMode,
  mapJudgeMode,
  nameRules,
  timeRules,
  memoryRules,
  getTagColor (tag) {
    const index = tags.indexOf(tag)
    if (index < 5) {
      return 'primary'
    } else if (index < 10) {
      return 'brown'
    } else if (index < 15) {
      return 'secondary'
    } else if (index < 20) {
      return 'info'
    } else if (index < 25) {
      return 'orange'
    } else if (index < 30) {
      return 'error'
    }
    return 'success'
  }
}
