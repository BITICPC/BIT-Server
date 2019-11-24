const tags = ['二元可满足性问题', '二分', '位运算', '暴力', '中国剩余定理', '组合数学', '构造', '数据结构', '搜索', '分治', '动态规划', '并查集', '表达式解析', '快速傅里叶变换', '网络流', '博弈', '计算几何', '图匹配', '图论', '贪心', '哈希', '模拟', '交互', '数学', '矩阵', '中途相遇法', '数论', '概率', '时光流', '最短路', '排序', '后缀数据结构', '字符串', '三分', '树', '双指针']

const judgeMode = {
  'Standard': 'Standard I/O',
  'SpecialJudge': 'Special Judge',
  'Interactive': 'Interactive'
}

export default {
  tags,
  judgeMode,
  getTagColor (tag) {
    const index = tags.indexOf(tag)
    if (index < 5) {
      return 'primary'
    } else if (index < 10) {
      return 'accent'
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
