<template>
  <div>
    <Row>
      <Col span="18">
      <Card>
        <p slot="title" class="center">
          <Icon type="social-twitch"></Icon>
          题目列表
        </p>
        <Table :columns="problemColumns" :data="problems" @on-selection-change="handleSelectionChange"></Table>
        <Page class="mt-1" show-total class-name="user_pagination" :total="pagination.total" :current="pagination.page" :page-size="pagination.rpp" show-sizer placement="top" @on-change="handleCurrentPageChange" @on-page-size-change="handlePageSizeChange"></Page>
      </Card>
      </Col>
      <Col span="6">
      <Card>
        <p slot="title">
          <Icon type="hammer"></Icon>
          操作
        </p>
        <div class="action">
          <Button type="info" long @click="publishModal = true">发布</Button>
        </div>
        <div class="action">
          <Button type="error" long @click="deleteModal = true">删除</Button>
        </div>
        <div class="action">
          <Button type="warning" long>转换为比赛题目</Button>
        </div>
      </Card>
      </Col>
    </Row>
    <Modal v-model="publishModal" width="360">
      <p slot="header" style="color:#46BFF6;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>发布确认</span>
      </p>
      <div v-if="publishingProblems.length > 0">
        <Timeline pending>
          <TimelineItem v-for="problem in publishingProblems" :key="problem.problemId">{{problem.title}}</TimelineItem>
        </Timeline>
        <p class="align-center">是否真的想发布它们？</p>
      </div>
      <div v-else class="align-center">
        已经发布过或者您为选择任何题目
      </div>
      <div slot="footer">
        <Button type="primary" :disabled="publishingProblems.length === 0" size="large" long :loading="modal_loading" @click="handlePublishClick">发布</Button>
      </div>
    </Modal>

    <Modal v-model="deleteModal" width="360">
      <p slot="header" style="color:red;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div v-if="deletingProblems.length > 0">
        <Timeline pending>
          <TimelineItem v-for="problem in deletingProblems" :key="problem.problemId">{{problem.title}}</TimelineItem>
        </Timeline>
        <p class="align-center">是否真的想要删除它们？</p>
      </div>
      <div v-else class="align-center">
        已经被删除或者未选中任何题目
      </div>
      <div slot="footer">
        <Button type="error" :disabled="deletingProblems.length === 0" size="large" long :loading="modal_loading" @click="handleDeleteClick">删除</Button>
      </div>
    </Modal>
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
          title: '题目标题',
          key: 'title'
        },
        {
          title: '题目类型',
          key: 'type',
          width: 100
        },
        {
          title: '创建时间',
          width: 150,
          render: (h, params) => {
            return h('span', util.timeAgo(params.row.createTime) + 'ago')
          }
        },
        {
          title: '更新时间',
          width: 150,
          render: (h, params) => {
            return h('span', util.timeAgo(params.row.updateTime) + 'ago')
          }
        },
        {
          title: '是否已经发布过',
          width: 100,
          key: 'published'
        },
        {
          title: '状体',
          width: 100,
          key: 'status'
        }
      ],
      problems: [],
      selection: [],
      publishModal: false,
      deleteModal: false,
      modal_loading: false,
      pagination: {
        page: 1,
        rpp: 10,
        total: 0,
        sort: 'updateTime,desc'
      }
    }
  },
  computed: {
    publishingProblems() {
      return this.selection.filter(item => item.status !== 'publishing')
    },
    deletingProblems() {
      return this.selection.filter(item => item.status !== 'deleted')
    }
  },
  activated() {
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
      this.modal_loading = true
      const problemIds = this.publishingProblems.map(item => item.problemId)
      problemApi.publishProblems(problemIds).then(response => {
        if (response) {
          if (response.status === 200) {
            this.publishModal = false
            this.$Notice.success({
              title: '发布成功'
            })
            this.getProblems()
          }
        }
        this.modal_loading = false
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
      this.selection = selection
    },
    handlePublishClick() {
      this.publishProblems()
    },
    handleDeleteClick() {
      console.log('delete them')
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
