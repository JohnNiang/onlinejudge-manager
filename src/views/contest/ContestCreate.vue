<template>
  <div class="contest_wrapper">
    <Row>
      <Col span="18">
      <Card>
        <p slot="title">
          <Icon type="android-create"></Icon>
          Contest Create
        </p>
        <Form :label-width="100">
          <FormItem label="Title">
            <Input v-model="contest.title" placeholder="Please input problem title" />
            <span class="error_span" v-if="error && error.title">{{error.title}}</span>
          </FormItem>
          <FormItem label="Description">
            <markdown-editor v-model="contest.description"></markdown-editor>
            <span class="error_span" v-if="error && error.description">{{error.description}}</span>
          </FormItem>
        </Form>
      </Card>
      </Col>
      <Col span="6">
      <Card>
        <p slot="title">
          <Icon type="paper-airplane"></Icon>
          Publish
        </p>
        <Form :label-width="70">
          <FormItem label="time range">
            <DatePicker v-model="datatimeRange" type="datetimerange" show-week-numbers placeholder="Select start and end datetime" style="width: 100%" @on-change="handleDateRangeChange"></DatePicker>
            <span class="error_span" v-if="error && error.startTime">{{error.startTime}}</span>
            <span class="error_span" v-if="error && error.endTime">{{error.endTime}}</span>
          </FormItem>
          <FormItem label="type">
            <Select v-model="contest.type" class="short_input">
              <Option value="0">single-player</Option>
              <Option value="1">multi-player</Option>
            </Select>
            <span>default: single player</span>
          </FormItem>
          <FormItem>
            <Button type="success" icon="android-send" @click="handlePublishContestClick">Publish</Button>
          </FormItem>
        </Form>
      </Card>
      <Card>
        <p slot="title">
          <Icon type="android-add"></Icon>
          Problem
        </p>
        <p>
          Choose contest problem
        </p>
      </Card>
      <Card>
        <p slot="title">
          <Icon type="android-add"></Icon>
          Supported language
        </p>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/markdown-editor/MarkdownEditor'
import * as contestApi from '@/apis/contest'

export default {
  components: {
    MarkdownEditor
  },
  data() {
    return {
      contest: {
        type: 0,
        description: '',
        startTime: null,
        endTime: null
      },
      datatimeRange: null,
      error: null
    }
  },
  methods: {
    createContest() {
      this.error = null
      contestApi.createContest(this.contest).then(response => {
        if (response) {
          if (response.status === 200) {
            this.$Notice.success({
              title: 'Contest create successfully'
            })
          } else if (response.status === 400) {
            this.error = response.data.data
          }
        }
      })
    },
    handlePublishContestClick() {
      // TODO pre check

      // create it
      this.createContest()
    },
    handleDateRangeChange(datetimeRange) {
      this.contest.startTime = datetimeRange[0]
      this.contest.endTime = datetimeRange[1]
    }
  }
}
</script>

<style lang="scss" scoped>
.ivu-card {
  margin: 10px;
}
</style>