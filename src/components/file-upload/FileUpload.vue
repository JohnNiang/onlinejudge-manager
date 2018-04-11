<template>
  <div class="file_upload_wrapper">
    <Upload multiple action="" type="drag" name="files" :before-upload="handleBeforeUpload">
      <div style="padding: 20px 0">
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
        <p>Click or drag files here to upload</p>
      </div>
    </Upload>
    <span :style="{color: empty ? 'red': 'green'}">choosed: {{fileArr.length | pluralize('file')}}</span>
    <div v-for="(file, index) in fileArr" :key="index" class="file_list">
      {{file.name}}
      <Button class="file_delete_button" type="text" icon="android-delete" @click="handleFileDeleteClick(file)">delete</Button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  computed: {
    fileArr() {
      return this.value
    },
    empty() {
      return this.fileArr.length === 0
    }
  },
  methods: {
    handleBeforeUpload(file) {
      const exist = this.value.find(item => item.name === file.name)
      if (!exist) {
        this.fileArr.push(file)
        this.$emit('input', this.fileArr)
      }
      return false
    },
    handleFileDeleteClick(file) {
      this.fileArr.splice(this.fileArr.indexOf(file), 1)
      this.$emit('input', this.fileArr)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/base/variable';

.file_list {
  border: 0.1px dashed $disabled-color;
  padding-left: 10px;
}
.file_delete_button {
  float: right;
}
</style>
