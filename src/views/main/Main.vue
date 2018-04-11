<template>
  <div class="layout">
    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
      <div class="logo">CJ OJ Manager</div>
      <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>
            Problem
          </template>
          <MenuItem name="1-1">Check</MenuItem>
          <MenuItem name="1-2">
          <router-link tag="a" to="/problems/create">
            Create
          </router-link>
          </MenuItem>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-keypad"></Icon>
            Contest
          </template>
          <MenuItem name="2-1">Check</MenuItem>
          <MenuItem name="2-2">
          <router-link tag="a" to="/contests/create">
            Create
          </router-link>
          </MenuItem>
        </Submenu>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-analytics"></Icon>
            Bulletin
          </template>
          <MenuItem name="3-1">Check</MenuItem>
          <MenuItem name="3-2">Create</MenuItem>
        </Submenu>
        <Submenu name="4">
          <template slot="title">
            <Icon type="ios-analytics"></Icon>
            Language
          </template>
          <MenuItem name="4-1">Check</MenuItem>
        </Submenu>
        <Submenu name="5">
          <template slot="title">
            <Icon type="ios-analytics"></Icon>
            User
          </template>
          <MenuItem name="5-1">Check</MenuItem>
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
                <span class="main-user-name">{{ username }}</span>
                <Icon type="arrow-down-b"></Icon>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem name="center">Center</DropdownItem>
                <DropdownItem name="signout" divided>Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Avatar :src="avatarPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
          </Row>
        </div>
      </Header>
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
import { mapGetters } from 'vuex'
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
    ...mapGetters(['currentPath', 'username'])
  },
  methods: {
    handleClickUserDropdown(name) {
      if (name === 'center') {
        this.$router.push({
          name: 'user_center'
        })
      } else if (name === 'signout') {
        // todo clear authentication
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
  background: green;
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
</style>
