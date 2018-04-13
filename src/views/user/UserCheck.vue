<template>
  <div>
    <Row>
      <Card>
        <Table :columns="userColumns" :data="userData"></Table>
        <Page show-total class-name="user_pagination" :total="pagination.total" :current="pagination.page" :page-size="pagination.rpp" show-sizer placement="top" @on-change="handleCurrentPageChange" @on-page-size-change="handlePageSizeChange"></Page>
      </Card>
    </Row>
  </div>
</template>

<script>
import * as userApi from '@/apis/user'
import util from '@/utils'
const types = [
  {
    value: 0,
    color: 'green',
    text: 'general'
  },
  {
    value: 1,
    color: 'yellow',
    text: 'teahcer'
  },
  {
    value: 2,
    color: 'red',
    text: 'admin'
  },
  {
    value: 3,
    color: 'blue',
    text: 'contestant'
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
          title: 'Avatar',
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
          title: 'Name',
          key: 'username'
        },
        {
          title: 'User Type',
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
          title: 'Created',
          key: 'createTime',
          render: (h, params) => {
            return h('span', util.timeAgo(params.row.createTime) + ' ago')
          }
        },
        {
          title: 'Updated',
          key: 'updateTime',
          render: (h, params) => {
            return h('span', util.timeAgo(params.row.updateTime) + ' ago')
          }
        },
        {
          title: 'ExpiredTime',
          key: 'expiredTime',
          render: (h, params) => {
            return h('span', util.parseTime(params.row.expiredTime))
          }
        }
      ],
      userData: [
        {
          avatar: 'string',
          createTime: '2018-04-13T08:43:58.213Z',
          expiredTime: '2018-04-13T08:43:58.213Z',
          password: 'string',
          updateTime: '2018-04-13T08:43:58.213Z',
          userId: 0,
          userType: 0,
          username: 'string'
        }
      ],
      pagination: {
        page: 1,
        rpp: 20,
        total: 0
      }
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      userApi
        .getUsers(
          this.pagination.page,
          this.pagination.rpp,
          this.pagination.total
        )
        .then(response => {
          if (response) {
            if (response.status === 200) {
              this.page = response.data.page
              this.rpp = response.data.rpp
              this.total = response.data.total
              this.userData = response.data.datas
            }
          }
        })
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
