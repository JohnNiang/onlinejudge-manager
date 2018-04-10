<template>
  <div id="app">
    <my-header></my-header>
    <main>
      <error-alert></error-alert>
      <router-view/>
    </main>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from '@/views/header/Header'
import MyFooter from '@/views/footer/Footer'
import ErrorAlert from '@/views/error/ErrorAlert'

export default {
  name: 'App',
  components: {
    MyHeader,
    MyFooter,
    ErrorAlert
  }
}
</script>
<style lang="scss" scoped>
main {
  min-height: 100px;
  margin-top: 10px;
}
</style>
