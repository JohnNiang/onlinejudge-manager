<template>
  <div class="problem_wrapper">
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
        <Select v-model="problem.type">
          <Option value="0">General problem</Option>
          <Option value="1">Contest problem</Option>
          <Option value="2">Assignment problem</Option>
        </Select>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import * as filterUtil from '../../utils/filter'
export default {
  data() {
    return {
      problem: {
        timeLimit: 1000,
        memoryLimit: 32768
      }
    }
  },
  methods: {
    formatLimit(num) {
      return filterUtil.toThousands(num)
    }
  }
}
</script>

<style lang="scss" scoped>
.problem_wrapper {
  padding: 20px 10%;
}
</style>
