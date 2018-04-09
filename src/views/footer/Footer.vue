<template>
  <div>
    <footer>
      <span>&copy; cqjtu cs 2014</span>
      <span>disigned by johnnniang</span>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/base/variable';
@import '../../styles/base/mixin';
footer {
  background: $footer-background-color;
  padding: 20px 0;
  text-align: center;
  span {
    display: block;
    color: $footer-color;
  }
}
</style>
