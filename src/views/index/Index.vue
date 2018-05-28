<template>
  <div>
    <Row>
      <Col :lg="8" :md="24">
      <Card>
      </Card>
      </Col>
      <Col :lg="16" :md="24">
      <Row :gutter="0">
        <Col :xs="24" :sm="12" :md="6">
        <info-card desc="题目总数" icon-type="document" icon-size="40" :count="888" background="#2d8cf0"></info-card>
        </Col>
        <Col :xs="24" :sm="12" :md="6">
        <info-card desc="用户总数" icon-type="person-stalker" icon-size="40" :count="888" background="#ed3f14"></info-card>
        </Col>
        <Col :xs="24" :sm="12" :md="6">
        <info-card desc="比赛总数" icon-type="compass" icon-size="40" :count="888" background="#19be6b"></info-card>
        </Col>
        <Col :xs="24" :sm="12" :md="6">
        <info-card desc="公告总数" icon-type="chatboxes" icon-size="40" :count="888" background="#ff9900"></info-card>
        </Col>
      </Row>
      </Col>
    </Row>
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
.ivu-card {
  margin: 10px;
}

.info-card-div {
  height: 100px;
}

.content {
  display: flex;
  justify-content: center;
}
</style>
