 <template>
  <div class="problem_wrapper">
    <Row>
      <Col span="18">
      <Card>
        <p slot="title">
          <Icon type="android-create"></Icon>
          Problem Create</p>
        <Form v-if="problem" :label-width="100">
          <FormItem label="Title">
            <Input v-model="problem.title" placeholder="Please input problem title" />
            <span class="error_span" v-if="error && error.title">{{ error.title }}</span>
          </FormItem>
          <FormItem label="Description">
            <markdown-editor v-model="problem.description"></markdown-editor>
          </FormItem>
          <FormItem label="Data file">
            <file-upload v-model="files"></file-upload>
          </FormItem>
          <FormItem label="Data group">
            <Col span="4"> Index
            </Col>
            <Col span="8"> Input file name
            </Col>
            <Col span="8"> Output file name
            </Col>
            <Col span="4"> Weight(1-100)
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
          Publish
        </p>
        <Form v-if="problem" :label-width="90">
          <FormItem label="Time Limit">
            <InputNumber class="short_input" v-model="problem.timeLimit" :step="100" :min="100" :max="10000" :formatter="value => formatLimit(value)+ ' ms'" />
            <span>100ms - 10000ms</span>
          </FormItem>
          <FormItem label="Memory Limit">
            <InputNumber class="short_input" v-model="problem.memoryLimit" :step="1024" :min="1024" :max="102400" value="32768" :formatter="value => formatLimit(value)+ ' KB'" />
            <span>1024KB - 102400KB</span>
          </FormItem>
          <FormItem label="Type">
            <Select v-model="problem.type" class="short_input">
              <Option value="0">General problem</Option>
              <Option value="1">Contest problem</Option>
              <Option value="2">Assignment problem</Option>
            </Select>
            <span>default: general</span>
          </FormItem>
          <FormItem>
            <span class="error_span" v-if="error && typeof error === 'string'">{{error}}</span>
            <Button type="success" icon="android-send" @click="handleSubmit">Publish</Button>
            <Button type="dashed">Draft</Button>
          </FormItem>
        </Form>
      </Card>
      <Card>
        <p slot="title">
          <Icon type="android-add"></Icon>
          Supported language
        </p>
        <p>
          select supported languages
        </p>
      </Card>
      <Card :bordered="false">
        <p slot="title">
          <Icon type="navicon-round"></Icon>
          Category
        </p>
        <p>select categories</p>
      </Card>
      <Card :bordered="false">
        <p slot="title">
          <Icon type="ios-pricetags-outline"></Icon>
          Tag
        </p>
        <p>
          select tags
        </p>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import * as filterUtil from '@/utils/filter'
import * as problemApi from '@/apis/problem'
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
      problem: {
        timeLimit: 1000,
        memoryLimit: 32768,
        type: 0,
        description: '\n# Input\n\n # Output'
      },
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
    }
  },
  methods: {
    formatLimit(num) {
      return filterUtil.toThousands(num)
    },
    handleSubmit() {
      console.log(this.problem)
      problemApi.createProblem(this.problem).then(response => {
        if (response) {
          if (response.status === 200) {
            this.problemCreated = response.data
            this.uploadFiles()
            this.$Notice.success({
              title: 'Problem has been created successfully'
            })
          } else if (response.status === 400) {
            this.error = response.data.data
            if (typeof this.error === 'string') {
              this.error = response.data.message
            }
          }
        }
      })
    },
    uploadFiles() {
      // todo pre check files
      const data = new FormData()
      data.append('datas', JSON.stringify(this.datas))
      this.files.forEach(file => {
        data.append('files', file, file.name)
      })
      problemApi.uploadFiles(
        this.problemCreated.problemId,
        data,
        progressEvent => {
          // on upload progress
          let percentCompleted = Math.round(
            progressEvent.loaded * 100 / progressEvent.total
          )
          console.log(percentCompleted)
        }
      )
    },
    handleSliderChange(value, index) {
      // recode my weight
      this.weights[index] = value
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
