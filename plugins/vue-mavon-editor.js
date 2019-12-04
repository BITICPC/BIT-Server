import Vue from 'vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor)

const markdownOption = {
  bold: true, // 粗体
  italic: true, // 斜体
  header: true, // 标题
  underline: true, // 下划线
  strikethrough: true, // 中划线
  mark: false, // 标记
  superscript: false, // 上角标
  subscript: false, // 下角标
  quote: true, // 引用
  ol: true, // 有序列表
  ul: true, // 无序列表
  link: true, // 链接
  imagelink: true, // 图片链接
  code: true, // code
  table: true, // 表格
  fullscreen: false, // 全屏编辑
  readmodel: false, // 沉浸式阅读
  htmlcode: false, // 展示html源码
  help: true, // 帮助
  /* 1.3.5 */
  undo: true, // 上一步
  redo: true, // 下一步
  trash: true, // 清空
  save: true, // 保存（触发events中的save事件）
  /* 1.4.2 */
  navigation: false, // 导航目录
  /* 2.1.8 */
  alignleft: false, // 左对齐
  aligncenter: false, // 居中
  alignright: false, // 右对齐
  /* 2.2.1 */
  subfield: false, // 单双栏模式
  preview: true // 预览
}

export default {
  markdownOption
}
