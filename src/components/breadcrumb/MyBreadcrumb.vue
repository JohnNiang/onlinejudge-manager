<template>
  <Breadcrumb>
    <BreadcrumbItem v-for="path in currentPath" :to="path.path" :key="path.name">
      {{path.title}}
    </BreadcrumbItem>
  </Breadcrumb>
</template>

<script>
export default {
  name: 'my-breadcrumb',
  props: {
    currentPath: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.ivu-breadcrumb {
  margin: 16px 0;
}
</style>
