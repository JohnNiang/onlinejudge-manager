<template>
  <Modal title="Sign In" :value="value" :loading="modalLoading" class-name="vertical-center-modal" cancel-text="Cancel" ok-text="Login" @on-visible-change="handleVisibleChange" @on-ok="handleLogin">
    <Form :label-width="70">
      <FormItem label="Username">
        <Input v-model="auth.username" placeholder="Please input your username" />
      </FormItem>
      <FormItem label="Password">
        <Input v-model="auth.password" placeholder="Please input your password" />
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import * as authApi from '../../apis/auth'
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
      modalLoading: false
    }
  },
  methods: {
    ...mapMutations({
      setToken: type.SET_TOKEN,
      errorOccurred: type.ERROR_OCCURRED
    }),
    handleVisibleChange(visible) {
      this.$emit('input', visible)
    },
    handleLogin() {
      this.modalLoading = true
      authApi.login(this.auth.username, this.auth.password).then(response => {
        if (response) {
          if (response.status === 200) {
            this.setToken(response.data)
            this.$Notice.success({
              title: 'You have been sign in successfully'
            })
          } else if (response.status === 400) {
            this.errorOccurred(
              'Login failed, username or password was not available'
            )
          } else if (response.status === 500) {
            this.errorOccurred('Login failed, may be you have been logined')
          }
        }
        this.modalLoading = false
        this.$Modal.remove()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
</style>
