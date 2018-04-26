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
      <Card>
        <p slot="title" class="center">
          <Icon type="android-list"></Icon>
          Variables
        </p>
        <p class="center example">eg: /tmp/onlinejudge/source/Main.java </p>
        <div class="variables">
          <ol>
            <li>
              <b>filename</b> : /tmp/onlinejudge/source/Main.java </li>
            <li>
              <b>basename</b> : Main</li>
            <li>
              <b>extension</b> : java</li>
            <li>
              <b>name</b> : Main.java</li>
            <li>
              <b>fullpath</b> : /tmp/onlinejudge/source (without last separator)</li>
          </ol>
        </div>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import languageApi from '@/apis/language'
import LanguageAction from './LanguageAction'

export default {
  components: {
    LanguageAction
  },
  data() {
    return {
      languageColumn: [
        {
          title: '#',
          key: 'languageId',
          width: 50
        },
        {
          title: 'name',
          key: 'name',
          width: 100
        },
        {
          title: 'compile cmmand',
          key: 'compileCmd',
          width: 300
        },
        {
          title: 'execute command',
          key: 'executeCmd',
          width: 300
        },
        {
          title: 'source extension',
          key: 'sourceExt',
          width: 100
        },
        {
          title: 'execute extension',
          key: 'executeExt',
          width: 100
        },
        {
          title: 'operator(win/unix)',
          key: 'operator',
          width: 100
        },
        {
          title: 'status',
          key: 'status',
          fixed: 'right',
          width: 140,
          render: (h, params) => {
            let statusTag = null
            let statusTagColor = null
            if (params.row.status === 'available') {
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
          fixed: 'right',
          width: 210,
          render: (h, params) => {
            let type = null
            let text = null
            if (params.row.status === 'available') {
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
        operator: 'unix'
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
      if (language.status === 'available') {
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

.variables {
  padding: 20px;
  li {
    margin: 20px auto;
  }
}
</style>
