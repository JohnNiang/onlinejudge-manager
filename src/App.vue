<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import './styles/main';

#app {
  width: 100%;
  height: 100%;
}
</style>
