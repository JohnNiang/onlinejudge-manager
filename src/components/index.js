import Vue from 'vue'

import MyBreadcrumb from './breadcrumb/MyBreadcrumb.vue'
import MySlider from './slider/MySlider.vue'
import FileUpload from './file-upload/FileUpload.vue'
import MarkdownEditor from './markdown-editor/MarkdownEditor.vue'
import InfoCard from './info-card/info-card.vue'
import JudgerInfo from './judger-info/judge-info.vue'

const _components = {
  MyBreadcrumb,
  MySlider,
  FileUpload,
  MarkdownEditor,
  InfoCard,
  JudgerInfo
}

const components = {}

Object.keys(_components).forEach(key => {
  components[key] = Vue.component(key, _components[key])
})

export default components
