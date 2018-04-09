<template>
  <div id="app">
    <my-header></my-header>
    <main>
      <router-view/>
    </main>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from '@/views/header/Header'
import MyFooter from '@/views/footer/Footer'

export default {
  name: 'App',
  components: {
    MyHeader,
    MyFooter
  }
}
</script>

<style lang="scss">
@import './styles/main';

main {
  min-height: 100px;
}
</style>
