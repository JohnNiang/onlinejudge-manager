<template>
  <div class="language_wrapper">
    <Row>
      <Col span="16">
      <Card>
        <p slot="title">
          <Icon type="android-list"></Icon>
          Language list
        </p>
      </Card>
      </Col>
      <Col span="8">
      <Card>
        <p slot="title">
          <Icon type="android-add"></Icon>
          Create
        </p>
        <Form :label-width="110">
          <Form-item label="language name">
            <Input type="text" v-model="languageToAdd.name"></Input>
            <span class="error_span" v-if="error && error.name">{{error.name}}</span>
          </Form-item>
          <Form-item label="compile cmmand">
            <Input type="text" v-model="languageToAdd.compileCmd"></Input>
            <span class="error_span" v-if="error && error.compileCmd">{{error.compileCmd}}</span>
          </Form-item>
          <Form-item label="execute cmmand">
            <Input type="text" v-model="languageToAdd.executeCmd"></Input>
            <span class="error_span" v-if="error && error.executeCmd">{{error.executeCmd}}</span>
          </Form-item>
          <Form-item label="source extension">
            <Input type="text" v-model="languageToAdd.sourceExt"></Input>
            <span class="error_span" v-if="error && error.sourceExt">{{error.sourceExt}}</span>
          </Form-item>
          <Form-item label="excute extension">
            <Input type="text" v-model="languageToAdd.executeExt"></Input>
            <span class="error_span" v-if="error && error.executeExt">{{error.executeExt}}</span>
          </Form-item>
          <Form-item label="operator">
            <Select v-model="languageToAdd.operator" style="width:200px">
              <Option value="0">Windows</Option>
              <Option value="1">Unix</Option>
              <Option value="2">Both of them</Option>
            </Select>
            <span>default: Unix</span>
            <span class="error_span" v-if="error && error.operator">{{error.operator}}</span>
          </Form-item>
          <Form-item>
            <span class="error_span" v-if="error && typeof error === 'string'">{{error}}</span>
            <Button type="success" icon="android-send" @click="handleLanguageCreate">Create</Button>
            <Button icon="android-refresh">Reset</Button>
          </Form-item>
        </Form>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import * as languageApi from '@/apis/language'

export default {
  data() {
    return {
      languageToAdd: {},
      error: null
    }
  },
  methods: {
    handleLanguageCreate() {
      // pre check

      // create it
      this.error = null
      languageApi.createLanguage(this.languageToAdd).then(response => {
        if (response) {
          if (response.status === 200) {
            this.$Notice.success({
              title: 'Language creates successfully'
            })
          } else if (response.status === 400) {
            this.error = response.data.data
            if (typeof this.error === 'string') {
              this.error = response.data.message
            }
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
