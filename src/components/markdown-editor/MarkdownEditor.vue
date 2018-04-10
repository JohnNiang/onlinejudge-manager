<template>
  <div class="markdown_editor">
    <textarea name="markdown-editor" id="oj-markdown-editor"></textarea>
  </div>
</template>

<script>
import SimpleMDE from 'simplemde'
import 'simplemde/dist/simplemde.min.css'

let simplemde = null

export default {
  name: 'markdown-editor',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  mounted() {
    simplemde = this.createSimpleMDE()
    simplemde.value(this.value)
    simplemde.codemirror.on('change', () => {
      this.$emit('input', simplemde.value())
    })
  },
  methods: {
    createSimpleMDE() {
      return new SimpleMDE({
        element: document.getElementById('oj-markdown-editor'),
        toolbar: [
          'bold',
          'italic',
          'strikethrough',
          'heading',
          'heading-smaller',
          'heading-bigger',
          'heading-1',
          'heading-2',
          'heading-3',
          '|',
          'code',
          'quote',
          'unordered-list',
          'clean-block',
          '|',
          'link',
          'image',
          'table',
          'horizontal-rule',
          '|',
          'preview',
          'side-by-side',
          'fullscreen',
          'guide'
        ]
      })
    }
  }
}
</script>

<style lang="scss">

</style>
