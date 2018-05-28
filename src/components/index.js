import Vue from 'vue'

import MyBreadCrumb from './breadcrumb/MyBreadcrumb.vue'
import MySlider from './slider/MySlider.vue'
import FileUpload from './file-upload/FileUpload.vue'
import MarkdownEditor from './markdown-editor/MarkdownEditor.vue'
import InfoCard from './info-card/info-card.vue'

const _components = {
  MyBreadCrumb,
  MySlider,
  FileUpload,
  MarkdownEditor,
  InfoCard
}

const components = {}

Object.keys(_components).forEach(key => {
  components[key] = Vue.component(key, _components[key])
})

export default components
