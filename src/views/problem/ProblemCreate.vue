<template>
  <div class="problem_wrapper">
    <Row>
      <Col span="18">
      <Card>
        <p slot="title">
          <Icon type="android-create"></Icon>
          Problem Create</p>
        <Form v-if="problem" :label-width="100">
          <FormItem label="Title">
            <Input v-model="problem.title" placeholder="Please input problem title" />
            <span class="error_span" v-if="error && error.title">{{ error.title }}</span>
          </FormItem>
          <FormItem label="Description">
            <markdown-editor v-model="problem.description"></markdown-editor>
          </FormItem>
          <FormItem label="Standard data">
            <file-upload v-model="fileArr"></file-upload>
          </FormItem>
        </Form>
      </Card>
      </Col>
      <Col span="6">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="paper-airplane"></Icon>
          Publish
        </p>
        <Form v-if="problem" :label-width="90">
          <FormItem label="Time Limit">
            <InputNumber class="short_input" v-model="problem.timeLimit" :step="100" :min="100" :max="10000" :formatter="value => formatLimit(value)+ ' ms'" />
            <span>100ms - 10000ms</span>
          </FormItem>
          <FormItem label="Memory Limit">
            <InputNumber class="short_input" v-model="problem.memoryLimit" :step="1024" :min="1024" :max="102400" value="32768" :formatter="value => formatLimit(value)+ ' KB'" />
            <span>1024KB - 102400KB</span>
          </FormItem>
          <FormItem label="Type">
            <Select v-model="problem.type" class="short_input">
              <Option value="0">General problem</Option>
              <Option value="1">Contest problem</Option>
              <Option value="2">Assignment problem</Option>
            </Select>
            <span>default: general</span>
          </FormItem>
          <FormItem>
            <Button type="success" icon="android-send" @click="handleSubmit">Publish</Button>
            <Button type="dashed">Draft</Button>
          </FormItem>
        </Form>
      </Card>
      <Card>
        <p slot="title">
          <Icon type="android-add"></Icon>
          Supported language
        </p>
        <p>
          select supported languages
        </p>
      </Card>
      <Card :bordered="false">
        <p slot="title">
          <Icon type="navicon-round"></Icon>
          Category
        </p>
        <p>select categories</p>
      </Card>
      <Card :bordered="false">
        <p slot="title">
          <Icon type="ios-pricetags-outline"></Icon>
          Tag
        </p>
        <p>
          select tags
        </p>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import * as filterUtil from '@/utils/filter'
import * as problemApi from '@/apis/problem'
import MarkdownEditor from '@/components/markdown-editor/MarkdownEditor'
import FileUpload from '@/components/file-upload/FileUpload'

export default {
  components: {
    MarkdownEditor,
    FileUpload
  },
  data() {
    return {
      problem: {
        timeLimit: 1000,
        memoryLimit: 32768,
        type: 0,
        description: '\n# Input\n\n # Output'
      },
      error: null,
      fileArr: []
    }
  },
  computed: {
    sortFileArr() {
      return this.fileArr
    }
  },
  mounted() {
    setInterval(() => {
      this.source = new Date().toLocaleTimeString()
    }, 1000)
  },
  methods: {
    formatLimit(num) {
      return filterUtil.toThousands(num)
    },
    handleSubmit() {
      console.log(this.problem)
      problemApi.createProblem(this.problem).then(response => {
        if (response) {
          if (response.status === 200) {
            console.log('problem has been created', response.data)
            this.$Notice.success({
              title: 'Problem has been created successfully'
            })
          } else if (response.status === 400) {
            this.error = response.data.data
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.problem_wrapper {
  h2 {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
}

.short_input {
  width: 150px;
}

.ivu-card {
  margin: 10px;
}

.file_list {
  border: 1px dashed grey;
  padding-left: 5px;
}
.file_delete_button {
  float: right;
}
</style>
