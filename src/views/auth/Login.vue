<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          欢迎登录
        </p>
        <div class="form-con">
          <Form ref="loginForm" :model="auth" :rules="rules">
            <FormItem prop="userName">
              <Input v-model="auth.username" placeholder="请输入用户名">
              <span slot="prepend">
                <Icon :size="16" type="person"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="auth.password" placeholder="请输入密码">
              <span slot="prepend">
                <Icon :size="14" type="locked"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem>
              <span class="login-error" v-if="error">{{error}}</span>
              <Button @click="handleSubmit" type="primary" long>登录</Button>
            </FormItem>
          </Form>
          <p class="login-tip">输入用户名和密码登录</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import authApi from '../../apis/auth'
import { mapMutations } from 'vuex'
import * as type from '@/store/mutation-type'

export default {
  props: {
    value: Boolean
  },
  data() {
    return {
      auth: {
        username: '',
        password: ''
      },
      error: null,
      rules: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapMutations({
      setToken: type.SET_TOKEN
    }),
    handleVisibleChange(visible) {
      this.$emit('input', visible)
    },
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.error = null
          authApi
            .login(this.auth.username, this.auth.password)
            .then(response => {
              if (response) {
                if (response.status === 200) {
                  this.setToken(response.data)
                  this.$Notice.success({
                    title: 'You have been sign in successfully'
                  })
                  // go into the redirect page
                  const to = this.$route.query.redirect
                  this.$router.push(to !== undefined ? to : { name: 'home' })
                } else {
                  this.error = 'username or password is incorrect'
                }
              }
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/base/variable';

.login {
  width: 100%;
  height: 100%;
  background-image: url('../../assets/login-bg.jpeg');
  background-size: cover;
  position: relative;
}

.login-con {
  position: absolute;
  right: 160px;
  top: 50%;
  transform: translateY(-60%);
  width: 300px;
}

.form-con {
  padding: 10px 0 0;
}

.login-error {
  color: $error-color;
}

.login-tip {
  font-size: 10px;
  text-align: center;
  color: #c3c3c3;
}
</style>
