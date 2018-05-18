<template>
  <Card>
    <p slot="title" v-if="action === 'create'">
      <Icon type="android-add"></Icon>
      创建评判语言
    </p>
    <p slot="title" v-else>
      <Icon type="edit"></Icon>
      修改评判语言
    </p>
    <Form :label-width="110">
      <Form-item label="评判语言名称">
        <Input type="text" v-model="language.name"></Input>
        <span class="error_span" v-if="error && error.name">{{error.name}}</span>
      </Form-item>
      <Form-item label="编译命令">
        <Input type="text" v-model="language.compileCmd" placeholder="如果置空，则表示该语言为解释型语言"></Input>
        <span class="error_span" v-if="error && error.compileCmd">{{error.compileCmd}}</span>
      </Form-item>
      <Form-item label="执行命令">
        <Input type="text" v-model="language.executeCmd"></Input>
        <span class="error_span" v-if="error && error.executeCmd">{{error.executeCmd}}</span>
      </Form-item>
      <Form-item label="源文件扩展名">
        <Input type="text" v-model="language.sourceExt"></Input>
        <span class="error_span" v-if="error && error.sourceExt">{{error.sourceExt}}</span>
      </Form-item>
      <Form-item label="可执行文件扩展名">
        <Input type="text" v-model="language.executeExt" placeholder="If leave it blank, it will use the file base name to be excute"></Input>
        <span class="error_span" v-if="error && error.executeExt">{{error.executeExt}}</span>
      </Form-item>
      <Form-item label="操作系统">
        <Select v-model="language.operator" style="width:200px">
          <Option v-for="operator in operators" :value="operator.value" :key="operator.value">{{operator.label}}</Option>
        </Select>
        <span>默认: Unix</span>
        <span class="error_span" v-if="error && error.operator">{{error.operator}}</span>
      </Form-item>
      <Form-item>
        <span class="error_span" v-if="error && typeof error === 'string'">{{error}}</span>
        <template v-if="action === 'create'">
          <Button type="success" icon="android-send" @click="handleLanguageCreate">创建</Button>
          <Button icon="android-refresh" @click="handleResetClick">重置</Button>
        </template>
        <template v-else>
          <Button type="warning" icon="android-send" @click="handleLanguageModify">修改</Button>
          <Button icon="android-cancel" @click="handleModifyCancelClick">取消</Button>
        </template>
      </Form-item>
    </Form>
  </Card>
</template>

<script>
import languageApi from '@/apis/language'

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
          value: 'windows',
          label: 'Windows'
        },
        {
          value: 'unix',
          label: 'Unix'
        },
        {
          value: 'both',
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
  watch: {
    action: function(newAction, oldAction) {
      this.error = null
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
        .updateLanguage(this.language.languageId, this.language)
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
