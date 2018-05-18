<template>
  <div class="bulletin_wrapper">
    <Row>
      <Col span="18">
      <Card>
        <p slot="title">
          <Icon type="android-create"></Icon>
          创建公告
        </p>
        <Form :label-width="100">
          <FormItem label="标题">
            <Input v-model="bulletin.title" placeholder="请输入公告标题" />
            <span class="error_span" v-if="error && error.title">{{error.title}}</span>
          </FormItem>
          <FormItem label="描述">
            <markdown-editor v-model="bulletin.content"></markdown-editor>
            <span class="error_span" v-if="error && error.content">{{error.content}}</span>
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
          <FormItem>
            <Button type="success" icon="android-send" @click="handlePublish">发布</Button>
            <Button icon="eye">预览</Button>
          </FormItem>
        </Form>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/markdown-editor/MarkdownEditor'
import bulletinApi from '@/apis/bulletin'

export default {
  components: {
    MarkdownEditor
  },
  data() {
    return {
      bulletin: {
        content: ''
      },
      error: null
    }
  },
  methods: {
    handlePublish() {
      // pre check

      // clear error
      this.error = null

      // publish it
      bulletinApi.createBulletin(this.bulletin).then(response => {
        if (response) {
          if (response.status === 200) {
            this.$Notice.success({
              title: 'Bulletin create successfully'
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
.ivu-card {
  margin: 10px;
}
</style>
