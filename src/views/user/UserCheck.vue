<template>
  <div>
    <Row>
      <Col span="18">
      <Card>
        <p slot="title" class="center">
          <Icon type="ios-people" :size="20"></Icon>
          用户列表
        </p>
        <Table :columns="userColumns" :data="userData" @on-sort-change="handleSortChange"></Table>
        <Page show-total class-name="user_pagination" :total="pagination.total" :current="pagination.page" :page-size="pagination.rpp" show-sizer placement="top" @on-change="handleCurrentPageChange" @on-page-size-change="handlePageSizeChange"></Page>
      </Card>
      </Col>
      <Col span="6">
      <Card>
        <p slot="title">
          <Icon type="android-search"></Icon>
          操作
        </p>
        <Form inline>
          <FormItem>
            <Input type="text" placeholder="请输入用户名">
            <Icon type="android-search" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="primary" icon="android-search">查找</Button>
          </FormItem>
        </Form>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import userApi from '@/apis/user'
import util from '@/utils'
const types = [
  {
    value: 'general',
    color: 'green',
    text: '普通用户'
  },
  {
    value: 'teacher',
    color: 'yellow',
    text: '教师'
  },
  {
    value: 'admin',
    color: 'red',
    text: '管理员'
  },
  {
    value: 'contestant',
    color: 'blue',
    text: '比赛用户'
  }
]
export default {
  data() {
    return {
      userColumns: [
        {
          title: '#',
          key: 'userId',
          width: 50
        },
        {
          title: '头像',
          key: 'avatar',
          width: 80,
          render: (h, params) => {
            return h(
              'Avatar',
              {
                props: {
                  icon: 'person',
                  src: params.row.avatar,
                  size: 'large'
                }
              },
              'U'
            )
          }
        },
        {
          title: '用户名',
          key: 'username'
        },
        {
          title: '用户类型',
          key: 'userType',
          render: (h, params) => {
            const type = types.find(type => type.value === params.row.userType)
            return h(
              'Tag',
              {
                props: {
                  type: 'dot',
                  color: type.color
                }
              },
              type.text
            )
          }
        },
        {
          title: '创建时间',
          key: 'createTime',
          sortable: 'custom',
          render: (h, params) => {
            return h('span', util.timeAgo(params.row.createTime) + ' ago')
          }
        },
        {
          title: '更新时间',
          key: 'updateTime',
          render: (h, params) => {
            return h('span', util.timeAgo(params.row.updateTime) + ' ago')
          }
        },
        {
          title: '过期截止时间',
          key: 'expiredTime',
          render: (h, params) => {
            return h('span', util.parseTime(params.row.expiredTime))
          }
        }
      ],
      userData: [],
      pagination: {
        page: 1,
        rpp: 20,
        total: 0,
        sort: ''
      }
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      userApi.getUsers(this.pagination).then(response => {
        if (response) {
          if (response.status === 200) {
            this.pagination.total = response.data.total
            this.userData = response.data.datas
          }
        }
      })
    },
    handleSortChange(column) {
      if (column.order !== 'normal') {
        this.pagination.sort = `${column.key},${column.order}`
        this.getUsers()
      }
    },
    handleCurrentPageChange(current) {
      this.pagination.page = current
      // fetch again
      this.getUsers()
    },
    handlePageSizeChange(pageSize) {
      this.pagination.rpp = pageSize
      // fetch again
      this.getUsers()
    }
  }
}
</script>

<style lang="scss" scoped>
.ivu-card {
  margin: 10px;
}

.user_pagination {
  margin-top: 10px;
}
</style>
