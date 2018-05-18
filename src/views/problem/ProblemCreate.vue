 <template>
  <div class="problem_wrapper">
    <Row>
      <Col span="18">
      <Card>
        <p slot="title" class="center">
          <Icon type="android-create"></Icon>
          创建题目</p>
        <Form v-if="problem" :label-width="100">
          <FormItem label="题目标题">
            <Input v-model="problem.title" placeholder="请输入题目标题" />
            <span class="error_span" v-if="error && error.title">{{ error.title }}</span>
          </FormItem>
          <FormItem label="题目描述">
            <markdown-editor v-model="problem.description"></markdown-editor>
          </FormItem>
          <FormItem label="测试数据文件">
            <file-upload v-model="files"></file-upload>
          </FormItem>
          <FormItem label="测试数据组">
            <Col span="4"> #
            </Col>
            <Col span="8"> 输入文件名
            </Col>
            <Col span="8"> 输出文件名
            </Col>
            <Col span="4"> 权重(1-100)
            </Col>
            <div v-for="(classifiedFile, index) in classifiedFiles" :key="index">
              <Col span="4"> {{index + 1}}
              </Col>
              <Col span="8"> {{classifiedFile.inputFileName}}
              </Col>
              <Col span="8"> {{classifiedFile.outputFileName}}
              </Col>
              <Col span="4">
              <my-slider :index="classifiedFile.index" v-model="classifiedFile.weight" @on-change="handleSliderChange"></my-slider>
              </Col>
            </div>
          </FormItem>
        </Form>
      </Card>
      </Col>
      <Col span="6">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="paper-airplane"></Icon>
          发布
        </p>
        <Form v-if="problem" :label-width="90">
          <FormItem label="时间限制">
            <InputNumber class="short_input" v-model="problem.timeLimit" :step="100" :min="100" :max="10000" :formatter="value => formatLimit(value)+ ' ms'" />
            <span>100ms - 10000ms</span>
          </FormItem>
          <FormItem label="内存限制">
            <InputNumber class="short_input" v-model="problem.memoryLimit" :step="1024" :min="1024" :max="102400" value="32768" :formatter="value => formatLimit(value)+ ' KB'" />
            <span>1024KB - 102400KB</span>
          </FormItem>
          <FormItem label="题目类型">
            <Select v-model="problem.type" class="short_input">
              <Option v-for="type in types" :value="type.value" :key="type.value">{{type.label}}</Option>
            </Select>
            <div>
              <span>默认: 普通题目</span>
            </div>
            <div>
              <span v-if="error && error.type">{{error.type}}</span>
            </div>
          </FormItem>
          <FormItem>
            <span class="error_span" v-if="error && typeof error === 'string'">{{error}}</span>
            <Button type="success" icon="android-send" @click="handleSubmit">发布</Button>
            <Button type="dashed">草稿</Button>
          </FormItem>
        </Form>
      </Card>
      <Card>
        <p slot="title">
          <Icon type="android-add"></Icon>
          支持语言
        </p>
        <Table :columns="languageColumns" :data="languages" @on-selection-change="handleSelectionChange"></Table>
      </Card>
      <Card :bordered="false">
        <p slot="title">
          <Icon type="navicon-round"></Icon>
          类别
        </p>
        <p>选择类别</p>
      </Card>
      <Card :bordered="false">
        <p slot="title">
          <Icon type="ios-pricetags-outline"></Icon>
          标签
        </p>
        <p>
          选择标签
        </p>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import util from '@/utils'
import problemApi from '@/apis/problem'
import languageApi from '@/apis/language'
import MarkdownEditor from '@/components/markdown-editor/MarkdownEditor'
import MySlider from '@/components/slider/MySlider'
import FileUpload from '@/components/file-upload/FileUpload'

