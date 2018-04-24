<template>
  <div>
    <Row>
      <Col span="18">
      <Card>
        <p slot="title" class="center">
          <Icon type="social-twitch"></Icon>
          Problem Check
        </p>
        <Table :columns="problemColumns" :data="problems" @on-selection-change="handleSelectionChange"></Table>
        <Page show-total class-name="user_pagination" :total="pagination.total" :current="pagination.page" :page-size="pagination.rpp" show-sizer placement="top" @on-change="handleCurrentPageChange" @on-page-size-change="handlePageSizeChange"></Page>
      </Card>
      </Col>
      <Col span="6">
      <Card>
        <p slot="title">
          <Icon type="hammer"></Icon>
          Action
        </p>
        <div class="action">
          <Button type="info" long @click="handlePublishClick">Publish</Button>
        </div>
        <div class="action">
          <Button type="error" long>Delete</Button>
        </div>
        <div class="action">
          <Button type="warning" long>Translate Contest</Button>
        </div>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import problemApi from '@/apis/problem'
import util from '@/utils'

export default {
  data() {
    return {
      problemColumns: [
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
          key: 'title'
        },
        {
          title: 'create time',
          width: 150,
          render: (h, params) => {
            return h('span', util.timeAgo(params.row.createTime) + 'ago')
          }
        },
        {
          title: 'update time',
          width: 150,
          render: (h, params) => {
            return h('span', util.timeAgo(params.row.updateTime) + 'ago')
          }
        },
        {
          title: 'published',
          width: 100,
          key: 'published'
        },
        {
          title: 'status',
          width: 100,
          key: 'status'
        }
      ],
      problems: [],
      selection: [],
      pagination: {
        page: 1,
        rpp: 10,
        total: 0,
        sort: 'updateTime,desc'
      }
    }
  },
  mounted() {
    this.getProblems()
  },
  methods: {
    getProblems() {
      problemApi.getProblems(this.pagination).then(response => {
        if (response) {
          if (response.status === 200) {
            this.problems = response.data.datas
            this.pagination.total = response.data.total
          }
        }
      })
    },
    publishProblems() {
      const problemIds = []
      this.selection.forEach(item => {
        problemIds.push(item.problemId)
      })
      problemApi.publishProblems(problemIds).then(response => {
        if (response) {
          if (response.status === 200) {
            this.$Notice.success({
              title: 'publish successfully'
            })
            this.getProblems()
          }
        }
      })
    },
    handleCurrentPageChange(current) {
      this.pagination.page = current
      // fetch again
      this.getProblems()
    },
    handlePageSizeChange(pageSize) {
      this.pagination.rpp = pageSize
      // fetch again
      this.getProblems()
    },
    handleSelectionChange(selection) {
      console.log('selection', selection)
      this.selection = selection
    },
    handlePublishClick() {
      this.publishProblems()
    }
  }
}
</script>

<style lang="scss" scoped>
.ivu-card {
  margin: 10px;
}

.action {
  margin: 10px auto;
}
</style>
