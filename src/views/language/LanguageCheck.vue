<template>
  <div class="language_wrapper">
    <Row>
      <Col span="16">
      <Card>
        <p slot="title" class="center">
          <Icon type="android-list"></Icon>
          Language list
        </p>
        <Table stripe :columns="languageColumn" :data="languageList"></Table>
      </Card>
      </Col>
      <Col span="8">
      <language-action :stageLanguage="languageToDo" :action="action" @on-action-success="handleActionSuccess" @on-cancel="handleCancel" @on-reset="handleReset"></language-action>
      </Col>
    </Row>
  </div>
</template>

<script>
import * as languageApi from '@/apis/language'
import LanguageAction from './LanguageAction'

export default {
  components: {
    LanguageAction
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
      languageColumn: [
        {
          title: '#',
          key: 'languageId',
          width: 50
        },
        {
          title: 'name',
          key: 'name'
        },
        {
          title: 'compile cmmand',
          key: 'compileCmd'
        },
        {
          title: 'execute command',
          key: 'executeCmd'
        },
        {
          title: 'source extension',
          key: 'sourceExt'
        },
        {
          title: 'execute extension',
          key: 'executeExt'
        },
        {
          title: 'operator(win/unix)',
          key: 'operator',
          width: 80,
          render: (h, params) => {
            const operators = ['Both', 'Unix', 'Windows']
            return h('span', operators[params.row.operator])
          }
        },
        {
          title: 'status',
          key: 'status',
          width: 140,
          render: (h, params) => {
            let statusTag = null
            let statusTagColor = null
            if (params.row.status === 0) {
              statusTag = 'available'
              statusTagColor = 'green'
            } else {
              statusTag = 'testing'
              statusTagColor = 'yellow'
            }
            return h(
              'Tag',
              {
                props: {
                  color: statusTagColor,
                  type: 'dot'
                }
              },
              statusTag
            )
          }
        },
        {
          title: 'action',
          key: 'action',
          align: 'center',
          width: 210,
          render: (h, params) => {
            let type = null
            let text = null
            if (params.row.status === 0) {
              // available
              type = 'primary'
              text = 'disable'
            } else {
              // testing
              type = 'success'
              text = 'enable'
            }
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: type,
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.handleStatusChange(params.row)
                    }
                  }
                },
                text
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.handleModifyLanguageClick(params.index)
                    }
                  }
                },
                'modify'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.handleDeleteLanguage(params.index)
                    }
                  }
                },
                'delete'
              )
            ])
          }
        }
      ],
      languageToDo: {
        operator: 1
      },
      languageList: [],
      error: null,
      action: 'create'
    }
  },
  mounted() {
    this.getLangauges()
  },
  methods: {
    getLangauges() {
      languageApi.getLanguages().then(response => {
        if (response) {
          if (response.status === 200) {
            this.languageList = response.data
          }
        }
      })
    },
    handleModifyLanguageClick(index) {
      this.languageToDo = this.languageList[index]
      this.action = 'modify'
    },
    handleDeleteLanguage(index) {
      console.log(index)
      // delete it via api
      console.log(this.languageList[index])
      languageApi
        .deleteLanguage(this.languageList[index].languageId)
        .then(response => {
          if (response) {
            if (response.status === 200) {
              this.$Notice.success({
                title: 'Delete successfully'
              })
              this.languageList.splice(index, 1)
            } else {
              this.$Notice.error({
                title: 'Failed to delete it'
              })
            }
          }
        })
    },
    handleActionSuccess(action) {
      this.getLangauges()
      this.action = 'create'
      this.handleReset()
    },
    handleCancel() {
      this.action = 'create'
      this.handleReset()
    },
    handleReset() {
      this.languageToDo = {
        operator: 1
      }
    },
    handleStatusChange(language) {
      if (language.status === 0) {
        // disable it
        languageApi.diableLanguage(language.languageId).then(response => {
          if (response) {
            if (response.status === 200) {
              this.$Notice.success({
                title: 'The language is disabled successfully'
              })
              this.getLangauges()
            } else {
              this.$Notice.error({
                title: 'Failed to disable the language'
              })
            }
          }
        })
      } else {
        // enable it
        languageApi.enableLanguage(language.languageId).then(response => {
          if (response) {
            if (response.status === 200) {
              this.$Notice.success({
                title: 'The language is enabled successfully'
              })
              this.getLangauges()
            } else {
              this.$Notice.error({
                title: 'Failed to enabled the language'
              })
            }
          }
        })
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
