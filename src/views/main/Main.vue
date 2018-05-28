<template>
  <div class="layout">
    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
      <div class="logo">
        <router-link to="/">
          CJ OJ 管理端
        </router-link>
      </div>
      <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>
            题目
          </template>
          <MenuItem name="1-1">
          <router-link tag="a" to="/problems/check">
            查看
          </router-link>
          </MenuItem>
          <MenuItem name="1-2">
          <router-link tag="a" to="/problems/create">
            创建
          </router-link>
          </MenuItem>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-keypad"></Icon>
            比赛
          </template>
          <MenuItem name="2-1"> 查看
          </MenuItem>
          <MenuItem name="2-2">
          <router-link tag="a" to="/contests/create">
            创建
          </router-link>
          </MenuItem>
        </Submenu>
        <Submenu name="3">
          <template slot="title">
            <Icon type="speakerphone"></Icon>
            公告
          </template>
          <MenuItem name="3-1"> 查看
          </MenuItem>
          <MenuItem name="3-2">
          <router-link tag="a" to="/bulletins/create">
            创建
          </router-link>
          </MenuItem>
        </Submenu>
        <Submenu name="4">
          <template slot="title">
            <Icon type="ios-analytics"></Icon>
            评判语言
          </template>
          <MenuItem name="4-1">
          <router-link tag="a" to="/languages/check">
            查看
          </router-link>
          </MenuItem>
        </Submenu>
        <Submenu name="5">
          <template slot="title">
            <Icon type="person"></Icon>
            用户
          </template>
          <MenuItem name="5-1">
          <router-link tag="a" to="/users/check">
            查看
          </router-link>
          </MenuItem>
        </Submenu>
      </Menu>
    </Sider>
    <Layout :style=" {marginLeft: '200px'} ">
      <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'} ">
        <my-breadcrumb :currentPath="currentPath"></my-breadcrumb>
        <div class="header-avator">
          <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
              <a href="javascript:void(0)">
                <span class="main-user-name">{{ user.username }}</span>
                <Icon type="arrow-down-b"></Icon>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem name="center">用户中心</DropdownItem>
                <DropdownItem name="signout" divided>注销</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Avatar :src="user.avatar" style="background: #619fe7;margin-left: 10px;"></Avatar>
          </Row>
        </div>
      </Header>
      <Alert class="error_alert" type="error" show-icon closable v-if="globalError">{{globalError}}</Alert>
      <Content :style="{height: '100%'}">
        <div>
          <transition name="fade" mode="out-in" appear>
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
        </div>
      </Content>
    </Layout>
  </div>
</template>

<script>
import MyBreadcrumb from '../../components/breadcrumb/MyBreadcrumb'
import { mapGetters, mapMutations } from 'vuex'
import * as type from '@/store/mutation-type'
import authApi from '@/apis/auth'

export default {
  name: 'App',
  components: {
    MyBreadcrumb
  },
  data() {
    return {
      avatarPath:
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg'
    }
  },
  computed: {
    ...mapGetters(['currentPath', 'user', 'globalError'])
  },
  methods: {
    ...mapMutations({
      clearToken: type.CLEAR_TOKEN
    }),
    handleClickUserDropdown(name) {
      if (name === 'center') {
        this.$router.push({
          name: 'user_center'
        })
      } else if (name === 'signout') {
        // clear authentication
        this.clearToken()
        authApi.logout().then(response => {
          if (response) {
            if (response.status === 200) {
              this.$Notice.success({
                title: 'You have been logged out successfully'
              })
            }
          }
        })
        this.$router.push({
          name: 'login'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/base/variable';
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.ivu-layout-sider {
  background: $white-color;
}

.ivu-layout-header {
  padding: 0 10px;
}

.logo {
  text-align: center;
  margin: 10px;
  padding: 5px;
  background: $success-color;
  border-radius: 5px;
  color: white;
  font-size: 20px;
  font-weight: bold;
}

.header-avator {
  position: absolute;
  top: 0;
  right: 10px;
  height: 100%;
  width: 150px;
  .main-user-name {
    color: $success-color;
    font-size: 12px;
    display: inline-block;
    width: 80px;
    word-break: keep-all;
    white-space: nowrap;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
  }
}

.ivu-menu-item a {
  display: block;
}

.error_alert {
  margin: 10px;
}
</style>
