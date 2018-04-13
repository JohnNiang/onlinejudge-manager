<template>
  <Card>
    <p slot="title" v-if="action === 'create'">
      <Icon type="android-add"></Icon>
      Create
    </p>
    <p slot="title" v-else>
      <Icon type="edit"></Icon>
      Modify
    </p>
    <Form :label-width="110">
      <Form-item label="language name">
        <Input type="text" v-model="language.name"></Input>
        <span class="error_span" v-if="error && error.name">{{error.name}}</span>
      </Form-item>
      <Form-item label="compile cmmand">
        <Input type="text" v-model="language.compileCmd" placeholder="If leave it blank, the langauge won't be compiled"></Input>
        <span class="error_span" v-if="error && error.compileCmd">{{error.compileCmd}}</span>
      </Form-item>
      <Form-item label="execute cmmand">
        <Input type="text" v-model="language.executeCmd"></Input>
        <span class="error_span" v-if="error && error.executeCmd">{{error.executeCmd}}</span>
      </Form-item>
      <Form-item label="source extension">
        <Input type="text" v-model="language.sourceExt"></Input>
        <span class="error_span" v-if="error && error.sourceExt">{{error.sourceExt}}</span>
      </Form-item>
      <Form-item label="excute extension">
        <Input type="text" v-model="language.executeExt" placeholder="If leave it blank, it will use the file base name to be excute"></Input>
        <span class="error_span" v-if="error && error.executeExt">{{error.executeExt}}</span>
      </Form-item>
      <Form-item label="operator">
        <Select v-model="language.operator" style="width:200px">
          <Option v-for="operator in operators" :value="operator.value" :key="operator.value">{{operator.label}}</Option>
        </Select>
        <span>default: Unix</span>
        <span class="error_span" v-if="error && error.operator">{{error.operator}}</span>
      </Form-item>
      <Form-item>
        <span class="error_span" v-if="error && typeof error === 'string'">{{error}}</span>
        <template v-if="action === 'create'">
          <Button type="success" icon="android-send" @click="handleLanguageCreate">Create</Button>
          <Button icon="android-refresh" @click="handleResetClick">Reset</Button>
        </template>
        <template v-else>
          <Button type="warning" icon="android-send" @click="handleLanguageModify">Modify</Button>
          <Button icon="android-cancel" @click="handleModifyCancelClick">Cancel</Button>
        </template>
      </Form-item>
    </Form>
  </Card>
</template>

<script>
import * as languageApi from '@/apis/language'

export default {
  name: 'language-action',
  props: {
    stageLanguage: {
      type: Object,
      default: () => {
        return {
          // default unix
          operator: 1
        }
      }
    },
    action: {
      type: String,
      default: 'create',
      validator: function(value) {
        return ['create', 'modify'].indexOf(value) !== -1
      }
    }
  },
  data() {
    return {
      operators: [
        {
          value: 0,
          label: 'Windows'
        },
        {
          value: 1,
          label: 'Unix'
        },
        {
          value: 2,
          label: 'Both'
        }
      ],
      error: null
    }
  },
  computed: {
    language() {
      return Object.assign({}, this.stageLanguage)
    }
  },
  methods: {
    handleLanguageCreate() {
      // TODO pre check

      // create it
      this.error = null
      languageApi.createLanguage(this.language).then(response => {
        if (response) {
          if (response.status === 200) {
            this.$Notice.success({
              title: 'Language is created successfully'
            })
            this.$emit('on-action-success', this.action)
          } else if (response.status === 400) {
            this.error = response.data.data
            if (typeof this.error === 'string') {
              this.error = response.data.message
            }
          }
        }
      })
    },
    handleLanguageModify() {
      this.error = null
      languageApi
        .updateLanguage(this.language.langaugeId, this.language)
        .then(response => {
          if (response) {
            if (response.status === 200) {
              this.$Notice.success({
                title: 'Language is modified successfully'
              })
              this.$emit('on-action-success', this.action)
            } else if (response.status === 400) {
              this.error = response.data.data
              if (typeof this.error !== 'object') {
                this.error = response.data.message
              }
            }
          }
        })
    },
    handleModifyCancelClick() {
      this.$emit('on-cancel')
    },
    handleResetClick() {
      this.error = null
      this.$emit('on-reset')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
