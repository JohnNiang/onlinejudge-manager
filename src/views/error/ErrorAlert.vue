<template>
  <Alert v-if="globalError" type="error" show-icon closable>
    {{globalError}}
  </Alert>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['globalError'])
  }
}
</script>

<style lang="scss" scoped>
.ivu-alert {
  margin: 5px 0;
}
</style>
