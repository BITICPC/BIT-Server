export default {
  getTagColor (tag) {
    let pink = ["模拟", "构造", "二分", "贪心", "数学", "数论", "数据结构"];
    let olive = [
      "字符串",
      "平衡树",
      "矩阵",
      "最大流",
      "费用流",
      "上下界网络流"
    ];
    let black = ["测试"];
    if (pink.includes(tag)) {
      return "pink";
    } else if (olive.includes(tag)) {
      return "olive";
    } else if (black.includes(tag)) {
      return "black";
    }
    return "blue";
  }
}