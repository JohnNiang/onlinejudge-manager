<template>
  <div class="bulletin_wrapper">
    <Row>
      <Col span="18">
      <Card>
        <p slot="title">
          <Icon type="android-create"></Icon>
          Bulletin Create
        </p>
        <Form :label-width="100">
          <FormItem label="Title">
            <Input v-model="bulletin.title" placeholder="Please input problem title" />
            <span class="error_span" v-if="error && error.title">{{error.title}}</span>
          </FormItem>
          <FormItem label="Description">
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
            <Button type="success" icon="android-send" @click="handlePublish">Publish</Button>
            <Button icon="eye">Preview</Button>
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
