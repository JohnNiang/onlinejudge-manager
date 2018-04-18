<template>
  <div>
    <div class="header">
      <h1>CJ OJ Manager</h1>
      <h2>cqjtu online judge</h2>
    </div>
    <nav>
      <ul>
        <li>
          <router-link tag="a" to="/home">Index</router-link>
        </li>
        <li>
          <Dropdown>
            <a href="javascript:void(0)">
              Problem
              <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem>
                <router-link tag="a" to="/problems/create">
                  Create
                </router-link>
              </DropdownItem>
              <DropdownItem divided>
                <router-link tag="a" to="/problems/check">
                  Check
                </router-link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </li>
        <li>
          <Dropdown>
            <a href="javascript:void(0)">
              Contest
              <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem>
                <router-link tag="a" to="/contests/create">
                  Create
                </router-link>
              </DropdownItem>
              <DropdownItem divided>
                <router-link tag="a" to="/contests/check">
                  Check
                </router-link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

        </li>
        <li>
          <router-link tag="a" to="/users">
            User M
          </router-link>
        </li>
        <li>
          <router-link tag="a" to="/languages">
            Language M
          </router-link>
        </li>
        <li>
          <router-link tag="a" to="/bulletins">
            Bulletin M
          </router-link>
        </li>
      </ul>
      <div v-if="!isLogined">
        <Button class="sign_in_button" type="success" @click="loginVisiable = true">Sign In</Button>
        <login v-model="loginVisiable"></login>
      </div>
      <div class="avatar" v-else>
        <Dropdown @on-click="handlePersonalCenter">
          <a href="javascript:void(0)">
            {{username}}
            <Icon type="arrow-down-b"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem name="center">Personal Center</DropdownItem>
            <DropdownItem name="logout" divided>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Avatar icon="person" size="large" />
      </div>
    </nav>
  </div>
</template>

<script>
import Login from '@/views/auth/Login'
import * as type from '@/store/mutation-type'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    Login
  },
  data() {
    return {
      loginVisiable: false
    }
  },
  computed: {
    ...mapGetters(['isLogined', 'username'])
  },
  methods: {
    handlePersonalCenter(name) {
      console.log(name)
      if (name === 'center') {
        // todo
      } else if (name === 'logout') {
        // todo clear the token
        console.log('cleared the token')
        // this.$router.push({
        //   name: 'login'
        // })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/base/variable';
@import '../../styles/base/mixin';
.header {
  text-align: center;
  text-transform: uppercase;
  padding: 20px;
}
nav {
  background: $black-color;
  padding: 20px 0;
  @include normalBoxShadow;
  text-align: center;
  ul {
    li {
      display: inline-block;
      a {
        color: $white-color;
        padding: 24px;
      }
    }
  }
}

.ivu-dropdown {
  ul li a {
    color: $black-color;
  }
}

// .router-link-active {
//   background: $nav-active-color;
//   color: $black-color;
//   border-radius: 5px;
// }

@include mq('screen', $mq_small_only) {
  nav {
    padding: 0;
    ul {
      li {
        display: block;
        border-bottom: 1px solid white;
        a {
          text-align: left;
          display: block;
          width: 100%;
        }
      }
    }
  }
}

.sign_in_button {
  position: relative;
  margin: 0 10px;
  float: right;
}

.avatar {
  float: right;
  margin-top: 10px;
  margin-right: 10px;
}

.ivu-dropdown {
  ul,
  li {
    display: block;
  }
}
</style>
