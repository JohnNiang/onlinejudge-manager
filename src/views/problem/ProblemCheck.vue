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
          <Button type="info" long @click="publishModal = true">Publish</Button>
        </div>
        <div class="action">
          <Button type="error" long @click="deleteModal = true">Delete</Button>
        </div>
        <div class="action">
          <Button type="warning" long>Translate Contest</Button>
        </div>
      </Card>
      </Col>
    </Row>
    <Modal v-model="publishModal" width="360">
      <p slot="header" style="color:#46BFF6;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>Publish confirmation</span>
      </p>
      <div v-if="publishingProblems.length > 0">
        <Timeline pending>
          <TimelineItem v-for="problem in publishingProblems" :key="problem.problemId">{{problem.title}}</TimelineItem>
        </Timeline>
        <p class="align-center">Will you publish them?</p>
      </div>
      <div v-else class="align-center">
        they are publishing status now.
      </div>
      <div slot="footer">
        <Button type="primary" :disabled="publishProblems.length === 0" size="large" long :loading="modal_loading" @click="handlePublishClick">Publish</Button>
      </div>
    </Modal>

    <Modal v-model="deleteModal" width="360">
      <p slot="header" style="color:red;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>Publish confirmation</span>
      </p>
      <div v-if="deletingProblems.length > 0">
         <Timeline pending>
          <TimelineItem v-for="problem in deletingProblems" :key="problem.problemId">{{problem.title}}</TimelineItem>
        </Timeline>
        <p class="align-center">Will you delete them?</p>
      </div>
      <div v-else class="align-center">
        they are deleted status now.
      </div>
      <div slot="footer">
        <Button type="error" :disabled="deletingProblems.length === 0" size="large" long :loading="modal_loading" @click="handleDeleteClick">Delete</Button>
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
          title: 'title',
          key: 'title'
        },
        {
          title: 'type',
          key: 'type',
          width: 100
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
      this.modal_loading = true
      const problemIds = []
      this.publishingProblems.forEach(item => {
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
      console.log('selection', selection)
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
