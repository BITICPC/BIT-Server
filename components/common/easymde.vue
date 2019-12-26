<template>
  <div class="vue-easymde">
    <textarea
      class="vue-simplemde-textarea"
      :name="name"
      :value="modelVal"
      @input="handleInput($event.target.value)"
    />
  </div>
</template>

<script>
import EasyMDE from 'easymde'
import marked from 'marked'

export default {
  name: 'VueEasymde',
  props: {
    value: {
      type: String,
      default () {
        return ''
      }
    },
    name: {
      type: String,
      default () {
        return ''
      }
    },
    previewClass: {
      type: String,
      default () {
        return ''
      }
    },
    autoinit: {
      type: Boolean,
      default () {
        return true
      }
    },
    highlight: {
      type: Boolean,
      default () {
        return false
      }
    },
    sanitize: {
      type: Boolean,
      default () {
        return false
      }
    },
    configs: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      modelVal: ''
    }
  },
  watch: {
    value (val) {
      if (this.isValueUpdateFromInner) {
        this.isValueUpdateFromInner = false
        return
      }
      this.easyMDE.value(val)
      this.modelVal = val
    }
  },
  mounted () {
    if (this.autoinit) {
      this.initialize()
    }
  },
  deactivated () {
    const editor = this.easyMDE
    if (editor) {
      const isFullScreen = editor.codemirror.getOption('fullScreen')
      if (isFullScreen) {
        editor.toggleFullScreen()
      }
    }
  },
  destroyed () {
    this.easyMDE = null
  },
  methods: {
    initialize () {
      const configs = Object.assign({
        element: this.$el.firstElementChild,
        initialValue: this.value,
        renderingConfig: {}
      }, this.configs)

      // 同步 value 和 initialValue 的值
      if (configs.initialValue) {
        this.$emit('input', configs.initialValue)
      }

      // 判断是否开启代码高亮
      if (this.highlight) {
        configs.renderingConfig.codeSyntaxHighlighting = true
      }

      // 设置是否渲染输入的html
      marked.setOptions({ sanitize: this.sanitize })

      // 实例化编辑器
      this.easyMDE = new EasyMDE(configs)

      // 添加自定义 previewClass
      const className = this.previewClass || ''
      this.addPreviewClass(className)

      // 绑定事件
      this.bindingEvents()
    },
    bindingEvents () {
      this.easyMDE.codemirror.on('change', () => {
        const val = this.easyMDE.value()
        this.handleInput(val)
      })
      // this.easyMDE.codemirror.on('drop', (editor, e) => {
      //   if (!(e.dataTransfer && e.dataTransfer.files)) {
      //     // 弹窗说明，此浏览器不支持此操作
      //     return
      //   }
      //   const dataList = e.dataTransfer.files
      //   const imgFiles = []
      //   for (let i = 0; i < dataList.length; i++) {
      //     if (dataList[i].type.includes('image')) {
      //       imgFiles.push(dataList[i])
      //     }
      //   }
      //   this.uploadImages(editor, imgFiles)
      //   e.preventDefault()
      // })
      // this.easyMDE.codemirror.on('paste', (editor, e) => {
      //   if (!(e.clipboardData && e.clipboardData.items)) {
      //     // 弹窗说明，此浏览器不支持此操作
      //     return
      //   }
      //   try {
      //     const dataList = (e.clipboardData || e.originalEvent.clipboardData).items
      //     if (dataList[0].kind === 'file' && dataList[0].getAsFile().type.includes('image')) {
      //       this.uploadImages(editor, [dataList[0].getAsFile()])
      //     }
      //   } catch (e) {
      //     // 弹窗说明，只能粘贴图片
      //   }
      // })
    },
    addPreviewClass (className) {
      const wrapper = this.easyMDE.codemirror.getWrapperElement()
      const preview = document.createElement('div')
      wrapper.nextSibling.className += ` ${className}`
      preview.className = `editor-preview ${className}`
      wrapper.appendChild(preview)
    },
    handleInput (val) {
      this.isValueUpdateFromInner = true
      this.$emit('input', val)
    }
    // uploadImages (editor, images) {
    //   for (const i in images) {
    //     console.log(images[i])
    //   }
    // }
  }
}
</script>

<style>
.vue-easymde .markdown-body {
  padding: 0.5em
}

.vue-easymde .editor-preview-active, .vue-easymde .editor-preview-active-side {
  display: block;
}

.editor-toolbar {
  border-color: #ddd !important;
}
</style>
