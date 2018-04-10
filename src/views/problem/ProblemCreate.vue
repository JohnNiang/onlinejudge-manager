<template>
  <div class="problem_wrapper">
    <h2>Problem Addition</h2>
    <Form v-if="problem" :label-width="100">
      <FormItem label="Title">
        <Input v-model="problem.title" placeholder="Please input problem title" />
      </FormItem>
      <FormItem label="Time Limit">
        <InputNumber v-model="problem.timeLimit" :step="100" :min="100" :max="10000" :formatter="value => formatLimit(value)+ ' ms'" />
        <span>100ms - 10000ms</span>
      </FormItem>
      <FormItem label="Memory Limit">
        <InputNumber v-model="problem.memoryLimit" :step="1024" :min="1024" :max="102400" value="32768" :formatter="value => formatLimit(value)+ ' KB'" />
        <span>1024KB - 102400KB</span>
      </FormItem>
      <FormItem label="Type">
        <Select v-model="problem.type" class="type_select">
          <Option value="0">General problem</Option>
          <Option value="1">Contest problem</Option>
          <Option value="2">Assignment problem</Option>
        </Select>
        <span>default: general</span>
      </FormItem>
      <FormItem label="Description">
        <markdown-editor v-model="problem.description"></markdown-editor>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit">Submit</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import * as filterUtil from '@/utils/filter'
import * as problemApi from '@/apis/problem'
import MarkdownEditor from '@/components/markdown-editor/MarkdownEditor'

export default {
  components: {
    MarkdownEditor
  },
  data() {
    return {
      problem: {
        timeLimit: 1000,
        memoryLimit: 32768,
        type: 0,
        description: '\n# Input\n\n # Output'
      }
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
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.problem_wrapper {
  padding: 20px 10%;
  h2 {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
}

.type_select {
  width: 200px;
}
</style>
