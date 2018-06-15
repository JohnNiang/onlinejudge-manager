<template>
  <div class="language_wrapper">
    <Row>
      <Col :lg="16" :md="24">
      <Card>
        <p slot="title" class="center">
          <Icon type="android-list"></Icon>
          评判语言列表
        </p>
        <Table stripe :columns="languageColumn" :data="languageList"></Table>
      </Card>
      </Col>
      <Col :lg="8" :md="24">
      <language-action :stageLanguage="languageToDo" :action="action" @on-action-success="handleActionSuccess" @on-cancel="handleCancel" @on-reset="handleReset"></language-action>
      <Card>
        <p slot="title" class="center">
          <Icon type="android-list"></Icon>
          变量
        </p>
        <p class="center example">例如：/tmp/onlinejudge/source/Main.java </p>
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
              <b>fullpath</b> : /tmp: /tmp/onlinejudge/source/Main.java /onlinejudge/source (without last separator)</li>
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
          title: '名称',
          key: 'name',
          width: 100
        },
        {
          title: '编译命令',
          key: 'compileCmd',
          width: 300
        },
        {
          title: '执行命令',
          key: 'executeCmd',
          width: 300
        },
        {
          title: '源文件扩展名',
          key: 'sourceExt',
          width: 100
        },
        {
          title: '可执行文件扩展名',
          key: 'executeExt',
          width: 100
        },
        {
          title: '操作系统',
          key: 'operator',
          width: 100
        },
        {
          title: '状态',
          key: 'status',
          fixed: 'right',
          width: 140,
          render: (h, params) => {
            let statusTag = null
            let statusTagColor = null
            if (params.row.status === 'available') {
              statusTag = '可用'
              statusTagColor = 'green'
            } else {
              statusTag = '测试中...'
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
          title: '操作',
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
              text = '禁用'
            } else {
              // testing
              type = 'success'
              text = '启用'
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
                '修改'
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
                '删除'
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
