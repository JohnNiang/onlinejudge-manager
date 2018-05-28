<template>
  <Card :padding=0>
    <div class="info-card-div">
      <Col span="8" class="h-100 info-card-icon" :style="{backgroundColor: background, color: 'white', paddingLeft: '5px', paddingRight: '5px'}">
      <Row class="h-100" type="flex" align="middle" justify="center">
        <Icon :type="iconType" :size="iconSize"></Icon>
      </Row>
      </Col>
      <Col span="16" class="h-100">
      <Row class="h-100" type="flex" align="middle" justify="center">
        <div>
          <span class="count" :style="{color: background}">
            {{count}}
          </span>
          <p class="description">
            {{desc}}
          </p>
        </div>
      </Row>
      </Col>
    </div>
  </Card>
</template>

<script>
export default {
  props: {
    background: {
      type: String,
      default: 'blue'
    },
    count: {
      type: Number,
      default: 0
    },
    iconType: String,
    iconSize: String,
    desc: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.ivu-card {
  margin: 10px;
}

.info-card-div {
  height: 80px;
}

.info-card-icon {
  border-radius: 3px 0 0 3px;
}

.content {
  display: flex;
  justify-content: center;
}

.count {
  font-size: 30px;
  font-weight: 700;
  display: inline-block;
}

.description {
  font-size: 12px;
  font-weight: 500;
  color: #c8c8c8;
}
</style>
