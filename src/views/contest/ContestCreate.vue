<template>
  <div class="contest_wrapper">
    <Row>
      <Col span="18">
      <Card>
        <p slot="title" class="center">
          <Icon type="android-create"></Icon>
          Contest Create
        </p>
        <Form :label-width="100">
          <FormItem label="Title">
            <Input v-model="contest.title" placeholder="Please input problem title" />
            <span class="error_span" v-if="error && error.title">{{error.title}}</span>
          </FormItem>
          <FormItem label="Description">
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
          Publish
        </p>
        <Form :label-width="70">
          <FormItem label="time range">
            <DatePicker v-model="datatimeRange" type="datetimerange" show-week-numbers placeholder="Select start and end datetime" style="width: 100%" @on-change="handleDateRangeChange"></DatePicker>
            <span class="error_span" v-if="error && error.startTime">{{error.startTime}}</span>
            <span class="error_span" v-if="error && error.endTime">{{error.endTime}}</span>
          </FormItem>
          <FormItem label="type">
            <Select v-model="contest.type" class="short_input">
              <Option v-for="type in contestTypes" :value="type.value" :key="type.value">{{type.label}}</Option>
            </Select>
            <span>default: single player</span>
          </FormItem>
          <FormItem>
            <Button type="success" icon="android-send" @click="handlePublishContestClick">Publish</Button>
          </FormItem>
        </Form>
      </Card>
      <Card>
        <p slot="title">
          <Icon type="android-add"></Icon>
          Problem
        </p>
        <p>
          <Table :columns="contestProblemColumns" :data="contestProblems" @on-selection-change="handleSelectionChange"></Table>
        </p>
        <div>
          <Page :current.sync="pagination.page" :total="pagination.total" :page-size="pagination.rpp" simple></Page>
        </div>
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
          label: 'Single player'
        },
        {
          value: 'multi-player',
          label: 'Multi player'
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
          title: 'title',
          key: 'title',
          width: 200
        },
        {
          title: 'updated',
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
