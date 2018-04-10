<template>
  <!-- <my-header></my-header>
    <main>
      <error-alert></error-alert>
      <router-view/>
    </main>
    <my-footer></my-footer> -->
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
          <MenuItem name="1-2">Create</MenuItem>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-keypad"></Icon>
            Contest
          </template>
          <MenuItem name="2-1">Check</MenuItem>
          <MenuItem name="2-2">Create</MenuItem>
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
      </Header>
      <Content :style="{padding: '0 16px 16px'} ">
        <my-breadcrumb :currentPath="currentPath"></my-breadcrumb>
        <Card>
          <div style="height: 600px ">Content</div>
        </Card>
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
    return {}
  },
  computed: {
    ...mapGetters(['currentPath'])
  }
}
</script>
<style lang="scss" scoped>
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

.ivu-layout-sider-children {
  background: white;
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
</style>
