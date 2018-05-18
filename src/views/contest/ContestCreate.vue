<template>
  <div class="contest_wrapper">
    <Row>
      <Col span="18">
      <Card>
        <p slot="title" class="center">
          <Icon type="android-create"></Icon>
          创建比赛
        </p>
        <Form :label-width="100">
          <FormItem label="标题">
            <Input v-model="contest.title" placeholder="请输入比赛标题" />
            <span class="error_span" v-if="error && error.title">{{error.title}}</span>
          </FormItem>
          <FormItem label="描述">
            <markdown-editor v-model="contest.description"></markdown-editor>
            <span class="error_span" v-if="error && error.description">{{error.description}}</span>
          </FormItem>
        </Form>
      </Card>
      </Col>
      <Col span="6">
      <Card>
        <p slot="title">
          <Icon type="paper-airplane"></Icon>
          发布
        </p>
        <Form :label-width="70">
          <FormItem label="时间范围">
            <DatePicker v-model="datatimeRange" type="datetimerange" show-week-numbers placeholder="请选择开始和结束时间" style="width: 100%" @on-change="handleDateRangeChange"></DatePicker>
            <span class="error_span" v-if="error && error.startTime">{{error.startTime}}</span>
            <span class="error_span" v-if="error && error.endTime">{{error.endTime}}</span>
          </FormItem>
          <FormItem label="类型">
            <Select v-model="contest.type" class="short_input">
              <Option v-for="type in contestTypes" :value="type.value" :key="type.value">{{type.label}}</Option>
            </Select>
            <span>默认: 单人赛</span>
          </FormItem>
          <FormItem>
            <Button type="success" icon="android-send" @click="handlePublishContestClick">发布</Button>
          </FormItem>
        </Form>
      </Card>
      <Card>
        <p slot="title">
          <Icon type="android-add"></Icon>
          比赛题目
        </p>
        <Table :columns="contestProblemColumns" :data="contestProblems" @on-selection-change="handleSelectionChange"></Table>
        <Page :current.sync="pagination.page" :total="pagination.total" :page-size="pagination.rpp" simple></Page>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/markdown-editor/MarkdownEditor'
import contestApi from '@/apis/contest'
import problemApi from '@/apis/problem'
import util from '@/utils'

export default {
  components: {
    MarkdownEditor
  },
  data() {
    return {
      contestTypes: [
        {
          value: 'single-player',
          label: '个人赛'
        },
        {
          value: 'multi-player',
          label: '多人赛'
        }
      ],
      contest: {
        type: 'single-player',
        description: '',
        startTime: null,
        endTime: null
      },
      contestProblemColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '#',
          key: 'problemId',
          width: 50
        },
        {
          title: '题目标题',
          key: 'title',
          width: 200
        },
        {
          title: '更新时间',
          width: 120,
          render: (h, params) => {
            return h('span', util.timeAgo(params.row.createTime) + 'ago')
          }
        }
      ],
      contestProblems: [],
      selection: [],
      pagination: {
        page: 1,
        rpp: 5,
        total: 0,
        sort: 'updateTime,desc'
      },
      datatimeRange: null,
      error: null
    }
  },
  computed: {
    selectProblemIds() {
      return this.selection.map(item => item.problemId)
    }
  },
  activated() {
    this.getContestProblems()
  },
  methods: {
    createContest() {
      this.error = null
      contestApi.createContest(this.contest).then(response => {
        if (response) {
          if (response.status === 200) {
            this.$Notice.success({
              title: 'Contest create successfully'
            })
          } else if (response.status === 400) {
            this.error = response.data.data
          }
        }
      })
    },
    getContestProblems() {
      problemApi
        .getProblemsForType('contest', this.pagination)
        .then(response => {
          if (response) {
            if (response.status === 200) {
              this.contestProblems = response.data.datas
              this.pagination.total = response.data.total
            }
          }
        })
    },
    handlePublishContestClick() {
      // TODO pre check

      // create it
      this.createContest()
    },
    handleDateRangeChange(datetimeRange) {
      this.contest.startTime = datetimeRange[0]
      this.contest.endTime = datetimeRange[1]
    },
    handleSelectionChange(selection) {
      this.selection = selection
    }
  }
}
</script>

<style lang="scss" scoped>
.ivu-card {
  margin: 10px;
}
</style>