export default {
  components: {
    MarkdownEditor,
    FileUpload,
    MySlider
  },
  data() {
    return {
      languageColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '#',
          key: 'languageId',
          width: 50
        },
        {
          title: '名称',
          key: 'name',
          width: 200
        },
        {
          title: '状态',
          key: 'status',
          width: 100
        }
      ],
      types: [
        {
          value: 'general',
          label: '普通题目'
        },
        {
          value: 'contest',
          label: '比赛题目'
        },
        {
          value: 'assignment',
          label: '作业题目'
        }
      ],
      problem: {
        timeLimit: 1000,
        memoryLimit: 32768,
        type: 'general',
        description: '##### 问题描述\n\n ##### 输入格式\n\n ##### 输出格式\n\n #### 样例输入\n\n #### 样例输出\n\n'
      },
      languages: [],
      selectLanguages: [],
      problemCreated: {},
      error: null,
      inputFiles: [],
      outputFiles: [],
      files: [],
      weights: []
    }
  },
  computed: {
    classifiedFiles() {
      const inputPrefix = 'input'
      const outputPrefix = 'output'
      const classifiedFiles = []
      this.files.forEach(file => {
        let filename = file.name
        let index = null
        if (filename.startsWith(inputPrefix)) {
          // input file
          index = Number(
            filename.split('.', 1)[0].substring(inputPrefix.length)
          )
          if (typeof classifiedFiles[index] === 'undefined') {
            classifiedFiles[index] = {}
          }
          classifiedFiles[index].inputFileName = filename
        } else if (filename.startsWith(outputPrefix)) {
          // output file
          index = Number(
            filename.split('.', 1)[0].substring(outputPrefix.length)
          )
          if (typeof classifiedFiles[index] === 'undefined') {
            classifiedFiles[index] = {}
          }
          classifiedFiles[index].outputFileName = filename
        }
        classifiedFiles[index].index = index
        if (typeof this.weights[index] !== 'undefined') {
          classifiedFiles[index].weight = this.weights[index]
        } else {
          classifiedFiles[index].weight = 0
        }
      })
      return classifiedFiles.filter(item => {
        return item !== undefined && item.inputFileName && item.outputFileName
      })
    },
    selectLanguageIds() {
      return this.selectLanguages
        .filter(item => item.status === 'available')
        .map(item => item.languageId)
    }
  },
  activated() {
    this.getLanguages()
  },
  methods: {
    formatLimit(num) {
      return util.toThousands(num)
    },
    getLanguages() {
      languageApi.getLanguages().then(response => {
        if (response) {
          if (response.status === 200) {
            this.languages = response.data
          }
        }
      })
    },
    createProblem() {
      problemApi.createProblem(this.problem).then(response => {
        if (response) {
          if (response.status === 200) {
            this.problemCreated = response.data
            this.uploadFiles()
            this.createProblemLanguages(this.problemCreated.problemId)
            this.$Notice.success({
              title: 'Problem has been created successfully'
            })
            // TODO create problem language
          } else if (response.status === 400) {
            this.error = response.data.data
            if (typeof this.error === 'string') {
              this.error = response.data.message
            }
          }
        }
      })
    },
    createProblemLanguages(problemId) {
      problemApi
        .createProblemLanguages(problemId, this.selectLanguageIds)
        .then(response => {
          if (response) {
            if (response.status === 200) {
              this.$Notice.success({
                title: '题目支持语言设置成功'
              })
            } else {
              this.$Notice.error({
                title: '题目支持语言设置失败'
              })
            }
          }
        })
    },
    handleSubmit() {
      // precheck the support language
      this.$Modal.confirm({
        title: '确认提交么',
        content: '发布题目的时候请保证题目的语言是否已经选择.',
        onOk: () => {
          this.createProblem()
        }
      })
    },
    uploadFiles() {
      // todo pre check files
      const data = new FormData()
      data.append('datas', JSON.stringify(this.classifiedFiles))
      this.files.forEach(file => {
        data.append('files', file, file.name)
      })
      problemApi
        .uploadFiles(this.problemCreated.problemId, data, progressEvent => {
          // on upload progress
          let percentCompleted = Math.round(
            progressEvent.loaded * 100 / progressEvent.total
          )
          console.log(percentCompleted)
        })
        .then(response => {
          if (response) {
            if (response.status === 200) {
              this.$Notice.success({
                title: 'Files are uploaded successfully'
              })
            } else {
              this.$Notice.error({
                title: 'Failed to upload files'
              })
            }
          }
        })
    },
    handleSliderChange(value, index) {
      // recode my weight
      this.weights[index] = value
    },
    handleSelectionChange(selection) {
      this.selectLanguages = selection
    }
  }
}
</script>

<style lang="scss" scoped>
.problem_wrapper {
  h2 {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
}

.short_input {
  width: 150px;
}

.ivu-card {
  margin: 10px;
}

.file_list {
  border: 1px dashed grey;
  padding-left: 5px;
}
.file_delete_button {
  float: right;
}
</style>
