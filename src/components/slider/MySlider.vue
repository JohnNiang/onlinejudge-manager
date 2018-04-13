<template>
  <Slider :value="value" :step="10" @on-change="handleSliderChange"></Slider>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  methods: {
    handleSliderChange(value) {
      this.$emit('input', value)
      this.$emit('on-change', value, this.index)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
