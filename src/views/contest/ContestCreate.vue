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
          </FormItem>
          <FormItem label="Description">
            <markdown-editor v-model="contest.description"></markdown-editor>
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
            <DatePicker type="datetimerange" show-week-numbers placeholder="Select start date" style="width: 100%"></DatePicker>
          </FormItem>
          <FormItem label="type">
            <Select v-model="contest.type" class="short_input">
              <Option value="0">single-player</Option>
              <Option value="1">multi-player</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="success" icon="android-send">Publish</Button>
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

export default {
  components: {
    MarkdownEditor
  },
  data() {
    return {
      contest: {
        type: 0,
        description: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ivu-card {
  margin: 10px;
}
</style>
